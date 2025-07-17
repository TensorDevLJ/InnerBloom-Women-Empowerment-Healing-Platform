import { useState } from 'react';
import { FileText, Shield, Lock, Send, AlertTriangle, Camera, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

interface Report {
  id: string;
  type: string;
  description: string;
  location: string;
  dateTime: string;
  anonymous: boolean;
  contactInfo?: string;
  urgency: string;
  status: 'submitted' | 'processing' | 'resolved';
}

const incidentTypes = [
  'Sexual Harassment',
  'Physical Assault',
  'Domestic Violence',
  'Workplace Harassment',
  'Online Harassment',
  'Stalking',
  'Verbal Abuse',
  'Discrimination',
  'Other'
];

const urgencyLevels = [
  { value: 'immediate', label: 'Immediate Danger', color: 'bg-red-500' },
  { value: 'urgent', label: 'Urgent', color: 'bg-orange-500' },
  { value: 'normal', label: 'Normal', color: 'bg-blue-500' },
  { value: 'non-urgent', label: 'Non-Urgent', color: 'bg-green-500' }
];

const AnonymousReporter = () => {
  const [reportData, setReportData] = useState({
    type: '',
    description: '',
    location: '',
    dateTime: '',
    anonymous: true,
    contactInfo: '',
    urgency: 'normal'
  });
  const [submittedReports, setSubmittedReports] = useState<Report[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reportData.type || !reportData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in the incident type and description.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API submission
    setTimeout(() => {
      const newReport: Report = {
        id: `RPT-${Date.now()}`,
        ...reportData,
        status: 'submitted'
      };

      // In a real app, this would be sent to a server
      // For demo purposes, we'll store it locally
      const existingReports = JSON.parse(localStorage.getItem('empowerher-reports') || '[]');
      const updatedReports = [...existingReports, newReport];
      localStorage.setItem('empowerher-reports', JSON.stringify(updatedReports));
      
      setSubmittedReports(updatedReports);
      
      // Reset form
      setReportData({
        type: '',
        description: '',
        location: '',
        dateTime: '',
        anonymous: true,
        contactInfo: '',
        urgency: 'normal'
      });

      setIsSubmitting(false);

      toast({
        title: "Report Submitted",
        description: `Your report has been submitted anonymously. Reference ID: ${newReport.id}`,
      });

      // If urgent, suggest additional actions
      if (reportData.urgency === 'immediate') {
        setTimeout(() => {
          toast({
            title: "Immediate Help Available",
            description: "For immediate danger, please also contact emergency services: 112 or 1091",
          });
        }, 2000);
      }
    }, 2000);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setReportData(prev => ({
            ...prev,
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          }));
          toast({
            title: "Location Added",
            description: "Your current location has been added to the report.",
          });
        },
        () => {
          toast({
            title: "Location Error",
            description: "Could not get your location. Please enter it manually.",
            variant: "destructive",
          });
        }
      );
    }
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const datetime = now.toISOString().slice(0, 16);
    setReportData(prev => ({ ...prev, dateTime: datetime }));
  };

  return (
    <div className="min-h-screen bg-gradient-healing py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <FileText className="w-8 h-8 text-primary animate-pulse" />
              <h1 className="text-4xl md:text-5xl font-bold">Anonymous Reporter</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Report incidents safely and anonymously. Your voice matters, and your privacy is protected.
            </p>
          </div>

          {/* Safety Notice */}
          <Card className="p-6 mb-8 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 border-amber-200">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">Your Safety & Privacy</h3>
                <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                  <li>• All reports are encrypted and handled confidentially</li>
                  <li>• Anonymous reporting ensures your identity is protected</li>
                  <li>• Reports are reviewed by trained professionals</li>
                  <li>• For immediate danger, contact emergency services: 112 or 1091</li>
                </ul>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Report Form */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Lock className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">Submit Report</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Incident Type */}
                  <div>
                    <Label htmlFor="incident-type">Type of Incident *</Label>
                    <Select value={reportData.type} onValueChange={(value) => setReportData(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select incident type" />
                      </SelectTrigger>
                      <SelectContent>
                        {incidentTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Urgency Level */}
                  <div>
                    <Label htmlFor="urgency">Urgency Level</Label>
                    <Select value={reportData.urgency} onValueChange={(value) => setReportData(prev => ({ ...prev, urgency: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency level" />
                      </SelectTrigger>
                      <SelectContent>
                        {urgencyLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${level.color}`}></div>
                              {level.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor="description">Description of Incident *</Label>
                    <Textarea
                      id="description"
                      value={reportData.description}
                      onChange={(e) => setReportData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Please describe what happened. Include as much detail as you feel comfortable sharing..."
                      className="min-h-32"
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <Label htmlFor="location">Location (Optional)</Label>
                    <div className="flex gap-2">
                      <Input
                        id="location"
                        value={reportData.location}
                        onChange={(e) => setReportData(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="Where did this happen?"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={getCurrentLocation}
                      >
                        <MapPin className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div>
                    <Label htmlFor="datetime">Date & Time (Optional)</Label>
                    <div className="flex gap-2">
                      <Input
                        id="datetime"
                        type="datetime-local"
                        value={reportData.dateTime}
                        onChange={(e) => setReportData(prev => ({ ...prev, dateTime: e.target.value }))}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={getCurrentDateTime}
                      >
                        <Calendar className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Anonymous Toggle */}
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <Label htmlFor="anonymous" className="font-medium">
                        Submit Anonymously
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Keep your identity completely private
                      </p>
                    </div>
                    <Switch
                      id="anonymous"
                      checked={reportData.anonymous}
                      onCheckedChange={(checked) => setReportData(prev => ({ ...prev, anonymous: checked }))}
                    />
                  </div>

                  {/* Contact Info (if not anonymous) */}
                  {!reportData.anonymous && (
                    <div>
                      <Label htmlFor="contact">Contact Information (Optional)</Label>
                      <Input
                        id="contact"
                        value={reportData.contactInfo}
                        onChange={(e) => setReportData(prev => ({ ...prev, contactInfo: e.target.value }))}
                        placeholder="Email or phone number for follow-up"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Only provide if you want to be contacted about this report
                      </p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-primary hover:opacity-90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Submitting Report...</>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Submit Report
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Support Resources */}
            <div className="space-y-6">
              {/* Immediate Help */}
              <Card className="p-6 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                  <h3 className="text-xl font-bold text-red-800 dark:text-red-200">Need Immediate Help?</h3>
                </div>
                <div className="space-y-3">
                  <Button
                    onClick={() => window.open('tel:112', '_self')}
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    Emergency: 112
                  </Button>
                  <Button
                    onClick={() => window.open('tel:1091', '_self')}
                    className="w-full bg-pink-600 hover:bg-pink-700"
                  >
                    Women Helpline: 1091
                  </Button>
                </div>
              </Card>

              {/* What Happens Next */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">What Happens Next?</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    <p>Your report is encrypted and safely stored</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <p>Trained professionals review your report</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <p>Appropriate action is taken based on urgency</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">4</div>
                    <p>You receive a reference ID for tracking</p>
                  </div>
                </div>
              </Card>

              {/* Support Resources */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Support Resources</h3>
                <div className="space-y-2 text-sm">
                  <a href="/wellness" className="block p-2 hover:bg-muted rounded">
                    🧘 Mental Health Support
                  </a>
                  <a href="/rights" className="block p-2 hover:bg-muted rounded">
                    ⚖️ Know Your Legal Rights
                  </a>
                  <a href="/safety-hub" className="block p-2 hover:bg-muted rounded">
                    🛡️ Safety Planning Tools
                  </a>
                  <a href="/magic-box" className="block p-2 hover:bg-muted rounded">
                    💜 Emotional Healing Space
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnonymousReporter;