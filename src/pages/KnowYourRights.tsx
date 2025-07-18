import { useState } from 'react';
import { Book, Scale, Shield, AlertCircle, Download, Languages, Phone } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const legalRights = [
  {
    title: "Workplace Rights",
    icon: Shield,
    rights: [
      "Equal pay for equal work",
      "Protection from sexual harassment", 
      "Maternity leave and benefits",
      "Safe working conditions",
      "Non-discriminatory hiring practices"
    ],
    laws: ["Equal Remuneration Act 1976", "Sexual Harassment Act 2013"]
  },
  {
    title: "Domestic Violence Protection",
    icon: AlertCircle,
    rights: [
      "Right to live free from violence",
      "Protection orders against abusers",
      "Shelter and support services",
      "Legal aid and counseling",
      "Property and maintenance rights"
    ],
    laws: ["Domestic Violence Act 2005", "IPC Section 498A"]
  },
  {
    title: "Marriage & Family Rights",
    icon: Scale,
    rights: [
      "Right to choose spouse",
      "Property inheritance rights",
      "Child custody rights",
      "Divorce and maintenance",
      "Protection from dowry harassment"
    ],
    laws: ["Hindu Marriage Act", "Dowry Prohibition Act 1961"]
  }
];

const emergencyNumbers = [
  { name: "Women Helpline", number: "1091", available: "24/7" },
  { name: "Police Emergency", number: "112", available: "24/7" },
  { name: "Domestic Violence", number: "181", available: "24/7" },
  { name: "Legal Aid", number: "15100", available: "9 AM - 6 PM" }
];

const KnowYourRights = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  const downloadRightsGuide = () => {
    // Simulate PDF download
    const element = document.createElement('a');
    element.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent('Women Rights Guide - EmpowerHER Platform');
    element.download = 'women-rights-guide.txt';
    element.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Book className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Know Your Rights
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Empower yourself with knowledge. Understand your legal rights and protections under Indian law.
          </p>
        </div>

        {/* Language Selector */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Languages className="h-5 w-5 text-primary" />
              Choose Your Language
            </h3>
            <Button onClick={downloadRightsGuide} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Guide
            </Button>
          </div>
          <Tabs value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="english">English</TabsTrigger>
              <TabsTrigger value="hindi">हिंदी</TabsTrigger>
              <TabsTrigger value="telugu">తెలుగు</TabsTrigger>
              <TabsTrigger value="kannada">ಕನ್ನಡ</TabsTrigger>
            </TabsList>
            
            <TabsContent value="english" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {legalRights.map((category, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <category.icon className="h-6 w-6 text-primary" />
                        <h4 className="text-lg font-semibold">{category.title}</h4>
                      </div>
                      
                      <ul className="space-y-2">
                        {category.rights.map((right, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            {right}
                          </li>
                        ))}
                      </ul>
                      
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">Relevant Laws:</p>
                        <div className="flex flex-wrap gap-1">
                          {category.laws.map((law, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {law}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="hindi" className="mt-6">
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  हिंदी सामग्री जल्द ही उपलब्ध होगी। कृपया अंग्रेजी संस्करण देखें।
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="telugu" className="mt-6">
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  తెలుగు కంటెంట్ త్వరలో అందుబాటులో ఉంటుంది. దయచేసి ఆంగ్ల వెర్షన్ చూడండి.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="kannada" className="mt-6">
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  ಕನ್ನಡ ವಿಷಯ ಶೀಘ್ರದಲ್ಲೇ ಲಭ್ಯವಿರುತ್ತದೆ. ದಯವಿಟ್ಟು ಇಂಗ್ಲಿಷ್ ಆವೃತ್ತಿಯನ್ನು ನೋಡಿ.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Emergency Legal Help */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            Emergency Legal Help
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {emergencyNumbers.map((contact, index) => (
              <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">{contact.name}</h4>
                  <p className="text-2xl font-bold">{contact.number}</p>
                  <p className="text-xs text-muted-foreground">{contact.available}</p>
                  <Button 
                    onClick={() => window.open(`tel:${contact.number}`, '_self')}
                    className="w-full" 
                    size="sm"
                  >
                    <Phone className="mr-2 h-3 w-3" />
                    Call Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Scale className="h-6 w-6" />
              Find Legal Aid
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Shield className="h-6 w-6" />
              Report Violation
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Book className="h-6 w-6" />
              Legal Resources
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default KnowYourRights;