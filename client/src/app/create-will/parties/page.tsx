'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCreateWill } from '@/app/context/CreateWillContext';
import { Pencil, Trash } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PartiesPage() {
  const { parties, addParty, updateParty, removeParty } = useCreateWill();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userSignature, setUserSignature] = useState('');
  const [userSignatureType, setUserSignatureType] = useState('');
  const [role, setRole] = useState<'Beneficiary' | 'Witness' | 'Lawyer'>('Beneficiary');
  const [editingId, setEditingId] = useState<string | null>(null);

  const resetForm = () => {
    setName('');
    setRelationship('');
    setEmail('');
    setPhoneNumber('');
    setUserSignature('');
    setUserSignatureType('');
    setRole('Beneficiary');
    setEditingId(null);
  };

  const handleSubmit = () => {
    if (!name || !relationship || !email || !phoneNumber) {
      toast.error('Please fill all required fields.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const data = {
        user_name: name,
        relationship,
        user_role: role,
        email,
        phone_number: phoneNumber,
        user_signature: userSignature || 'N/A',
        user_signature_type: userSignatureType || 'N/A',
      };

      if (editingId) {
        updateParty(editingId, data);
        toast.success('Party updated!');
      } else {
        addParty(data);
        toast.success('Party added!');
      }

      resetForm();
      setIsSubmitting(false);
    }, 800);
  };

  const handleEdit = (p: any) => {
    setName(p.user_name);
    setRelationship(p.relationship);
    setEmail(p.email);
    setPhoneNumber(p.phone_number);
    setUserSignature(p.user_signature === 'N/A' ? '' : p.user_signature);
    setUserSignatureType(p.user_signature_type === 'N/A' ? '' : p.user_signature_type);
    setRole(p.user_role);
    setEditingId(p.id);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this party?')) {
      removeParty(id);
      toast.success('Party deleted.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 max-w-5xl mx-auto space-y-10">
      <h2 className="text-3xl font-bold text-blue-900 text-center">Step 2: Define Important People</h2>

      {/* Form Section */}
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 space-y-6">
        <h3 className="text-xl font-semibold text-blue-900">
          {editingId ? 'Edit Person' : 'Add a Person'}
        </h3>

        <div className="grid md:grid-cols-2 gap-5">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name *"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            type="text"
            placeholder="Relationship (e.g., Wife) *"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email Address *"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="tel"
            placeholder="Phone Number *"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <input
            value={userSignature}
            onChange={(e) => setUserSignature(e.target.value)}
            type="text"
            placeholder="Digital Signature"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            value={userSignatureType}
            onChange={(e) => setUserSignatureType(e.target.value)}
            type="text"
            placeholder="Signature Type (e.g., NIN)"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value as any)}
          className="w-full md:w-1/2 px-4 py-2 border rounded-md bg-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="Beneficiary">Beneficiary</option>
          <option value="Witness">Witness</option>
          <option value="Lawyer">Lawyer</option>
        </select>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-blue-900 text-white !text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-800 disabled:bg-gray-400 transition-all"
          >
            {isSubmitting
              ? editingId
                ? 'Updating...'
                : 'Adding...'
              : editingId
              ? 'Update Person'
              : 'Add Person'}
          </button>

          {editingId && (
            <button
              onClick={resetForm}
              className="text-gray-600 underline text-sm hover:text-gray-800"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </div>

      {/* People List */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Saved People</h3>
        {parties.length > 0 ? (
          <div className="space-y-3">
            {parties.map((p) => (
              <div
                key={p.id}
                className="bg-white border p-4 rounded-lg flex justify-between items-start hover:shadow-md transition-shadow"
              >
                <div className="flex-1 space-y-1">
                  <p className="font-bold text-gray-900">{p.user_name}</p>
                  <p className="text-sm text-gray-600">{p.relationship}</p>
                  <p className="text-sm text-gray-500">{p.email} • {p.phone_number}</p>
                  <span className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                    {p.user_role}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleEdit(p)}
                    className="p-1 text-blue-700 hover:text-blue-900 transition-colors"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="p-1 text-red-600 hover:text-red-800 transition-colors"
                    title="Delete"
                  >
                    <Trash size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 px-4 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 font-medium">No people added yet.</p>
            <p className="text-sm text-gray-400 mt-1">Fill the form above to add your first party.</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
        <Link
          href="/create-will/assets"
          className="text-gray-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100"
        >
          Back
        </Link>
        <Link
          href="/create-will/assemble"
          className="bg-amber-400 text-blue-900 font-bold py-3 px-8 rounded-lg hover:bg-amber-300 transition-transform hover:scale-105"
        >
          Next
        </Link>
      </div>
    </div>
  );
}
