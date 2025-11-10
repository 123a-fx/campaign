import React, { useEffect, useState } from "react";

function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);

  const fetchCampaigns = async () => {
    const response = await fetch("https://campaign-track1.onrender.com/campaigns");
    const data = await response.json();
    setCampaigns(data);
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div>
      <h2>All Campaigns</h2>
      <ul>
        {campaigns.map((c) => (
          <li key={c._id}>
            {c.name} - ${c.budget}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CampaignList;
