import { FaceFrownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className='flex h-full flex-col items-center justify-center gap-2'>
      <FaceFrownIcon className='w-10 text-gray-200' />
      <h2 className='text-xl font-semibold'>404 | page introuvable</h2>
      <p>La pae demandée est introuvable</p>
      <Link
        href='/dashboard/invoices'
        className='mt-4 rounded-md bd-blue-500 px-2 text-sm text-white transition-colors hover:bg-blue-300'
      >
        Retourner aux facture
      </Link>
    </main>
  );
}
