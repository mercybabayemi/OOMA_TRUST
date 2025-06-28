'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sidebar } from '../components/Sidebar';
import { CreateWillProvider } from '../context/CreateWillContext';
import { Toaster } from 'react-hot-toast';

const Stepper = () => {
  const pathname = usePathname();
  const steps = [
    { href: '/create-will/assets', name: 'Declare Assets' },
    { href: '/create-will/parties', name: 'Define People' },
    { href: '/create-will/assemble', name: 'Preview and Save' },
  ];

  const currentStepIndex = steps.findIndex((step) =>
    pathname.startsWith(step.href)
  );

  return (
    <div className="w-full bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        {steps.map((step, index) => {
          const isActive = currentStepIndex === index;
          const isCompleted = currentStepIndex > index;

          return (
            <div key={step.name} className="flex items-center flex-1">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-lg font-semibold transition-all duration-300
                    ${isCompleted ? 'bg-green-500 text-white' : ''}
                    ${isActive ? 'bg-blue-900 text-white shadow-md' : ''}
                    ${!isCompleted && !isActive ? 'bg-gray-200 text-gray-500' : ''}
                  `}
                >
                  {isCompleted ? '✓' : index + 1}
                </div>
                <div className="hidden md:block">
                  <div
                    className={`text-sm font-semibold ${
                      isActive || isCompleted
                        ? 'text-blue-900'
                        : 'text-gray-500'
                    }`}
                  >
                    Step {index + 1}
                  </div>
                  <div className="text-xs text-gray-500">{step.name}</div>
                </div>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-1 bg-gray-200 mx-2 rounded relative hidden md:block">
                  <div
                    className={`absolute top-0 left-0 h-1 rounded bg-blue-900 transition-all duration-500 ${
                      isCompleted || isActive ? 'w-full' : 'w-0'
                    }`}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function CreateWillLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CreateWillProvider>
      <div className="flex min-h-screen bg-gray-50 font-sans">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6 md:p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              {/* Back link */}
              <header className="mb-8">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-blue-900 transition-colors"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back to Dashboard
                </Link>
                <h1 className="text-4xl font-bold text-blue-900 mt-3">
                  Create Your E-Will
                </h1>
                <p className="text-gray-600 mt-1">
                  Follow these steps to secure your legacy on the blockchain.
                </p>
              </header>

              {/* Stepper */}
              <div className="mb-10">
                <Stepper />
              </div>

              {/* Step Page Content */}
              {children}
            </div>
          </main>
        </div>

        {/* Toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontSize: '0.875rem',
              borderRadius: '8px',
              padding: '12px 16px',
            },
            success: {
              style: {
                background: '#ecfdf5',
                color: '#065f46',
              },
            },
            error: {
              style: {
                background: '#fef2f2',
                color: '#991b1b',
              },
            },
          }}
        />
      </div>
    </CreateWillProvider>
  );
}
