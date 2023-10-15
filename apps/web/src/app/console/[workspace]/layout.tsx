import type { Metadata } from "next";
import Image from "next/image";
// import { CalendarDateRangePicker } from "@/components/date-range-picker"
import { MainNav } from "@/components/main-nav";
import { cn } from "@/lib/utils";
// import { Overview } from "@/components/overview"
// import { RecentSales } from "@/components/recent-sales"
// import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav";
import TeamSwitcher from "@/components/team-switcher";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default function ConsoleLayout(props: {
  children: React.ReactNode,
  modal?: React.ReactNode
}) {
  return (
    <>
      <div className="md:hidden">
        <Image
          alt="Dashboard"
          className="block dark:hidden"
          height={866}
          src="/examples/dashboard-light.png"
          width={1280}
        />
        <Image
          alt="Dashboard"
          className="hidden dark:block"
          height={866}
          src="/examples/dashboard-dark.png"
          width={1280}
        />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="flex h-16 items-center px-4 lg:px-20">
          <TeamSwitcher />
          <div className="ml-auto flex items-center space-x-4">
            {/* <Search /> */}
            <UserNav />
          </div>
        </div>

        <div className={cn("mx-auto w-full max-w-screen-xl px-2.5 lg:px-12 border-b")}>
          <div className="flex h-12 items-center px-4">
            <MainNav className="mx-6" />
          </div>
        </div>

      </div>
      <div className="">{props.children}</div>
      {props.modal}
    </>
  );
}
