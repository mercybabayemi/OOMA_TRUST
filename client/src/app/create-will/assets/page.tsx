'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCreateWill } from '@/app/context/CreateWillContext';
import { Pencil, Trash } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AssetsPage() {
  const { assets, addAsset, updateAsset, removeAsset } = useCreateWill();

  const [assetType, setAssetType] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [documentProofUrl, setDocumentProofUrl] = useState('');
  const [editingAssetId, setEditingAssetId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setAssetType('');
    setDescription('');
    setValue('');
    setDocumentProofUrl('');
    setEditingAssetId(null);
  };

  const handleSubmit = () => {
    if (!assetType || !description) {
      toast.error('Please fill in Asset Type and Description.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const formattedValue = value ? `₦${Number(value).toLocaleString()}` : '';
      const assetData = {
        asset_type: assetType,
        description,
        value: formattedValue,
        document_proof_url: documentProofUrl || 'ipfs://not_provided',
      };

      try {
        if (editingAssetId) {
          updateAsset(editingAssetId, assetData);
          toast.success('Asset updated!');
        } else {
          addAsset(assetData);
          toast.success('Asset added!');
        }

        resetForm();
      } catch {
        toast.error('Error saving asset.');
      } finally {
        setIsSubmitting(false);
      }
    }, 700);
  };

  const handleEdit = (asset: any) => {
    setAssetType(asset.asset_type);
    setDescription(asset.description);
    setValue(asset.value.replace(/[₦,]/g, ''));
    setDocumentProofUrl(asset.document_proof_url === 'ipfs://not_provided' ? '' : asset.document_proof_url);
    setEditingAssetId(asset.id);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this asset?')) {
      removeAsset(id);
      toast.success('Asset removed.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 max-w-5xl mx-auto space-y-10">
      <h2 className="text-3xl font-bold text-blue-900 text-center">Step 1: Declare Your Assets</h2>

      {/* Form Section */}
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 space-y-6">
        <h3 className="text-xl font-semibold text-blue-900">
          {editingAssetId ? 'Edit Asset' : 'Add a New Asset'}
        </h3>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="relative">
            <input
              value={assetType}
              onChange={(e) => setAssetType(e.target.value)}
              type="text"
              id="asset-type"
              className="peer w-full px-4 pt-5 pb-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder=" "
            />
            <label
              htmlFor="asset-type"
              className="absolute text-sm text-gray-500 top-2 left-4 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base transition-all"
            >
              Asset Type (e.g., Real Estate)
            </label>
          </div>

          <div className="relative">
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              id="asset-description"
              className="peer w-full px-4 pt-5 pb-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder=" "
            />
            <label
              htmlFor="asset-description"
              className="absolute text-sm text-gray-500 top-2 left-4 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base transition-all"
            >
              Description (e.g., Lekki Property)
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="relative">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="number"
              id="asset-value"
              className="peer w-full px-4 pt-5 pb-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder=" "
            />
            <label
              htmlFor="asset-value"
              className="absolute text-sm text-gray-500 top-2 left-4 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base transition-all"
            >
              Estimated Value (₦)
            </label>
          </div>

          <div className="relative">
            <input
              value={documentProofUrl}
              onChange={(e) => setDocumentProofUrl(e.target.value)}
              type="text"
              id="proof-url"
              className="peer w-full px-4 pt-5 pb-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder=" "
            />
            <label
              htmlFor="proof-url"
              className="absolute text-sm text-gray-500 top-2 left-4 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base transition-all"
            >
              Document Proof URL (optional)
            </label>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-blue-900 !text-white text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-800 disabled:bg-gray-400"
          >
            {isSubmitting
              ? editingAssetId
                ? 'Updating...'
                : 'Adding...'
              : editingAssetId
              ? 'Update Asset'
              : 'Add Asset'}
          </button>

          {editingAssetId && (
            <button
              onClick={resetForm}
              className="text-gray-600 underline text-sm hover:text-gray-800"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </div>

      {/* Assets List */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Declared Assets</h3>
        {assets.length > 0 ? (
          <div className="space-y-3">
            {assets.map((asset) => (
              <div
                key={asset.id}
                className="bg-white border p-4 rounded-lg flex justify-between items-start hover:shadow-md transition"
              >
                <div className="flex-1 space-y-1">
                  <p className="font-bold text-gray-900">{asset.asset_type}</p>
                  <p className="text-sm text-gray-600">{asset.description}</p>
                  {asset.value && (
                    <p className="text-sm font-medium text-green-700">{asset.value}</p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleEdit(asset)}
                    className="p-1 text-blue-700 hover:text-blue-900 transition-colors"
                    title="Edit Asset"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(asset.id)}
                    className="p-1 text-red-600 hover:text-red-800 transition-colors"
                    title="Delete Asset"
                  >
                    <Trash size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 px-4 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 font-medium">No assets added yet.</p>
            <p className="text-sm text-gray-400 mt-1">Fill the form above to declare your first asset.</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-end mt-10 pt-6 border-t border-gray-200">
        <Link
          href="/create-will/parties"
          className="bg-amber-400 text-blue-900 font-bold py-3 px-8 rounded-lg hover:bg-amber-300 transition-transform hover:scale-105"
        >
          Next
        </Link>
      </div>
    </div>
  );
}
