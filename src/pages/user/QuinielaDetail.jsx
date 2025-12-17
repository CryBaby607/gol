import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const MatchPredictionForm = ({ match, onPredictionChange, index }) => {
    const [prediction, setPrediction] = useState(match.userPrediction || '');

    const handleSelect = (value) => {
        setPrediction(value);
        onPredictionChange(match.id, value);
    };

    const getButtonClass = (value) => {
        const baseClasses = "w-10 h-10 flex items-center justify-center text-lg font-bold rounded-full transition-colors border-2";
        const isActive = prediction === value;

        if (isActive) {
            if (value === '1') return `${baseClasses} bg-green-600 text-white border-green-600`;
            if (value === 'X') return `${baseClasses} bg-yellow-600 text-white border-yellow-600`;
            if (value === '2') return `${baseClasses} bg-red-600 text-white border-red-600`;
        }
        
        return `${baseClasses} bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200`;
    };

    return (
        <div className="flex items-center justify-between space-x-4 p-4 bg-gray-50 rounded-lg shadow-inner border border-gray-200">
          <div className="flex-grow flex items-center space-x-4">
            <span className="text-sm font-semibold text-gray-500 w-12 flex-shrink-0">P{index + 1}:</span>
            <div className="flex-grow text-gray-900 font-semibold">{match.local} vs {match.visitante}</div>
            <div className="text-xs text-gray-500 flex-shrink-0">
              {new Date(match.date).toLocaleDateString('es-ES')}
            </div>
          </div>
          <div className="flex space-x-2 flex-shrink-0">
            <button type="button" onClick={() => handleSelect('1')} className={getButtonClass('1')}>1</button>
            <button type="button" onClick={() => handleSelect('X')} className={getButtonClass('X')}>X</button>
            <button type="button" onClick={() => handleSelect('2')} className={getButtonClass('2')}>2</button>
          </div>
        </div>
    );
};

const quinielaData = {
    id: 123,
    titulo: 'LaLiga - Jornada 29',
    liga: 'LIGA SANTANDER',
    status: 'Activa',
    matches: [
        { id: 1, local: 'FC Barcelona', visitante: 'Real Madrid', date: '2025-12-20T21:00:00', userPrediction: 'X' },
        { id: 2, local: 'Sevilla FC', visitante: 'Real Betis', date: '2025-12-21T18:30:00', userPrediction: '' },
        { id: 3, local: 'Athletic Club', visitante: 'Valencia CF', date: '2025-12-21T16:00:00', userPrediction: '1' },
        { id: 4, local: 'Getafe CF', visitante: 'Cádiz CF', date: '2025-12-20T19:30:00', userPrediction: '2' },
        { id: 5, local: 'Real Sociedad', visitante: 'Atlético de Madrid', date: '2025-12-22T14:00:00', userPrediction: '' },
        { id: 6, local: 'Villarreal', visitante: 'Rayo Vallecano', date: '2025-12-22T18:00:00', userPrediction: '' },
        { id: 7, local: 'Girona FC', visitante: 'Alavés', date: '2025-12-23T20:45:00', userPrediction: '1' },
        { id: 8, local: 'Mallorca', visitante: 'Celta Vigo', date: '2025-12-23T16:30:00', userPrediction: 'X' },
        { id: 9, local: 'Las Palmas', visitante: 'Osasuna', date: '2025-12-23T16:30:00', userPrediction: '' },
    ]
};

const QuinielaDetail = () => {
    const { id } = useParams();
    const [currentPredictions, setCurrentPredictions] = useState(
        quinielaData.matches.reduce((acc, match) => {
            acc[match.id] = match.userPrediction || '';
            return acc;
        }, {})
    );
    const [isLoading, setIsLoading] = useState(false);

    const handlePredictionChange = (matchId, value) => {
        setCurrentPredictions(prev => ({
            ...prev,
            [matchId]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const allPredicted = Object.values(currentPredictions).every(p => p !== '');
        if (!allPredicted) {
            alert('Por favor, completa el pronóstico para todos los partidos.');
            return;
        }
        setIsLoading(true);
        console.log(`Guardando...`, currentPredictions);
        setTimeout(() => {
            setIsLoading(false);
            alert(`¡Guardado con éxito!`);
        }, 2000);
    };
    
    const completedCount = Object.values(currentPredictions).filter(p => p !== '').length;
    const totalMatches = quinielaData.matches.length;

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-emerald-800 mb-2">{quinielaData.titulo}</h2>
            <p className="text-sm text-gray-500 mb-6">Liga: {quinielaData.liga} | Estado: {quinielaData.status}</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    {quinielaData.matches.map((match, index) => (
                        <MatchPredictionForm 
                            key={match.id}
                            match={match}
                            index={index}
                            onPredictionChange={handlePredictionChange}
                        />
                    ))}
                </div>

                <div className="sticky bottom-0 z-10 p-4 bg-emerald-50 rounded-xl border border-emerald-300 text-sm flex justify-between items-center shadow-lg">
                    <span className="font-semibold text-gray-800">
                        {completedCount} de {totalMatches} pronósticos completados.
                    </span>
                    <button 
                        type="submit"
                        disabled={isLoading || completedCount < totalMatches}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                        <i className={isLoading ? "fas fa-spinner fa-spin" : "fas fa-save"}></i>
                        <span>{isLoading ? 'Guardando...' : 'Guardar'}</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default QuinielaDetail;