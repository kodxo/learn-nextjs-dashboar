import { lusitana } from "../font";
import clsx from "clsx";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { fetchLatestInvoices } from "@/app/lib/data";

export default async function LatestInvoices() {
  const latestInvoices = await fetchLatestInvoices();
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dernières factures
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {latestInvoices.map((invoice, i) => (
            <div
              key={invoice.id}
              className={clsx(
                "flex flex-row  items-center justify-between py-4 ",
                {
                  "border-t": i !== 0,
                },
              )}
            >
              <div className="flex items-center">
                <Image
                  src={invoice.image_url}
                  alt={`Photos de profil de ${invoice.name}`}
                  width={32}
                  height={32}
                  className="rounded-full mr-4"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold md:text-base">
                    {invoice.name}
                  </p>
                  <p className="hidden text-sm text-gray-500 sm:block">
                    {invoice.email}
                  </p>
                </div>
              </div>
              <p
                className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
              >
                {invoice.amount}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowRightIcon className="w-5 h-5 text-gray-500 transition-all hover:text-gray-900" />

          <h3 className="ml-2 text-sm text-gray-500">Mise à jour maintenant</h3>
        </div>
      </div>
    </div>
  );
}
