import { auth } from '@/lib/auth';

export default async function DashboardPage() {
  const session = await auth();
  console.log('🚀 ~ DashboardPage ~ session:', session);

  return (
    <div>
      <h1>Dashboard Page</h1>
      {session && (
        <div>
          <h2>Session</h2>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
