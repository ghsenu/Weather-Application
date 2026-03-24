'use client'; 

import Link from 'next/link';
import { MapPinOff } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow p-4 text-center min-h-[70vh]">
      <div className="p-6 bg-white/5 rounded-full mb-6">
        <MapPinOff className="w-16 h-16 text-gray-500" />
      </div>
      <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">404 - Page Not Found</h2>
      <p className="text-gray-400 mb-8 text-lg">Looks like this weather route doesn&apos;t exist.</p>
      <Link href="/" className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full transition-colors shadow-lg shadow-blue-500/30">
        Return Home
      </Link>
    </div>
  );
}
