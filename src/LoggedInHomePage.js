import React, { useState, useEffect, useContext } from 'react';
import { Search, Users, Shield, Plane, MapPin, Calendar, User, Bell, MessageSquare, Plus, X } from 'lucide-react';
import { AuthHeader } from './layouts/AuthHeader';
import { AuthContext } from './context/AuthContext';
import { createFlight, getAllFlight } from './api';
import FlightCard from './components/FlightCard';
import MyFlightsTab from './components/MyFlightTab';
import MessagesTab from './components/MessageTab';

// Mock API functions (replace with actual API calls in production)
const getFlights = () => Promise.resolve([
    { id: 1, name: "Sarah Johnson", age: 28, airline: "Air France", flightNumber: "AF023", departure: "New York (JFK)", arrival: "Paris (CDG)", date: "2024-09-15", status: "offering", companionPreference: "Looking for someone interested in photography and culture." },
    { id: 2, name: "Michael Chen", age: 35, airline: "United Airlines", flightNumber: "UA837", departure: "San Francisco (SFO)", arrival: "Tokyo (NRT)", date: "2024-10-01", status: "seeking", additionalInfo: "First time in Tokyo, would love a local guide." },
    { id: 3, name: "Emma Rodriguez", age: 42, airline: "British Airways", flightNumber: "BA175", departure: "London (LHR)", arrival: "New York (JFK)", date: "2024-08-20", status: "offering", companionPreference: "Happy to share travel tips about New York." },
]);

const addFlight = (flightDetails) => {
    console.log("Flight added:", flightDetails);


    return Promise.resolve({ ...flightDetails, id: Date.now() });
};

const OfferingTab = ({ flights }) => (
    <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Offering Companionship</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flights.map(flight => (
                <FlightCard key={flight.id} flight={flight} />
            ))}
        </div>
    </div>
);

const SeekingTab = ({ flights }) => (
    <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Seeking Companionship</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flights.map(flight => (
                <FlightCard key={flight.id} flight={flight} />
            ))}
        </div>
    </div>
);

const ProfileTab = ({ user }) => (
    <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile</h2>
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
        {/* Add more profile information here */}
    </div>
);

const AddFlightForm = ({ onClose, onAddFlight }) => {
    const [flightDetails, setFlightDetails] = useState({
        status: 'offering', // Default to 'offering'
        name: '',
        age: '',
        airline: '',
        flightNumber: '',
        departure: '',
        arrival: '',
        date: '',
        companionPreference: '',
        additionalInfo: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFlightDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddFlight(flightDetails);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-md w-full max-h-90vh overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Add Your Flight</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            I am:
                        </label>
                        <div className="flex space-x-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio"
                                    name="status"
                                    value="offering"
                                    checked={flightDetails.status === 'offering'}
                                    onChange={handleChange}
                                />
                                <span className="ml-2">Offering companionship</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio"
                                    name="status"
                                    value="seeking"
                                    checked={flightDetails.status === 'seeking'}
                                    onChange={handleChange}
                                />
                                <span className="ml-2">Seeking a companion</span>
                            </label>
                        </div>
                    </div>
                    <input
                        type="text"
                        name="name"
                        value={flightDetails.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <input
                        type="number"
                        name="age"
                        value={flightDetails.age}
                        onChange={handleChange}
                        placeholder="Your Age"
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <input
                        type="text"
                        name="airline"
                        value={flightDetails.airline}
                        onChange={handleChange}
                        placeholder="Airline"
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <input
                        type="text"
                        name="flightNumber"
                        value={flightDetails.flightNumber}
                        onChange={handleChange}
                        placeholder="Flight Number"
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <input
                        type="text"
                        name="departure"
                        value={flightDetails.departure}
                        onChange={handleChange}
                        placeholder="Departure Airport"
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <input
                        type="text"
                        name="arrival"
                        value={flightDetails.arrival}
                        onChange={handleChange}
                        placeholder="Arrival Airport"
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <input
                        type="date"
                        name="date"
                        value={flightDetails.date}
                        onChange={handleChange}
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    {flightDetails.status === 'offering' && (
                        <textarea
                            name="companionPreference"
                            value={flightDetails.companionPreference}
                            onChange={handleChange}
                            placeholder="Describe your ideal companion (e.g., age range, interests)"
                            className="w-full p-2 mb-4 border rounded"
                            rows="3"
                        />
                    )}
                    {flightDetails.status === 'seeking' && (
                        <textarea
                            name="additionalInfo"
                            value={flightDetails.additionalInfo}
                            onChange={handleChange}
                            placeholder="Any additional information or preferences"
                            className="w-full p-2 mb-4 border rounded"
                            rows="3"
                        />
                    )}
                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-800">
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                            Add Flight
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
const PreviewAddFlightForm = () => {
    const [showForm, setShowForm] = useState(false);

    const handleAddFlight = (flightDetails) => {
        console.log("Flight added:", flightDetails);
        setShowForm(false);
    };

    return (
        <div className="p-4">
            <button
                onClick={() => setShowForm(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
                Add Flight
            </button>
            {showForm && (
                <AddFlightForm
                    onClose={() => setShowForm(false)}
                    onAddFlight={handleAddFlight}
                />
            )}
        </div>
    );
};


const LoggedInHomePage = () => {
    const { user } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('Offering');
    const [flights, setFlights] = useState([]);
    const [showAddFlightForm, setShowAddFlightForm] = useState(false);
    const tabs = ['Offering', 'Seeking', 'My Flights', 'Messages', 'Profile'];

    useEffect(() => {
        fetchFlights();
    }, []);

    const fetchFlights = async () => {
        try {
            const flightData = await getAllFlight();
            setFlights(flightData?.result);
        } catch (error) {
            console.error("Failed to fetch flights:", error);
        }
    };

    const handleAddFlight = async (flightDetails) => {
        try {
            //const newFlight = await addFlight(flightDetails);
            await createFlight(flightDetails);
            await getAllFlight();
            //  setFlights([...flights, newFlight]);
            setShowAddFlightForm(false);
        } catch (error) {
            console.error("Failed to add flight:", error);
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Offering':
                return <OfferingTab flights={flights.filter(f => f.status === 'offering' && f.userId != user?._id)} />;
            case 'Seeking':
                return <SeekingTab flights={flights.filter(f => f.status === 'seeking' && f.userId != user?._id)} />;
            case 'My Flights':
                return <MyFlightsTab flights={flights.filter(f => f.userId === user?._id)} allFlights={flights} />;
            case 'Messages':
                return <MessagesTab />;
            case 'Profile':
                return <ProfileTab user={user} />;
            default:
                return <div>Tab content not available</div>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <AuthHeader />

            <main className="container mx-auto px-6 py-8">
                <div className="mb-8">
                    <ul className="flex space-x-4 border-b">
                        {tabs.map((tab) => (
                            <li key={tab}>
                                <button
                                    className={`py-2 px-4 font-medium ${activeTab === tab
                                        ? 'text-blue-500 border-b-2 border-blue-500'
                                        : 'text-gray-500 hover:text-blue-500'
                                        }`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {renderTabContent()}

                {(activeTab === 'Offering' || activeTab === 'Seeking' || activeTab === 'My Flights') && (
                    <button
                        onClick={() => setShowAddFlightForm(true)}
                        className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center shadow-lg"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Add Your Flight
                    </button>
                )}

                {showAddFlightForm && (
                    <AddFlightForm
                        onClose={() => setShowAddFlightForm(false)}
                        onAddFlight={handleAddFlight}
                    />
                )}
            </main>
        </div>
    );
};

export default LoggedInHomePage;
