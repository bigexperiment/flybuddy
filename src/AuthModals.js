import React, { useState } from 'react';
import { login, signup } from './api';

export const LoginModal = ({ onClose, onSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await login({ email, password });
            onSuccess(result);
        } catch (error) {
            alert(JSON.stringify(error));
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Log In</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Log In</button>
                </form>
                <button onClick={onClose} className="mt-4 text-blue-500">Close</button>
            </div>
        </div>
    );
};

export const SignupModal = ({ onClose, onSuccess }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [age, setAge] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await signup({ name, email, password, phoneNo, age: parseInt(age) });
            onSuccess(result);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <input
                        type="tel"
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                        placeholder="Phone Number"
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="Age"
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <button type="submit" className="w-full bg-purple-500 text-white p-2 rounded">Sign Up</button>
                </form>
                <button onClick={onClose} className="mt-4 text-purple-500">Close</button>
            </div>
        </div>
    );
};