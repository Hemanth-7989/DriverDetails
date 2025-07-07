import React, { useEffect, useState } from "react";
// import { getDrivers } from "./api";
import "./driverManagement.css";
import DriverDetails from "./driverDetails";
import DriverSections from "./driverSections";

const driverData = [
  {
    name: "D1",
    surname: "Driver",
    score: 2.5,
    fleet: "MBMT",
    contact: "1234567890",
    address: "Mira Bhayandar,Maharashtra, India",
    status: "Driving",
    employeeNumber: "123456",
    shift: "Day",
    mail: "driver1@gmail.com",
    dateOfBirth: "1990-01-01",
    nationality: "Indian",
    bloodGroup: "O+",
    emergencyContact: "9876543210",
    language: "Hindi",
    dateOfJoining: "2020-01-01",
    experience: "5",
    medicalProblems: "None",
    bankAccountHolderName: "Driver D1",
    bankName: "abc",
    accNumber: "0123456789",
    ifscCode: "SBIN000XXXX",
    accountType: "savings",
  },
  {
    name: "D2",
    surname: "Driver2",
    score: 5,
    fleet: "UBER",
    contact: "1234567890",
    address: "Delhi, India",
    status: "Stopped",
    employeeNumber: "1234567",
    shift: "Day",
    mail: "driver2@gmail.com",
    dateOfBirth: "1990-01-01",
    nationality: "Indian",
    bloodGroup: "O+",
    emergencyContact: "9876543210",
    language: "Hindi",
    dateOfJoining: "2020-01-01",
    experience: "5",
    medicalProblems: "None",
    bankAccountHolderName: "Driver D2",
    bankName: "abcd",
    accNumber: "0133456789",
    ifscCode: "SBIN000XXXX",
    accountType: "savings",
  },
  {
    name: "D3",
    surname: "Driver3",
    score: 4.5,
    fleet: "Staff",
    contact: "1234567890",
    address: "Chakan, Pune, India",
    status: "On Leave",
    employeeNumber: "1234568",
    shift: "Day",
    mail: "driver3@gmail.com",
    dateOfBirth: "1990-01-01",
    nationality: "Indian",
    bloodGroup: "O+",
    emergencyContact: "9876543210",
    language: "Hindi",
    dateOfJoining: "2020-01-01",
    experience: "5",
    medicalProblems: "None",
    bankAccountHolderName: "Driver D3",
    bankName: "abce",
    accNumber: "0113456789",
    ifscCode: "SBIN000XXXX",
    accountType: "savings",
  },
  {
    name: "D4",
    surname: "Driver3",
    score: 4.5,
    fleet: "Staff",
    contact: "1234567890",
    address: "Chakan, Pune, India",
    status: "On Leave",
    employeeNumber: "1234568",
    shift: "Day",
    mail: "driver3@gmail.com",
    dateOfBirth: "1990-01-01",
    nationality: "Indian",
    bloodGroup: "O+",
    emergencyContact: "9876543210",
    language: "Hindi",
    dateOfJoining: "2020-01-01",
    experience: "5",
    medicalProblems: "None",
    bankAccountHolderName: "Driver D4",
    bankName: "abcr",
    accNumber: "0143456789",
    ifscCode: "SBIN000XXXX",
    accountType: "savings",
  },
];

function DriverManagement() {
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    setDrivers(driverData);
  };

  return (
    <div className="flex flex-col items-center gap-1.5 w-full h-full">
      <p className="w-full h-1/12 shrink-0 rounded-l-xs border-l-4 border-ekablue bg-white shadow-xs shadow-black-100 p-1 m-0 font-semibold text-ekablue text-[30px]">
        Driver Management
      </p>
      <div className="h-[90%] w-full flex flex-col lg:flex-row sm:flex-col justify-baseline gap-4">
        <DriverDetails
          drivers={drivers}
          setSelectedDriver={(driver, isNew = false) => {
            setSelectedDriver({ ...driver, isNew });
          }}
        />
        {selectedDriver && (
          <DriverSections
            selectedDriver={selectedDriver}
            refreshDrivers={fetchDrivers}
          />
        )}
      </div>
    </div>
  );
}

export default DriverManagement;
