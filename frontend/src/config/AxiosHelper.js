import axios from "axios";


export const baseUrl = ""
export const httpClient = axios.create(
    {
        baseURL: baseUrl
    }
)
