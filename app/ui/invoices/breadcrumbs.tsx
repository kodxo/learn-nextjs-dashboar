import clsx from "clsx";
import Link from "next/link";
import { lusitana } from "@/app/ui/font";

interface Breadcrumb {
    label: string;
    href: string;
    active?: boolean;
}

export default async function Breadcrumbs({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) {
    return (
        <nav className="mb-6 block" aria-label="Breadcrumb">
            <ol className={`${lusitana.className} flex text-xl md:text-2xl`}>
                {breadcrumbs.map((breadcrumb, index) => (
                    <li
                        key={breadcrumb.href}
                        aria-current={breadcrumb.active}
                        className={clsx(
                            'w-full text-gray-500 md:w-auto',
                            {
                                'text-gray-900': breadcrumb.active,
                            },
                        )}
                    >
                        <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                        {
                            index < breadcrumbs.length - 1 && <span className="mx-3 inline-block">/</span>
                        }
                    </li>
                ))}
            </ol>
        </nav>
    );
}