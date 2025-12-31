import type { Handler, HandlerEvent } from "@netlify/functions";

/**
 * LinkedIn Profile Import - Netlify Serverless Function
 *
 * This function acts as a secure proxy to Bright Data's LinkedIn Scraper API.
 * It keeps the API key server-side and validates requests before forwarding.
 */

interface LinkedInImportRequest {
  linkedinUrl: string;
}

interface BrightDataExperience {
  company?: string;
  company_name?: string;
  title?: string;
  position?: string;
  description?: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  starts_at?: { month?: number; year?: number };
  ends_at?: { month?: number; year?: number } | null;
  is_current?: boolean;
}

interface BrightDataEducation {
  school?: string;
  school_name?: string;
  degree?: string;
  degree_name?: string;
  field?: string;
  field_of_study?: string;
  start_date?: string;
  end_date?: string;
  starts_at?: { month?: number; year?: number };
  ends_at?: { month?: number; year?: number } | null;
  description?: string;
  grade?: string;
  activities?: string;
}

interface BrightDataCertification {
  name?: string;
  authority?: string;
  issuing_organization?: string;
  license_number?: string;
  start_date?: string;
  end_date?: string;
  url?: string;
}

interface BrightDataLanguage {
  name?: string;
  proficiency?: string;
}

interface BrightDataProfile {
  // Basic info
  full_name?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  headline?: string;
  title?: string;
  location?: string;
  city?: string;
  country?: string;
  summary?: string;
  about?: string;
  profile_picture?: string;
  profile_pic_url?: string;

  // Contact (usually limited)
  email?: string;
  phone?: string;

  // Social links
  linkedin_url?: string;
  public_identifier?: string;

  // Experience
  experience?: BrightDataExperience[];
  experiences?: BrightDataExperience[];

  // Education
  education?: BrightDataEducation[];

  // Skills
  skills?: string[] | { name: string }[];

  // Certifications
  certifications?: BrightDataCertification[];

  // Languages
  languages?: string[] | BrightDataLanguage[];
}

// CORS headers for all responses
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// LinkedIn URL validation patterns
const LINKEDIN_URL_PATTERNS = [
  /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?(\?.*)?$/i,
  /^linkedin\.com\/in\/[\w-]+\/?$/i,
  /^\/in\/[\w-]+\/?$/i,
  /^[\w-]{3,100}$/i, // Just username (3-100 chars)
];

function isValidLinkedInUrl(input: string): boolean {
  return LINKEDIN_URL_PATTERNS.some(pattern => pattern.test(input.trim()));
}

function normalizeLinkedInUrl(input: string): string {
  const trimmed = input.trim();

  // If already a full URL
  if (trimmed.startsWith('http')) {
    return trimmed.split('?')[0]; // Remove query params
  }

  // If starts with linkedin.com
  if (trimmed.toLowerCase().startsWith('linkedin.com')) {
    return `https://${trimmed.split('?')[0]}`;
  }

  // If starts with /in/
  if (trimmed.startsWith('/in/')) {
    return `https://www.linkedin.com${trimmed.split('?')[0]}`;
  }

  // Assume it's just the username
  return `https://www.linkedin.com/in/${trimmed}`;
}

const handler: Handler = async (event: HandlerEvent) => {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "text/plain",
      },
      body: "",
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  // Check for API key
  const apiKey = process.env.BRIGHT_DATA_API_KEY;
  if (!apiKey) {
    console.error("BRIGHT_DATA_API_KEY environment variable not set");
    return {
      statusCode: 500,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error: "Server configuration error",
        details: "LinkedIn import is not configured. Please contact support."
      }),
    };
  }

  // Parse request body
  let requestData: LinkedInImportRequest;
  try {
    requestData = JSON.parse(event.body || "{}");
  } catch (error) {
    return {
      statusCode: 400,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: "Invalid JSON body" }),
    };
  }

  const { linkedinUrl } = requestData;

  // Validate LinkedIn URL
  if (!linkedinUrl || !isValidLinkedInUrl(linkedinUrl)) {
    return {
      statusCode: 400,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error: "Invalid LinkedIn URL",
        details: "Please provide a valid LinkedIn profile URL (e.g., https://linkedin.com/in/username)"
      }),
    };
  }

  const normalizedUrl = normalizeLinkedInUrl(linkedinUrl);
  console.log(`Processing LinkedIn import for: ${normalizedUrl}`);

  try {
    // Call Bright Data LinkedIn Profile API
    // Using the Synchronous (Real-time) scrape endpoint for immediate results
    // Dataset ID: gd_l1viktl72bvl7bjuj0 (LinkedIn people profiles - collect by URL)
    const brightDataResponse = await fetch(
      "https://api.brightdata.com/datasets/v3/scrape?dataset_id=gd_l1viktl72bvl7bjuj0&notify=false&include_errors=true",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: [{ url: normalizedUrl }]
        }),
      }
    );

    if (!brightDataResponse.ok) {
      const errorText = await brightDataResponse.text();
      console.error("Bright Data API error:", brightDataResponse.status, errorText);

      if (brightDataResponse.status === 401) {
        return {
          statusCode: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            error: "API authentication failed",
            details: "LinkedIn import service is temporarily unavailable."
          }),
        };
      }

      if (brightDataResponse.status === 429) {
        return {
          statusCode: 429,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            error: "Rate limit exceeded",
            details: "Too many requests. Please wait a moment and try again."
          }),
        };
      }

      return {
        statusCode: brightDataResponse.status,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          error: "Failed to fetch LinkedIn profile",
          details: "Could not retrieve profile data. Please try again."
        }),
      };
    }

    // Parse the response - Synchronous mode returns data directly
    const responseData = await brightDataResponse.json();

    // Log full response for debugging (truncated for large responses)
    console.log("Bright Data response structure:", {
      isArray: Array.isArray(responseData),
      length: Array.isArray(responseData) ? responseData.length : 'N/A',
      firstItemKeys: Array.isArray(responseData) && responseData[0] ? Object.keys(responseData[0]) : Object.keys(responseData || {}),
      educationSample: Array.isArray(responseData) && responseData[0]?.education ? responseData[0].education[0] : null,
      projectsSample: Array.isArray(responseData) && responseData[0]?.projects ? responseData[0].projects[0] : null,
      certificationsSample: Array.isArray(responseData) && responseData[0]?.certifications ? responseData[0].certifications[0] : null,
    });
    console.log("Bright Data raw response (first 2000 chars):", JSON.stringify(responseData).slice(0, 2000));

    // Check for errors in response
    if (responseData.error || responseData.errors) {
      const errorMessage = responseData.error || responseData.errors?.[0]?.message || "Unknown error";
      console.error("Bright Data returned error:", errorMessage);

      return {
        statusCode: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          error: "Profile not found",
          details: "We couldn't find this LinkedIn profile. Please make sure the profile is public and the URL is correct."
        }),
      };
    }

    // Handle array response (most common for synchronous scrape)
    if (Array.isArray(responseData) && responseData.length > 0) {
      const profile = responseData[0] as BrightDataProfile;

      // Check if profile has actual data
      if (!profile.full_name && !profile.name && !profile.first_name) {
        return {
          statusCode: 404,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            error: "Profile not found",
            details: "We couldn't find this LinkedIn profile. Please make sure the profile is public and the URL is correct."
          }),
        };
      }

      return {
        statusCode: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          success: true,
          data: profile,
        }),
      };
    }

    // Single object response
    if (responseData && (responseData.full_name || responseData.name || responseData.first_name)) {
      return {
        statusCode: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          success: true,
          data: responseData,
        }),
      };
    }

    // Unexpected response format
    console.error("Unexpected Bright Data response format:", responseData);
    return {
      statusCode: 500,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error: "Unexpected response",
        details: "Received an unexpected response from the LinkedIn service."
      }),
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("LinkedIn import error:", errorMessage);

    return {
      statusCode: 500,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error: "Import failed",
        details: "Something went wrong while importing your profile. Please try again."
      }),
    };
  }
};

export { handler };
