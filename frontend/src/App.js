
// import React, { useState, useEffect, useMemo } from 'react';
// import { Book, Code, Users, ArrowRight, Clock, BarChart3, CheckCircle, ArrowLeft, Search, Tag, Building, ChevronDown, ExternalLink, X } from 'lucide-react';

// // --- Main App Component ---
// const AlgoUniversityApp = () => {
//   const [currentPage, setCurrentPage] = useState('home');
//   const [selectedProblem, setSelectedProblem] = useState(null);
//   const [allProblems, setAllProblems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [interviewExperiences, setInterviewExperiences] = useState([]);
//   const [interviewLoading, setInterviewLoading] = useState(false);
//   // Sample data for demo purposes since we can't fetch actual files
//  // List of company JSON files to load
//   const companyFiles = [
//     'adobe', '', 'apple', 'google', 'microsoft','uber','de%20shaw','goldman','morgan%20stanley','nvidia','paypal','qualcomm','salesforce','service%20now','visa'
//     // Add more company names as needed based on your JSON files
//   ];
//     const companyFiles1 = [
//     'microsoft','google'
//     // Add more company names as needed based on your JSON files
//   ];
  
  

// const loadProblemsFromFiles = async () => {
//   const allProblemsData = [];
//   const seenTitles = new Set(); // Use title instead of URL
//   let idCounter = 1;

//   for (const company of companyFiles) {
//     try {
//       const response = await fetch(`/data/problems_${company}.json`);
//       if (response.ok) {
//         const data = await response.json();

//         const uniqueProblems = data.filter(problem => {
//           const title = problem.basic_info?.title?.trim();
//           if (title && !seenTitles.has(title)) {
//             seenTitles.add(title);
//             return true;
//           }
//           return false;
//         });

//         const problemsWithIds = uniqueProblems.map(problem => ({
//           ...problem,
//           id: idCounter++
//         }));

//         allProblemsData.push(...problemsWithIds);
//       }
//     } catch (error) {
//       console.warn(`Failed to load problems_${company}.json:`, error);
//     }
//   }

//   return allProblemsData;
// };
// // 2. Add this function to load interview experiences (add this after loadProblemsFromFiles function)
// const loadInterviewExperiences = async () => {
//   const allInterviewData = [];
//   setInterviewLoading(true);
  
//   for (const company of companyFiles1) {
//     if (!company) continue; // Skip empty strings
//     try {
//       const response = await fetch(`/data/interview_${company}.json`);
//       if (response.ok) {
//         const data = await response.json();
//         allInterviewData.push(...data.map(exp => ({ ...exp, id: `${company}_${Math.random()}` })));
//       }
//     } catch (error) {
//       console.warn(`Failed to load interview_${company}.json:`, error);
//     }
//   }
  
//   setInterviewExperiences(allInterviewData);
//   setInterviewLoading(false);
// };

//   useEffect(() => {
//     const loadData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const problems = await loadProblemsFromFiles();
//         setAllProblems(problems);
//       } catch (err) {
//         setError('Failed to load problems. Please check if JSON files are available.');
//         console.error('Error loading problems:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     loadData();
//   }, []);

//   const navigateTo = (page) => {
//     setCurrentPage(page);
//     setSelectedProblem(null);
//   };

//   const handleSelectProblem = (problem) => {
//     setSelectedProblem(problem);
//   };
  
//   const Navbar = () => (
//     <nav className="bg-white shadow-lg sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div 
//             onClick={() => {
//               setCurrentPage('home');
//               setSelectedProblem(null);
//             }}
//             className="flex items-center cursor-pointer"
//           >
//             <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center mr-3">
//               <Code className="w-5 h-5 text-white" />
//             </div>
//             <span className="text-xl font-bold text-gray-900">
//               Algo <span className="text-red-600">University</span>
//             </span>
//           </div>
//           <div className="flex items-center space-x-8">
//             <button 
//               onClick={() => {
//                 setCurrentPage('practice');
//                 setSelectedProblem(null);
//               }}
//               className={`font-medium transition-colors ${
//                 currentPage === 'practice' && !selectedProblem ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
//               }`}
//             >
//               Practice
//             </button>
//             <button 
//                 onClick={() => {
//                     setCurrentPage('interview-prep');
//                     setSelectedProblem(null);
//                 }}
//                 className={`font-medium transition-colors ${
//                     currentPage === 'interview-prep' && !selectedProblem ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
//                 }`}
//                 >
//                 Interview Prep
//             </button>
//             <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
//               Get Started
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans">
//     <Navbar />
//     {selectedProblem ? (
//       <ProblemDetailPage problem={selectedProblem} onBack={() => setSelectedProblem(null)} />
//     ) : currentPage === 'home' ? (
//       <HomePage navigateTo={navigateTo} />
//     ) : currentPage === 'interview-prep' ? (
//       <InterviewPrepPage 
//         interviewExperiences={interviewExperiences}
//         loading={interviewLoading}
//         onLoadExperiences={loadInterviewExperiences}
//       />
//     ) : (
//       <PracticePage 
//         allProblems={allProblems} 
//         loading={loading}
//         error={error}
//         onProblemSelect={handleSelectProblem} 
//       />
//     )}
//   </div>
//   );
// };

// const HomePage = ({ navigateTo }) => (
//     <div className="bg-gradient-to-br from-red-50 to-white">
//       <div className="relative overflow-hidden">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
//           <div className="text-center">
//             <div className="flex justify-center items-center mb-8">
//               <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mr-4">
//                 <Code className="w-8 h-8 text-white" />
//               </div>
//               <h1 className="text-5xl font-bold text-gray-900">Algo <span className="text-red-600">University</span></h1>
//             </div>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
//               Master algorithms and data structures with our comprehensive collection of coding problems. Practice with real interview questions from top tech companies and prepare yourself for success.
//             </p>
//             <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
//               <div onClick={() => navigateTo('practice')} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-red-200">
//                 <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-200 transition-colors">
//                   <Code className="w-6 h-6 text-red-600" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-4">Practice Coding</h3>
//                 <p className="text-gray-600 mb-6">Solve coding problems ranging from easy to hard difficulty levels. Build your problem-solving skills with step-by-step solutions.</p>
//                 <div className="flex items-center text-red-600 font-medium group-hover:text-red-700">
//                   Start Practicing <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
//                 </div>
//               </div>
//               <div onClick={() => navigateTo('interview-prep')} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-red-200 opacity-75">
//                 <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
//                   <Users className="w-6 h-6 text-red-600" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-4">Interview Preparation</h3>
//                 <p className="text-gray-600 mb-6">Prepare for technical interviews with curated questions from top companies. Practice behavioral and system design questions.</p>
//                  <div className="flex items-center text-red-600 font-medium group-hover:text-red-700">
//                   Start Practicing <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
//                 </div>
//                 {/* <div className="flex items-center text-gray-400 font-medium">Coming Soon <Clock className="w-4 h-4 ml-2" /></div> */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
// );

// // --- Fixed PracticePage with proper filtering ---
// const PracticePage = ({ allProblems, loading, error, onProblemSelect }) => {
//     const [companyFilter, setCompanyFilter] = useState('All');
//     const [topicFilter, setTopicFilter] = useState('All');
//     const [sortOrder, setSortOrder] = useState('latest');
//     const [searchTerm, setSearchTerm] = useState('');
//     const [showAllCompanies, setShowAllCompanies] = useState(false);
//     const [showAllTopics, setShowAllTopics] = useState(false);

//     // Fixed company and topic extraction
//     const companies = useMemo(() => {
//         const allCompanies = new Set();
//         allProblems.forEach(problem => {
//             if (problem.tags?.company_tags) {
//                 problem.tags.company_tags.forEach(tag => allCompanies.add(tag));
//             }
//         });
//         return ['All', ...Array.from(allCompanies).sort()];
//     }, [allProblems]);

//     const topics = useMemo(() => {
//         const allTopics = new Set();
//         allProblems.forEach(problem => {
//             if (problem.tags?.topic_tags) {
//                 problem.tags.topic_tags.forEach(tag => allTopics.add(tag));
//             }
//         });
//         return ['All', ...Array.from(allTopics).sort()];
//     }, [allProblems]);

//     // Fixed filtering logic
//     const filteredProblems = useMemo(() => {
//         let result = [...allProblems];

//         // Apply company filter
//         if (companyFilter !== 'All') {
//             result = result.filter(problem => 
//                 problem.tags?.company_tags?.includes(companyFilter)
//             );
//         }

//         // Apply topic filter
//         if (topicFilter !== 'All') {
//             result = result.filter(problem => 
//                 problem.tags?.topic_tags?.includes(topicFilter)
//             );
//         }

//         // Apply search filter
//         if (searchTerm.trim()) {
//             const searchLower = searchTerm.toLowerCase();
//             result = result.filter(problem => 
//                 problem.basic_info?.title?.toLowerCase().includes(searchLower)
//             );
//         }

//         // Apply sorting
//         if (sortOrder === 'latest') {
//             result.sort((a, b) => new Date(b.metadata?.scraped_at || 0) - new Date(a.metadata?.scraped_at || 0));
//         } else if (sortOrder === 'difficulty') {
//             const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
//             result.sort((a, b) => {
//                 const diffA = difficultyOrder[a.basic_info?.difficulty] || 0;
//                 const diffB = difficultyOrder[b.basic_info?.difficulty] || 0;
//                 return diffA - diffB;
//             });
//         }
        
//         return result;
//     }, [companyFilter, topicFilter, searchTerm, sortOrder, allProblems]);

//     // Fixed topic weightage calculation
//     const topicWeightage = useMemo(() => {
//         if (companyFilter === 'All') return [];
        
//         const companyProblems = allProblems.filter(problem => 
//             problem.tags?.company_tags?.includes(companyFilter)
//         );
        
//         if (companyProblems.length === 0) return [];
        
//         const topicCounts = {};
//         companyProblems.forEach(problem => {
//             if (problem.tags?.topic_tags) {
//                 problem.tags.topic_tags.forEach(topic => {
//                     topicCounts[topic] = (topicCounts[topic] || 0) + 1;
//                 });
//             }
//         });
        
//         return Object.entries(topicCounts)
//             .map(([topic, count]) => ({ 
//                 topic, 
//                 weight: (count / companyProblems.length) * 100 
//             }))
//             .sort((a, b) => b.weight - a.weight);
//     }, [allProblems, companyFilter]);

//     const companiesToShow = showAllCompanies ? companies.slice(1) : companies.slice(1, 6);
//     const topicsToShow = showAllTopics ? topics.slice(1) : topics.slice(1, 6);

//     const clearAllFilters = () => {
//         setCompanyFilter('All');
//         setTopicFilter('All');
//         setSearchTerm('');
//     };

//     return (
//         <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             <div className="flex flex-col lg:flex-row gap-8">
//                 {/* Left Sidebar - Fixed scrolling issues */}
//                 <aside className="w-full lg:w-1/4 xl:w-1/5">
//                     <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
//                         <h2 className="text-lg font-bold mb-4 text-gray-800 flex justify-between items-center">
//                             Filters
//                             <button onClick={clearAllFilters} className="text-xs font-semibold text-red-600 hover:underline">
//                                 CLEAR ALL
//                             </button>
//                         </h2>
//                         <div className="space-y-6">
//                             <div>
//                                 <h3 className="font-semibold mb-2 text-gray-700 text-sm uppercase">COMPANIES</h3>
//                                 <div className="space-y-1">
//                                     {companiesToShow.map(company => (
//                                         <button 
//                                             key={company} 
//                                             onClick={() => setCompanyFilter(company)} 
//                                             className={`w-full text-left p-2 rounded-md text-sm flex items-center gap-2 transition-colors ${
//                                                 companyFilter === company 
//                                                     ? 'bg-red-100 text-red-700 font-bold' 
//                                                     : 'hover:bg-gray-100 text-gray-700'
//                                             }`}
//                                         >
//                                             <input 
//                                                 type="checkbox" 
//                                                 readOnly 
//                                                 checked={companyFilter === company} 
//                                                 className="form-checkbox h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500" 
//                                             />
//                                             <span>{company}</span>
//                                         </button>
//                                     ))}
//                                     {companies.length > 7 && (
//                                         <button 
//                                             onClick={() => setShowAllCompanies(!showAllCompanies)} 
//                                             className="text-sm text-red-600 mt-2 font-semibold hover:underline"
//                                         >
//                                             {showAllCompanies ? 'View Less' : 'View All'}
//                                         </button>
//                                     )}
//                                 </div>
//                             </div>
//                             <div>
//                                 <h3 className="font-semibold mb-2 text-gray-700 text-sm uppercase">TOPICS</h3>
//                                 <div className="space-y-1">
//                                     {topicsToShow.map(topic => (
//                                         <button 
//                                             key={topic} 
//                                             onClick={() => setTopicFilter(topic)} 
//                                             className={`w-full text-left p-2 rounded-md text-sm flex items-center gap-2 transition-colors ${
//                                                 topicFilter === topic 
//                                                     ? 'bg-red-100 text-red-700 font-bold' 
//                                                     : 'hover:bg-gray-100 text-gray-700'
//                                             }`}
//                                         >
//                                             <input 
//                                                 type="checkbox" 
//                                                 readOnly 
//                                                 checked={topicFilter === topic} 
//                                                 className="form-checkbox h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500" 
//                                             />
//                                             <span>{topic}</span>
//                                         </button>
//                                     ))}
//                                     {topics.length > 7 && (
//                                         <button 
//                                             onClick={() => setShowAllTopics(!showAllTopics)} 
//                                             className="text-sm text-red-600 mt-2 font-semibold hover:underline"
//                                         >
//                                             {showAllTopics ? 'View Less' : 'View All'}
//                                         </button>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </aside>

//                 {/* Main Content Area */}
//                 <main className="w-full lg:w-3/4 xl:w-4/5">
//                     <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
//                         <h1 className="text-2xl font-bold text-gray-900">
//                             Popular Problems 
//                             {filteredProblems.length > 0 && (
//                                 <span className="text-lg font-normal text-gray-600 ml-2">
//                                     ({filteredProblems.length} problems)
//                                 </span>
//                             )}
//                         </h1>
//                         <div className="flex items-center gap-4">
//                             <div className="relative">
//                                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                                 <input 
//                                     type="text" 
//                                     value={searchTerm} 
//                                     onChange={(e) => setSearchTerm(e.target.value)} 
//                                     placeholder="Search problems..." 
//                                     className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:ring-red-500 focus:border-red-500 focus:outline-none" 
//                                 />
//                             </div>
//                             <div className="relative">
//                                 <select 
//                                     onChange={(e) => setSortOrder(e.target.value)} 
//                                     value={sortOrder} 
//                                     className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg bg-white focus:ring-red-500 focus:border-red-500 focus:outline-none"
//                                 >
//                                     <option value="latest">Sort: Latest</option>
//                                     <option value="difficulty">Sort: Difficulty</option>
//                                 </select>
//                                 <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
//                             </div>
//                         </div>
//                     </div>
                    
//                     {/* Topic Analysis */}
//                     {companyFilter !== 'All' && topicWeightage.length > 0 && (
//                         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
//                              <h3 className="font-bold text-gray-800 mb-3">
//                                 Topic Analysis for {companyFilter}
//                              </h3>
//                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3">
//                                 {topicWeightage.slice(0, 8).map(item => (
//                                     <div key={item.topic}>
//                                         <div className="flex justify-between items-baseline text-sm">
//                                             <span className="text-gray-600 truncate">{item.topic}</span>
//                                             <span className="font-bold text-gray-800 ml-2">{item.weight.toFixed(0)}%</span>
//                                         </div>
//                                         <div className="w-full bg-red-100 rounded-full h-1.5 mt-1">
//                                             <div 
//                                                 className="bg-red-500 h-1.5 rounded-full transition-all duration-300" 
//                                                 style={{ width: `${Math.min(item.weight, 100)}%` }}
//                                             ></div>
//                                         </div>
//                                     </div>
//                                 ))}
//                              </div>
//                         </div>
//                     )}
                    
//                     {/* Problems List */}
//                     <div className="space-y-3">
//                         {loading && (
//                             <div className="text-center py-16">
//                                 <p className="text-lg text-gray-500">Loading problems...</p>
//                             </div>
//                         )}
//                         {error && (
//                             <div className="text-center py-16">
//                                 <p className="text-lg text-red-500">{error}</p>
//                             </div>
//                         )}
//                         {!loading && !error && filteredProblems.length === 0 && (
//                             <div className="text-center py-16">
//                                 <p className="text-lg text-gray-500">No problems match the current filters.</p>
//                                 <button 
//                                     onClick={clearAllFilters}
//                                     className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//                                 >
//                                     Clear Filters
//                                 </button>
//                             </div>
//                         )}
//                         {!loading && !error && filteredProblems.map(problem => (
//                             <ProblemListItem 
//                                 key={problem.id} 
//                                 problem={problem} 
//                                 onSelect={() => onProblemSelect(problem)} 
//                             />
//                         ))}
//                     </div>
//                 </main>
//             </div>
//         </div>
//     );
// };

// const ProblemListItem = ({ problem, onSelect }) => {
//     const difficultyColor = {
//         'Easy': 'text-green-700 bg-green-100',
//         'Medium': 'text-yellow-700 bg-yellow-100',
//         'Hard': 'text-red-700 bg-red-100',
//     };
//     const difficulty = problem.basic_info?.difficulty || 'N/A';

//     return (
//         <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-red-400 hover:shadow-md transition-all duration-200 flex items-center gap-4 cursor-pointer" onClick={onSelect}>
//             <CheckCircle className="w-6 h-6 text-gray-300 flex-shrink-0" />
//             <div className="flex-grow min-w-0">
//                 <h3 className="font-semibold text-gray-800 hover:text-red-600 truncate">
//                     {problem.basic_info?.title || 'Unknown Title'}
//                 </h3>
//                 <div className="flex items-center flex-wrap gap-x-3 text-sm text-gray-500 mt-1">
//                     {problem.tags?.company_tags?.slice(0, 2).map(tag => (
//                         <span key={tag}>{tag}</span>
//                     ))}
//                     {problem.tags?.company_tags?.length > 2 && (
//                         <span className="text-red-600 font-medium">
//                             + {problem.tags.company_tags.length - 2} more
//                         </span>
//                     )}
//                 </div>
//             </div>
//             <div className={`px-3 py-1 rounded-full text-xs font-semibold hidden sm:block ${difficultyColor[difficulty] || 'text-gray-600 bg-gray-100'}`}>
//                 {difficulty}
//             </div>
//             <div className="text-sm text-gray-500 hidden md:block whitespace-nowrap">{problem.basic_info?.submissions}</div>
//             <div className="text-sm text-gray-500 hidden lg:block whitespace-nowrap">{problem.basic_info?.accuracy}</div>
//             <button 
//                 onClick={(e) => { e.stopPropagation(); onSelect(); }} 
//                 className="bg-red-50 text-red-700 font-semibold px-6 py-2 rounded-lg hover:bg-red-100 transition-colors whitespace-nowrap"
//             >
//                 Solve
//             </button>
//         </div>
//     );
// };

// // --- NEW: Upgraded ProblemDetailPage to match your screenshots and JSON structure ---
// const ProblemDetailPage = ({ problem, onBack }) => {
//     const formatProblemStatement = (text) => {
//         if (!text) return null;
//         return text.split('\n').map((line, index) => {
//             if (line.toLowerCase().startsWith('input:') || line.toLowerCase().startsWith('output:') || line.toLowerCase().startsWith('explanation:')) {
//                 const [key, ...value] = line.split(':');
//                 return <p key={index} className="mb-2"><strong className="font-semibold text-gray-800">{key}:</strong><code className="ml-2 bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-base">{value.join(':').trim()}</code></p>
//             }
//              if (line.toLowerCase().startsWith('examples:') || line.toLowerCase().startsWith('constraints:')) {
//                  return <h4 key={index} className="font-bold text-xl mt-6 mb-2 text-gray-800">{line}</h4>
//              }
//             return <p key={index} className="mb-4">{line}</p>;
//         });
//     };

//     return (
//       <div className="bg-white min-h-screen">
//         <div className="max-w-screen-xl mx-auto px-4 py-8">
//             <div className="grid lg:grid-cols-2 gap-8">
//                 {/* Problem Description */}
//                 <div className="p-2 lg:p-4">
//                      <button onClick={onBack} className="flex items-center text-gray-600 hover:text-gray-900 font-semibold mb-6">
//                         <ArrowLeft className="mr-2" size={18}/>
//                         Back to Problems
//                     </button>
//                     <div className="flex items-start justify-between mb-4">
//                         <h1 className="text-3xl font-bold text-gray-900">{problem.basic_info?.title}</h1>
//                         <CheckCircle className="text-green-500 flex-shrink-0" size={28}/>
//                     </div>
//                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-600 mb-6 pb-6 border-b border-gray-200">
//                         <span className={`font-medium ${problem.basic_info?.difficulty === 'Easy' ? 'text-green-600' : problem.basic_info?.difficulty === 'Medium' ? 'text-yellow-600' : 'text-red-600'}`}>{problem.basic_info?.difficulty}</span>
//                         <span>Accuracy: <strong>{problem.basic_info?.accuracy}</strong></span>
//                         <span>Submissions: <strong>{problem.basic_info?.submissions}</strong></span>
//                     </div>
//                     <div className="prose prose-lg max-w-none text-gray-700">
//                         {formatProblemStatement(problem.content?.problem)}
//                     </div>
//                      {/* FIX: Tags and Experiences were missing, now added */}
//                     <div className="mt-8 pt-6 border-t border-gray-200">
//                         <h3 className="text-lg font-semibold mb-3 text-gray-800">Company Tags</h3>
//                         <div className="flex flex-wrap gap-2">
//                             {problem.tags?.company_tags?.map(tag => (
//                                 <span key={tag} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">{tag}</span>
//                             ))}
//                         </div>
//                     </div>
//                      <div className="mt-6">
//                         <h3 className="text-lg font-semibold mb-3 text-gray-800">Topic Tags</h3>
//                         <div className="flex flex-wrap gap-2">
//                             {problem.tags?.topic_tags?.map(tag => (
//                                 <span key={tag} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">{tag}</span>
//                             ))}
//                         </div>
//                     </div>
//                     {problem.interview_experiences && problem.interview_experiences.length > 0 && (
//                         <div className="mt-8 pt-6 border-t border-gray-200">
//                             <h3 className="text-lg font-semibold mb-4 text-gray-800">Related Interview Experiences</h3>
//                             <ul className="space-y-3">
//                                 {problem.interview_experiences.map((exp, i) => (
//                                     <li key={i}>
//                                         <a href={exp.url} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline flex items-center">
//                                             {exp.title}
//                                             <ExternalLink className="ml-2" size={14}/>
//                                         </a>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     )}
//                 </div>

//                 {/* Code Editor */}
//                 <div className="bg-gray-900 rounded-xl shadow-2xl flex flex-col h-[85vh] sticky top-24">
//                     <div className="flex-shrink-0 p-3 flex items-center justify-between bg-gray-800 rounded-t-xl">
//                         <div className="flex items-center gap-2">
//                              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
//                              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
//                              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
//                         </div>
//                         <select className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 text-sm focus:outline-none">
//                             <option>C++</option>
//                             <option>Java</option>
//                             <option>Python</option>
//                         </select>
//                     </div>
//                     <div className="flex-grow p-4 text-gray-300 font-mono text-sm leading-relaxed overflow-auto">
//                         <pre><code>
// {`class Solution {
// public:
//     // Function to find the maximum sum of a contiguous subarray.
//     long long maxSubarraySum(int arr[], int n) {
        
//         long long max_so_far = -1e18; // Represents negative infinity
//         long long max_ending_here = 0;
        
//         for (int i = 0; i < n; i++) {
//             max_ending_here = max_ending_here + arr[i];
//             if (max_so_far < max_ending_here) {
//                 max_so_far = max_ending_here;
//             }
//             if (max_ending_here < 0) {
//                 max_ending_here = 0;
//             }
//         }
//         return max_so_far;
//     }
// };`}
//                         </code></pre>
//                     </div>
//                     <div className="flex-shrink-0 p-3 bg-gray-800 rounded-b-xl flex items-center justify-end gap-3">
//                          <button className="text-white font-semibold hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors">Custom Input</button>
//                          <button className="text-white font-semibold bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-lg transition-colors">Compile & Run</button>
//                          <button className="text-white font-bold bg-green-600 hover:bg-green-500 px-5 py-2 rounded-lg transition-colors">Submit</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//       </div>
//     );
// };
// const InterviewPrepPage = ({ interviewExperiences, loading, onLoadExperiences }) => {
//   const [selectedSource, setSelectedSource] = useState(null);
  
//   useEffect(() => {
//     if (selectedSource === 'glassdoor' && interviewExperiences.length === 0 && !loading) {
//       onLoadExperiences();
//     }
//   }, [selectedSource, interviewExperiences.length, loading, onLoadExperiences]);

//   if (selectedSource) {
//     return (
//       <InterviewExperiencesPage 
//         source={selectedSource}
//         experiences={interviewExperiences}
//         loading={loading}
//         onBack={() => setSelectedSource(null)}
//       />
//     );
//   }

//   return (
//     <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//       <div className="text-center mb-12">
//         <h1 className="text-4xl font-bold text-gray-900 mb-4">Interview Preparation</h1>
//         <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//           Prepare for your next technical interview with real experiences and insights from candidates at top companies.
//         </p>
//       </div>

//       <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
//         <div 
//           onClick={() => setSelectedSource('glassdoor')}
//           className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-green-200"
//         >
//           <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
//             <Building className="w-6 h-6 text-green-600" />
//           </div>
//           <h3 className="text-2xl font-bold text-gray-900 mb-4">Glassdoor Reviews</h3>
//           <p className="text-gray-600 mb-6">Real interview experiences and reviews from candidates who interviewed at top tech companies.</p>
//           <div className="flex items-center text-green-600 font-medium group-hover:text-green-700">
//             Explore Reviews <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
//           </div>
//         </div>

//         <div 
//           onClick={() => setSelectedSource('medium')}
//           className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-blue-200"
//         >
//           <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
//             <Book className="w-6 h-6 text-blue-600" />
//           </div>
//           <h3 className="text-2xl font-bold text-gray-900 mb-4">Medium Articles</h3>
//           <p className="text-gray-600 mb-6">In-depth interview preparation articles and experiences shared by software engineers.</p>
//           <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
//             Read Articles <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
//           </div>
//         </div>

//         <div 
//           onClick={() => setSelectedSource('leetcode')}
//           className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-orange-200"
//         >
//           <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-200 transition-colors">
//             <Users className="w-6 h-6 text-orange-600" />
//           </div>
//           <h3 className="text-2xl font-bold text-gray-900 mb-4">LeetCode Discussions</h3>
//           <p className="text-gray-600 mb-6">Community discussions and interview experiences from LeetCode's discussion forums.</p>
//           <div className="flex items-center text-orange-600 font-medium group-hover:text-orange-700">
//             View Discussions <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const InterviewExperiencesPage = ({ source, experiences, loading, onBack }) => {
//   const [companyFilter, setCompanyFilter] = useState('All');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedExperience, setSelectedExperience] = useState(null);

//   // Get unique companies from experiences
//   const companies = useMemo(() => {
//     if (source === 'glassdoor') {
//       const uniqueCompanies = [...new Set(experiences.map(exp => exp.company).filter(Boolean))];
//       return ['All', ...uniqueCompanies.sort()];
//     }
//     // For Medium and LeetCode, use dummy companies for now
//     return ['All', 'Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Tesla', 'Netflix'];
//   }, [experiences, source]);

//   // Filter experiences based on filters
//   const filteredExperiences = useMemo(() => {
//     if (source !== 'glassdoor') {
//       // Return dummy data for Medium and LeetCode
//       return generateDummyExperiences(source, companyFilter, searchTerm);
//     }

//     let result = [...experiences];
    
//     if (companyFilter !== 'All') {
//       result = result.filter(exp => exp.company === companyFilter);
//     }
    
//     if (searchTerm.trim()) {
//       const searchLower = searchTerm.toLowerCase();
//       result = result.filter(exp => 
//         exp.position?.toLowerCase().includes(searchLower) ||
//         exp.interview_process?.toLowerCase().includes(searchLower) ||
//         exp.company?.toLowerCase().includes(searchLower)
//       );
//     }
    
//     return result;
//   }, [experiences, companyFilter, searchTerm, source]);

//   if (selectedExperience) {
//     return (
//       <InterviewExperienceDetail 
//         experience={selectedExperience} 
//         onBack={() => setSelectedExperience(null)}
//         source={source}
//       />
//     );
//   }

//   const sourceConfig = {
//     glassdoor: { title: 'Glassdoor Reviews', color: 'green', icon: Building },
//     medium: { title: 'Medium Articles', color: 'blue', icon: Book },
//     leetcode: { title: 'LeetCode Discussions', color: 'orange', icon: Users }
//   };

//   const config = sourceConfig[source];
//   const IconComponent = config.icon;

//   return (
//     <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <button onClick={onBack} className="flex items-center text-gray-600 hover:text-gray-900 font-semibold mb-6">
//         <ArrowLeft className="mr-2" size={18}/>
//         Back to Interview Prep
//       </button>

//       <div className="flex items-center gap-4 mb-8">
//         <div className={`w-12 h-12 bg-${config.color}-100 rounded-xl flex items-center justify-center`}>
//           <IconComponent className={`w-6 h-6 text-${config.color}-600`} />
//         </div>
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">{config.title}</h1>
//           <p className="text-gray-600">{filteredExperiences.length} experiences available</p>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
//         <div className="flex flex-wrap items-center gap-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input 
//               type="text" 
//               value={searchTerm} 
//               onChange={(e) => setSearchTerm(e.target.value)} 
//               placeholder="Search experiences..." 
//               className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:ring-red-500 focus:border-red-500 focus:outline-none" 
//             />
//           </div>
//           <select 
//             value={companyFilter} 
//             onChange={(e) => setCompanyFilter(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 focus:outline-none"
//           >
//             {companies.map(company => (
//               <option key={company} value={company}>{company}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Experiences List */}
//       <div className="space-y-4">
//         {loading && (
//           <div className="text-center py-16">
//             <p className="text-lg text-gray-500">Loading experiences...</p>
//           </div>
//         )}
        
//         {!loading && filteredExperiences.length === 0 && (
//           <div className="text-center py-16">
//             <p className="text-lg text-gray-500">No experiences match the current filters.</p>
//           </div>
//         )}
        
//         {!loading && filteredExperiences.map((experience, index) => (
//           <ExperienceCard 
//             key={experience.id || index}
//             experience={experience} 
//             source={source}
//             onClick={() => setSelectedExperience(experience)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// const ExperienceCard = ({ experience, source, onClick }) => {
//   const getOutcomeColor = (outcome) => {
//     if (!outcome) return 'bg-gray-100 text-gray-600';
//     const outcomeStr = Array.isArray(outcome) ? outcome.join(', ') : outcome;
//     if (outcomeStr.toLowerCase().includes('offer')) return 'bg-green-100 text-green-700';
//     if (outcomeStr.toLowerCase().includes('positive')) return 'bg-blue-100 text-blue-700';
//     if (outcomeStr.toLowerCase().includes('difficult')) return 'bg-red-100 text-red-700';
//     return 'bg-gray-100 text-gray-600';
//   };

//   return (
//     <div 
//       onClick={onClick}
//       className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-red-400 hover:shadow-md transition-all duration-200 cursor-pointer"
//     >
//       <div className="flex items-start justify-between mb-3">
//         <div>
//           <h3 className="text-lg font-semibold text-gray-900">
//             {experience.position || experience.title || 'Software Engineer'}
//           </h3>
//           <p className="text-gray-600">{experience.company || 'Tech Company'}</p>
//         </div>
//         <div className="flex items-center gap-2">
//           {experience.experience_outcome && (
//             <span className={`px-3 py-1 rounded-full text-xs font-medium ${getOutcomeColor(experience.experience_outcome)}`}>
//               {Array.isArray(experience.experience_outcome) 
//                 ? experience.experience_outcome[0] 
//                 : experience.experience_outcome}
//             </span>
//           )}
//           <span className="text-sm text-gray-500">{experience.date}</span>
//         </div>
//       </div>
      
//       <p className="text-gray-700 mb-4 line-clamp-2">
//         {experience.interview_process || experience.summary || 'Click to read the full interview experience and preparation tips.'}
//       </p>
      
//       {experience.interview_questions && experience.interview_questions.length > 0 && (
//         <div className="flex items-center gap-2 text-sm text-gray-500">
//           <span className="font-medium">Sample Question:</span>
//           <span className="italic">"{experience.interview_questions[0]}"</span>
//         </div>
//       )}
//     </div>
//   );
// };

// const InterviewExperienceDetail = ({ experience, onBack, source }) => {
//   return (
//     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <button onClick={onBack} className="flex items-center text-gray-600 hover:text-gray-900 font-semibold mb-6">
//         <ArrowLeft className="mr-2" size={18}/>
//         Back to Experiences
//       </button>

//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
//         <div className="mb-6">
//           <h1 className="text-2xl font-bold text-gray-900 mb-2">
//             {experience.position || experience.title || 'Interview Experience'}
//           </h1>
//           <div className="flex items-center gap-4 text-gray-600">
//             <span className="font-medium">{experience.company}</span>
//             <span>•</span>
//             <span>{experience.date}</span>
//             {experience.experience_outcome && (
//               <>
//                 <span>•</span>
//                 <span className="font-medium">
//                   {Array.isArray(experience.experience_outcome) 
//                     ? experience.experience_outcome.join(', ') 
//                     : experience.experience_outcome}
//                 </span>
//               </>
//             )}
//           </div>
//         </div>

//         <div className="space-y-6">
//           {experience.application_process && (
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">Application Process</h3>
//               <p className="text-gray-700">{experience.application_process}</p>
//             </div>
//           )}

//           {experience.interview_process && (
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">Interview Process</h3>
//               <p className="text-gray-700">{experience.interview_process}</p>
//             </div>
//           )}

//           {experience.interview_questions && experience.interview_questions.length > 0 && (
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">Interview Questions</h3>
//               <ul className="space-y-2">
//                 {experience.interview_questions.map((question, index) => (
//                   <li key={index} className="bg-gray-50 p-3 rounded-lg">
//                     <span className="text-gray-700">"{question}"</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {experience.content && (
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">Full Experience</h3>
//               <div className="prose max-w-none text-gray-700">
//                 {experience.content.split('\n').map((paragraph, index) => (
//                   <p key={index} className="mb-3">{paragraph}</p>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
// // Helper function for dummy data (Medium and LeetCode)
// const generateDummyExperiences = (source, companyFilter, searchTerm) => {
//   const dummyData = {
//     medium: [
//       {
//         id: 'medium_1',
//         title: 'How I Cracked Google SWE Interview',
//         company: 'Google',
//         date: '2024-01-15',
//         summary: 'A comprehensive guide on my Google software engineer interview experience, including preparation strategy and actual questions asked.',
//         content: 'Detailed article content here...'
//       },
//       // Add more dummy Medium articles
//     ],
//     leetcode: [
//       {
//         id: 'leetcode_1',
//         title: 'Microsoft New Grad 2024 Experience',
//         company: 'Microsoft',
//         date: '2024-02-10',
//         summary: 'Sharing my Microsoft new grad interview experience with leetcode-style questions and behavioral rounds.',
//         content: 'Discussion content here...'
//       },
//       // Add more dummy LeetCode discussions
//     ]
//   };

//   let result = dummyData[source] || [];
  
//   if (companyFilter !== 'All') {
//     result = result.filter(exp => exp.company === companyFilter);
//   }
  
//   if (searchTerm.trim()) {
//     const searchLower = searchTerm.toLowerCase();
//     result = result.filter(exp => 
//       exp.title?.toLowerCase().includes(searchLower) ||
//       exp.summary?.toLowerCase().includes(searchLower) ||
//       exp.company?.toLowerCase().includes(searchLower)
//     );
//   }
  
//   return result;
// };

// // --- Your Original Footer Component (Unchanged) ---
// const Footer = () => {
//     return (
//         <footer className="bg-white border-t border-gray-200 mt-16">
//             <div className="container mx-auto py-8 px-4 text-center text-gray-600">
//                 <p>&copy; {new Date().getFullYear()} Algo University. A project designed to accelerate your interview prep.</p>
//                 <p className="text-sm mt-2">All questions are sourced from public collections for educational purposes.</p>
//             </div>
//         </footer>
//     );
// }

// export default AlgoUniversityApp;









import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import PracticePage from "./components/PracticePage";
import ProblemDetailPage from "./components/ProblemDetailPage";
import InterviewPrepPage from "./components/InterviewPrepPage";
import Footer from "./components/Footer";
import { loadProblemsFromFiles, loadInterviewExperiences } from "./utils/dataLoaders";
import Login from "./components/Login";
import Signup from "./components/Signup";

import ProtectedRoute from "./components/ProtectedRoute";
const companyFiles = [
  "adobe", "apple", "google", "microsoft", "uber", "de%20shaw", "goldman", "morgan%20stanley", "nvidia", "paypal", "qualcomm", "salesforce", "service%20now", "visa"
];
const companyFiles1 = ["microsoft", "google"];

const App = () => {
  const [allProblems, setAllProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [interviewExperiences, setInterviewExperiences] = useState([]);
  const [interviewLoading, setInterviewLoading] = useState(false);

  useEffect(() => {
    const fetchProblems = async () => {
      setLoading(true);
      setError(null);
      try {
        const problems = await loadProblemsFromFiles(companyFiles);
        setAllProblems(problems);
      } catch (err) {
        setError("Failed to load problems. Please check if JSON files are available.");
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  const handleLoadInterviewExperiences = async () => {
    setInterviewLoading(true);
    try {
      const experiences = await loadInterviewExperiences(companyFiles1);
      setInterviewExperiences(experiences);
    } catch (err) {
      // Optionally handle error
    } finally {
      setInterviewLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                  path="/practice"
                  element={
                    <PracticePage
                      allProblems={allProblems}
                      loading={loading}
                      error={error}
                    />
                  }
                />
                <Route
                  path="/practice/:id"
                  element={
                    <ProblemDetailPage allProblems={allProblems} />
                  }
                />
                <Route
                  path="/interview-prep"
                  element={
                    <InterviewPrepPage
                      interviewExperiences={interviewExperiences}
                      loading={interviewLoading}
                      onLoadExperiences={handleLoadInterviewExperiences}
                    />
                  }
                />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;