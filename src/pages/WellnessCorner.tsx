import { useState } from 'react';
import { Heart, Music, Phone, Headphones, Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';

const meditationSessions = [
  {
    title: "Morning Peace",
    duration: "10 min",
    description: "Start your day with calm and positivity",
    category: "meditation"
  },
  {
    title: "Stress Relief",
    duration: "15 min", 
    description: "Release tension and find inner calm",
    category: "relaxation"
  },
  {
    title: "Self-Love Affirmations",
    duration: "8 min",
    description: "Build confidence and self-worth",
    category: "affirmations"
  },
  {
    title: "Healing Journey",
    duration: "20 min",
    description: "Process emotions and find healing",
    category: "healing"
  }
];

const helplines = [
  {
    name: "Mental Health Helpline",
    number: "9152987821",
    hours: "24/7",
    description: "Free counseling and crisis support"
  },
  {
    name: "Women's Counseling",
    number: "1091", 
    hours: "24/7",
    description: "Specialized support for women"
  },
  {
    name: "Suicide Prevention",
    number: "9820466726",
    hours: "24/7", 
    description: "Crisis intervention and support"
  }
];

const WellnessCorner = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState([75]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5 p-4">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Heart className="h-8 w-8 text-secondary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              Wellness Corner
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Your sanctuary for mental health, self-care, and emotional healing. Take time for yourself.
          </p>
        </div>

        <Tabs defaultValue="meditation" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="meditation">Meditation</TabsTrigger>
            <TabsTrigger value="music">Healing Music</TabsTrigger>
            <TabsTrigger value="helplines">Support</TabsTrigger>
            <TabsTrigger value="exercises">Exercises</TabsTrigger>
          </TabsList>

          {/* Meditation Tab */}
          <TabsContent value="meditation">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {meditationSessions.map((session, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="space-y-4">
                    <div className="aspect-square bg-gradient-to-br from-secondary/20 to-accent/20 rounded-lg flex items-center justify-center">
                      <Headphones className="h-12 w-12 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{session.title}</h4>
                      <p className="text-sm text-muted-foreground">{session.description}</p>
                      <p className="text-xs text-secondary font-medium mt-2">{session.duration}</p>
                    </div>
                    <Button className="w-full" variant="secondary">
                      <Play className="mr-2 h-4 w-4" />
                      Start Session
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Healing Music Tab */}
          <TabsContent value="music">
            <Card className="p-8">
              <div className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full flex items-center justify-center">
                    <Music className="h-16 w-16 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Calming Nature Sounds</h3>
                    <p className="text-muted-foreground">Gentle rainfall and forest sounds</p>
                  </div>
                </div>

                {/* Music Controls */}
                <div className="flex items-center justify-center gap-4">
                  <Button variant="outline" size="icon">
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button onClick={togglePlayPause} size="lg" className="w-16 h-16 rounded-full">
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </Button>
                  <Button variant="outline" size="icon">
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <Slider value={[30]} max={100} step={1} className="w-full" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>2:15</span>
                    <span>7:30</span>
                  </div>
                </div>

                {/* Volume Control */}
                <div className="flex items-center gap-4">
                  <span className="text-sm">Volume</span>
                  <Slider 
                    value={volume} 
                    onValueChange={setVolume}
                    max={100} 
                    step={1} 
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground">{volume[0]}%</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Support Helplines Tab */}
          <TabsContent value="helplines">
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Phone className="h-5 w-5 text-secondary" />
                  Crisis Support & Helplines
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {helplines.map((helpline, index) => (
                    <Card key={index} className="p-6 border-2 border-secondary/20">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-lg text-secondary">{helpline.name}</h4>
                          <p className="text-sm text-muted-foreground">{helpline.description}</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold">{helpline.number}</p>
                          <p className="text-xs text-muted-foreground">Available: {helpline.hours}</p>
                        </div>
                        <Button 
                          onClick={() => window.open(`tel:${helpline.number}`, '_self')}
                          className="w-full"
                          variant="secondary"
                        >
                          <Phone className="mr-2 h-4 w-4" />
                          Call Now
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="font-semibold mb-4">Remember:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• You are not alone in this journey</li>
                  <li>• Seeking help is a sign of strength, not weakness</li>
                  <li>• Your mental health matters just as much as your physical health</li>
                  <li>• Healing takes time, and that's perfectly okay</li>
                </ul>
              </Card>
            </div>
          </TabsContent>

          {/* Self-Care Exercises Tab */}
          <TabsContent value="exercises">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h4 className="font-semibold text-lg mb-4">Breathing Exercise</h4>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Try the 4-7-8 breathing technique to calm anxiety and stress.
                  </p>
                  <ol className="text-sm space-y-2">
                    <li>1. Inhale through nose for 4 counts</li>
                    <li>2. Hold breath for 7 counts</li>
                    <li>3. Exhale through mouth for 8 counts</li>
                    <li>4. Repeat 3-4 times</li>
                  </ol>
                  <Button variant="outline" className="w-full">
                    Start Guided Breathing
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="font-semibold text-lg mb-4">Gratitude Practice</h4>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Write down three things you're grateful for today.
                  </p>
                  <div className="space-y-2">
                    <input 
                      className="w-full p-2 border rounded text-sm" 
                      placeholder="I'm grateful for..."
                    />
                    <input 
                      className="w-full p-2 border rounded text-sm" 
                      placeholder="I'm grateful for..."
                    />
                    <input 
                      className="w-full p-2 border rounded text-sm" 
                      placeholder="I'm grateful for..."
                    />
                  </div>
                  <Button variant="outline" className="w-full">
                    Save Gratitude Entry
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="font-semibold text-lg mb-4">Positive Affirmations</h4>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Repeat these affirmations to build self-confidence.
                  </p>
                  <div className="space-y-3">
                    <p className="italic text-secondary">"I am strong and resilient"</p>
                    <p className="italic text-secondary">"I deserve love and respect"</p>
                    <p className="italic text-secondary">"I am in control of my life"</p>
                    <p className="italic text-secondary">"I choose peace over worry"</p>
                  </div>
                  <Button variant="outline" className="w-full">
                    Listen to Audio Affirmations
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="font-semibold text-lg mb-4">Mood Tracker</h4>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    How are you feeling today?
                  </p>
                  <div className="grid grid-cols-5 gap-2">
                    {['😢', '😕', '😐', '😊', '😄'].map((emoji, index) => (
                      <Button 
                        key={index}
                        variant="outline"
                        className="h-12 text-2xl hover:bg-secondary/20"
                      >
                        {emoji}
                      </Button>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">
                    Save Mood
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WellnessCorner;