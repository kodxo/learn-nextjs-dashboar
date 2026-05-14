import Card from "@/app/ui/dashboard/card";
import { lusitana } from "../ui/font";
import { fetchCardData, fetchRevenus } from "../lib/data";
import RevenueChart from "../ui/dashboard/revenu-chart";

export default async function Page() {
  const {
    totalPaidInvoices,
    numberOfInvoices,
    totalPendingInvoices,
    numberOfCustomers,
  } = await fetchCardData();

  const revenus = await fetchRevenus();
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Tableau de board
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collecté" value={totalPaidInvoices} type="collected" />
        <Card title="En attente" value={totalPendingInvoices} type="pending" />
        <Card
          title="Nombre de factures"
          value={numberOfInvoices}
          type="invoices"
        />
        <Card
          title="Nombre de clients"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart
          revenues={revenus}
        />
      </div>
    </main>
  );
}
