import axios from "axios"

const API_URL = "http://localhost:8080/api" // Update this to match your Spring Boot API URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add this interceptor to include the token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Authorization header set:", token); // Debug log
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const castVote = async (userId: number, candidateId: number) => {
  const token = localStorage.getItem("token");

  console.log(`Attempting to cast vote for userId=${userId}, candidateId=${candidateId}`);

  const response = await fetch(
    `http://localhost:8080/api/voters/vote?voterId=${userId}&candidateId=${candidateId}`, 
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  console.log("Response status:", response.status);
  const responseText = await response.text();
  console.log("Response body:", responseText);

  if (!response.ok) {
    throw new Error("Failed to cast vote");
  }
};










export async function login(username: string, password: string) {
  try {
    const response = await fetch("http://localhost:8080/api/voters/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    console.log("Response Status:", response.status);
    const responseBody = await response.text();
    console.log("Response Body:", responseBody);

    if (!response.ok) {
      throw new Error("Login failed: " + responseBody);
    }

    const data = JSON.parse(responseBody);
    
    // ✅ Store both userId and token
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("authToken", data.token);

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}


export const getCandidates = async () => {
  try {
    console.log("API: Fetching candidates data");
    const response = await api.get("/candidates"); // Adjust the endpoint if necessary
    console.log("API: Candidates data fetched successfully", response.data);
    return response.data;
  } catch (error) {
    console.error("API: Error fetching candidates data:", error);
    throw error;
  }
}


export const getStatisticsData = async (userId: number) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("User is not authenticated");
    }

    console.log(`API: Fetching statistics data for userId=${userId}`);
    const response = await api.get(`/voters/statistics?voterId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("API Response Data:", response.data); // ✅ Log API response
    return response.data;
  } catch (error) {
    console.error("API: Error fetching statistics data:", error);
    throw error;
  }
};








export const getDashboardData = async (userId: number) => {
  try {
    console.log(`API: Fetching dashboard data for userId=${userId}`);
    const response = await api.get(`/dashboard?userId=${userId}`);
    console.log("API: Dashboard data fetched successfully", response.data);
    return response.data;
  } catch (error) {
    console.error("API: Error fetching dashboard data:", error);
    throw error;
  }
};


export async function getBlockchainData() {
  try {
    const response = await fetch("http://localhost:8080/api/blockchain", { cache: "no-store" });
    if (!response.ok) throw new Error("Failed to fetch blockchain data");

    const data = await response.json();
    console.log("Blockchain Data Fetched:", data); // ✅ Debug Log
    return data;
  } catch (error) {
    console.error("Error fetching blockchain:", error);
    return [];
  }
}



export default api

