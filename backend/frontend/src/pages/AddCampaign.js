import React, { useState } from "react";

function AddCampaign({ onAdd }) {
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://campaign-track1.onrender.com/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, budget: Number(budget) })
    });
    const data = await response.json();
    console.log(data);
    alert("Campaign Added!");
    setName("");
    setBudget("");
    onAdd(); // Refresh the list
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Campaign Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Budget"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        required
      />
      <button type="submit">Add Campaign</button>
    </form>
  );
}

export default AddCampaign;
