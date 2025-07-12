
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Clock, Upload } from 'lucide-react';
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

  return (
    <Card className="bg-white dark:bg-slate-800 border-0 shadow-sm rounded-xl" id="document-requests">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Document Requests
        </CardTitle>
        <CardDescription className="text-gray-500 dark:text-gray-400">
          HR has requested these documents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {requests.map((request) => (
            <div 
              key={request.id} 
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-slate-700/50 hover:bg-gray-100 dark:hover:bg-slate-700/70 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center flex-1">
                  <FileText className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-3 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">
                      {request.docType}
                    </h4>
                    <div className="flex items-center gap-3 text-xs">
                      <Badge className="bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900 dark:text-orange-300 rounded-full">
                        ⚠️ Status: Pending
                      </Badge>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Clock className="h-3 w-3 mr-1" />
                        Due: {formatDate(request.dueDate)}
                      </div>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={() => handleRespondToRequest(request.id, request.docType)}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center ml-4"
                  aria-label={`Upload ${request.docType} document`}
                >
                  <Upload className="h-4 w-4 mr-1" />
                  Upload
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentRequestsList;
