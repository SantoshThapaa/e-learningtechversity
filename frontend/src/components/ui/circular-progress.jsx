'use client';

export default function CircularProgress({ percent, color }) {
  const colorMap = {
    green: 'stroke-green-500',
    blue: 'stroke-blue-500',
    orange: 'stroke-orange-500',
  };

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent / 100);

  return (
    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r={radius}
        stroke="#e5e7eb"
        strokeWidth="10"
        fill="transparent"
      />
      <circle
        cx="50"
        cy="50"
        r={radius}
        strokeLinecap="round"
        className={`${colorMap[color]} transition-all duration-700 ease-out`}
        strokeWidth="10"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        fill="transparent"
      />
      <text
        x="50"
        y="55"
        textAnchor="middle"
        fontSize="16"
        fill="black"
      >
        {percent}%
      </text>
    </svg>
  );
}
