
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, Shield, CheckCircle, LogOut, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface UserDocument {
  id: string;
  fileName: string;
  fileType: string;
  status: 'pending' | 'verified' | 'rejected';
  confidenceScore: number;
  uploadDate: string;
  source: 'manual' | 'digilocker';
  hrNotes?: string;
}

interface PendingRequest {
  id: string;
  hrName: string;
  hrEmail: string;
  docType: string;
  notes: string;
  requestDate: string;
  dueDate: string;
}

const UserDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [documents, setDocuments] = useState<UserDocument[]>([]);
  const [requests, setRequests] = useState<PendingRequest[]>([]);
  const [user, setUser] = useState<any>(null);
  const [digilockerConnected, setDigilockerConnected] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'user') {
      navigate('/hr-dashboard');
      return;
    }
    
    setUser(parsedUser);
    loadMockData();
    
    // Check DigiLocker connection status
    const digilockerStatus = localStorage.getItem('digilocker_connected') === 'true';
    setDigilockerConnected(digilockerStatus);
  }, [navigate]);

  const loadMockData = () => {
    setDocuments([
      {
        id: '1',
        fileName: 'my_resume.pdf',
        fileType: 'resume',
        status: 'verified',
        confidenceScore: 94,
        uploadDate: '2024-01-15',
        source: 'manual',
        hrNotes: 'Resume verified successfully. All information matches.'
      },
      {
        id: '2',
        fileName: 'degree_certificate.pdf',
        fileType: 'certificate',
        status: 'pending',
        confidenceScore: 0,
        uploadDate: '2024-01-16',
        source: 'digilocker'
      },
      {
        id: '3',
        fileName: 'experience_letter.pdf',
        fileType: 'certificate',
        status: 'rejected',
        confidenceScore: 42,
        uploadDate: '2024-01-14',
        source: 'manual',
        hrNotes: 'Document quality insufficient. Please upload a clearer version.'
      }
    ]);

    setRequests([
      {
        id: '1',
        hrName: 'Sarah Wilson',
        hrEmail: 'sarah.wilson@techcorp.com',
        docType: 'Experience Certificate',
        notes: 'Please provide your previous employment certificate from ABC Corp',
        requestDate: '2024-01-16',
        dueDate: '2024-01-20'
      },
      {
        id: '2',
        hrName: 'Mike Johnson',
        hrEmail: 'mike.j@startupco.com',
        docType: 'Skill Certification',
        notes: 'AWS certification or similar cloud platform certification required',
        requestDate: '2024-01-15',
        dueDate: '2024-01-22'
      }
    ]);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800 border-green-200">🟢 Verified</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 border-red-200">🔴 Rejected</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">🟡 Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('digilocker_connected');
    navigate('/');
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
  };

  const handleUploadDocument = () => {
    navigate('/upload');
  };

  const handleConnectDigiLocker = () => {
    navigate('/digilocker');
  };

  const handleRespondToRequest = (requestId: string) => {
    toast({
      title: 'Redirecting to Upload',
      description: 'Upload the requested document to fulfill this request.',
    });
    navigate('/upload');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-green-600 p-2 rounded-lg mr-3">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">My Documents</h1>
                <p className="text-sm text-gray-500">Verification Status Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {user.name}</span>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats Overview */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">My Documents</p>
                    <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Verified</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {documents.filter(d => d.status === 'verified').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Upload className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {documents.filter(d => d.status === 'pending').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">DigiLocker</p>
                    <p className="text-sm font-bold text-gray-900">
                      {digilockerConnected ? 'Connected' : 'Not Connected'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-3 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your documents and verification status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button onClick={handleUploadDocument} className="bg-blue-600 hover:bg-blue-700 h-auto p-4">
                    <div className="text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2" />
                      <div className="font-medium">Upload Document</div>
                      <div className="text-xs opacity-90">Add new certificates or resume</div>
                    </div>
                  </Button>
                  
                  <Button 
                    onClick={handleConnectDigiLocker} 
                    variant={digilockerConnected ? "secondary" : "outline"}
                    className="h-auto p-4"
                  >
                    <div className="text-center">
                      <Shield className="h-8 w-8 mx-auto mb-2" />
                      <div className="font-medium">
                        {digilockerConnected ? 'DigiLocker Connected' : 'Connect DigiLocker'}
                      </div>
                      <div className="text-xs opacity-90">
                        {digilockerConnected ? 'Manage connection' : 'Verify official documents'}
                      </div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="h-auto p-4">
                    <div className="text-center">
                      <FileText className="h-8 w-8 mx-auto mb-2" />
                      <div className="font-medium">View Reports</div>
                      <div className="text-xs opacity-90">Download verification reports</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* My Documents */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>My Documents</CardTitle>
                <CardDescription>Track your document verification status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-100 p-2 rounded">
                            <FileText className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{doc.fileName}</h4>
                            <p className="text-sm text-gray-500 capitalize">{doc.fileType}</p>
                          </div>
                        </div>
                        {getStatusBadge(doc.status)}
                      </div>
                      
                      {doc.status !== 'pending' && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600">Confidence Score</span>
                            <span className="text-sm font-medium">{doc.confidenceScore}%</span>
                          </div>
                          <Progress value={doc.confidenceScore} className="h-2" />
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Uploaded: {doc.uploadDate}</span>
                        <span className="capitalize">{doc.source}</span>
                      </div>
                      
                      {doc.hrNotes && (
                        <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
                          <p className="font-medium text-gray-700">HR Notes:</p>
                          <p className="text-gray-600">{doc.hrNotes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pending Requests */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Document Requests</CardTitle>
                <CardDescription>HR has requested these documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requests.map((request) => (
                    <div key={request.id} className="p-4 border rounded-lg border-orange-200 bg-orange-50">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{request.docType}</h4>
                          <p className="text-sm text-gray-600">From: {request.hrName}</p>
                        </div>
                        <Badge className="bg-orange-100 text-orange-800 border-orange-200">Urgent</Badge>
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-3">{request.notes}</p>
                      
                      <div className="text-xs text-gray-500 mb-3">
                        <p>Requested: {request.requestDate}</p>
                        <p>Due: {request.dueDate}</p>
                      </div>
                      
                      <Button 
                        onClick={() => handleRespondToRequest(request.id)}
                        size="sm" 
                        className="w-full bg-orange-600 hover:bg-orange-700"
                      >
                        Upload Document
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
