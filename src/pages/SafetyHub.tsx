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
      navigator.
