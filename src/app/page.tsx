'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function HomePage() {
  const router = useRouter()
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log('Session status:', status);
    console.log('Session data:', session);

    if (status === 'loading') {
      return; // Do nothing while loading
    }

    if (session) {
      console.log('Redirecting to /dashboard');
      router.push('/dashboard');
    } else {
      console.log('Redirecting to /login');
      router.push('/login');
    }
  }, [session, status, router]);

  return null
}
