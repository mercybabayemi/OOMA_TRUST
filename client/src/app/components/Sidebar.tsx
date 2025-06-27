'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/app/context/UserContext';

export const Sidebar = () => {
    const { currentUser, logout } = useUser();
    const pathname = usePathname();
    const router = useRouter();

    if (!currentUser) return null; 

    const handleLogout = () => {
        logout();
        router.push('/auth');
    };

    const navLinks = [
        { name: 'Dashboard', href: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { name: 'Profile', href: '/profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-200 flex-col hidden lg:flex">
            <div className="p-6 border-b border-gray-200">
                <h1 className="text-3xl font-bold text-blue-900 tracking-wider">OOMA</h1>
            </div>
            <nav className="flex-grow p-4 space-y-2">
                {navLinks.map(link => {
                    const isActive = pathname === link.href;
                    return (
                        <Link key={link.name} href={link.href}>
                            <a className={`flex items-center px-4 py-2 rounded-lg font-semibold ${isActive ? 'bg-amber-100/50 text-blue-900' : 'text-gray-600 hover:bg-gray-100'}`}>
                                <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} /></svg>
                                {link.name}
                            </a>
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center font-bold text-blue-900">{currentUser.avatarInitial}</div>
                    <div>
                        <p className="font-bold text-gray-800">{currentUser.name}</p>
                        <button onClick={handleLogout} className="text-sm text-red-600 hover:underline font-semibold">Log Out</button>
                    </div>
                </div>
            </div>
        </aside>
    );
};