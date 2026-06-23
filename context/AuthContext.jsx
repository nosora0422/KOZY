// Global auth state for KOZY. Wraps Firebase Auth + the users/{uid} profile doc.
// Replaces the hardcoded isLoggedIn / isLogedIn booleans across screens.
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { subscribeToAuth } from '@/lib/auth';
import { getUserDoc } from '@/lib/db/users';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Firebase Auth user (or null)
  const [profile, setProfile] = useState(null); // users/{uid} doc (or null)
  const [initializing, setInitializing] = useState(true); // true until first auth callback

  useEffect(() => {
    const unsubscribe = subscribeToAuth(({ user: nextUser, profile: nextProfile }) => {
      setUser(nextUser);
      setProfile(nextProfile);
      setInitializing(false);
    });
    return unsubscribe;
  }, []);

  // Re-fetch the profile doc (e.g. after editProfile saves).
  const refreshProfile = async () => {
    if (!user) return null;
    const fresh = await getUserDoc(user.uid);
    setProfile(fresh);
    return fresh;
  };

  const value = useMemo(
    () => ({
      user,
      profile,
      initializing,
      isLoggedIn: !!user,
      uid: user?.uid ?? null,
      refreshProfile,
    }),
    [user, profile, initializing]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
