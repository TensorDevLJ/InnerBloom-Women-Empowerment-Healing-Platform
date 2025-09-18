import React, { createContext, useContext, useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const STORAGE_KEY = 'empowerher-auth';
const SECRET_KEY = 'empowerher-secret-key-2024';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedAuth = localStorage.getItem(STORAGE_KEY);
    if (storedAuth) {
      try {
        const decrypted = CryptoJS.AES.decrypt(storedAuth, SECRET_KEY).toString(CryptoJS.enc.Utf8);
        const userData = JSON.parse(decrypted);
        setUser(userData);
      } catch (error) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const hashPassword = (password: string): string => {
    return CryptoJS.SHA256(password + SECRET_KEY).toString();
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('empowerher-users') || '[]');
      if (existingUsers.find((u: any) => u.email === email)) {
        throw new Error('User already exists');
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        createdAt: new Date().toISOString(),
      };

      // Store user credentials securely
      const hashedPassword = hashPassword(password);
      const userWithPassword = { ...newUser, password: hashedPassword };
      
      existingUsers.push(userWithPassword);
      localStorage.setItem('empowerher-users', JSON.stringify(existingUsers));

      // Set current user session
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(newUser), SECRET_KEY).toString();
      localStorage.setItem(STORAGE_KEY, encrypted);
      
      setUser(newUser);
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const existingUsers = JSON.parse(localStorage.getItem('empowerher-users') || '[]');
      const hashedPassword = hashPassword(password);
      
      const user = existingUsers.find((u: any) => 
        u.email === email && u.password === hashedPassword
      );

      if (!user) {
        throw new Error('Invalid credentials');
      }

      // Remove password from user object for session
      const { password: _, ...userWithoutPassword } = user;
      
      // Set current user session
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(userWithoutPassword), SECRET_KEY).toString();
      localStorage.setItem(STORAGE_KEY, encrypted);
      
      setUser(userWithoutPassword);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};