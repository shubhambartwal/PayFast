import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(''); // Use email instead of userName
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
        email,
        firstName,
        lastName,
        password,
      });

      localStorage.setItem('token', response.data.token); // Store token securely
      navigate('/dashboard'); // Navigate to dashboard
    } catch (error) {
      console.error('Signup error:', error); // Handle errors gracefully
      // Display an error message to the user (optional)
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="bg-slate-500 p-5 rounded-xl text-white">
        <h1 className="text-center font-bold">Sign Up</h1>
        <p className="p-1 m-1">Enter your information to create an account</p>

        <form onSubmit={handleSignUp}>
          <div className="p-1">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              onChange={(e) => setFirstName(e.target.value)}
              className="p-1 w-full"
              type="text"
              required // Mark input as required
            />
          </div>

          <div className="p-1">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              onChange={(e) => setLastName(e.target.value)}
              className="p-1 w-full"
              type="text"
              required // Mark input as required
            />
          </div>

          <div className="p-1">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              className="p-1 w-full"
              type="email"
              required // Mark input as required
            />
          </div>

          <div className="p-1">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              className="p-1 w-full"
              type="password"
              required // Mark input as required
            />
          </div>

          <div className="flex justify-center">
            <button className="bg-slate-900 py-2 my-2 w-full rounded-xl" type="submit">
              Sign Up
            </button>
          </div>
        </form>

        <p>
          Already have an account?
          <button onClick={() => navigate('/signin')}>Sign In</button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;