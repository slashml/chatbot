import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

type AdminUser = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  createdAt: Date;
  lastLoginAt: Date | null;
  loginCount: number;
  _count: {
    sessions: number;
  };
}

async function getGroups(): Promise<AdminGroup[]> {
  const groups = await prisma.group.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      createdAt: true,
      lastLoginAt: true,
      loginCount: true,
      _count: {
        select: {
          sessions: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  return groups
}

async function getUsers(): Promise<AdminUser[]> {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      createdAt: true,
      lastLoginAt: true,
      loginCount: true,
      _count: {
        select: {
          sessions: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  return users
}

export default async function AdminPage() {
  const session = await getServerSession()
  
  if (!session) {
    redirect('/auth/signin')
  }

  const users = await getUsers()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-900">User Dashboard</h1>
            <p className="text-gray-600">Manage registered users</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Login Count
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Active Sessions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user: AdminUser) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {user.image && (
                          <img className="h-8 w-8 rounded-full mr-3" src={user.image} alt="" />
                        )}
                        <div className="text-sm font-medium text-gray-900">
                          {user.name || 'No name'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.createdAt.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastLoginAt ? user.lastLoginAt.toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.loginCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user._count.sessions}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}