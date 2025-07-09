import { Resend } from 'resend';

// Check if RESEND_API_KEY is available
const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  console.warn('RESEND_API_KEY environment variable is not set. Email functionality will be disabled.');
}

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export interface EmailData {
  to: string | string[];
  subject: string;
  html: string;
  from: string;
}

export async function sendEmail(emailData: EmailData) {
  try {
    // Check if Resend is properly initialized
    if (!resend) {
      console.warn('Resend not initialized - skipping email send');
      return null;
    }

    const { data, error } = await resend.emails.send({
      from: emailData.from || 'onboarding@autoplanner.pro', // Default from address
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html
    });

    if (error) {
      console.error('Error sending email:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log('Email sent successfully:', data);
    return data;
  } catch (error) {
    console.error('Error in sendEmail function:', error);
    // Don't throw the error to prevent the entire request from failing
    // Just log it and return null
    return null;
  }
}

