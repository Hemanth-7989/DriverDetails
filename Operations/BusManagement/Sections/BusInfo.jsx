import React, { useState } from "react";

function BusInfo({
  selectedVehicleId,
  formData,
  setFormData,
  saveVehicle,
  handleInputChange,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState({});

  const getChangedFields = () => {
    setIsEditing(false);
    const changed = {};

    for (const key in formData) {
      if (formData[key] !== originalData[key]) {
        changed[key] = formData[key];
      }
    }

    // Always include vrn as the first key, even if it hasn't changed
    const result = { vrn: formData.vrn, ...changed };

    // If vrn is already in changed, no issue; if not, it gets added at the start
    return saveVehicle(result);
  };
  return (
    <div className="form-section">
      {selectedVehicleId !== "new" && (
        <button
          className="btn btn-outline-primary edit-btn"
          onClick={() => {
            if (!isEditing) {
              setOriginalData({ ...formData }); // Store current formData on entering edit mode
            }
            setIsEditing(!isEditing);
          }}
        >
          <i className="bi bi-pencil-square me-1"></i> Edit
        </button>
      )}

      {/* Row 1 */}

      <div className="row">
        <div className="form-bus">
          <label className="bus-text">VRN</label>
          <input
            name="vrn"
            className="form-control"
            type="text"
            placeholder="MHxx xx XXXX"
            value={formData.vrn}
            onChange={handleInputChange}
            disabled={!isEditing && selectedVehicleId !== "new"}
          />
        </div>
        <div className="form-bus">
          <label className="bus-text">Variant</label>
          <input
            name="variant"
            type="text"
            className="form-control"
            placeholder="Bus/Puma/Truck"
            value={formData.variant}
            onChange={handleInputChange}
            disabled={!isEditing && selectedVehicleId !== "new"}
          />
        </div>
        <div className="form-bus">
          <label className="bus-text">Type</label>
          <input
            name="type"
            type="text"
            className="form-control"
            placeholder="Bus/Puma/Truck"
            value={formData.type}
            onChange={handleInputChange}
            disabled={!isEditing && selectedVehicleId !== "new"}
          />
        </div>
        <div className="form-bus">
          <label className="bus-text">Chassis Number</label>
          <input
            name="chassis_no"
            type="text"
            className="form-control"
            placeholder="MDxxxxxxxxxxxxxx"
            value={formData.chassis_no}
            onChange={handleInputChange}
            disabled={!isEditing && selectedVehicleId !== "new"}
          />
        </div>
        <div className="form-bus">
          <label className="bus-text">IMEI</label>
          <input
            name="imei_no"
            type="text"
            className="form-control"
            placeholder="IMEI number"
            value={formData.imei_no}
            onChange={handleInputChange}
            disabled={!isEditing && selectedVehicleId !== "new"}
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="row">
        <div className="form-bus">
          <label className="bus-text">City, State</label>
          <input
            name="address"
            type="text"
            className="form-control"
            placeholder="XX, YY"
            value={formData.address}
            onChange={handleInputChange}
            disabled={!isEditing && selectedVehicleId !== "new"}
          />
        </div>
        <div className="form-bus">
          <label className="bus-text">Date of Purchase</label>
          <input
            name="date_of_purchase"
            type="date"
            className="form-control"
            value={formData.date_of_purchase}
            onChange={handleInputChange}
            disabled={!isEditing && selectedVehicleId !== "new"}
          />
        </div>
        <div className="form-bus">
          <label className="bus-text">Registration Date</label>
          <input
            name="regristration_date"
            type="date"
            className="form-control"
            value={formData.regristration_date}
            onChange={handleInputChange}
            disabled={!isEditing && selectedVehicleId !== "new"}
          />
        </div>
        <div className="form-bus">
          <label className="bus-text">Fleet Owner</label>
          <input
            name="fleet_owner"
            type="text"
            className="form-control"
            placeholder="XXX"
            value={formData.fleet_owner}
            onChange={handleInputChange}
            disabled={!isEditing && selectedVehicleId !== "new"}
          />
        </div>
        <div className="form-bus">
          <label className="bus-text">Device ID</label>
          <input
            name="device_id"
            type="text"
            className="form-control"
            placeholder="Device ID"
            value={formData.device_id}
            onChange={handleInputChange}
            disabled={!isEditing && selectedVehicleId !== "new"}
          />
        </div>
      </div>

      {/* Grid 2x2 (6 fields) */}
      <div className="grid-2x2">
        <div className="form-bus">
          <label className="bus-text">Payment Model</label>
          <input
            name="payment_model"
            type="text"
            className="form-control"
            placeholder="Payment Mode"
            value={formData.payment_model}
            onChange={handleInputChange}
            disabled={!isEditing && selectedVehicleId !== "new"}
          />
        </div>
        <div className="form-bus">
          <label className="bus-text">Odometer</label>
          <input
            name="odometer"
            type="text"
            className="form-control"
            placeholder="kms with date"
            value={formData.odometer}
            onChange={handleInputChange}
            disabled={!isEditing && selectedVehicleId !== "new"}
          />
        </div>
        <div className="form-bus">
          <label className="bus-text">Battery Type</label>
          <input
            name="battery_type"
            type="text"
            className="form-control"
            placeholder="Lithium-ion / LFP…"
            value={formData.battery_type}
            onChange={handleInputChange}
            disabled={!isEditing && selectedVehicleId !== "new"}
          />
        </div>
        <div className="form-bus">
          <label className="bus-text">Battery Make</label>
          <input
            name="battery_make"
            type="text"
            className="form-control"
            placeholder="Brand / Model"
            value={formData.battery_make}
            onChange={handleInputChange}
            disabled={!isEditing && selectedVehicleId !== "new"}
          />
        </div>
        <div className="form-bus">
          <label className="bus-text">Refurbished</label>
          <input
            name="refurbished"
            type="text"
            className="form-control"
            placeholder="Yes/No (date if yes)"
            value={formData.refurbished}
            onChange={handleInputChange}
            disabled={!isEditing && selectedVehicleId !== "new"}
          />
        </div>
        <div className="form-bus">
          <label className="bus-text">Motor Number</label>
          <input
            name="motor_no"
            type="text"
            className="form-control"
            placeholder="Yes/No (date if yes)"
            value={formData.motor_no}
            onChange={handleInputChange}
            disabled={!isEditing && selectedVehicleId !== "new"}
          />
        </div>
      </div>

      {/* Actions */}
      <div
        className={` ${
          isEditing || selectedVehicleId === "new" ? "flex " : "d-none"
        } justify-end `}
      >
        <button
          className="cancel-btn"
          onClick={() => {
            setIsEditing(false);
            setFormData(formData);
          }}
        >
          Cancel
        </button>
        <button
          className="save-btn"
          onClick={() => {
            getChangedFields();
          }}
        >
          Save changes
        </button>
      </div>
    </div>
  );
}

export default BusInfo;
