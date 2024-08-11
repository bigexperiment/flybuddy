import { Search, Users, Shield, Plane, MapPin, Calendar, User, Bell, MessageSquare, Plus, X } from 'lucide-react';
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export const AuthHeader = () => {
    const { user, logout } = useContext(AuthContext);

    return <header className="bg-white shadow-md">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center">
                <Plane className="w-8 h-8 text-blue-500 mr-2" />
                <span className="font-bold text-xl text-gray-800">FlyBuddy</span>
            </div>
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search flights..."
                        className="py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute right-3 top-2.5 text-gray-400" />
                </div>
                <button className="text-gray-600 hover:text-blue-500">
                    <Bell className="w-6 h-6" />
                </button>
                <button className="text-gray-600 hover:text-blue-500">
                    <MessageSquare className="w-6 h-6" />
                </button>
                <div className="relative group">
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500">
                        <User className="w-6 h-6" />
                        <span>{user?.name}</span>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                        <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Log out</button>
                    </div>
                </div>
            </div>
        </nav>
    </header>
}