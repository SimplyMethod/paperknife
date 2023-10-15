"use client";

import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";

export default function Page() {
  const { data: session, status } = useSession();

  return (
    <div>
      ClientComponent {status}{" "}
      {status === "authenticated" && session.user?.name}
      {status === "authenticated" && session.user?.email}
    </div>
  );
}
