'use client'; 

import { useEffect } from 'react';
import { RefreshCcw, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center flex-grow p-4 text-center min-h-[60vh]">
      <div className="p-6 bg-white/5 rounded-full mb-6">
        <div className="w-16 h-16 text-red-400 font-bold text-4xl flex items-center justify-center">!</div>
      </div>
      <h2 className="text-3xl font-bold text-white mb-2">Something went wrong</h2>
      <p className="text-gray-400 mb-8 max-w-md">We couldn&apos;t load the dashboard. The city might not exist, or there could be a network error.</p>
      <div className="flex items-center gap-4">
        <button
          onClick={() => reset()}
          className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition border border-white/20"
        >
          <RefreshCcw className="w-4 h-4" /> Try again
        </button>
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 px-6 py-3 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500/30 transition border border-blue-500/30"
        >
          <Home className="w-4 h-4" /> Go Home
        </button>
      </div>
    </div>
  );
}
