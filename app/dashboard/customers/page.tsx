import { fetchCustomersPages } from '@/app/lib/data';
import CustomersTable from '@/app/ui/customers/table';
import { lusitana } from '@/app/ui/font';
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import { CustomersTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const { query = '', page = '1' } = (await searchParams) ?? {};
  const currentPage = Number(page);
  const totalPages = await fetchCustomersPages({ query });

  return (
    <div className='w-full'>
      <div className='flex w-full items-center justify-between'>
        <h1 className={`${lusitana.className} text-2xl`}>Client</h1>
      </div>
      <div className='mt-4 flex  items-stretch justify-between gap-2 md:mt-8 h-10'>
        <Search placeholder='Rechercher une facture par...' />
      </div>
      <Suspense key={query + page} fallback={<CustomersTableSkeleton />}>
        <CustomersTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className='mt-5 flex w-full justify-center'>
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
