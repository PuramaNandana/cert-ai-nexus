
import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Upload as UploadIcon, FileText, Image, File, X, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

interface UploadedFile {
  file: File;
  preview: string;
  type: 'pdf' | 'image' | 'other';
}

const Upload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [documentType, setDocumentType] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/');
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map(file => {
      const preview = URL.createObjectURL(file);
      let type: 'pdf' | 'image' | 'other' = 'other';
      
      if (file.type.startsWith('image/')) {
        type = 'image';
      } else if (file.type === 'application/pdf') {
        type = 'pdf';
      }

      return {
        file,
        preview,
        type
      };
    });

    setUploadedFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const removeFile = (index: number) => {
    setUploadedFiles(prev => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-8 w-8 text-red-500" />;
      case 'image':
        return <Image className="h-8 w-8 text-blue-500" />;
      default:
        return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  const simulateAIVerification = async () => {
    // Simulate AI verification process
    setUploadProgress(20);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setUploadProgress(50);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setUploadProgress(80);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setUploadProgress(100);
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simulate AI response
    const mockAIResponse = {
      status: 'verified',
      confidenceScore: Math.floor(Math.random() * 30) + 70, // 70-100%
      extractedInfo: {
        name: user?.name || 'John Doe',
        degree: 'Bachelor of Technology',
        institution: 'ABC University',
        year: '2020'
      }
    };

    return mockAIResponse;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (uploadedFiles.length === 0) {
      toast({
        title: 'No Files Selected',
        description: 'Please upload at least one document.',
        variant: 'destructive'
      });
      return;
    }

    if (!documentType) {
      toast({
        title: 'Document Type Required',
        description: 'Please select the type of document you are uploading.',
        variant: 'destructive'
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate AI verification
      const aiResult = await simulateAIVerification();
      
      toast({
        title: 'Upload Successful!',
        description: `Document uploaded and ${aiResult.status} with ${aiResult.confidenceScore}% confidence.`,
      });

      // Store the upload in localStorage for demo purposes
      const existingUploads = JSON.parse(localStorage.getItem('user_uploads') || '[]');
      const newUpload = {
        id: Date.now().toString(),
        fileName: uploadedFiles[0].file.name,
        documentType,
        notes,
        uploadDate: new Date().toISOString().split('T')[0],
        status: aiResult.status,
        confidenceScore: aiResult.confidenceScore,
        extractedInfo: aiResult.extractedInfo
      };
      
      localStorage.setItem('user_uploads', JSON.stringify([...existingUploads, newUpload]));

      // Navigate back based on user role
      setTimeout(() => {
        if (user?.role === 'hr') {
          navigate('/hr-dashboard');
        } else {
          navigate('/user-dashboard');
        }
      }, 1500);

    } catch (error) {
      toast({
        title: 'Upload Failed',
        description: 'There was an error uploading your document. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleBack = () => {
    if (user?.role === 'hr') {
      navigate('/hr-dashboard');
    } else {
      navigate('/user-dashboard');
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button onClick={handleBack} variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center">
              <div className="bg-blue-600 p-2 rounded-lg mr-3">
                <UploadIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Upload Document</h1>
                <p className="text-sm text-gray-500">Upload documents for AI verification</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Document Upload</CardTitle>
            <CardDescription>
              Upload your documents for verification. Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* File Upload Area */}
              <div>
                <Label className="text-base font-medium">Select Files</Label>
                <div
                  {...getRootProps()}
                  className={`mt-2 border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                    ${isDragActive 
                      ? 'border-blue-400 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                    }`}
                >
                  <input {...getInputProps()} />
                  <UploadIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  {isDragActive ? (
                    <p className="text-blue-600 font-medium">Drop the files here...</p>
                  ) : (
                    <div>
                      <p className="text-gray-600 font-medium mb-2">
                        Drag & drop files here, or click to select
                      </p>
                      <p className="text-sm text-gray-500">
                        PDF, JPG, PNG, DOC, DOCX up to 10MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* File Preview */}
              {uploadedFiles.length > 0 && (
                <div>
                  <Label className="text-base font-medium">Uploaded Files</Label>
                  <div className="mt-2 space-y-2">
                    {uploadedFiles.map((uploadedFile, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getFileIcon(uploadedFile.type)}
                          <div>
                            <p className="font-medium text-gray-900">{uploadedFile.file.name}</p>
                            <p className="text-sm text-gray-500">
                              {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Document Type */}
              <div>
                <Label htmlFor="documentType" className="text-base font-medium">Document Type</Label>
                <Select value={documentType} onValueChange={setDocumentType}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="resume">Resume/CV</SelectItem>
                    <SelectItem value="degree-certificate">Degree Certificate</SelectItem>
                    <SelectItem value="experience-certificate">Experience Certificate</SelectItem>
                    <SelectItem value="skill-certificate">Skill Certification</SelectItem>
                    <SelectItem value="identity-proof">Identity Proof</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Notes */}
              <div>
                <Label htmlFor="notes" className="text-base font-medium">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any additional information about this document..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-2"
                  rows={3}
                />
              </div>

              {/* Upload Progress */}
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Upload Progress</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                  <p className="text-sm text-gray-600">
                    {uploadProgress < 30 ? 'Uploading files...' :
                     uploadProgress < 70 ? 'Running AI verification...' :
                     uploadProgress < 100 ? 'Processing results...' :
                     'Complete!'}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={handleBack}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={uploadedFiles.length === 0 || !documentType || isUploading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <UploadIcon className="h-4 w-4 mr-2" />
                      Upload & Verify
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Upload;
