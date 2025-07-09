
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, CheckCircle2, Clock, Shield } from 'lucide-react';

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

interface UserStatsOverviewProps {
  documents: UserDocument[];
  digilockerConnected: boolean;
}

const UserStatsOverview = ({ documents, digilockerConnected }: UserStatsOverviewProps) => {
  return (
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
  );
};

export default UserStatsOverview;
