
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

  // Modern document requests with elegant orange styling
  const hardcodedRequests = [
    {
      id: 'REQ001',
      docType: 'Degree Certificate',
      dueDate: '15 July 2025',
      priority: 'High',
      bgGradient: 'bg-gradient-to-br from-orange-50/80 via-orange-100/60 to-amber-50/80',
      borderColor: 'border-orange-200/60',
      iconBg: 'bg-orange-500/10',
      iconColor: 'text-orange-600',
      accentColor: 'bg-orange-500'
    },
    {
      id: 'REQ002', 
      docType: 'Internship Letter',
      dueDate: '18 July 2025',
      priority: 'Medium',
      bgGradient: 'bg-gradient-to-br from-amber-50/80 via-amber-100/60 to-yellow-50/80',
      borderColor: 'border-amber-200/60',
      iconBg: 'bg-amber-500/10',
      iconColor: 'text-amber-600',
      accentColor: 'bg-amber-500'
    },
    {
      id: 'REQ003',
      docType: '10th Marks Memo', 
      dueDate: '20 July 2025',
      priority: 'Low',
      bgGradient: 'bg-gradient-to-br from-yellow-50/80 via-yellow-100/60 to-orange-50/80',
      borderColor: 'border-yellow-200/60',
      iconBg: 'bg-yellow-500/10',
      iconColor: 'text-yellow-600',
      accentColor: 'bg-yellow-500'
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

      {/* Document Cards Grid */}
      <div className="grid gap-4">
        {hardcodedRequests.map((request, index) => (
          <Card 
            key={request.id} 
            className={`
              ${request.bgGradient} 
              border ${request.borderColor} 
              shadow-sm hover:shadow-lg 
              transition-all duration-300 
              rounded-2xl 
              backdrop-blur-sm
              dark:${request.bgGradient.replace(/50\/80|100\/60/g, '950/10')}
              dark:${request.borderColor.replace('200/60', '800/30')}
              group
              relative
              overflow-hidden
            `}
          >
            {/* Subtle accent line */}
            <div className={`absolute top-0 left-0 right-0 h-1 ${request.accentColor} rounded-t-2xl`} />
            
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-6">
                {/* Left Content */}
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  {/* Icon */}
                  <div className={`
                    ${request.iconBg} 
                    p-3 
                    rounded-xl 
                    flex-shrink-0 
                    group-hover:scale-110 
                    transition-transform 
                    duration-200
                    ring-1 
                    ring-white/20
                  `}>
                    <FileText className={`h-6 w-6 ${request.iconColor}`} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0 space-y-3">
                    {/* Title and Priority */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-tight">
                        {request.docType}
                      </h3>
                      <Badge 
                        variant="secondary" 
                        className="
                          text-xs 
                          font-medium 
                          px-2.5 
                          py-1 
                          rounded-full
                          bg-white/60 
                          text-gray-700 
                          border-0
                          dark:bg-gray-800/60 
                          dark:text-gray-300
                        "
                      >
                        {request.priority} Priority
                      </Badge>
                    </div>
                    
                    {/* Status and Due Date */}
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Pending Response
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="h-4 w-4" />
                        <span className="font-medium">Due {request.dueDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Action Button */}
                <div className="flex-shrink-0">
                  <Button 
                    onClick={() => handleRespondToRequest(request.id, request.docType)}
                    className="
                      bg-white/90 
                      hover:bg-white 
                      text-gray-900 
                      border 
                      border-gray-200/50 
                      shadow-sm 
                      hover:shadow-md 
                      font-semibold 
                      px-6 
                      py-2.5 
                      h-auto 
                      rounded-xl
                      transition-all 
                      duration-200
                      backdrop-blur-sm
                      group-hover:scale-105
                      dark:bg-gray-800/90 
                      dark:hover:bg-gray-800 
                      dark:text-white 
                      dark:border-gray-700/50
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
      <div className="flex items-center justify-center pt-4">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Click "Upload Document" to submit the requested files
        </p>
      </div>
    </div>
  );
};

export default DocumentRequestsList;
