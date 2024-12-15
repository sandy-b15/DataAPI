import React from 'react';
import { useForm } from '../../hooks/useForm';

interface VerificationFormData {
  otp: string;
}

interface VerificationFormProps {
  email: string;
  onSubmit: (data: VerificationFormData) => void;
  isLoading: boolean;
}

export const VerificationForm = ({ email, onSubmit, isLoading }: VerificationFormProps) => {
  const { values, handleChange, handleSubmit } = useForm<VerificationFormData>({
    initialValues: {
      otp: '',
    },
    onSubmit,
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-600 text-center">
          We've sent a verification code to<br />
          <span className="font-medium text-gray-900">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
            Verification Code
          </label>
          <div className="mt-1">
            <input
              id="otp"
              name="otp"
              type="text"
              required
              value={values.otp}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter 6-digit code"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isLoading ? 'Verifying...' : 'Verify Email'}
          </button>
        </div>
      </form>
    </div>
  );
};