'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/context/UserContext';

const Sidebar = ({ userName, avatarInitial, isVerified, onLogout }: { userName: string; avatarInitial: string; isVerified: boolean; onLogout: () => void; }) => (
    <aside className="w-64 bg-white border-r border-gray-200 flex-col hidden lg:flex">
         <Link href="/" className="p-2 border-gray-200 flex items-center justify-center">
            <img src="/images/logo.svg" alt="OOMA Logo" className="h-10 w-auto" />
          </Link>
        <nav className="flex-grow p-4 space-y-2">
            <Link href="/dashboard" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Dashboard</Link>
            <Link
                href={isVerified ? "/my-will" : "#"}
                className={`flex items-center px-4 py-2 rounded-lg ${isVerified ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-400 cursor-not-allowed'}`}
                aria-disabled={!isVerified}
                tabIndex={isVerified ? 0 : -1}
            >
                My E-Will
            </Link>
            <Link href="/profile" className="flex items-center px-4 py-2 text-gray-700 bg-amber-100/50 rounded-lg font-bold">Profile</Link>
        </nav>
        <div className="p-4 border-t border-gray-200"><div className="flex items-center space-x-3"><div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center font-bold text-blue-900">{avatarInitial}</div><div><p className="font-bold text-gray-800">{userName}</p><button onClick={onLogout} className="text-sm text-red-600 hover:underline font-semibold">Log Out</button></div></div></div>
    </aside>
);

const StatusBadge = ({ status }: { status: 'unverified' | 'pending' | 'verified' }) => {
    const styles = { unverified: 'bg-red-100 text-red-800', pending: 'bg-yellow-100 text-yellow-800 animate-pulse', verified: 'bg-green-100 text-green-800' };
    const text = { unverified: 'Unverified', pending: 'Pending Review', verified: 'Verified' };
    return <span className={`px-3 py-1 text-sm font-bold rounded-full ${styles[status]}`}>{text[status]}</span>;
};

import { useEffect } from 'react';

export default function ProfilePage() {
    const { currentUser, verifyUser, logout, isLoading } = useUser();
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    // Redirect to /auth if not logged in
    useEffect(() => {
        if (!isLoading && !currentUser) {
            router.push('/auth');
        }
    }, [isLoading, currentUser, router]);

    // Redirect to /auth if not logged in
    if (!currentUser) {
        return null;
    }

    if (isLoading) {
        return <div className="flex h-screen items-center justify-center"><div className="w-16 h-16 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div></div>;
    }

    if (!currentUser) {
        router.push('/auth');
        return null;
    }
    
    const handleVerification = () => {
        setIsPending(true);
        setTimeout(() => {
            verifyUser();
            setIsPending(false);
        }, 3000);
    };
    const verificationStatus = currentUser.isVerified ? 'verified' : (isPending ? 'pending' : 'unverified');
    function handleLogout(): void {
        logout();
        router.push('/auth');
    }

    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            <Sidebar userName={currentUser.name} avatarInitial={currentUser.avatarInitial} isVerified={currentUser.isVerified} onLogout={handleLogout} />
            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                <header className="mb-10"><h1 className="text-3xl font-bold text-gray-800">Profile & Verification</h1><p className="text-gray-500">Manage your personal information and account security.</p></header>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 max-w-3xl">
                    <div className="p-6 border-b border-gray-200"><h2 className="text-xl font-bold text-blue-900">Identity Verification</h2></div>
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6"><p className="text-gray-600">Your current verification status:</p><StatusBadge status={verificationStatus} /></div>
                        
                        {verificationStatus === 'verified' ? (
                            <div className="p-6 bg-green-100/60 rounded-lg text-center">
                                <div className="flex justify-center mb-4">
                                    <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="font-semibold text-lg text-green-800">Verification Complete!</h3>
                                <p className="text-sm text-gray-600 mb-4">You now have full access to all OOMA features.</p>
                                <Link href="/dashboard">
                                    <button className="mt-4 bg-blue-900 text-white !text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-800 transition">
                                        Return to Dashboard
                                    </button>
                                </Link>
                            </div>
                        ) : verificationStatus === 'pending' ? (
                            <div className="p-6 bg-gray-100 rounded-lg text-center">
                                <div className="flex justify-center mb-4">
                                    <div className="w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                                <h3 className="font-semibold text-lg text-gray-700">Review in Progress...</h3>
                                <p className="text-sm text-gray-500">Your documents are being securely verified.</p>
                            </div>
                        ) : (
                            <div className="p-6 bg-amber-100/50 rounded-lg text-center">
                                <h3 className="font-bold text-gray-800 mb-2">Verification Required</h3>
                                <p className="text-sm text-gray-600 mb-4">Please provide a government-issued ID and be ready for a liveness check.</p>
                                <button onClick={handleVerification} className="bg-blue-900 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-800">Start Secure Verification</button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}