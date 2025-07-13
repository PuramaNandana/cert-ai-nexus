
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

  // Hardcoded document requests with unique orange-toned styling
  const hardcodedRequests = [
    {
      id: 'REQ001',
      docType: 'Degree Certificate',
      dueDate: '15 July 2025',
      bgClass: 'bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20',
      borderClass: 'border-orange-200 dark:border-orange-800/40',
      iconBg: 'bg-orange-100 dark:bg-orange-900/40',
      iconColor: 'text-orange-600 dark:text-orange-400'
    },
    {
      id: 'REQ002', 
      docType: 'Internship Letter',
      dueDate: '18 July 2025',
      bgClass: 'bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20',
      borderClass: 'border-amber-200 dark:border-amber-800/40',
      iconBg: 'bg-amber-100 dark:bg-amber-900/40',
      iconColor: 'text-amber-600 dark:text-amber-400'
    },
    {
      id: 'REQ003',
      docType: '10th Marks Memo', 
      dueDate: '20 July 2025',
      bgClass: 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20',
      borderClass: 'border-yellow-200 dark:border-yellow-800/40',
      iconBg: 'bg-yellow-100 dark:bg-yellow-900/40',
      iconColor: 'text-yellow-600 dark:text-yellow-400'
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
    <Card className="bg-white dark:bg-slate-800 border-0 shadow-lg rounded-xl" id="document-requests">
      <CardHeader className="pb-6">
        <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          <FileText className="h-6 w-6 mr-3 text-gray-700 dark:text-gray-300" />
          Document Requests
        </CardTitle>
        <CardDescription className="text-base text-gray-600 dark:text-gray-400 ml-9">
          HR has requested the following documents.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 pb-6">
        <div className="space-y-4">
          {hardcodedRequests.map((request) => (
            <Card key={request.id} className={`${request.bgClass} border ${request.borderClass} shadow-sm hover:shadow-md transition-all duration-200 rounded-lg`}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-start flex-1 min-w-0">
                    <div className={`${request.iconBg} p-2.5 rounded-lg mr-4 flex-shrink-0`}>
                      <FileText className={`h-5 w-5 ${request.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-3 leading-tight">
                        {request.docType}
                      </h4>
                      <div className="flex items-center gap-4 flex-wrap">
                        <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/40 dark:text-orange-300 dark:border-orange-700 text-sm font-medium px-3 py-1.5 rounded-full">
                          Status: Pending
                        </Badge>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span className="font-medium">Due: {request.dueDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-6 flex-shrink-0">
                    <Button 
                      onClick={() => handleRespondToRequest(request.id, request.docType)}
                      size="default"
                      className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold px-6 py-3 h-auto text-sm shadow-sm hover:shadow-md transition-all duration-200 rounded-lg"
                      aria-label={`Upload ${request.docType} document`}
                    >
                      <Upload className="h-4 w-4 mr-2 flex-shrink-0" />
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
