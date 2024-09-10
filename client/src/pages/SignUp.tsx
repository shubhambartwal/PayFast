import { useState, ChangeEvent, FormEvent } from 'react';
import {  useNavigate } from 'react-router-dom';

interface FormData {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents page reload on form submission
    // Handle form submission logic (e.g., sending data to API)
    console.log(formData);
  };

  const goToSignIn = () => {
    navigate('/signin'); // Navigate to the Sign In page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">Username (Email)</label>
          <input
            type="email"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Sign Up</button>
        <button
          type="button"
          className="mt-4 bg-gray-500 text-white p-2 rounded w-full"
          onClick={goToSignIn} // Handle navigation to Sign In page
        >
          Go to Sign In
        </button>
      </form>
    </div>
  );
};

export default SignUp;
