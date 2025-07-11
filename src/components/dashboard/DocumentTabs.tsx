
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FileText, CheckCircle2, Clock } from 'lucide-react';

interface UserDocument {
  id: string;
  fileName: string;
  fileType: string;
  status: 'pending' | 'verified' | 'rejected';
  confidenceScore: number;
  uploadDate: string;
  source: 'manual' | 'digilocker';
  hrNotes?: string;
}

interface DocumentTabsProps {
  documents: UserDocument[];
  children: (filteredDocuments: UserDocument[], activeTab: string) => React.ReactNode;
}

const DocumentTabs = ({ documents, children }: DocumentTabsProps) => {
  const allDocuments = documents;
  const verifiedDocuments = documents.filter(doc => doc.status === 'verified');
  const pendingDocuments = documents.filter(doc => doc.status === 'pending');

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="all" className="flex items-center space-x-2">
          <FileText className="h-4 w-4" />
          <span>All Documents ({allDocuments.length})</span>
        </TabsTrigger>
        <TabsTrigger value="verified" className="flex items-center space-x-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>Verified ({verifiedDocuments.length})</span>
        </TabsTrigger>
        <TabsTrigger value="pending" className="flex items-center space-x-2">
          <Clock className="h-4 w-4" />
          <span>Pending ({pendingDocuments.length})</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="all">
        {children(allDocuments, 'all')}
      </TabsContent>
      
      <TabsContent value="verified">
        {children(verifiedDocuments, 'verified')}
      </TabsContent>
      
      <TabsContent value="pending">
        {children(pendingDocuments, 'pending')}
      </TabsContent>
    </Tabs>
  );
};

export default DocumentTabs;
