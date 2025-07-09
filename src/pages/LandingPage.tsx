
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, FileCheck, Zap, Upload, Clock, Lock, CheckCircle, ArrowRight, Users, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Verification",
      description: "Advanced machine learning algorithms verify documents with 95%+ accuracy in seconds."
    },
    {
      icon: Shield,
      title: "DigiLocker Integration",
      description: "Seamlessly connect with government-verified documents through DigiLocker API."
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Get instant verification results with confidence scores and detailed analysis."
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "Bank-grade encryption and compliance with international data protection standards."
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Upload Documents",
      description: "Drag and drop resumes, certificates, or connect DigiLocker",
      icon: Upload
    },
    {
      step: "02", 
      title: "AI Verification",
      description: "Our AI analyzes authenticity, extracts data, and validates information",
      icon: Sparkles
    },
    {
      step: "03",
      title: "Instant Results",
      description: "Get detailed verification reports with confidence scores",
      icon: CheckCircle
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-xl">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">VerifyPro</h1>
                <p className="text-sm text-gray-600">AI Verification Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/')}>
                Login
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Request Demo
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-4 py-2 text-sm font-medium mb-6">
              🚀 Trusted by 500+ Companies Worldwide
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            AI-Powered Resume &<br />
            <span className="text-blue-600">Certificate Verification</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Streamline your hiring process with intelligent document verification. 
            Detect fraud, validate credentials, and make confident hiring decisions in seconds.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg font-semibold rounded-xl"
              onClick={() => navigate('/')}
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-4 text-lg font-semibold rounded-xl border-2"
            >
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">95%+</div>
              <div className="text-gray-600 font-medium">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">3 Sec</div>
              <div className="text-gray-600 font-medium">Average Processing</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600 font-medium">Enterprise Clients</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose VerifyPro?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for modern HR teams who demand speed, accuracy, and security in their verification process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl">
                <CardHeader className="text-center pb-4">
                  <div className="bg-blue-100 p-4 rounded-xl w-fit mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, fast, and reliable document verification in three easy steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-blue-300 to-transparent transform -translate-x-1/2 z-0" />
                )}
                
                <div className="relative z-10">
                  <div className="bg-white p-6 rounded-2xl shadow-lg w-24 h-24 mx-auto mb-6 flex items-center justify-center border-4 border-blue-100">
                    <step.icon className="h-10 w-10 text-blue-600" />
                  </div>
                  
                  <div className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full w-fit mx-auto mb-4">
                    STEP {step.step}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to streamline document verification and make confident hiring decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl">
              <CardHeader>
                <div className="bg-green-100 p-3 rounded-lg w-fit mb-4">
                  <Upload className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl font-bold">Smart Upload</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Drag-and-drop interface with automatic file type detection and batch processing capabilities.</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl">
              <CardHeader>
                <div className="bg-purple-100 p-3 rounded-lg w-fit mb-4">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl font-bold">Real-time Status</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Live updates on verification progress with detailed status tracking and notifications.</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl">
              <CardHeader>
                <div className="bg-orange-100 p-3 rounded-lg w-fit mb-4">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl font-bold">Team Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Role-based access control with approval workflows and team management features.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Hiring Process?
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Join hundreds of companies who trust VerifyPro for their document verification needs.
            Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl"
              onClick={() => navigate('/')}
            >
              Start Free Trial
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-xl"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-blue-600 p-2 rounded-xl">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">VerifyPro</h3>
                  <p className="text-sm text-gray-400">AI Verification Platform</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                Empowering HR teams with AI-powered document verification. 
                Make confident hiring decisions with our secure, fast, and accurate platform.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400">© 2024 VerifyPro. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
