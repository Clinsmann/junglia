import axios from "axios";

const request = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

export const getAvailabilityDetails = ({ queryKey }: any) => request.get(`/availability-data?from=${queryKey[1].startMonth}&to=${queryKey[1].endMonth}`);
