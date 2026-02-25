import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "../main";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { myContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";


const Profile = () => {
  const navigate = useNavigate();
//   const {user}=useContext(myContext)
  const { logout, user } = useContext(myContext);

  const [users, setUsers] = useState({
    name: "",
    address: "",
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // =====================
  // GET PROFILE
  // =====================
  const getProfile = async () => {
    try {
      const res = await axios.get(`${BaseUrl}/profile`, {
        withCredentials: true,
      });

      setUsers(res.data.user);
    } catch {
      toast.error("Failed to load profile");
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  // =====================
  // UPDATE PROFILE
  // =====================
  const handleUpdate = async () => {
    try {
      await axios.put(`${BaseUrl}/profile`, user, {
        withCredentials: true,
      });

      toast.success("Profile Updated ✅");
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold">My Profile</h2>

      {/* PROFILE SECTION */}
      <div className="space-y-3 border p-4 rounded shadow-sm">
        <input
          className="border p-2 w-full rounded"
          value={users.name}
          onChange={(e) =>
            setUser({ ...users, name: e.target.value })
          }
          placeholder="Name"
        />

        <textarea
          className="border p-2 w-full rounded"
          value={users.address}
          onChange={(e) =>
            setUser({ ...users, address: e.target.value })
          }
          placeholder="Address"
        />

        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          Save Changes
        </button>
      </div>

      {/* ✅ MY ORDERS BUTTON ONLY */}
      <div className="border p-4 rounded shadow-sm flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">My Orders</h3>
          <p className="text-gray-500 text-sm">
            View all your purchased books
          </p>
        </div>

        <button
          onClick={() => navigate("/myorders")}
          className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
        >
          View Orders
        </button>

        
      </div>
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
  );
};

export default Profile;