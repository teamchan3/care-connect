"use client";

import { CareProviderDataProvider } from "@/providers/CareProviderDataProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CareProviderDataProvider>{children}</CareProviderDataProvider>;
}
