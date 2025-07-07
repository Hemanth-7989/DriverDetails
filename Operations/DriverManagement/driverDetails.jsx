import React, { useState } from "react";
import Select from "react-select";
import "bootstrap-icons/font/bootstrap-icons.css";

function DriverDetails({ setSelectedDriver, drivers }) {
  const [search, setSearch] = useState("");

  // Create stars based on rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const totalStars = 5;

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <i
            key={`full-${i}`}
            className="bi bi-star-fill"
            style={{ color: "#ffc107" }}
          ></i>
        ))}
        {hasHalfStar && (
          <i className="bi bi-star-half" style={{ color: "#ffc107" }}></i>
        )}
        {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map(
          (_, i) => (
            <i
              key={`empty-${i}`}
              className="bi bi-star"
              style={{ color: "#ffc107" }}
            ></i>
          )
        )}
      </>
    );
  };
  const filteredDrivers = drivers.filter((d) =>
    d.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col justify-between h-full w-full md:w-full lg:w-1/3 rounded-2xl border-1 border-[#e0e0e0] bg-white shadow-md shadow-gray-500">
        <div className="w-full relative">
          <i className="bi bi-search absolute top-2.5 left-2"></i>
          <input
            type="text"
            placeholder="Search drivers..."
            className="search-box"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-col overflow-auto h-[85%]">
          {filteredDrivers.map((driver, index) => {
            return (
              <>
                <div
                  key={index}
                  className="flex flex-wrap justify-around items-stretch w-full px-0 py-2.5 h-auto"
                >
                  <div className="w-[25%] flex flex-col justify-center items-center">
                    <img
                      className="w-[33px] h-[33px]"
                      src={driver.img}
                      alt="driver"
                    />
                    <div className="w-full flex flex-wrap justify-center gap-1">
                      {renderStars(driver.score)}
                    </div>
                    <div className="text-center text-gray-700 sm:text-sm lg:text-[10px] xl:text-[15px] ">
                      {driver.score}
                    </div>
                  </div>
                  <div className="w-[50%]">
                    <p className="text-[18px] text-ekablue">{driver.name}</p>
                    <ul className="flex flex-col list-none p-0 m-0">
                      <li className="flex flex-wrap text-[#505f7c] gap-2 px-1 py-0 text-[14px] font-normal">
                        <i className="bi bi-bus-front"></i> {driver.fleet}
                      </li>
                      <li className="flex flex-wrap text-[#505f7c] gap-2 px-1 py-0 text-[14px] font-normal">
                        <i className="bi bi-telephone-fill"></i>{" "}
                        {driver.contact}
                      </li>
                      <li className="flex flex-wrap text-[#505f7c] gap-2 px-1 py-0 text-[14px] font-normal">
                        <i className="bi bi-geo-alt-fill"></i> {driver.address}
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col w-[20%] justify-between p-0 m-0 ">
                    <p
                      className="flex justify-center rounded-[20px] border-1 h-auto m-0 "
                      style={{
                        color:
                          driver.status === "Driving"
                            ? "#14970B"
                            : driver.status === "Stopped"
                            ? "#970B0B"
                            : "#666666",
                        backgroundColor:
                          driver.status === "Driving"
                            ? "#EFF8E4"
                            : driver.status === "Stopped"
                            ? "#F8E4E4"
                            : "#F4F4F4",
                        border:
                          driver.status === "Driving"
                            ? "1.5px solid #14970B"
                            : driver.status === "Stopped"
                            ? "1.5px solid #970B0B"
                            : "1.5px solid #666666",
                      }}
                    >
                      {driver.status}
                    </p>

                    <i
                      className="bi bi-arrow-right-circle-fill text-ekablue text-xl self-end px-2  "
                      type="button"
                      onClick={() => setSelectedDriver(driver)}
                    ></i>
                  </div>
                </div>
                <hr />
              </>
            );
          })}
        </div>
        <button
          className="bg-[#E6EEF6] border-[1px] border-[#508ac4] text-[#0B5297] place-self-end-safe m-0 p-1 w-full"
          style={{ borderEndEndRadius: "15px", borderEndStartRadius: "15px" }}
          onClick={() => setSelectedDriver({}, true)}
        >
          Add Driver
        </button>
      </div>
    </>
  );
}

export default DriverDetails;
