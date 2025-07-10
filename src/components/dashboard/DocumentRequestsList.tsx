
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface PendingRequest {
  id: string;
  hrId: string;
  docType: string;
  notes: string;
  requestDate: string;
  dueDate: string;
}

interface DocumentRequestsListProps {
  requests: PendingRequest[];
}

const DocumentRequestsList = ({ requests }: DocumentRequestsListProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRespondToRequest = (requestId: string) => {
    toast({
      title: 'Redirecting to Upload',
      description: 'Upload the requested document to fulfill this request.',
    });
    navigate('/upload');
  };

  return (
    <Card className="bg-white dark:bg-slate-800 border-0 shadow-sm rounded-xl">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">Document Requests</CardTitle>
        <CardDescription className="text-gray-500 dark:text-gray-400">HR has requested these documents</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="p-4 border-2 border-orange-200 dark:border-orange-800 rounded-xl bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{request.docType}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-mono">From: {request.hrId}</p>
                </div>
                <Badge className="bg-orange-100 text-orange-800 border-orange-300 rounded-full dark:bg-orange-900 dark:text-orange-300">
                  Urgent
                </Badge>
              </div>
              
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">{request.notes}</p>
              
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-4 space-y-1">
                <p>Request ID: <span className="font-mono">{request.id}</span></p>
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
  );
};

export default DocumentRequestsList;
