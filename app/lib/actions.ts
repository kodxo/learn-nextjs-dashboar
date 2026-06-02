'use server';
import { sql } from './db';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import postgres from 'postgres';
export type FormState = {
  success: boolean;
  message?: string;
  errors?: {
    customer_id?: string[];
    amount?: string[];
    status?: string[];
  };
};
const InvoiceSchema = z.object({
  id: z.string(),
  customer_id: z.string({
    error: 'Veuillez sélectionner un client valide',
  }),
  amount: z.coerce
    .number()
    .gt(0, 'Le montant doit être supérieur à 0'),
  date: z.string(),
  status: z.enum(['pending', 'paid'], {
    error: 'Veuillez sélectionner un statut valide',
  }),
});

const CreateInvoiceShema = InvoiceSchema.omit({
  id: true,
  date: true,
});

export async function createInvoice(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = CreateInvoiceShema.safeParse({
    customer_id: formData.get('customer_id'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Problème lors de la validation des données',
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }
  const { customer_id, amount, status } = validatedFields.data;

  const date = new Date().toISOString().split('T')[0];
  try {
    await sql`
        INSERT INTO invoices (customer_id, amount, status, date) VALUES (${customer_id}, ${amount}, ${status}, ${date})
        `;
  } catch (error) {
    if (error instanceof postgres.PostgresError)
      return {
        success: false,
        message:
          'Erreur base de données: échec lors de la création de la facture',
      };
    return {
      success: false,
      message: 'une erreur interne est survenu',
    };
  }

  revalidatePath('/dashboard/invoices');
  return {
    success: true,
    message: 'La facture à été crée avec succès',
  };
}

const EditInvoiceShema = InvoiceSchema;

export async function updateInvoice(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = EditInvoiceShema.safeParse({
    id: formData.get('id'),
    customer_id: formData.get('customer_id'),
    amount: formData.get('amount'),
    status: formData.get('status'),
    date: formData.get('date'),
  });
  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Problème lors de la validation des données',
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }
  const { id, customer_id, amount, status, date } = validatedFields.data;
  try {
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
  } catch (error) {
    if (error instanceof postgres.PostgresError)
      return {
        success: false,
        message:
          'Erreur base de données: échec lors de la mise à jour de la facture',
      };
    return {
      success: false,
      message: 'une erreur interne est survenu',
    };
  }

  revalidatePath('/dashboard/invoices');
  return {
    success: true,
    message: 'La facture à été mis à jours avec succès',
  };
}

export async function deleteInvoice(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const id = formData.get('id') as string;
  try {
    await sql`DELETE FROM invoices WHERE id=${id}`;
  } catch (error) {
    if (error instanceof postgres.PostgresError)
      return {
        success: false,
        message:
          'Erreur base de données: échec lors de la supression de la facture',
      };
    return {
      success: false,
      message: 'une erreur interne est survenu',
    };
  }
  revalidatePath('/dashboard/invoices');
  return { 
    success: true,
    message: 'La facture à été suprimée avec succès',
  };
}
