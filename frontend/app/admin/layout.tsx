import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role.id !== 1) {
    redirect('/login?message=You must be an admin to access this area');
  }

  return (
    <div className="admin-layout">
      {children}
    </div>
  );
}
