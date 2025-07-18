import { useState, useEffect } from 'react';
import { Quote, RefreshCw, Share2, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const empoweringQuotes = [
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    text: "A woman is like a tea bag - you can't tell how strong she is until you put her in hot water.",
    author: "Eleanor Roosevelt"
  },
  {
    text: "I am not afraid of storms, for I am learning how to sail my ship.",
    author: "Louisa May Alcott"
  },
  {
    text: "The most courageous act is still to think for yourself. Aloud.",
    author: "Coco Chanel"
  },
  {
    text: "She believed she could, so she did.",
    author: "R.S. Grey"
  },
  {
    text: "You are more powerful than you know; you are beautiful just as you are.",
    author: "Melissa Etheridge"
  },
  {
    text: "A strong woman stands up for herself. A stronger woman stands up for everyone else.",
    author: "Unknown"
  },
  {
    text: "The question isn't who's going to let me; it's who's going to stop me.",
    author: "Ayn Rand"
  },
  {
    text: "I can't think of any better representation of beauty than someone who is unafraid to be herself.",
    author: "Emma Stone"
  },
  {
    text: "You are enough just as you are. Each emotion you feel, everything in your life, everything you do or do not do... where you are and who you are right now is enough.",
    author: "Haemin Sunim"
  }
];

const DailyQuote = () => {
  const [currentQuote, setCurrentQuote] = useState(empoweringQuotes[0]);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Get a different quote based on the day of the year
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const quoteIndex = dayOfYear % empoweringQuotes.length;
    setCurrentQuote(empoweringQuotes[quoteIndex]);
  }, []);

  const getNewQuote = () => {
    const randomIndex = Math.floor(Math.random() * empoweringQuotes.length);
    setCurrentQuote(empoweringQuotes[randomIndex]);
    setIsLiked(false);
  };

  const shareQuote = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Daily Inspiration from EmpowerHER',
        text: `"${currentQuote.text}" - ${currentQuote.author}`,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`"${currentQuote.text}" - ${currentQuote.author}`);
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-primary">
          <Quote className="h-5 w-5" />
          <h3 className="font-semibold">Daily Inspiration</h3>
        </div>
        
        <div className="space-y-4">
          <blockquote className="text-lg font-medium italic text-foreground leading-relaxed">
            "{currentQuote.text}"
          </blockquote>
          <p className="text-sm text-muted-foreground text-right">
            — {currentQuote.author}
          </p>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className={isLiked ? "text-red-500" : ""}
            >
              <Heart className={`h-4 w-4 mr-1 ${isLiked ? "fill-current" : ""}`} />
              {isLiked ? "Loved" : "Love it"}
            </Button>
            <Button variant="ghost" size="sm" onClick={shareQuote}>
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
          <Button variant="outline" size="sm" onClick={getNewQuote}>
            <RefreshCw className="h-4 w-4 mr-1" />
            New Quote
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default DailyQuote;