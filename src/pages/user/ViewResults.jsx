import React from 'react';

const ViewResults = () => {
  return (
    <DashboardLayout isAdmin={false}>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Ver Resultados</h2>
        <p className="text-gray-600 mb-4">
          Consulta los resultados finales y tu posición en las quinielas ya cerradas.
        </p>
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-blue-700 font-semibold">
                Lista de quinielas finalizadas con clasificación y premios.
            </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ViewResults;