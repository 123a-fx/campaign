import React, { useEffect, useState } from "react";
import "./CampaignDashboard.css";

function CampaignDashboard() {
  const [campaigns, setCampaigns] = useState([]);
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    client: "",
    startDate: "",
    status: "Active",
  });
  const [editId, setEditId] = useState(null);
  const [editCampaign, setEditCampaign] = useState({});
  const [searchText, setSearchText] = useState("");
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);

  // Fetch all campaigns
  const fetchCampaigns = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/campaigns");
      const data = await response.json();
      setCampaigns(data);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  // Add new campaign
  const handleAdd = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCampaign),
      });
      if (res.ok) {
        setNewCampaign({ name: "", client: "", startDate: "", status: "Active" });
        fetchCampaigns();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Delete campaign
  const handleDelete = async (id) => {
    try {
      await fetch(`http://127.0.0.1:5000/campaigns/${id}`, { method: "DELETE" });
      fetchCampaigns();
    } catch (error) {
      console.error(error);
    }
  };

  // Start editing a campaign
  const handleEdit = (campaign) => {
    setEditId(campaign.id);
    setEditCampaign({ ...campaign }); // clone to edit
  };

  // Save edited campaign
  const handleSave = async (id) => {
    try {
      await fetch(`http://127.0.0.1:5000/campaigns/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editCampaign),
      });
      setEditId(null);
      fetchCampaigns();
    } catch (error) {
      console.error(error);
    }
  };

  // Search campaigns
  const handleSearch = () => {
    const filtered = campaigns.filter(c =>
      c.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCampaigns(filtered);
  };

  // Refresh campaigns (clear search)
  const handleRefresh = () => {
    setSearchText("");
    setFilteredCampaigns([]);
  };

  // Count campaigns
  const activeCount = campaigns.filter(c => c.status === "Active").length;
  const pausedCount = campaigns.filter(c => c.status === "Paused").length;
  const completedCount = campaigns.filter(c => c.status === "Completed").length;

  return (
    <div className="dashboard-container">
      <h1>📊 Campaign Dashboard</h1>

      {/* Status Summary */}
      <div className="status-summary horizontal">
        <div className="status-card active">Active: {activeCount}</div>
        <div className="status-card paused">Paused: {pausedCount}</div>
        <div className="status-card completed">Completed: {completedCount}</div>
      </div>

      {/* Add Campaign */}
      <div className="add-campaign">
        <input
          type="text"
          placeholder="Campaign Name"
          value={newCampaign.name}
          onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Client Name"
          value={newCampaign.client}
          onChange={(e) => setNewCampaign({ ...newCampaign, client: e.target.value })}
        />
        <input
          type="date"
          value={newCampaign.startDate}
          onChange={(e) => setNewCampaign({ ...newCampaign, startDate: e.target.value })}
        />
        <select
          value={newCampaign.status}
          onChange={(e) => setNewCampaign({ ...newCampaign, status: e.target.value })}
        >
          <option>Active</option>
          <option>Paused</option>
          <option>Completed</option>
        </select>
        <button onClick={handleAdd} className="add-btn">Add Campaign</button>
      </div>

      {/* Search & Refresh */}
      <div className="search-refresh">
        <input
          type="text"
          placeholder="Search by Campaign Name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={handleSearch} className="search-btn">Search</button>
        <button onClick={handleRefresh} className="refresh-btn">Refresh</button>
      </div>

      {/* Campaign Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Client</th>
              <th>Start Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {(filteredCampaigns.length ? filteredCampaigns : campaigns).map(c => (
              <tr key={c.id}>
                <td>
                  {editId === c.id ? (
                    <input
                      type="text"
                      value={editCampaign.name}
                      onChange={(e) => setEditCampaign({ ...editCampaign, name: e.target.value })}
                    />
                  ) : c.name}
                </td>
                <td>
                  {editId === c.id ? (
                    <input
                      type="text"
                      value={editCampaign.client}
                      onChange={(e) => setEditCampaign({ ...editCampaign, client: e.target.value })}
                    />
                  ) : c.client}
                </td>
                <td>
                  {editId === c.id ? (
                    <input
                      type="date"
                      value={editCampaign.startDate}
                      onChange={(e) => setEditCampaign({ ...editCampaign, startDate: e.target.value })}
                    />
                  ) : c.startDate}
                </td>
                <td>
                  {editId === c.id ? (
                    <select
                      value={editCampaign.status}
                      onChange={(e) => setEditCampaign({ ...editCampaign, status: e.target.value })}
                    >
                      <option>Active</option>
                      <option>Paused</option>
                      <option>Completed</option>
                    </select>
                  ) : (
                    c.status
                  )}
                </td>
                <td>
                  {editId === c.id ? (
                    <button onClick={() => handleSave(c.id)} className="save-btn">Save</button>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(c)} className="edit-btn">Edit</button>
                      <button onClick={() => handleDelete(c.id)} className="delete-btn">Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CampaignDashboard;
