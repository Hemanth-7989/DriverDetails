 import React, { useState } from "react";
import "./Routeslive.css";
import Planned from "./Planned";

const mockRoutes = [
   {
    id: "EKA01",
    status: "Active",
    stops: [
      { label: "Stop 1", time: "08:00" },
      { label: "Stop 2", time: "08:05" },
      { label: "Stop 3", time: "08:10" },
      { label: "Stop 4", time: "08:17" },
      { label: "Stop 5", time: "08:20" },
      { label: "Stop 6", time: "08:30" },
      { label: "End", time: "09:00" },
    ],
    currentStop: 2,
    speed: "45 kmph",
    location: "Live Location",
    driver: "DR123",
    vrn: "VRN01",
    range: "120 kms",
    soc: "75%",
    kmsTravelled: "25 kms",
    alerts: [
      { code: "DTC001", description: "Temperature Warning" },
      { code: "DTC002", description: "Battery Low Voltage" },
    ],
  },
  {
    id: "EKA02",
    status: "Charging",
    stops: [
      { label: "Stop 1", time: "08:10" },
      { label: "Stop 2", time: "08:20" },
      { label: "Stop 3", time: "08:25" },
      { label: "End", time: "08:30" },
    ],
    currentStop: 0,
    speed: "0 kmph",
    location: "Depot",
    driver: "DR456",
    vrn: "VRN02",
    range: "150 kms",
    soc: "80%",
    kmsTravelled: "0 kms",
    alerts: [],
  },
]


function Routeslive() {
  const [activeTab, setActiveTab] = useState("Routes Live");
  const [search, setSearch] = useState("");
    // const [selectedRoute, setSelectedRout] = useState(mockRoutes[0])

  const filteredRoutes = mockRoutes.filter((route) =>
    route.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="routeslive-container">
      <div className="Routes-header">Route Scheduling (BUS)</div>

      <div className="Routes-tabs">
        {[
          "Routes Live",
          "Planned Routes",
          "Unplanned Trips",
          "Technical Issues",
        ].map((tab) => (
          <button
            key={tab}
            className={`Routes-tab-btn ${
              activeTab === tab ? "Routes-active-tab" : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Routes Live" && (
        <div className="routes-live-main">
          <input
            type="text"
            placeholder="Search Route ID"
            className="route-search-box"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="routes-content">
            <div className="routes-left">
              {filteredRoutes.map((route) => (
                <div key={route.id} className="route-card">
                  <div className="route-card-header">
                    <span className="route-title">
                      Route ID: <strong>{route.id}</strong>
                    </span>
                    <span
                      className={`status-pill ${route.status.toLowerCase()}`}
                    >
                      {route.status}
                    </span>
                  </div>

                   <div className="timeline-wrapper">
                    <div className="timeline-container">
                      <div className="timeline-line"></div>
                      <div className="timeline-stops">
                        {route.stops.map((stop, idx) => (
                          <div key={idx} className="timeline-stop">
                            <div className="stop-label">{stop.label}</div>
                            <div className="stop-dot-container">
                              <div className={`stop-dot ${idx <= route.currentStop ? "completed" : ""}`}></div>
                            </div>
                            <div className="stop-time">{stop.time}</div>
                          </div>
                        ))}
                      </div>
                      {route.status === "Active" && (
                        <div
                          className="bus-icon"
                          style={{
                            left: `${(route.currentStop / (route.stops.length - 1)) * 100}%`,
                          }}
                        >
                          🚌
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="route-info-block">
                    <div className="info-row">
                      <p>
                        📍 <strong>{route.location}</strong>
                      </p>
                      <p>🚨 Display Only Critical Alerts</p>
                    </div>

                    <div className="info-grid">
                      <p>
                        📏 <strong>{route.kmsTravelled || "XX kms"}</strong> Kms
                        Travelled
                      </p>
                      <p>
                        🚍 <strong>{route.speed}</strong> Avg. Speed
                      </p>
                      <p>
                        🧑 <strong>{route.driver}</strong> Driver ID
                      </p>
                      <p>
                        📝 <strong>{route.vrn}</strong> Vehicle No.
                      </p>
                      <p>
                        🔋 <strong>{route.range}</strong> Range
                      </p>
                      <p>
                        ⚡ <strong>{route.soc}</strong> SOC
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="routes-right">
              <div className="map-container">🗺️ Map will be displayed here</div>
              <div className="pie-charts">
                <h4>Time Breakdown</h4>
                <div className="chart-and-list">
                  <svg
                    width="150"
                    height="150"
                    viewBox="0 0 36 36"
                    className="circular-chart"
                  >
                    <circle
                      className="bg"
                      cx="18"
                      cy="18"
                      r="15.9155"
                      fill="none"
                      stroke="#eee"
                      strokeWidth="2"
                    />
                    <circle
                      className="run"
                      cx="18"
                      cy="18"
                      r="15.9155"
                      fill="none"
                      stroke="#44bd32"
                      strokeWidth="2"
                      strokeDasharray="30, 70"
                      strokeDashoffset="0"
                    />
                    <circle
                      className="charge"
                      cx="18"
                      cy="18"
                      r="15.9155"
                      fill="none"
                      stroke="#00a8ff"
                      strokeWidth="2"
                      strokeDasharray="20, 80"
                      strokeDashoffset="-30"
                    />
                    <circle
                      className="stop"
                      cx="18"
                      cy="18"
                      r="15.9155"
                      fill="none"
                      stroke="#e84118"
                      strokeWidth="2"
                      strokeDasharray="25, 75"
                      strokeDashoffset="-50"
                    />
                    <circle
                      className="idle"
                      cx="18"
                      cy="18"
                      r="15.9155"
                      fill="none"
                      stroke="#fbc531"
                      strokeWidth="2"
                      strokeDasharray="25, 75"
                      strokeDashoffset="-75"
                    />
                    <text
                      x="18"
                      y="20.35"
                      className="percentage"
                      textAnchor="middle"
                      fill="#333"
                      fontSize="3"
                    >
                      Trip Time
                    </text>
                  </svg>

                  <ul className="time-list">
                    <li>
                      <span style={{ color: "#44bd32" }}>●</span> Run Time: 30%
                    </li>
                    <li>
                      <span style={{ color: "#00a8ff" }}>●</span> Charge Time:
                      20%
                    </li>
                    <li>
                      <span style={{ color: "#e84118" }}>●</span> Stop Time: 25%
                    </li>
                    <li>
                      <span style={{ color: "#fbc531" }}>●</span> Idle Time: 25%
                    </li>
                  </ul>
               
              </div>

              <div className="info-row">
  <p className="load">⚡ Load:<br /><span className="value">XX</span></p>
  <p className="AC">❄️ AC:<br /><span className="value">ON / OFF</span></p>
  <p className="Energy">🔋 Energy:<br /><span className="value">X kWh/km</span></p>
</div>


                <h4 className="Alerts">Alerts / Faults</h4>
                <ul>
                  <li className="DTC-Code">DTC Code: XXX</li>
                  <li className="Discription">Description: Overheating</li>
                </ul>
              </div>
            </div>
          </div>
          </div>
      
      )}
      {activeTab === "Planned Routes" && < Planned/>}
  
   
    </div>
  );
}

export default Routeslive;
