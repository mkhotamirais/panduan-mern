import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { SidebarCollapse, SidebarContent } from "./components/Sidebar";

const App = () => {
  return (
    <>
      <Header />
      <SidebarCollapse>
        <SidebarContent />
      </SidebarCollapse>
      <main className="min-h-[80vh] px-3 lg:px-16">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  );
};

export default App;
