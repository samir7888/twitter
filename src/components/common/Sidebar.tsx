import {
    Home,
    Inbox,
    Settings,
    User,
    Twitter,
  } from "lucide-react";
  import { Link, useLocation } from "react-router-dom";
  import {
    Sidebar,
    SidebarContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
  } from "@/components/ui/sidebar";
  
  const menuItems = [
    { url: "/home", icon: Home, label: "Home" },
    { url: `/${localStorage.getItem("username")}`, icon: User, label: "Profile" },
    { url: "/inbox", icon: Inbox, label: "Messages" },
    { url: "/settings", icon: Settings, label: "Settings" },
  ];
  
  export function SidebarLayout() {
    const location = useLocation();
  
    return (
      <Sidebar className="min-h-screen bg-black text-white border-r border-gray-800 w-72 flex flex-col">
        <SidebarContent className="bg-black flex flex-col h-full">
          {/* Twitter logo */}
          <div className="px-4 py-3">
            <div className="p-3 rounded-full hover:bg-gray-800 w-12 h-12 flex items-center justify-center">
              <Twitter size={30} className="text-white" />
            </div>
          </div>
  
          <SidebarMenu className="gap-2 py-2 px-2 bg-black">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.url;
              return (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    className={`p-3 rounded-full transition flex items-center gap-4 w-full ${
                      isActive
                        ? "font-bold text-white"
                        : "hover:bg-gray-800 text-gray-300"
                    }`}
                    asChild
                  >
                    <Link to={item.url}>
                      <item.icon size={26} />
                      <span className="text-xl hidden md:inline">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
  
          <div className="mt-auto">
            <SidebarFooter className="p-4 bg-black border-t border-gray-800 flex items-center">
              <img
               src={"https://avatar.iran.liara.run/public"}
                alt="user avatar"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div className="hidden md:block">
                <p className="text-gray-500">@{localStorage.getItem('username')}</p>
              </div>
            </SidebarFooter>
          </div>
        </SidebarContent>
      </Sidebar>
    );
  }