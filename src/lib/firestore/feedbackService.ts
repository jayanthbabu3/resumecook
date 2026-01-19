import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  serverTimestamp,
  onSnapshot,
  increment,
} from 'firebase/firestore';
import { db } from '../firebase';
import type {
  Feedback,
  FeedbackReply,
  CreateFeedbackInput,
  CreateReplyInput,
  FeedbackFilters,
  FeedbackStats,
  FeedbackStatus,
  FeedbackPriority,
  UserRole,
} from '@/types/feedback';

const FEEDBACK_COLLECTION = 'feedback';
const REPLIES_SUBCOLLECTION = 'replies';

/**
 * Generate a unique ID
 */
const generateId = (): string => {
  return doc(collection(db, 'temp')).id;
};

/**
 * Convert Firestore timestamp to Date
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
 * Convert Firestore document to Feedback object
 */
const docToFeedback = (docSnapshot: any): Feedback => {
  const data = docSnapshot.data();
  return {
    id: docSnapshot.id,
    userId: data.userId,
    userEmail: data.userEmail,
    userName: data.userName,
    type: data.type,
    subject: data.subject,
    description: data.description,
    status: data.status,
    priority: data.priority,
    createdAt: timestampToDate(data.createdAt),
    updatedAt: timestampToDate(data.updatedAt),
    resolvedAt: data.resolvedAt ? timestampToDate(data.resolvedAt) : undefined,
    adminNotes: data.adminNotes,
    replyCount: data.replyCount || 0,
    hasUnreadAdminReply: data.hasUnreadAdminReply || false,
    hasUnreadUserReply: data.hasUnreadUserReply || false,
  };
};

/**
 * Convert Firestore document to FeedbackReply object
 */
const docToReply = (docSnapshot: any): FeedbackReply => {
  const data = docSnapshot.data();
  return {
    id: docSnapshot.id,
    feedbackId: data.feedbackId,
    authorId: data.authorId,
    authorName: data.authorName,
    authorRole: data.authorRole,
    authorPhoto: data.authorPhoto,
    message: data.message,
    createdAt: timestampToDate(data.createdAt),
    updatedAt: data.updatedAt ? timestampToDate(data.updatedAt) : undefined,
  };
};

// ==================== USER METHODS ====================

/**
 * Create a new feedback submission
 */
export const createFeedback = async (
  userId: string,
  userEmail: string,
  userName: string,
  input: CreateFeedbackInput
): Promise<string> => {
  try {
    const feedbackId = generateId();
    const feedbackRef = doc(db, FEEDBACK_COLLECTION, feedbackId);

    const feedbackData: Omit<Feedback, 'id'> = {
      userId,
      userEmail,
      userName,
      type: input.type,
      subject: input.subject,
      description: input.description,
      status: 'open',
      priority: 'medium',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      replyCount: 0,
      hasUnreadAdminReply: false,
      hasUnreadUserReply: true, // New feedback is unread for admin
    };

    await setDoc(feedbackRef, feedbackData);
    return feedbackId;
  } catch (error) {
    console.error('Error creating feedback:', error);
    throw error;
  }
};

/**
 * Get feedback by ID
 */
export const getFeedbackById = async (feedbackId: string): Promise<Feedback | null> => {
  try {
    const feedbackRef = doc(db, FEEDBACK_COLLECTION, feedbackId);
    const feedbackDoc = await getDoc(feedbackRef);

    if (!feedbackDoc.exists()) {
      return null;
    }

    return docToFeedback(feedbackDoc);
  } catch (error) {
    console.error('Error getting feedback:', error);
    throw error;
  }
};

/**
 * Get all feedback for a specific user
 */
export const getUserFeedback = async (userId: string): Promise<Feedback[]> => {
  try {
    const feedbackRef = collection(db, FEEDBACK_COLLECTION);
    const q = query(
      feedbackRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docToFeedback);
  } catch (error) {
    console.error('Error getting user feedback:', error);
    throw error;
  }
};

/**
 * Subscribe to user's feedback (real-time updates)
 */
export const subscribeToUserFeedback = (
  userId: string,
  callback: (feedbackList: Feedback[]) => void
): (() => void) => {
  const feedbackRef = collection(db, FEEDBACK_COLLECTION);
  const q = query(
    feedbackRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(q, (querySnapshot) => {
    const feedbackList = querySnapshot.docs.map(docToFeedback);
    callback(feedbackList);
  });
};

/**
 * Get count of unread feedback for user (has admin replies they haven't seen)
 */
export const getUserUnreadCount = async (userId: string): Promise<number> => {
  try {
    const feedbackRef = collection(db, FEEDBACK_COLLECTION);
    const q = query(
      feedbackRef,
      where('userId', '==', userId),
      where('hasUnreadAdminReply', '==', true)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error('Error getting unread count:', error);
    return 0;
  }
};

/**
 * Mark feedback as read by user
 */
export const markFeedbackAsReadByUser = async (feedbackId: string): Promise<void> => {
  try {
    const feedbackRef = doc(db, FEEDBACK_COLLECTION, feedbackId);
    await updateDoc(feedbackRef, {
      hasUnreadAdminReply: false,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error marking feedback as read:', error);
    throw error;
  }
};

// ==================== REPLY METHODS ====================

/**
 * Add a reply to feedback
 */
export const addReply = async (
  feedbackId: string,
  authorId: string,
  authorName: string,
  authorRole: UserRole,
  input: CreateReplyInput,
  authorPhoto?: string
): Promise<string> => {
  try {
    const replyId = generateId();
    const replyRef = doc(db, FEEDBACK_COLLECTION, feedbackId, REPLIES_SUBCOLLECTION, replyId);

    const replyData: Omit<FeedbackReply, 'id'> = {
      feedbackId,
      authorId,
      authorName,
      authorRole,
      authorPhoto,
      message: input.message,
      createdAt: Timestamp.now(),
    };

    await setDoc(replyRef, replyData);

    // Update feedback document
    const feedbackRef = doc(db, FEEDBACK_COLLECTION, feedbackId);
    const updateData: any = {
      replyCount: increment(1),
      updatedAt: Timestamp.now(),
    };

    // Set unread flags based on who replied
    if (authorRole === 'admin') {
      updateData.hasUnreadAdminReply = true;
      updateData.hasUnreadUserReply = false;
    } else {
      updateData.hasUnreadUserReply = true;
      updateData.hasUnreadAdminReply = false;
    }

    await updateDoc(feedbackRef, updateData);

    return replyId;
  } catch (error) {
    console.error('Error adding reply:', error);
    throw error;
  }
};

/**
 * Get all replies for a feedback
 */
export const getFeedbackReplies = async (feedbackId: string): Promise<FeedbackReply[]> => {
  try {
    const repliesRef = collection(db, FEEDBACK_COLLECTION, feedbackId, REPLIES_SUBCOLLECTION);
    const q = query(repliesRef, orderBy('createdAt', 'asc'));

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docToReply);
  } catch (error) {
    console.error('Error getting feedback replies:', error);
    throw error;
  }
};

/**
 * Subscribe to feedback replies (real-time updates)
 */
export const subscribeToFeedbackReplies = (
  feedbackId: string,
  callback: (replies: FeedbackReply[]) => void
): (() => void) => {
  const repliesRef = collection(db, FEEDBACK_COLLECTION, feedbackId, REPLIES_SUBCOLLECTION);
  const q = query(repliesRef, orderBy('createdAt', 'asc'));

  return onSnapshot(q, (querySnapshot) => {
    const replies = querySnapshot.docs.map(docToReply);
    callback(replies);
  });
};

// ==================== ADMIN METHODS ====================

/**
 * Get all feedback (admin only)
 */
export const getAllFeedback = async (filters?: FeedbackFilters): Promise<Feedback[]> => {
  try {
    const feedbackRef = collection(db, FEEDBACK_COLLECTION);
    let q = query(feedbackRef, orderBy('createdAt', 'desc'));

    // Note: Firestore doesn't support multiple inequality filters
    // So we filter in memory for complex queries

    const querySnapshot = await getDocs(q);
    let feedbackList = querySnapshot.docs.map(docToFeedback);

    // Apply filters in memory
    if (filters) {
      if (filters.status) {
        feedbackList = feedbackList.filter((f) => f.status === filters.status);
      }
      if (filters.type) {
        feedbackList = feedbackList.filter((f) => f.type === filters.type);
      }
      if (filters.priority) {
        feedbackList = feedbackList.filter((f) => f.priority === filters.priority);
      }
      if (filters.userId) {
        feedbackList = feedbackList.filter((f) => f.userId === filters.userId);
      }
    }

    return feedbackList;
  } catch (error) {
    console.error('Error getting all feedback:', error);
    throw error;
  }
};

/**
 * Subscribe to all feedback (admin only, real-time updates)
 */
export const subscribeToAllFeedback = (
  callback: (feedbackList: Feedback[]) => void
): (() => void) => {
  const feedbackRef = collection(db, FEEDBACK_COLLECTION);
  const q = query(feedbackRef, orderBy('createdAt', 'desc'));

  return onSnapshot(q, (querySnapshot) => {
    const feedbackList = querySnapshot.docs.map(docToFeedback);
    callback(feedbackList);
  });
};

/**
 * Update feedback status (admin only)
 */
export const updateFeedbackStatus = async (
  feedbackId: string,
  status: FeedbackStatus
): Promise<void> => {
  try {
    const feedbackRef = doc(db, FEEDBACK_COLLECTION, feedbackId);
    const updateData: any = {
      status,
      updatedAt: Timestamp.now(),
    };

    if (status === 'resolved') {
      updateData.resolvedAt = Timestamp.now();
    }

    await updateDoc(feedbackRef, updateData);
  } catch (error) {
    console.error('Error updating feedback status:', error);
    throw error;
  }
};

/**
 * Update feedback priority (admin only)
 */
export const updateFeedbackPriority = async (
  feedbackId: string,
  priority: FeedbackPriority
): Promise<void> => {
  try {
    const feedbackRef = doc(db, FEEDBACK_COLLECTION, feedbackId);
    await updateDoc(feedbackRef, {
      priority,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating feedback priority:', error);
    throw error;
  }
};

/**
 * Update admin notes (admin only)
 */
export const updateAdminNotes = async (
  feedbackId: string,
  adminNotes: string
): Promise<void> => {
  try {
    const feedbackRef = doc(db, FEEDBACK_COLLECTION, feedbackId);
    await updateDoc(feedbackRef, {
      adminNotes,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating admin notes:', error);
    throw error;
  }
};

/**
 * Mark feedback as read by admin
 */
export const markFeedbackAsReadByAdmin = async (feedbackId: string): Promise<void> => {
  try {
    const feedbackRef = doc(db, FEEDBACK_COLLECTION, feedbackId);
    await updateDoc(feedbackRef, {
      hasUnreadUserReply: false,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error marking feedback as read:', error);
    throw error;
  }
};

/**
 * Delete feedback (admin only)
 */
export const deleteFeedback = async (feedbackId: string): Promise<void> => {
  try {
    // Delete all replies first
    const repliesRef = collection(db, FEEDBACK_COLLECTION, feedbackId, REPLIES_SUBCOLLECTION);
    const repliesSnapshot = await getDocs(repliesRef);

    for (const replyDoc of repliesSnapshot.docs) {
      await deleteDoc(replyDoc.ref);
    }

    // Delete the feedback document
    const feedbackRef = doc(db, FEEDBACK_COLLECTION, feedbackId);
    await deleteDoc(feedbackRef);
  } catch (error) {
    console.error('Error deleting feedback:', error);
    throw error;
  }
};

/**
 * Get feedback statistics (admin only)
 */
export const getFeedbackStats = async (): Promise<FeedbackStats> => {
  try {
    const feedbackRef = collection(db, FEEDBACK_COLLECTION);
    const querySnapshot = await getDocs(feedbackRef);

    const stats: FeedbackStats = {
      total: 0,
      open: 0,
      inProgress: 0,
      resolved: 0,
      closed: 0,
      byType: {
        bug: 0,
        payment: 0,
        feature: 0,
        general: 0,
      },
    };

    querySnapshot.docs.forEach((doc) => {
      const data = doc.data();
      stats.total++;

      // Count by status
      switch (data.status) {
        case 'open':
          stats.open++;
          break;
        case 'in_progress':
          stats.inProgress++;
          break;
        case 'resolved':
          stats.resolved++;
          break;
        case 'closed':
          stats.closed++;
          break;
      }

      // Count by type
      if (data.type in stats.byType) {
        stats.byType[data.type as keyof typeof stats.byType]++;
      }
    });

    return stats;
  } catch (error) {
    console.error('Error getting feedback stats:', error);
    throw error;
  }
};

/**
 * Get count of unread feedback for admin (has user replies they haven't seen)
 */
export const getAdminUnreadCount = async (): Promise<number> => {
  try {
    const feedbackRef = collection(db, FEEDBACK_COLLECTION);
    const q = query(feedbackRef, where('hasUnreadUserReply', '==', true));

    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error('Error getting admin unread count:', error);
    return 0;
  }
};
