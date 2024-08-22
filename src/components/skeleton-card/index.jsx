import React from "react";

const SkeletonCard = () => (
  <div className="m-auto lg:m-0 p-3 border border-gray-300 rounded-lg shadow-sm transition-transform duration-300 hover:shadow-lg hover:scale-105 flex flex-col h-72 w-[95%] sm:w-[95%] md:w-[45%] lg:w-[30%] xl:w-[20%] cursor-pointer mt-5 lg:mt-4">
    <div className="w-full flex items-center justify-between mb-3">
      <div className="bg-gray-300 h-4 w-16 rounded-full animate-pulse" />
      <div className="bg-gray-300 h-4 w-24 rounded-full animate-pulse" />
    </div>

    <div className="bg-gray-300 h-6 w-3/4 rounded-lg animate-pulse mb-2" />

    <div className="bg-gray-300 h-4 w-full rounded-lg animate-pulse mb-2" />

    <div className="mt-auto w-full flex items-center justify-between">
      <div className="bg-gray-300 h-4 w-24 rounded-lg animate-pulse" />
      <div className="bg-gray-300 h-4 w-16 rounded-lg animate-pulse" />
    </div>
  </div>
);

export default SkeletonCard;
