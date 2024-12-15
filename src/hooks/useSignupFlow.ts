import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';

type SignupStep = 'signup' | 'verification';

interface SignupData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface VerificationData {
  otp: string;
}

export const useSignupFlow = () => {
  const [step, setStep] = useState<SignupStep>('signup');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setUser = useAuthStore(state => state.setUser);

  const handleSignup = async (data: SignupData) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      await authService.signup(data.email, data.password);
      setEmail(data.email);
      setStep('verification');
      toast.success('Verification code sent to your email');
    } catch (error) {
      toast.error('Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async (data: VerificationData) => {
    setIsLoading(true);
    try {
      const { user, token } = await authService.verifyEmail(email, data.otp);
      localStorage.setItem('token', token);
      setUser(user);
      toast.success('Email verified successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    step,
    email,
    isLoading,
    handleSignup,
    handleVerification,
  };
};