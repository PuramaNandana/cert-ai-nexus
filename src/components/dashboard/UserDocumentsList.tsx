
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FileText, CheckCircle2, Clock, XCircle } from 'lucide-react';

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

interface UserDocumentsListProps {
  documents: UserDocument[];
}

const UserDocumentsList = ({ documents }: UserDocumentsListProps) => {
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

  return (
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
  );
};

export default UserDocumentsList;
