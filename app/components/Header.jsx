"use client"; 

import Link from "next/link";
import { logout } from "../../actions/Usercontrolls";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("/api/auth-status");  
        const data = await response.json();
        setIsAuthenticated(data.isAuthenticated);
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    }
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsAuthenticated(false);
    redirect("/")

  };

  return (
    <header>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="Container mx-auto">
          <Link href="/" className="btn btn-ghost mx-auto text-xl">
            ImageEnhancer
          </Link>
        </div>
        {!isAuthenticated && (
          <>
            <div className="flex-none">
              <Link href="/register" className="btn btn-square btn-neutral w-20">Register</Link>
            </div>
            <div className="flex-none">
              <Link href="/login" className="btn btn-square btn-neutral w-20">Login</Link>
            </div>
          </>
        )} 
        
        {isAuthenticated && (
          <div className="flex-none">
            <button onClick={handleLogout} className="btn btn-neutral">
              Logout
            </button>
          </div>
        )
      }
      </div>
    </header>
  );
}
