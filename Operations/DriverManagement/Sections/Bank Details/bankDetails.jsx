import React, { useState } from "react";

function BankDetails({ driver }) {
  const [isEditing, setIsEditing] = useState(false);
  const [accNumber, setAccNumber] = useState(driver.accNumber || "");
  const [reAccNumber, setReAccNumber] = useState("");

  const accNumbersMatch = accNumber === reAccNumber || !isEditing;

  return (
    <>
      <div className="flex w-full p-2 justify-between">
        <p className="text-3xl font-medium text-ekablue">{driver.name}</p>
        <button
          className="font-medium text-ekablue flex gap-2"
          onClick={() => {
            setIsEditing(!isEditing);
            setAccNumber(driver.accNumber || "");
            setReAccNumber("");
          }}
        >
          Edit <i class="bi bi-pencil-fill font-medium"></i>
        </button>
      </div>
      {isEditing && (
        <p className="text-center text-red-600">Please Update the Details</p>
      )}
      <form className="flex flex-col gap-2.5 w-[90%] h-auto bg-[#f2faed] p-3 mx-auto shadow-md shadow-gray-400">
        <div className="flex justify-between items-center m-0 px-3 ">
          <label
            htmlFor="holdersName"
            className="text-ekablue text-xl font-normal"
          >
            Bank Account Holder's Name
          </label>
          <input
            type="text"
            id="holdersName"
            className="w-3/6 h-9 rounded-[5px] border border-[#a4a4a4] bg-white shadow-md shadow-gray-400 p-2"
            value={isEditing ? null : driver.bankAccountHolderName}
            disabled={isEditing ? false : true}
          />
        </div>
        <div className="flex justify-between items-center m-0 px-3 ">
          <label
            htmlFor="bankName"
            className="text-ekablue text-xl font-normal"
          >
            Bank Name
          </label>
          <input
            type="text"
            id="bankName"
            className="w-3/6 h-9 rounded-[5px] border border-[#a4a4a4] bg-white shadow-md shadow-gray-400 p-2"
            value={isEditing ? null : driver.bankName}
            disabled={isEditing ? false : true}
          />
        </div>
        <div className="flex justify-between items-center m-0 px-3 ">
          <label
            htmlFor="accNumber"
            className="text-ekablue text-xl font-normal"
          >
            Account Number
          </label>
          <input
            type="text"
            id="accNumber"
            className="w-3/6 h-9 rounded-[5px] border border-[#a4a4a4] bg-white shadow-md shadow-gray-400 p-2"
            value={isEditing ? accNumber : driver.accNumber}
            disabled={isEditing ? false : true}
          />
        </div>
        <div className="flex justify-between items-center m-0 px-3 ">
          <label
            htmlFor="accNumber"
            className="text-ekablue text-xl font-normal"
          >
            Account Number
          </label>
          <input
            type="text"
            id="accNumber"
            className="w-3/6 h-9 rounded-[5px] border border-[#a4a4a4] bg-white shadow-md shadow-gray-400 p-2"
            value={isEditing ? null : driver.accNumber}
            disabled={isEditing ? false : true}
          />
        </div>
        {isEditing && (
          <div className="flex justify-between items-center m-0 px-3 ">
            <label
              htmlFor="reAccNumber"
              className="text-ekablue text-xl font-normal"
            >
              Re-enter Account Number
            </label>
            <input
              type="text"
              id="reAccNumber"
              className="w-3/6 h-9 rounded-[5px] border border-[#a4a4a4] bg-white shadow-md shadow-gray-400 p-2"
              value={reAccNumber}
              onChange={(e) => setReAccNumber(e.target.value)}
            />
          </div>
        )}
        {isEditing && reAccNumber && !accNumbersMatch && (
          <p className="text-red-600 text-center text-xs">
            Account numbers do not match!
          </p>
        )}
        <div className="flex justify-between items-center m-0 px-3 ">
          <label
            htmlFor="ifscCode"
            className="text-ekablue text-xl font-normal"
          >
            IFSC Code
          </label>
          <input
            type="text"
            id="ifscCode"
            className="w-3/6 h-9 rounded-[5px] border border-[#a4a4a4] bg-white shadow-md shadow-gray-400 p-2"
            value={isEditing ? null : driver.ifscCode}
            disabled={isEditing ? false : true}
          />
        </div>
        <div className="flex justify-between items-center m-0 px-3 ">
          <label htmlFor="accType" className="text-ekablue text-xl font-normal">
            Account Type
          </label>
          <select
            name="accType"
            id="accType"
            className="w-3/6 h-9 rounded-[5px] border border-[#a4a4a4] bg-white shadow-md shadow-gray-400 p-1"
            value={isEditing ? null : driver.accountType}
            disabled={isEditing ? false : true}
          >
            <option value="savings">Savings Account</option>
            <option value="checking">Checking Account</option>
            <option value="current">Current Account</option>
            <option value="fixed">Fixed Deposit Account</option>
            <option value="recurring">Recurring Deposit Account</option>
            <option value="nri">NRI Account</option>
            <option value="salary">Salary Account</option>
            <option value="student">Student Account</option>
            <option value="joint">Joint Account</option>
            <option value="business">Business Account</option>
          </select>
        </div>
        <div className="flex justify-end-safe gap-20">
          <button
            type="button"
            className="w-40 border border-transparent bg-[#73be44] text-white text-[18px] text-center"
            style={{
              borderRadius: "20px",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            Add Account
          </button>
          <button
            type="button"
            className="w-40 bg-white text-[#73be44] text-[18px] text-center"
            style={{
              borderRadius: "20px",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            }}
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}

export default BankDetails;
