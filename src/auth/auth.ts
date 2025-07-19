import NextAuth from "next-auth";
import Google from "next-auth/providers/google"; 
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongo";
import { User } from "@/models/user";
import { Types } from "mongoose";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
       name: "credentials",
      credentials: {
        email: { 
          label: "Email", 
          type: "email", 
          placeholder: "your-email@example.com" 
        },
        password: { 
          label: "Password", 
          type: "password" 
        }
      },
      async authorize(credentials){
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }
        try{
          await connectDB();

          const user = await User.findOne({email : (credentials.email as string).toLowerCase()});
  
          if(!user){
            throw new Error("No User Found");
          }


          // Check if user has a password (not an OAuth user)
          if (!user.password) {
            throw new Error("This account uses Google sign-in. Please use the Google sign-in button.");
          }

          const isPasswordGood = await bcrypt.compare(credentials.password as string, user.password);

          if(!isPasswordGood){
            throw new Error("Wrong password");
          }
          return{
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            image: user.image,
          };
        }
        catch(error){
          console.error("Authentification Error : ", error);
          throw error;
        }
      }
    })
  ],
  
  // Add explicit JWT configuration
  
  secret: process.env.AUTH_SECRET,
  
  
  callbacks: {
    async signIn({ user, profile }) {
      // Handle Google OAuth users
      if (profile?.provider === "google") {
        try {
          await connectDB();
          
          // Check if user already exists in our database
          const existingUser = await User.findOne({ 
            email: user.email?.toLowerCase() 
          });
          
          if (!existingUser) {
            // Create new user for Google OAuth
            await User.create({
              _id: new Types.ObjectId(),
              email: user.email?.toLowerCase(),
              name: user.name || profile?.name || 'Google User',
              image: user.image || profile?.picture,
              password: '', // No password for OAuth users
            });
          } else {
            // Update existing user's profile picture if it changed
            if (user.image && user.image !== existingUser.image) {
              await User.findByIdAndUpdate(existingUser._id, {
                image: user.image
              });
            }
          }
          
          return true;
        } catch (error) {
          console.error('Error handling Google sign in:', error);
          return false;
        }
      }
      
      // For credentials provider, let the authorize function handle validation
      return true;
    },

    async jwt({ token, user }) {
      // Always fetch fresh user data from database
      try {
        await connectDB();
        const dbUser = await User.findOne({ 
          email: token.email?.toLowerCase() 
        });
        
        if (dbUser) {
          // Set the token.sub to the database user's ID
          token.sub = dbUser._id.toString();
          token.dashboardAccess = dbUser.dashboardAccess;
          token.businessId = dbUser.businessId;
        }
      } catch (error) {
        console.error('Error fetching user data for JWT:', error);
      }
      
      // If user is signing in, add user info to token

      return token;
    },
    
    // Customize the session object
    async session({ session, token }) {
      // Add custom fields to session
      if (token) {
        session.user.id = token.sub!;
      }
      return session;
    }
  },
  
  pages: { 
    signIn: "/signin",
  },
  session:{
    strategy: "jwt"
  }
})