import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, Send, Eye, MoreHorizontal, LogOut, Search, Filter, Plus, Users, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AIResultPopup from '@/components/AIResultPopup';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showAIPopup, setShowAIPopup] = useState(false);

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
      case 'open':
        return (
          <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100">
            <FileText className="h-3 w-3 mr-1" />
            Open
          </Badge>
        );
      case 'fulfilled':
        return (
          <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Fulfilled
          </Badge>
        );
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

  const handleViewDocument = (doc: Document) => {
    setSelectedDocument(doc);
    setShowAIPopup(true);
  };

  const filteredDocuments = documents.filter(document => {
    const matchesSearch = document.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         document.candidateEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         document.fileName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || document.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 p-3 rounded-xl shadow-lg">
                <FileText className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">HR Portal</h1>
                <p className="text-gray-500 font-medium">Document Verification Dashboard</p>
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
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Documents</p>
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
                  <p className="text-sm font-medium text-gray-600 mb-1">Pending Review</p>
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
                  <p className="text-sm font-medium text-gray-600 mb-1">Active Requests</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {requests.filter(r => r.status === 'open').length}
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Send className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Documents Section */}
          <div className="lg:col-span-2">
            <Card className="bg-white border-0 shadow-sm rounded-xl">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-900">Candidate Documents</CardTitle>
                    <CardDescription className="text-gray-500">
                      Review and manage uploaded verification documents
                    </CardDescription>
                  </div>
                  <Button onClick={handleUploadForCandidate} className="bg-blue-600 hover:bg-blue-700 rounded-lg px-6">
                    <Plus className="h-4 w-4 mr-2" />
                    Upload Document
                  </Button>
                </div>
                
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search candidates, emails, or documents..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 rounded-lg border-gray-300 focus:border-blue-500"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-48 rounded-lg border-gray-300">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="px-0">
                <div className="space-y-1">
                  {filteredDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="bg-blue-100 p-3 rounded-lg">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate">{doc.candidateName}</h4>
                          <p className="text-sm text-gray-500 truncate">{doc.candidateEmail}</p>
                          <p className="text-xs text-gray-400 truncate">{doc.fileName}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          {getStatusBadge(doc.status)}
                          {doc.status !== 'pending' && (
                            <div className="mt-2">
                              <div className="flex items-center space-x-2">
                                <div className="w-16">
                                  <Progress 
                                    value={doc.confidenceScore} 
                                    className="h-2" 
                                  />
                                </div>
                                <span className="text-xs font-medium text-gray-600">{doc.confidenceScore}%</span>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button 
                            onClick={() => handleViewDocument(doc)}
                            variant="outline" 
                            size="sm"
                            className="rounded-lg border-gray-300 hover:border-blue-400 hover:text-blue-600"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Review
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="rounded-lg">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="rounded-lg">
                              <DropdownMenuItem onClick={handleRequestDocument}>
                                <Send className="h-4 w-4 mr-2" />
                                Request More Docs
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Document Requests */}
          <div className="lg:col-span-1">
            <Card className="bg-white border-0 shadow-sm rounded-xl">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900">Document Requests</CardTitle>
                <CardDescription className="text-gray-500">Pending requests to candidates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requests.map((request) => (
                    <div key={request.id} className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-gray-900 text-sm truncate">{request.candidateName}</h4>
                        {getStatusBadge(request.status)}
                      </div>
                      <p className="text-sm font-medium text-gray-700 mb-2">{request.docType}</p>
                      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{request.notes}</p>
                      <p className="text-xs text-gray-400">Requested: {request.requestDate}</p>
                    </div>
                  ))}
                </div>
                
                <Button onClick={handleRequestDocument} className="w-full mt-6 bg-blue-600 hover:bg-blue-700 rounded-lg">
                  <Plus className="h-4 w-4 mr-2" />
                  New Request
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* AI Results Popup */}
      {selectedDocument && (
        <AIResultPopup
          isOpen={showAIPopup}
          onClose={() => {
            setShowAIPopup(false);
            setSelectedDocument(null);
          }}
          fileName={selectedDocument.fileName}
          status={selectedDocument.status}
          confidenceScore={selectedDocument.confidenceScore}
          extractedInfo={{
            name: selectedDocument.candidateName,
            degree: 'Bachelor of Technology',
            institution: 'ABC University',
            year: '2020'
          }}
          onApprove={() => {
            toast({
              title: 'Document Approved',
              description: 'The document has been successfully verified.',
            });
            setShowAIPopup(false);
            setSelectedDocument(null);
          }}
          onReject={() => {
            toast({
              title: 'Document Rejected',
              description: 'The document has been rejected and candidate will be notified.',
            });
            setShowAIPopup(false);
            setSelectedDocument(null);
          }}
        />
      )}
    </div>
  );
};

export default HRDashboard;
