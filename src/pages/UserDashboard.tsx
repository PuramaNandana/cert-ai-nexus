
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDashboardHeader from '@/components/dashboard/UserDashboardHeader';
import SummaryStatsCards from '@/components/dashboard/SummaryStatsCards';
import QuickActionsCard from '@/components/dashboard/QuickActionsCard';
import UserDocumentsList from '@/components/dashboard/UserDocumentsList';
import DocumentRequestsList from '@/components/dashboard/DocumentRequestsList';

interface UserDocument {
  id: string;
  documentId: string;
  fileName: string;
  fileType: string;
  status: 'pending' | 'verified' | 'rejected';
  confidenceScore: number;
  uploadDate: string;
  source: 'manual' | 'digilocker';
  hrNotes?: string;
  fileUrl?: string;
}

interface PendingRequest {
  id: string;
  hrId: string;
  docType: string;
  notes: string;
  requestDate: string;
  dueDate: string;
}

type FilterType = 'all' | 'verified' | 'pending' | 'digilocker';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<UserDocument[]>([]);
  const [requests, setRequests] = useState<PendingRequest[]>([]);
  const [user, setUser] = useState<any>(null);
  const [digilockerConnected, setDigilockerConnected] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'user') {
      navigate('/hr-dashboard');
      return;
    }
    
    setUser(parsedUser);
    loadUserData();
    
    const digilockerStatus = localStorage.getItem('digilocker_connected') === 'true';
    setDigilockerConnected(digilockerStatus);
  }, [navigate]);

  const loadUserData = () => {
    // Load user documents from localStorage (in real app, this would be from API)
    const storedDocs = localStorage.getItem('user_documents');
    if (storedDocs) {
      setDocuments(JSON.parse(storedDocs));
    } else {
      // Load mock data if no stored documents
      loadMockData();
    }
  };

  const loadMockData = () => {
    const mockDocuments = [
      {
        id: 'DOC001',
        documentId: 'RES001',
        fileName: 'my_resume.pdf',
        fileType: 'resume',
        status: 'verified' as const,
        confidenceScore: 94,
        uploadDate: '2024-01-15',
        source: 'manual' as const,
        hrNotes: 'Resume verified successfully. All information matches.',
        fileUrl: 'https://drive.google.com/file/d/sample1'
      },
      {
        id: 'DOC002',
        documentId: 'CER001',
        fileName: 'degree_certificate.pdf',
        fileType: 'certificate',
        status: 'pending' as const,
        confidenceScore: 0,
        uploadDate: '2024-01-16',
        source: 'digilocker' as const,
        fileUrl: 'https://drive.google.com/file/d/sample2'
      },
      {
        id: 'DOC003',
        documentId: 'EXP001',
        fileName: 'experience_letter.pdf',
        fileType: 'experience',
        status: 'rejected' as const,
        confidenceScore: 42,
        uploadDate: '2024-01-14',
        source: 'manual' as const,
        hrNotes: 'Document quality insufficient. Please upload a clearer version.',
        fileUrl: 'https://drive.google.com/file/d/sample3'
      }
    ];

    setDocuments(mockDocuments);
    localStorage.setItem('user_documents', JSON.stringify(mockDocuments));

    setRequests([
      {
        id: 'REQ001',
        hrId: 'HR5M8K9L',
        docType: 'Degree Certificate',
        notes: 'Please provide your degree certificate from university',
        requestDate: '2025-07-10',
        dueDate: '2025-07-15'
      },
      {
        id: 'REQ002',
        hrId: 'HR2B7N4P',
        docType: 'Internship Certificate',
        notes: 'Internship certificate from previous company required',
        requestDate: '2025-07-09',
        dueDate: '2025-07-18'
      }
    ]);
  };

  const handleDigiLockerConnect = () => {
    setDigilockerConnected(true);
    // Reload documents to include any new DigiLocker documents
    loadUserData();
  };

  const handleCardClick = (cardType: 'total' | 'verified' | 'pending' | 'requests') => {
    switch (cardType) {
      case 'total':
        setActiveFilter('all');
        break;
      case 'verified':
        setActiveFilter('verified');
        break;
      case 'pending':
        setActiveFilter('pending');
        break;
      case 'requests':
        // Scroll to document requests section
        const requestsElement = document.getElementById('document-requests');
        if (requestsElement) {
          requestsElement.scrollIntoView({ behavior: 'smooth' });
        }
        break;
    }
  };

  const getFilteredDocuments = () => {
    switch (activeFilter) {
      case 'verified':
        return documents.filter(doc => doc.status === 'verified');
      case 'pending':
        return documents.filter(doc => doc.status === 'pending');
      case 'digilocker':
        return documents.filter(doc => doc.source === 'digilocker');
      default:
        return documents;
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors">
      <UserDashboardHeader user={user} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <SummaryStatsCards 
          totalDocuments={documents.length}
          verifiedDocuments={documents.filter(d => d.status === 'verified').length}
          pendingDocuments={documents.filter(d => d.status === 'pending').length}
          activeRequests={requests.length}
          onCardClick={handleCardClick}
        />
        
        <QuickActionsCard 
          digilockerConnected={digilockerConnected} 
          onDigiLockerConnect={handleDigiLockerConnect}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <UserDocumentsList 
              documents={getFilteredDocuments()} 
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </div>

          <div className="lg:col-span-1">
            <DocumentRequestsList requests={requests} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
