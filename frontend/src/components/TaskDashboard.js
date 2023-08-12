import React, { useEffect, useState } from "react";
import axios from "axios";
import UserAvatar from "./UserAvatar";
import { Navbar } from "react-bootstrap";
import "./dashboardNav.css" 

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
      <Navbar fixed="top" className="dashboard-navbar">
          <Navbar.Brand href="/" className="navbar-brand">
              Thrive
          </Navbar.Brand>
          <div className="ml-auto">
              <UserAvatar user={user} />
          </div>
      </Navbar>
      {/* <div className="welcome-user">
        {user && (
          <p className="text-left ml-0">Welcome, {user.username}!</p>
        )}
        </div> */}
    </div>
  );
}

export default TaskDashboard;
