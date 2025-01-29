import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  where,
  orderBy,
  Timestamp,
  DocumentData
} from 'firebase/firestore';
import { db } from './firebase';

// Types
export interface Patient {
  id?: string;
  name: string;
  age: number;
  equipment: string;
  lastVisit: string;
  status: string;
  nextVisit: string;
  address: string;
  phone: string;
  email: string;
  socialSecurity: string;
  doctor: string;
  createdAt: Timestamp;
}

export interface Prescription {
  id?: string;
  patientId: string;
  type: string;
  doctor: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'validated' | 'rejected';
  details: string;
  stockStatus: 'available' | 'low' | 'critical';
  createdAt: Timestamp;
}

export interface Equipment {
  id?: string;
  name: string;
  type: string;
  serialNumber: string;
  status: string;
  patient: string;
  lastMaintenance: string;
  nextMaintenance: string;
  location: string;
  createdAt: Timestamp;
}

// Patients
export const addPatient = async (patientData: Omit<Patient, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'patients'), {
      ...patientData,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding patient:', error);
    throw error;
  }
};

export const getPatients = async () => {
  try {
    const q = query(collection(db, 'patients'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Patient[];
  } catch (error) {
    console.error('Error getting patients:', error);
    throw error;
  }
};

// Prescriptions
export const addPrescription = async (prescriptionData: Omit<Prescription, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'prescriptions'), {
      ...prescriptionData,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding prescription:', error);
    throw error;
  }
};

export const getPrescriptions = async () => {
  try {
    const q = query(collection(db, 'prescriptions'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Prescription[];
  } catch (error) {
    console.error('Error getting prescriptions:', error);
    throw error;
  }
};

// Equipment
export const addEquipment = async (equipmentData: Omit<Equipment, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'equipment'), {
      ...equipmentData,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding equipment:', error);
    throw error;
  }
};

export const getEquipment = async () => {
  try {
    const q = query(collection(db, 'equipment'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Equipment[];
  } catch (error) {
    console.error('Error getting equipment:', error);
    throw error;
  }
};

// Generic update and delete functions
export const updateDocument = async (collectionName: string, id: string, data: Partial<DocumentData>) => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error(`Error updating ${collectionName}:`, error);
    throw error;
  }
};

export const deleteDocument = async (collectionName: string, id: string) => {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting ${collectionName}:`, error);
    throw error;
  }
};