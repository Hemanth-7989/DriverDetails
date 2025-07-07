import React from "react";
import img from "../../../Assets/Bus_9M.png";
function BusSections({
  vehicles,
  selectedVehicleId,
  loading,
  handleAddVehicleClick,
  search,
  setSearch,
  filteredVehicles,
  handleSelectVehicle,
  
}) {
  return (
    <div className="flex flex-col justify-between h-full w-full md:w-full lg:w-1/3 rounded-2xl border-1 border-[#e0e0e0] bg-white shadow-md shadow-gray-500">
      <div className="flex flex-col h-[95%] overflow-y-auto">
        <div className="w-full relative">
          <i className="bi bi-search absolute top-2.5 left-2"></i>
          <input
            type="text"
            placeholder="Search"
            className="search-box"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading && vehicles.length === 0 && (
          <p className="text-center py-4">Loading…</p>
        )}

        {filteredVehicles.map((vehicle) => (
          <div
            key={vehicle.vehicle_id}
            className={`flex items-center gap-2.5 p-2 border rounded-md h-36 cursor-pointer  ${
              selectedVehicleId === vehicle.vehicle_id
                ? "[background:linear-gradient(90deg,_#d8fbae_0.04%,_#f7fff1_99.97%)] border-[#a4cb75]"
                : ""
            }`}
            onClick={() => handleSelectVehicle(vehicle)}
          >
            <img src={img} alt="Bus" className="w-[83px] h-[47px]" />
            <div className="w-[60%] flex flex-col">
              <div className="text-[#0b5297] text-xl font-normal">
                {vehicle.vrn || vehicle.vehicle_id}
              </div>
              <div className="text-[15px] text-[#666]">{vehicle.type}</div>
              <div className="text-[15px] text-[#666]">{vehicle.address}</div>
            </div>
            <div className="flex flex-col justify-between items-end h-full">
              <div
                className={`text-md w-fit px-4 py-1 rounded-2xl inline-block mt-1 bg-[#d4edda] text-green-800 border-1 border-[#14970B]`}
              >
                Active
              </div>
              <i className="bi bi-chevron-right text-lg text-[#007bff]"></i>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleAddVehicleClick}
        style={{ borderEndEndRadius: "15px", borderEndStartRadius: "15px" }}
        className="w-full h-[44px] border-[0.3px] border-[#0b5297] bg-[#e6eef6] text-[#0b5297] text-2xl"
      >
        Add Vehicle
      </button>
    </div>
  );
}

export default BusSections;


