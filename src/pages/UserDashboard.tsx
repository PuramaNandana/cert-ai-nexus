import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, Shield, CheckCircle2, LogOut, ExternalLink, Clock, XCircle, Plus, ArrowRight, User } from 'lucide-react';
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
        return (
          <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
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
      {/* Modern Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 p-3 rounded-xl shadow-lg">
                <User className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Documents</h1>
                <p className="text-gray-500 font-medium">Document Verification Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Welcome back,</p>
                <p className="text-sm text-gray-500">{user.name}</p>
              </div>
              <Button onClick={handleLogout} variant="outline" className="rounded-lg border-gray-300 hover:border-gray-400">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">My Documents</p>
                  <p className="text-3xl font-bold text-gray-900">{documents.length}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Verified</p>
                  <p className="text-3xl font-bold text-green-600">
                    {documents.filter(d => d.status === 'verified').length}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Pending</p>
                  <p className="text-3xl font-bold text-amber-600">
                    {documents.filter(d => d.status === 'pending').length}
                  </p>
                </div>
                <div className="bg-amber-100 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">DigiLocker</p>
                  <p className="text-lg font-bold text-gray-900">
                    {digilockerConnected ? (
                      <span className="text-green-600">Connected</span>
                    ) : (
                      <span className="text-gray-400">Not Connected</span>
                    )}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${digilockerConnected ? 'bg-green-100' : 'bg-gray-100'}`}>
                  <Shield className={`h-6 w-6 ${digilockerConnected ? 'text-green-600' : 'text-gray-400'}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Documents */}
          <div className="lg:col-span-2">
            <Card className="bg-white border-0 shadow-sm rounded-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">My Documents</CardTitle>
                <CardDescription className="text-gray-500">Track your document verification status</CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                <div className="space-y-1">
                  {documents.map((doc) => (
                    <div key={doc.id} className="p-6 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="bg-blue-100 p-3 rounded-lg">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{doc.fileName}</h4>
                            <p className="text-sm text-gray-500 capitalize">{doc.fileType}</p>
                          </div>
                        </div>
                        {getStatusBadge(doc.status)}
                      </div>
                      
                      {doc.status !== 'pending' && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-600">Confidence Score</span>
                            <span className="text-sm font-bold text-gray-900">{doc.confidenceScore}%</span>
                          </div>
                          <Progress value={doc.confidenceScore} className="h-3 rounded-full" />
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>Uploaded: {doc.uploadDate}</span>
                        <Badge variant="outline" className="capitalize rounded-full">
                          {doc.source}
                        </Badge>
                      </div>
                      
                      {doc.hrNotes && (
                        <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-200">
                          <p className="text-sm font-medium text-gray-700 mb-1">HR Feedback:</p>
                          <p className="text-sm text-gray-600">{doc.hrNotes}</p>
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
            <Card className="bg-white border-0 shadow-sm rounded-xl">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">Document Requests</CardTitle>
                <CardDescription className="text-gray-500">HR has requested these documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requests.map((request) => (
                    <div key={request.id} className="p-4 border-2 border-orange-200 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-sm">{request.docType}</h4>
                          <p className="text-xs text-gray-600">From: {request.hrName}</p>
                        </div>
                        <Badge className="bg-orange-100 text-orange-800 border-orange-300 rounded-full">
                          Urgent
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-4 line-clamp-2">{request.notes}</p>
                      
                      <div className="text-xs text-gray-500 mb-4 space-y-1">
                        <p>Requested: {request.requestDate}</p>
                        <p>Due: {request.dueDate}</p>
                      </div>
                      
                      <Button 
                        onClick={() => handleRespondToRequest(request.id)}
                        className="w-full bg-orange-600 hover:bg-orange-700 rounded-lg text-sm"
                      >
                        Upload Document
                        <ArrowRight className="h-4 w-4 ml-2" />
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
