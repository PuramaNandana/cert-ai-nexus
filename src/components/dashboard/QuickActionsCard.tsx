
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Shield, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DigiLockerModal from '@/components/DigiLockerModal';
import { useToast } from '@/hooks/use-toast';

interface QuickActionsCardProps {
  digilockerConnected: boolean;
  onDigiLockerConnect?: () => void;
}

const QuickActionsCard = ({ digilockerConnected, onDigiLockerConnect }: QuickActionsCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showDigiLockerModal, setShowDigiLockerModal] = useState(false);

  const handleDigiLockerConnect = (abcId: string) => {
    console.log('Connecting with ABC ID:', abcId);
    
    // Simulate storing the connection
    localStorage.setItem('digilocker_connected', 'true');
    localStorage.setItem('digilocker_abc_id', abcId);
    
    // Add some mock documents from DigiLocker
    const mockDigiLockerDocs = [
      {
        id: 'DL001',
        documentId: 'AADHAAR001',
        fileName: 'aadhaar_card.xml',
        fileType: 'identity',
        status: 'verified' as const,
        confidenceScore: 100,
        uploadDate: new Date().toISOString().split('T')[0],
        source: 'digilocker' as const,
        hrNotes: 'Auto-verified through DigiLocker'
      },
      {
        id: 'DL002',
        documentId: 'PAN001',
        fileName: 'pan_card.xml',
        fileType: 'identity',
        status: 'verified' as const,
        confidenceScore: 100,
        uploadDate: new Date().toISOString().split('T')[0],
        source: 'digilocker' as const,
        hrNotes: 'Auto-verified through DigiLocker'
      }
    ];

    // Store mock documents
    const existingDocs = JSON.parse(localStorage.getItem('user_documents') || '[]');
    localStorage.setItem('user_documents', JSON.stringify([...existingDocs, ...mockDigiLockerDocs]));
    
    if (onDigiLockerConnect) {
      onDigiLockerConnect();
    }
  };

  return (
    <>
      <Card className="bg-white dark:bg-slate-800 border-0 shadow-sm rounded-xl mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Quick Actions</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Upload documents or connect your DigiLocker for instant verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              onClick={() => navigate('/upload')}
              className="flex items-center justify-center space-x-2 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              <Upload className="h-5 w-5" />
              <span className="font-medium">Upload Documents</span>
            </Button>
            
            {digilockerConnected ? (
              <div className="flex items-center justify-center space-x-2 h-16 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="font-medium text-green-700 dark:text-green-300">DigiLocker Connected</span>
              </div>
            ) : (
              <Button 
                onClick={() => setShowDigiLockerModal(true)}
                variant="outline"
                className="flex items-center justify-center space-x-2 h-16 border-purple-200 hover:border-purple-300 hover:bg-purple-50 dark:border-purple-700 dark:hover:border-purple-600 dark:hover:bg-purple-900/20 rounded-lg"
              >
                <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <span className="font-medium text-purple-700 dark:text-purple-300">Connect DigiLocker</span>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <DigiLockerModal
        isOpen={showDigiLockerModal}
        onClose={() => setShowDigiLockerModal(false)}
        onConnect={handleDigiLockerConnect}
      />
    </>
  );
};

export default QuickActionsCard;
