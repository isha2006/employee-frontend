import React from 'react';

const SummaryCard = ({ icon, title, value, gradientClass }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-4 ${gradientClass} text-white rounded-lg shadow`}>
      <div className="w-11 h-11 mb-2">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl font-extrabold">{value}</p>
    </div>
  );
};

export default SummaryCard;
