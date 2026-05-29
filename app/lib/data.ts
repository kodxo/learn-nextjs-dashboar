import { sql } from './db';
import { formatCurrency } from './utils';
import {
  CustomerField,
  Invoice,
  LatestInvoiceRaw,
  Revenue,
} from './definitions';
import { connection } from 'next/server';
export async function fetchRevenues(): Promise<Revenue[]> {
  await connection();
  try {
    const data = await sql`SELECT * FROM revenue`;
    return data as unknown as Revenue[];
  } catch (error) {
    console.error('Database error: ', error);
    throw new Error('Échec lors de la récupération e données de revenus');
  }
}
export async function fetchLatestInvoices(): Promise<LatestInvoiceRaw[]> {
  await connection();
  try {
    const rawData = await sql`
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

    const data = rawData.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return data as unknown as LatestInvoiceRaw[];
  } catch (error) {
    console.error('Database error: ', error);
    throw new Error('Échec lors de la récupération des dernières factures');
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
    console.log('Database Error', error);
    throw new Error('Erreur lors de la recupération des données de card');
  }
}
const ITEMS_PER_PAGE = 6;
export async function fetchInvoices({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  await connection();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const invoices = await sql`
    SELECT 
      invoices.id,
      invoices.amount,
      invoices.date,
      invoices.status,
      customers.name,
      customers.image_url,
      customers.email
     FROM invoices 
     JOIN customers ON invoices.customer_id = customers.id
     WHERE 
      customers.name ilike ${`%${query}%`}
      OR customers.email ilike ${`%${query}%`}
      OR invoices.amount::text ilike ${`%${query}%`}
      OR invoices.date::text ilike ${`%${query}%`}
      OR invoices.status::text ilike ${`%${query}%`}
     ORDER BY invoices.date DESC
     LIMIT ${ITEMS_PER_PAGE}
     OFFSET ${offset}`;
    return invoices;
  } catch (error) {
    console.error('Database error: ', error);
    throw new Error('Échec lors de la récupération du nombre de pages');
  }
}

export async function fetchInvoicesPages({ query }: { query: string }) {
  await connection();
  try {
    const invoices = await sql`
    SELECT COUNT(*) 
     FROM invoices 
     JOIN customers ON invoices.customer_id = customers.id
     WHERE 
      customers.name ilike ${`%${query}%`}
      OR customers.email ilike ${`%${query}%`}
      OR invoices.amount::text ilike ${`%${query}%`}
      OR invoices.date::text ilike ${`%${query}%`}
      OR invoices.status::text ilike ${`%${query}%`}`;
    const totalPages = Math.ceil(Number(invoices[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database error: ', error);
    throw new Error('Échec lors de la récupération du nombre de pages');
  }
}

export async function fetchCustomers() {
  await connection();
  try {
    const data = await sql`SELECT id, name FROM customers ORDER BY name ASC`;
    return data as unknown as CustomerField[];
  } catch (error) {
    console.error('Database error: ', error);
    throw new Error('Échec lors de la récupération des clients');
  }
}

export async function fetchInvoiceById(id: string) {
  await connection();
  try {
    const data = await sql`
    SELECT 
      invoices.id,
      invoices.customer_id,
      invoices.amount,
      invoices.date,
      invoices.status
     FROM invoices 
     WHERE id = ${id}`;
    return data.length==0 ? null : data[0] as unknown as Invoice;
  } catch (error) {
    console.error('Database error: ', error);
    throw new Error('Échec lors de la récupération de la facture');
  }
}
