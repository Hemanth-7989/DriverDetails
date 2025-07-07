import { useState, useEffect } from "react";
import placeholderImg from "../../../../../Assets/LOGO'S/diriver_palce.png";
import MedicalUpload from "./MedicalUpload";
// import { createDriver, updateDriver } from "../../api";

function PersonalInformation({ driver, isNew }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDriver, setEditedDriver] = useState(driver);

  useEffect(() => {
    if (isNew) {
      setIsEditing(true); // editable on load
    }
  }, [isNew]);

  useEffect(() => {
    setEditedDriver(driver);
  }, [driver]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDriver((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSave = () => {
    setIsEditing(false);
  };

  //   const handleSave = async () => {
  //   try {
  //     if (isNew) {
  //       await createDriver(driver);
  //       toast.success("Driver added successfully!");
  //     } else {
  //       await updateDriver(driver.id, driver);
  //       toast.success("Driver updated successfully!");
  //     }
  //     setIsEditing(false);
  //     refreshDrivers(); // re-fetch from parent to get updated list
  //   } catch (err) {
  //     toast.error("Failed to save driver data");
  //     console.error(err);
  //   }
  // };

  return (
    <>
      {!isNew && (
        <div className="flex justify-end mb-2">
          <button
            className="mr-0 border rounded-2xl bg-blue-300 p-2"
            onClick={() => setIsEditing(true)}
          >
            <i className="bi bi-pencil-square me-1"></i>Edit
          </button>
        </div>
      )}

      <div className="flex sm:flex  h-[85%] overflow-auto">
        <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-gray-400 p-3 flex flex-col items-center">
          <p className="self-start text-ekablue text-4xl lg:text-4xl">
            {driver.name}
          </p>
          <img
            src={placeholderImg}
            alt="driver image"
            className="object-contain border border-gray-100 rounded-full p-5 mb-4 mt-4 w-40 h-40"
          />
          <p className="text-ekablue text-xl lg:text-2xl font-semibold">
            Employee No.
          </p>
          <p className="text-black">{driver.employeeNumber}</p>
          <p className="text-ekablue text-xl lg:text-2xl font-medium">Fleet</p>
          <p className="text-black">{driver.fleet}</p>
          <p className="text-ekablue text-xl lg:text-2xl font-medium">Shift</p>
          <p className="text-black">{driver.shift}</p>
        </div>
        <div className="w-full lg:w-10/12 h-full flex flex-col gap-y-6 px-2 py-2 overflow-auto">
          {/* Username and Surname Row */}
          <div className="flex flex-col md:flex-row gap-x-6 gap-y-4 mx-2">
            <div className="w-full md:w-1/2 relative">
              <p className="text-gray-500 font-medium text-sm mb-1">Username</p>
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                >
                  <path
                    d="M14.39 10.56C12.71 9.7 10.53 9 8 9C5.47 9 3.29 9.7 1.61 10.56C0.61 11.07 0 12.1 0 13.22V16H16V13.22C16 12.1 15.39 11.07 14.39 10.56ZM14 14H2V13.22C2 12.84 2.2 12.5 2.52 12.34C3.71 11.73 5.63 11 8 11C10.37 11 12.29 11.73 13.48 12.34C13.8 12.5 14 12.84 14 13.22V14Z"
                    fill="#64748B"
                  />
                  <path
                    d="M5.77993 8H10.2199C11.4299 8 12.3599 6.94 12.1999 5.74L11.8799 3.29C11.5699 1.39 9.91993 0 7.99993 0C6.07993 0 4.42993 1.39 4.11993 3.29L3.79993 5.74C3.63993 6.94 4.56993 8 5.77993 8ZM6.09993 3.59C6.25993 2.67 7.05993 2 7.99993 2C8.93993 2 9.73993 2.67 9.89993 3.59L10.2199 6H5.77993L6.09993 3.59Z"
                    fill="#64748B"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="border border-gray-300 rounded px-8 py-2 w-full focus:outline-none focus:ring-2 focus:ring-ekablue text-sm text-gray-500"
                  disabled={!isEditing}
                  name="name"
                  value={editedDriver.name}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 relative">
              <p className="text-gray-500 font-medium text-sm mb-1">Surname</p>
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                >
                  <path
                    d="M14.39 10.56C12.71 9.7 10.53 9 8 9C5.47 9 3.29 9.7 1.61 10.56C0.61 11.07 0 12.1 0 13.22V16H16V13.22C16 12.1 15.39 11.07 14.39 10.56ZM14 14H2V13.22C2 12.84 2.2 12.5 2.52 12.34C3.71 11.73 5.63 11 8 11C10.37 11 12.29 11.73 13.48 12.34C13.8 12.5 14 12.84 14 13.22V14Z"
                    fill="#64748B"
                  />
                  <path
                    d="M5.77993 8H10.2199C11.4299 8 12.3599 6.94 12.1999 5.74L11.8799 3.29C11.5699 1.39 9.91993 0 7.99993 0C6.07993 0 4.42993 1.39 4.11993 3.29L3.79993 5.74C3.63993 6.94 4.56993 8 5.77993 8ZM6.09993 3.59C6.25993 2.67 7.05993 2 7.99993 2C8.93993 2 9.73993 2.67 9.89993 3.59L10.2199 6H5.77993L6.09993 3.59Z"
                    fill="#64748B"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Enter Your Surname"
                  className="border border-gray-300 rounded px-8 py-2 w-full focus:outline-none focus:ring-2 focus:ring-ekablue text-sm text-gray-500"
                  disabled={!isEditing}
                  value={editedDriver.surname}
                  name="surname"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Email Row (Full Width) */}
          <div className="mx-2">
            <p className="text-gray-500 font-medium text-sm mb-1">Email</p>
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M19.2725 4C20.7787 4 22 5.26637 22 6.82812V17.1963C22 18.758 20.7787 20.0244 19.2725 20.0244H4.72754C3.22134 20.0244 2 18.758 2 17.1963V6.82812C2 5.26639 3.22134 4.00002 4.72754 4H19.2725ZM13.5645 13.8574C12.6254 14.539 11.3746 14.539 10.4355 13.8574L3.81836 9.05371V17.1963C3.81836 17.7169 4.22549 18.1386 4.72754 18.1387H19.2725C19.7745 18.1387 20.1816 17.7169 20.1816 17.1963V9.05371L13.5645 13.8574ZM4.72754 5.88574C4.24926 5.88577 3.85735 6.26857 3.82129 6.75488L11.4785 12.3135C11.7915 12.5406 12.2085 12.5406 12.5215 12.3135L20.1777 6.75488C20.1416 6.26859 19.7507 5.88574 19.2725 5.88574H4.72754Z"
                    fill="#7C7C8D"
                  />
                </svg>
              </span>
              <input
                type="email"
                placeholder="Email"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-500"
                disabled={!isEditing}
                value={editedDriver.mail}
                name="mail"
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Date of Birth and Nationality Row */}
          <div className="flex flex-col md:flex-row gap-x-6 gap-y-4 mx-2">
            <div className="w-full md:w-1/2 relative">
              <p className="text-gray-500 font-medium text-sm mb-1">
                Date of Birth
              </p>
              <input
                type="date"
                className="border border-gray-300 rounded px-2 py-2 w-full focus:outline-none focus:ring-2 focus:ring-ekablue text-sm text-gray-500"
                disabled={!isEditing}
                value={editedDriver.dateOfBirth}
                name="dateOfBirth"
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-gray-500 font-medium text-sm mb-1">
                Nationality
              </p>
              <select
                className="border border-gray-300 rounded px-2 py-2 w-full focus:outline-none focus:ring-2 focus:ring-ekablue text-sm text-gray-500"
                value={editedDriver.nationality}
                name="nationality"
                onChange={handleInputChange}
                disabled={!isEditing}
              >
                <option value="">Select Nationality</option>
                <option value="Indian">Indian</option>
              </select>
            </div>
          </div>

          {/* Date of Joining and Blood Group Row */}
          <div className="flex flex-col md:flex-row gap-x-6 gap-y-4 mx-2">
            <div className="w-full md:w-1/2">
              <p className="text-gray-500 font-medium text-sm mb-1">
                Date of Joining
              </p>
              <input
                type="date"
                className="border border-gray-300 rounded px-2 py-2 w-full focus:outline-none focus:ring-2 focus:ring-ekablue text-sm text-gray-500"
                disabled={!isEditing}
                onChange={handleInputChange}
                name="dateOfBirth"
                value={editedDriver.dateOfJoining}
              />
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-gray-500 font-medium text-sm mb-1">
                Blood Group
              </p>
              <select
                className="border border-gray-300 rounded px-2 py-2 w-full focus:outline-none focus:ring-2 focus:ring-ekablue text-sm text-gray-500"
                value={editedDriver.bloodGroup}
                name="bloodGroup"
                onChange={handleInputChange}
                disabled={!isEditing}
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>

          {/* Emergency Contact and Language Row */}
          <div className="flex flex-col md:flex-row gap-x-6 gap-y-4 mx-2">
            <div className="w-full md:w-1/2">
              <p className="text-gray-500 font-medium text-sm mb-1">
                Emergency Contact No.
              </p>
              <input
                type="number"
                className="border border-gray-300 rounded px-2 py-2 w-full focus:outline-none focus:ring-2 focus:ring-ekablue text-sm text-gray-500"
                disabled={!isEditing}
                name="emergencyContact"
                onChange={handleInputChange}
                value={editedDriver.emergencyContact}
              />
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-gray-500 font-medium text-sm mb-1">Language</p>
              <select
                className="border border-gray-300 rounded px-2 py-2 w-full focus:outline-none focus:ring-2 focus:ring-ekablue text-sm text-gray-500"
                value={editedDriver.language}
                name="language"
                onChange={handleInputChange}
                disabled={!isEditing}
              >
                <option value="">Select Language</option>
                <option value="Hindi">Hindi</option>
                <option value="Bengali">Bengali</option>
                <option value="Telugu">Telugu</option>
                <option value="Marathi">Marathi</option>
                <option value="Tamil">Tamil</option>
                <option value="Urdu">Urdu</option>
                <option value="Gujarati">Gujarati</option>
                <option value="Kannada">Kannada</option>
                <option value="Odia">Odia</option>
                <option value="Malayalam">Malayalam</option>
                <option value="Punjabi">Punjabi</option>
                <option value="Assamese">Assamese</option>
                <option value="Maithili">Maithili</option>
                <option value="Santali">Santali</option>
                <option value="Kashmiri">Kashmiri</option>
                <option value="Nepali">Nepali</option>
                <option value="Konkani">Konkani</option>
                <option value="Sindhi">Sindhi</option>
                <option value="Dogri">Dogri</option>
                <option value="Manipuri">Manipuri</option>
              </select>
            </div>
          </div>

          {/* Experience Row */}
          <div className="flex mx-2">
            <div className="w-full md:w-1/2">
              <p className="text-gray-500 font-medium text-sm mb-1">
                Experience (Years)
              </p>
              <input
                type="number"
                className="border border-gray-300 rounded px-2 py-2 w-full focus:outline-none focus:ring-2 focus:ring-ekablue text-sm text-gray-500"
                disabled={!isEditing}
                name="experience"
                onChange={handleInputChange}
                value={editedDriver.experience}
              />
            </div>
          </div>
          <div className="flex mx-2 gap-x-6">
            <MedicalUpload />
          </div>
          <div
            className={`flex justify-end gap-3 ${
              isEditing ? "block" : "hidden"
            }`}
          >
            <button className="cancel-btn" onClick={() => setIsEditing(false)}>
              Close
            </button>
            <button className="save-btn" onClick={() => handleSave()}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PersonalInformation;
