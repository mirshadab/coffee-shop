import BottomNav from "@/components/BottomNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="pb-[90px]">{children}</main>
      <BottomNav />
    </>
  );
}
