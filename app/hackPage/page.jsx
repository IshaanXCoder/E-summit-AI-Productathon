"use client";

import React, { useState, useEffect } from "react";
import { Clock, Rocket } from "lucide-react";
import { useRouter } from "next/navigation";

const HackathonMentorUI = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState();
  const [hackathonDetails, setHackathonDetails] = useState(null);
  const [ProjArr, setProjArr] = useState([]);
  const [HackathonName, setHackathonName] = useState('')
  const [projectIdeas, setProjectIdeas] = useState([
    {
      name: "GreenUrban Navigator",
      description: "AI-powered platform for sustainable urban living",
      difficulty: "Medium",
    },
    {
      name: "Waste2Resource Exchange",
      description: "Blockchain marketplace for waste recycling",
      difficulty: "Hard",
    },
  ]);

  useEffect(() => {
    const setDetails = async () => {
      try {
        const storedDetails = localStorage.getItem("hackathonDetails");
        
        if (storedDetails) {
          const parsedData = JSON.parse(storedDetails);
          const prompt = `
            Generate hackathon project ideas for a ${parsedData.hackathonName} focusing on ${parsedData.type} with a duration of ${parsedData.duration} hours. 
            The participants have expertise in ${parsedData.techExpertise}. 
          `;
          setHackathonName(parsedData.hackathonName)
          setTimeRemaining(parseInt(parsedData.duration) * 60 * 60)
          const res = await fetch('/api/adv', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(prompt)
          });
          
          const data = await res.json();
          let arr = data.content.slice(7,-4);
          arr = JSON.parse(arr);

          const newProjectIdeas = arr.map(eli => ({
            name: eli.project_name,
            description: eli.project_description,
            difficulty: eli.difficulty
          }));
          
          setProjectIdeas(newProjectIdeas);
        }
      } catch (error) {
        console.error("Error fetching project ideas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    setDetails();
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClick = (index) => {
    const jsonData = projectIdeas[index];
    console.log(jsonData);
    localStorage.setItem("hackathonProjectDetails", JSON.stringify(jsonData));
    router.push("/hackathon");
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        Loading ideas ........ please wait
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6 bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
      <div className="container mx-auto">
        {/* Hackathon Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-gray-100 tracking-tight">
            {HackathonName}
          </h1>
        </div>

        {/* Time Remaining & Progress */}
        <div className="bg-gray-800/80 p-6 rounded-xl mb-8 flex items-center shadow-2xl">
          <Clock className="mr-6 text-white text-3xl" />
          <div>
            <div className="text-2xl font-semibold text-white">
              Time Remaining: {formatTime(timeRemaining)}
            </div>
            <div className="w-full bg-gray-700 h-4 mt-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 h-full"
                style={{ width: `${(timeRemaining / (48 * 60 * 60)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Project Ideas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectIdeas.map((project, index) => (
            <div
              onClick={() => handleClick(index)}
              key={index}
              className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl hover:scale-105 transition-all cursor-pointer"
            >
              <div className="flex flex-col space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-3xl font-bold text-white">
                    {project.name}
                  </h2>
                  <Rocket className="text-blue-400" />
                </div>
                <p className="text-gray-300">{project.description}</p>

                {/* Difficulty */}
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold text-lg">
                    Difficulty: {project.difficulty}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cursor Effect */}
      <div
        id="cursor"
        className="fixed w-12 h-12 bg-white rounded-full transition-all ease-in-out duration-200"
      ></div>
    </div>
  );
};

export default HackathonMentorUI;