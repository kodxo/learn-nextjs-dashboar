import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Button from '../button';

export default function Form() {
  return (
    <form>
      <div className='rounded-md bg-gray-50 p-4 md:p-6'>
        <div className='mb-4'>
          <label htmlFor='customer' className='mb-2 block text-sm font-medium'>
            Selectionner un client
          </label>
          <div className='relative'>
            <select
              name='customerId'
              id='customer'
              className='peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
              defaultValue=''
            >
              <option value='' disabled>
                Choisir un client
              </option>
              {/* Map Client*/}
            </select>
            <UserCircleIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
          </div>
        </div>
        {/* Montant de la facture */}
        <div className='mb-4'>
          <label htmlFor='amount' className='mb-2 block text-sm font-medium'>
            Montant de la facture
          </label>
          <div className='relative mt-2 rounded-md'>
            <div className='relative'>
              <input
                type='number'
                id='amount'
                name='amount'
                step='0.01'
                placeholder='Entrez le montant'
                className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
              />
              <CurrencyDollarIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
            </div>
          </div>
        </div>
        {/* Status de la facture */}
        <fieldset>
          <legend className='mb-2 block text-sm font-medium'>
            Statut de la facture
          </legend>
          <div className='rounded-md border border-gray-200 bg-white px-[14px] py-3'>
            <div className='flex gap-3'>
              <div className='flex items-center gap-2'>
                <input
                  type='radio'
                  id='pending'
                  name='status'
                  value='pending'
                  defaultChecked
                  className='h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-green-600 focus:ring-2'
                />
                <label
                  htmlFor='pending'
                  className='ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600'
                >
                  En attente <ClockIcon className='w-4 h-4' />
                </label>
              </div>
              <div className='flex items-center'>
                <input
                  type='radio'
                  id='paid'
                  name='status'
                  value='paid'
                  className='h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-green-600 focus:ring-2'
                />
                <label
                  htmlFor='paid'
                  className='ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white'
                >
                  Payé <CheckIcon className='w-4 h-4' />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Annuler
        </Link>
        <Button type="submit">Créer la facture</Button>
      </div>
    </form>
  );
}
