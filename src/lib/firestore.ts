import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  getDocs,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

export interface ResumeData {
  id?: string;
  userId: string;
  templateId: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedinUrl: string;
    githubUrl: string;
    portfolioUrl: string;
    professionalTitle: string;
    bio: string;
    profilePhoto: string;
  };
  experience: Array<{
    id: string;
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    gpa: string;
    description: string;
  }>;
  skills: Array<{
    id: string;
    name: string;
  }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    url: string;
    startDate: string;
    endDate: string;
    current: boolean;
  }>;
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
    url: string;
  }>;
  languages: Array<{
    id: string;
    name: string;
    proficiency: string;
  }>;
  createdAt?: Date;
  updatedAt?: Date;
}

export class FirestoreService {
  private static instance: FirestoreService;
  
  static getInstance(): FirestoreService {
    if (!FirestoreService.instance) {
      FirestoreService.instance = new FirestoreService();
    }
    return FirestoreService.instance;
  }

  // Save resume data
  async saveResume(userId: string, resumeData: Omit<ResumeData, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const resumeRef = doc(collection(db, 'resumes'));
      const resumeWithMeta = {
        ...resumeData,
        userId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      
      await setDoc(resumeRef, resumeWithMeta);
      return resumeRef.id;
    } catch (error) {
      console.error('Error saving resume:', error);
      throw error;
    }
  }

  // Update existing resume
  async updateResume(resumeId: string, resumeData: Partial<ResumeData>): Promise<void> {
    try {
      const resumeRef = doc(db, 'resumes', resumeId);
      await updateDoc(resumeRef, {
        ...resumeData,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating resume:', error);
      throw error;
    }
  }

  // Get resume by ID
  async getResume(resumeId: string): Promise<ResumeData | null> {
    try {
      const resumeRef = doc(db, 'resumes', resumeId);
      const resumeSnap = await getDoc(resumeRef);
      
      if (resumeSnap.exists()) {
        return { id: resumeSnap.id, ...resumeSnap.data() } as ResumeData;
      }
      return null;
    } catch (error) {
      console.error('Error getting resume:', error);
      throw error;
    }
  }

  // Get all resumes for a user
  async getUserResumes(userId: string): Promise<ResumeData[]> {
    try {
      const q = query(
        collection(db, 'resumes'),
        where('userId', '==', userId),
        orderBy('updatedAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ResumeData[];
    } catch (error) {
      console.error('Error getting user resumes:', error);
      throw error;
    }
  }

  // Delete resume
  async deleteResume(resumeId: string): Promise<void> {
    try {
      const resumeRef = doc(db, 'resumes', resumeId);
      await deleteDoc(resumeRef);
    } catch (error) {
      console.error('Error deleting resume:', error);
      throw error;
    }
  }

  // Save resume as template
  async saveAsTemplate(userId: string, templateData: Omit<ResumeData, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const templateRef = doc(collection(db, 'templates'));
      const templateWithMeta = {
        ...templateData,
        userId,
        isTemplate: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      
      await setDoc(templateRef, templateWithMeta);
      return templateRef.id;
    } catch (error) {
      console.error('Error saving template:', error);
      throw error;
    }
  }

  // Get user templates
  async getUserTemplates(userId: string): Promise<ResumeData[]> {
    try {
      const q = query(
        collection(db, 'templates'),
        where('userId', '==', userId),
        orderBy('updatedAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ResumeData[];
    } catch (error) {
      console.error('Error getting user templates:', error);
      throw error;
    }
  }
}

export const firestoreService = FirestoreService.getInstance();
