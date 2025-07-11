
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, CheckCircle, Loader2 } from 'lucide-react';
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
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onConnect(abcId);
    toast({
      title: 'DigiLocker Connected!',
      description: 'Your official documents are now available for verification.',
    });
    
    setIsConnecting(false);
    onClose();
    setAbcId('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-2 mb-2">
            <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
              <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <DialogTitle>Connect to DigiLocker</DialogTitle>
          </div>
          <DialogDescription>
            Enter your ABC ID to securely connect your DigiLocker account and access verified government documents.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="abc-id">ABC ID</Label>
            <Input
              id="abc-id"
              type="text"
              placeholder="ABC12345678"
              value={abcId}
              onChange={(e) => setAbcId(e.target.value)}
              className="uppercase"
              maxLength={15}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Your ABC ID is available on your DigiLocker account
            </p>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
            <div className="flex items-center space-x-2 text-blue-800 dark:text-blue-300">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Secure Connection</span>
            </div>
            <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
              Your data is encrypted and handled according to government security standards.
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={isConnecting} className="flex-1 bg-purple-600 hover:bg-purple-700">
              {isConnecting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Connect
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DigiLockerModal;
