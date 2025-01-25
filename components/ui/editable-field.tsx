'use client'

import { useState } from "react"

export const EditableField = ({ label, value, options} : any) => {
const [editMode, setEditMode] = useState(false);
const [fieldValue, setFieldValue] = useState(value);

const saveChanges = () => {
  // Add logic to save changes (e.g., API call)
  setEditMode(false);
};

return (
  <div className="my-4">
    <label className="block text-gray-700 font-medium">{label}</label>
    {editMode ? (
      options ? (
        <select
          className="mt-2 border rounded px-3 py-2 w-full"
          value={fieldValue}
          onChange={(e) => setFieldValue(e.target.value)}
        >
          {options.map((option : any) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          className="mt-2 border rounded px-3 py-2 w-full"
          value={fieldValue}
          onChange={(e) => setFieldValue(e.target.value)}
        />
      )
    ) : (
      <p className="mt-2">{fieldValue}</p>
    )}

    <button
      className="text-blue-500 mt-2 hover:underline"
      onClick={() => (editMode ? saveChanges() : setEditMode(true))}
    >
      {editMode ? 'Save' : 'Edit'}
    </button>
  </div>
);
  
}