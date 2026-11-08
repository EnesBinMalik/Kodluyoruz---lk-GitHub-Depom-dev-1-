import React from 'react';

interface SignatureProps {
  className?: string;
  showTagline?: boolean;
}

export const Signature: React.FC<SignatureProps> = ({ className = 'w-48 h-12', showTagline = false }) => {
  return (
    <div className="inline-flex flex-col items-start select-none">
      <svg
        viewBox="0 0 280 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} text-slate-900 dark:text-slate-100 transition-colors`}
        aria-label="Enes Öztürk İmzası"
      >
        {/* Artistic flowing calligraphy strokes for "Enes Öztürk" */}
        <path
          d="M20 52 C20 30, 25 15, 38 15 C52 15, 54 35, 32 42 C48 38, 55 48, 52 54 C50 56, 44 58, 38 56"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* n-e-s flow */}
        <path
          d="M58 48 C62 42, 66 38, 72 38 C78 38, 79 46, 79 52 M79 45 C83 38, 92 37, 95 44 C96 50, 91 54, 87 53 M98 48 C102 40, 110 39, 108 46 C106 52, 98 51, 106 55"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Ö character */}
        <path
          d="M135 44 C135 28, 148 24, 155 35 C162 45, 152 56, 140 54 C132 52, 131 42, 137 32"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="142" cy="20" r="1.8" fill="currentColor" />
        <circle cx="150" cy="19" r="1.8" fill="currentColor" />
        {/* z-t-ü-r-k flow */}
        <path
          d="M162 38 L174 38 L165 52 L177 52"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M182 22 L182 52 M178 32 L187 32"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M192 38 C192 48, 201 50, 204 46 L204 38"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="195" cy="30" r="1.5" fill="currentColor" />
        <circle cx="201" cy="30" r="1.5" fill="currentColor" />
        <path
          d="M211 40 C214 36, 220 38, 221 44 L221 52"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M228 20 L228 52 M238 38 L228 45 L240 54"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Flourish underline */}
        <path
          d="M25 58 C90 56, 175 62, 260 54"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="1 1"
          opacity="0.6"
        />
      </svg>
      {showTagline && (
        <span className="text-[11px] font-mono tracking-widest uppercase text-slate-500 dark:text-slate-400 mt-1 pl-1">
          Enes Öztürk · Mühendislik & Tasarım
        </span>
      )}
    </div>
  );
};
