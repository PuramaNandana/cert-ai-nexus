
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DocumentRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (request: {
    candidateName: string;
    candidateEmail: string;
    docType: string;
    notes: string;
    dueDate: string;
  }) => void;
}

const DocumentRequestModal = ({ isOpen, onClose, onSubmit }: DocumentRequestModalProps) => {
  const [formData, setFormData] = useState({
    candidateName: '',
    candidateEmail: '',
    docType: '',
    notes: '',
    dueDate: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const documentTypes = [
    'Resume/CV',
    'Degree Certificate',
    'Experience Letter',
    'Skill Certification',
    'Identity Proof',
    'Address Proof',
    'Previous Employment Records',
    'Academic Transcripts',
    'Professional References',
    'Portfolio/Work Samples'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.candidateName || !formData.candidateEmail || !formData.docType) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      onSubmit(formData);
      toast({
        title: 'Request Sent',
        description: `Document request sent to ${formData.candidateName} successfully.`,
      });
      
      // Reset form
      setFormData({
        candidateName: '',
        candidateEmail: '',
        docType: '',
        notes: '',
        dueDate: ''
      });
      
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <Send className="h-6 w-6 text-blue-600" />
            Request Document
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="candidateName" className="text-sm font-medium text-gray-700">
                Candidate Name *
              </Label>
              <div className="relative mt-2">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="candidateName"
                  type="text"
                  placeholder="Enter candidate name"
                  value={formData.candidateName}
                  onChange={(e) => handleInputChange('candidateName', e.target.value)}
                  className="pl-10 h-12 rounded-xl border-gray-300 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="candidateEmail" className="text-sm font-medium text-gray-700">
                Email Address *
              </Label>
              <Input
                id="candidateEmail"
                type="email"
                placeholder="candidate@email.com"
                value={formData.candidateEmail}
                onChange={(e) => handleInputChange('candidateEmail', e.target.value)}
                className="mt-2 h-12 rounded-xl border-gray-300 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Document Type *
              </Label>
              <Select 
                value={formData.docType}
                onValueChange={(value) => handleInputChange('docType', value)}
              >
                <SelectTrigger className="mt-2 h-12 rounded-xl border-gray-300 focus:border-blue-500">
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="dueDate" className="text-sm font-medium text-gray-700">
                Due Date
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                className="mt-2 h-12 rounded-xl border-gray-300 focus:border-blue-500"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
              Additional Notes
            </Label>
            <Textarea
              id="notes"
              placeholder="Add any specific requirements or instructions for the candidate..."
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="mt-2 min-h-[120px] rounded-xl border-gray-300 focus:border-blue-500"
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">Request Preview</h4>
            <p className="text-sm text-blue-800">
              An email will be sent to <strong>{formData.candidateEmail || '[Email]'}</strong> requesting 
              them to upload their <strong>{formData.docType || '[Document Type]'}</strong>.
              {formData.dueDate && ` Due date: ${new Date(formData.dueDate).toLocaleDateString()}.`}
            </p>
          </div>

          <div className="flex gap-4 justify-end pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 px-6"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending Request...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Request
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentRequestModal;
