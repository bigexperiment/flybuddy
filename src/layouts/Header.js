import React, { useContext, useState } from "react";
import { login, signup } from '../api';
import { Plane } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
    const { user, login, logout } = useContext(AuthContext);
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    const handleSignupSuccess = (userData) => {
        setShowSignup(false);
        setShowLogin(true);
    };

    const handleLogout = () => {
        logout();
        //setUser(null);
    };

    return (
        <header className="bg-white shadow-md">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <Plane className="w-8 h-8 text-blue-500 mr-2" />
                    <span className="font-bold text-xl text-gray-800">FlyBuddy</span>
                </div>
                <div>
                    {user ? (
                        <>
                            <span className="mr-4 text-gray-700">Welcome, {user.name || user.email}</span>
                            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out">
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => setShowLogin(true)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mr-2 transition duration-300 ease-in-out">
                                Log In
                            </button>
                            <button onClick={() => setShowSignup(true)} className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out">
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
            </nav>
            {showLogin && (
                <LoginModal
                    onClose={() => setShowLogin(false)}
                    login={login}
                />
            )}
            {showSignup && (
                <SignupModal
                    onClose={() => setShowSignup(false)}
                    onSuccess={handleSignupSuccess}
                />
            )}
        </header>
    );
};


const LoginModal = ({ onClose,login }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            login({ email, password });
        } catch (error) {
            alert(error.message);
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

const SignupModal = ({ onClose, onSuccess }) => {
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


export default Header;