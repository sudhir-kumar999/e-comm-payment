import React from "react";
import { useContext } from "react";
import { myContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext"; // 👈 ADDED
import { useNavigate, Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Menu, Home, BookOpen, ShoppingBag, User } from "lucide-react";

const Navbar = () => {
  const { logout, user } = useContext(myContext);
  const { cart } = useContext(CartContext); // 👈 ADDED

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex items-center justify-between px-4 sm:px-6 py-3 shadow-md bg-white">
        <Link to="/">
          <h1 className="text-xl sm:text-2xl font-bold">📚 BookStore</h1>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost">Home</Button>
          </Link>

          <Link to="/books">
            <Button variant="ghost">Books</Button>
          </Link>

          {user && (
            <Link to="/myorders">
              <Button variant="ghost">My Orders</Button>
            </Link>
          )}

          {/* 👇 CART BUTTON ADDED */}
          {user && (
            <Link to="/cart">
              <Button variant="ghost">Cart ({cart.length})</Button>
            </Link>
          )}

          {!user ? (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          ) : (
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>
      </nav>

      {/* Mobile Top Header */}
      <nav className="md:hidden flex items-center justify-between px-4 py-3 shadow-md bg-white">
        <Link to="/">
          <h1 className="text-lg font-bold">📚 BookStore</h1>
        </Link>

        {!user ? (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        ) : (
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg flex justify-around items-center py-2 z-50">
        <Link to="/">
          <div className="flex flex-col items-center">
            <Home
              className={`h-5 w-5 ${
                isActive("/") ? "text-blue-600" : "text-gray-600"
              }`}
            />
            <span
              className={`text-xs ${
                isActive("/") ? "text-blue-600" : "text-gray-600"
              }`}
            >
              Home
            </span>
          </div>
        </Link>

        <Link to="/books">
          <div className="flex flex-col items-center">
            <BookOpen
              className={`h-5 w-5 ${
                isActive("/books") ? "text-blue-600" : "text-gray-600"
              }`}
            />
            <span
              className={`text-xs ${
                isActive("/books") ? "text-blue-600" : "text-gray-600"
              }`}
            >
              Books
            </span>
          </div>
        </Link>

        {/* 👇 CART ICON IN BOTTOM NAV */}
        {user && (
          <Link to="/cart">
            <div className="flex flex-col items-center">
              <ShoppingBag
                className={`h-5 w-5 ${
                  isActive("/cart") ? "text-blue-600" : "text-gray-600"
                }`}
              />
              <span
                className={`text-xs ${
                  isActive("/cart") ? "text-blue-600" : "text-gray-600"
                }`}
              >
                Cart
              </span>
            </div>
          </Link>
        )}

        {user && (
          <Link to="/myorders">
            <div className="flex flex-col items-center">
              <ShoppingBag
                className={`h-5 w-5 ${
                  isActive("/myorders") ? "text-blue-600" : "text-gray-600"
                }`}
              />
              <span
                className={`text-xs ${
                  isActive("/myorders") ? "text-blue-600" : "text-gray-600"
                }`}
              >
                Orders
              </span>
            </div>
          </Link>
        )}

        <Link to={user ? "/dashboard" : "/login"}>
          <div className="flex flex-col items-center">
            <User
              className={`h-5 w-5 ${
                isActive("/dashboard") || isActive("/login")
                  ? "text-blue-600"
                  : "text-gray-600"
              }`}
            />
            <span
              className={`text-xs ${
                isActive("/dashboard") || isActive("/login")
                  ? "text-blue-600"
                  : "text-gray-600"
              }`}
            >
              {user ? "Profile" : "Login"}
            </span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
