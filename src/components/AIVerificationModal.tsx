
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, XCircle, Clock, FileText, Brain, Shield, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AIVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: {
    id: string;
    fileName: string;
    candidateName: string;
    candidateEmail: string;
    status: 'pending' | 'verified' | 'rejected';
    confidenceScore: number;
    uploadDate: string;
    fileType: string;
  };
  onUpdateStatus: (docId: string, status: 'verified' | 'rejected', notes?: string) => void;
}

const AIVerificationModal = ({ isOpen, onClose, document, onUpdateStatus }: AIVerificationModalProps) => {
  const [notes, setNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  // Mock AI verification results
  const aiResults = {
    extractedData: {
      name: document.candidateName,
      education: 'Bachelor of Technology in Computer Science',
      institution: 'Indian Institute of Technology, Delhi',
      year: '2020',
      grade: 'First Class with Distinction',
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS']
    },
    securityChecks: [
      { check: 'Document Authenticity', status: 'passed', score: 95 },
      { check: 'Watermark Validation', status: 'passed', score: 92 },
      { check: 'Font Consistency', status: 'passed', score: 88 },
      { check: 'Layout Analysis', status: 'warning', score: 75 },
      { check: 'Institution Verification', status: 'passed', score: 94 }
    ],
    riskFactors: document.confidenceScore < 80 ? [
      'Minor inconsistency in font spacing detected',
      'Unable to verify institution seal completely'
    ] : [],
    recommendation: document.confidenceScore >= 85 ? 'APPROVE' : document.confidenceScore >= 70 ? 'REVIEW' : 'REJECT'
  };

  const handleApprove = async () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      onUpdateStatus(document.id, 'verified', notes || 'Document verified successfully through AI analysis.');
      toast({
        title: 'Document Approved',
        description: `${document.fileName} has been verified successfully.`,
      });
      setIsProcessing(false);
      onClose();
    }, 1000);
  };

  const handleReject = async () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      onUpdateStatus(document.id, 'rejected', notes || 'Document rejected due to verification concerns.');
      toast({
        title: 'Document Rejected',
        description: `${document.fileName} has been rejected. Candidate will be notified.`,
        variant: 'destructive'
      });
      setIsProcessing(false);
      onClose();
    }, 1000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'APPROVE':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'REVIEW':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'REJECT':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <Brain className="h-6 w-6 text-blue-600" />
            AI Verification Results
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Document Info */}
          <Card className="border-0 bg-gray-50">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{document.fileName}</h3>
                    <p className="text-gray-600">{document.candidateName} • {document.candidateEmail}</p>
                    <p className="text-sm text-gray-500">Uploaded: {document.uploadDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-gray-900">{document.confidenceScore}%</span>
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <Progress value={document.confidenceScore} className="w-32 h-2" />
                  <p className="text-sm text-gray-500 mt-1">Confidence Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Extracted Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Extracted Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Name</p>
                  <p className="text-gray-900">{aiResults.extractedData.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Education</p>
                  <p className="text-gray-900">{aiResults.extractedData.education}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Institution</p>
                  <p className="text-gray-900">{aiResults.extractedData.institution}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Year</p>
                  <p className="text-gray-900">{aiResults.extractedData.year}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Grade</p>
                  <p className="text-gray-900">{aiResults.extractedData.grade}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {aiResults.extractedData.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Security Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {aiResults.securityChecks.map((check, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(check.status)}
                      <span className="text-sm font-medium text-gray-900">{check.check}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-gray-900">{check.score}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* AI Recommendation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  AI Recommendation
                </div>
                <Badge className={getRecommendationColor(aiResults.recommendation)}>
                  {aiResults.recommendation}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {aiResults.riskFactors.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Risk Factors Identified:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {aiResults.riskFactors.map((risk, index) => (
                      <li key={index} className="text-sm text-yellow-700 bg-yellow-50 p-2 rounded">
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">HR Notes</p>
                <Textarea
                  placeholder="Add your notes or observations..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end pt-4 border-t">
            <Button variant="outline" onClick={onClose} disabled={isProcessing}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleReject}
              disabled={isProcessing}
              className="bg-red-600 hover:bg-red-700"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject Document
                </>
              )}
            </Button>
            <Button 
              onClick={handleApprove}
              disabled={isProcessing}
              className="bg-green-600 hover:bg-green-700"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Approve Document
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIVerificationModal;
