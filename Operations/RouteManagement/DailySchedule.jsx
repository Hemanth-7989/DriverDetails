 "use client"

import { useState, useEffect } from "react"
import "./DailySchedule.css"

const DailyScheduling = () => {
  const [routeData, setRouteData] = useState([])
  const [selectedShift, setSelectedShift] = useState("M")
  const [dailySchedules, setDailySchedules] = useState([])
  const [currentDate] = useState(new Date().toISOString().split("T")[0])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState(null)
  const [modalData, setModalData] = useState({
    driver: "M",
    vrn: "M",
    shift: "M",
  })

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedRoutes = localStorage.getItem("routeData")
    if (savedRoutes) {
      setRouteData(JSON.parse(savedRoutes))
    }

    const savedSchedules = localStorage.getItem("dailySchedules")
    if (savedSchedules) {
      setDailySchedules(JSON.parse(savedSchedules))
    }
  }, [])

  // Filter routes based on selected shift
  const filteredRoutes = routeData.filter((route) => route.shift === selectedShift || route.shift === "M-E")

  const handleShiftChange = (shift) => {
    setSelectedShift(shift)
  }

  const handleSubmit = () => {
    // Create daily schedule entries for each route
    const newSchedules = filteredRoutes.map((route) => ({
      date: currentDate,
      routeId: route.id,
      area: route.area,
      startPoint: route.startPoint,
      endPoint: route.endPoint,
      shift: selectedShift,
      status: "Planned",
      driver: "TBD",
      vehicle: route.vehicle,
      stops: route.stops,
      tripTime: route.tripTime,
    }))

    // Combine with existing schedules, replacing any for the same date/route/shift
    const updatedSchedules = [
      ...dailySchedules.filter(
        (schedule) =>
          !(
            schedule.date === currentDate &&
            filteredRoutes.some((route) => route.id === schedule.routeId) &&
            schedule.shift === selectedShift
          ),
      ),
      ...newSchedules,
    ]

    setDailySchedules(updatedSchedules)
    localStorage.setItem("dailySchedules", JSON.stringify(updatedSchedules))
    alert("Daily schedule updated successfully!")
  }

  const handleEditClick = (schedule) => {
    setSelectedRoute(schedule)
    setModalData({
      driver: schedule.driver || "M",
      vrn: schedule.vehicle || "M",
      shift: schedule.shift || "M",
    })
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedRoute(null)
  }

  const handleModalSave = () => {
    // Update the schedule with new data
    const updatedSchedules = dailySchedules.map((schedule) => {
      if (schedule.routeId === selectedRoute.routeId && schedule.date === selectedRoute.date) {
        return {
          ...schedule,
          driver: modalData.driver,
          vehicle: modalData.vrn,
          shift: modalData.shift,
        }
      }
      return schedule
    })

    setDailySchedules(updatedSchedules)
    localStorage.setItem("dailySchedules", JSON.stringify(updatedSchedules))
    setIsModalOpen(false)
    setSelectedRoute(null)
    alert("Route updated successfully!")
  }

  const handleCancelTrip = () => {
    // Remove the trip from schedules
    const updatedSchedules = dailySchedules.filter(
      (schedule) => !(schedule.routeId === selectedRoute.routeId && schedule.date === selectedRoute.date),
    )

    setDailySchedules(updatedSchedules)
    localStorage.setItem("dailySchedules", JSON.stringify(updatedSchedules))
    setIsModalOpen(false)
    setSelectedRoute(null)
    alert("Trip cancelled successfully!")
  }

  const handleModalInputChange = (field, value) => {
    setModalData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Get today's scheduled routes
  const todaysSchedules = dailySchedules.filter((schedule) => schedule.date === currentDate)

  return (
    <div className="daily-scheduling-container">
      <div className="daily-header">
        <h3>
          Plan today's routes <span className="subtext">(select to be confirmed)</span>
        </h3>
        <div className="date-indicator">
          <span className="dot same-as-yesterday"></span>
          <span>Same as yesterday</span>
        </div>
      </div>

     <div className="daily-scheduling-table">
  <div className="dropdown-row">
    {/* Route ID Dropdown */}
   <p className="Head-Planned">Planned Routes</p>
    <div className="dropdown-group">
      <label htmlFor="routeId">Route ID:</label>
      <select id="routeId" onChange={(e) => console.log("Selected Route ID:", e.target.value)}>
        <option value="">-- Select --</option>
        {filteredRoutes.map((route, index) => (
          <option key={`route-${index}`} value={route.id}>
            {route.id}
          </option>
        ))}
      </select>
    </div>

    {/* VRN Dropdown */}
    <div className="dropdown-group">
      <label htmlFor="vrn">VRN:</label>
      <select id="vrn" onChange={(e) => console.log("Selected VRN:", e.target.value)}>
        <option value="">-- Select --</option>
        {filteredRoutes.map((_, index) => (
          <option key={`vrn-${index}`} value={`VRN${String(index + 1).padStart(2, "0")}`}>
            VRN{String(index + 1).padStart(2, "0")}
          </option>
        ))}
      </select>
    </div>

    {/* Driver ID Dropdown */}
    <div className="dropdown-group">
      <label htmlFor="driver">Driver:</label>
      <select id="driver" onChange={(e) => console.log("Selected Driver ID:", e.target.value)}>
        <option value="">-- Select --</option>
        {filteredRoutes.map((_, index) => (
          <option key={`driver-${index}`} value={`D${String(index + 1).padStart(2, "0")}`}>
            D{String(index + 1).padStart(2, "0")}
          </option>
        ))}
      </select>
    </div>

    {/* Shift Dropdown */}
    <div className="dropdown-group">
      <label htmlFor="shift">Shift:</label>
      <select
        id="shift"
        value={selectedShift}
        onChange={(e) => handleShiftChange(e.target.value)}
      >
        <option value="M">M</option>
        <option value="E">E</option>
      </select>
    </div>
  </div>
</div>


      <div className="submit-section">
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      <div className="today-routes-section">
        <h3>Today's Routes</h3>
        <table className="today-routes-table">
          <thead>
            <tr>
              <th>Route ID</th>
              <th>Area</th>
              <th>Driver</th>
              <th>Shift</th>
              <th>No. of Stops</th>
              <th>Vehicle</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todaysSchedules.map((schedule, index) => (
              <tr key={index}>
                <td>{schedule.routeId}</td>
                <td>{schedule.area}</td>
                <td>{schedule.driver}</td>
                <td>{schedule.shift}</td>
                <td>{schedule.stops}</td>
                <td>{schedule.vehicle}</td>
                <td>
                  <span className={`status ${schedule.status.toLowerCase()}`}>{schedule.status}</span>
                </td>
                <td>
                  <button className="Daily-action-btn" onClick={() => handleEditClick(schedule)}>
                    ✏️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Route: {selectedRoute?.routeId}</h3>
              <button className="modal-close" onClick={handleModalClose}>
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Driver</label>
                <select value={modalData.driver} onChange={(e) => handleModalInputChange("driver", e.target.value)}>
                  <option value="M">M</option>
                  <option value="E">E</option>
                  <option value="D01">D01</option>
                  <option value="D02">D02</option>
                  <option value="D03">D03</option>
                </select>
              </div>

              <div className="form-group">
                <label>VRN</label>
                <select value={modalData.vrn} onChange={(e) => handleModalInputChange("vrn", e.target.value)}>
                  <option value="M">M</option>
                  <option value="VRN01">VRN01</option>
                  <option value="VRN02">VRN02</option>
                  <option value="VRN03">VRN03</option>
                </select>
              </div>

              <div className="form-group">
                <label>Shift</label>
                <select value={modalData.shift} onChange={(e) => handleModalInputChange("shift", e.target.value)}>
                  <option value="M">M</option>
                  <option value="E">E</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button className="cancel-trip-btn" onClick={handleCancelTrip}>
                Cancel Trip
              </button>
              <button className="save-changes-btn" onClick={handleModalSave}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DailyScheduling
