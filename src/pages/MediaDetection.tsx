
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function MediaDetection() {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/quicktime'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image (JPG, PNG, GIF) or video (MP4, MOV)",
        variant: "destructive",
      });
      return;
    }

    setUploadedFile(file);
    handleDetection(file);
  };

  const handleDetection = async (file: File) => {
    setIsLoading(true);
    
    // Simulate detection process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    toast({
      title: "Detection Complete",
      description: "Analysis of the uploaded media has been completed.",
    });
    
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto p-8">
      <Card className="bg-dome-darker border-dome-purple/10">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center gap-2">
            <Upload className="h-6 w-6" />
            Media Detection
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center space-y-4 min-h-[300px]">
              <Loader className="h-12 w-12 text-dome-purple animate-spin" />
              <p className="text-dome-purple-light">Analyzing uploaded media...</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div 
                className="border-2 border-dashed border-dome-purple/20 rounded-lg p-8 text-center hover:border-dome-purple/40 transition-colors"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept="image/*, video/*"
                  onChange={handleFileUpload}
                />
                <Upload className="h-12 w-12 mx-auto mb-4 text-dome-purple-light" />
                <p className="text-dome-purple-light mb-2">
                  Drag and drop or click to upload
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports images (JPG, PNG, GIF) and videos (MP4, MOV)
                </p>
              </div>
              
              {uploadedFile && (
                <div className="p-4 bg-dome-purple/10 rounded-lg">
                  <p className="text-dome-purple-light">
                    Selected file: {uploadedFile.name}
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
