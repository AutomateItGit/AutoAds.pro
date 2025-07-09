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

interface PasswordResetProps {
  userName?: string;
  resetUrl?: string;
}

const baseUrl = process.env.NEXTAUTH_URL || process.env.VERCEL_URL
  ? `https://${process.env.NEXTAUTH_URL || process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const PasswordReset = ({
  userName,
  resetUrl,
}: PasswordResetProps) => (
  <Html>
    <Head />
    <Preview>Reset your AutoPlanner password</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/AutoLogo.png`}
          width="48"
          height="48"
          alt="AutoPlanner Logo"
          style={logo}
        />
        <Heading style={h1}>Reset Your Password</Heading>
        <Text style={text}>
          Hi {userName || 'there'},
        </Text>
        <Text style={text}>
          We received a request to reset your password for your AutoPlanner account. 
          If you didn't make this request, you can safely ignore this email and your 
          password will remain unchanged.
        </Text>
        <Text style={text}>
          To reset your password, click the button below:
        </Text>
        <Link
          href={resetUrl}
          target="_blank"
          style={button}
        >
          Reset Password
        </Link>
        <Text style={text}>
          Or copy and paste this link into your browser:
        </Text>
        <Text style={link}>
          {resetUrl}
        </Text>
        <Text
          style={{
            ...text,
            color: '#ababab',
            marginTop: '14px',
            marginBottom: '16px',
          }}
        >
          This password reset link will expire in 1 hour for security reasons.
        </Text>
        <Text
          style={{
            ...text,
            color: '#ababab',
            marginTop: '12px',
            marginBottom: '38px',
          }}
        >
          If you didn&apos;t request a password reset, please ignore this email or 
          contact our support team if you have questions.
        </Text>
        <Text style={footer}>
          <Link
            href={`${baseUrl}`}
            target="_blank"
            style={{ ...linkStyle, color: '#898989' }}
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

PasswordReset.PreviewProps = {
  userName: 'John Doe',
  resetUrl: 'https://autoplanner.pro/reset-password?token=abc123def456',
} as PasswordResetProps;

export default PasswordReset;

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
  backgroundColor: '#dc2626',
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
  wordBreak: 'break-all' as const,
};

const linkStyle = {
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