import { useState, useEffect } from "react";
import axios from "axios";
import "./Bus.css";
import Document from "./Sections/Document.jsx";
import Actionalbe from "./Sections/Actionable.jsx";
import BusInfo from "./Sections/BusInfo.jsx";
import BusSections from "./BusSections.jsx";
import { ToastContainer, toast } from "react-toastify";

const API_BASE = "http://192.168.25.9:8000/operations";

// const backendUrl = import.meta.env.VITE_BACKEND_URL;

const initialFormData = {
  vrn: "",
  variant: "",
  type: "",
  // model: "",
  
  chassis_no: "",
  imei_no: "",
  address: "",
  date_of_purchase: "",
  regristration_date: "",
  fleet_owner: "",
  device_id: "",
  payment_model: "",
  odometer: "",
  battery_type: "",
  battery_make: "",
  refurbished: "",
  motor_no: "",
  status: "",   
};
const Bus = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [activeTab, setActiveTab] = useState("Bus Information");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_BASE}/vehicles/`);
      setFormData(
        data.find((v) => v.vrn === selectedVehicleId) || initialFormData
      );

      setVehicles(data);
    } catch (err) {
      console.error("Error fetching vehicles", err);
    } finally {
      setLoading(false);
    }
  };

  const saveVehicle = async (data) => {
    try {
      setLoading(true);
      if (selectedVehicleId === "new") {
        await axios.post(`${API_BASE}/vehicles/`, formData);
        toast.success("Vehicle created successfully!");
      } else {
        await axios.put(`${API_BASE}/vehicles/`, data);
        toast.success("Vehicle updated successfully!");
      }
      await fetchVehicles(); // Refresh sidebar list
    } catch (err) {
      toast.error(err.response.data.error || "Failed to save vehicle.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!selectedVehicleId) return;
    if (selectedVehicleId === "new") {
      setFormData(initialFormData);
    } else {
      null;
    }
  }, [selectedVehicleId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicleId(vehicle.vehicle_id);
    setActiveTab("Bus Information");
    displayData(vehicle);
  };

  const handleAddVehicleClick = () => {
    setSelectedVehicleId("new");
    setActiveTab("Bus Information");
  };
  const displayData = (data) => {
    setFormData(data);
  };

  const filteredVehicles = vehicles.filter((v) =>
    v.vrn?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col items-center gap-1.5 w-full h-full">
        <p className="w-full h-1/12 shrink-0 rounded-l-xs border-l-4 border-ekablue bg-white shadow-xs shadow-black-100 p-1 m-0 font-semibold text-ekablue text-[30px]">
          Bus Management
        </p>

        <div className="h-11/12 w-full flex flex-col lg:flex-row sm:flex-col justify-baseline gap-4">
          <BusSections
            vehicles={vehicles}
            selectedVehicleId={selectedVehicleId}
            loading={loading}
            handleAddVehicleClick={handleAddVehicleClick}
            search={search}
            setSearch={setSearch}
            filteredVehicles={filteredVehicles}
            handleSelectVehicle={handleSelectVehicle}
          />

          <div className="w-full lg:w-2/3 h-full lg:h-full rounded-2xl border-1 border-[#e0e0e0] bg-white shadow-md shadow-gray-600">
            {/* Tabs */}
            <div className="tabs">
              {["Bus Information", "Documents", "Actionable"].map((tab) => (
                <button
                  key={tab}
                  className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "Bus Information" && (
              <BusInfo
                selectedVehicleId={selectedVehicleId}
                formData={formData}
                setFormData={setFormData}
                saveVehicle={saveVehicle}
                handleInputChange={handleInputChange}
              />
            )}

            {activeTab === "Documents" && (
              <Document vehicleId={selectedVehicleId} />
            )}
            {activeTab === "Actionable" && (
              <Actionalbe vehicleId={selectedVehicleId} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Bus;
