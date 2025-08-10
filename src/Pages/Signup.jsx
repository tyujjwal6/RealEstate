import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

// IMPORTANT: Replace this with your actual backend server's URL
const API_BASE_URL = 'http://localhost:3001'; // Example for a local Node.js server

const SignUpModal = () => {
  // State to manage the current step of the signup process
  const [step, setStep] = useState('initial');
  
  // State for form inputs
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');

  // State for loading and error messages
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // State for the OTP resend cooldown timer
  const [resendCooldown, setResendCooldown] = useState(0);

  // Effect to handle the resend cooldown timer
  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    // Cleanup the timer when the component unmounts or cooldown changes
    return () => clearTimeout(timer);
  }, [resendCooldown]);


  // --- Event Handlers ---

  // Reset all states to initial values
  const resetState = () => {
    setStep('initial');
    setPhoneNumber('');
    setOtp('');
    setIsLoading(false);
    setError('');
    setResendCooldown(0);
  };

  // Handle closing the modal, ensuring state is reset
  const handleClose = () => {
    setTimeout(resetState, 300);
  };

  // --- API Call to Request OTP from Backend ---
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!/^\d{10}$/.test(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle errors from the backend (e.g., "Invalid phone number format")
        throw new Error(data.message || 'Failed to send OTP.');
      }

      // On success, move to the next step
      console.log('Backend response:', data.message); // e.g., "OTP sent successfully"
      setStep('otpSent');
      setResendCooldown(30);

    } catch (err) {
      setError(err.message);
      console.error('Error sending OTP:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // --- API Call to Verify OTP with Backend ---
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phoneNumber, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle errors from the backend (e.g., "Invalid OTP")
        throw new Error(data.message || 'Verification failed.');
      }

      // --- LOGIN SUCCESS ---
      console.log('Login successful, token received:', data.token);

      // In a real app, you would save the authentication token
      localStorage.setItem('authToken', data.token);
      
      setStep('success');

      // Automatically close the modal after showing the success message
      setTimeout(() => {
        document.getElementById('signup_modal').close();
        handleClose();
      }, 3000);

    } catch (err) {
      setError(err.message);
      console.error('Error verifying OTP:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Render Functions for Each Step ---

  const renderInitialStep = () => (
    <form onSubmit={handleSendOtp} className="form-control gap-4">
      <p className="py-2 text-center text-gray-600">Enter your phone number to sign up or log in.</p>
      <input 
        type="tel" 
        name="phoneNumber" 
        placeholder="Phone Number" 
        className="input input-bordered w-full" 
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required 
      />
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <button type="submit" className="btn bg-lime-400 hover:bg-lime-500 border-none text-black" disabled={isLoading}>
        {isLoading ? <span className="loading loading-spinner"></span> : 'Send OTP'}
      </button>
    </form>
  );

  const renderOtpStep = () => (
    <form onSubmit={handleVerifyOtp} className="form-control gap-4 text-center">
      <p className="text-sm text-gray-600">
        An OTP has been sent to <span className="font-semibold">{phoneNumber}</span>.
      </p>
      <input 
        type="text" 
        placeholder="Enter 6-digit OTP" 
        className="input input-bordered w-full text-center tracking-[1em]"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        maxLength={6}
        required
      />
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <button type="submit" className="btn bg-lime-400 hover:bg-lime-500 border-none text-black" disabled={isLoading}>
        {isLoading ? <span className="loading loading-spinner"></span> : 'Verify & Continue'}
      </button>
      <div className="text-sm">
        {resendCooldown > 0 ? (
          <p className="text-gray-500">Resend OTP in {resendCooldown}s</p>
        ) : (
          <button 
            type="button" 
            onClick={handleSendOtp} 
            className="link link-hover text-lime-600"
            disabled={isLoading}
          >
            Resend OTP
          </button>
        )}
      </div>
    </form>
  );

  const renderSuccessStep = () => (
    <div className="text-center py-8 flex flex-col items-center gap-4">
        <CheckCircle className="w-16 h-16 text-green-500" />
        <h3 className="font-bold text-2xl">Login Successful!</h3>
        <p className="text-gray-600">Welcome back to EverGreen! You're all set.</p>
    </div>
  );

  return (
    <dialog id="signup_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button 
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleClose}
          >
            ✕
          </button>
        </form>
        
        {step !== 'success' && (
          <h3 className="font-bold text-lg text-center">Sign Up or Log In</h3>
        )}

        <div className="pt-4">
            {step === 'initial' && renderInitialStep()}
            {step === 'otpSent' && renderOtpStep()}
            {step === 'success' && renderSuccessStep()}
        </div>
      </div>
      
      <form method="dialog" className="modal-backdrop">
        <button onClick={handleClose}>close</button>
      </form>
    </dialog>
  );
};

export default SignUpModal;