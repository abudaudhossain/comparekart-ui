import React, { useEffect, useState } from 'react';

type UserEditFormProps = {
  userId: string;
  clickCharge: number | string;
  onSubmit?: (payload: { userId: string; clickCharge: number }) => void;
};

const UserEditForm: React.FC<UserEditFormProps> = ({ userId, clickCharge, onSubmit }) => {
  const [charge, setCharge] = useState<string>("");

  useEffect(() => {
    setCharge(clickCharge?.toString() ?? "");
  }, [clickCharge]);

  const handleSubmit = () => {
    const parsedCharge = parseFloat(charge);
    if (isNaN(parsedCharge)) {
      alert("Please enter a valid number for click charge.");
      return;
    }

    const payload = {
      userId,
      clickCharge: parsedCharge,
    };

    //console.log("Submitting:", payload);

    if (onSubmit) {
      onSubmit(payload);
    }
  };

  return (
    <div className="px-4 py-5 border-b border-gray-200 bg-white dark:bg-black/10 flex gap-4 items-end">
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">Charge Per Click</label>
        <input
          type="number"
          value={charge}
          onChange={(e) => setCharge(e.target.value)}
          placeholder="Enter click charge"
          className="border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </div>
  );
};

export default UserEditForm;
