
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, FileText, Clock } from 'lucide-react';
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

  const handleRespondToRequest = (requestId: string, docType: string) => {
    toast({
      title: 'Redirecting to Upload',
      description: `Upload your ${docType} to fulfill this request.`,
    });
    navigate('/upload');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card className="bg-white dark:bg-slate-800 border-0 shadow-sm rounded-xl" id="document-requests">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Document Requests
        </CardTitle>
        <CardDescription className="text-gray-500 dark:text-gray-400">
          HR has requested these documents ({requests.length} pending)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {requests.map((request) => {
            const daysUntilDue = getDaysUntilDue(request.dueDate);
            const isUrgent = daysUntilDue <= 3;
            
            return (
              <div 
                key={request.id} 
                className={`p-4 border-2 rounded-xl transition-colors ${
                  isUrgent 
                    ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30' 
                    : 'border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      {request.docType}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-mono mt-1">
                      Request ID: {request.id}
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <Badge 
                      className={`rounded-full text-xs ${
                        isUrgent 
                          ? 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-300' 
                          : 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900 dark:text-orange-300'
                      }`}
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      {daysUntilDue > 0 ? `${daysUntilDue} days left` : 'Overdue'}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                  {request.notes}
                </p>
                
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-4 space-y-1">
                  <p>From: <span className="font-mono">{request.hrId}</span></p>
                  <p>Requested: {formatDate(request.requestDate)}</p>
                  <p>Due: <span className={isUrgent ? 'text-red-600 dark:text-red-400 font-medium' : ''}>
                    {formatDate(request.dueDate)}
                  </span></p>
                </div>
                
                <Button 
                  onClick={() => handleRespondToRequest(request.id, request.docType)}
                  className={`w-full rounded-lg text-sm ${
                    isUrgent 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-orange-600 hover:bg-orange-700 text-white'
                  }`}
                  aria-label={`Upload ${request.docType} document`}
                >
                  Upload Document
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentRequestsList;
