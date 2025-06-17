import React, { useState, useMemo } from "react";
import InterviewExperienceDetail from "./InterviewExperienceDetail";
import { Search, ArrowLeft, Book, Building, Users } from "lucide-react";

const InterviewExperiencesPage = ({ source, experiences, loading, onBack }) => {
  const [companyFilter, setCompanyFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExperience, setSelectedExperience] = useState(null);

  // Get unique companies from experiences
  const companies = useMemo(() => {
    if (source === 'glassdoor') {
      const uniqueCompanies = [...new Set(experiences.map(exp => exp.company).filter(Boolean))];
      return ['All', ...uniqueCompanies.sort()];
    }
    // For Medium and LeetCode, use dummy companies for now
    return ['All', 'Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Tesla', 'Netflix'];
  }, [experiences, source]);

  // Filter experiences based on filters
  const filteredExperiences = useMemo(() => {
    if (source !== 'glassdoor') {
      // Return dummy data for Medium and LeetCode
      return generateDummyExperiences(source, companyFilter, searchTerm);
    }

    let result = [...experiences];
    
    if (companyFilter !== 'All') {
      result = result.filter(exp => exp.company === companyFilter);
    }
    
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(exp => 
        exp.position?.toLowerCase().includes(searchLower) ||
        exp.interview_process?.toLowerCase().includes(searchLower) ||
        exp.company?.toLowerCase().includes(searchLower)
      );
    }
    
    return result;
  }, [experiences, companyFilter, searchTerm, source]);

  if (selectedExperience) {
    return (
      <InterviewExperienceDetail 
        experience={selectedExperience} 
        onBack={() => setSelectedExperience(null)}
        source={source}
      />
    );
  }

  const sourceConfig = {
    glassdoor: { title: 'Glassdoor Reviews', color: 'green', icon: Building },
    medium: { title: 'Medium Articles', color: 'blue', icon: Book },
    leetcode: { title: 'LeetCode Discussions', color: 'orange', icon: Users }
  };

  const config = sourceConfig[source];
  const IconComponent = config.icon;

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={onBack} className="flex items-center text-gray-600 hover:text-gray-900 font-semibold mb-6">
        <ArrowLeft className="mr-2" size={18}/>
        Back to Interview Prep
      </button>

      <div className="flex items-center gap-4 mb-8">
        <div className={`w-12 h-12 bg-${config.color}-100 rounded-xl flex items-center justify-center`}>
          <IconComponent className={`w-6 h-6 text-${config.color}-600`} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{config.title}</h1>
          <p className="text-gray-600">{filteredExperiences.length} experiences available</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              placeholder="Search experiences..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:ring-red-500 focus:border-red-500 focus:outline-none" 
            />
          </div>
          <select 
            value={companyFilter} 
            onChange={(e) => setCompanyFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 focus:outline-none"
          >
            {companies.map(company => (
              <option key={company} value={company}>{company}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Experiences List */}
      <div className="space-y-4">
        {loading && (
          <div className="text-center py-16">
            <p className="text-lg text-gray-500">Loading experiences...</p>
          </div>
        )}
        
        {!loading && filteredExperiences.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-gray-500">No experiences match the current filters.</p>
          </div>
        )}
        
        {!loading && filteredExperiences.map((experience, index) => (
          <ExperienceCard 
            key={experience.id || index}
            experience={experience} 
            source={source}
            onClick={() => setSelectedExperience(experience)}
          />
        ))}
      </div>
    </div>
  );
};

const ExperienceCard = ({ experience, source, onClick }) => {
  const getOutcomeColor = (outcome) => {
    if (!outcome) return 'bg-gray-100 text-gray-600';
    const outcomeStr = Array.isArray(outcome) ? outcome.join(', ') : outcome;
    if (outcomeStr.toLowerCase().includes('offer')) return 'bg-green-100 text-green-700';
    if (outcomeStr.toLowerCase().includes('positive')) return 'bg-blue-100 text-blue-700';
    if (outcomeStr.toLowerCase().includes('difficult')) return 'bg-red-100 text-red-700';
    return 'bg-gray-100 text-gray-600';
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-red-400 hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {experience.position || experience.title || 'Software Engineer'}
          </h3>
          <p className="text-gray-600">{experience.company || 'Tech Company'}</p>
        </div>
        <div className="flex items-center gap-2">
          {experience.experience_outcome && (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getOutcomeColor(experience.experience_outcome)}`}>
              {Array.isArray(experience.experience_outcome) 
                ? experience.experience_outcome[0] 
                : experience.experience_outcome}
            </span>
          )}
          <span className="text-sm text-gray-500">{experience.date}</span>
        </div>
      </div>
      
      <p className="text-gray-700 mb-4 line-clamp-2">
        {experience.interview_process || experience.summary || 'Click to read the full interview experience and preparation tips.'}
      </p>
      
      {experience.interview_questions && experience.interview_questions.length > 0 && (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="font-medium">Sample Question:</span>
          <span className="italic">"{experience.interview_questions[0]}"</span>
        </div>
      )}
    </div>
  );
};
const generateDummyExperiences = (source, companyFilter, searchTerm) => {
  const dummyData = {
    medium: [
      {
        id: 'medium_1',
        title: 'How I Cracked Google SWE Interview',
        company: 'Google',
        date: '2024-01-15',
        summary: 'A comprehensive guide on my Google software engineer interview experience, including preparation strategy and actual questions asked.',
        content: 'Detailed article content here...'
      },
      // Add more dummy Medium articles
    ],
    leetcode: [
      {
        id: 'leetcode_1',
        title: 'Microsoft New Grad 2024 Experience',
        company: 'Microsoft',
        date: '2024-02-10',
        summary: 'Sharing my Microsoft new grad interview experience with leetcode-style questions and behavioral rounds.',
        content: 'Discussion content here...'
      },
      // Add more dummy LeetCode discussions
    ]
  };

  let result = dummyData[source] || [];
  
  if (companyFilter !== 'All') {
    result = result.filter(exp => exp.company === companyFilter);
  }
  
  if (searchTerm.trim()) {
    const searchLower = searchTerm.toLowerCase();
    result = result.filter(exp => 
      exp.title?.toLowerCase().includes(searchLower) ||
      exp.summary?.toLowerCase().includes(searchLower) ||
      exp.company?.toLowerCase().includes(searchLower)
    );
  }
  
  return result;
};
export default InterviewExperiencesPage;