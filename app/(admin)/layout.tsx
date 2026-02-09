import AdminBottomNav from "@/components/admin/AdminBottomNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="pb-[90px]">{children}</main>
      <AdminBottomNav />
    </>
  );
}
