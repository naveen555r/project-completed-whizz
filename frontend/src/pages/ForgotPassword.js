import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import SummaryApi from '../common';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your email");
            return;
        }

        try {
            const response = await fetch(SummaryApi.sendOtp.url, {
                method: SummaryApi.sendOtp.method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const result = await response.json();

            if (result.success) {
                toast.success(result.message);
                navigate('/send-otp'); // Redirect to OTP verification or reset password page
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <section id='forgot-password' className='mt-16'>
            <div className='mx-auto container px-4'>
                <div className='bg-white p-2 py-10 w-full max-w-md mx-auto'>
                    <h2 className='text-2xl font-semibold text-center mb-4'>Forgot Password</h2>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                        <label>Email:</label>
                        <input
                            type="email"
                            placeholder="Enter your registered email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="p-2 border rounded focus:outline-blue-500"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Send OTP
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ForgotPassword;
