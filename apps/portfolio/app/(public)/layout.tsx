import { Navbar } from "@/components/common/navbar";

export default function PublicPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen">{children}</main>
    </>
  );
}
