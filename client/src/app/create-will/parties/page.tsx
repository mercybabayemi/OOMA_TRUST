// file: client/src/app/create-will/parties/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@/app/context/UserContext';
import { useSuiClient, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { TransactionBlock } from '@mysten/sui.js/transactions';

const PACKAGE_ID = "0x7cbae728889ba3f3805070bad9d57e9f1e71237ce5b18a55e9bd609a11d93d71"; 

export default function PartiesPage() {
    const { currentUser } = useUser();
    const suiClient = useSuiClient();
    const { mutate: signAndExecute } = useSignAndExecuteTransaction();

    const [parties, setParties] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('Beneficiary'); // Default role

    // Fetch existing WillParties objects
    const fetchParties = async () => {
        if (!currentUser) return;
        setIsLoading(true);
        const ownedObjects = await suiClient.getOwnedObjects({ owner: currentUser.address });
        const partyObjects = [];
        for (const obj of ownedObjects.data) {
            if (obj.data?.type === `${PACKAGE_ID}::will_contract::WillParties`) {
                 const details = await suiClient.getObject({ id: obj.data.objectId, options: { showContent: true } });
                if (details.data?.content?.dataType === 'moveObject') {
                    partyObjects.push({ id: details.data.objectId, ...details.data.content.fields });
                }
            }
        }
        setParties(partyObjects);
        setIsLoading(false);
    };

    useEffect(() => {
        if (currentUser) fetchParties();
    }, [currentUser]);

    // Handle adding a new party (Beneficiary or Witness)
    const handleAddParty = () => {
        if (!name || !email) {
            alert("Please fill in all fields.");
            return;
        }
        setIsSubmitting(true);
        const txb = new TransactionBlock();
        const targetFunction = role === 'Beneficiary' ? 'create_beneficiary' : 'create_witness';

        txb.moveCall({
            target: `${PACKAGE_ID}::will_contract::${targetFunction}`,
            arguments: [
                txb.pure(name),
                txb.pure("digital_sig_placeholder"), // user_signature
                txb.pure("NIN_placeholder"), // user_signature_type
                txb.pure("080-placeholder"), // phone_number
                txb.pure(email),
            ],
        });

        signAndExecute({ transaction: txb.serialize() }, {
            onSuccess: () => {
                alert(`${role} added successfully!`);
                setName(''); setEmail('');
                fetchParties();
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
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Define Important People</h2>
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6 space-y-4">
                <h3 className="font-bold text-lg text-blue-900">Add a Beneficiary or Witness</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Full Name" className="px-4 py-2 border rounded-md" />
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" className="px-4 py-2 border rounded-md" />
                </div>
                <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-2 border rounded-md bg-white">
                    <option value="Beneficiary">Beneficiary (will receive assets)</option>
                    <option value="Witness">Witness (will validate the will)</option>
                </select>
                <button onClick={handleAddParty} disabled={isSubmitting} className="bg-blue-900 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-800 disabled:bg-gray-400">
                    {isSubmitting ? 'Adding...' : `Add ${role}`}
                </button>
            </div>
            <div>
                <h3 className="font-bold text-lg mb-4">Your Saved People</h3>
                {isLoading ? <p>Loading...</p> : (
                    <div className="space-y-3">
                        {parties.length > 0 ? parties.map(p => (
                            <div key={p.id} className="bg-white border p-4 rounded-lg flex justify-between items-center">
                                <div><p className="font-bold">{p.user_name}</p><p className="text-sm text-gray-500">{p.email}</p></div>
                                <span className="text-sm font-bold bg-gray-200 text-gray-700 px-3 py-1 rounded-full">{p.user_role}</span>
                            </div>
                        )) : <p className="text-gray-500 text-center py-4">You haven't added any people yet.</p>}
                    </div>
                )}
            </div>
            <div className="flex justify-between mt-8">
                <Link href="/create-will/assets" className="text-gray-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100">← Back to Assets</Link>
                <Link href="/create-will/assemble" className="bg-amber-400 text-blue-900 font-bold py-3 px-8 rounded-lg hover:bg-amber-300">Next: Assemble Will →</Link>
            </div>
        </div>
    );
}