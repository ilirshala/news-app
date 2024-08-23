import React from "react";

const SelectPreferences = ({
  label,
  items,
  toggleSelection,
  selectedItems,
  setSelectedItems,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700">{label}:</label>
      <div className="mt-2 flex flex-wrap">
        {items?.map((item, index) => (
          <button
            key={index}
            onClick={() =>
              toggleSelection(selectedItems, setSelectedItems, item?.filterKey)
            }
            className={`m-1 px-2 py-1 rounded border ${
              selectedItems?.includes(item?.filterKey)
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {item?.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectPreferences;
