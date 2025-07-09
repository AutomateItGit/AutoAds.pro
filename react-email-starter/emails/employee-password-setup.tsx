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

interface EmployeePasswordSetupProps {
  employeeName?: string;
  setPasswordUrl?: string;
}

const baseUrl = process.env.NEXTAUTH_URL || process.env.VERCEL_URL
  ? `https://${process.env.NEXTAUTH_URL || process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const EmployeePasswordSetup = ({
  employeeName,
  setPasswordUrl,
}: EmployeePasswordSetupProps) => (
  <Html>
    <Head />
    <Preview>Welcome to AutoPlanner - Set your password to get started</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/AutoLogo.png`}
          width="48"
          height="48"
          alt="AutoPlanner Logo"
          style={logo}
        />
        <Heading style={h1}>Welcome to AutoPlanner!</Heading>
        <Text style={text}>
          Hello {employeeName || 'there'},
        </Text>
        <Text style={text}>
          You've been granted access to the AutoPlanner dashboard! We're excited to have you on the team.
        </Text>
        <Text style={text}>
          To get started, please set your password by clicking the button below:
        </Text>
        <Link
          href={setPasswordUrl}
          target="_blank"
          style={button}
        >
          Set Your Password
        </Link>
        <Text style={text}>
          Or copy and paste this link into your browser:
        </Text>
        <Text style={link}>
          {setPasswordUrl}
        </Text>
        <Text style={importantHeader}>
          Important:
        </Text>
        <div style={listContainer}>
          <Text style={listItem}>• This link is secure and will expire in 24 hours</Text>
          <Text style={listItem}>• The link can only be used once</Text>
          <Text style={listItem}>• If you have any issues, contact your administrator</Text>
        </div>
        <Text
          style={{
            ...text,
            color: '#ababab',
            marginTop: '24px',
            marginBottom: '38px',
          }}
        >
          If you didn't expect this email or have any questions, please contact your administrator.
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

EmployeePasswordSetup.PreviewProps = {
  employeeName: 'Sarah Johnson',
  setPasswordUrl: 'https://autoplanner.pro/set-password?token=abc123def456',
} as EmployeePasswordSetupProps;

export default EmployeePasswordSetup;

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
  backgroundColor: '#007bff',
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

const importantHeader = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '24px 0 12px 0',
};

const listContainer = {
  margin: '0 0 24px 0',
};

const listItem = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  margin: '8px 0',
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