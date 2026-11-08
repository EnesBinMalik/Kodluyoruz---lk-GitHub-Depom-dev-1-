/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CalculatorPage } from './pages/CalculatorPage';
import { WhatIsBmiPage } from './pages/WhatIsBmiPage';
import { AllDietsPage } from './pages/AllDietsPage';
import { HistoryPage } from './pages/HistoryPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-emerald-500 selection:text-white">
        {/* Navigation Bar */}
        <Navbar />

        {/* Dynamic Route Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <Routes>
            {/* Default route is the BMI calculation screen */}
            <Route path="/" element={<CalculatorPage />} />
            
            {/* What is BMI guide */}
            <Route path="/bmi-nedir" element={<WhatIsBmiPage />} />
            
            {/* Comprehensive Diet Plans */}
            <Route path="/diyet-listeleri" element={<AllDietsPage />} />
            
            {/* Saved History */}
            <Route path="/gecmis" element={<HistoryPage />} />
            
            {/* Fallback route redirects to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Footer with Enes Öztürk Signature */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
