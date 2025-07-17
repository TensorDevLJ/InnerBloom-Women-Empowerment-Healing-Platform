import { useState, useEffect } from 'react';
import { Heart, Download, Trash2, Lock, Music, Palette, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import CryptoJS from 'crypto-js';

const themes = [
  { name: 'Healing Purple', class: 'bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30' },
  { name: 'Ocean Blue', class: 'bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30' },
  { name: 'Sunset Pink', class: 'bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30' },
  { name: 'Forest Green', class: 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30' },
  { name: 'Warm Amber', class: 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30' }
];

const calmingMusic = [
  { name: 'Peaceful Piano', url: 'https://www.youtube.com/embed/1ZYbU82GVz4?autoplay=1&loop=1&playlist=1ZYbU82GVz4' },
  { name: 'Rain Sounds', url: 'https://www.youtube.com/embed/mPZkdNFkNps?autoplay=1&loop=1&playlist=mPZkdNFkNps' },
  { name: 'Ocean Waves', url: 'https://www.youtube.com/embed/V1bFr2SWP1I?autoplay=1&loop=1&playlist=V1bFr2SWP1I' },
  { name: 'Meditation Music', url: 'https://www.youtube.com/embed/1vx8iUvfyCY?autoplay=1&loop=1&playlist=1vx8iUvfyCY' }
];

const MagicBox = () => {
  const [content, setContent] = useState('');
  const [burnAfterWriting, setBurnAfterWriting] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [selectedMusic, setSelectedMusic] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [savedNotes, setSavedNotes] = useState<string[]>([]);
  const [showSavedNotes, setShowSavedNotes] = useState(false);

  useEffect(() => {
    // Load saved notes from localStorage
    const saved = localStorage.getItem('empowerher-magic-notes');
    if (saved) {
      try {
        const decrypted = CryptoJS.AES.decrypt(saved, 'empowerher-secret').toString(CryptoJS.enc.Utf8);
        setSavedNotes(JSON.parse(decrypted) || []);
      } catch {
        setSavedNotes([]);
      }
    }
  }, []);

  const saveNote = () => {
    if (!content.trim()) return;

    if (burnAfterWriting) {
      // Show burning animation and clear
      setTimeout(() => {
        setContent('');
        alert('Your words have been released to the universe. 🌟');
      }, 1000);
    } else {
      // Save encrypted note
      const newNotes = [...savedNotes, content];
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(newNotes), 'empowerher-secret').toString();
      localStorage.setItem('empowerher-magic-notes', encrypted);
      setSavedNotes(newNotes);
      setContent('');
      alert('Your thoughts have been safely stored in your Magic Box. 💜');
    }
  };

  const downloadNote = () => {
    if (!content.trim()) return;

    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `magic-box-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const clearAllNotes = () => {
    if (confirm('Are you sure you want to clear all saved notes? This cannot be undone.')) {
      localStorage.removeItem('empowerher-magic-notes');
      setSavedNotes([]);
      alert('All notes have been cleared. 🌸');
    }
  };

  const deleteNote = (index: number) => {
    const newNotes = savedNotes.filter((_, i) => i !== index);
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(newNotes), 'empowerher-secret').toString();
    localStorage.setItem('empowerher-magic-notes', encrypted);
    setSavedNotes(newNotes);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${themes[selectedTheme].class}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-8 h-8 text-primary animate-pulse" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Magic Box
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A sacred space for your thoughts, feelings, and healing. Write freely, knowing you're completely safe and anonymous.
            </p>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Theme Selector */}
            <Card className="p-4 bg-card/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3">
                <Palette className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Choose Your Vibe</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {themes.map((theme, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTheme(index)}
                    className={`p-2 rounded-lg text-xs transition-all ${
                      selectedTheme === index 
                        ? 'ring-2 ring-primary' 
                        : 'hover:ring-1 ring-primary/50'
                    } ${theme.class}`}
                  >
                    {theme.name}
                  </button>
                ))}
              </div>
            </Card>

            {/* Music Selector */}
            <Card className="p-4 bg-card/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3">
                <Music className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Calming Sounds</h3>
              </div>
              <div className="space-y-2">
                {calmingMusic.map((music, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedMusic(index)}
                    className={`w-full p-2 text-left text-xs rounded transition-all ${
                      selectedMusic === index 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    {music.name}
                  </button>
                ))}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsMusicPlaying(!isMusicPlaying)}
                  className="w-full"
                >
                  {isMusicPlaying ? <VolumeX className="w-4 h-4 mr-2" /> : <Volume2 className="w-4 h-4 mr-2" />}
                  {isMusicPlaying ? 'Stop Music' : 'Play Music'}
                </Button>
              </div>
            </Card>

            {/* Options */}
            <Card className="p-4 bg-card/80 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3">
                <Lock className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Privacy Options</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="burn-after" className="text-sm">
                    Burn after writing
                  </Label>
                  <Switch
                    id="burn-after"
                    checked={burnAfterWriting}
                    onCheckedChange={setBurnAfterWriting}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {burnAfterWriting 
                    ? "Your words will disappear forever after saving, like burning a letter."
                    : "Your notes will be saved encrypted in your browser only."
                  }
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowSavedNotes(!showSavedNotes)}
                  className="w-full"
                >
                  {showSavedNotes ? 'Hide' : 'Show'} Saved Notes ({savedNotes.length})
                </Button>
              </div>
            </Card>
          </div>

          {/* Music Player */}
          {isMusicPlaying && (
            <div className="mb-6 flex justify-center">
              <div className="w-96 h-24 rounded-lg overflow-hidden shadow-magic">
                <iframe
                  src={calmingMusic[selectedMusic].url}
                  allow="autoplay; encrypted-media"
                  className="w-full h-full"
                />
              </div>
            </div>
          )}

          {/* Writing Area */}
          <Card className="p-6 bg-card/80 backdrop-blur-sm shadow-magic mb-6">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Dear Magic Box,

Write your heart out here... Share your pain, your dreams, your fears, your hopes. This is your safe space where judgment doesn't exist.

Remember:
• No one can see what you write here
• Your words are encrypted and stored only on your device
• You have complete control over your thoughts
• Healing begins with acknowledging your feelings

You are stronger than you know. You are not alone. 💜"
              className="min-h-96 resize-none border-none bg-transparent text-lg leading-relaxed focus:ring-0"
            />
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              onClick={saveNote}
              size="lg"
              className="bg-gradient-primary hover:opacity-90"
              disabled={!content.trim()}
            >
              <Heart className="w-5 h-5 mr-2" />
              {burnAfterWriting ? 'Release to Universe' : 'Save to Magic Box'}
            </Button>
            <Button
              onClick={downloadNote}
              size="lg"
              variant="outline"
              disabled={!content.trim()}
            >
              <Download className="w-5 h-5 mr-2" />
              Download Note
            </Button>
          </div>

          {/* Saved Notes */}
          {showSavedNotes && (
            <Card className="p-6 bg-card/80 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Your Sacred Thoughts</h3>
                {savedNotes.length > 0 && (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={clearAllNotes}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear All
                  </Button>
                )}
              </div>
              {savedNotes.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No saved notes yet. Your thoughts are waiting to be shared. 🌸
                </p>
              ) : (
                <div className="space-y-4">
                  {savedNotes.map((note, index) => (
                    <div key={index} className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm text-muted-foreground">
                          Note #{savedNotes.length - index}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteNote(index)}
                          className="text-destructive hover:text-destructive h-6 w-6 p-0"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-sm whitespace-pre-wrap line-clamp-3">
                        {note}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}

          {/* Affirmations */}
          <Card className="p-6 bg-gradient-healing text-center">
            <h3 className="text-lg font-semibold mb-4">Remember This Truth</h3>
            <p className="text-muted-foreground">
              "Your feelings are valid. Your voice matters. Your healing journey is sacred. 
              You have the strength to overcome anything, and you're never alone in this space."
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MagicBox;