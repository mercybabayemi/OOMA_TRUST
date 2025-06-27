// client/src/app/create-will/layout.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Stepper = () => {
    const pathname = usePathname();
    const steps = [
        { href: '/create-will/assets', name: '1. Assets' },
        { href: '/create-will/parties', name: '2. People' },
        { href: '/create-will/assemble', name: '3. Assemble' },
    ];

    return (
        <nav className="flex items-center justify-center space-x-4 md:space-x-8 p-4 bg-white rounded-xl shadow-md border border-gray-200">
            {steps.map((step, index) => {
                const isActive = pathname.startsWith(step.href);
                return (
                    <div key={step.name} className="flex items-center">
                        <span className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${isActive ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-500'}`}>
                            {index + 1}
                        </span>
                        <span className={`ml-3 font-medium hidden md:inline ${isActive ? 'text-blue-900' : 'text-gray-500'}`}>
                            {step.name.split('. ')[1]}
                        </span>
                    </div>
                );
            })}
        </nav>
    );
};


export default function CreateWillLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50 font-sans p-4 md:p-8">
            <header className="max-w-4xl mx-auto mb-8">
                <Link
                    href="/dashboard"
                    className="text-sm font-semibold text-gray-500 hover:text-blue-900"
                > ← Back to Dashboard
                </Link>
                <h1 className="text-4xl font-bold text-blue-900 mt-2">Create Your E-Will</h1>
                <p className="text-gray-600">Follow these steps to secure your legacy on the blockchain.</p>
            </header>
            <div className="max-w-4xl mx-auto mb-8">
                <Stepper />
            </div>
            <main className="max-w-4xl mx-auto">
                {children}
            </main>
        </div>
    );
}