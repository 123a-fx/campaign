import React, { useState } from "react";
import AddCampaign from "./AddCampaign";
import CampaignList from "../components/CampaignList";

function Dashboard() {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => setRefresh(!refresh);

  return (
    <div>
      <h1>Campaign Dashboard</h1>
      <AddCampaign onAdd={handleRefresh} />
      <CampaignList key={refresh} />
    </div>
  );
}

export default Dashboard;
