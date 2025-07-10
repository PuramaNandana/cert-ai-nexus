
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Sparkles, Zap, Upload, CheckCircle, ArrowRight, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Sparkles,
      title: "AI Verification",
      description: "Advanced machine learning algorithms verify documents with high accuracy in seconds."
    },
    {
      icon: Shield,
      title: "DigiLocker Integration",
      description: "Seamlessly connect with government-verified documents through DigiLocker API."
    },
    {
      icon: Zap,
      title: "Speed",
      description: "Get instant verification results with confidence scores and detailed analysis."
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Upload",
      description: "Upload documents or connect DigiLocker",
      icon: Upload
    },
    {
      step: "02", 
      title: "AI Check",
      description: "Our AI analyzes and validates information",
      icon: Sparkles
    },
    {
      step: "03",
      title: "Result",
      description: "Get detailed verification reports instantly",
      icon: CheckCircle
    }
  ];

  const keyFeatures = [
    {
      icon: Upload,
      title: "Smart Upload",
      description: "Drag-and-drop interface with automatic file type detection."
    },
    {
      icon: Shield,
      title: "DigiLocker",
      description: "Direct integration with government document verification."
    },
    {
      icon: Clock,
      title: "Real-time Tracking",
      description: "Live updates on verification progress with detailed status."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 dark:bg-slate-900/80 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-xl">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">VerifyPro</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">AI Verification Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/login')}>
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
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            AI-Powered Document<br />
            <span className="text-blue-600">Verification Platform</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Streamline your document verification process with intelligent AI technology. 
            Verify credentials instantly and make confident decisions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg font-semibold rounded-xl"
              onClick={() => navigate('/login')}
            >
              Start Verifying with AI
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-6 bg-white dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Us</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Built for modern verification needs with cutting-edge technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl dark:bg-slate-700">
                <CardHeader className="text-center pb-4">
                  <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-xl w-fit mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
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
                  <div className="bg-white dark:bg-slate-700 p-6 rounded-2xl shadow-lg w-24 h-24 mx-auto mb-6 flex items-center justify-center border-4 border-blue-100 dark:border-blue-900">
                    <step.icon className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                  </div>
                  
                  <div className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full w-fit mx-auto mb-4">
                    STEP {step.step}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-sm mx-auto">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-6 bg-white dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Key Features</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need for efficient document verification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {keyFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl dark:bg-slate-700">
                <CardHeader>
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-xl font-bold dark:text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Join the future of document verification with our AI-powered platform.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl"
            onClick={() => navigate('/login')}
          >
            Start Verifying Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
