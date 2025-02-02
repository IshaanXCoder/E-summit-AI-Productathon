import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from 'node:fs';
import * as dotenv from 'dotenv';
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
import { NextResponse } from "next/server";
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


function fileToGenerativePart(fileContent, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fileContent).toString("base64"),
      mimeType,
    },
  };
}

const promptForEval = `
  analyze the given readme file and you have to give insights to the evaluator which should be in the below format:-
  {
  'projectName': string,                // Name of the project
  'projectDescription': string,         // Brief description
  'techStack': string[],               // Technologies used
  'technicalAspects': string,          // Technical implementation details
  'problemStatement': string,          // Clear definition of problem being solved
  'innovationScore': number,           // Rating from 1-10 for innovation
  'implementationQuality': {
    'codeQuality': number,             // Rating from 1-10
    'completeness': number,            // Rating from 1-10
    'complexity': number               // Rating from 1-10
  },
  'documentationQuality': {
    'readmeClarity': number,           // Rating from 1-10
    'setupInstructions': boolean,      // Presence of setup instructions
    'architectureExplanation': boolean // Presence of architecture explanation
  },
  'uniqueSellingPoints': string[],     // List of standout features
  'potentialImpact': string,           // Market/social impact assessment
  'scalabilityAnalysis': string,       // Analysis of scaling potential
  'suggestedImprovements': string[],   // List of recommended improvements
  'mainChallenges': string[],          // Key technical/implementation challenges
  'deploymentReadiness': number,       // Rating from 1-10
  'overallScore': number,              // Final evaluation score (1-100)
  'evaluatorNotes': string,            // Additional observations/comments
  'strengthsAndWeaknesses': {
    'strengths': string[],
    'weaknesses': string[]
  }
}
`

const chatForProjectDetails = model.startChat({
  history: [
    {
      role: "user",
      parts: [
        {
          text: `
         You are a helpful project analysis assistant. You will receive project details including the project name, description and difficulty level.

Your task is to thoroughly analyze the provided project information and return a structured response in this format:

{
    "project_overview": "Brief, clear summary of what the project aims to achieve",
    "key_components": ["List all major components/features you can identify from the description"],
    "tech_stack": ["List appropriate technologies based on project requirements"],
    "challenges": ["List potential technical and implementation challenges"],
    "recommendedTimeFlow": {
        "timeframe": "objective" 
    }
}

Important notes:
- Extract as much useful information as possible from the given description
- If certain aspects are unclear, make reasonable assumptions based on the project's context
- Focus on being helpful rather than rigid
- Include any interesting insights you notice about the project
- For the tech stack, suggest modern and appropriate technologies
- Break down the timeline based on the project's scope and complexity

Example input:
"Project details for a weather app that shows forecasts and alerts"

Example output:
{
    "project_overview": "Weather application providing forecasts and emergency alerts with user-friendly interface",
    "key_components": [
        "Weather data integration",
        "User interface",
        "Push notification system",
        "Location tracking",
        "Alert management"
    ],
    "tech_stack": [
        "React/React Native for UI",
        "Node.js backend",
        "Weather API integration",
        "Firebase for notifications"
    ],
    "challenges": [
        "Real-time data synchronization",
        "Battery-efficient location tracking",
        "Handling different weather APIs",
        "Emergency alert reliability"
    ],
    "recommendedTimeFlow": {
        "First 4 hours": "Setup project and integrate weather API",
        "Next 6 hours": "Build core UI components",
        "Next 4 hours": "Implement location tracking",
        "Final 6 hours": "Add notifications and testing"
    }
}

Remember to provide comprehensive and practical analysis that will be genuinely helpful for project planning.
        `,
        },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "okey i will behave exactly like that with no devation" },
      ],
    },
  ],
});

const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [
        {
          text: `You are a Hackathon advisor your task is to suggest user 3-4 projects for hackathon based on the info user provides,the output should be in below format :-
  {
    project_name:<name of the project>,
    project_description: <description of the project>,
    difficulty: <difficulty of the project>
  }  `,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "Okay im a hackathon advisor from now and would not deviate from the mentioned behaviour",
        },
      ],
    },
  ],
});

export async function POST(req, { params }) {
  try {
    const func = params.func;
    let body = await req.json();
    let res;
    if (func === "adv") {
      res = await chat.sendMessage(body);
    } 
    else if (func == "projeval") {
      res = await chatForProjectDetails.sendMessage(`projectName:${body.name} and projectDes:${body.description} `);
    }
    else if(func== "readEval"){
      const readMeFile = fileToGenerativePart(body.content,'text/markdown');
      res = await model.generateContent([promptForEval,readMeFile]);
    }

    let textContent;
    if(res!==undefined){
      textContent = res.response.candidates[0].content.parts[0].text;
    }
    else{
      return NextResponse.json({
        message:'got empty input! please try again later'
      })

    }
    return NextResponse.json({
      message: "received data from frontend",
      content: textContent,
    });
  } catch (err) {
    console.error("Error processing request:", err); // Log the error
    return NextResponse.json(
      { message: "failed to receive the message", err: err },
      { status: 400 } // Add proper status code
    );
  }
}
