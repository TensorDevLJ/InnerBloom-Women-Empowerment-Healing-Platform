import { useState, useRef } from 'react';
import { Mic, MicOff, Play, Pause, Trash2, Download, Lock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const VoiceJournal = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState<{ id: string; blob: Blob; duration: number; date: string }[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const startTimeRef = useRef<number>(0);
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      startTimeRef.current = Date.now();

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
        const newRecording = {
          id: Date.now().toString(),
          blob: audioBlob,
          duration,
          date: new Date().toLocaleString()
        };
        
        setRecordings(prev => [newRecording, ...prev]);
        
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
        
        toast({
          title: "Recording Saved",
          description: "Your voice note has been saved privately.",
        });
      };

      mediaRecorder.start();
      setIsRecording(true);
      
      toast({
        title: "Recording Started",
        description: "Speak freely. Your voice is safe here.",
      });
    } catch (error) {
      toast({
        title: "Microphone Access Denied",
        description: "Please allow microphone access to record voice notes.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playRecording = (recording: { id: string; blob: Blob }) => {
    if (playingId === recording.id) {
      setPlayingId(null);
      return;
    }

    const audio = new Audio(URL.createObjectURL(recording.blob));
    setPlayingId(recording.id);
    
    audio.onended = () => {
      setPlayingId(null);
    };
    
    audio.play();
  };

  const deleteRecording = (id: string) => {
    setRecordings(prev => prev.filter(recording => recording.id !== id));
    toast({
      title: "Recording Deleted",
      description: "Your voice note has been permanently removed.",
    });
  };

  const downloadRecording = (recording: { id: string; blob: Blob; date: string }) => {
    const url = URL.createObjectURL(recording.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `voice-journal-${recording.date.replace(/[/,:]/g, '-')}.wav`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Lock className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Private Voice Journal</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Record your thoughts privately. Notes stay only on your device.
          </p>
        </div>

        {/* Recording Controls */}
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto">
            {isRecording ? (
              <Button
                onClick={stopRecording}
                size="lg"
                className="w-full h-full rounded-full bg-red-500 hover:bg-red-600 animate-pulse"
              >
                <MicOff className="h-8 w-8" />
              </Button>
            ) : (
              <Button
                onClick={startRecording}
                size="lg"
                className="w-full h-full rounded-full"
                variant="outline"
              >
                <Mic className="h-8 w-8" />
              </Button>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {isRecording ? "Recording... Tap to stop" : "Tap to start recording"}
          </p>
        </div>

        {/* Recordings List */}
        {recordings.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium">Your Voice Notes ({recordings.length})</h4>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {recordings.map((recording) => (
                <div
                  key={recording.id}
                  className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => playRecording(recording)}
                    className="flex-shrink-0"
                  >
                    {playingId === recording.id ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      Voice note - {recording.duration}s
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {recording.date}
                    </p>
                  </div>
                  
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => downloadRecording(recording)}
                      className="flex-shrink-0"
                    >
                      <Download className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteRecording(recording.id)}
                      className="flex-shrink-0 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p>🔒 Your recordings are stored locally on your device only</p>
          <p>💜 Speak your truth. Your voice matters.</p>
        </div>
      </div>
    </Card>
  );
};

export default VoiceJournal;