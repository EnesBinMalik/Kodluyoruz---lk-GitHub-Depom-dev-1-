import React from 'react';

interface SparklineProps {
  data?: number[];
  isPositive: boolean;
  width?: number;
  height?: number;
  strokeWidth?: number;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data = [],
  isPositive,
  width = 120,
  height = 36,
  strokeWidth = 2,
}) => {
  if (!data || data.length < 2) {
    return (
      <div
        className="flex items-center justify-center text-xs text-slate-500 font-mono"
        style={{ width, height }}
      >
        —
      </div>
    );
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  // Generate SVG path points
  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * (width - 4) + 2;
    const y = height - ((val - min) / range) * (height - 8) - 4;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const pathD = `M ${points.join(' L ')}`;
  const strokeColor = isPositive ? '#22c55e' : '#ef4444';
  const fillGradientId = `sparkline-grad-${Math.random().toString(36).substring(2, 9)}`;

  // Area fill path
  const firstPoint = points[0].split(',');
  const lastPoint = points[points.length - 1].split(',');
  const areaD = `${pathD} L ${lastPoint[0]},${height} L ${firstPoint[0]},${height} Z`;

  return (
    <svg
      width={width}
      height={height}
      className="overflow-visible block"
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        <linearGradient id={fillGradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={strokeColor} stopOpacity="0.25" />
          <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#${fillGradientId})`} />
      <path
        d={pathD}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
