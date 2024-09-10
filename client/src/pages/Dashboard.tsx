
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-500 text-white p-4">
        <nav className="container mx-auto flex justify-between">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <div>
            <Link to="/signup" className="text-white hover:text-gray-200 mx-2">Sign Up</Link>
            <Link to="/signin" className="text-white hover:text-gray-200 mx-2">Sign In</Link>
            <Link to="/send" className="text-white hover:text-gray-200 mx-2">Send</Link>
          </div>
        </nav>
      </header>
      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Welcome to Your Dashboard!</h2>
        <p className="text-lg mb-4">Here you can manage your account, view statistics, and more.</p>
        {/* Add more content here */}
      </main>
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; 2024 Your Company</p>
      </footer>
    </div>
  );
}

export default Dashboard;
