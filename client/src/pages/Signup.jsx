import React, { useContext, useState } from "react";
import { myContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useContext(myContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // ✅ input handler (clean method)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("All fields are required ❌");
      return;
    }

    try {
      const res = await signup(formData);

      if (res?.success) {
        toast.success("Signup Successful ✅");

        // user ko toast dekhne ka time
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        toast.error(res?.message || "Signup Failed ❌");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong ⚠️");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex justify-center items-center px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Create Account
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div>
              <Label>Email Address</Label>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>

          <div className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;