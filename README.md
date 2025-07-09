# Database
MONGODB_URI=                # MongoDB connection string
DATABASE_URL=               # (If used) General database URL

# NextAuth (Authentication)
NEXTAUTH_SECRET=            # Secret for NextAuth sessions
AUTH_SECRET=                # Secret for NextAuth JWT (sometimes same as NEXTAUTH_SECRET)
GOOGLE_CLIENT_ID=           # Google OAuth client ID
GOOGLE_CLIENT_SECRET=       # Google OAuth client secret
NEXTAUTH_URL=               # Base URL for NextAuth callbacks (e.g., http://localhost:3000)

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=   # Stripe public key for frontend
STRIPE_SECRET_KEY=                    # Stripe secret key for backend
STRIPE_WEBHOOK_SECRET=                # Stripe webhook secret (production)
STRIPE_DEV_WEBHOOK_SECRET=            # Stripe webhook secret (development)

# Stripe Plan Keys (for webhooks)
NEXT_PUBLIC_FREE_PLAN_KEY=
NEXT_PUBLIC_BASIC_PLAN_KEY=
NEXT_PUBLIC_PREMIUM_PLAN_KEY=
NEXT_PUBLIC_ENTREPRISE_PLAN_KEY=

# Analytics
NEXT_PUBLIC_GA_ID=                    # Google Analytics ID

# App URLs
NEXT_PUBLIC_APP_URL=                  # Public app URL (for Stripe, etc.)
VERCEL_URL=                           # Vercel deployment URL (used in emails)

# Email/Notifications
RESEND_API_KEY=                       # Resend.com API key for transactional emails

# (Optional) Other variables
# Add any other variables your project may require below
