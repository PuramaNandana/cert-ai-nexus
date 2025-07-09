
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Shield, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuickActionsCardProps {
  digilockerConnected: boolean;
}

const QuickActionsCard = ({ digilockerConnected }: QuickActionsCardProps) => {
  const navigate = useNavigate();

  const handleUploadDocument = () => {
    navigate('/upload');
  };

  const handleConnectDigiLocker = () => {
    navigate('/digilocker');
  };

  return (
    <Card className="bg-white border-0 shadow-sm rounded-xl mb-8">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">Quick Actions</CardTitle>
        <CardDescription className="text-gray-500">Manage your documents and verification status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Button 
            onClick={handleUploadDocument} 
            className="bg-blue-600 hover:bg-blue-700 rounded-xl h-auto p-6 flex-col space-y-3 transition-all hover:scale-105"
          >
            <div className="bg-white/20 p-3 rounded-lg">
              <Upload className="h-8 w-8" />
            </div>
            <div className="text-center">
              <div className="font-semibold">Upload Document</div>
              <div className="text-sm opacity-90">Add certificates or resume</div>
            </div>
          </Button>
          
          <Button 
            onClick={handleConnectDigiLocker} 
            variant={digilockerConnected ? "secondary" : "outline"}
            className="rounded-xl h-auto p-6 flex-col space-y-3 transition-all hover:scale-105 border-2"
          >
            <div className={`p-3 rounded-lg ${digilockerConnected ? 'bg-green-100' : 'bg-blue-100'}`}>
              <Shield className={`h-8 w-8 ${digilockerConnected ? 'text-green-600' : 'text-blue-600'}`} />
            </div>
            <div className="text-center">
              <div className="font-semibold">
                {digilockerConnected ? 'DigiLocker Connected' : 'Connect DigiLocker'}
              </div>
              <div className="text-sm opacity-75">
                {digilockerConnected ? 'Manage connection' : 'Verify official documents'}
              </div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="rounded-xl h-auto p-6 flex-col space-y-3 transition-all hover:scale-105 border-2"
          >
            <div className="bg-gray-100 p-3 rounded-lg">
              <FileText className="h-8 w-8 text-gray-600" />
            </div>
            <div className="text-center">
              <div className="font-semibold">View Reports</div>
              <div className="text-sm opacity-75">Download verification reports</div>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;
