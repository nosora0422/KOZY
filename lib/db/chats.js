// chats collection + chats/{chatId}/messages subcollection.
// Models the chat-request flow from data/mockChatData.js:
//   requestStatus: pending_sent | pending_received | accepted | declined
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

const COL = 'chats';

const chatRef = (chatId) => doc(db, COL, chatId);
const messagesRef = (chatId) => collection(db, COL, chatId, 'messages');

function mapSnap(snap) {
  return { id: snap.id, ...snap.data() };
}

// Deterministic chat id per (listing, requester) so duplicate requests collapse.
export function buildChatId(listingId, requesterId) {
  return `${listingId}_${requesterId}`;
}

export async function getChat(chatId) {
  const snap = await getDoc(chatRef(chatId));
  if (!snap.exists()) return null;
  return mapSnap(snap);
}

// All chats the user participates in, newest activity first.
export async function listChatsForUser(uid) {
  const q = query(
    collection(db, COL),
    where('participants', 'array-contains', uid),
    orderBy('lastMessageAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map(mapSnap);
}

export function subscribeToChats(uid, callback) {
  const q = query(
    collection(db, COL),
    where('participants', 'array-contains', uid),
    orderBy('lastMessageAt', 'desc')
  );
  return onSnapshot(q, (snap) => callback(snap.docs.map(mapSnap)));
}

// Requester starts a chat request against a listing owner.
export async function requestChat({ listingId, requesterId, ownerId, firstMessage }) {
  const chatId = buildChatId(listingId, requesterId);
  await setDoc(
    chatRef(chatId),
    {
      listingId,
      requesterId,
      ownerId,
      participants: [requesterId, ownerId],
      requestStatus: 'pending_sent',
      requestLabel: 'Request has been sent',
      canAccept: false,
      lastMessage: firstMessage ?? '',
      lastMessageAt: serverTimestamp(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  await addDoc(messagesRef(chatId), {
    type: 'system',
    text: 'Request has been sent',
    senderId: requesterId,
    createdAt: serverTimestamp(),
  });

  if (firstMessage) {
    await sendMessage(chatId, { senderId: requesterId, text: firstMessage, status: 'pending' });
  }
  return chatId;
}

export async function acceptChat(chatId) {
  await updateDoc(chatRef(chatId), {
    requestStatus: 'accepted',
    requestLabel: 'Your chat request has been accepted.',
    canAccept: false,
    updatedAt: serverTimestamp(),
  });
}

export async function declineChat(chatId) {
  await updateDoc(chatRef(chatId), {
    requestStatus: 'declined',
    canAccept: false,
    updatedAt: serverTimestamp(),
  });
}

// --- messages ---

export async function sendMessage(chatId, { senderId, text, type = 'text', status = 'sent' }) {
  const ref = await addDoc(messagesRef(chatId), {
    senderId,
    text,
    type,
    status,
    createdAt: serverTimestamp(),
  });
  await updateDoc(chatRef(chatId), {
    lastMessage: text,
    lastMessageAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export function subscribeToMessages(chatId, callback) {
  const q = query(messagesRef(chatId), orderBy('createdAt', 'asc'));
  return onSnapshot(q, (snap) => callback(snap.docs.map(mapSnap)));
}

export async function listMessages(chatId) {
  const q = query(messagesRef(chatId), orderBy('createdAt', 'asc'));
  const snap = await getDocs(q);
  return snap.docs.map(mapSnap);
}
