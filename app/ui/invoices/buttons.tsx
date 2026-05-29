'use client';
import { deleteInvoice } from '@/app/lib/actions';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useActionState } from 'react';

export function CreateInvoiceButton() {
  return (
    <Link
      href='/dashboard/invoices/create'
      className='flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
    >
      <span className='hidden md:block'>Créer une facture</span>
      <PlusIcon className='ml-4 h-5 w-5' />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className='rounded-md border border-gray-200 px-3 py-2 hover:bg-gray-100'
    >
      <PencilIcon className='w-5 h-5 text-gray-500' />
    </Link>
  );
}

const initialState = { message: '' };

export function DeleteInvoice({ id }: { id: number }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, { id });

  const [state, formAction, isPending] = useActionState(
    deleteInvoiceWithId,
    initialState,
  );

  return (
    <form action={formAction}>
      <button className='rounded-md border p-2 hover:bg-gray-100'>
        <span className='sr-only'>Supprimer</span>
        <TrashIcon className='w-5' />
      </button>
    </form>
  );
}
