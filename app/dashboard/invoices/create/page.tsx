import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";

export default async function CreateInvoicePage() {
    return (
        <main>
            <Breadcrumbs breadcrumbs={[
                { label: "Facture", href: "/dashboard/invoices" },
                { label: "Créer une facture ", href: "/dashboard/invoices/create", active: true },
            ]} />
        </main>
    );
}