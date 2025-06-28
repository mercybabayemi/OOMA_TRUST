// file: client/src/app/dashboard/page.tsx
'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/context/UserContext';
import React from 'react';

const Sidebar = ({ userName, avatarInitial, isVerified, onLogout }: { userName: string; avatarInitial: string; isVerified: boolean; onLogout: () => void; }) => (
    <aside className="w-64 bg-white border-r border-gray-200 flex-col hidden lg:flex">
        <Link href="/" className="p-6 border-gray-200 flex items-center justify-center">
            <img src="/images/logo.svg" alt="OOMA Logo" className="h-10 w-auto" />
        </Link>
        <nav className="flex-grow p-4 space-y-2">
            <Link href="/dashboard" className="flex items-center px-4 py-2 text-gray-700 bg-amber-100/50 rounded-lg font-bold">Dashboard</Link>
            <Link
                href={isVerified ? "/my-will" : "#"}
                className={`flex items-center px-4 py-2 rounded-lg ${isVerified ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-400 cursor-not-allowed'}`}
                aria-disabled={!isVerified}
                tabIndex={isVerified ? 0 : -1}
            >
                My E-Will {!isVerified && <span className="ml-auto text-xs font-bold text-gray-400">Locked</span>}
            </Link>
            <Link href="/profile" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Profile</Link>
        </nav>
        <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3"><div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center font-bold text-blue-900">{avatarInitial}</div><div><p className="font-bold text-gray-800">{userName}</p><button onClick={onLogout} className="text-sm text-red-600 hover:underline font-semibold">Log Out</button></div></div>
        </div>
    </aside>
);

const InfoCard = ({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-all hover:border-blue-500 hover:-translate-y-1"><div className="flex items-center space-x-4"><div className="bg-blue-100/50 p-3 rounded-lg">{icon}</div><div><p className="text-sm text-gray-500">{title}</p><p className="text-xl font-bold text-blue-900">{value}</p></div></div></div>
);

export default function DashboardPage() {
    const { currentUser, logout, isLoading } = useUser();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/auth');
    };

    if (isLoading) {
        return <div className="flex h-screen items-center justify-center"><div className="w-16 h-16 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div></div>;
    }

    React.useEffect(() => {
        if (!currentUser && !isLoading) {
            router.push('/auth');
        }
    }, [currentUser, isLoading, router]);

    if (!currentUser && !isLoading) {
        return null;
    }

    const userName = currentUser?.name ?? '';
    const isVerified = currentUser?.isVerified ?? false;
    const avatarInitial = userName ? userName.charAt(0).toUpperCase() : '';

    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            <Sidebar userName={userName} avatarInitial={avatarInitial} isVerified={isVerified} onLogout={handleLogout} />
            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                <header className="mb-10"><h1 className="text-3xl font-bold text-gray-800">Welcome back, {userName}!</h1><p className="text-gray-500">Let's continue securing your legacy.</p></header>
                {!isVerified ? (
                    <div className="bg-white border-2 border-amber-400 rounded-xl p-8 text-center max-w-3xl mx-auto shadow-lg"><div className="w-16 h-16 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-4"><svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h2a2 2 0 012 2v1m-6 0h6" /></svg></div><h2 className="font-bold text-2xl text-blue-900 mb-2">One Last Step to Secure Your Account</h2><p className="text-gray-600 mb-6">Please complete our one-time identity verification to unlock all features.</p><Link href="/profile" className="inline-block bg-blue-900 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-800 transition-transform hover:scale-105">Start Verification</Link></div>
                ) : (
                    <div>
                        <div className="bg-blue-900 text-white rounded-xl p-8 mb-8 shadow-xl"><h2 className="font-bold text-3xl mb-2">You're All Set!</h2><p className="text-blue-200 mb-6 max-w-prose">Your identity is verified. You can now create your will, secure your assets, and protect your beneficiaries.</p>
                        <Link href="/create-will/assets" className="bg-amber-400 text-blue-900 font-bold py-3 px-8 rounded-lg hover:bg-amber-300 transition-transform hover:scale-105">Write my Will</Link></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <InfoCard title="Will Status" value="Not Created" icon={<span className="text-2xl">📄</span>} />
                            <InfoCard title="Assets Secured" value="0" icon={<span className="text-2xl">💎</span>} />
                            <InfoCard title="Beneficiaries" value="0" icon={<span className="text-2xl">👥</span>} />
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}