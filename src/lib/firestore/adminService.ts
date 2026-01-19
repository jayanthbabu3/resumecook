import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import { getStats } from './statsService';
import { getFeedbackStats } from './feedbackService';
import type { AdminDashboardStats } from '@/types/feedback';

const USERS_COLLECTION = 'users';

/**
 * User profile with subscription info (for admin view)
 */
export interface UserWithSubscription {
  id: string;
  fullName: string;
  email: string;
  profilePhoto?: string;
  provider?: string;
  role?: 'user' | 'admin';
  createdAt: Date;
  lastSignIn?: Date;

  // Subscription info (from nested subscription object in Firestore)
  subscriptionStatus?: string;
  subscriptionPlan?: string;
  isTrial?: boolean;
  trialEndDate?: Date;
  currentPeriodEnd?: Date;
  razorpaySubscriptionId?: string;
}

/**
 * Convert timestamp to Date
 */
const timestampToDate = (timestamp: any): Date => {
  if (timestamp?.toDate) {
    return timestamp.toDate();
  }
  if (timestamp instanceof Date) {
    return timestamp;
  }
  return new Date();
};

/**
 * Convert user document to UserWithSubscription
 * Note: Razorpay stores subscription data in a nested 'subscription' object
 */
const docToUser = (docSnapshot: any): UserWithSubscription => {
  const data = docSnapshot.data();
  // Get subscription data from nested object (how Razorpay stores it)
  const subscription = data.subscription || {};

  return {
    id: docSnapshot.id,
    fullName: data.fullName || 'Unknown',
    email: data.email || '',
    profilePhoto: data.profilePhoto,
    provider: data.provider,
    role: data.role || 'user',
    createdAt: timestampToDate(data.createdAt),
    lastSignIn: data.lastSignIn ? timestampToDate(data.lastSignIn) : undefined,
    // Read from nested subscription object
    subscriptionStatus: subscription.status,
    subscriptionPlan: subscription.plan,
    isTrial: subscription.isTrial || false,
    trialEndDate: subscription.trialEndDate ? timestampToDate(subscription.trialEndDate) : undefined,
    currentPeriodEnd: subscription.currentPeriodEnd ? timestampToDate(subscription.currentPeriodEnd) : undefined,
    razorpaySubscriptionId: subscription.razorpaySubscriptionId,
  };
};

// ==================== USER MANAGEMENT ====================

/**
 * Check if a user is an admin
 */
export const isUserAdmin = async (userId: string): Promise<boolean> => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return false;
    }

    const data = userDoc.data();
    return data.role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

/**
 * Get user role
 */
export const getUserRole = async (userId: string): Promise<'user' | 'admin'> => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return 'user';
    }

    const data = userDoc.data();
    return data.role === 'admin' ? 'admin' : 'user';
  } catch (error) {
    console.error('Error getting user role:', error);
    return 'user';
  }
};

/**
 * Get all users (admin only)
 */
export const getAllUsers = async (limitCount?: number): Promise<UserWithSubscription[]> => {
  try {
    const usersRef = collection(db, USERS_COLLECTION);
    let q = query(usersRef, orderBy('createdAt', 'desc'));

    if (limitCount) {
      q = query(q, limit(limitCount));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docToUser);
  } catch (error) {
    console.error('Error getting all users:', error);
    throw error;
  }
};

/**
 * Get user by ID
 */
export const getUserById = async (userId: string): Promise<UserWithSubscription | null> => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return null;
    }

    return docToUser(userDoc);
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
};

/**
 * Search users by email or name
 */
export const searchUsers = async (searchTerm: string): Promise<UserWithSubscription[]> => {
  try {
    // Firestore doesn't support full-text search
    // So we get all users and filter in memory
    // For production, consider using Algolia or similar
    const allUsers = await getAllUsers();

    const lowerSearch = searchTerm.toLowerCase();
    return allUsers.filter(
      (user) =>
        user.email.toLowerCase().includes(lowerSearch) ||
        user.fullName.toLowerCase().includes(lowerSearch)
    );
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};

/**
 * Get total user count
 */
export const getTotalUserCount = async (): Promise<number> => {
  try {
    const usersRef = collection(db, USERS_COLLECTION);
    const querySnapshot = await getDocs(usersRef);
    return querySnapshot.size;
  } catch (error) {
    console.error('Error getting user count:', error);
    return 0;
  }
};

/**
 * Get pro users count (active paid subscription, NOT trial)
 * Note: Queries nested subscription.status and subscription.isTrial fields
 */
export const getProUserCount = async (): Promise<number> => {
  try {
    const usersRef = collection(db, USERS_COLLECTION);
    // Query for active subscriptions that are NOT trials
    const q = query(
      usersRef,
      where('subscription.status', '==', 'active'),
      where('subscription.isTrial', '==', false)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error('Error getting pro user count:', error);
    return 0;
  }
};

/**
 * Get trial users count (active trial subscriptions)
 * Note: Queries nested subscription.isTrial field
 */
export const getTrialUserCount = async (): Promise<number> => {
  try {
    const usersRef = collection(db, USERS_COLLECTION);
    // Query for active subscriptions that ARE trials
    const q = query(
      usersRef,
      where('subscription.status', '==', 'active'),
      where('subscription.isTrial', '==', true)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error('Error getting trial user count:', error);
    return 0;
  }
};

/**
 * Get users by subscription status
 * Note: Queries nested subscription.status field
 */
export const getUsersBySubscriptionStatus = async (
  status: string
): Promise<UserWithSubscription[]> => {
  try {
    const usersRef = collection(db, USERS_COLLECTION);
    const q = query(
      usersRef,
      where('subscription.status', '==', status),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docToUser);
  } catch (error) {
    console.error('Error getting users by subscription status:', error);
    throw error;
  }
};

/**
 * Get recent signups (last N days)
 */
export const getRecentSignups = async (days: number = 7): Promise<UserWithSubscription[]> => {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const usersRef = collection(db, USERS_COLLECTION);
    const q = query(
      usersRef,
      where('createdAt', '>=', Timestamp.fromDate(cutoffDate)),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docToUser);
  } catch (error) {
    console.error('Error getting recent signups:', error);
    throw error;
  }
};

/**
 * Get recent signup count (last N days)
 */
export const getRecentSignupCount = async (days: number = 7): Promise<number> => {
  try {
    const recentUsers = await getRecentSignups(days);
    return recentUsers.length;
  } catch (error) {
    console.error('Error getting recent signup count:', error);
    return 0;
  }
};

// ==================== DASHBOARD STATS ====================

/**
 * Get admin dashboard statistics
 */
export const getAdminDashboardStats = async (): Promise<AdminDashboardStats> => {
  try {
    // Fetch all data in parallel
    const [
      appStats,
      feedbackStats,
      totalUsers,
      proUsers,
      trialUsers,
      recentSignups,
    ] = await Promise.all([
      getStats(),
      getFeedbackStats(),
      getTotalUserCount(),
      getProUserCount(),
      getTrialUserCount(),
      getRecentSignupCount(7),
    ]);

    return {
      totalUsers,
      proUsers,
      trialUsers,
      freeUsers: totalUsers - proUsers - trialUsers,
      totalDownloads: appStats?.downloadsCount || 0,
      totalResumes: 0, // Would need to query all user resumes - expensive
      feedbackStats,
      recentSignups,
    };
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    throw error;
  }
};

// ==================== RESUME STATS ====================

/**
 * Get total resume count across all users
 * Note: This is expensive - use sparingly
 */
export const getTotalResumeCount = async (): Promise<number> => {
  try {
    // This would require querying all user subcollections
    // For now, return 0 or implement with a counter document
    // Consider maintaining a counter in app_stats
    return 0;
  } catch (error) {
    console.error('Error getting total resume count:', error);
    return 0;
  }
};
