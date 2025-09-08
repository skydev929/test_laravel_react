import React, { useMemo, useState } from 'react';
import { createUser } from '../api';
import { useNavigate } from 'react-router-dom';

const allRoles = ['Author', 'Editor', 'Subscriber', 'Administrator'] as const;

const UserForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isSubmitDisabled = useMemo(() => {
    return !email || !fullName || selectedRoles.length === 0 || loading;
  }, [email, fullName, selectedRoles, loading]);

  const toggleRole = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await createUser({ email, full_name: fullName, roles: selectedRoles });
      navigate('/users');
    } catch (err: any) {
      if (err?.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err?.response?.data?.errors) {
        const first = Object.values(err.response.data.errors)[0] as string[];
        setError(first?.[0] || 'Validation failed');
      } else {
        setError('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded shadow p-6">
      <h1 className="text-2xl font-semibold mb-4">Create User</h1>
      {error && (
        <div className="mb-4 text-red-600 bg-red-50 border border-red-200 rounded p-3">
          {error}
        </div>
      )}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="user@example.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="John Doe"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Roles</label>
          <div className="grid grid-cols-2 gap-2">
            {allRoles.map((role) => (
              <label key={role} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedRoles.includes(role)}
                  onChange={() => toggleRole(role)}
                />
                <span>{role}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;


