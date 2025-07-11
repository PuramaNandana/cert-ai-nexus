
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, CheckCircle, Loader2, FileText, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DigiLockerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (abcId: string) => void;
}

const DigiLockerModal = ({ isOpen, onClose, onConnect }: DigiLockerModalProps) => {
  const [abcId, setAbcId] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!abcId.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter your ABC ID',
        variant: 'destructive',
      });
      return;
    }

    setIsConnecting(true);
    
    // Simulate DigiLocker connection process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    onConnect(abcId);
    toast({
      title: 'DigiLocker Connected Successfully!',
      description: 'Your official documents have been imported and are ready for verification.',
    });
    
    setIsConnecting(false);
    onClose();
    setAbcId('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl shadow-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">Connect to DigiLocker</DialogTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">Government Document Verification</p>
            </div>
          </div>
          <DialogDescription className="text-base leading-relaxed">
            Connect your DigiLocker account to automatically import and verify your official government documents. 
            This provides instant verification for documents like Aadhaar, PAN Card, and educational certificates.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 mt-6">
          {/* Security Notice */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-start space-x-3">
              <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-300">Secure & Private</h4>
                <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                  Your data is encrypted and handled according to government security standards. 
                  We only access documents you explicitly authorize.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="abc-id" className="text-sm font-medium">ABC ID (DigiLocker Username)</Label>
              <Input
                id="abc-id"
                type="text"
                placeholder="Enter your ABC ID (e.g., ABC12345678)"
                value={abcId}
                onChange={(e) => setAbcId(e.target.value.toUpperCase())}
                className="text-center font-mono text-lg tracking-wider"
                maxLength={15}
                disabled={isConnecting}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Your ABC ID can be found in your DigiLocker mobile app or website under Profile settings
              </p>
            </div>

            {/* Benefits Preview */}
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <h4 className="text-sm font-semibold text-green-800 dark:text-green-300 mb-2 flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Documents Available for Import
              </h4>
              <ul className="text-xs text-green-700 dark:text-green-400 space-y-1">
                <li className="flex items-center"><CheckCircle className="h-3 w-3 mr-2" />Aadhaar Card</li>
                <li className="flex items-center"><CheckCircle className="h-3 w-3 mr-2" />PAN Card</li>
                <li className="flex items-center"><CheckCircle className="h-3 w-3 mr-2" />Educational Certificates</li>
                <li className="flex items-center"><CheckCircle className="h-3 w-3 mr-2" />Employment Records</li>
              </ul>
            </div>
            
            <div className="flex space-x-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose} 
                className="flex-1"
                disabled={isConnecting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isConnecting || !abcId.trim()} 
                className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Connect DigiLocker
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DigiLockerModal;
