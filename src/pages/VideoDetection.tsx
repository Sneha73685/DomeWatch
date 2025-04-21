
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video as VideoIcon, Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function VideoDetection() {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Only accept videos
    const validTypes = ['video/mp4', 'video/quicktime'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a video (MP4 or MOV)",
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
    await new Promise(resolve => setTimeout(resolve, 4000));

    toast({
      title: "Video Analysis Complete",
      description: "Drone analysis for the uploaded video is finished.",
    });

    setIsLoading(false);
  };

  return (
    <div className="container mx-auto p-8">
      <Card className="bg-dome-darker border-dome-purple/10">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center gap-2">
            <VideoIcon className="h-6 w-6" />
            Video Detection
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center space-y-4 min-h-[300px]">
              <Loader className="h-12 w-12 text-dome-purple animate-spin" />
              <p className="text-dome-purple-light">Analyzing uploaded video...</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div
                className="border-2 border-dashed border-dome-purple/20 rounded-lg p-8 text-center hover:border-dome-purple/40 transition-colors"
                onClick={() => document.getElementById('video-upload')?.click()}
              >
                <input
                  type="file"
                  id="video-upload"
                  className="hidden"
                  accept="video/mp4, video/quicktime"
                  onChange={handleFileUpload}
                />
                <VideoIcon className="h-12 w-12 mx-auto mb-4 text-dome-purple-light" />
                <p className="text-dome-purple-light mb-2">
                  Drag and drop or click to upload a video
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports MP4 and MOV video files
                </p>
              </div>

              {uploadedFile && (
                <div className="p-4 bg-dome-purple/10 rounded-lg">
                  <p className="text-dome-purple-light">
                    Selected video: {uploadedFile.name}
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
