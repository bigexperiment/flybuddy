export const API_URL = 'http://localhost:5000/api';

export const signup = async (userData) => {
    const response = await fetch(`${API_URL}/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Signup failed');
    return data;
};

export const createFlight = async (payload) => {
    const response = await fetch(`${API_URL}/flights/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') },
        body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Flight creating failed');
    return data;
};

export const getAllFlight = async (payload) => {
    const response = await fetch(`${API_URL}/flights/getAll`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Flight fetching failed');
    return data;
};

export const sendMessage = async (payload) => {
    const response = await fetch(`${API_URL}/message/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') },
        body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Message sebd failed');
    return data;
};

export const getReceivedMessage = async (payload) => {
    const response = await fetch(`${API_URL}/message/received`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Message fetching failed');
    return data;
};
export const getSentMessage = async (payload) => {
    const response = await fetch(`${API_URL}/message/sent`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Message fetching failed');
    return data;
};
