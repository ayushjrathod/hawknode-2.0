/* eslint-disable react-refresh/only-export-components */
import axios from "axios";

export default axios.create({
    baseURL:"http://localhost:9000"
});

export const axiosPrivate = axios.create({
    baseURL:"http://localhost:9000",
    headers:{"Content-Type":"application/json"},
    withCredentials: true //tokens will be attacted to each refresh request.
});
