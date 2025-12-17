import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const MakePredictions = () => {
  return (
    <DashboardLayout isAdmin={false}>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-yellow-700 mb-4">Hacer Pronósticos</h2>
        <p className="text-gray-600 mb-4">
          Aquí podrás ver y enviar tus pronósticos para los **8** partidos pendientes.
        </p>
        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-yellow-700 font-semibold">
                Hay 8 pronósticos pendientes de realizar en tus quinielas activas.
            </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MakePredictions;