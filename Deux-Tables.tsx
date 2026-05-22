// Pour les petits écrans
<div className="md:hidden">
    <div
      className="mb-2 w-full rounded-md bg-white p-4"
    >
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <div className="mb-2 flex items-center">
            {/* Photo du client */}
            <p>{/* Nom du client */}</p>
          </div>
          <p className="text-sm text-gray-500">{/* Email du client */}</p>
        </div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <p className="text-xl font-medium">
            {/* Montant de la facture - Utiliser la fonction formatCurrency() */}
          </p>
          <p>{/* Date d'achat - Utiliser la fonction formatDateToLocal() */}</p>
        </div>
      </div>
    </div>
</div>

// Pour les grands écrans
<table className="hidden min-w-full text-gray-900 md:table">
  <thead className="rounded-lg text-left text-sm font-normal">
    <tr>
      <th scope="col" className="px-4 py-5 font-medium sm:pl-6">Client</th>
      <th scope="col" className="px-3 py-5 font-medium">Email</th>
      <th scope="col" className="px-3 py-5 font-medium">Montant</th>
      <th scope="col" className="px-3 py-5 font-medium">Date</th>
    </tr>
  </thead>
  <tbody className="bg-white">
      <tr className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
        <td className="whitespace-nowrap py-3 pl-6 pr-3">
          <div className="flex items-center gap-3">
            {/* Photo du client */}
            <p>{/* Nom du client */}</p>
          </div>
        </td>
        <td className="whitespace-nowrap px-3 py-3">
          {/* Email du client */}
        </td>
        <td className="whitespace-nowrap px-3 py-3">
          {/* Montant de la facture - Utiliser la fonction formatCurrency() */}
        </td>
        <td className="whitespace-nowrap px-3 py-3">
          {/* Date d'achat - Utiliser la fonction formatDateToLocal() */}
        </td>
      </tr>
  </tbody>
</table>
