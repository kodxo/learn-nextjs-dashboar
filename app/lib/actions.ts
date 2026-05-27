'use server';
import { sql } from './db';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
const InvoiceSchema = z.object({
  customer_id: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
});

export async function createInvoice(formData: FormData) {
  const validatedFields = InvoiceSchema.safeParse({
    customer_id: formData.get('customer_id'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return;
    /* {
      errors: validatedFields.error.flatten().fieldErrors,
    }*/
  }
  const { customer_id, amount, status } = validatedFields.data;

  const date = new Date().toISOString().split('T')[0];

  await sql`
        INSERT INTO invoices (customer_id, amount, status, date) VALUES (${customer_id}, ${amount}, ${status}, ${date})
        `;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
