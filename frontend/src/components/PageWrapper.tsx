import React from "react";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return <div className="max-w-7xl mx-auto">{children}</div>;
}
