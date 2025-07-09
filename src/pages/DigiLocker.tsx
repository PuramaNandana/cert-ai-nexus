
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, Download, ExternalLink, ArrowLeft, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface DigiLockerDocument {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  docType: string;
  verified: boolean;
  downloadUrl?: string;
}

const DigiLocker = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [documents, setDocuments] = useState<DigiLockerDocument[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/');
      return;
    }
    setUser(JSON.parse(userData));

    // Check if DigiLocker is already connected
    const connected = localStorage.getItem('digilocker_connected') === 'true';
    setIsConnected(connected);
    
    if (connected) {
      loadDigiLockerDocuments();
    }
  }, [navigate]);

  const loadDigiLockerDocuments = () => {
    // Mock DigiLocker documents
    setDocuments([
      {
        id: '1',
        name: 'Aadhaar Card',
        issuer: 'UIDAI',
        issueDate: '2018-03-15',
        docType: 'Identity',
        verified: true
      },
      {
        id: '2',
        name: 'PAN Card',
        issuer: 'Income Tax Department',
        issueDate: '2017-08-22',
        docType: 'Identity',
        verified: true
      },
      {
        id: '3',
        name: 'Driving License',
        issuer: 'RTO Delhi',
        issueDate: '2019-11-08',
        docType: 'License',
        verified: true
      },
      {
        id: '4',
        name: 'Degree Certificate - B.Tech',
        issuer: 'ABC University',
        issueDate: '2020-07-15',
        docType: 'Education',
        verified: true
      },
      {
        id: '5',
        name: 'Class 12 Certificate',
        issuer: 'CBSE',
        issueDate: '2016-05-20',
        docType: 'Education',
        verified: true
      }
    ]);
  };

  const handleConnectDigiLocker = async () => {
    setIsConnecting(true);
    
    // Simulate OAuth connection process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    localStorage.setItem('digilocker_connected', 'true');
    setIsConnected(true);
    loadDigiLockerDocuments();
    
    toast({
      title: 'DigiLocker Connected!',
      description: 'Your official documents are now available for verification.',
    });
    
    setIsConnecting(false);
  };

  const handleDisconnect = () => {
    localStorage.removeItem('digilocker_connected');
    setIsConnected(false);
    setDocuments([]);
    
    toast({
      title: 'DigiLocker Disconnected',
      description: 'Your DigiLocker connection has been removed.',
    });
  };

  const handleUseDocument = (doc: DigiLockerDocument) => {
    toast({
      title: 'Document Selected',
      description: `${doc.name} will be used for verification.`,
    });
    
    // Store selected document for verification
    const existingUploads = JSON.parse(localStorage.getItem('user_uploads') || '[]');
    const newUpload = {
      id: Date.now().toString(),
      fileName: doc.name,
      documentType: doc.docType.toLowerCase(),
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'verified',
      confidenceScore: 98,
      source: 'digilocker',
      extractedInfo: {
        name: user?.name || 'User Name',
        issuer: doc.issuer,
        issueDate: doc.issueDate
      }
    };
    
    localStorage.setItem('user_uploads', JSON.stringify([...existingUploads, newUpload]));
  };

  const handleBack = () => {
    if (user?.role === 'hr') {
      navigate('/hr-dashboard');
    } else {
      navigate('/user-dashboard');
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button onClick={handleBack} variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center">
              <div className="bg-purple-600 p-2 rounded-lg mr-3">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">DigiLocker Integration</h1>
                <p className="text-sm text-gray-500">Connect and verify official government documents</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isConnected ? (
          /* Connection Card */
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-20 h-20 mx-auto mb-4">
                <Shield className="h-12 w-12 text-purple-600" />
              </div>
              <CardTitle className="text-2xl">Connect to DigiLocker</CardTitle>
              <CardDescription className="text-lg">
                Access your verified government documents instantly
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-3">What is DigiLocker?</h3>
                <p className="text-blue-800 mb-4">
                  DigiLocker is a secure digital document wallet by the Government of India. 
                  It stores your official documents like Aadhaar, PAN, Driving License, and educational certificates.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm">100% Government Verified</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Secure & Encrypted</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Instant Verification</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm">No Manual Upload Needed</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  onClick={handleConnectDigiLocker}
                  disabled={isConnecting}
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 px-8 py-3"
                >
                  {isConnecting ? (
                    <>
                      <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                      Connecting to DigiLocker...
                    </>
                  ) : (
                    <>
                      <Shield className="h-5 w-5 mr-2" />
                      Connect DigiLocker
                    </>
                  )}
                </Button>
                <p className="text-sm text-gray-500 mt-2">
                  You'll be redirected to DigiLocker for secure authentication
                </p>
              </div>

              <div className="border-t pt-6">
                <p className="text-xs text-gray-500 text-center">
                  By connecting DigiLocker, you agree to share your document information with this platform for verification purposes only.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Connected State */
          <div className="space-y-6">
            {/* Connection Status */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-green-800">DigiLocker Connected</CardTitle>
                      <CardDescription>Your official documents are now available</CardDescription>
                    </div>
                  </div>
                  <Button onClick={handleDisconnect} variant="outline" size="sm">
                    Disconnect
                  </Button>
                </div>
              </CardHeader>
            </Card>

            {/* Documents Grid */}
            <Card>
              <CardHeader>
                <CardTitle>Available Documents</CardTitle>
                <CardDescription>
                  These documents are verified by government authorities and can be used for instant verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{doc.name}</h4>
                          <p className="text-sm text-gray-600">{doc.issuer}</p>
                          <p className="text-xs text-gray-500">Issued: {doc.issueDate}</p>
                        </div>
                        {doc.verified && (
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          onClick={() => handleUseDocument(doc)}
                          size="sm" 
                          className="flex-1 bg-purple-600 hover:bg-purple-700"
                        >
                          Use for Verification
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Help Section */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Document Not Found?</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      If your document is not available in DigiLocker, you can still upload it manually.
                    </p>
                    <Button variant="outline" size="sm" onClick={() => navigate('/upload')}>
                      Upload Manually
                    </Button>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">DigiLocker Support</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      For issues with DigiLocker connection or documents, visit the official support.
                    </p>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      DigiLocker Help
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default DigiLocker;
