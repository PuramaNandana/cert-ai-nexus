import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Upload, FileText, Send, Eye, MoreHorizontal, LogOut, Search, Filter, Plus, Users, Clock, CheckCircle2, XCircle, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AIResultPopup from '@/components/AIResultPopup';
import SummaryStatsCards from '@/components/dashboard/SummaryStatsCards';

interface Document {
  id: string;
  candidateId: string;
  documentId: string;
  fileName: string;
  fileType: string;
  status: 'pending' | 'verified' | 'rejected';
  confidenceScore: number;
  uploadDate: string;
  source: 'manual' | 'digilocker';
  fileUrl?: string;
}

interface DocumentRequest {
  id: string;
  candidateId: string;
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
      navigate('/login');
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
        id: 'DOC001',
        candidateId: 'USR7X9K2M',
        documentId: 'RES001',
        fileName: 'resume_001.pdf',
        fileType: 'resume',
        status: 'verified',
        confidenceScore: 92,
        uploadDate: '2024-01-15',
        source: 'manual',
        fileUrl: 'https://drive.google.com/file/d/sample1'
      },
      {
        id: 'DOC002',
        candidateId: 'USR3M8N1K',
        documentId: 'CER001',
        fileName: 'degree_certificate_001.pdf',
        fileType: 'certificate',
        status: 'pending',
        confidenceScore: 0,
        uploadDate: '2024-01-16',
        source: 'digilocker',
        fileUrl: 'https://drive.google.com/file/d/sample2'
      },
      {
        id: 'DOC003',
        candidateId: 'USR5P2Q8R',
        documentId: 'EXP001',
        fileName: 'experience_letter_001.pdf',
        fileType: 'experience',
        status: 'rejected',
        confidenceScore: 45,
        uploadDate: '2024-01-14',
        source: 'manual',
        fileUrl: 'https://drive.google.com/file/d/sample3'
      }
    ]);

    setRequests([
      {
        id: 'REQ001',
        candidateId: 'USR9K4L6N',
        docType: 'Degree Certificate',
        status: 'open',
        requestDate: '2024-01-16',
        notes: 'Please provide your bachelor degree certificate'
      },
      {
        id: 'REQ002',
        candidateId: 'USR2B7M9P',
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
          <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 dark:bg-green-900 dark:text-green-300">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 dark:bg-red-900 dark:text-red-300">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 dark:bg-amber-900 dark:text-amber-300">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case 'open':
        return (
          <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300">
            <FileText className="h-3 w-3 mr-1" />
            Open
          </Badge>
        );
      case 'fulfilled':
        return (
          <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 dark:bg-green-900 dark:text-green-300">
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
    navigate('/login');
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
  };

  const handleUploadDocument = () => {
    toast({
      title: 'Upload Feature',
      description: 'This will integrate with Google Drive API for document upload.',
    });
  };

  const handleViewDocument = (doc: Document) => {
    setSelectedDocument(doc);
    setShowAIPopup(true);
  };

  const handleVerifyDocument = async (docId: string) => {
    toast({
      title: 'Document Verification',
      description: 'Sending document to AI verification service...',
    });
    
    setTimeout(() => {
      setDocuments(prev => prev.map(doc => 
        doc.id === docId 
          ? { ...doc, status: 'verified' as const, confidenceScore: Math.floor(Math.random() * 30) + 70 }
          : doc
      ));
      
      toast({
        title: 'Verification Complete',
        description: 'Document has been verified successfully.',
      });
    }, 2000);
  };

  const handleStatsCardClick = (cardType: 'total' | 'verified' | 'pending' | 'requests') => {
    switch (cardType) {
      case 'total':
        setStatusFilter('all');
        setSearchTerm('');
        break;
      case 'verified':
        setStatusFilter('verified');
        setSearchTerm('');
        break;
      case 'pending':
        setStatusFilter('pending');
        setSearchTerm('');
        break;
      case 'requests':
        toast({
          title: 'Navigate to Requests',
          description: 'This would navigate to the requests section.',
        });
        break;
    }
  };

  const filteredDocuments = documents.filter(document => {
    const matchesSearch = document.candidateId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         document.documentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         document.fileName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || document.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 p-3 rounded-xl shadow-lg">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">HR Portal</h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium">Document Verification Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Welcome back,</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.id}</p>
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
        <SummaryStatsCards
          totalDocuments={documents.length}
          verifiedDocuments={documents.filter(d => d.status === 'verified').length}
          pendingDocuments={documents.filter(d => d.status === 'pending').length}
          activeRequests={requests.filter(r => r.status === 'open').length}
          onCardClick={handleStatsCardClick}
        />

        <Card className="bg-white dark:bg-slate-800 border-0 shadow-sm rounded-xl mb-8">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Document Verification Queue</CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400">
                  Review and manage candidate document verification requests
                </CardDescription>
              </div>
              <Button onClick={handleUploadDocument} className="bg-blue-600 hover:bg-blue-700 rounded-lg px-6">
                <Plus className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by Candidate ID, Document ID, or filename..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-lg border-gray-300 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48 rounded-lg border-gray-300 dark:bg-slate-700 dark:border-slate-600">
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate ID</TableHead>
                  <TableHead>Document ID</TableHead>
                  <TableHead>Document Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Confidence Score</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">{doc.candidateId}</TableCell>
                    <TableCell className="font-mono text-sm">{doc.documentId}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="capitalize">{doc.fileType}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(doc.status)}</TableCell>
                    <TableCell>
                      {doc.status !== 'pending' ? (
                        <div className="flex items-center space-x-2">
                          <Progress value={doc.confidenceScore} className="w-16 h-2" />
                          <span className="text-sm font-medium">{doc.confidenceScore}%</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500 dark:text-gray-400">
                      {doc.uploadDate}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button 
                          onClick={() => handleViewDocument(doc)}
                          variant="outline" 
                          size="sm"
                          className="rounded-lg"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                        {doc.status === 'pending' && (
                          <Button 
                            onClick={() => handleVerifyDocument(doc.id)}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 rounded-lg"
                          >
                            Verify
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

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
            documentId: selectedDocument.documentId,
            fileType: selectedDocument.fileType,
            uploadDate: selectedDocument.uploadDate
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
