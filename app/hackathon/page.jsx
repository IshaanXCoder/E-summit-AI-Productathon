"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Wind,
  Cpu,
  Smartphone,
  MapPin,
  Brain,
  Send,
  Moon,
  Sun,
  Home,
  Activity,
  Settings,
  MessageCircle
} from "lucide-react";
import MyFlowchart from "./components/Flowchart";
const UrbanAirQualityCompanion = () => {
  const [chatInput, setChatInput] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [Tech, setTech] = useState([]);
  const [Challenges, setChallenges] = useState([]);
  const [Stack, setStack] = useState([]);
  const [ProjectHeadline, setProjectHeadline] = useState('')
  const [ProjectDes, setProjectDes] = useState('')

  useEffect(() => {
    const parseJsonData = async () => {
      // const data = {'data':'Project 1: Urban Air Quality Companion\n\n1. **Project Name:* Urban Air Quality Companion\n\n2. *Brief Description:\n   An AI-powered mobile application that provides real-time air quality insights, forecasts, and recommendations for city dwellers to minimize exposure to harmful pollutants. The app incorporates user data to offer personalized advice, such as optimal routes for commuting or preferred times for outdoor activities.\n\n3. **Key Technical Components:\n   - Real-time data acquisition from city-wide IoT air quality sensors\n   - Machine learning models to forecast air quality trends\n   - Mobile app development\n   - GPS integration for location-based services\n   - User interface/experience (UI/UX) design \n\n4. **Potential Challenges:\n   - Ensuring real-time data accuracy and reliability\n   - Integrating diverse data sources with varying formats\n   - Balancing resource consumption on mobile devices\n   - Protecting user privacy while utilizing location data\n\n5. **Recommended Technology Stack:\n   - Frontend: React Native for cross-platform mobile development\n   - Backend: Node.js with Express for API and data handling\n   - Database: MongoDB for storing historical air quality data\n   - ML/AI: TensorFlow or scikit-learn for predictive modeling\n   - Cloud Services: AWS IoT for data ingestion and AWS Lambda for serverless processing\n\n'}
      const data = localStorage.getItem('hackathonProjectDetails')
      const jsonData = JSON.parse(data)
      console.log(jsonData)
      const res = await fetch('/api/projeval', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData)
      })
      const resData = await res.json();
      let jsonDataLLM  =  JSON.parse(resData.content.slice(7,-4))
      console.log(jsonDataLLM)
      setStack(jsonDataLLM.tech_stack);
      setChallenges(jsonDataLLM.challenges);
      setTech(jsonDataLLM.key_components);
      setProjectHeadline(jsonData.name);
      setProjectDes(jsonDataLLM.project_overview);
      
    }
    parseJsonData();
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    console.log("Chat submitted:", chatInput);
    setChatInput("");
  };

  const navItems = [
    
  ];

  const challenges = [
    "Data accuracy",
    "Source integration",
    "Mobile optimization",
    "User privacy",
  ];

  return (
    <div className={`flex h-screen ${darkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 dark:bg-gray-800 p-6 hidden md:block">
        <h1 className="text-2xl font-bold mb-8 text-blue-600 dark:text-blue-400">
          {ProjectHeadline}
        </h1>
        <nav className="space-y-4">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <item.icon size={20} />
              <span>{item.text}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="max-w-4xl mx-auto space-y-8">
          <header className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">{ProjectHeadline}</h1>
             
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-full"
            >
              {darkMode ? (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              )}
            </Button>
          </header>

          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl">Project Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {ProjectDes}
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gray-50 dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl">Key Components</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Tech.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                      <Wind className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{item}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gray-50 dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl">Tech Stack</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Stack.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                      <Wind className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{item}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl">Challenges</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {Challenges.map((challenge, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                >
                  {challenge}
                </Badge>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl">Facing some issues?</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full">
                <MessageCircle className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-center text-gray-700 dark:text-gray-300">
                Click on the button to redirect to our discord bot. you can ask any sort of queries, being it dev related, idea related. even if you have some rough idea, you can talk to the bot and get an excellent idea.
              </p>
              <Button 
                variant="default" 
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => window.open("https://discord.gg/gUmCQUnU", "_blank")}
              >
                Join Discord
              </Button>
            </CardContent>
          </Card>
         

        </div>
      </main>
    </div>
  );
};

export default UrbanAirQualityCompanion;