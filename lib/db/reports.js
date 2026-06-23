// reports collection — listing/user reports from the share/report actions.
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const COL = 'reports';

// targetType: 'listing' | 'user'
export async function createReport({ targetType, targetId, reporterId, reason }) {
  const ref = await addDoc(collection(db, COL), {
    targetType,
    targetId,
    reporterId,
    reason: reason ?? '',
    status: 'open',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}
