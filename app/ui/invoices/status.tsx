import { CheckIcon, ClockIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function InvoiceStatus({status}: {status: string}){
    return (
        <span
        className={clsx(
            'inline-flex items-center rounded-full px-2 py-1 text-sm',
            {
            'bg-green-100 text-green-800': status === 'paid',
            'bg-gray-100 text-gray-800': status === 'pending',
            },
        )}
        >
        {status === 'paid' ? (
            <>
            <CheckIcon className="mr-1 h-4 w-4" />
            Payée
            </>
        ) : (
            <>
            <ClockIcon className="mr-1 h-4 w-4" />
            En attente
            </>
        )}
        </span>
    );
}