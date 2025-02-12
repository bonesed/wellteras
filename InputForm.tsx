// components/register/InputForm.tsx

import React, { useState } from 'react';

type InputFormProps = {
  step: number;
  onSubmit: (value: any) => void;
};

const InputForm: React.FC<InputFormProps> = ({ step, onSubmit }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(input);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        名前:
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          className="border rounded px-2 py-1 ml-2"
        />
      </label>
      <button 
        type="submit"
        className="ml-2 bg-blue-500 text-white px-4 py-1 rounded"
      >
        送信
      </button>
    </form>
  );
};

export default InputForm;
