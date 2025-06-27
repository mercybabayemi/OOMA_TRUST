'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@/app/context/UserContext';
import { useSuiClient, useSignAndExecuteTransaction} from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';

const PACKAGE_ID = "0x7cbae728889ba3f3805070bad9d57e9f1e71237ce5b18a55e9bd609a11d93d71"; // IMPORTANT: Replace this

export default function AssetsPage() {
    const { currentUser } = useUser();
    const suiClient = useSuiClient();
    const { mutate: signAndExecute } = useSignAndExecuteTransaction();

    const [assets, setAssets] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Form State
    const [assetType, setAssetType] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('0');

    // Fetch user's existing Asset objects
    const fetchAssets = async () => {
        if (!currentUser) return;
        setIsLoading(true);
        const ownedObjects = await suiClient.getOwnedObjects({ owner: currentUser.address });
        const assetObjects = [];
        for (const obj of ownedObjects.data) {
            if (obj.data?.type === `${PACKAGE_ID}::will_contract::Asset`) {
                const details = await suiClient.getObject({ id: obj.data.objectId, options: { showContent: true } });
                if (details.data?.content?.dataType === 'moveObject') {
                    assetObjects.push({ id: details.data.objectId, ...details.data.content.fields });
                }
            }
        }
        setAssets(assetObjects);
        setIsLoading(false);
    };

    useEffect(() => {
        if (currentUser) fetchAssets();
    }, [currentUser]);

    // Handle the creation of a new asset
    const handleAddAsset = () => {
        if (!assetType || !description) {
            alert("Please fill in all fields.");
            return;
        }
        setIsSubmitting(true);
        const txb = new TransactionBlock();
        txb.moveCall({
            target: `${PACKAGE_ID}::will_contract::create_asset`,
            arguments: [
                txb.pure(assetType),
                txb.pure(description),
                txb.pure("ipfs://placeholder_for_now"),
                txb.pure(parseInt(value)),
            ],
        });

        signAndExecute({ transaction: txb.serialize() }, {
            onSuccess: () => {
                alert('Asset added successfully!');
                setAssetType(''); setDescription(''); setValue('0');
                fetchAssets();
                setIsSubmitting(false);
            },
            onError: (err) => {
                alert(`Error: ${err.message}`);
                setIsSubmitting(false);
            }
        });
    };
    
    return (
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Declare Your Assets</h2>
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6 space-y-4">
                <h3 className="font-bold text-lg text-blue-900">Add a New Asset</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input value={assetType} onChange={(e) => setAssetType(e.target.value)} type="text" placeholder="Asset Type (e.g., Real Estate)" className="px-4 py-2 border rounded-md w-full" />
                    <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Description (e.g., Lekki Property)" className="px-4 py-2 border rounded-md w-full" />
                </div>
                 <input value={value} onChange={(e) => setValue(e.target.value)} type="number" placeholder="Estimated Value (in USD)" className="px-4 py-2 border rounded-md w-full" />
                <button onClick={handleAddAsset} disabled={isSubmitting} className="bg-blue-900 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-800 disabled:bg-gray-400">
                    {isSubmitting ? 'Adding...' : 'Add Asset to Ledger'}
                </button>
            </div>

            <div>
                <h3 className="font-bold text-lg mb-4">Your Declared Assets</h3>
                {isLoading ? <p>Loading assets...</p> : (
                    <div className="space-y-3">
                        {assets.length > 0 ? assets.map(asset => (
                            <div key={asset.id} className="bg-white border p-4 rounded-lg flex justify-between items-center">
                                <div><p className="font-bold">{asset.asset_type}</p><p className="text-sm text-gray-500">{asset.description}</p></div>
                                <span className="text-xs font-mono text-green-600 font-bold bg-green-100 px-2 py-1 rounded-full">On-Chain ✅</span>
                            </div>
                        )) : <p className="text-gray-500 text-center py-4">You haven't added any assets yet.</p>}
                    </div>
                )}
            </div>

            <div className="text-right mt-8">
                <Link
                    href="/create-will/parties"
                    className="bg-amber-400 text-blue-900 font-bold py-3 px-8 rounded-lg hover:bg-amber-300"
                >
                    Next: Define People
                </Link>
            </div>
        </div>
    );
}