import React, { useEffect, useState } from "react";
import axios from "axios";

function TaskDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Token not found in localStorage.");
          return;
        }

        const response = await axios.get("/api/auth/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.data) {
          throw new Error("Failed to fetch user information.");
        }

        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center mt-5">Dashboard</h1>
      {user && (
        <p className="text-center mt-3">Welcome, {user.username}!</p>
      )}
    </div>
  );
}

export default TaskDashboard;
