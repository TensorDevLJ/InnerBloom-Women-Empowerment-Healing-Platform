import { useState } from 'react';
import { Users, MessageCircle, Heart, Shield, Star, Plus, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const supportGroups = [
  {
    id: 1,
    name: "Survivors Circle",
    members: 145,
    category: "Support",
    description: "A safe space for survivors to share, heal, and support each other",
    isPrivate: true,
    lastActivity: "2 hours ago"
  },
  {
    id: 2,
    name: "Career Warriors",
    members: 89,
    category: "Professional",
    description: "Women supporting women in career advancement and workplace challenges",
    isPrivate: false,
    lastActivity: "5 hours ago"
  },
  {
    id: 3,
    name: "Single Mothers United",
    members: 203,
    category: "Parenting",
    description: "Support network for single mothers facing daily challenges",
    isPrivate: true,
    lastActivity: "1 hour ago"
  },
  {
    id: 4,
    name: "Entrepreneur Sisters",
    members: 67,
    category: "Business",
    description: "Women entrepreneurs sharing experiences and business advice",
    isPrivate: false,
    lastActivity: "3 hours ago"
  }
];

const discussions = [
  {
    id: 1,
    title: "How to rebuild confidence after trauma?",
    author: "Anonymous",
    groupName: "Survivors Circle",
    replies: 23,
    likes: 45,
    timeAgo: "2 hours ago",
    isAnonymous: true,
    tags: ["healing", "confidence", "support"]
  },
  {
    id: 2,
    title: "Negotiating salary as a woman in tech",
    author: "TechSister_2024",
    groupName: "Career Warriors", 
    replies: 15,
    likes: 32,
    timeAgo: "4 hours ago",
    isAnonymous: false,
    tags: ["career", "salary", "tech"]
  },
  {
    id: 3,
    title: "Balancing work and kids - need advice",
    author: "WorkingMom_23",
    groupName: "Single Mothers United",
    replies: 18,
    likes: 28,
    timeAgo: "1 hour ago",
    isAnonymous: false,
    tags: ["parenting", "work-life", "advice"]
  }
];

const resources = [
  {
    title: "Crisis Hotlines",
    items: [
      "Women Helpline: 1091",
      "Domestic Violence: 181", 
      "Mental Health: 9152987821",
      "Legal Aid: 15100"
    ]
  },
  {
    title: "Support Organizations",
    items: [
      "Women's Rights Foundation",
      "Survivors Support Network",
      "Legal Aid for Women",
      "Mental Health Alliance"
    ]
  },
  {
    title: "Self-Help Resources",
    items: [
      "Healing from Trauma Guide",
      "Financial Independence Toolkit",
      "Legal Rights Handbook",
      "Safety Planning Checklist"
    ]
  }
];

const CommunityBoard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [newPost, setNewPost] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const { toast } = useToast();

  const handleCreatePost = () => {
    if (newPost.trim() && selectedGroup) {
      toast({
        title: "Post Created",
        description: "Your post has been shared with the community.",
      });
      setNewPost('');
      setSelectedGroup('');
    }
  };

  const handleJoinGroup = (groupId: number) => {
    toast({
      title: "Request Sent",
      description: "Your request to join the group has been sent for approval.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5 p-4">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Users className="h-8 w-8 text-secondary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              Community Board
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Connect with supportive communities, share experiences, and find strength in sisterhood.
          </p>
        </div>

        {/* Search Bar */}
        <Card className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search groups, discussions, or resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        <Tabs defaultValue="groups" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="groups">Support Groups</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="create">Create Post</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          {/* Support Groups Tab */}
          <TabsContent value="groups">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Find Your Community</h3>
                <Button variant="outline">Create Group</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {supportGroups.map((group) => (
                  <Card key={group.id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-lg">{group.name}</h4>
                            {group.isPrivate && (
                              <Shield className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          <Badge variant="outline">{group.category}</Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{group.description}</p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {group.members} members
                          </span>
                          <span>Active {group.lastActivity}</span>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => handleJoinGroup(group.id)}
                        className="w-full"
                        variant={group.isPrivate ? "outline" : "default"}
                      >
                        {group.isPrivate ? "Request to Join" : "Join Group"}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Discussions Tab */}
          <TabsContent value="discussions">
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Recent Discussions</h3>
              
              <div className="space-y-4">
                {discussions.map((discussion) => (
                  <Card key={discussion.id} className="p-6 hover:shadow-md transition-shadow">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-2">{discussion.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>by {discussion.author}</span>
                            <span>•</span>
                            <span>in {discussion.groupName}</span>
                            <span>•</span>
                            <span>{discussion.timeAgo}</span>
                            {discussion.isAnonymous && (
                              <Badge variant="secondary" className="text-xs">Anonymous</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {discussion.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <button className="flex items-center gap-1 hover:text-primary">
                            <Heart className="h-4 w-4" />
                            <span>{discussion.likes} likes</span>
                          </button>
                          <button className="flex items-center gap-1 hover:text-primary">
                            <MessageCircle className="h-4 w-4" />
                            <span>{discussion.replies} replies</span>
                          </button>
                        </div>
                        <Button variant="outline" size="sm">
                          Join Discussion
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Create Post Tab */}
          <TabsContent value="create">
            <Card className="p-6">
              <div className="space-y-6">
                <h3 className="text-xl font-bold">Share with the Community</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Group</label>
                    <select 
                      value={selectedGroup}
                      onChange={(e) => setSelectedGroup(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Choose a group...</option>
                      {supportGroups.map((group) => (
                        <option key={group.id} value={group.name}>
                          {group.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Message</label>
                    <Textarea
                      placeholder="Share your thoughts, ask for advice, or offer support..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      rows={6}
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox"
                      id="anonymous"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="anonymous" className="text-sm">
                      Post anonymously
                    </label>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      onClick={handleCreatePost}
                      disabled={!newPost.trim() || !selectedGroup}
                      className="flex-1"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Share Post
                    </Button>
                    <Button variant="outline">Save Draft</Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources">
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Community Resources</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {resources.map((category, index) => (
                  <Card key={index} className="p-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg flex items-center gap-2">
                        <Star className="h-5 w-5 text-secondary" />
                        {category.title}
                      </h4>
                      <ul className="space-y-2">
                        {category.items.map((item, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <Button variant="outline" className="w-full">
                        View All
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

export default CommunityBoard;