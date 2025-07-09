'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function VerifyEmailPage() {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');
    const [isResending, setIsResending] = useState(false);
    
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');

    const verifyEmail = useCallback(async (verificationToken: string) => {
        try {
            const response = await fetch(`/api/auth/verify-email?token=${verificationToken}`);
            const data = await response.json();

            if (data.success) {
                setStatus('success');
                setMessage(data.message);
                
                // Redirect to sign in page after 3 seconds
                setTimeout(() => {
                    router.push('/signin');
                }, 3000);
            } else {
                setStatus('error');
                setMessage(data.error);
            }
        } catch (error) {
            setStatus('error');
            setMessage('An error occurred while verifying your email');
            console.error('Email verification error:', error);
        }
    }, [router]);

    useEffect(() => {
        if (token) {
            verifyEmail(token);
        } else {
            setStatus('error');
            setMessage('No verification token provided');
        }
    }, [token, verifyEmail]);

    const resendVerificationEmail = async () => {
        const email = prompt('Please enter your email address to resend verification:');
        if (!email) return;

        setIsResending(true);
        try {
            const response = await fetch('/api/auth/verify-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            
            if (data.success) {
                alert('Verification email sent successfully! Please check your email.');
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            alert('Failed to resend verification email');
            console.error('Resend email error:', error);
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="text-center">
                        {status === 'loading' && (
                            <>
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                    Verifying your email...
                                </h2>
                                <p className="text-gray-600">
                                    Please wait while we verify your email address.
                                </p>
                            </>
                        )}

                        {status === 'success' && (
                            <>
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                                    <svg
                                        className="h-6 w-6 text-green-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                    Email Verified Successfully!
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    {message}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Redirecting to sign in page in 3 seconds...
                                </p>
                                <button
                                    onClick={() => router.push('/signin')}
                                    className="mt-4"
                                >
                                    Go to Sign In
                                </button>
                            </>
                        )}

                        {status === 'error' && (
                            <>
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                                    <svg
                                        className="h-6 w-6 text-red-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                    Verification Failed
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    {message}
                                </p>
                                <div className="space-y-2">
                                    <button
                                        onClick={resendVerificationEmail}
                                        disabled={isResending}
                                        className="w-full"
                                    >
                                        {isResending ? 'Resending...' : 'Resend Verification Email'}
                                    </button>
                                    <button
                                        onClick={() => router.push('/signin')}
                                        className="w-full"
                                    >
                                        Go to Sign In
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 