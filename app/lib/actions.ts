'use server';
import { sql } from './db';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
const InvoiceSchema = z.object({
  id: z.string(),
  customer_id: z.string(),
  amount: z.coerce.number(),
  date: z.string(),
  status: z.enum(['pending', 'paid']),
});

const CreateInvoiceShema = InvoiceSchema.omit({
  id: true,
  date: true,
});
export async function createInvoice(formData: FormData) {
  const validatedFields = CreateInvoiceShema.safeParse({
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

const EditInvoiceShema = InvoiceSchema;
export async function updateInvoice(formData: FormData) {
  const validatedFields = EditInvoiceShema.safeParse({
    id: formData.get('id'),
    customer_id: formData.get('customer_id'),
    amount: formData.get('amount'),
    status: formData.get('status'),
    date: formData.get('date'),
  });
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return;
    /* {
      errors: validatedFields.error.flatten().fieldErrors,
    }*/
  }
  const { id, customer_id, amount, status, date } = validatedFields.data;

  await sql`
        UPDATE 
          invoices 
        SET 
          customer_id = ${customer_id}, 
          amount = ${amount}, 
          status = ${status}, 
          date = ${date} 
        WHERE id = ${id}
        `;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
