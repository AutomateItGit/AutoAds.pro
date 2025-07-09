import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from '@react-email/components';

interface EmailVerificationProps {
  userName?: string;
  verificationUrl?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const EmailVerification = ({
  userName,
  verificationUrl,
}: EmailVerificationProps) => (
  <Html>
    <Head />
    <Preview>Verify your email address to complete your registration</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/AutoLogo.png`}
          width="48"
          height="48"
          alt="AutoPlanner Logo"
          style={logo}
        />
        <Heading style={h1}>Verify your email address</Heading>
        <Text style={text}>
          Hi {userName || 'there'},
        </Text>
        <Text style={text}>
          Welcome to AutoPlanner! To complete your registration and start using our service, 
          please verify your email address by clicking the button below.
        </Text>
        <Link
          href={verificationUrl}
          target="_blank"
          style={button}
        >
          Verify Email Address
        </Link>
        <Text style={text}>
          Or copy and paste this link into your browser:
        </Text>
        <Text style={link}>
          {verificationUrl}
        </Text>
        <Text
          style={{
            ...text,
            color: '#ababab',
            marginTop: '14px',
            marginBottom: '16px',
          }}
        >
          This verification link will expire in 24 hours for security reasons.
        </Text>
        <Text
          style={{
            ...text,
            color: '#ababab',
            marginTop: '12px',
            marginBottom: '38px',
          }}
        >
          If you didn&apos;t create an account with us, you can safely ignore this email.
        </Text>
        <Text style={footer}>
          <Link
            href={`${baseUrl}`}
            target="_blank"
            style={{ ...link, color: '#898989' }}
          >
            AutoPlanner
          </Link>
          <br />
          Streamline your business appointments and scheduling.
        </Text>
      </Container>
    </Body>
  </Html>
);

EmailVerification.PreviewProps = {
  userName: 'John Doe',
  verificationUrl: 'https://autoplanner.pro/verify-email?token=abc123',
} as EmailVerificationProps;

export default EmailVerification;

const main = {
  backgroundColor: '#ffffff',
};

const container = {
  paddingLeft: '12px',
  paddingRight: '12px',
  margin: '0 auto',
};

const logo = {
  margin: '0 auto',
  marginBottom: '32px',
};

const h1 = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#007ee6',
  borderRadius: '4px',
  color: '#fff',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px 20px',
  margin: '20px auto',
  maxWidth: '200px',
};

const link = {
  color: '#2754C5',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  textDecoration: 'underline',
};

const text = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  margin: '24px 0',
};

const footer = {
  color: '#898989',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '12px',
  lineHeight: '22px',
  marginTop: '12px',
  marginBottom: '24px',
  textAlign: 'center' as const,
}; 