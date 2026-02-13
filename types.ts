
// Fix: Import React to resolve 'React' namespace errors when using React.ReactNode.
import React from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
