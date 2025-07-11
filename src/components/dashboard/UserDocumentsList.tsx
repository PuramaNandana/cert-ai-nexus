
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
          <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (documents.length === 0) {
    return (
      <Card className="bg-white dark:bg-slate-800 border-0 shadow-sm rounded-xl">
        <CardContent className="p-12 text-center">
          <FileText className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No documents found</h3>
          <p className="text-gray-500 dark:text-gray-400">
            No documents match the current filter. Try switching to a different tab or upload some documents.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white dark:bg-slate-800 border-0 shadow-sm rounded-xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">My Documents</CardTitle>
        <CardDescription className="text-gray-500 dark:text-gray-400">Track your document verification status</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-1">
          {documents.map((doc) => (
            <div key={doc.id} className="p-6 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors border-b border-gray-100 dark:border-slate-700 last:border-b-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{doc.fileName}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{doc.fileType}</p>
                  </div>
                </div>
                {getStatusBadge(doc.status)}
              </div>
              
              {doc.status !== 'pending' && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Confidence Score</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{doc.confidenceScore}%</span>
                  </div>
                  <Progress value={doc.confidenceScore} className="h-3 rounded-full" />
                </div>
              )}
              
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span>Uploaded: {doc.uploadDate}</span>
                <Badge variant="outline" className="capitalize rounded-full dark:border-slate-600">
                  {doc.source}
                </Badge>
              </div>
              
              {doc.hrNotes && (
                <div className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg border-l-4 border-blue-200 dark:border-blue-600">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">HR Feedback:</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{doc.hrNotes}</p>
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
