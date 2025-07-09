import { render } from '@react-email/render';
import crypto from 'crypto';
import { EmailVerification } from '../../../react-email-starter/emails/email-verification';
import { sendEmail } from './resendMail';

/**
 * Generates a secure verification token
 */
export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Generates the expiration date for verification token (24 hours from now)
 */
export function generateVerificationExpiry(): Date {
  const now = new Date();
  return new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours
}

/**
 * Sends a verification email to the user
 */
export async function sendVerificationEmail(
  userEmail: string,
  userName: string,
  verificationToken: string
): Promise<void> {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const verificationUrl = `${baseUrl}/verify-email?token=${verificationToken}`;

    // Render the email template
    const emailHtml = render(
      EmailVerification({
        userName,
        verificationUrl,
      })
    );

    // Send the email
    try {
      await sendEmail({
        to: userEmail,
        subject: 'Verify Your Email Address - AutoPlanner',
        html: await emailHtml,
        from: 'noreply@autoplanner.pro'
      });

      console.log(`Verification email sent to ${userEmail}`);
    } catch (emailError) {
      console.warn('Failed to send verification email:', emailError);
      // Don't throw error to prevent the entire request from failing
    }
  } catch (error) {
    console.error('Error in sendVerificationEmail:', error);
    // Don't throw error to prevent the entire request from failing
  }
} 