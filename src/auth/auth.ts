import NextAuth from "next-auth";
import Google from "next-auth/providers/google"; 
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongo";
import { User } from "@/models/user";
import { Types } from "mongoose";
import crypto from "crypto";
import Business from "@/models/business";
import { stripe } from "@/lib/stripe";

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
          if (!user.password || user.password.startsWith('OAUTH_USER_')) {
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
    async signIn({ user, account, profile }) {
      // Handle Google OAuth users - use account.provider instead of profile.provider
      if (account?.provider === "google") {
        try {
          await connectDB();
          
          // Check if user already exists in our database
          const existingUser = await User.findOne({ 
            email: user.email?.toLowerCase() 
          });
          
          if (!existingUser) {
            // Generate an impossible-to-guess password for OAuth users
            const impossiblePassword = `OAUTH_USER_${crypto.randomBytes(32).toString('hex')}`;
            
            // Create new user for Google OAuth
            const userData = await User.create({
              _id: new Types.ObjectId(),
              email: user.email?.toLowerCase(),
              name: user.name || profile?.name || 'Google User',
              image: user.image || profile?.picture,
              password: impossiblePassword,
            });

            const customerId = await stripe.customers.create({
              email: userData.email as string,
              name: userData.name as string,
          });
  
          const business = await Business.create({
              name: userData.name,
              ownerId: userData._id,
              subscription: {
                  status: "unsubscribed",
                  customerId: customerId.id,
                  currentPeriodEnd: new Date(),
              },
          });
  
          
          await User.findByIdAndUpdate(userData._id, { businessId:  new Types.ObjectId(business._id.toString()) }, { new: true }).select("-password");

          } else {
            // Update existing user's profile picture if it changed
            if (user.image && user.image !== existingUser.image) {
              await User.findByIdAndUpdate(existingUser._id, {
                image: user.image
              });
            }
            
            // If this is an existing credentials user trying to sign in with Google,
            // we need to decide how to handle this. For now, we'll allow it but
            // you might want to link accounts instead
            if (existingUser.password && !existingUser.password.startsWith('OAUTH_USER_')) {
              console.log(`User ${user.email} has both credentials and OAuth access`);
              // You could update the password to OAuth-only or handle differently
            }
          }
          
          return true;
                  } catch (error) {
            console.error('Error handling Google sign in:', error);
            // If there's a duplicate key error (race condition), still allow sign in
            if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
              console.log(`Duplicate user creation attempted for ${user.email}, allowing sign in`);
              return true;
            }
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