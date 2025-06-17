import React, { useState, useEffect } from "react";
import { ArrowRight, Building, Book, Users } from "lucide-react";
import InterviewExperiencesPage from "./InterviewExperiencesPage";

const InterviewPrepPage = ({ interviewExperiences, loading, onLoadExperiences }) => {
  const [selectedSource, setSelectedSource] = useState(null);

  useEffect(() => {
    if (selectedSource === 'glassdoor' && interviewExperiences.length === 0 && !loading) {
      onLoadExperiences();
    }
  }, [selectedSource, interviewExperiences.length, loading, onLoadExperiences]);

  if (selectedSource) {
    return (
      <InterviewExperiencesPage
        source={selectedSource}
        experiences={interviewExperiences}
        loading={loading}
        onBack={() => setSelectedSource(null)}
      />
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Interview Preparation</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Prepare for your next technical interview with real experiences and insights from candidates at top companies.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div 
          onClick={() => setSelectedSource('glassdoor')}
          className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-green-200"
        >
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
            <Building className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Glassdoor Reviews</h3>
          <p className="text-gray-600 mb-6">Real interview experiences and reviews from candidates who interviewed at top tech companies.</p>
          <div className="flex items-center text-green-600 font-medium group-hover:text-green-700">
            Explore Reviews <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <div 
          onClick={() => setSelectedSource('medium')}
          className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-blue-200"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
            <Book className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Medium Articles</h3>
          <p className="text-gray-600 mb-6">In-depth interview preparation articles and experiences shared by software engineers.</p>
          <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
            Read Articles <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <div 
          onClick={() => setSelectedSource('leetcode')}
          className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-orange-200"
        >
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-200 transition-colors">
            <Users className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">LeetCode Discussions</h3>
          <p className="text-gray-600 mb-6">Community discussions and interview experiences from LeetCode's discussion forums.</p>
          <div className="flex items-center text-orange-600 font-medium group-hover:text-orange-700">
            View Discussions <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPrepPage;