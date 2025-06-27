'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Metadata } from 'next';
import { useUser, User } from '@/app/context/UserContext';

const metadata: Metadata = {
  title: "Account | OOMA TRUST",
  description: "Sign in or create your secure OOMA account.",
};

const SocialButton = ({ provider, iconSrc, onClick }: { provider: string, iconSrc: string, onClick: () => void }) => (
    <button onClick={onClick} className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300 shadow-sm">
        <Image src={iconSrc} alt={`${provider} logo`} width={24} height={24} />
        <span className="ml-4 font-bold text-gray-700">Continue with {provider}</span>
    </button>
);

const BenefitItem = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <div className="text-center">
        <div className="mx-auto h-12 w-12 flex items-center justify-center bg-amber-100/60 rounded-full text-amber-500">
            {icon}
        </div>
        <h4 className="mt-2 font-bold text-sm text-blue-900">{title}</h4>
        <p className="text-xs text-gray-500">{children}</p>
    </div>
);

export default function AuthPage() {
    const [loginState, setLoginState] = useState<'idle' | 'loading' | 'success'>('idle');
    const { currentUser, login } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (currentUser) {
            router.push('/dashboard');
        }
    }, [currentUser, router]);
    
    const handleLogin = () => {
        setLoginState('loading');

        const kayodeUnverified: User = { id: 1, name: 'Kayode', isVerified: false, avatarInitial: 'K' , address: '0x92b564a804d86cd74d2d13324de568ba89cd3ad9825aa655e959acee229742ef' };

        setTimeout(() => {
            login(kayodeUnverified);
            setLoginState('success');
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-blue-900 flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-5xl min-h-[720px] bg-white rounded-2xl shadow-2xl overflow-hidden flex">
                <div className="w-full lg:w-1/2 p-8 md:p-12 relative h-full flex flex-col">
                    {loginState !== 'idle' && (
                        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center transition-opacity duration-300">
                            {loginState === 'loading' && <><div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div><p className="mt-4 font-bold text-blue-900">Connecting to secure provider...</p></>}
                            {loginState === 'success' && <><div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center"><svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></div><p className="mt-4 font-bold text-green-700">Authentication Successful!</p><p className="text-sm text-gray-600">Redirecting...</p></>}
                        </div>
                    )}
    
                    <div className="absolute top-6 left-6">
                        <Link href="/" className="flex items-center text-sm font-semibold text-gray-500 hover:text-blue-900 transition-colors">
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            Return to Home
                        </Link>
                    </div>

                    <div className="flex-grow flex flex-col justify-center pt-12">
                        <div className="text-center">
                           {/*<Image src="/ooma.png" alt="OOMA Logo" width={80} height={40} className="mx-auto mb-4" />*/}
                            <h2 className="text-3xl font-bold text-blue-900 mb-2">Secure Your Legacy</h2>
                            <p className="text-gray-500 mb-8">Sign in or create your account instantly.</p>
                            
                            <div className="space-y-4 max-w-sm mx-auto">
                                <SocialButton provider="Google" iconSrc="/images/google.svg" onClick={handleLogin} />
                                <SocialButton provider="Sui Wallet" iconSrc="/images/sui.svg" onClick={handleLogin} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <div className="grid grid-cols-3 gap-4">
                            <BenefitItem icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>} title="Immutable">
                                Built on a secure blockchain ledger.
                            </BenefitItem>
                            <BenefitItem icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>} title="Accessible">
                                Manage your legacy from any device.
                            </BenefitItem>
                            <BenefitItem icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>} title="Instant">
                                Settle your estate in seconds, not years.
                            </BenefitItem>
                        </div>
                    </div>
                </div>

                <div className="hidden lg:flex w-1/2 bg-amber-400 text-blue-900 flex-col items-center justify-center text-center p-12 relative">
                    <div className="absolute inset-0 z-0 flex items-center justify-center"><span className="text-9xl font-black text-blue-900/5 select-none">OOMA</span></div>
                    <div className="relative z-10 flex flex-col justify-center h-full">
                        <div className="flex-grow flex flex-col items-center justify-center">
                            <h1 className="text-4xl font-bold mb-4">A New Standard for Trust</h1>
                            <p className="mb-8 font-light leading-relaxed">Join OOMA to secure your digital and physical assets on an immutable, transparent ledger.</p>
                        </div>
                        <div className="w-full mt-8 border-t-2 border-blue-900/20 pt-6">
                            <blockquote className="text-blue-900/80 italic">"For the first time, I have peace of mind knowing my digital assets are secure for my family. OOMA made a complex problem feel simple and trustworthy."</blockquote>
                            <p className="mt-4 font-bold">- Queen, Wealthy Business Owner</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}