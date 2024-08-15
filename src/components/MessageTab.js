import React, { useEffect, useState } from 'react';
import { getReceivedMessage } from '../api';
const MessagesTab = () => {
    const [messageList,setMessageList] = useState([])
    useEffect(() => {
        fetchMessage();
    }, []);

    const fetchMessage = async () => {
        try {
            const response = await getReceivedMessage();
            setMessageList(response?.result);
        } catch (error) {
            console.error("Failed to fetch message:", error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Messages</h2>
            <p>Your messages will appear here.</p>
        </div>
    )
};

export default MessagesTab;

