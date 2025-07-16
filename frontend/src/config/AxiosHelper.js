import axios from "axios";


export const baseUrl = "http://vaad.ap-south-1.elasticbeanstalk.com"
export const httpClient = axios.create(
    {
        baseURL: baseUrl
    }
)
