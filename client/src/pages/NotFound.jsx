import React, { useContext, useEffect } from "react";
import { myContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const { user, loading } = useContext(myContext);
  const navigate = useNavigate();

  useEffect(() => {
    // wait until auth check completes
    if (loading) return;

    if (user) {
      // role based redirect
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else {
      navigate("/signup");
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="text-muted-foreground">
        Page not found. Redirecting...
      </p>

      <Button onClick={() => navigate("/")}>
        Go Home
      </Button>
    </div>
  );
};

export default NotFound;