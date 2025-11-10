import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CampaignDashboard from "./CampaignDashboard";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (!loggedIn) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div>
      <button onClick={handleLogout} style={{ float: "right" }}>
        Logout
      </button>
      <CampaignDashboard />
    </div>
  );
}

export default Dashboard;
