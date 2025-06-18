import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle, ArrowLeft, ExternalLink } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Editor from "@monaco-editor/react";

const ProblemDetailPage = ({ allProblems }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const problem = allProblems.find((p) => String(p.id) === id);
  const { user } = useContext(AuthContext);

  // Move all hooks to the top
  const [submissions, setSubmissions] = useState([]);
  const [activeTab, setActiveTab] = useState("problem");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [theme, setTheme] = useState("vs-dark");

  // Place useEffect before any conditional returns
  useEffect(() => {
    const fetchSubmissions = async () => {
      if (activeTab === "submissions" && problem) {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/submissions/`,
            {
              headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
              },
              params: {
                problem_id: problem.id,
              },
            }
          );
          setSubmissions(response.data);
        } catch (error) {
          console.error("Error fetching submissions:", error);
        }
      }
    };
    fetchSubmissions();
  }, [activeTab, problem]);

  // Now place the conditional return
  if (!problem) return <div>Problem not found.</div>;

  // Add the SubmissionsTable component
  const SubmissionsTable = () => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* ...rest of your SubmissionsTable code... */}
    </div>
  );

  // Add default code templates
  const defaultCode = {
    python: `def solution():\n    # Write your code here\n    pass`,
    cpp: `class Solution {\npublic:\n    // Write your code here\n};`,
    java: `class Solution {\n    // Write your code here\n}`,
  };

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

  // Add this function inside your component
  const handleSubmit = async () => {
    if (!code.trim()) {
      alert("Please write some code before submitting");
      return;
    }

    try {
      setSubmissionStatus("submitting");

      const response = await axios.post(
        "http://localhost:8000/api/submissions/",
        {
          problem_id: problem.id,
          code: code,
          language: language,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Submission response:", response.data);
      setSubmissionStatus(response.data.status);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmissionStatus("error");
      alert(error.response?.data?.message || "Failed to submit code");
    }
  };

  // Add new handler for Compile & Run
  const handleCompileAndRun = async () => {
    if (!code.trim()) {
      alert("Please write some code before compiling");
      return;
    }

    try {
      setSubmissionStatus("compiling");

      const response = await axios.post(
        "http://localhost:8000/api/submissions/compile/",
        {
          problem_id: problem.id,
          code: code,
          language: language,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Compilation response:", response.data);
      setSubmissionStatus(response.data.status);
    } catch (error) {
      console.error("Compilation error:", error);
      setSubmissionStatus("compilation_error");
      alert(error.response?.data?.message || "Failed to compile code");
    }
  };

  // Replace your textarea with Monaco Editor
  const editorSection = (
    <div className="bg-gray-900 rounded-xl shadow-2xl flex flex-col h-[85vh] sticky top-24">
      <div className="flex-shrink-0 p-3 flex items-center justify-between bg-gray-800 rounded-t-xl">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          </div>
          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
              setCode(defaultCode[e.target.value]);
            }}
            className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 text-sm focus:outline-none"
          >
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
          </select>
        </div>
      </div>

      <div className="flex-grow">
        <Editor
          height="100%"
          defaultLanguage="cpp"
          language={language}
          value={code}
          onChange={setCode}
          theme={theme}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            tabSize: 4,
            scrollbar: {
              vertical: "visible",
              horizontal: "visible",
            },
          }}
        />
      </div>

      <div className="flex-shrink-0 p-3 bg-gray-800 rounded-b-xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCode(defaultCode[language])}
            className="text-white text-sm hover:text-gray-300"
          >
            Reset
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-white font-medium bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors text-sm">
            Custom Input
          </button>
          <button
            onClick={handleSubmit}
            className="text-white font-medium bg-red-600 hover:bg-red-500 px-6 py-2 rounded-lg transition-colors text-sm"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );

  // Add submission status display
  const submissionStatusDisplay =
    submissionStatus && (
      <div className="fixed bottom-4 right-4 p-4 rounded-lg shadow-lg bg-white border-l-4 border-red-500">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="font-medium text-gray-800">
            {submissionStatus.charAt(0).toUpperCase() + submissionStatus.slice(1)}
          </span>
        </div>
      </div>
    );

  // Add TabButton component after your existing state declarations
  const TabButton = ({ name, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-medium text-sm ${
        isActive
          ? "text-red-600 border-b-2 border-red-600"
          : "text-gray-500 hover:text-gray-700"
      }`}
    >
      {name}
    </button>
  );

  // Replace your existing return statement with this
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        {/* Add Tab Navigation */}
        <div className="flex gap-4 border-b mb-6">
          <TabButton
            name="Problem"
            isActive={activeTab === "problem"}
            onClick={() => setActiveTab("problem")}
          />
          <TabButton
            name="Submissions"
            isActive={activeTab === "submissions"}
            onClick={() => setActiveTab("submissions")}
          />
        </div>

        {activeTab === "problem" ? (
          // Your existing grid layout
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
            {editorSection}
          </div>
        ) : (
          // Submissions Table
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">My Submissions</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">When</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Language</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Runtime</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Memory</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">View Code</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {submissions.map((submission, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(submission.created_at).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          submission.status === 'accepted' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {submission.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{submission.language}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {submission.execution_time ? `${submission.execution_time} ms` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {submission.memory_used ? `${submission.memory_used} KB` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => {
                            setCode(submission.code);
                            setLanguage(submission.language);
                            setActiveTab("problem");
                          }}
                          className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      {submissionStatusDisplay}
    </div>
  );
};

export default ProblemDetailPage;