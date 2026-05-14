import { sql } from "./db";
import { formatCurrency } from "./utils";
import { Revenue } from "./definitions";

export async function fetchRevenus(): Promise<Revenue[]> {
  try {
    const data = await sql`SELECT * FROM revenue`;
    return data as Revenue[];
  } catch (error) {
    console.error("Database error: ", error);
    throw new Error("Échec lors de la récupération e données de revenus");
  }
}

export async function fetchCardData() {
  try {
    // On recupere les données des cards
    const [numberOfInvoices, numberOfCustomers, invoiceStatusData] =
      await Promise.all([
        sql`SELECT COUNT(*) FROM invoices`,
        sql`SELECT COUNT(*) FROM customers`,
        sql`SELECT SUM(CASE WHEN status='paid' THEN amount ELSE 0 END)  as "paid", SUM(CASE WHEN status='pending' then amount ELSE 0 END) as pending from invoices`,
      ]);

    const totalPaidInvoices = formatCurrency(invoiceStatusData[0].paid ?? 0);
    const totalPendingInvoices = formatCurrency(
      invoiceStatusData[0].pending ?? 0,
    );
    console.log(numberOfInvoices);
    return {
      numberOfInvoices: numberOfInvoices[0].count,
      numberOfCustomers: numberOfCustomers[0].count,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.log("Database Error", error);
    throw new Error("Erreur lors de la recupération des données de card");
  }
}
