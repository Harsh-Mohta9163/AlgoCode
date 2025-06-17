import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle, ArrowLeft, ExternalLink } from "lucide-react";

const ProblemDetailPage = ({ allProblems }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const problem = allProblems.find((p) => String(p.id) === id);

  if (!problem) return <div>Problem not found.</div>;

  const formatProblemStatement = (text) => {
    if (!text) return null;
    return text.split("\n").map((line, index) => {
      if (
        line.toLowerCase().startsWith("input:") ||
        line.toLowerCase().startsWith("output:") ||
        line.toLowerCase().startsWith("explanation:")
      ) {
        const [key, ...value] = line.split(":");
        return (
          <p key={index} className="mb-2">
            <strong className="font-semibold text-gray-800">{key}:</strong>
            <code className="ml-2 bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-base">
              {value.join(":").trim()}
            </code>
          </p>
        );
      }
      if (
        line.toLowerCase().startsWith("examples:") ||
        line.toLowerCase().startsWith("constraints:")
      ) {
        return (
          <h4 key={index} className="font-bold text-xl mt-6 mb-2 text-gray-800">
            {line}
          </h4>
        );
      }
      return <p key={index} className="mb-4">{line}</p>;
    });
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Problem Description */}
          <div className="p-2 lg:p-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900 font-semibold mb-6"
            >
              <ArrowLeft className="mr-2" size={18} />
              Back to Problems
            </button>
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900">
                {problem.basic_info?.title}
              </h1>
              <CheckCircle className="text-green-500 flex-shrink-0" size={28} />
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-600 mb-6 pb-6 border-b border-gray-200">
              <span
                className={`font-medium ${
                  problem.basic_info?.difficulty === "Easy"
                    ? "text-green-600"
                    : problem.basic_info?.difficulty === "Medium"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {problem.basic_info?.difficulty}
              </span>
              <span>
                Accuracy:{" "}
                <strong>{problem.basic_info?.accuracy}</strong>
              </span>
              <span>
                Submissions:{" "}
                <strong>{problem.basic_info?.submissions}</strong>
              </span>
            </div>
            <div className="prose prose-lg max-w-none text-gray-700">
              {formatProblemStatement(problem.content?.problem)}
            </div>
            {/* FIX: Tags and Experiences were missing, now added */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Company Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {problem.tags?.company_tags?.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Topic Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {problem.tags?.topic_tags?.map((tag) => (
                  <span
                    key={tag}
                    className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {problem.interview_experiences &&
              problem.interview_experiences.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">
                    Related Interview Experiences
                  </h3>
                  <ul className="space-y-3">
                    {problem.interview_experiences.map((exp, i) => (
                      <li key={i}>
                        <a
                          href={exp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-600 hover:underline flex items-center"
                        >
                          {exp.title}
                          <ExternalLink className="ml-2" size={14} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>

          {/* Code Editor */}
          <div className="bg-gray-900 rounded-xl shadow-2xl flex flex-col h-[85vh] sticky top-24">
            <div className="flex-shrink-0 p-3 flex items-center justify-between bg-gray-800 rounded-t-xl">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              </div>
              <select className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 text-sm focus:outline-none">
                <option>C++</option>
                <option>Java</option>
                <option>Python</option>
              </select>
            </div>
            <div className="flex-grow p-4 text-gray-300 font-mono text-sm leading-relaxed overflow-auto">
              <pre>
                <code>{`class Solution {
public:
    // Function to find the maximum sum of a contiguous subarray.
    long long maxSubarraySum(int arr[], int n) {
        
        long long max_so_far = -1e18; // Represents negative infinity
        long long max_ending_here = 0;
        
        for (int i = 0; i < n; i++) {
            max_ending_here = max_ending_here + arr[i];
            if (max_so_far < max_ending_here) {
                max_so_far = max_ending_here;
            }
            if (max_ending_here < 0) {
                max_ending_here = 0;
            }
        }
        return max_so_far;
    }
};`}</code>
              </pre>
            </div>
            <div className="flex-shrink-0 p-3 bg-gray-800 rounded-b-xl flex items-center justify-end gap-3">
              <button className="text-white font-semibold hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors">
                Custom Input
              </button>
              <button className="text-white font-semibold bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-lg transition-colors">
                Compile & Run
              </button>
              <button className="text-white font-bold bg-green-600 hover:bg-green-500 px-5 py-2 rounded-lg transition-colors">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetailPage;