import { useState, useEffect } from 'react';
import { Shield, Phone, MessageSquare, MapPin, Users, AlertTriangle, Clock, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

interface SafeLocation {
  name: string;
  address: string;
  type: 'police' | 'hospital' | 'ngo' | 'shelter';
  phone: string;
  available247: boolean;
}

const emergencyNumbers = [
  { name: 'Women Helpline', number: '1091', description: '24/7 support for women in distress' },
  { name: 'Police Emergency', number: '112', description: 'General emergency number' },
  { name: 'Domestic Violence', number: '181', description: 'For domestic violence cases' },
  { name: 'Child Helpline', number: '1098', description: 'For child-related emergencies' },
  { name: 'Senior Citizen', number: '14567', description: 'For elderly emergencies' },
];

const safeLocations: SafeLocation[] = [
  { name: 'City Police Station', address: '123 Main Street', type: 'police', phone: '112', available247: true },
  { name: 'Women Help Center', address: '456 Care Avenue', type: 'ngo', phone: '1091', available247: true },
  { name: 'General Hospital', address: '789 Health Road', type: 'hospital', phone: '108', available247: true },
  { name: 'Safe House Shelter', address: '321 Secure Lane', type: 'shelter', phone: '1091', available247: false },
];

const SafetyHub = () => {
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [newContact, setNewContact] = useState<EmergencyContact>({ name: '', phone: '', relationship: '' });
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load emergency contacts from localStorage
    const saved = localStorage.getItem('empowerher-emergency-contacts');
    if (saved) {
      setEmergencyContacts(JSON.parse(saved));
    }
  }, []);

  const saveContacts = (contacts: EmergencyContact[]) => {
    localStorage.setItem('empowerher-emergency-contacts', JSON.stringify(contacts));
    setEmergencyContacts(contacts);
  };

  const addEmergencyContact = () => {
    if (newContact.name && newContact.phone) {
      const updatedContacts = [...emergencyContacts, newContact];
      saveContacts(updatedContacts);
      setNewContact({ name: '', phone: '', relationship: '' });
      toast({
        title: "Contact Added",
        description: "Emergency contact has been saved successfully.",
      });
    }
  };

  const removeContact = (index: number) => {
    const updatedContacts = emergencyContacts.filter((_, i) => i !== index);
    saveContacts(updatedContacts);
    toast({
      title: "Contact Removed",
      description: "Emergency contact has been removed.",
    });
  };

  const getCurrentLocation = () => {
    setIsLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLocationLoading(false);
          toast({
            title: "Location Found",
            description: "Your current location has been detected.",
          });
        },
        (error) => {
          setIsLocationLoading(false);
          toast({
            title: "Location Error",
            description: "Unable to get your location. Please enable location services.",
            variant: "destructive",
          });
        }
      );
    } else {
      setIsLocationLoading(false);
      toast({
        title: "Not Supported",
        description: "Geolocation is not supported by this browser.",
        variant: "destructive",
      });
    }
  };

  const sendSOSAlert = () => {
    if (emergencyContacts.length === 0) {
      toast({
        title: "No Emergency Contacts",
        description: "Please add emergency contacts first.",
        variant: "destructive",
      });
      return;
    }

    const locationText = currentLocation 
      ? `https://maps.google.com/?q=${currentLocation.lat},${currentLocation.lng}`
      : 'Location not available';
    
    const message = `🚨 EMERGENCY SOS ALERT 🚨\nI need immediate help!\nLocation: ${locationText}\nSent from EmpowerHER Safety Hub`;
    
    // Open WhatsApp with emergency message
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "SOS Alert Sent",
      description: "Emergency message has been prepared for WhatsApp.",
    });
  };

  const callEmergency = (number: string) => {
    window.open(`tel:${number}`, '_self');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Safety Hub
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your personal safety command center. Quick access to emergency services, trusted contacts, and safety resources.
          </p>
        </div>

        {/* Emergency SOS Section */}
        <Card className="p-8 border-2 border-destructive/20 bg-gradient-to-r from-destructive/5 to-destructive/10">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              <h2 className="text-2xl font-bold text-destructive">Emergency SOS</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
              <Button 
                onClick={sendSOSAlert}
                className="h-16 text-lg font-bold bg-destructive hover:bg-destructive/90 animate-pulse"
                size="lg"
              >
                <AlertTriangle className="mr-2 h-6 w-6" />
                SEND SOS
              </Button>
              
              <Button 
                onClick={getCurrentLocation}
                disabled={isLocationLoading}
                variant="outline"
                className="h-16 text-lg border-destructive text-destructive hover:bg-destructive/10"
                size="lg"
              >
                <MapPin className="mr-2 h-6 w-6" />
                {isLocationLoading ? 'Getting Location...' : 'Get Location'}
              </Button>
            </div>
            
            {currentLocation && (
              <div className="p-4 bg-background/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Current Location: {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Quick Emergency Numbers */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            Emergency Helplines
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {emergencyNumbers.map((emergency) => (
              <Card key={emergency.number} className="p-4 hover:shadow-md transition-shadow">
                <div className="space-y-2">
                  <h4 className="font-semibold text-primary">{emergency.name}</h4>
                  <p className="text-sm text-muted-foreground">{emergency.description}</p>
                  <Button 
                    onClick={() => callEmergency(emergency.number)}
                    className="w-full" 
                    variant="outline"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Call {emergency.number}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Emergency Contacts Management */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Emergency Contacts
          </h3>
          
          {/* Add New Contact */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Contact name"
                value={newContact.name}
                onChange={(e) => setNewContact({...newContact, name: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="Phone number"
                value={newContact.phone}
                onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="relationship">Relationship</Label>
              <Input
                id="relationship"
                placeholder="Friend, Family, etc."
                value={newContact.relationship}
                onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addEmergencyContact} className="w-full">
                Add Contact
              </Button>
            </div>
          </div>

          {/* Contacts List */}
          {emergencyContacts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {emergencyContacts.map((contact, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{contact.name}</h4>
                      <p className="text-sm text-muted-foreground">{contact.phone}</p>
                      <p className="text-xs text-muted-foreground">{contact.relationship}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => callEmergency(contact.phone)}
                        size="sm" 
                        variant="outline"
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button 
                        onClick={() => removeContact(index)}
                        size="sm" 
                        variant="destructive"
                      >
                        ×
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No emergency contacts added yet. Add trusted contacts for quick access during emergencies.
            </p>
          )}
        </Card>

        {/* Safe Locations */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Nearby Safe Locations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safeLocations.map((location, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{location.name}</h4>
                    <div className="flex items-center gap-2">
                      {location.available247 && (
                        <Clock className="h-4 w-4 text-green-500" />
                      )}
                      <Heart className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{location.address}</p>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => callEmergency(location.phone)}
                      size="sm" 
                      variant="outline"
                    >
                      <Phone className="mr-1 h-3 w-3" />
                      Call
                    </Button>
                    <Button 
                      onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(location.address)}`, '_blank')}
                      size="sm" 
                      variant="outline"
                    >
                      <MapPin className="mr-1 h-3 w-3" />
                      Directions
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SafetyHub;
