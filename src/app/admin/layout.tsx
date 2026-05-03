/**
 * Admin route layout — intentionally empty.
 * The root layout SiteChrome component handles hiding Navbar/Footer for /admin.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
