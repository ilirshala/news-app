import React from "react";

const ModalButtons = ({ handleSave, onClose }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-end mt-4">
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 sm:mr-2"
      >
        Save
      </button>
      <button
        onClick={onClose}
        className="bg-gray-500 text-white px-4 py-2 rounded"
      >
        Cancel
      </button>
    </div>
  );
};

export default ModalButtons;
