import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, XCircle, FileText, User, GraduationCap, Building, Calendar } from 'lucide-react';

interface ExtractedInfo {
  name?: string;
  degree?: string;
  institution?: string;
  year?: string;
  company?: string;
  position?: string;
  duration?: string;
  skills?: string[];
}

interface AIResultPopupProps {
  isOpen: boolean;
  onClose: () => void;
  fileName: string;
  status: 'verified' | 'rejected' | 'pending';
  confidenceScore: number;
  extractedInfo: ExtractedInfo;
  onApprove?: () => void;
  onReject?: () => void;
}

const AIResultPopup: React.FC<AIResultPopupProps> = ({
  isOpen,
  onClose,
  fileName,
  status,
  confidenceScore,
  extractedInfo,
  onApprove,
  onReject
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'text-green-600 bg-green-100 border-green-200';
      case 'rejected':
        return 'text-red-600 bg-red-100 border-red-200';
      default:
        return 'text-yellow-600 bg-yellow-100 border-yellow-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-5 w-5" />;
      case 'rejected':
        return <XCircle className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-blue-600" />
            <span>AI Verification Results</span>
          </DialogTitle>
          <DialogDescription>
            Document: {fileName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Confidence */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Verification Status</p>
                    <div className={`flex items-center space-x-2 mt-1 px-3 py-1 rounded-full border ${getStatusColor(status)}`}>
                      {getStatusIcon(status)}
                      <span className="font-medium capitalize">{status}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium text-gray-600">Confidence Score</p>
                    <span className={`text-2xl font-bold ${getConfidenceColor(confidenceScore)}`}>
                      {confidenceScore}%
                    </span>
                  </div>
                  <Progress value={confidenceScore} className="h-3" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Extracted Information */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Extracted Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {extractedInfo.name && (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <User className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Name</p>
                      <p className="text-gray-900">{extractedInfo.name}</p>
                    </div>
                  </div>
                )}

                {extractedInfo.degree && (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <GraduationCap className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Degree</p>
                      <p className="text-gray-900">{extractedInfo.degree}</p>
                    </div>
                  </div>
                )}

                {extractedInfo.institution && (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Building className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Institution</p>
                      <p className="text-gray-900">{extractedInfo.institution}</p>
                    </div>
                  </div>
                )}

                {extractedInfo.year && (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Year</p>
                      <p className="text-gray-900">{extractedInfo.year}</p>
                    </div>
                  </div>
                )}

                {extractedInfo.company && (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Building className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Company</p>
                      <p className="text-gray-900">{extractedInfo.company}</p>
                    </div>
                  </div>
                )}

                {extractedInfo.position && (
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <User className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Position</p>
                      <p className="text-gray-900">{extractedInfo.position}</p>
                    </div>
                  </div>
                )}
              </div>

              {extractedInfo.skills && extractedInfo.skills.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-600 mb-2">Skills Identified</p>
                  <div className="flex flex-wrap gap-2">
                    {extractedInfo.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Analysis */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">AI Analysis Summary</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-1 rounded">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Document Authenticity</p>
                    <p className="text-sm text-gray-600">
                      {confidenceScore >= 80 ? 'Document appears authentic with high confidence' :
                       confidenceScore >= 60 ? 'Document authenticity is moderate, requires review' :
                       'Document authenticity is questionable, manual review recommended'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 p-1 rounded">
                    <FileText className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Information Extraction</p>
                    <p className="text-sm text-gray-600">
                      Successfully extracted key information from the document with OCR technology
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-purple-100 p-1 rounded">
                    <GraduationCap className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Format Validation</p>
                    <p className="text-sm text-gray-600">
                      Document format and structure validated against standard templates
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          {(onApprove || onReject) && status === 'pending' && (
            <div className="flex justify-end space-x-3 pt-4 border-t">
              {onReject && (
                <Button onClick={onReject} variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              )}
              {onApprove && (
                <Button onClick={onApprove} className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </Button>
              )}
            </div>
          )}

          {/* Close Button */}
          <div className="flex justify-end pt-4 border-t">
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIResultPopup;
