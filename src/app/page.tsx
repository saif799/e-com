/* eslint-disable @next/next/no-img-element */

import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";

export default async function HomePage() {


   return (
    <main className="lg:flex flex-col items-start md:items-center justify-center h-screen">
      <div className="md:h-[90vh] h-[40vh] w-full pr-6 md:pr-20 hidden md:block">
        <img
          src="/FULL LEBRON JAMES.svg"
          alt="logo"
          className="h-full w-full"
          width={100}
          height={100}
        />
      </div>
      <div className="h-[60vh] w-full  md:hidden pt-6 lg:pt-0">
        <img
          src="/shoe.svg"
          alt="logo"
          className="h-full w-full object-contain"
          width={677}
          height={534}
        />
      </div>
    </main>
  );
}
