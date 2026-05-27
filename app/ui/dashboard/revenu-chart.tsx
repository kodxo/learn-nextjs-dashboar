import { generateYAxis } from "@/app/lib/utils";
import { lusitana } from "../font";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { fetchRevenues } from "@/app/lib/data";

export default async function RevenueChart() {
  const revenues = await fetchRevenues();
  const chartHeight = 350;
  const { topLabel } = generateYAxis(revenues);
  if (!revenues.length) {
    return (
      <p className="mt-4 text-gray-400 text-sm">
        Pas de données de revenu disponibles.
      </p>
    );
  }
  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Revenus Récents
      </h2>
      <div className="w-full h-full  rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4 ">
          {revenues.map((revenue) => (
            <div
              key={revenue.month}
              className="flex flex-col items-center gap-2"
            >
              <div
                className="w-full rounded-md bg-blue-300"
                style={{
                  height: `${(chartHeight / topLabel) * revenue.revenue}px`,
                }}
              ></div>
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {revenue.month}
              </p>
            </div>
          ))}
        </div>
        <div className="flex item-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500"></h3>
        </div>
      </div>
    </div>
  );
}
