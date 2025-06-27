// client/src/app/create-will/assemble/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/context/UserContext';
import { useSuiClient, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';

const PACKAGE_ID = ""; // IMPORTANT: Replace this

export default function AssemblePage() {
    const { currentUser } = useUser();
    const suiClient = useSuiClient();
    const router = useRouter();
    const { mutate: signAndExecute } = useSignAndExecuteTransaction();

    const [assets, setAssets] = useState<any[]>([]);
    const [parties, setParties] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSealing, setIsSealing] = useState(false);

    // Form State
    const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>([]);
    const [selectedBeneficiaryIds, setSelectedBeneficiaryIds] = useState<string[]>([]);
    const [selectedWitnessIds, setSelectedWitnessIds] = useState<string[]>([]);
    const [instructions, setInstructions] = useState('');

    const fetchData = async () => {
        if (!currentUser) return;
        setIsLoading(true);
        const ownedObjects = await suiClient.getOwnedObjects({ owner: currentUser.address });
        const assetObjects = [];
        const partyObjects = [];

        for (const obj of ownedObjects.data) {
            if (!obj.data) continue;
            const details = await suiClient.getObject({ id: obj.data.objectId, options: { showContent: true } });
            if(details.data?.content?.dataType !== 'moveObject') continue;

            if (obj.data?.type === `${PACKAGE_ID}::will_contract::Asset`) {
                assetObjects.push({ id: details.data.objectId, ...details.data.content.fields });
            } else if (obj.data?.type === `${PACKAGE_ID}::will_contract::WillParties`) {
                partyObjects.push({ id: details.data.objectId, ...details.data.content.fields });
            }
        }
        setAssets(assetObjects);
        setParties(partyObjects);
        setIsLoading(false);
    };

    useEffect(() => {
        if (currentUser) fetchData();
    }, [currentUser]);
    
    // Checkbox handlers
    const handleCheckboxChange = (id: string, list: string[], setList: Function) => {
        if (list.includes(id)) {
            setList(list.filter(item => item !== id));
        } else {
            setList([...list, id]);
        }
    };
    
    const handleSealWill = () => {
        if (selectedAssetIds.length === 0 || selectedBeneficiaryIds.length === 0) {
            alert("Please select at least one asset and one beneficiary.");
            return;
        }
        setIsSealing(true);
        const txb = new TransactionBlock();
        // For simplicity, we'll assume the first witness is the lawyer for the demo
        const lawyerId = selectedWitnessIds[0] || selectedBeneficiaryIds[0]; 

        txb.moveCall({
            target: `${PACKAGE_ID}::will_contract::create_will`,
            arguments: [
                txb.pure(selectedAssetIds),
                txb.pure(lawyerId),
                txb.pure(true), 
                txb.pure([instructions]),
                txb.pure(selectedBeneficiaryIds),
                txb.pure(selectedWitnessIds),
                txb.pure("user_digital_sig_placeholder"), 
                txb.pure("zkLogin_Google_placeholder"), 
            ],
        });
        
        signAndExecute({ transaction: txb.serialize() }, {
            onSuccess: (res) => {
                alert('Congratulations! Your Will has been sealed on the blockchain.');
                setIsSealing(false);
                router.push('/dashboard');
            },
            onError: (err) => {
                alert(`Error: ${err.message}`);
                setIsSealing(false);
            }
        });
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Assemble & Seal Your Will</h2>
            {isLoading ? <p>Loading your data...</p> : (
            <div className="space-y-6">
                <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">Select Assets to Include</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto p-4 bg-gray-50 rounded-md">
                        {assets.map(a => (<div key={a.id}><label className="flex items-center"><input type="checkbox" onChange={() => handleCheckboxChange(a.id, selectedAssetIds, setSelectedAssetIds)} className="h-4 w-4 rounded mr-3" /> {a.description}</label></div>))}
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">Select Beneficiaries</h3>
                     <div className="space-y-2 max-h-48 overflow-y-auto p-4 bg-gray-50 rounded-md">
                        {parties.filter(p=>p.user_role === 'Beneficiary').map(p => (<div key={p.id}><label className="flex items-center"><input type="checkbox" onChange={() => handleCheckboxChange(p.id, selectedBeneficiaryIds, setSelectedBeneficiaryIds)} className="h-4 w-4 rounded mr-3" /> {p.user_name}</label></div>))}
                    </div>
                </div>
                 <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">Select Witnesses</h3>
                     <div className="space-y-2 max-h-48 overflow-y-auto p-4 bg-gray-50 rounded-md">
                        {parties.filter(p=>p.user_role === 'Witness').map(p => (<div key={p.id}><label className="flex items-center"><input type="checkbox" onChange={() => handleCheckboxChange(p.id, selectedWitnessIds, setSelectedWitnessIds)} className="h-4 w-4 rounded mr-3" /> {p.user_name}</label></div>))}
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">Final Instructions</h3>
                    <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="e.g., 'My Lekki property should be split equally between my children...'" className="w-full h-24 p-2 border rounded-md"></textarea>
                </div>
            </div>
            )}
             <div className="flex justify-between items-center mt-8 pt-6 border-t">
                <Link href="/create-will/parties" className="text-gray-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100">← Back to People</Link>
                <button onClick={handleSealWill} disabled={isLoading || isSealing} className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 disabled:bg-gray-400">
                    {isSealing ? 'Sealing On-Chain...' : 'Submit & Seal Will'}
                </button>
            </div>
        </div>
    );
}