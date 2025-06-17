
import React from 'react';
import { CheckCircle } from 'lucide-react';
const ProblemListItem = ({ problem, onSelect }) => {
    const difficultyColor = {
        'Easy': 'text-green-700 bg-green-100',
        'Medium': 'text-yellow-700 bg-yellow-100',
        'Hard': 'text-red-700 bg-red-100',
    };
    const difficulty = problem.basic_info?.difficulty || 'N/A';

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-red-400 hover:shadow-md transition-all duration-200 flex items-center gap-4 cursor-pointer" onClick={onSelect}>
            <CheckCircle className="w-6 h-6 text-gray-300 flex-shrink-0" />
            <div className="flex-grow min-w-0">
                <h3 className="font-semibold text-gray-800 hover:text-red-600 truncate">
                    {problem.basic_info?.title || 'Unknown Title'}
                </h3>
                <div className="flex items-center flex-wrap gap-x-3 text-sm text-gray-500 mt-1">
                    {problem.tags?.company_tags?.slice(0, 2).map(tag => (
                        <span key={tag}>{tag}</span>
                    ))}
                    {problem.tags?.company_tags?.length > 2 && (
                        <span className="text-red-600 font-medium">
                            + {problem.tags.company_tags.length - 2} more
                        </span>
                    )}
                </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-semibold hidden sm:block ${difficultyColor[difficulty] || 'text-gray-600 bg-gray-100'}`}>
                {difficulty}
            </div>
            <div className="text-sm text-gray-500 hidden md:block whitespace-nowrap">{problem.basic_info?.submissions}</div>
            <div className="text-sm text-gray-500 hidden lg:block whitespace-nowrap">{problem.basic_info?.accuracy}</div>
            <button 
                onClick={(e) => { e.stopPropagation(); onSelect(); }} 
                className="bg-red-50 text-red-700 font-semibold px-6 py-2 rounded-lg hover:bg-red-100 transition-colors whitespace-nowrap"
            >
                Solve
            </button>
        </div>
    );
};
export default ProblemListItem;