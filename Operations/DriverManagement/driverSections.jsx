import React, { useState } from "react";

import PersonalInformation from "./Sections/Personal Info/personalInformation";
import Documents from "./Sections/Documents/documents";
import BankDetails from "./Sections/Bank Details/bankDetails";
import DriverStats from "./Sections/Driver Stats/driverStats";

function DriverSections({ selectedDriver, refreshDrivers }) {
  const [selectedSection, setSelectedSection] = useState(
    "Personal Information"
  );

  const isNew = selectedDriver?.isNew || false;

  const handleButtonClick = (section) => {
    setSelectedSection(section);
  };

  const renderSection = () => {
    switch (selectedSection) {
      case "Personal Information":
        return (
          <PersonalInformation
            driver={selectedDriver}
            isNew={isNew}
            refreshDrivers={refreshDrivers}
          />
        );
      case "Documents":
        return <Documents driver={selectedDriver} />;
      case "Bank Details":
        return <BankDetails driver={selectedDriver} />;
      case "Driver Stats":
        return <DriverStats driver={selectedDriver} />;
      default:
        return <p>Select the Driver.</p>;
    }
  };

  return (
    <>
      <div className="w-full lg:w-2/3 h-full lg:h-full rounded-2xl border-1 border-[#e0e0e0] bg-white shadow-md shadow-gray-600 py-2">
        <div className="driver-sections h-14 flex items-center gap-8 lg:px-2.5 py-0 ">
          <button
            className={`sections-selector ${
              selectedSection === "Personal Information" ? "selected" : ""
            }`}
            onClick={() => handleButtonClick("Personal Information")}
          >
            Personal Information
          </button>
          <button
            className={`sections-selector ${
              selectedSection === "Documents" ? "selected" : ""
            }`}
            onClick={() => handleButtonClick("Documents")}
          >
            Documents
          </button>
          <button
            className={`sections-selector ${
              selectedSection === "Bank Details" ? "selected" : ""
            }`}
            onClick={() => handleButtonClick("Bank Details")}
          >
            Bank Details
          </button>
          <button
            className={`sections-selector ${
              selectedSection === "Driver Stats" ? "selected" : ""
            }`}
            onClick={() => handleButtonClick("Driver Stats")}
          >
            Driver Stats
          </button>
        </div>
        <hr className="m-1" />
        {renderSection()}
      </div>
    </>
  );
}

export default DriverSections;
