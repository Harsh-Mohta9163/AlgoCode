import React from "react";
import { ArrowLeft } from "lucide-react";

const InterviewExperienceDetail = ({ experience, onBack, source }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={onBack} className="flex items-center text-gray-600 hover:text-gray-900 font-semibold mb-6">
        <ArrowLeft className="mr-2" size={18}/>
        Back to Experiences
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {experience.position || experience.title || 'Interview Experience'}
          </h1>
          <div className="flex items-center gap-4 text-gray-600">
            <span className="font-medium">{experience.company}</span>
            <span>•</span>
            <span>{experience.date}</span>
            {experience.experience_outcome && (
              <>
                <span>•</span>
                <span className="font-medium">
                  {Array.isArray(experience.experience_outcome) 
                    ? experience.experience_outcome.join(', ') 
                    : experience.experience_outcome}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {experience.application_process && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Application Process</h3>
              <p className="text-gray-700">{experience.application_process}</p>
            </div>
          )}

          {experience.interview_process && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Interview Process</h3>
              <p className="text-gray-700">{experience.interview_process}</p>
            </div>
          )}

          {experience.interview_questions && experience.interview_questions.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Interview Questions</h3>
              <ul className="space-y-2">
                {experience.interview_questions.map((question, index) => (
                  <li key={index} className="bg-gray-50 p-3 rounded-lg">
                    <span className="text-gray-700">"{question}"</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {experience.content && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Full Experience</h3>
              <div className="prose max-w-none text-gray-700">
                {experience.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-3">{paragraph}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewExperienceDetail;