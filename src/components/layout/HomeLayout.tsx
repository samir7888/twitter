import { Menu } from "lucide-react";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { SidebarLayout } from "../common/Sidebar";

const HomeLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen relative w-full flex bg-black text-white">
        {/* Sidebar */}
        <aside className="flex h-screen sticky top-0 ">
          <SidebarLayout />
        </aside>

        {/* Mobile menu trigger - only visible on small screens */}
        <div className="md:hidden fixed top-1 left-0 z-50">
          <SidebarTrigger>
        
            <button className="p-2 rounded-full bg-black text-white hover:bg-gray-800">
              <Menu size={24} />
            </button>
          </SidebarTrigger>
        </div>

        {/* Main content */}
        <main className="flex-1 min-h-screen border-l border-gray-800">
          <div className="max-w-2xl mx-auto  md:px-4">
            <Outlet />
          </div>
        </main>

        {/* Right sidebar/widgets area (optional) */}
        <div className="hidden lg:block w-80 min-h-screen border-l border-gray-800 p-4">
          {/* Search, trends, who to follow, etc. */}
          <div className="bg-gray-900 rounded-full p-3 mb-4">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent w-full outline-none"
            />
          </div>
          <div className="bg-gray-900 rounded-2xl p-4 mb-4">
            <h2 className="font-bold text-xl mb-4">What's happening</h2>
            {/* Trending content would go here */}
            <div className="py-3 border-b border-gray-800">
              <p className="text-gray-500 text-sm">Trending in Technology</p>
              <p className="font-bold">#WebDevelopment</p>
              <p className="text-gray-500 text-sm">14.2K posts</p>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default HomeLayout;