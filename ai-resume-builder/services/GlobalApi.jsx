import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL+"api/",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }
});

export const CreateNewResume = (data) => axiosClient.post('/user-resumes', data);

export const GetUserResumes = (userEmail) => 
  axiosClient.get(`/user-resumes?filters[userEmail][$eq]=${userEmail}`);

export const UpdateResumeDetail = (resumeId, data) => 
  axiosClient.put(`/user-resumes/${resumeId}`, data);

export const GetResumeById = (id) => 
  axiosClient.get(`/user-resumes/${id}?populate=*`);

export const DeleteResumeById = (id) => 
  axiosClient.delete(`/user-resumes/${id}`);