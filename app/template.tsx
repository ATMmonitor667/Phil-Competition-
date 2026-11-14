"use client";

import { useEffect, useState } from "react";

let hasNavigated = false;

// Short entry fade on client-side route changes only; first paint is never delayed (§16).
export default function Template({ children }: { children: React.ReactNode }) {
  const [fade] = useState(() => hasNavigated);
  useEffect(() => {
    hasNavigated = true;
  }, []);
  return <div className={fade ? "route-enter" : undefined}>{children}</div>;
}
