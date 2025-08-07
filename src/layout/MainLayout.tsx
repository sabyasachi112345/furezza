// src/layout/MainLayout.tsx
import React from 'react';


const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-4 ml-60">{children}</main> {/* space for sidebar */}
    </div>
  );
};

export default MainLayout;
