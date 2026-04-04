import { Outlet } from "react-router";

export default function SiteLayout() {
  return (
    <div className="app-shell">
      <Outlet />
    </div>
  );
}
