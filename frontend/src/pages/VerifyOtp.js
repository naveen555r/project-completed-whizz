import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import SummaryApi from '../common';

const VerifyOtp = () => {
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(SummaryApi.verifyOtp.url, {
                method: SummaryApi.verifyOtp.method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp }),
            });

            const result = await response.json();
            if (result.success) {
                toast.success('OTP Verified');
                // Pass state to the next route
                navigate('/reset-password', { state: { email } });
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    return (
        <div className="container max-w-md mx-auto mt-16 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Verify OTP</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Email:
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* OTP */}
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              OTP:
            </label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200"
            >
              Verify OTP
            </button>
          </div>
        </form>
      </div>
      
    );
};

export default VerifyOtp;
