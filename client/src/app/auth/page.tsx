// client/src/app/auth/page.tsx

'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Metadata } from 'next';

const metadata: Metadata = {
    title: "Account | OOMA TRUST",
    description: "Sign in or create your secure OOMA account.",
};

const SocialButton = ({ provider, iconSrc }: { provider: string, iconSrc: string }) => (
    <button className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300">
        <Image src={iconSrc} alt={`${provider} logo`} width={20} height={20} />
        <span className="ml-3 font-medium text-gray-700">Continue with {provider}</span>
    </button>
);

const BenefitItem = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 h-6 w-6 text-amber-500">{icon}</div>
        <div>
            <h4 className="font-bold text-gray-800">{title}</h4>
            <p className="text-sm text-gray-500">{children}</p>
        </div>
    </div>
);

export default function AuthPage() {
    const [isSignUp, setIsSignUp] = useState(false);

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <div className="min-h-screen bg-blue-900 flex items-center justify-center p-4 font-sans">
         
            <div className="relative w-full max-w-5xl min-h-[720px] bg-white rounded-2xl shadow-2xl overflow-hidden flex items-center">

                <div
                    className={`absolute top-0 left-0 h-full w-full lg:w-1/2 flex flex-col justify-center transition-all duration-700 ease-in-out ${isSignUp ? 'lg:translate-x-full' : ''}`}
                >
                    <div className="p-8 md:p-12 text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            {isSignUp ? 'Create Account' : 'Welcome Back!'}
                        </h2>
                        <p className="text-gray-500 mb-6">
                            {isSignUp ? "Let's get you started." : 'Sign in to access your dashboard.'}
                        </p>

                        <div className="space-y-4">
                            <SocialButton provider="Google" iconSrc="/google.svg" />
                            <SocialButton provider="Sui Wallet" iconSrc="/sui.svg" />
                        </div>

                        <div className="my-6 flex items-center">
                            <div className="flex-grow border-t border-gray-200"></div>
                            <span className="flex-shrink mx-4 text-gray-400 text-sm font-medium">OR</span>
                            <div className="flex-grow border-t border-gray-200"></div>
                        </div>

                        <form className="space-y-3 text-left">
                            {isSignUp && (
                                <div><input placeholder="Full Name" type="text" required className="block w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:ring-amber-500 focus:border-amber-500" /></div>
                            )}
                            <div><input placeholder="Email Address" type="email" required className="block w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:ring-amber-500 focus:border-amber-500" /></div>
                            <div><input placeholder="Password" type="password" required className="block w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:ring-amber-500 focus:border-amber-500" /></div>
                            {isSignUp && (
                                <div><input placeholder="Confirm Password" type="password" required className="block w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:ring-amber-500 focus:border-amber-500" /></div>
                            )}
                            <div className="pt-2">
                                <button type="submit" className={`w-full py-3 font-bold rounded-lg transition-colors shadow-md ${isSignUp ? 'bg-amber-400 text-blue-900 hover:bg-amber-500' : 'bg-blue-900 text-white hover:bg-blue-800'}`}>
                                    {isSignUp ? 'SIGN UP' : 'SIGN IN'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
              
                <div
                    className={`hidden lg:flex absolute top-0 left-1/2 w-1/2 h-full bg-amber-400 text-blue-900 flex-col items-center justify-center text-center p-12 transition-all duration-700 ease-in-out ${isSignUp ? '-translate-x-full' : ''}`}
                >
                    <div className="absolute inset-0 z-0 flex items-center justify-center">
                        <span className="text-9xl font-black text-blue-900/5 select-none">OOMA</span>
                    </div>

                    <div className="relative z-10 flex flex-col justify-between h-full">
                        <div>
                            <h1 className="text-4xl font-bold mb-4">
                                {isSignUp ? 'Welcome Back!' : 'Hello, Friend!'}
                            </h1>
                            <p className="mb-8 font-light leading-relaxed">
                                {isSignUp
                                    ? 'To keep connected with us please login with your personal info'
                                    : 'Enter your personal details and start your journey with us'}
                            </p>
                            <button
                                onClick={toggleForm}
                                className="py-3 px-8 font-bold bg-transparent border-2 border-blue-900 rounded-full hover:bg-blue-900 hover:text-white transition-colors duration-300"
                            >
                                {isSignUp ? 'SIGN IN' : 'SIGN UP'}
                            </button>
                        </div>

                        <div className="mt-8 border-t-2 border-blue-900/20 pt-6">
                            <blockquote className="text-blue-900/80 italic">
                                “For the first time, I have peace of mind knowing my digital assets are secure for my family. OOMA made a complex problem feel simple and trustworthy.”
                            </blockquote>
                            <p className="mt-4 font-bold">- Adanna, Product Manager</p>
                        </div>
                    </div>
                </div>

                <div className="lg:hidden absolute bottom-4 left-0 w-full text-center py-4">
                    <p className="text-gray-600">
                        {isSignUp ? 'Already have an account?' : 'Don\'t have an account?'}
                        <button onClick={toggleForm} className="font-bold text-blue-800 hover:underline ml-2">
                            {isSignUp ? 'Sign In' : 'Sign Up'}
                        </button>
                    </p>
                </div>

            </div>
        </div>
    );
}