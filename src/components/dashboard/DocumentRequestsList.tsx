
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

  // Hardcoded document requests as specified
  const hardcodedRequests = [
    {
      id: 'REQ001',
      docType: 'Degree Certificate',
      dueDate: '15 July 2025'
    },
    {
      id: 'REQ002', 
      docType: 'Internship Letter',
      dueDate: '18 July 2025'
    },
    {
      id: 'REQ003',
      docType: '10th Marks Memo', 
      dueDate: '20 July 2025'
    }
  ];

  const handleRespondToRequest = (requestId: string, docType: string) => {
    toast({
      title: 'Redirecting to Upload',
      description: `Upload your ${docType} to fulfill this request.`,
    });
    navigate('/upload');
  };

  return (
    <Card className="bg-white dark:bg-slate-800 border-0 shadow-sm rounded-xl" id="document-requests">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <FileText className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-400" />
          Document Requests
        </CardTitle>
        <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
          HR has requested the following documents.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {hardcodedRequests.map((request) => (
            <Card key={request.id} className="bg-gray-50 dark:bg-slate-700/20 border border-gray-200 dark:border-gray-700 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1 min-w-0">
                    <FileText className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-2">
                        {request.docType}
                      </h4>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800 text-xs font-normal px-2 py-0.5">
                          Status: Pending
                        </Badge>
                        <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                          <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                          Due: {request.dueDate}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-4 flex-shrink-0">
                    <Button 
                      onClick={() => handleRespondToRequest(request.id, request.docType)}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium px-3 py-1.5 h-8 text-xs min-w-[80px]"
                      aria-label={`Upload ${request.docType} document`}
                    >
                      <Upload className="h-3 w-3 mr-1.5 flex-shrink-0" />
                      Upload
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentRequestsList;
