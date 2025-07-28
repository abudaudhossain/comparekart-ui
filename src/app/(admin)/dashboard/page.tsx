import type { Metadata } from "next";
import React from "react";
import ClicksBarChart from "@/components/charts/ClicksBarChart/ClicksBarChart";
import MonthlyClicksReport from "@/components/charts/MonthlyClicksReport/MonthlyClicksReport";
import { GroupIcon } from "@/icons";
import { MousePointer } from "lucide-react";
import NotFound from "@/app/not-found";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | UserManagement - Next.js Dashboard Template",
  description: "This is Next.js Home for UserManagement Dashboard Template",
};

export default async function Dashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt");
  const userData = cookieStore.get("user_info");
  let user = null;
  try {
    user = JSON.parse(userData?.value || '');
  } catch (error) {
    console.error("Invalid user_info cookie:", error);
    redirect('/signin'); // or handle error appropriately
  }



  const response = await fetch(`${process.env.BACKEND_URL}/dashboard`, {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token?.value}`
    }
  }).then((res) => res.json()).then((data) => data).catch((err) => {
    //console.log("error: ", err)
    throw NotFound()
  })

  if (response.resState == 401) {
  
    redirect('/signin');

  }
  const dashboardData = response.data

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 xl:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
        {user.role == "ADMIN" && (
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
            </div>

            <div className="flex items-end justify-between mt-5">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Clients
                </span>
                <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                  {dashboardData?.totalClients || 0}
                </h4>
              </div>

            </div>
          </div>
        )}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <MousePointer className="text-gray-800 size-6 dark:text-white/90" />
          </div>

          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Total Clicks
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {dashboardData?.totalClickedLinks}
              </h4>
            </div>

          </div>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <MousePointer className="text-gray-800 size-6 dark:text-white/90" />
          </div>

          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Today Clicks
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {dashboardData?.totalTodayClicks}
              </h4>
            </div>

          </div>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <MousePointer className="text-gray-800 size-6 dark:text-white/90" />
          </div>

          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Today Valid Clicks
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {dashboardData?.totalTodayCountedClicks}
              </h4>
            </div>

          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <MousePointer className="text-gray-800 size-6 dark:text-white/90" />
          </div>

          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Today Blocked Clicks
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {dashboardData?.totalTodayBlockedClicks}
              </h4>
            </div>

          </div>
        </div>



        {/* <MonthlySalesChart /> */}
      </div>

      <div className="col-span-12 xl:col-span-5">
        {dashboardData && <MonthlyClicksReport data={dashboardData} />}
      </div>

      <div className="col-span-12">
        {dashboardData?.monthlyClicks && <ClicksBarChart data={dashboardData?.monthlyClicks} />}
      </div>

      {/* <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div> */}

      {/* <div className="col-span-12 ">
        <RecentOrders />
      </div> */}
    </div>
  );
}
