import { Users as UsersIcon, ShieldAlert, UserCheck, Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { UserActionsCell } from "../components/UserActionsCell";

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { id: 'desc' }
  });

  const totalUsers = users.length;
  const adminUsers = users.filter(u => u.role === "ADMIN" || u.role === "SUPERADMIN").length;
  const regularUsers = users.filter(u => u.role === "USER").length;

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Users</h1>
          <p className="text-gray-500 text-sm mt-1">Manage system access and roles.</p>
        </div>
        <Link 
          href="/dashboard/users/new"
          className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add User
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="bg-blue-50 p-3 rounded-lg"><UsersIcon className="w-6 h-6 text-blue-600" /></div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Users</p>
            <h3 className="text-2xl font-semibold text-gray-900">{totalUsers}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="bg-emerald-50 p-3 rounded-lg"><ShieldAlert className="w-6 h-6 text-emerald-600" /></div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Admin Users</p>
            <h3 className="text-2xl font-semibold text-gray-900">{adminUsers}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="bg-purple-50 p-3 rounded-lg"><UserCheck className="w-6 h-6 text-purple-600" /></div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Regular Users</p>
            <h3 className="text-2xl font-semibold text-gray-900">{regularUsers}</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex justify-between items-center">
          <h2 className="font-semibold text-gray-900">User Directory</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">User</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Current Role</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {users.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-sm text-gray-500">No users found.</td></tr>
              ) : users.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-600 text-xs">
                        {user.name ? user.name.charAt(0).toUpperCase() : "?"}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{user.name || "Unknown"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email || "No Email"}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div 
                      className={`inline-block text-xs font-bold rounded-full px-2.5 py-0.5 border ${
                        user.role === 'SUPERADMIN' ? 'bg-red-50 text-red-700 border-red-100' :
                        user.role === 'ADMIN' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                        'bg-gray-50 text-gray-600 border-gray-100'
                      }`}
                    >
                      {user.role}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <UserActionsCell userId={user.id} userRole={user.role} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
