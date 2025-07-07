import axios from "axios";

const API_BASE_URL = "https://your-api-url.com/api/drivers";

export const getDrivers = async () => {
  return await axios.get(API_BASE_URL);
};

export const createDriver = async (driverData) => {
  return await axios.post(API_BASE_URL, driverData);
};

export const updateDriver = async (driverId, driverData) => {
  return await axios.put(`${API_BASE_URL}/${driverId}`, driverData);
};
