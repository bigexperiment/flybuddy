import React, { useState } from "react";
import { Search, Users, Shield, Plane, MapPin, Calendar } from "lucide-react";
import { login, signup } from './api';

// Updated dummy data focusing on flight details
const travelersData = [
  {
    id: 1,
    name: "Sarah Johnson",
    age: 28,
    departure: "New York (JFK)",
    arrival: "Paris (CDG)",
    airline: "Air France",
    flightNumber: "AF023",
    date: "2024-09-15",
    image: "/api/placeholder/150/150",
  },
  {
    id: 2,
    name: "Michael Chen",
    age: 35,
    departure: "San Francisco (SFO)",
    arrival: "Tokyo (NRT)",
    airline: "United Airlines",
    flightNumber: "UA837",
    date: "2024-10-01",
    image: "/api/placeholder/150/150",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    age: 42,
    departure: "London (LHR)",
    arrival: "New York (JFK)",
    airline: "British Airways",
    flightNumber: "BA175",
    date: "2024-08-20",
    image: "/api/placeholder/150/150",
  },
  {
    id: 4,
    name: "Ahmed Hassan",
    age: 31,
    departure: "Dubai (DXB)",
    arrival: "Sydney (SYD)",
    airline: "Emirates",
    flightNumber: "EK414",
    date: "2024-11-05",
    image: "/api/placeholder/150/150",
  },
];

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setShowLogin(false);
  };

  const handleSignupSuccess = (userData) => {
    setUser(userData);
    setShowSignup(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500">
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
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Find Your Perfect Flight Companion
          </h1>
          <p className="text-xl text-white mb-8">
            Connect with fellow travelers on your upcoming flights
          </p>
          <button className="bg-white text-blue-500 font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-100 transition duration-300 ease-in-out">
            Find a Buddy
          </button>
        </div>

        {/* Available Flight Companions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Available Flight Companions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {travelersData.map((traveler) => (
              <TravelerCard key={traveler.id} traveler={traveler} />
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <FeatureCard
            icon={<Search className="w-12 h-12 text-blue-500" />}
            title="Find Flight Buddies"
            description="Search for companions on your specific flight"
          />
          <FeatureCard
            icon={<Users className="w-12 h-12 text-purple-500" />}
            title="In-Flight Connections"
            description="Chat with potential companions before takeoff"
          />
          <FeatureCard
            icon={<Shield className="w-12 h-12 text-green-500" />}
            title="Safe Travel"
            description="Verified profiles and secure messaging for peace of mind"
          />
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-8 md:p-12 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:mr-8">
            <img
              src="/api/placeholder/600/400"
              alt="Happy travelers on a flight"
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Choose FlyBuddy?
            </h2>
            <p className="text-gray-600 mb-6">
              FlyBuddy is your go-to platform for finding like-minded travel
              companions on your flights. Whether you're looking for someone to
              chat with during a long journey or hoping to share a cab to your
              final destination, FlyBuddy makes it easy and safe to connect with
              fellow passengers.
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out">
              Learn More
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 FlyBuddy. All rights reserved.</p>
        </div>
      </footer>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSuccess={handleLoginSuccess}
        />
      )}
      {showSignup && (
        <SignupModal
          onClose={() => setShowSignup(false)}
          onSuccess={handleSignupSuccess}
        />
      )}
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-xl shadow-md p-6 text-center">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const TravelerCard = ({ traveler }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden">
    <img
      src={traveler.image}
      alt={traveler.name}
      className="w-full h-48 object-cover"
    />
    <div className="p-6">
      <h3 className="font-bold text-xl mb-2">
        {traveler.name}, {traveler.age}
      </h3>
      <div className="flex items-center text-gray-600 mb-2">
        <Plane className="w-4 h-4 mr-2" />
        <span>
          {traveler.airline} {traveler.flightNumber}
        </span>
      </div>
      <div className="flex items-center text-gray-600 mb-2">
        <MapPin className="w-4 h-4 mr-2" />
        <span>
          {traveler.departure} to {traveler.arrival}
        </span>
      </div>
      <div className="flex items-center text-gray-600 mb-4">
        <Calendar className="w-4 h-4 mr-2" />
        <span>{traveler.date}</span>
      </div>
      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
        Connect
      </button>
    </div>
  </div>
);

const LoginModal = ({ onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ email, password });
      onSuccess(result);
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

export default App;