/**
 * Feedback Types and Interfaces
 * For the user feedback/support system
 */

// Feedback type categories
export type FeedbackType = 'bug' | 'payment' | 'feature' | 'general';

// Feedback status
export type FeedbackStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

// Feedback priority
export type FeedbackPriority = 'low' | 'medium' | 'high';

// User role
export type UserRole = 'user' | 'admin';

/**
 * Main Feedback document structure
 */
export interface Feedback {
  id: string;

  // User info
  userId: string;
  userEmail: string;
  userName: string;

  // Feedback content
  type: FeedbackType;
  subject: string;
  description: string;

  // Status management
  status: FeedbackStatus;
  priority: FeedbackPriority;

  // Timestamps
  createdAt: Date | string;
  updatedAt: Date | string;
  resolvedAt?: Date | string;

  // Admin notes (internal, not visible to user)
  adminNotes?: string;

  // Admin reply
  adminReply?: string;
  repliedAt?: Date | string;

  // Count of replies (for quick display)
  replyCount?: number;

  // Has unread reply from admin (for user notification)
  hasUnreadAdminReply?: boolean;

  // Has unread reply from user (for admin notification)
  hasUnreadUserReply?: boolean;
}

/**
 * Feedback Reply structure
 */
export interface FeedbackReply {
  id: string;
  feedbackId: string;

  // Author info
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  authorPhoto?: string;

  // Content
  message: string;

  // Timestamps
  createdAt: Date | string;
  updatedAt?: Date | string;
}

/**
 * Input for creating feedback
 */
export interface CreateFeedbackInput {
  type: FeedbackType;
  subject: string;
  description: string;
}

/**
 * Input for creating a reply
 */
export interface CreateReplyInput {
  message: string;
}

/**
 * Feedback with replies (for detail view)
 */
export interface FeedbackWithReplies extends Feedback {
  replies: FeedbackReply[];
}

/**
 * Feedback filters for queries
 */
export interface FeedbackFilters {
  status?: FeedbackStatus;
  type?: FeedbackType;
  priority?: FeedbackPriority;
  userId?: string;
}

/**
 * Feedback statistics
 */
export interface FeedbackStats {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
  closed: number;
  byType: {
    bug: number;
    payment: number;
    feature: number;
    general: number;
  };
}

/**
 * Dashboard statistics for admin
 */
export interface AdminDashboardStats {
  totalUsers: number;
  proUsers: number;
  trialUsers: number;
  freeUsers: number;
  totalDownloads: number;
  totalResumes: number;
  feedbackStats: FeedbackStats;
  recentSignups: number; // Last 7 days
}

/**
 * Feedback type display info
 */
export const FEEDBACK_TYPE_INFO: Record<FeedbackType, {
  label: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
}> = {
  bug: {
    label: 'Bug Report',
    description: 'Something is not working correctly',
    color: 'text-red-700',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
  },
  payment: {
    label: 'Payment Issue',
    description: 'Problems with subscription or billing',
    color: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
  },
  feature: {
    label: 'Feature Request',
    description: 'Suggest a new feature or improvement',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  general: {
    label: 'General Feedback',
    description: 'Other questions or comments',
    color: 'text-gray-700',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
  },
};

/**
 * Status display info
 */
export const FEEDBACK_STATUS_INFO: Record<FeedbackStatus, {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
}> = {
  open: {
    label: 'Open',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  in_progress: {
    label: 'In Progress',
    color: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
  },
  resolved: {
    label: 'Resolved',
    color: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  closed: {
    label: 'Closed',
    color: 'text-gray-700',
    bgColor: 'bg-gray-100',
    borderColor: 'border-gray-300',
  },
};

/**
 * Priority display info
 */
export const FEEDBACK_PRIORITY_INFO: Record<FeedbackPriority, {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
}> = {
  low: {
    label: 'Low',
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
  },
  medium: {
    label: 'Medium',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
  },
  high: {
    label: 'High',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
  },
};
