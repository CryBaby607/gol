// src/pages/user/History.jsx
import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const History = () => {
  return (
    <DashboardLayout isAdmin={false}>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-emerald-800 mb-4">Historial de Participación</h2>
        <p className="text-gray-600 mb-4">
          Aquí encontrarás el registro completo de todas tus participaciones en Turigol.
        </p>
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-700 font-semibold">
                Historial de quinielas jugadas y ganancias obtenidas.
            </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default History;