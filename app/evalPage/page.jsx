"use client"

import { useState,useEffect } from "react"
import { CheckCircle, XCircle, ArrowUpCircle, ArrowDownCircle } from "lucide-react"

export default function ProjectAnalyzer() {
  const [project, setProject] = useState({
    projectName: "TCP Packet Analyzer",
    projectDescription:
      "A network analysis tool that captures TCP packets, providing detailed insights into network traffic with geographic mapping and in-depth packet details.",
    techStack: ["Python", "Flask", "Scapy", "Next.js", "Tailwind CSS", "Node.js"],
    technicalAspects:
      "The project uses Scapy for backend packet capture and analysis, Flask for API endpoints, and Next.js with Tailwind CSS for a modern frontend interface. It features geographic visualization of TCP traffic and detailed packet information.",
    problemStatement:
      "Provides a solution for visualizing and analyzing network traffic, specifically TCP packets, offering geographic context and detailed packet information for better network understanding.",
    innovationScore: 7,
    implementationQuality: {
      codeQuality: 7,
      completeness: 8,
      complexity: 7,
    },
    documentationQuality: {
      readmeClarity: 7,
      setupInstructions: true,
      architectureExplanation: false,
    },
    uniqueSellingPoints: [
      "Geographic visualization of TCP traffic",
      "Detailed packet analysis with header data, flags, and raw payload",
      "Modern and user-friendly interface built with Next.js",
    ],
    deploymentReadiness: 6,
    overallScore: 75,
    evaluatorNotes:
      "The project demonstrates a functional TCP packet analyzer with a good user interface. However, improvements to scalability, error handling, and documentation are needed. The reliance on external files hosted on Google Drive is a weakness.",
    strengthsAndWeaknesses: {
      strengths: [
        "Clear user interface",
        "Geographic mapping functionality",
        "Detailed packet information",
        "Use of modern technologies (Next.js)",
      ],
      weaknesses: [
        "Scalability concerns",
        "Lack of robust error handling",
        "Reliance on external files (Google Drive)",
        "Limited documentation on architecture and deployment",
      ],
    },
  })

  useEffect(() => {
    const loadProjectData = () => {  // Renamed function to avoid shadowing
      const data = localStorage.getItem('projDetails');
      if (data) {
        const jsonData = JSON.parse(data);
        console.log(jsonData);
        setProject(jsonData);
      }
    }
    loadProjectData();
  }, []); // Added empty dependency array

  const [activeTab, setActiveTab] = useState("overview")

  const handleScoreChange = (category, value) => {
    setProject((prev) => ({
      ...prev,
      [category]: value,
    }))
  }

  const handleQualityChange = (category, subcategory, value) => {
    setProject((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subcategory]: value,
      },
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 p-4 sm:p-8 text-gray-100">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-purple-300 mb-4">{project.projectName}</h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-8">{project.projectDescription}</p>

        <div className="space-y-4">
          <div className="flex space-x-2 bg-gray-800 rounded-lg p-1">
            {["overview", "details", "evaluation", "notes"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-4 rounded-md transition-colors duration-200 ${
                  activeTab === tab ? "bg-purple-700 text-white" : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                  <h2 className="text-xl font-semibold text-purple-300 mb-4">Overall Score</h2>
                  <div className="text-4xl sm:text-5xl font-bold text-center text-purple-400 mb-4">
                    {project.overallScore}/100
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-purple-600 h-2.5 rounded-full"
                      style={{ width: `${project.overallScore}%` }}
                    ></div>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                  <h2 className="text-xl font-semibold text-purple-300 mb-4">Key Metrics</h2>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">Innovation Score</span>
                        <span className="text-purple-400">{project.innovationScore}/10</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div
                          className="bg-purple-600 h-2.5 rounded-full"
                          style={{ width: `${project.innovationScore * 10}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">Deployment Readiness</span>
                        <span className="text-purple-400">{project.deploymentReadiness}/10</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div
                          className="bg-purple-600 h-2.5 rounded-full"
                          style={{ width: `${project.deploymentReadiness * 10}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-purple-300 mb-4">Tech Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-purple-700 text-white rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "details" && (
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-purple-300 mb-4">Technical Aspects</h2>
                <p className="text-gray-300">{project.technicalAspects}</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-purple-300 mb-4">Problem Statement</h2>
                <p className="text-gray-300">{project.problemStatement}</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-purple-300 mb-4">Unique Selling Points</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  {project.uniqueSellingPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "evaluation" && (
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-purple-300 mb-4">Implementation Quality</h2>
                <div className="space-y-4">
                  {Object.entries(project.implementationQuality).map(([key, value]) => (
                    <div key={key}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                        <span className="text-purple-400">{value}/10</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={value}
                        onChange={(e) => handleQualityChange("implementationQuality", key, Number(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-purple-300 mb-4">Documentation Quality</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300">README Clarity</span>
                      <span className="text-purple-400">{project.documentationQuality.readmeClarity}/10</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={project.documentationQuality.readmeClarity}
                      onChange={(e) =>
                        handleQualityChange("documentationQuality", "readmeClarity", Number(e.target.value))
                      }
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-300">Setup Instructions</span>
                    {project.documentationQuality.setupInstructions ? (
                      <CheckCircle className="text-green-500" />
                    ) : (
                      <XCircle className="text-red-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-300">Architecture Explanation</span>
                    {project.documentationQuality.architectureExplanation ? (
                      <CheckCircle className="text-green-500" />
                    ) : (
                      <XCircle className="text-red-500" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notes" && (
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-purple-300 mb-4">Evaluator Notes</h2>
                <textarea
                  value={project.evaluatorNotes}
                  onChange={(e) => setProject((prev) => ({ ...prev, evaluatorNotes: e.target.value }))}
                  className="w-full h-40 bg-gray-700 text-gray-100 border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                  <h2 className="text-xl font-semibold text-purple-300 mb-4 flex items-center gap-2">
                    <ArrowUpCircle className="text-green-500" />
                    Strengths
                  </h2>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    {project.strengthsAndWeaknesses.strengths.map((strength, index) => (
                      <li key={index}>{strength}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                  <h2 className="text-xl font-semibold text-purple-300 mb-4 flex items-center gap-2">
                    <ArrowDownCircle className="text-red-500" />
                    Weaknesses
                  </h2>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    {project.strengthsAndWeaknesses.weaknesses.map((weakness, index) => (
                      <li key={index}>{weakness}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

