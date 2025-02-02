"use client"
import { Button } from "@/components/ui/button";
import { Star, StarHalf } from "lucide-react";

export default function GridLayout() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen my-16">
      {/* Top Left Section */}
      <div className="p-8 bg-white flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-zinc-900 w-12 h-12 flex items-center justify-center rounded-lg">
              <span className="text-white text-xl">Z</span>
            </div>
            <span className="text-sm text-gray-600">slogan-1-here</span>
          </div>
          <h1 className="text-5xl font-bold leading-tight mb-8">
            HERE COMES THE MAIN CONTENT OF THIS SECTION
          </h1>
          <Button
            variant="secondary"
            className="bg-black text-white hover:bg-black/90 rounded-full px-6"
          >
            some slogan
          </Button>
        </div>
        <div className="text-sm text-gray-600">fill our contact details here</div>
      </div>

      {/* Top Right Section */}
      <div 
        className="relative bg-sky-200 p-8 flex flex-col justify-between" 
        style={{ 
          backgroundImage: "url('/teamBanner.jpg')", 
          backgroundSize: "cover", 
          backgroundPosition: "center" 
        }}
      >
        <div className="text-center text-sm text-gray-600">some slogan</div>
      </div>
      
      
      {/* Bottom Left Section */}
      <div className="bg-slate-800 p-8">
        <div className="max-w-md mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your message"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>

      {/* Bottom Right Section */}
      <div className="bg-gray-100 p-8 overflow-y-auto">
        <div className="max-w-md mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Ratings</h2>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              <Star className="w-6 h-6 fill-current" />
              <Star className="w-6 h-6 fill-current" />
              <Star className="w-6 h-6 fill-current" />
              <Star className="w-6 h-6 fill-current" />
              <StarHalf className="w-6 h-6 fill-current" />
            </div>
            <span className="ml-2 text-gray-600">4.5 out of 5</span>
          </div>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="ml-2 text-sm text-gray-600">John D.</span>
              </div>
              <p className="text-gray-700">
                "Great service! The team was very responsive and delivered
                high-quality work."
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <StarHalf className="w-4 h-4 fill-current" />
                </div>
                <span className="ml-2 text-sm text-gray-600">Sarah M.</span>
              </div>
              <p className="text-gray-700">
                "Very professional and efficient. Would definitely recommend!"
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="ml-2 text-sm text-gray-600">Mike R.</span>
              </div>
              <p className="text-gray-700">
                "Exceeded my expectations. The team went above and beyond to
                deliver exceptional results."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}