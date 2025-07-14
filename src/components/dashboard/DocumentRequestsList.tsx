
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Clock, Upload, Calendar } from 'lucide-react';
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

  // Document requests data exactly as specified
  const documentRequests = [
    {
      id: 'REQ001',
      docType: 'Degree Certificate',
      dueDate: '15 July 2025',
      status: 'Pending',
      priority: 'high'
    },
    {
      id: 'REQ002',
      docType: 'Internship Letter',
      dueDate: '18 July 2025',
      status: 'Pending',
      priority: 'medium'
    },
    {
      id: 'REQ003',
      docType: '10th Marks Memo',
      dueDate: '20 July 2025',
      status: 'Pending',
      priority: 'low'
    }
  ];

  return (
    <div className="space-y-6" id="document-requests">
      {/* Header Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-orange-100 dark:bg-orange-900/20">
            <FileText className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Document Requests
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              HR has requested the following documents
            </p>
          </div>
        </div>
      </div>

      {/* Document Request Cards */}
      <div className="space-y-5">
        {documentRequests.map((request, index) => (
          <Card key={request.id} className="
            relative 
            bg-orange-50
            dark:bg-gray-800 
            border-0 
            rounded-xl
            shadow-sm 
            hover:shadow-md 
            transition-shadow 
            duration-200
            overflow-hidden
          ">
            {/* Top Orange Border - 5px height */}
            <div className="absolute top-0 left-0 right-0 h-[5px] bg-[#E65100]" />
            
            <CardContent className="p-5">
              {/* Two Column Layout */}
              <div className="flex items-center justify-between gap-6">
                {/* Left Column - Info Section */}
                <div className="flex items-center gap-4 flex-1">
                  {/* Icon in rounded square */}
                  <div className="
                    w-8 
                    h-8 
                    rounded-lg 
                    bg-[#FFE0B2] 
                    dark:bg-amber-900/30 
                    flex 
                    items-center 
                    justify-center
                    flex-shrink-0
                  ">
                    <FileText className="h-4 w-4 text-orange-600 dark:text-amber-400" />
                  </div>
                  
                  {/* Content Section */}
                  <div className="space-y-2 flex-1">
                    {/* Document Title - Bold, 18px */}
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                      {request.docType}
                    </h3>
                    
                    {/* Status and Due Date in Single Inline Row */}
                    <div className="flex items-center gap-4">
                      {/* Status Badge */}
                      <Badge className="
                        bg-[#FFE9D5] 
                        text-[#B45309] 
                        hover:bg-[#FFE9D5] 
                        dark:bg-amber-900/40 
                        dark:text-amber-200 
                        border-0 
                        font-medium 
                        text-xs 
                        px-3 
                        py-1 
                        rounded-full
                      ">
                        {request.status}
                      </Badge>
                      
                      {/* Due Date - Single line, grey text, 14px */}
                      <div className="flex items-center gap-1.5 text-sm text-[#4B5563] dark:text-gray-400">
                        <Calendar className="h-4 w-4" />
                        <span className="font-normal">Due: {request.dueDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right Column - Upload Button */}
                <div className="flex-shrink-0">
                  <Button 
                    onClick={() => handleRespondToRequest(request.id, request.docType)}
                    className="
                      bg-[#2563EB] 
                      hover:bg-blue-700 
                      text-white 
                      font-medium 
                      px-4 
                      py-2 
                      h-auto 
                      rounded-full 
                      shadow-sm 
                      hover:shadow-md 
                      transition-all 
                      duration-200
                      border-0
                      dark:bg-[#2563EB] 
                      dark:hover:bg-blue-700
                    "
                    aria-label={`Upload ${request.docType} document`}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Document
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Footer note */}
      <div className="flex items-center justify-center pt-2">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Click "Upload Document" to submit the requested files
        </p>
      </div>
    </div>
  );
};

export default DocumentRequestsList;
