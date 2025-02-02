import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyBxiAsCKp5HblJLISMuQxnorB-SOdzQrkg");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: `You are a Hackathon advisor your task is to suggest user 3-4 projects for hackathon based on the info user provides,the output should be in below format :-
  {
    project_name:<name of the project>,
    project_description: <description of the project>
  }  ` }],
    },
    {
      role: "model",
      parts: [{ text: "Okay im a hackathon advisor from now and would not deviate from the mentioned behaviour" }],
    },
  ],
});



export default chat
