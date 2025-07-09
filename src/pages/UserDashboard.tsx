
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDashboardHeader from '@/components/dashboard/UserDashboardHeader';
import UserStatsOverview from '@/components/dashboard/UserStatsOverview';
import QuickActionsCard from '@/components/dashboard/QuickActionsCard';
import UserDocumentsList from '@/components/dashboard/UserDocumentsList';
import DocumentRequestsList from '@/components/dashboard/DocumentRequestsList';

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

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <UserDashboardHeader user={user} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <UserStatsOverview documents={documents} digilockerConnected={digilockerConnected} />
        
        <QuickActionsCard digilockerConnected={digilockerConnected} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <UserDocumentsList documents={documents} />
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
