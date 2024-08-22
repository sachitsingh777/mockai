import Image from "next/image";
import React from 'react';
import { Button } from '@/components/ui/button'; // Ensure you have a Button component or replace with your preferred UI library
import { Play } from "lucide-react";
import Link from "next/link";
export default function Home() {
  return (
    <section className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white py-20 h-screen flex justify-center items-center">
      <div className="container mx-auto px-6 flex flex-col-reverse lg:flex-row items-center">
        {/* Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Ace Your Next Interview with <span className="text-yellow-300">Mock AI</span>
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Empower yourself with realistic interview simulations, personalized feedback, and expert guidance to land your dream job.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/sign-up">
           
            <Button size="lg" className="bg-yellow-300 text-gray-900 hover:bg-yellow-400">
              Get Started for Free
            </Button> </Link>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900 flex items-center">
              <Play className="mr-2" />
              Watch Demo
            </Button>
          </div>
        </div>
        {/* Image Content */}
        <div className="w-full lg:w-1/2 mb-10 lg:mb-0 flex justify-center">
          <img
            src="https://blog.talview.com/hs-fs/hubfs/AI_V.png?width=842&name=AI_V.png" 
            alt="Mock AI Interview Illustration"
            className="w-3/4 lg:w-full"
          />
        </div>
      </div>
    </section>
  );
}






