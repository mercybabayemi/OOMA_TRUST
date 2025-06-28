'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCreateWill } from '@/app/context/CreateWillContext';

const CheckboxItem = ({ item, isChecked, onToggle, showValue = false }: any) => (
  <div className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
    <label className="flex items-start gap-3 cursor-pointer">
      <input 
        type="checkbox" 
        checked={isChecked} 
        onChange={onToggle} 
        className="mt-1 h-5 w-5 rounded-md border-gray-300 text-blue-900 focus:ring-blue-800" 
      />
      <div className="flex-1 space-y-0.5">
        <span className="block font-semibold text-gray-800">{item.description || item.user_name}</span>
        {item.relationship && <span className="text-xs text-gray-600 block">{item.relationship}</span>}
        {showValue && item.value && <span className="text-sm font-semibold text-green-600 block">{item.value}</span>}
      </div>
      <span className="ml-auto text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
        {item.asset_type || item.user_role}
      </span>
    </label>
  </div>
);

const PreviewSection = ({ title, items }: { title: string; items: any[] }) => (
  <div>
    <h4 className="text-md font-bold text-blue-900 mb-2">{title}</h4>
    {items.length > 0 ? (
      <ul className="space-y-2">
        {items.map(item => (
          <li key={item.id} className="text-sm text-gray-800 bg-white border-l-4 border-amber-400 rounded-md px-4 py-2">
            <span className="font-medium">{item.description || item.user_name}</span>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-sm text-gray-500 italic bg-gray-50 px-4 py-3 rounded-md">None selected.</p>
    )}
  </div>
);

export default function AssemblePage() {
  const {
    assets,
    parties,
    instructions,
    setInstructions,
    selectedAssetIds,
    setSelectedAssetIds,
    selectedBeneficiaryIds,
    setSelectedBeneficiaryIds,
    selectedWitnessIds,
    setSelectedWitnessIds,
    lawyerId,
    setLawyerId,
    resetWill
  } = useCreateWill();

  const router = useRouter();
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSealing, setIsSealing] = useState(false);

  const beneficiaries = useMemo(() => parties.filter(p => p.user_role === 'Beneficiary'), [parties]);
  const witnesses = useMemo(() => parties.filter(p => p.user_role === 'Witness'), [parties]);
  const lawyers = useMemo(() => parties.filter(p => p.user_role === 'Lawyer'), [parties]);

  const previewAssets = useMemo(() => assets.filter(a => selectedAssetIds.includes(a.id)), [assets, selectedAssetIds]);
  const previewBeneficiaries = useMemo(() => beneficiaries.filter(b => selectedBeneficiaryIds.includes(b.id)), [beneficiaries, selectedBeneficiaryIds]);
  const previewWitnesses = useMemo(() => witnesses.filter(w => selectedWitnessIds.includes(w.id)), [witnesses, selectedWitnessIds]);

  const handleToggle = (id: string, list: string[], setList: (ids: string[]) => void) => {
    setList(list.includes(id) ? list.filter(item => item !== id) : [...list, id]);
  };

  const handleSealWill = () => {
    if (!isAgreed || selectedAssetIds.length === 0 || selectedBeneficiaryIds.length === 0 || !lawyerId) {
      alert("Please select at least one asset, one beneficiary, assign a lawyer, and agree to the terms.");
      return;
    }

    setIsSealing(true);
    // Show a pop-up instead of alert
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '0';
    popup.style.left = '0';
    popup.style.width = '100vw';
    popup.style.height = '100vh';
    popup.style.background = 'rgba(0,0,0,0.4)';
    popup.style.display = 'flex';
    popup.style.alignItems = 'center';
    popup.style.justifyContent = 'center';
    popup.style.zIndex = '9999';

    popup.innerHTML = `
      <div style="background:white;padding:2rem 2.5rem;border-radius:1rem;box-shadow:0 8px 32px rgba(0,0,0,0.18);max-width:90vw;text-align:center;">
      <h2 style="font-size:1.5rem;font-weight:bold;color:#166534;margin-bottom:1rem;">Congratulations!</h2>
      <p style="font-size:1.1rem;color:#222;margin-bottom:1.5rem;">
        Your E-Will has been sealed on the Sui blockchain!
      </p>
      <div style="background:#f1f5f9;padding:1rem;border-radius:0.5rem;margin-bottom:1.5rem;font-family:monospace;">
        Tx Hash: <span style="color:#2563eb;">0x8f9a2b...c8d9e0f1a</span>
      </div>
      <button id="closeWillPopup" style="background:#166534;color:white;font-weight:bold;padding:0.75rem 2rem;border-radius:0.5rem;border:none;cursor:pointer;font-size:1rem;">
        Go to Dashboard
      </button>
      </div>
    `;

    document.body.appendChild(popup);

    const closePopup = () => {
      popup.remove();
      setIsSealing(false);
      resetWill();
      router.push('/dashboard');
    };

    popup.querySelector('#closeWillPopup')?.addEventListener('click', closePopup);

    // Fallback: auto-close after 5s
    setTimeout(() => {
      if (document.body.contains(popup)) closePopup();
    }, 5000);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 space-y-8">
      <h2 className="text-3xl font-bold text-blue-900">Step 3: Preview & Save Your Will</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Left: Form */}
        <div className="space-y-6">
          {/* Assets */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">1. Select Assets to Include</h3>
            <div className="space-y-3 max-h-52 overflow-y-auto p-4 bg-gray-50 rounded-md border">
              {assets.map(asset => (
                <CheckboxItem key={asset.id} item={asset} isChecked={selectedAssetIds.includes(asset.id)} onToggle={() => handleToggle(asset.id, selectedAssetIds, setSelectedAssetIds)} showValue />
              ))}
            </div>
          </div>

          {/* Beneficiaries */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">2. Select Beneficiaries</h3>
            <div className="space-y-3 max-h-52 overflow-y-auto p-4 bg-gray-50 rounded-md border">
              {beneficiaries.map(person => (
                <CheckboxItem key={person.id} item={person} isChecked={selectedBeneficiaryIds.includes(person.id)} onToggle={() => handleToggle(person.id, selectedBeneficiaryIds, setSelectedBeneficiaryIds)} />
              ))}
            </div>
          </div>

          {/* Witnesses */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">3. Select Witnesses</h3>
            <div className="space-y-3 max-h-52 overflow-y-auto p-4 bg-gray-50 rounded-md border">
              {witnesses.map(person => (
                <CheckboxItem key={person.id} item={person} isChecked={selectedWitnessIds.includes(person.id)} onToggle={() => handleToggle(person.id, selectedWitnessIds, setSelectedWitnessIds)} />
              ))}
            </div>
          </div>

          {/* Lawyer */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">4. Assign Lawyer for Validation</h3>
            <select value={lawyerId} onChange={(e) => setLawyerId(e.target.value)} className="w-full px-4 py-2 border rounded-md bg-white focus:ring-2 focus:ring-blue-500">
              <option value="" disabled>-- Select a Lawyer --</option>
              {lawyers.map(lawyer => (<option key={lawyer.id} value={lawyer.id}>{lawyer.user_name}</option>))}
            </select>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">5. Final Instructions</h3>
            <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="e.g., 'My Lekki property...'" className="w-full h-28 p-3 border rounded-md focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>
        </div>

        {/* Right: Preview */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-dashed border-blue-300 space-y-6">
          <h3 className="text-xl font-bold text-center text-blue-900"> Will Preview</h3>
          <PreviewSection title="Assets Included" items={previewAssets} />
          <PreviewSection title="Beneficiaries" items={previewBeneficiaries} />
          <PreviewSection title="Witnesses" items={previewWitnesses} />
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Legal Validation</h4>
            <p className={`text-sm font-medium px-3 py-2 rounded-md ${lawyerId ? 'text-green-800 bg-green-100' : 'text-red-800 bg-red-100'}`}>
              {lawyerId ? `Assigned to: ${lawyers.find(l => l.id === lawyerId)?.user_name}` : 'No lawyer assigned'}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Instructions</h4>
            <p className="text-sm text-gray-700 italic bg-white p-3 rounded-md border">{instructions || "No specific instructions provided."}</p>
          </div>
        </div>
      </div>

      {/* Footer: Agreement + Actions */}
      <div className="pt-6 border-t border-gray-200 space-y-5">
        <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
          <input type="checkbox" checked={isAgreed} onChange={() => setIsAgreed(!isAgreed)} className="mt-1 h-5 w-5 rounded-md border-gray-300 text-blue-900 focus:ring-blue-800" />
          <span className="text-gray-800 font-medium">I have reviewed the preview and confirm that the details are correct. I agree to the creation of this immutable E-Will.</span>
        </label>

        <div className="flex justify-between items-center">
          <Link href="/create-will/parties" className="text-gray-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">Back</Link>
          <button
            onClick={handleSealWill}
            disabled={!isAgreed || isSealing || !lawyerId || previewAssets.length === 0 || previewBeneficiaries.length === 0}
            className="bg-green-600 !text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            {isSealing ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sealing On-Chain...
              </>
            ) : (
              'Confirm & Seal Will'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
