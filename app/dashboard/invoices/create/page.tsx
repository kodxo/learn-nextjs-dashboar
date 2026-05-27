import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/invoices/create-form";

export default async function CreateInvoicePage() {
    return (
        <main>
            <Breadcrumbs breadcrumbs={[
                { label: "Facture", href: "/dashboard/invoices" },
                { label: "Créer une facture ", href: "/dashboard/invoices/create", active: true },
            ]} />
            <Form />
        </main>
    );
}