
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDashboardHeader from '@/components/dashboard/UserDashboardHeader';
import UserStatsOverview from '@/components/dashboard/UserStatsOverview';
import QuickActionsCard from '@/components/dashboard/QuickActionsCard';
import UserDocumentsList from '@/components/dashboard/UserDocumentsList';
import DocumentRequestsList from '@/components/dashboard/DocumentRequestsList';
import DocumentTabs from '@/components/dashboard/DocumentTabs';

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

const UserDashboard = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<UserDocument[]>([]);
  const [requests, setRequests] = useState<PendingRequest[]>([]);
  const [user, setUser] = useState<any>(null);
  const [digilockerConnected, setDigilockerConnected] = useState(false);

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
        docType: 'Experience Certificate',
        notes: 'Please provide your previous employment certificate from ABC Corp',
        requestDate: '2024-01-16',
        dueDate: '2024-01-20'
      },
      {
        id: 'REQ002',
        hrId: 'HR2B7N4P',
        docType: 'Skill Certification',
        notes: 'AWS certification or similar cloud platform certification required',
        requestDate: '2024-01-15',
        dueDate: '2024-01-22'
      }
    ]);
  };

  const handleDigiLockerConnect = () => {
    setDigilockerConnected(true);
    // Reload documents to include any new DigiLocker documents
    loadUserData();
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors">
      <UserDashboardHeader user={user} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <UserStatsOverview documents={documents} digilockerConnected={digilockerConnected} />
        
        <QuickActionsCard 
          digilockerConnected={digilockerConnected} 
          onDigiLockerConnect={handleDigiLockerConnect}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <DocumentTabs documents={documents}>
              {(filteredDocuments, activeTab) => (
                <UserDocumentsList documents={filteredDocuments} />
              )}
            </DocumentTabs>
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
