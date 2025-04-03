import { httpClient } from "../config/AxiosHelper"

export const createRoom = async (roomDetail) => {

    const response = await httpClient.post(`/rooms`, roomDetail, {
        headers: {
            "Content-Type": "text/plan"
        }
    });

    return response;
}
export const joinRoom = async (roomId) => {

    const response = await httpClient.get(`/rooms/${roomId}`);

    return response.data;
}

export const getMessages = async (roomId, size = 50, page = 0) => {
    const response = await httpClient.get(`/rooms/${roomId}/messages?size=${size}&page=${page}`)
    return response.data
}