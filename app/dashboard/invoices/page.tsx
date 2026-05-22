import { CreateInvoiceButton } from "@/app/ui/invoices/buttons";
import { lusitana } from "@/app/ui/font";
import Search from "@/app/ui/search";
import InvoiceTable from "@/app/ui/invoices/table";
import { Suspense } from "react";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { fetchInvoicesPages } from "@/app/lib/data";
import Pagination from "@/app/ui/invoices/pagination";

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const query = (await searchParams)?.query || "";
  const currentPage = Number((await searchParams)?.page) || 1;
  const totalPages = await fetchInvoicesPages({ query });
  console.log(totalPages);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Factures</h1>
      </div>
      <div className="mt-4 flex  items-stretch justify-between gap-2 md:mt-8">
        <Search placeholder="Rechercher une facture par..." />
        <CreateInvoiceButton />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <InvoiceTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
