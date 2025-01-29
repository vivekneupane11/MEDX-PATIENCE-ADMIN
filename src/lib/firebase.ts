import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, AuthError } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { UserProfile } from '../types/user';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDXgTaw_N5i8TjMD2YcryYJxn8zqNyjG30",
  authDomain: "oxynect.firebaseapp.com",
  projectId: "oxynect",
  storageBucket: "oxynect.firebasestorage.app",
  messagingSenderId: "461184293536",
  appId: "1:461184293536:web:d187f464ba81e53edbc7c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Error messages mapping
const authErrorMessages: Record<string, string> = {
  'auth/email-already-in-use': 'Cette adresse email est déjà utilisée',
  'auth/invalid-email': 'Adresse email invalide',
  'auth/operation-not-allowed': 'Opération non autorisée',
  'auth/weak-password': 'Le mot de passe est trop faible'
};

// Auth functions
export const createUser = async (email: string, password: string, userData: Omit<UserProfile, 'id'>) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { uid } = userCredential.user;

    // Create user profile in Firestore
    await setDoc(doc(db, 'users', uid), {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return userCredential.user;
  } catch (error) {
    const authError = error as AuthError;
    const errorMessage = authErrorMessages[authError.code] || 'Une erreur est survenue lors de la création du compte';
    throw new Error(errorMessage);
  }
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as UserProfile;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

export default app;