// src/config/index.ts
const config = {
    // App Information
    appName: "Your App Name",
    appDescription: "Your app description for SEO and marketing",
    appVersion: "1.0.0",
    
    // Domain & URLs
    domainName: "yourdomain.com", // Without https:// or trailing slash
    
    // Company/Author Information
    company: {
      name: "Your Company Name",
      email: "hello@yourdomain.com",
      address: "Your Address",
      phone: "+1234567890",
    },
    
    // Social Media
    social: {
      twitter: "@your_twitter",
      github: "https://github.com/yourusername",
      linkedin: "https://linkedin.com/in/yourprofile",
    },
    
    // SEO Defaults
    seo: {
      defaultTitle: "Your App Name - App Description",
      defaultDescription: "Default description for your app (60-180 characters)",
      defaultKeywords: "keyword1, keyword2, keyword3",
      defaultOgImage: "/og-image.png", // Relative path to your OG image
    },
    
    // API Configuration
    api: {
      baseUrl: process.env.NODE_ENV === 'production' 
        ? 'https://yourdomain.com/api' 
        : 'http://localhost:3000/api',
    },
    
    // Database (if using)
    database: {
      url: process.env.DATABASE_URL,
    },
    
    // Authentication (if using)
    auth: {
      secret: process.env.NEXTAUTH_SECRET,
      providers: {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
        // Add other providers as needed
      },
    },
    
    // Email Configuration (if using)
    email: {
      from: "noreply@yourdomain.com",
      support: "support@yourdomain.com",
    },
    
    // Feature Flags
    features: {
      analytics: true,
      darkMode: true,
      notifications: true,
    },
    
    // External Services
    services: {
      analytics: {
        googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
      },
      stripe: {
        publicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
        secretKey: process.env.STRIPE_SECRET_KEY,
      },
    },
  };
  
  export default config;
  