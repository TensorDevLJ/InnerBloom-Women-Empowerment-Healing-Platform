import { useState } from 'react';
import { GraduationCap, Briefcase, Users, Star, Award, TrendingUp, ExternalLink, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const skills = [
  {
    title: "Web Development Bootcamp",
    provider: "TechSister Academy",
    duration: "12 weeks",
    level: "Beginner",
    students: 1200,
    rating: 4.8,
    free: true,
    description: "Learn HTML, CSS, JavaScript and React from scratch"
  },
  {
    title: "Digital Marketing Mastery",
    provider: "WomenInTech",
    duration: "8 weeks", 
    level: "Intermediate",
    students: 850,
    rating: 4.7,
    free: true,
    description: "Social media, SEO, and content marketing strategies"
  },
  {
    title: "Financial Literacy for Women",
    provider: "MoneyWise",
    duration: "6 weeks",
    level: "Beginner",
    students: 2100,
    rating: 4.9,
    free: true,
    description: "Personal finance, investing, and entrepreneurship"
  },
  {
    title: "Leadership & Communication",
    provider: "LeadershipHER",
    duration: "10 weeks",
    level: "Advanced",
    students: 650,
    rating: 4.6,
    free: false,
    description: "Executive presence and team management skills"
  }
];

const jobs = [
  {
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Remote",
    salary: "₹4-8 LPA",
    type: "Full-time",
    womenFriendly: true,
    urgent: false
  },
  {
    title: "Content Writer",
    company: "MediaHub",
    location: "Bangalore",
    salary: "₹3-5 LPA", 
    type: "Full-time",
    womenFriendly: true,
    urgent: true
  },
  {
    title: "UX Designer",
    company: "DesignStudio",
    location: "Mumbai",
    salary: "₹5-9 LPA",
    type: "Full-time", 
    womenFriendly: true,
    urgent: false
  },
  {
    title: "Data Analyst",
    company: "Analytics Co",
    location: "Remote",
    salary: "₹4-7 LPA",
    type: "Part-time",
    womenFriendly: true,
    urgent: false
  }
];

const mentors = [
  {
    name: "Priya Sharma",
    role: "Senior Software Engineer",
    company: "Google",
    expertise: ["Web Development", "Career Growth"],
    experience: "8 years",
    sessions: 45,
    rating: 4.9
  },
  {
    name: "Anita Rao",
    role: "Marketing Director", 
    company: "Microsoft",
    expertise: ["Digital Marketing", "Leadership"],
    experience: "12 years",
    sessions: 32,
    rating: 4.8
  },
  {
    name: "Kavya Patel",
    role: "Product Manager",
    company: "Amazon",
    expertise: ["Product Strategy", "Entrepreneurship"],
    experience: "10 years",
    sessions: 28,
    rating: 4.7
  }
];

const EmpowermentZone = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 p-4">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <GraduationCap className="h-8 w-8 text-accent" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Empowerment Zone
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Build skills, find opportunities, connect with mentors. Your journey to economic independence starts here.
          </p>
        </div>

        {/* Search Bar */}
        <Card className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for skills, jobs, or mentors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        <Tabs defaultValue="skills" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="skills">Skills & Courses</TabsTrigger>
            <TabsTrigger value="jobs">Job Opportunities</TabsTrigger>
            <TabsTrigger value="mentors">Mentorship</TabsTrigger>
            <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
          </TabsList>

          {/* Skills & Courses Tab */}
          <TabsContent value="skills">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Free & Premium Courses</h3>
                <Button variant="outline">View All Courses</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((skill, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">{skill.title}</h4>
                          <p className="text-sm text-muted-foreground">{skill.provider}</p>
                        </div>
                        {skill.free && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            FREE
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{skill.description}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{skill.duration}</span>
                        <span>•</span>
                        <span>{skill.level}</span>
                        <span>•</span>
                        <span>{skill.students} students</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{skill.rating}</span>
                        </div>
                      </div>
                      
                      <Button className="w-full">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Start Learning
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Women-Friendly Job Opportunities</h3>
                <Button variant="outline">Post a Job</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jobs.map((job, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-lg">{job.title}</h4>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                        </div>
                        <div className="flex gap-2">
                          {job.urgent && (
                            <Badge variant="destructive" className="text-xs">URGENT</Badge>
                          )}
                          {job.womenFriendly && (
                            <Badge variant="secondary" className="text-xs bg-pink-100 text-pink-800">
                              Women-Friendly
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-4 text-sm">
                          <span>📍 {job.location}</span>
                          <span>💰 {job.salary}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{job.type}</Badge>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button className="flex-1">Apply Now</Button>
                        <Button variant="outline" size="icon">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Mentorship Tab */}
          <TabsContent value="mentors">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Connect with Industry Leaders</h3>
                <Button variant="outline">Become a Mentor</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mentors.map((mentor, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center mb-3">
                          <Users className="h-8 w-8 text-accent" />
                        </div>
                        <h4 className="font-semibold text-lg">{mentor.name}</h4>
                        <p className="text-sm text-muted-foreground">{mentor.role}</p>
                        <p className="text-xs text-muted-foreground">{mentor.company}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-xs font-medium">Expertise:</p>
                        <div className="flex flex-wrap gap-1">
                          {mentor.expertise.map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{mentor.experience} exp</span>
                        <span>{mentor.sessions} sessions</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{mentor.rating}</span>
                        </div>
                      </div>
                      
                      <Button className="w-full">
                        Book Session
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Scholarships Tab */}
          <TabsContent value="scholarships">
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Available Scholarships & Grants</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Award className="h-6 w-6 text-accent" />
                      <h4 className="font-semibold text-lg">Tech Education Grant</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Up to ₹50,000 for women pursuing technology education and certifications.
                    </p>
                    <div className="space-y-2">
                      <p className="text-xs font-medium">Eligibility:</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Age 18-35 years</li>
                        <li>• Annual income below ₹5 lakhs</li>
                        <li>• Enrolled in tech course</li>
                      </ul>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1">Apply Now</Button>
                      <Button variant="outline">Learn More</Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-6 w-6 text-accent" />
                      <h4 className="font-semibold text-lg">Entrepreneur Startup Fund</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Seed funding up to ₹2 lakhs for women-led startups and business ideas.
                    </p>
                    <div className="space-y-2">
                      <p className="text-xs font-medium">Benefits:</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• 0% interest for first year</li>
                        <li>• Business mentoring included</li>
                        <li>• Marketing support</li>
                      </ul>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1">Apply Now</Button>
                      <Button variant="outline">Learn More</Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmpowermentZone;