"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  ChevronRight,
  Brain,
  Zap,
  Users,
  MessageCircle,
  Phone,
  MapPin,
} from "lucide-react";
// import ParticleBackground from "../components/ParticleBackground";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const router = useRouter();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updateMousePosition = (ev) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white overflow-hidden">
      {/* Particle Background */}
      {/* <ParticleBackground /> */}

      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-blue-900 via-purple-900 to-black opacity-50"
          style={{ y: backgroundY }}
        />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-20" />
      </div>

      {/* Glowing Orb */}
      <div
        className="fixed w-64 h-64 rounded-full bg-blue-500 filter blur-3xl opacity-20 pointer-events-none"
        style={{
          left: mousePosition.x - 128,
          top: mousePosition.y - 128,
          transition: "left 0.2s, top 0.2s",
        }}
      />

      {/* Navbar */}
      <nav className="relative z-10 flex justify-between items-center p-4 md:p-6">
        <Link href="/" className="text-2xl font-bold">
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              HackGPT
            </span>
          </motion.span>
        </Link>
        <div className="hidden md:flex space-x-6">
          {["About", "Contact"].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`#${item.toLowerCase()}`} className="relative group text-lg font-medium">
                {item}
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            </motion.div>
          ))}
        </div>
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-gray-900 text-white border-l border-gray-800">
            <nav className="flex flex-col space-y-4 mt-8">
              <Link
                href="#about"
                className="text-lg hover:text-blue-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="#contact"
                className="text-lg hover:text-purple-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-4 py-12">
        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-x">
            Unleash AI Innovation
          </span>
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-12 max-w-2xl text-gray-300"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Experience the future of hackathons in our cutting-edge AI simulator
        </motion.p>
        <motion.div
          className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
         
            { text: "Join as Participant", gradient: "from-pink-500 to-orange-400",redirectPage:'/inputPage' },
            { text: "Start Evaulating Projects as a Evaluator", gradient: "from orange-400 to pink-500",redirectPage:'/uploader'}
          ].map((btn, index) => (
            <Button
              onClick={()=> router.push(btn.redirectPage)}
              key={btn.text}
              className={`group relative overflow-hidden bg-transparent border-2 border-${btn.color}-500 text-white px-8 py-6 rounded-md text-lg transition-all hover:shadow-lg hover:shadow-${btn.color}-500/50 transform hover:-translate-y-1`}
            >
              <span className="relative z-10">{btn.text}</span>
              <span
                className={`absolute inset-0 bg-gradient-to-r from-${btn.color}-600 to-${btn.color}-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
              <ChevronRight className="inline-block ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </Button>
          ))}
        </motion.div>
      </main>

      {/* About Us Section */}
      <section id="about" className="relative z-10 py-24 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">About Us</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.p
                className="text-lg text-gray-300 mb-6"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                AI Hackathon Simulator is at the forefront of innovation, bridging the gap between artificial
                intelligence and collaborative problem-solving. Our platform is designed to revolutionize the hackathon
                experience, providing a unique environment where creativity meets cutting-edge technology.
              </motion.p>
              <motion.p
                className="text-lg text-gray-300"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                We believe in the power of AI to enhance human creativity and problem-solving capabilities. Our mission
                is to create a space where innovators, developers, and visionaries can come together to tackle
                real-world challenges using the latest AI technologies.
              </motion.p>
            </div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="AI Hackathon"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center">
                <Brain className="w-12 h-12 text-white" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="relative z-10 py-24 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Contact Us
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <motion.p
                className="text-lg text-gray-300 mb-6"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Have questions about our AI Hackathon Simulator? Want to organize an event or participate in upcoming
                hackathons? We'd love to hear from you!
              </motion.p>
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <p className="flex items-center text-gray-300">
                  <MessageCircle className="w-5 h-5 mr-2 text-blue-400" />
                  info@aihackathonsim.com
                </p>
                <p className="flex items-center text-gray-300">
                  <Phone className="w-5 h-5 mr-2 text-blue-400" />
                  +1 (555) 123-4567
                </p>
                <p className="flex items-center text-gray-300">
                  <MapPin className="w-5 h-5 mr-2 text-blue-400" />
                  123 Innovation Street, Tech City, TC 12345
                </p>
              </motion.div>
            </div>
            <motion.form
              className="space-y-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Input type="text" placeholder="Your Name" className="bg-gray-800 border-gray-700 text-white" />
              <Input type="email" placeholder="Your Email" className="bg-gray-800 border-gray-700 text-white" />
              <Textarea placeholder="Your Message" className="bg-gray-800 border-gray-700 text-white" rows={4} />
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">Send Message</Button>
            </motion.form>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 md:px-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">&copy; 2023 AI Hackathon Simulator. All rights reserved.</p>
          <div className="flex space-x-6">
            {["Terms", "Privacy", "FAQ"].map((item) => (
              <Link key={item} href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </footer>

      {/* Floating Chat Button */}
      <motion.div
        className="fixed bottom-4 right-4 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
      >
        <Button className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg">
          <MessageCircle className="w-6 h-6" />
        </Button>
      </motion.div>
    </div>
  )
}