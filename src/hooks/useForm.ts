import { useState, ChangeEvent, FormEvent } from 'react';

interface UseFormProps<T> {
  initialValues: T;
  onSubmit: (values: T) => void;
}

export const useForm = <T extends Record<string, any>>({ 
  initialValues, 
  onSubmit 
}: UseFormProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return {
    values,
    handleChange,
    handleSubmit,
    setValues,
  };
};