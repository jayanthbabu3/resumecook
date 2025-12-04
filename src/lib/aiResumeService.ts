import type { ResumeData } from "@/types/resume";

interface UserProfile {
  fullName: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  professionalTitle?: string;
  bio?: string;
}

interface GenerateResumeRequest {
  userProfile: UserProfile;
  jobDescription?: string;
  profession?: string;
  templateId?: string;
}

interface GenerateResumeResponse {
  success: boolean;
  data?: ResumeData;
  tokensUsed?: number;
  error?: string;
  details?: string;
}

/**
 * Generate resume content using AI based on user profile and optional job description
 */
export async function generateResumeWithAI(
  request: GenerateResumeRequest
): Promise<ResumeData> {
  try {
    // Determine the API endpoint based on environment
    const isDev = import.meta.env.DEV;
    const apiUrl = isDev
      ? "http://localhost:8888/.netlify/functions/generate-resume"
      : "/.netlify/functions/generate-resume";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || errorData.details || `HTTP ${response.status}: ${response.statusText}`
      );
    }

    const result: GenerateResumeResponse = await response.json();

    if (!result.success || !result.data) {
      throw new Error(result.error || result.details || "Failed to generate resume");
    }

    return result.data;
  } catch (error) {
    console.error("AI Resume Generation Error:", error);
    
    if (error instanceof Error) {
      // Provide user-friendly error messages
      if (error.message.includes("OPENAI_API_KEY")) {
        throw new Error(
          "AI service is not configured. Please contact support or add your OpenAI API key."
        );
      }
      if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
        throw new Error(
          "Network error. Please check your internet connection and try again."
        );
      }
      throw error;
    }
    
    throw new Error("An unexpected error occurred while generating your resume");
  }
}

/**
 * Validate user profile has minimum required fields
 */
export function validateUserProfile(profile: Partial<UserProfile>): boolean {
  return !!(profile.fullName && profile.fullName.trim().length > 0);
}

/**
 * Create a user profile object from Firebase auth user
 */
export function createUserProfileFromAuth(user: {
  fullName: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  professionalTitle?: string;
  bio?: string;
}): UserProfile {
  return {
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    location: user.location,
    linkedinUrl: user.linkedinUrl,
    githubUrl: user.githubUrl,
    portfolioUrl: user.portfolioUrl,
    professionalTitle: user.professionalTitle,
    bio: user.bio,
  };
}
