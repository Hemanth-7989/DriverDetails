import routesTravelled from "../../../../../Assets/Operations/routeTravelled.png";
import totalTravel from "../../../../../Assets/Operations/totalDistance.png";
import longestTrip from "../../../../../Assets/Operations/longestTrip.png";
import performance from "../../../../../Assets/Operations/performance.png";

function DriverStats({ driver }) {
  return (
    <>
      <p className="text-2xl font-medium text-ekablue mx-3">{driver.name}</p>
      <div className="flex flex-wrap w-full px-10 gap-x-20 gap-y-10 items-cente justify-center h-[100%] overflow-auto">
        <div className="w-[250px] h-64 bg-white shadow-md shadow-gray-400 flex flex-col items-center justify-evenly">
          <p className="text-xl">Routes Travelled</p>
          <img
            src={routesTravelled}
            alt="Routes Travelled"
            className="w-14 h-14"
          />
          <p className="font-bold p-0 m-0">X</p>
          <ul className="m-0 p-0 list-decimal font-[15px]">
            <li>Route A</li>
            <li>Route B</li>
            <li>Route C</li>
          </ul>
        </div>
        <div className="w-[250px] h-64 bg-white shadow-md shadow-gray-400 flex flex-col items-center justify-evenly">
          <p className="text-xl">Total Travel</p>
          <img src={totalTravel} alt="Total Travel" className="w-14 h-14" />
          <p className="font-bold p-0 m-0">X kms</p>
          <ul className="m-0 p-0 list-decimal font-[15px]">
            <li>Route A x kms</li>
            <li>Route B x kms</li>
            <li>Route C x kms</li>
          </ul>
        </div>
        <div className="w-[250px] h-64 bg-white shadow-md shadow-gray-400 flex flex-col items-center justify-evenly">
          <p className="text-xl">Longest Trip</p>
          <img src={longestTrip} alt="Longest Trip" className="w-14 h-14" />
          <p className="font-bold p-0 m-0">XXXXX kms</p>
          <ul className="my-0 p-0 list-none self-baseline mx-10 font-[15px]">
            <li>Route: </li>
            <li>Date:</li>
            <li>Shift:</li>
          </ul>
        </div>
        <div className="w-[250px] h-64 bg-white shadow-md shadow-gray-400 flex flex-col items-center justify-evenly ">
          <p className="text-xl">Performance</p>
          <img src={performance} alt="Performance" className="w-14 h-14" />
          <p className="font-bold p-0 m-0">x/5</p>
          <ul className="my-0 p-0 list-none self-baseline mx-10 font-[15px]">
            <li>Complaints: </li>
            <li>Harsh driving:</li>
            <li>Accidents:</li>
            <li>Attendance:</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default DriverStats;
