import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import { AppProvider } from "@/providers/AppProvider";

export const metadata: Metadata = {
  title: "CareConnect",
  description: "介護事業者と介助を必要としている方をつなぐプラットフォーム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
      data-theme="light"
    >
      <body className="h-screen flex flex-col">
        <AppProvider>
          <Header />
          <main className="flex-1 overflow-hidden">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
