import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc, updateDoc, increment, getDoc } from 'firebase/firestore';
import { YonoApp, CustomYonoLink } from './types';
import { INITIAL_APPS } from './data';

// Firebase Configuration from firebase-applet-config.json
const firebaseConfig = {
  projectId: "gen-lang-client-0289984081",
  appId: "1:1027556335831:web:1eeee3533f8433d098d092",
  apiKey: "AIzaSyCuaU8h6hA_YZ0SnnR9iYMWnYQd1mTuPGI",
  authDomain: "gen-lang-client-0289984081.firebaseapp.com",
  storageBucket: "gen-lang-client-0289984081.firebasestorage.app",
  messagingSenderId: "1027556335831"
};

const databaseId = "ai-studio-yonolinkrewards-0b6f1ef8-7c74-46ab-b377-ded0a669bb74";

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore with custom Database ID
export const db = getFirestore(app, databaseId);

// Collection References
const APPS_COLLECTION = 'apps';
const LINKS_COLLECTION = 'links';

/**
 * Fetch all YonoApps from Firestore.
 * If the collection is empty, seed it with INITIAL_APPS.
 */
export async function getAppsFromDb(): Promise<YonoApp[]> {
  try {
    const appsRef = collection(db, APPS_COLLECTION);
    const snapshot = await getDocs(appsRef);
    
    if (snapshot.empty) {
      console.log('No apps found in Firestore. Seeding database with initial apps...');
      // Seed database
      for (const app of INITIAL_APPS) {
        await setDoc(doc(db, APPS_COLLECTION, app.id), app);
      }
      return INITIAL_APPS;
    }
    
    const apps: YonoApp[] = [];
    snapshot.forEach((doc) => {
      apps.push(doc.data() as YonoApp);
    });
    return apps;
  } catch (error) {
    console.error('Error fetching apps from Firestore:', error);
    // Fallback to local storage or initial apps
    const local = localStorage.getItem('yono_custom_apps_db');
    if (local) {
      return JSON.parse(local);
    }
    return INITIAL_APPS;
  }
}

/**
 * Save or update a single YonoApp in Firestore.
 */
export async function saveAppToDb(app: YonoApp): Promise<void> {
  try {
    await setDoc(doc(db, APPS_COLLECTION, app.id), app);
  } catch (error) {
    console.error(`Error saving app ${app.id} to Firestore:`, error);
    throw error;
  }
}

/**
 * Delete a YonoApp from Firestore.
 */
export async function deleteAppFromDb(appId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, APPS_COLLECTION, appId));
  } catch (error) {
    console.error(`Error deleting app ${appId} from Firestore:`, error);
    throw error;
  }
}

/**
 * Fetch all CustomYonoLinks from Firestore, sorted by date/created.
 */
export async function getLinksFromDb(): Promise<CustomYonoLink[]> {
  try {
    const linksRef = collection(db, LINKS_COLLECTION);
    const snapshot = await getDocs(linksRef);
    
    const links: CustomYonoLink[] = [];
    snapshot.forEach((doc) => {
      links.push(doc.data() as CustomYonoLink);
    });
    
    // Sort links by index or timestamp since firestore query sorting is simpler locally
    // If you don't have indexes, sort locally by id or a parsed createdAt if possible, or just return them
    return links.sort((a, b) => b.id.localeCompare(a.id));
  } catch (error) {
    console.error('Error fetching links from Firestore:', error);
    const local = localStorage.getItem('yono_custom_links');
    if (local) {
      return JSON.parse(local);
    }
    return [];
  }
}

/**
 * Save a new CustomYonoLink to Firestore.
 */
export async function saveLinkToDb(link: CustomYonoLink): Promise<void> {
  try {
    await setDoc(doc(db, LINKS_COLLECTION, link.id), link);
  } catch (error) {
    console.error(`Error saving link ${link.id} to Firestore:`, error);
    throw error;
  }
}

/**
 * Increment click count for a specific link.
 */
export async function incrementClickInDb(linkId: string): Promise<void> {
  try {
    const linkRef = doc(db, LINKS_COLLECTION, linkId);
    await updateDoc(linkRef, {
      clicks: increment(1)
    });
  } catch (error) {
    console.error(`Error incrementing clicks for link ${linkId}:`, error);
  }
}

/**
 * Delete a CustomYonoLink from Firestore.
 */
export async function deleteLinkFromDb(linkId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, LINKS_COLLECTION, linkId));
  } catch (error) {
    console.error(`Error deleting link ${linkId} from Firestore:`, error);
  }
}

/**
 * Clear all custom links from Firestore (or just from local state).
 * To avoid deleting everything recursively if unauthorized, we can delete the ones passed in.
 */
export async function clearAllLinksInDb(links: CustomYonoLink[]): Promise<void> {
  try {
    for (const link of links) {
      await deleteDoc(doc(db, LINKS_COLLECTION, link.id));
    }
  } catch (error) {
    console.error('Error clearing links in Firestore:', error);
  }
}
