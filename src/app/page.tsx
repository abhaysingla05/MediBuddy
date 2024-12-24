'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CardContent, Card } from "@/components/ui/card"
import { Stethoscope, Pill, MessageCircle, ChevronRight, X, User, Lightbulb, Github, Linkedin, Twitter } from 'lucide-react'
import Link from "next/link"

// Add this interface right after imports and before the component
interface AIResponse {
  specialist: string;
  medications: string[];
  instantReliefTips: string[];
}

// Add this interface before the FeatureCard component
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function MedicationLandingPage() {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSymptomSubmit = async () => {
    if (!symptoms) return;

    setLoading(true);
    try {
      // Replace this with the actual backend API call
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms }),
      });
      const data = await response.json();
      setResult(data); // assuming the result is in `data`
    } catch (error) {
      console.error("Error fetching result:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f3e9] text-[#2c2c2c]">
      <header className="px-4 lg:px-6 h-20 flex items-center border-b border-[#e0d5c0]">
        <Link className="flex items-center justify-center" href="#">
          <Stethoscope className="h-8 w-8 text-[#8b7d6b]" />
          <span className="ml-2 text-xl font-semibold text-[#8b7d6b]">MediBuddy</span>
        </Link>
        <nav className="ml-auto flex gap-6">
          <Link className="text-sm font-medium text-[#5a4f41] hover:text-[#8b7d6b] transition-colors" href="#">
            How It Works
          </Link>
          <Link className="text-sm font-medium text-[#5a4f41] hover:text-[#8b7d6b] transition-colors" href="#">
            About Us
          </Link>
          <a 
            href="mailto:abhaysingla05@gmail.com" 
            className="text-sm font-medium text-[#5a4f41] hover:text-[#8b7d6b] transition-colors flex items-center gap-2"
           
          >
            <MessageCircle className="h-4 w-4" />
            Contact
          </a>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-8 md:py-12 lg:py-22">
          <div className="container px-4 md:px-6 max-w-5xl">
            <div className="flex flex-col items-center space-y-8 text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-[#5a4f41]">
                Your Wellness Journey Begins Here
              </h1>
              <p className="mx-auto max-w-[700px] text-[#8b7d6b] text-lg md:text-xl">
                Discover personalized care and expert advice tailored to your unique health needs.
              </p>
              <div className="w-full max-w-md space-y-4">
                <Textarea 
                  className="min-h-[120px] bg-white border-[#e0d5c0] focus:border-[#8b7d6b] focus:ring-[#8b7d6b] resize-none" 
                  placeholder="Describe your symptoms here..." 
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                />
                <Button 
                  onClick={handleSymptomSubmit}
                  className="w-full bg-[#8b7d6b] hover:bg-[#5a4f41] text-white transition-colors"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Get Expert Advice"}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section className="w-full py-20 md:py-32 bg-[#e0d5c0]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#5a4f41]">Our Approach</h2>
              <p className="max-w-[600px] text-[#8b7d6b] text-lg">
                A seamless journey from symptoms to solutions, guided by expertise and care.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <FeatureCard
                icon={<MessageCircle className="h-10 w-10 text-[#8b7d6b]" />}
                title="Share Your Concerns"
                description="Describe your symptoms in detail for a comprehensive understanding."
              />
              <FeatureCard
                icon={<Stethoscope className="h-10 w-10 text-[#8b7d6b]" />}
                title="Expert Consultation"
                description="Connect with qualified specialists for personalized medical advice."
              />
              <FeatureCard
                icon={<Pill className="h-10 w-10 text-[#8b7d6b]" />}
                title="Tailored Solutions"
                description="Receive customized medication options and treatment recommendations."
              />
            </div>
          </div>
        </section>

        {/* Result Section (Overlay) */}
        {result && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#e0d5c0]">
              <div className="p-8 space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center pb-6 border-b border-[#e0d5c0]">
                  <div className="flex items-center gap-3">
                    <Stethoscope className="h-8 w-8 text-[#8b7d6b]" />
                    <h2 className="text-2xl font-bold text-[#5a4f41]">Expert Advice for Your Symptoms</h2>
                  </div>
                  <button 
                    onClick={() => setResult(null)}
                    className="rounded-full p-2 hover:bg-[#f8f3e9] transition-colors"
                  >
                    <X className="h-6 w-6 text-[#8b7d6b]" />
                  </button>
                </div>

                <div className="grid gap-8">
                  {/* Specialist Section */}
                  <div className="bg-[#f8f3e9] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <User className="h-6 w-6 text-[#8b7d6b]" />
                      <h3 className="text-xl font-semibold text-[#5a4f41]">Specialist to Consult</h3>
                    </div>
                    <p className="text-[#8b7d6b] text-lg">{result.specialist}</p>
                  </div>

                  {/* Medications Section */}
                  <div className="bg-[#f8f3e9] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Pill className="h-6 w-6 text-[#8b7d6b]" />
                      <h3 className="text-xl font-semibold text-[#5a4f41]">Recommended Medications</h3>
                    </div>
                    <ul className="text-[#8b7d6b] space-y-3">
                      {result.medications && result.medications.length > 0 ? (
                        result.medications.map((med, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-[#8b7d6b]" />
                            <span className="text-lg">{med}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-lg">No medications recommended</li>
                      )}
                    </ul>
                  </div>

                  {/* Instant Tips Section */}
                  <div className="bg-[#f8f3e9] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Lightbulb className="h-6 w-6 text-[#8b7d6b]" />
                      <h3 className="text-xl font-semibold text-[#5a4f41]">Instant Tips for Relief</h3>
                    </div>
                    <ul className="text-[#8b7d6b] space-y-3">
                      {result.instantReliefTips && result.instantReliefTips.length > 0 ? (
                        result.instantReliefTips.map((tip, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-[#8b7d6b]" />
                            <span className="text-lg">{tip}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-lg">No instant relief tips available</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <section className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6 max-w-5xl">
            <div className="flex flex-col items-center space-y-8 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#5a4f41]">
                Begin Your Wellness Journey
              </h2>
              <p className="max-w-[600px] text-[#8b7d6b] text-lg">
                Take the first step towards a healthier you. Our experts are ready to guide you.
              </p>
              <div className="w-full max-w-md space-y-4">
                <Input 
                  className="bg-white border-[#e0d5c0] focus:border-[#8b7d6b] focus:ring-[#8b7d6b]" 
                  placeholder="Enter your email" 
                  type="email" 
                />
                <Button className="w-full bg-[#8b7d6b] hover:bg-[#5a4f41] text-white transition-colors">
                  Start Now
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-[#8b7d6b]">
                By signing up, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 px-4 md:px-6 border-t border-[#e0d5c0]">
        <div className="container flex flex-col items-center gap-4">
          <p className="text-sm text-[#8b7d6b]">
            © 2024 MediBuddy. All rights reserved.
          </p>
          <p className="text-sm text-[#8b7d6b] flex items-center gap-2">
            Crafted with ❤️ by <a 
              href="mailto:abhaysingla05@gmail.com"
              className="font-medium hover:text-[#5a4f41] transition-colors"
            >
              Abhay Singla
            </a>
          </p>
          <div className="flex items-center gap-6">
            <Link className="text-sm text-[#8b7d6b] hover:text-[#5a4f41] transition-colors" href="#">
              Terms of Service
            </Link>
            <Link className="text-sm text-[#8b7d6b] hover:text-[#5a4f41] transition-colors" href="#">
              Privacy Policy
            </Link>
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com/abhaysingla05" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#8b7d6b] hover:text-[#5a4f41] transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/abhay-singla/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#8b7d6b] hover:text-[#5a4f41] transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://x.com/AbhaySingla05" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#8b7d6b] hover:text-[#5a4f41] transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="bg-white border-none shadow-md">
      <CardContent className="flex flex-col items-center space-y-4 p-6">
        {icon}
        <h3 className="text-xl font-semibold text-[#5a4f41]">{title}</h3>
        <p className="text-[#8b7d6b] text-center">{description}</p>
      </CardContent>
    </Card>
  )
}
