 "use client"

import { useState, useEffect } from "react"
import "./Planned.css"
import DailyScheduling from "../RouteManagement/DailySchedule"

const Planned = () => {
  const [activeSubTab, setActiveSubTab] = useState("define")

  const [selectedRoute, setSelectedRoute] = useState(null)
  const [showRouteDefinition, setShowRouteDefinition] = useState(false)
  const [showAddRouteForm, setShowAddRouteForm] = useState(false)
  const [routeData, setRouteData] = useState([])
  const [newRoute, setNewRoute] = useState({
    id: "",
    area: "",
    startPoint: "",
    endPoint: "",
    dailyTrips: "",
    stops: "",
    tripTime: "",
    vehicle: "",
    assignedVehicle: "",
    spare: "",
    shift: "M",
    status: "Active",
  })

  // Form for defining stops
  const [trips, setTrips] = useState([
    {
      tripNo: 1,
      shift: "Morning",
      stops: [
        { name: "First Stop", latitude: "", longitude: "", time: "", duration: "" },
        { name: "Stop 2", latitude: "", longitude: "", time: "", duration: "" },
        { name: "Last Stop", latitude: "", longitude: "", time: "", duration: "" },
      ],
    },
    {
      tripNo: 2,
      shift: "Evening",
      stops: [
        { name: "First Stop", latitude: "", longitude: "", time: "", duration: "" },
        { name: "Stop 2", latitude: "", longitude: "", time: "", duration: "" },
        { name: "Last Stop", latitude: "", longitude: "", time: "", duration: "" },
      ],
    },
  ])

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedRoutes = localStorage.getItem("routeData")
    if (savedRoutes) {
      setRouteData(JSON.parse(savedRoutes))
    } else {
      // Initial data if nothing in localStorage
      const initialRouteData = [
        {
          id: "EX007",
          area: "PCMC",
          startPoint: "Pimpri Station",
          endPoint: "EVA Chakan",
          dailyTrips: "xx",
          stops: "xx",
          tripTime: "No minutes",
          vehicle: "VRU",
          spare: "VRU",
          shift: "M-E",
          status: "Active",
        },
        {
          id: "EX023",
          area: "PMC",
          startPoint: "Katraj",
          endPoint: "EVA Chakan",
          dailyTrips: "xx",
          stops: "xx",
          tripTime: "No minutes",
          vehicle: "VRU",
          spare: "VRU",
          shift: "M",
          status: "Active",
        },
        {
          id: "EX024",
          area: "PMC",
          startPoint: "Katraj",
          endPoint: "EVA Chakan",
          dailyTrips: "xx",
          stops: "xx",
          tripTime: "No minutes",
          vehicle: "VRU",
          spare: "VRU",
          shift: "M",
          status: "Active",
        },
        {
          id: "EX025",
          area: "PCMC",
          startPoint: "Nigdi",
          endPoint: "EVA Chakan",
          dailyTrips: "xx",
          stops: "xx",
          tripTime: "No minutes",
          vehicle: "VRU",
          spare: "VRU",
          shift: "M-E",
          status: "Active",
        },
        {
          id: "EX026",
          area: "PMC",
          startPoint: "Katraj",
          endPoint: "EVA Chakan",
          dailyTrips: "xx",
          stops: "xx",
          tripTime: "No minutes",
          vehicle: "VRU",
          spare: "VRU",
          shift: "M",
          status: "Active",
        },
      ]
      setRouteData(initialRouteData)
      localStorage.setItem("routeData", JSON.stringify(initialRouteData))
    }

    // Load saved trips data if available
    const savedTrips = localStorage.getItem("tripsData")
    if (savedTrips) {
      setTrips(JSON.parse(savedTrips))
    }
  }, [])

  const handleRouteClick = (route) => {
    setSelectedRoute(route)
    setShowRouteDefinition(true)
    setShowAddRouteForm(false)
  }

  const handleAddRouteClick = () => {
    setShowAddRouteForm(true)
    setShowRouteDefinition(false)
    // Generate a new route ID
    const lastId = routeData.length > 0 ? Number.parseInt(routeData[routeData.length - 1].id.replace("EX", "")) : 26
    const newId = `EX${String(lastId + 1).padStart(3, "0")}`
    setNewRoute({ ...newRoute, id: newId })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewRoute({
      ...newRoute,
      [name]: value,
    })
  }

  const handleTripChange = (tripIndex, field, value) => {
    const updatedTrips = [...trips]
    updatedTrips[tripIndex][field] = value
    setTrips(updatedTrips)

    // Save to localStorage
    localStorage.setItem("tripsData", JSON.stringify(updatedTrips))
  }

  const handleStopChange = (tripIndex, stopIndex, field, value) => {
    const updatedTrips = [...trips]
    updatedTrips[tripIndex].stops[stopIndex][field] = value
    setTrips(updatedTrips)

    // Save to localStorage
    localStorage.setItem("tripsData", JSON.stringify(updatedTrips))
  }

  const handleSaveRoute = () => {
    // Calculate number of stops from trips data
    const totalStops = trips.reduce((total, trip) => total + trip.stops.length, 0)

    // Create a new route with the form data and stops information
    const routeToSave = {
      ...newRoute,
      stops: totalStops.toString(),
      trips: trips, // Store the trips data with the route
    }

    const updatedRouteData = [...routeData, routeToSave]
    setRouteData(updatedRouteData)

    // Save to localStorage
    localStorage.setItem("routeData", JSON.stringify(updatedRouteData))

    // Reset form and close it
    setNewRoute({
      id: "",
      area: "",
      startPoint: "",
      endPoint: "",
      dailyTrips: "",
      stops: "",
      tripTime: "",
      vehicle: "VRU",
      assignedVehicle: "",
      spare: "VRU",
      shift: "M",
      status: "Active",
    })
    setShowAddRouteForm(false)
  }

  const handleCancelAddRoute = () => {
    setShowAddRouteForm(false)
  }

  return (
    <div className="route-scheduling-container">
      {/* Content Area */}
      <div className="content-area">
        {/* Left Sidebar - Map */}
        <div className="left-sidebar">
          <div className="map-container">
            <div className="map-placeholder">
              <svg viewBox="0 0 200 300" className="route-map">
                <path
                  d="M50 50 Q100 100 150 50 Q100 150 50 200 Q100 250 150 200"
                  stroke="#6366f1"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="5,5"
                />
                <circle cx="50" cy="50" r="4" fill="#6366f1" />
                <circle cx="150" cy="200" r="4" fill="#6366f1" />
              </svg>
            </div>
            <div className="map-note">
              <span className="note-text">Show irregular route trace on clicking Route ID</span>
            </div>
          </div>
        </div>

        {/* Main Content Area - Show main panel OR add route form */}
        {showAddRouteForm ? (
          /* Add Route Form - Replaces Main Panel */
          <div className="main-panel-replacement">
            <div className="route-definition-panel">
              <div className="panel-header">
                <h3>Route Definition</h3>
                <button className="close-btn" onClick={handleCancelAddRoute}>
                  ×
                </button>
              </div>

              <div className="route-form add-route-form">
                <div className="planned-form-section-id-area">
                  <label>Route ID:</label>
                  <input
                    type="text"
                    name="id"
                    value={newRoute.id}
                    onChange={handleInputChange}
                    placeholder="Assign ID/PIN your route"
                    readOnly
                  />
                </div>

                <div className="planned-form-section-id-area">
                  <label>Area:</label>
                  <input
                    type="text"
                    name="area"
                    value={newRoute.area}
                    onChange={handleInputChange}
                    placeholder="Provide with Area/Locality"
                  />
                </div>

                <div className="planned-form-section">
                  <label>Start Point:</label>
                  <input
                    type="text"
                    name="startPoint"
                    value={newRoute.startPoint}
                    onChange={handleInputChange}
                    placeholder="Provide a name"
                  />
                  <div className="coordinates-row">
                    <input type="text" placeholder="Latitude (degrees)" />
                    <button className="map-btn">Choose on map</button>
                  </div>
                </div>

                <div className="planned-form-section">
                  <label>End Point:</label>
                  <input
                    type="text"
                    name="endPoint"
                    value={newRoute.endPoint}
                    onChange={handleInputChange}
                    placeholder="Provide a name"
                  />
                  <div className="coordinates-row">
                    <input type="text" placeholder="Latitude (degrees)" />
                    <button className="map-btn">Choose on map</button>
                  </div>
                </div>

                <div className="planned-form-section">
                  <label>Daily Trips:</label>
                  <input
                    type="text"
                    name="dailyTrips"
                    value={newRoute.dailyTrips}
                    onChange={handleInputChange}
                    placeholder="No. of trips to be performed in a day"
                  />
                </div>

                <div className="planned-form-section">
                  <label>Shift:</label>
                  <select name="shift" value={newRoute.shift} onChange={handleInputChange}>
                    <option value="M">Morning</option>
                    <option value="E">Evening</option>
                    <option value="M-E">Morning-Evening</option>
                  </select>
                </div>

                <div className="form-section define-stops-section">
                  <label className="define-head">Define Stops:</label>
                  {trips.map((trip, tripIndex) => (
                    <div key={tripIndex} className="trip-container">
                      <div className="trip-header">
                        <div className="trip-number">
                          <label>Trip No.</label>
                          <input
                            type="text"
                            value={trip.tripNo}
                            onChange={(e) => handleTripChange(tripIndex, "tripNo", e.target.value)}
                            placeholder="Enter Trip No."
                          />
                        </div>

                        <div className="trip-shift">
                          <label>Shift</label>
                          <select
                            value={trip.shift}
                            onChange={(e) => handleTripChange(tripIndex, "shift", e.target.value)}
                          >
                            <option value="Morning">Morning</option>
                            <option value="Evening">Evening</option>
                          </select>
                        </div>

                        <div className="define-stops">
                          <label>Stops</label>
                          <input
                            type="number"
                            value={trip.noOfStops || ""}
                            onChange={(e) => handleTripChange(tripIndex, "noOfStops", e.target.value)}
                            placeholder="Define no. of stops"
                          />
                        </div>
                      </div>

                      {trip.stops.map((stop, stopIndex) => (
                        <div key={stopIndex} className="stop-row">
                          <div className="stop-name">
                            <input
                              type="text"
                              value={stop.name}
                              onChange={(e) => handleStopChange(tripIndex, stopIndex, "name", e.target.value)}
                              placeholder="Provide a name"
                            />
                          </div>
                          <div className="stop-coordinates">
                            <label>Choose on Map </label>

                            <input
                              type="text"
                              value={stop.latitude}
                              onChange={(e) => handleStopChange(tripIndex, stopIndex, "latitude", e.target.value)}
                              placeholder="Latitude, Longitude"
                            />
                          </div>
                          <div className="stop-time">
                            <label>Time</label>
                            <input
                              type="text"
                              value={stop.time}
                              onChange={(e) => handleStopChange(tripIndex, stopIndex, "time", e.target.value)}
                              placeholder="hh:mm"
                            />
                          </div>
                          <div className="stop-duration">
                            <label>Time</label>

                            <input
                              type="text"
                              value={stop.duration}
                              onChange={(e) => handleStopChange(tripIndex, stopIndex, "duration", e.target.value)}
                              placeholder="hh:mm"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="planned-form-section">
                  <label>Trip Time:</label>
                  <input
                    type="text"
                    name="tripTime"
                    value={newRoute.tripTime}
                    onChange={handleInputChange}
                    placeholder="Enter approx. start point to end point duration"
                  />
                </div>
                <div className="planned-form-row">
                  <div className="planned-form-section1">
                    <label htmlFor="vehicle">Vehicle Type:</label>
                    <input
                      type="text"
                      id="vehicle"
                      name="vehicle"
                      value={newRoute.vehicle}
                      onChange={handleInputChange}
                      placeholder="Electric 9m AC"
                    />
                  </div>
                  <div className="planned-form-section1">
                    <label htmlFor="assignedVehicle">Vehicle to be assigned:</label>
                    <input
                      type="text"
                      id="assignedVehicle"
                      name="assignedVehicle"
                      value={newRoute.assignedVehicle}
                      onChange={handleInputChange}
                      placeholder="Vehicle VRN assigned this route"
                    />
                  </div>
                </div>

                <div className="planned-form-section">
                  <label>Spare replacement:</label>
                  <input
                    type="text"
                    name="spare"
                    value={newRoute.spare}
                    onChange={handleInputChange}
                    placeholder="Spare VRN assigned this route"
                  />
                </div>

                <div className="form-actions">
                  <button className="planned-cancel-btn" onClick={handleCancelAddRoute}>
                    Cancel
                  </button>
                  <button className="planned-save-btn" onClick={handleSaveRoute}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Main Panel - Default View */
          <div className="main-panel">
            <div className="planned-routes-section">
              <h2>Planned Routes</h2>

              {/* Sub Navigation */}
              <div className="sub-nav">
                <button
                  className={`sub-nav-btn ${activeSubTab === "define" ? "active" : ""}`}
                  onClick={() => setActiveSubTab("define")}
                >
                  Define Routes
                </button>
                <button
                  className={`sub-nav-btn ${activeSubTab === "daily" ? "active" : ""}`}
                  onClick={() => setActiveSubTab("daily")}
                >
                  Daily Scheduling
                </button>
                <button
                  className={`sub-nav-btn ${activeSubTab === "unplanned" ? "active" : ""}`}
                  onClick={() => setActiveSubTab("unplanned")}
                >
                  Unplanned Trips
                </button>
                <button className="add-route-btn" onClick={handleAddRouteClick}>
                  Add Route
                </button>
              </div>

              {/* Show Daily Scheduling component when that tab is active */}
              {activeSubTab === "daily" ? (
                <DailyScheduling />
              ) : (
                <>
                  {/* Data Table - Only show when not in Daily Scheduling */}
                  <div className="table-container">
                    <table className="routes-table">
                      <thead>
                        <tr>
                          <th>Route ID</th>
                          <th>Area</th>
                          <th>Start Point</th>
                          <th>End Point</th>
                          <th>Daily Trips</th>
                          <th>No. of Stops</th>
                          <th>Trip Time</th>
                          <th>Vehicle</th>
                          <th>Spare</th>
                          <th>Shift</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {routeData.map((route, index) => (
                          <tr key={index}>
                            <td>
                              <button className="route-id-btn" onClick={() => handleRouteClick(route)}>
                                {route.id}
                              </button>
                            </td>
                            <td>{route.area}</td>
                            <td>{route.startPoint}</td>
                            <td>{route.endPoint}</td>
                            <td>{route.dailyTrips}</td>
                            <td>{route.stops}</td>
                            <td>{route.tripTime}</td>
                            <td>{route.vehicle}</td>
                            <td>{route.spare}</td>
                            <td>{route.shift}</td>
                            <td>
                              <span className={`status ${route.status.toLowerCase()}`}>{route.status}</span>
                            </td>
                            <td>
                              <button className="action-btn">✏️</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Route Definition Panel - Below Table */}
                  {showRouteDefinition && (
                    <div className="route-definition-below-table">
                      <div className="route-definition-panel-horizontal">
                        <div className="panel-header">
                          <h3>Route Definition</h3>
                          <button className="close-btn" onClick={() => setShowRouteDefinition(false)}>
                            ×
                          </button>
                        </div>

                        <div className="route-definition-content">
                          <div className="route-details-horizontal">
                            <div className="detail-row">
                              <label>Route ID:</label>
                              <span>{selectedRoute?.id}</span>
                            </div>
                            <div className="detail-row">
                              <label>Area:</label>
                              <span>{selectedRoute?.area}</span>
                            </div>
                            <div className="detail-row">
                              <label>Start Point:</label>
                              <span>{selectedRoute?.startPoint}</span>
                            </div>
                            <div className="detail-row">
                              <label>End Point:</label>
                              <span>{selectedRoute?.endPoint}</span>
                            </div>
                            <div className="detail-row">
                              <label>Shift:</label>
                              <span>{selectedRoute?.shift}</span>
                            </div>
                          </div>

                          <div className="route-form-horizontal">
                            <h4>Trip Type</h4>
                            <div className="planned-form-section">
                              <div className="checkbox-group">
                                <label>
                                  <input type="checkbox" /> Up Trip
                                </label>
                                <label>
                                  <input type="checkbox" /> Down Trip
                                </label>
                              </div>
                            </div>

                            <div className="planned-form-section">
                              <label>Vehicle Type:</label>
                              <select>
                                <option>Vehicle to be assigned</option>
                              </select>
                            </div>

                            <div className="planned-form-section">
                              <label>Spare vehicle:</label>
                              <input type="text" placeholder="Spare vehicle" />
                            </div>

                            <div className="form-actions">
                              <button className="plan-save-btn">Save</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Planned
