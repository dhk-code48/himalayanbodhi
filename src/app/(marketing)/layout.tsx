import { NavMobile } from "@/components/layout/MobileNav";
import { NavBar } from "@/components/layout/Navbar";
import { SiteFooter } from "@/components/layout/SiteFooter";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <NavMobile />
      <NavBar scroll={true} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
