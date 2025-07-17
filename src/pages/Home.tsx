import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Shield, FileText, Scale, Sparkles, Users, Quote, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const empoweringQuotes = [
  "You are braver than you believe, stronger than you seem, and smarter than you think.",
  "A woman with a voice is, by definition, a strong woman.",
  "The future is female, and it starts with you.",
  "Your voice can change the world. Use it.",
  "She believed she could, so she did.",
  "Empowered women empower women.",
  "You are not just a drop in the ocean, but the entire ocean in each drop.",
  "Strong women don't have attitudes, they have standards."
];

const features = [
  {
    title: "Magic Box",
    description: "A safe space to express your feelings anonymously",
    icon: Heart,
    path: "/magic-box",
    color: "from-pink-500 to-purple-600"
  },
  {
    title: "Safety Hub",
    description: "Emergency tools and safety resources",
    icon: Shield,
    path: "/safety-hub",
    color: "from-blue-500 to-cyan-600"
  },
  {
    title: "Anonymous Reporter",
    description: "Report incidents safely and anonymously",
    icon: FileText,
    path: "/report",
    color: "from-green-500 to-emerald-600"
  },
  {
    title: "Know Your Rights",
    description: "Legal information and guidance",
    icon: Scale,
    path: "/rights",
    color: "from-purple-500 to-indigo-600"
  },
  {
    title: "Wellness Corner",
    description: "Self-care resources and mental health support",
    icon: Sparkles,
    path: "/wellness",
    color: "from-rose-500 to-pink-600"
  },
  {
    title: "Empowerment Zone",
    description: "Skills, opportunities, and growth",
    icon: Users,
    path: "/empowerment",
    color: "from-orange-500 to-red-600"
  }
];

const testimonials = [
  {
    name: "Anonymous User",
    text: "EmpowerHER gave me the courage to speak up. The Magic Box helped me process my emotions safely.",
    rating: 5
  },
  {
    name: "Survivor",
    text: "The safety tools potentially saved my life. Having quick access to help made all the difference.",
    rating: 5
  },
  {
    name: "Community Member",
    text: "This platform connects women and provides resources I never knew existed. Truly empowering.",
    rating: 5
  }
];

const Home = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % empoweringQuotes.length);
    }, 5000);

    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 7000);

    return () => {
      clearInterval(quoteInterval);
      clearInterval(testimonialInterval);
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-primary text-primary-foreground">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Rise With{' '}
              <span className="text-primary-glow">
                Her Voice
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
              A safe space for women to heal, report, and empower each other. 
              Your voice matters, your safety matters, you matter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/magic-box">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  <Heart className="w-5 h-5 mr-2" />
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/safety-hub">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <Shield className="w-5 h-5 mr-2" />
                  Safety First
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Quote Widget */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="relative">
              <Quote className="w-12 h-12 text-primary mx-auto mb-6 opacity-50" />
              <blockquote className="text-2xl md:text-3xl font-medium text-foreground leading-relaxed mb-6 min-h-[120px] flex items-center justify-center">
                "{empoweringQuotes[currentQuote]}"
              </blockquote>
              <div className="flex justify-center gap-2">
                {empoweringQuotes.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentQuote ? 'bg-primary w-6' : 'bg-primary/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your Toolkit for Empowerment
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every feature designed with your safety, healing, and growth in mind
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link to={feature.path} key={index} className="group">
                <Card className="p-6 h-full hover:shadow-magic transition-all duration-300 group-hover:scale-105 bg-gradient-to-br from-card to-card/50">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center text-primary group-hover:translate-x-2 transition-transform">
                    <span className="text-sm font-medium">Explore</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-gradient-healing">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">24/7</div>
              <p className="text-muted-foreground">Always Available Support</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">100%</div>
              <p className="text-muted-foreground">Anonymous & Secure</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">∞</div>
              <p className="text-muted-foreground">Unlimited Compassion</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Voices of Strength
            </h2>
            <p className="text-xl text-muted-foreground">
              Real stories from our community
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 text-center bg-gradient-to-br from-card to-accent/20">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl font-medium mb-6 leading-relaxed min-h-[80px] flex items-center justify-center">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              <cite className="text-muted-foreground font-medium">
                — {testimonials[currentTestimonial].name}
              </cite>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Join thousands of women who have found their voice, strength, and community through EmpowerHER.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/magic-box">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                <Heart className="w-5 h-5 mr-2" />
                Open Magic Box
              </Button>
            </Link>
            <Link to="/safety-hub">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Shield className="w-5 h-5 mr-2" />
                Access Safety Tools
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;