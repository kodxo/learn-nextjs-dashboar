import {
  BanknotesIcon,
  ClockIcon,
  InboxIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { lusitana } from "../font";
import { fetchCardData } from "@/app/lib/data";

export default async function CardWrapper() {
  const {
    totalPaidInvoices,
    numberOfInvoices,
    totalPendingInvoices,
    numberOfCustomers,
  } = await fetchCardData();
  return (
    <>
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
    </>
  );
}
interface CardProps {
  title: string;
  value: string | number;
  type: "invoices" | "customers" | "pending" | "collected";
}
export function Card({ title, value, type }: CardProps) {
  const Icon = {
    collected: BanknotesIcon,
    customers: UserGroupIcon,
    pending: ClockIcon,
    invoices: InboxIcon,
  }[type];

  return (
    <div className="rounded-xl bg-gray-50 p-3 shadow-sm">
      <div className="flex p-2">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className} truncated rounded-xl bg-white px-4 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
