import React from "react";
import { useNavigate } from "react-router-dom";
import { Code, ArrowRight, Users } from "lucide-react";
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-br from-red-50 to-white">
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center">
            <div className="flex justify-center items-center mb-8">
              <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mr-4">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-gray-900">Algo <span className="text-red-600">University</span></h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Master algorithms and data structures with our comprehensive collection of coding problems. Practice with real interview questions from top tech companies and prepare yourself for success.
            </p>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
              <div onClick={() => navigate('/practice')} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-red-200">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-200 transition-colors">
                  <Code className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Practice Coding</h3>
                <p className="text-gray-600 mb-6">Solve coding problems ranging from easy to hard difficulty levels. Build your problem-solving skills with step-by-step solutions.</p>
                <div className="flex items-center text-red-600 font-medium group-hover:text-red-700">
                  Start Practicing <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              <div onClick={() => navigate('/interview-prep')} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-red-200 opacity-75">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Interview Preparation</h3>
                <p className="text-gray-600 mb-6">Prepare for technical interviews with curated questions from top companies. Practice behavioral and system design questions.</p>
                 <div className="flex items-center text-red-600 font-medium group-hover:text-red-700">
                  Start Practicing <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;