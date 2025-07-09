
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, Send, Eye, MoreHorizontal, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Document {
  id: string;
  candidateName: string;
  candidateEmail: string;
  fileName: string;
  fileType: string;
  status: 'pending' | 'verified' | 'rejected';
  confidenceScore: number;
  uploadDate: string;
  source: 'manual' | 'digilocker';
}

interface DocumentRequest {
  id: string;
  candidateName: string;
  candidateEmail: string;
  docType: string;
  status: 'open' | 'fulfilled';
  requestDate: string;
  notes: string;
}

const HRDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [requests, setRequests] = useState<DocumentRequest[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'hr') {
      navigate('/user-dashboard');
      return;
    }
    
    setUser(parsedUser);
    loadMockData();
  }, [navigate]);

  const loadMockData = () => {
    // Mock documents data
    setDocuments([
      {
        id: '1',
        candidateName: 'John Smith',
        candidateEmail: 'john@email.com',
        fileName: 'resume_john_smith.pdf',
        fileType: 'resume',
        status: 'verified',
        confidenceScore: 92,
        uploadDate: '2024-01-15',
        source: 'manual'
      },
      {
        id: '2',
        candidateName: 'Sarah Johnson',
        candidateEmail: 'sarah@email.com',
        fileName: 'degree_certificate.pdf',
        fileType: 'certificate',
        status: 'pending',
        confidenceScore: 0,
        uploadDate: '2024-01-16',
        source: 'digilocker'
      },
      {
        id: '3',
        candidateName: 'Mike Chen',
        candidateEmail: 'mike@email.com',
        fileName: 'experience_letter.pdf',
        fileType: 'certificate',
        status: 'rejected',
        confidenceScore: 45,
        uploadDate: '2024-01-14',
        source: 'manual'
      }
    ]);

    setRequests([
      {
        id: '1',
        candidateName: 'Emma Wilson',
        candidateEmail: 'emma@email.com',
        docType: 'Degree Certificate',
        status: 'open',
        requestDate: '2024-01-16',
        notes: 'Please provide your bachelor degree certificate'
      },
      {
        id: '2',
        candidateName: 'David Brown',
        candidateEmail: 'david@email.com',
        docType: 'Experience Letter',
        status: 'fulfilled',
        requestDate: '2024-01-15',
        notes: 'Need previous employment verification'
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
      case 'open':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">📋 Open</Badge>;
      case 'fulfilled':
        return <Badge className="bg-green-100 text-green-800 border-green-200">✅ Fulfilled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
  };

  const handleRequestDocument = () => {
    toast({
      title: 'Document Requested',
      description: 'Request sent to candidate successfully.',
    });
  };

  const handleUploadForCandidate = () => {
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
              <div className="bg-blue-600 p-2 rounded-lg mr-3">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">HR Dashboard</h1>
                <p className="text-sm text-gray-500">Document Verification Portal</p>
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
          {/* Stats Cards */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Documents</p>
                    <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Badge className="h-6 w-6 text-green-600" />
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
                  <div className="bg-red-100 p-3 rounded-full">
                    <Send className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Open Requests</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {requests.filter(r => r.status === 'open').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Documents Table */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Candidate Documents</CardTitle>
                    <CardDescription>Manage and verify uploaded documents</CardDescription>
                  </div>
                  <Button onClick={handleUploadForCandidate} className="bg-blue-600 hover:bg-blue-700">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Document
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-100 p-2 rounded">
                            <FileText className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{doc.candidateName}</h4>
                            <p className="text-sm text-gray-500">{doc.candidateEmail}</p>
                            <p className="text-xs text-gray-400">{doc.fileName}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          {getStatusBadge(doc.status)}
                          {doc.status !== 'pending' && (
                            <div className="mt-2">
                              <div className="flex items-center space-x-2">
                                <Progress 
                                  value={doc.confidenceScore} 
                                  className="w-16 h-2" 
                                />
                                <span className="text-xs font-medium">{doc.confidenceScore}%</span>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleRequestDocument}>
                              <Send className="h-4 w-4 mr-2" />
                              Request More Docs
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Document Requests */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Document Requests</CardTitle>
                <CardDescription>Pending requests to candidates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requests.map((request) => (
                    <div key={request.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">{request.candidateName}</h4>
                        {getStatusBadge(request.status)}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{request.docType}</p>
                      <p className="text-xs text-gray-500">{request.notes}</p>
                      <p className="text-xs text-gray-400 mt-2">Requested: {request.requestDate}</p>
                    </div>
                  ))}
                </div>
                
                <Button onClick={handleRequestDocument} className="w-full mt-4" variant="outline">
                  <Send className="h-4 w-4 mr-2" />
                  New Request
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;
