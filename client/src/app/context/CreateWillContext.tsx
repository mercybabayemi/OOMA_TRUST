// file: client/src/app/context/CreateWillContext.tsx
import { createContext, useState, useContext, ReactNode } from 'react';

interface Asset {
    id: string;
    asset_type: string;
    description: string;
    value: string;
    document_proof_url: string;
}
interface Party {
    id: string;
    user_name: string;
    user_role: 'Beneficiary' | 'Witness' | 'Lawyer';
    relationship: string;
    email: string;
    phone_number: string;
    user_signature: string;
    user_signature_type: string;
}

interface CreateWillContextType {
    assets: Asset[];
    parties: Party[];
    addAsset: (asset: Omit<Asset, 'id'>) => void;
    updateAsset: (id: string, asset: any) => void;
    removeAsset: (id: string) => void;
    addParty: (party: Omit<Party, 'id'>) => void;
    removeParty: (id: string) => void;
    updateParty: (id: string, data: Partial<Party>) => void;
    selectedAssetIds: string[];
    setSelectedAssetIds: (ids: string[]) => void;
    selectedBeneficiaryIds: string[];
    setSelectedBeneficiaryIds: (ids: string[]) => void;
    selectedWitnessIds: string[];
    setSelectedWitnessIds: (ids: string[]) => void;
    lawyerId: string;
    setLawyerId: (id: string) => void;
    instructions: string;
    setInstructions: (text: string) => void;
    resetWill: () => void;
}

const CreateWillContext = createContext<CreateWillContextType | undefined>(undefined);

const initialAssets: Asset[] = [];
const initialParties: Party[] = [
    {
        id: 'party_3',
        user_name: 'Robert Brown',
        user_role: 'Lawyer',
        relationship: 'Legal Advisor',
        email: 'robert@example.com',
        phone_number: '555-555-5555',
        user_signature: 'N/A',
        user_signature_type: 'N/A',
    },
];

export const CreateWillProvider = ({ children }: { children: ReactNode }) => {
    const [assets, setAssets] = useState<Asset[]>(initialAssets);
    const [parties, setParties] = useState<Party[]>(initialParties);
    const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>([]);
    const [selectedBeneficiaryIds, setSelectedBeneficiaryIds] = useState<string[]>([]);
    const [selectedWitnessIds, setSelectedWitnessIds] = useState<string[]>([]);
    const [lawyerId, setLawyerId] = useState('');
    const [instructions, setInstructions] = useState('');

    const addAsset = (asset: Omit<Asset, 'id'>) => {
        const newAsset = { ...asset, id: `asset_${Date.now()}` };
        setAssets(prev => [...prev, newAsset]);
    };

    const updateAsset = (id: string, updated: Partial<Asset>) => {
        setAssets(prev => prev.map(a => a.id === id ? { ...a, ...updated } : a));
    };

    const removeAsset = (id: string) => {
        setAssets(prev => prev.filter(a => a.id !== id));
    };

    const addParty = (party: Omit<Party, 'id'>) => {
        const newParty = { ...party, id: `party_${Date.now()}` };
        setParties(prev => [...prev, newParty]);
    };
    const updateParty = (id: string, data: Partial<Party>) => {
        setParties(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
    };

    const removeParty = (id: string) => {
        setParties(prev => prev.filter(p => p.id !== id));
    };

    const resetWill = () => {
        setSelectedAssetIds([]);
        setSelectedBeneficiaryIds([]);
        setSelectedWitnessIds([]);
        setLawyerId('');
        setInstructions('');
        setAssets(initialAssets);
        setParties(initialParties);
    }

    return (
        <CreateWillContext.Provider value={{
            assets,
            parties,
            addAsset,
            updateAsset,
            removeAsset,
            addParty,
            removeParty,
            updateParty,
            selectedAssetIds,
            setSelectedAssetIds,
            selectedBeneficiaryIds,
            setSelectedBeneficiaryIds,
            selectedWitnessIds,
            setSelectedWitnessIds,
            lawyerId,
            setLawyerId,
            instructions,
            setInstructions,
            resetWill
        }}>
            {children}
        </CreateWillContext.Provider>
    );
};

export const useCreateWill = () => {
    const context = useContext(CreateWillContext);
    if (context === undefined) {
        throw new Error('useCreateWill must be used within a CreateWillProvider');
    }
    return context;
};