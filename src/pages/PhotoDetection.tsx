
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PhotoDetection() {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Only accept images
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image (JPG, PNG, GIF)",
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
      title: "Photo Analysis Complete",
      description: "Drone analysis for the uploaded photo is finished.",
    });

    setIsLoading(false);
  };

  return (
    <div className="container mx-auto p-8">
      <Card className="bg-dome-darker border-dome-purple/10">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center gap-2">
            <ImageIcon className="h-6 w-6" />
            Photo Detection
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center space-y-4 min-h-[300px]">
              <Loader className="h-12 w-12 text-dome-purple animate-spin" />
              <p className="text-dome-purple-light">Analyzing uploaded photo...</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div
                className="border-2 border-dashed border-dome-purple/20 rounded-lg p-8 text-center hover:border-dome-purple/40 transition-colors"
                onClick={() => document.getElementById('photo-upload')?.click()}
              >
                <input
                  type="file"
                  id="photo-upload"
                  className="hidden"
                  accept="image/jpeg, image/png, image/gif"
                  onChange={handleFileUpload}
                />
                <ImageIcon className="h-12 w-12 mx-auto mb-4 text-dome-purple-light" />
                <p className="text-dome-purple-light mb-2">
                  Drag and drop or click to upload a photo
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports JPG, PNG, GIF image files
                </p>
              </div>

              {uploadedFile && (
                <div className="p-4 bg-dome-purple/10 rounded-lg">
                  <p className="text-dome-purple-light">
                    Selected photo: {uploadedFile.name}
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
