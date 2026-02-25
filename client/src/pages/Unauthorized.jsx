import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Unauthorized = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 p-4">
    <h1 className="text-2xl font-semibold">Access denied</h1>
    <p className="text-muted-foreground text-center">You don't have permission to view this page.</p>
    <Link to="/">
      <Button>Go to Home</Button>
    </Link>
  </div>
);

export default Unauthorized;
