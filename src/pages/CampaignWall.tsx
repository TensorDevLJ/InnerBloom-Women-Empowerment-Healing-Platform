import { useState } from 'react';
import { Megaphone, Calendar, MapPin, Users, Heart, Share2, Plus, Filter } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const campaigns = [
  {
    id: 1,
    title: "March for Equal Pay",
    organizer: "Women Rights Collective",
    date: "2024-02-15",
    location: "India Gate, Delhi",
    attendees: 250,
    category: "rally",
    description: "Join us in demanding equal pay for equal work. Together we rise!",
    image: "🚺",
    likes: 89,
    shares: 23
  },
  {
    id: 2,
    title: "Self Defense Workshop",
    organizer: "SheFights Academy",
    date: "2024-02-20",
    location: "Community Center, Mumbai",
    attendees: 45,
    category: "workshop",
    description: "Learn essential self-defense techniques. Empower yourself with confidence.",
    image: "🥋",
    likes: 67,
    shares: 15
  },
  {
    id: 3,
    title: "Digital Literacy for All",
    organizer: "TechSisters",
    date: "2024-02-25",
    location: "Online Event",
    attendees: 120,
    category: "education",
    description: "Free digital skills training for women from rural areas.",
    image: "💻",
    likes: 134,
    shares: 41
  },
  {
    id: 4,
    title: "Break the Silence",
    organizer: "Voices United",
    date: "2024-03-01", 
    location: "Town Hall, Bangalore",
    attendees: 180,
    category: "awareness",
    description: "Speaking out against domestic violence. Your voice matters.",
    image: "🔊",
    likes: 156,
    shares: 67
  }
];

const stories = [
  {
    id: 1,
    title: "From Victim to Advocate",
    author: "Anonymous Survivor",
    category: "survival",
    excerpt: "How I turned my pain into purpose and started helping other women...",
    readTime: "5 min read",
    likes: 234,
    comments: 45
  },
  {
    id: 2,
    title: "Building My Tech Career",
    author: "Priya K.",
    category: "career",
    excerpt: "Breaking barriers in male-dominated tech industry...",
    readTime: "3 min read",
    likes: 156,
    comments: 28
  },
  {
    id: 3,
    title: "Starting Over at 40",
    author: "Meera S.",
    category: "inspiration",
    excerpt: "How I left an abusive marriage and rebuilt my life...",
    readTime: "7 min read",
    likes: 289,
    comments: 67
  }
];

const CampaignWall = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleJoinCampaign = (campaignId: number) => {
    // Handle join campaign logic
    console.log('Joining campaign:', campaignId);
  };

  const handleLikeStory = (storyId: number) => {
    // Handle like story logic
    console.log('Liking story:', storyId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Megaphone className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Campaign Wall
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover movements, join campaigns, and share your story. Together we create change.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search campaigns, events, or stories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Campaign
              </Button>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="campaigns" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="campaigns">Active Campaigns</TabsTrigger>
            <TabsTrigger value="events">Upcoming Events</TabsTrigger>
            <TabsTrigger value="stories">Inspiring Stories</TabsTrigger>
          </TabsList>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns">
            <div className="space-y-6">
              <div className="flex gap-2 overflow-x-auto pb-2">
                <Button 
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('all')}
                >
                  All
                </Button>
                <Button 
                  variant={selectedCategory === 'rally' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('rally')}
                >
                  Rallies
                </Button>
                <Button 
                  variant={selectedCategory === 'workshop' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('workshop')}
                >
                  Workshops
                </Button>
                <Button 
                  variant={selectedCategory === 'education' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('education')}
                >
                  Education
                </Button>
                <Button 
                  variant={selectedCategory === 'awareness' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('awareness')}
                >
                  Awareness
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {campaigns.map((campaign) => (
                  <Card key={campaign.id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">{campaign.image}</span>
                            <Badge variant="secondary">{campaign.category}</Badge>
                          </div>
                          <h4 className="font-semibold text-lg">{campaign.title}</h4>
                          <p className="text-sm text-muted-foreground">{campaign.organizer}</p>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{campaign.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span>{new Date(campaign.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>{campaign.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-primary" />
                          <span>{campaign.attendees} attending</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            <span>{campaign.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Share2 className="h-4 w-4" />
                            <span>{campaign.shares}</span>
                          </div>
                        </div>
                        <Button onClick={() => handleJoinCampaign(campaign.id)}>
                          Join Campaign
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events">
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">This Week's Events</h3>
                <div className="space-y-4">
                  {campaigns.slice(0, 2).map((event) => (
                    <div key={event.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">
                          {new Date(event.date).getDate()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(event.date).toLocaleDateString('en', { month: 'short' })}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">{event.location}</p>
                      </div>
                      <Button size="sm">RSVP</Button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Stories Tab */}
          <TabsContent value="stories">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Inspiring Stories</h3>
                <Button variant="outline">Share Your Story</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stories.map((story) => (
                  <Card key={story.id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="space-y-4">
                      <div>
                        <Badge variant="outline" className="mb-2">{story.category}</Badge>
                        <h4 className="font-semibold text-lg">{story.title}</h4>
                        <p className="text-sm text-muted-foreground">by {story.author}</p>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{story.excerpt}</p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{story.readTime}</span>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => handleLikeStory(story.id)}
                            className="flex items-center gap-1 hover:text-primary"
                          >
                            <Heart className="h-3 w-3" />
                            <span>{story.likes}</span>
                          </button>
                          <span>{story.comments} comments</span>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        Read Story
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CampaignWall;