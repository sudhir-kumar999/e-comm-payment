import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { myContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Menu } from "lucide-react";

const AdminNavbar = () => {
  const { logout } = useContext(myContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path ||
    location.pathname.startsWith(path + "/");

  return (
    <>
      {/* ===== DESKTOP NAVBAR ===== */}
      <nav className="hidden md:block sticky top-0 z-50 bg-slate-950 text-white border-b border-slate-800 shadow-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">

          <Link to="/admin" className="flex items-center gap-3">
            <span className="text-2xl">📚</span>
            <span className="font-bold text-lg tracking-wide">
              Admin Panel
            </span>
          </Link>

          <div className="flex items-center gap-3">

            <Link to="/admin">
              <Button
                size="sm"
                className={`px-4 py-2 rounded-lg transition-all ${
                  isActive("/admin") && location.pathname === "/admin"
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-slate-800 text-slate-200 hover:bg-slate-700"
                }`}
              >
                Manage Books
              </Button>
            </Link>

            <Link to="/admin/add-book">
              <Button
                size="sm"
                className={`px-4 py-2 rounded-lg transition-all ${
                  isActive("/admin/add-book")
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-slate-800 text-slate-200 hover:bg-slate-700"
                }`}
              >
                Add Book
              </Button>
            </Link>

            <Link to="/admin/orders">
              <Button
                size="sm"
                className={`px-4 py-2 rounded-lg transition-all ${
                  isActive("/admin/orders")
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-slate-800 text-slate-200 hover:bg-slate-700"
                }`}
              >
                Confirmed Orders
              </Button>
            </Link>

            <Button
              size="sm"
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all"
            >
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* ===== MOBILE NAVBAR ===== */}
      <nav className="md:hidden sticky top-0 z-50 bg-slate-950 text-white border-b border-slate-800 shadow-lg">
        <div className="flex h-16 items-center justify-between px-4">

          <Link to="/admin" className="flex items-center gap-2">
            <span className="text-xl">📚</span>
            <span className="font-semibold">Admin</span>
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                className="bg-slate-800 text-white hover:bg-slate-700"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent>
              <SheetHeader>
                <SheetTitle>Admin Menu</SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-4 mt-6">

                <Link to="/admin">
                  <Button className="w-full">
                    Manage Books
                  </Button>
                </Link>

                <Link to="/admin/add-book">
                  <Button className="w-full">
                    Add Book
                  </Button>
                </Link>

                <Link to="/admin/orders">
                  <Button className="w-full">
                    Confirmed Orders
                  </Button>
                </Link>

                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={handleLogout}
                >
                  Logout
                </Button>

              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </>
  );
};

export default AdminNavbar;
