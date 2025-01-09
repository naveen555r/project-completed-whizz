import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate()

    const location = useLocation();
    const { email } = location.state || {}; // Get email from navigation state

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newPassword || !confirmPassword) {
            return toast.error('Please fill in all fields');
        }
    
        if (newPassword !== confirmPassword) {
            return toast.error('Passwords do not match');
        }
    
        console.log('Email:', email);
        console.log('New Password:', newPassword);
        console.log('Confirm Password:', confirmPassword);
    

        try {
            const response = await fetch(SummaryApi.resetPassword.url, {
                method: SummaryApi.resetPassword.method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, newPassword,confirmPassword }),
            });

            const result = await response.json();
            if (result.success) {
                toast.success('Password reset successfully');
                navigate('/login')
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    return (
        <div className="container mx-auto mt-16  max-w-md bg-white shadow-md rounded-lg p-12 ">
        <h2 className="text-2xl font-semibold mb-4 text-center">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password:</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
    
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
    
            
            <div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Reset Password
                </button>
            </div>
        </form>
    </div>
    
    );
};

export default ResetPassword;
