"use client";

import { useAppSelector } from "@/lib/redux-toolkit/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

const BoardAuthSecurityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { userDbData } = useAppSelector((state) => state.board);
  const pathname = usePathname();
  const router = useRouter();
  const pathAuthorId = pathname.split("/")[2];
  const userId = userDbData?.id;
  if (userDbData !== null && userId !== pathAuthorId && userId !== null) {
    router.push(`/dashboard/${userId}/view`);
  }
  if (userDbData === null) {
    return;
  }

  return <>{children}</>;
};

export default BoardAuthSecurityProvider;
