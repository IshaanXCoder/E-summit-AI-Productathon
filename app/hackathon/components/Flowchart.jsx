"use client";

import { useState } from "react"
import { motion } from "framer-motion"
import { DiscordLogoIcon } from "@radix-ui/react-icons"

const Flowchart = ({ children, delay, gradientBorder }) => (
  <div
  
    className="relative p-4 rounded-lg bg-gray-900 text-white font-semibold text-center min-w-[200px]"
    style={{
      background: "linear-gradient(45deg, rgba(31,41,55,1) 0%, rgba(17,24,39,1) 100%)",
    }}
  >
    <div
      className="absolute inset-0 rounded-lg"
      style={{
        background: gradientBorder,
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        maskComposite: "exclude",
        padding: "1.5px",
      }}
    />
    <div className="relative z-10">{children}</div>
  </div>
)

export default function MyFlowchart() {
  // const boxes = [
  //   {
  //     text: "Have a rough idea",
  //     gradient: "linear-gradient(45deg, #3b82f6, #1d4ed8)",
  //   },
  //   {
  //     text: "Got some bugs",
  //     gradient: "linear-gradient(45deg, #10b981, #059669)",
  //   },
  //   {
  //     text: "Want some more ideas",
  //     gradient: "linear-gradient(45deg, #f59e0b, #d97706)",
  //   },
  //   {
  //     text: "Generate some code",
  //     gradient: "linear-gradient(45deg, #ef4444, #dc2626)",
  //   },
  // ]

  return (
    <div className="flex flex-col items-center space-y-8 py-8">
      <div className="flex flex-wrap justify-center gap-4">
       
      </div>
      <a
        href="https://discord.com"
        target="_blank"
        className="bg-[#5865F2] hover:bg-[#4752C4] text-white p-6 rounded-lg shadow-lg flex items-center space-x-3 transform hover:scale-105 transition-all duration-300 group"
        style={{
          background: "linear-gradient(45deg, #5865F2, #7289DA)",
        }}
      >
        <DiscordLogoIcon className="w-8 h-8 group-hover:rotate-12 transition-transform duration-300" />
        <span className="text-xl font-bold">One Step Solution</span>
      </a>
    </div>
  )
}