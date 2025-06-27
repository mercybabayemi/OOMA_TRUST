'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { UserProvider } from './context/UserContext';

const queryClient = new QueryClient();

export function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <SuiClientProvider>
                <WalletProvider>
                    <UserProvider>
                        {children}
                    </UserProvider>
                </WalletProvider>
            </SuiClientProvider>
        </QueryClientProvider>
    );
}