
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Shield, CheckCircle, FileText, Zap } from 'lucide-react';
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
    console.log('Connecting DigiLocker with ABC ID:', abcId);
    
    // Store DigiLocker connection info
    localStorage.setItem('digilocker_connected', 'true');
    localStorage.setItem('digilocker_abc_id', abcId);
    localStorage.setItem('digilocker_connection_date', new Date().toISOString());
    
    // Add mock DigiLocker documents
    const mockDigiLockerDocs = [
      {
        id: 'DL_AADHAAR_001',
        documentId: 'AADHAAR_' + abcId,
        fileName: 'aadhaar_card_verified.xml',
        fileType: 'identity',
        status: 'verified' as const,
        confidenceScore: 100,
        uploadDate: new Date().toISOString().split('T')[0],
        source: 'digilocker' as const,
        hrNotes: 'Auto-verified through DigiLocker - Government authenticated document'
      },
      {
        id: 'DL_PAN_001',
        documentId: 'PAN_' + abcId,
        fileName: 'pan_card_verified.xml',
        fileType: 'identity',
        status: 'verified' as const,
        confidenceScore: 100,
        uploadDate: new Date().toISOString().split('T')[0],
        source: 'digilocker' as const,
        hrNotes: 'Auto-verified through DigiLocker - Government authenticated document'
      },
      {
        id: 'DL_EDU_001',
        documentId: 'EDU_' + abcId,
        fileName: 'degree_certificate_verified.xml',
        fileType: 'certificate',
        status: 'verified' as const,
        confidenceScore: 100,
        uploadDate: new Date().toISOString().split('T')[0],
        source: 'digilocker' as const,
        hrNotes: 'Educational certificate verified through DigiLocker'
      }
    ];

    // Store documents
    const existingDocs = JSON.parse(localStorage.getItem('user_documents') || '[]');
    const updatedDocs = [...existingDocs, ...mockDigiLockerDocs];
    localStorage.setItem('user_documents', JSON.stringify(updatedDocs));
    
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
            {digilockerConnected 
              ? "Upload additional documents or manage your DigiLocker connection"
              : "Upload documents manually or connect your DigiLocker for instant verification"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Manual Upload Button */}
            <Button 
              onClick={() => navigate('/upload')}
              className="flex items-center justify-center space-x-3 h-20 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <Upload className="h-6 w-6" />
              <div className="text-left">
                <div className="font-semibold">Manual Upload</div>
                <div className="text-xs text-blue-100">Upload documents directly</div>
              </div>
            </Button>
            
            {/* DigiLocker Section */}
            {digilockerConnected ? (
              <div className="flex items-center justify-center space-x-3 h-20 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                <div className="text-center">
                  <div className="font-semibold text-green-700 dark:text-green-300">DigiLocker Connected</div>
                  <div className="text-xs text-green-600 dark:text-green-400">
                    {JSON.parse(localStorage.getItem('user_documents') || '[]')
                      .filter((doc: any) => doc.source === 'digilocker').length} verified documents imported
                  </div>
                </div>
              </div>
            ) : (
              <Button 
                onClick={() => setShowDigiLockerModal(true)}
                variant="outline"
                className="flex items-center justify-center space-x-3 h-20 border-2 border-purple-200 hover:border-purple-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 dark:border-purple-700 dark:hover:border-purple-600 dark:hover:from-purple-900/20 dark:hover:to-purple-900/30 rounded-lg transition-all group"
              >
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-purple-700 dark:text-purple-300 flex items-center">
                    Connect DigiLocker
                    <Zap className="h-3 w-3 ml-1" />
                  </div>
                  <div className="text-xs text-purple-600 dark:text-purple-400">Instant verification</div>
                </div>
              </Button>
            )}
          </div>
          
          {/* Additional Info for DigiLocker */}
          {!digilockerConnected && (
            <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="flex items-start space-x-2">
                <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400 mt-0.5" />
                <div className="text-xs text-purple-700 dark:text-purple-300">
                  <strong>Why connect DigiLocker?</strong>
                  <br />
                  Get instant verification for government documents like Aadhaar, PAN, and educational certificates. 
                  Documents are pre-verified and trusted by employers.
                </div>
              </div>
            </div>
          )}
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
