import { Outlet } from "react-router-dom";
import { Sidebar, SidebarContent } from "../components/Sidebar";

const HomeLayout = () => {
  return (
    <section className="grid grid-cols-4 items-start gap-5 md:grid-cols-5 xl:grid-cols-6">
      <Sidebar className="col-span-1">
        <SidebarContent />
      </Sidebar>
      <div className="col-span-4 sm:col-span-3 md:col-span-4 xl:col-span-5 py-4">
        <Outlet />
      </div>
    </section>
  );
};

export default HomeLayout;
