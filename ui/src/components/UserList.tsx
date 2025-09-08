import React, { useEffect, useMemo, useState } from 'react';
import { fetchUsers, UserDto } from '../api';

const allRoles = ['Author', 'Editor', 'Subscriber', 'Administrator'] as const;

const UserList: React.FC = () => {
  const [role, setRole] = useState<string>('');
  const [users, setUsers] = useState<UserDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const roleOptions = useMemo(() => [''].concat(allRoles as unknown as string[]), []);

  const load = async (selected?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUsers(selected || undefined);
      setUsers(data);
    } catch (err) {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setRole(value);
    load(value || undefined);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Users</h1>
        <a href="/" className="text-blue-600 hover:underline">Create User</a>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Filter by Role</label>
        <select
          value={role}
          onChange={onFilterChange}
          className="border rounded px-3 py-2"
        >
          {roleOptions.map((r) => (
            <option key={r} value={r}>{r || 'All'}</option>
          ))}
        </select>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}

      {!loading && users.length === 0 && (
        <div className="text-gray-600">No users found.</div>
      )}

      {users.length > 0 && (
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2 pr-4">Full Name</th>
              <th className="py-2 pr-4">Email</th>
              <th className="py-2">Roles</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b">
                <td className="py-2 pr-4">{u.full_name}</td>
                <td className="py-2 pr-4">{u.email}</td>
                <td className="py-2">{(u.roles as unknown as any[]).map((r: any) => r.name || r).join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;


