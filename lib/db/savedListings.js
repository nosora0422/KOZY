// users/{uid}/savedListings/{listingId} — optional Firestore sync of saved listings.
// The app currently persists saves in AsyncStorage('savedListings'); use these to sync
// across devices once auth is wired. doc id == listingId so saves are idempotent.
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

const sub = (uid) => collection(db, 'users', uid, 'savedListings');

export async function saveListing(uid, listingId) {
  await setDoc(doc(db, 'users', uid, 'savedListings', listingId), {
    listingId,
    savedAt: serverTimestamp(),
  });
}

export async function unsaveListing(uid, listingId) {
  await deleteDoc(doc(db, 'users', uid, 'savedListings', listingId));
}

export async function listSavedListingIds(uid) {
  const snap = await getDocs(sub(uid));
  return snap.docs.map((d) => d.id);
}
