
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

      {/* Single Modern Document Request Card */}
      <Card className="
        relative 
        bg-orange-50 
        dark:bg-gray-800 
        border-0 
        rounded-2xl 
        shadow-sm 
        hover:shadow-md 
        transition-shadow 
        duration-200 
        mb-4
        overflow-hidden
      ">
        {/* Top Orange Border Strip */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-orange-600" />
        
        <CardContent className="p-5">
          <div className="flex items-center justify-between gap-6">
            {/* Left Section */}
            <div className="flex items-center gap-4 flex-1">
              {/* Document Icon */}
              <div className="
                p-3 
                rounded-xl 
                bg-orange-100 
                dark:bg-amber-900/30 
                flex-shrink-0
                border 
                border-orange-200/50 
                dark:border-amber-800/50
              ">
                <FileText className="h-6 w-6 text-orange-600 dark:text-amber-400" />
              </div>
              
              {/* Content */}
              <div className="flex-1 space-y-2">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                  Degree Certificate
                </h3>
                
                {/* Status and Due Date Row */}
                <div className="flex items-center gap-4">
                  {/* Status Badge */}
                  <Badge className="
                    bg-orange-100 
                    text-orange-800 
                    hover:bg-orange-100 
                    dark:bg-amber-900/40 
                    dark:text-amber-200 
                    border-0 
                    font-semibold 
                    text-xs 
                    px-2.5 
                    py-1 
                    rounded-full
                  ">
                    Pending
                  </Badge>
                  
                  {/* Due Date */}
                  <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">Due: 15 July 2025</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Section - Upload Button */}
            <div className="flex-shrink-0">
              <Button 
                onClick={() => handleRespondToRequest('REQ001', 'Degree Certificate')}
                className="
                  bg-blue-600 
                  hover:bg-blue-700 
                  text-white 
                  font-semibold 
                  px-6 
                  py-2.5 
                  h-auto 
                  rounded-xl 
                  shadow-sm 
                  hover:shadow-md 
                  transition-all 
                  duration-200
                  border-0
                  dark:bg-blue-600 
                  dark:hover:bg-blue-700
                "
                aria-label="Upload Degree Certificate document"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
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
