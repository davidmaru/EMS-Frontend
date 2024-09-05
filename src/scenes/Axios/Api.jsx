import axiosInstance from "./Axios";

// Function to fetch organizers' data
export const fetchOrganizers = async () => {
  try {
    const response = await axiosInstance.get('/organizers'); // Adjust the endpoint as needed
    return response.data;
  } catch (error) {
    console.error("Error fetching organizers:", error);
    throw error; // Propagate error for further handling
  }
};
