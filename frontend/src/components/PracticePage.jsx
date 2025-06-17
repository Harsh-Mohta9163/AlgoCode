import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Search, ChevronDown, ArrowLeft, ExternalLink } from "lucide-react";
import ProblemListItem from "./ProblemListItem";

const PracticePage = ({ allProblems, loading, error }) => {
    const navigate = useNavigate();
    const [companyFilter, setCompanyFilter] = useState('All');
    const [topicFilter, setTopicFilter] = useState('All');
    const [sortOrder, setSortOrder] = useState('latest');
    const [searchTerm, setSearchTerm] = useState('');
    const [showAllCompanies, setShowAllCompanies] = useState(false);
    const [showAllTopics, setShowAllTopics] = useState(false);

    // Fixed company and topic extraction
    const companies = useMemo(() => {
        const allCompanies = new Set();
        allProblems.forEach(problem => {
            if (problem.tags?.company_tags) {
                problem.tags.company_tags.forEach(tag => allCompanies.add(tag));
            }
        });
        return ['All', ...Array.from(allCompanies).sort()];
    }, [allProblems]);

    const topics = useMemo(() => {
        const allTopics = new Set();
        allProblems.forEach(problem => {
            if (problem.tags?.topic_tags) {
                problem.tags.topic_tags.forEach(tag => allTopics.add(tag));
            }
        });
        return ['All', ...Array.from(allTopics).sort()];
    }, [allProblems]);

    // Fixed filtering logic
    const filteredProblems = useMemo(() => {
        let result = [...allProblems];

        // Apply company filter
        if (companyFilter !== 'All') {
            result = result.filter(problem => 
                problem.tags?.company_tags?.includes(companyFilter)
            );
        }

        // Apply topic filter
        if (topicFilter !== 'All') {
            result = result.filter(problem => 
                problem.tags?.topic_tags?.includes(topicFilter)
            );
        }

        // Apply search filter
        if (searchTerm.trim()) {
            const searchLower = searchTerm.toLowerCase();
            result = result.filter(problem => 
                problem.basic_info?.title?.toLowerCase().includes(searchLower)
            );
        }

        // Apply sorting
        if (sortOrder === 'latest') {
            result.sort((a, b) => new Date(b.metadata?.scraped_at || 0).getTime() - new Date(a.metadata?.scraped_at || 0).getTime());
        } else if (sortOrder === 'difficulty') {
            const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
            result.sort((a, b) => {
                const diffA = difficultyOrder[a.basic_info?.difficulty] || 0;
                const diffB = difficultyOrder[b.basic_info?.difficulty] || 0;
                return diffA - diffB;
            });
        }
        
        return result;
    }, [companyFilter, topicFilter, searchTerm, sortOrder, allProblems]);

    // Fixed topic weightage calculation
    const topicWeightage = useMemo(() => {
        if (companyFilter === 'All') return [];
        
        const companyProblems = allProblems.filter(problem => 
            problem.tags?.company_tags?.includes(companyFilter)
        );
        
        if (companyProblems.length === 0) return [];
        
        const topicCounts = {};
        companyProblems.forEach(problem => {
            if (problem.tags?.topic_tags) {
                problem.tags.topic_tags.forEach(topic => {
                    topicCounts[topic] = (topicCounts[topic] || 0) + 1;
                });
            }
        });
        
        return Object.entries(topicCounts)
            .map(([topic, count]) => ({ 
                topic, 
                weight: (Number(count) / companyProblems.length) * 100 
            }))
            .sort((a, b) => b.weight - a.weight);
    }, [allProblems, companyFilter]);

    const companiesToShow = showAllCompanies ? companies.slice(1) : companies.slice(1, 6);
    const topicsToShow = showAllTopics ? topics.slice(1) : topics.slice(1, 6);

    const clearAllFilters = () => {
        setCompanyFilter('All');
        setTopicFilter('All');
        setSearchTerm('');
    };

    return (
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Sidebar - Fixed scrolling issues */}
                <aside className="w-full lg:w-1/4 xl:w-1/5">
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
                        <h2 className="text-lg font-bold mb-4 text-gray-800 flex justify-between items-center">
                            Filters
                            <button onClick={clearAllFilters} className="text-xs font-semibold text-red-600 hover:underline">
                                CLEAR ALL
                            </button>
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold mb-2 text-gray-700 text-sm uppercase">COMPANIES</h3>
                                <div className="space-y-1">
                                    {companiesToShow.map(company => (
                                        <button 
                                            key={company} 
                                            onClick={() => setCompanyFilter(company)} 
                                            className={`w-full text-left p-2 rounded-md text-sm flex items-center gap-2 transition-colors ${
                                                companyFilter === company 
                                                    ? 'bg-red-100 text-red-700 font-bold' 
                                                    : 'hover:bg-gray-100 text-gray-700'
                                            }`}
                                        >
                                            <input 
                                                type="checkbox" 
                                                readOnly 
                                                checked={companyFilter === company} 
                                                className="form-checkbox h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500" 
                                            />
                                            <span>{company}</span>
                                        </button>
                                    ))}
                                    {companies.length > 7 && (
                                        <button 
                                            onClick={() => setShowAllCompanies(!showAllCompanies)} 
                                            className="text-sm text-red-600 mt-2 font-semibold hover:underline"
                                        >
                                            {showAllCompanies ? 'View Less' : 'View All'}
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2 text-gray-700 text-sm uppercase">TOPICS</h3>
                                <div className="space-y-1">
                                    {topicsToShow.map(topic => (
                                        <button 
                                            key={topic} 
                                            onClick={() => setTopicFilter(topic)} 
                                            className={`w-full text-left p-2 rounded-md text-sm flex items-center gap-2 transition-colors ${
                                                topicFilter === topic 
                                                    ? 'bg-red-100 text-red-700 font-bold' 
                                                    : 'hover:bg-gray-100 text-gray-700'
                                            }`}
                                        >
                                            <input 
                                                type="checkbox" 
                                                readOnly 
                                                checked={topicFilter === topic} 
                                                className="form-checkbox h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500" 
                                            />
                                            <span>{topic}</span>
                                        </button>
                                    ))}
                                    {topics.length > 7 && (
                                        <button 
                                            onClick={() => setShowAllTopics(!showAllTopics)} 
                                            className="text-sm text-red-600 mt-2 font-semibold hover:underline"
                                        >
                                            {showAllTopics ? 'View Less' : 'View All'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="w-full lg:w-3/4 xl:w-4/5">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Popular Problems 
                            {filteredProblems.length > 0 && (
                                <span className="text-lg font-normal text-gray-600 ml-2">
                                    ({filteredProblems.length} problems)
                                </span>
                            )}
                        </h1>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input 
                                    type="text" 
                                    value={searchTerm} 
                                    onChange={(e) => setSearchTerm(e.target.value)} 
                                    placeholder="Search problems..." 
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:ring-red-500 focus:border-red-500 focus:outline-none" 
                                />
                            </div>
                            <div className="relative">
                                <select 
                                    onChange={(e) => setSortOrder(e.target.value)} 
                                    value={sortOrder} 
                                    className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg bg-white focus:ring-red-500 focus:border-red-500 focus:outline-none"
                                >
                                    <option value="latest">Sort: Latest</option>
                                    <option value="difficulty">Sort: Difficulty</option>
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                    
                    {/* Topic Analysis */}
                    {companyFilter !== 'All' && topicWeightage.length > 0 && (
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
                             <h3 className="font-bold text-gray-800 mb-3">
                                Topic Analysis for {companyFilter}
                             </h3>
                             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3">
                                {topicWeightage.slice(0, 8).map(item => (
                                    <div key={item.topic}>
                                        <div className="flex justify-between items-baseline text-sm">
                                            <span className="text-gray-600 truncate">{item.topic}</span>
                                            <span className="font-bold text-gray-800 ml-2">{item.weight.toFixed(0)}%</span>
                                        </div>
                                        <div className="w-full bg-red-100 rounded-full h-1.5 mt-1">
                                            <div 
                                                className="bg-red-500 h-1.5 rounded-full transition-all duration-300" 
                                                style={{ width: `${Math.min(item.weight, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                             </div>
                        </div>
                    )}
                    
                    {/* Problems List */}
                    <div className="space-y-3">
                        {loading && (
                            <div className="text-center py-16">
                                <p className="text-lg text-gray-500">Loading problems...</p>
                            </div>
                        )}
                        {error && (
                            <div className="text-center py-16">
                                <p className="text-lg text-red-500">{error}</p>
                            </div>
                        )}
                        {!loading && !error && filteredProblems.length === 0 && (
                            <div className="text-center py-16">
                                <p className="text-lg text-gray-500">No problems match the current filters.</p>
                                <button 
                                    onClick={clearAllFilters}
                                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                        {!loading && !error && filteredProblems.map(problem => (
                            <div key={problem.id}>
                                <ProblemListItem 
                                    problem={problem} 
                                    onSelect={() => navigate(`/practice/${problem.id}`)} 
                                />
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PracticePage;