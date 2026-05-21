import { sql } from "./db";
import { formatCurrency } from "./utils";
import { LatestInvoiceRaw, Revenue } from "./definitions";
import { connection } from "next/server";
export async function fetchRevenues(): Promise<Revenue[]> {
  await connection();
  try {
    const data = await sql`SELECT * FROM revenue`;
    // wait 03 s
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return data as Revenue[];
  } catch (error) {
    console.error("Database error: ", error);
    throw new Error("Échec lors de la récupération e données de revenus");
  }
}
export async function fetchLatestInvoices(): Promise<LatestInvoiceRaw[]> {
  await connection();
  try {
    let data = await sql`
    SELECT
    invoices.id,
    invoices.amount,
    invoices.date,
    customers.name,
    customers.image_url,
    customers.email
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    ORDER BY invoices.date DESC
    LIMIT 5;
    `;

    data = data.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return data as LatestInvoiceRaw[];
  } catch (error) {
    console.error("Database error: ", error);
    throw new Error("Échec lors de la récupération des dernières factures");
  }
}

export async function fetchCardData() {
  await connection();
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
