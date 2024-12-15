import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { SignupForm } from '../../components/auth/SignupForm';
import { VerificationForm } from '../../components/auth/VerificationForm';
import { useSignupFlow } from '../../hooks/useSignupFlow';

export const Signup = () => {
  const {
    step,
    email,
    isLoading,
    handleSignup,
    handleVerification,
  } = useSignupFlow();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Mail className="h-12 w-12 text-indigo-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {step === 'signup' ? (
            <SignupForm onSubmit={handleSignup} isLoading={isLoading} />
          ) : (
            <VerificationForm 
              email={email}
              onSubmit={handleVerification}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
};