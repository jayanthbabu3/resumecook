/**
 * Profile Page V2
 *
 * Elegant, intuitive profile page with best-in-class aesthetics.
 * Displays all user profile sections with edit capabilities.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { MonthYearPicker } from '@/components/ui/month-year-picker';
import { toast } from 'sonner';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { profileService, UserProfile } from '../services/profileService';
import { cn } from '@/lib/utils';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  Briefcase,
  GraduationCap,
  Code,
  Languages,
  Award,
  FolderOpen,
  BookOpen,
  Users,
  Trophy,
  Target,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  Calendar,
  Building2,
  Loader2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Sparkles,
  Camera,
  X,
  Heart,
  Mic,
  Lightbulb,
  GripVertical,
} from 'lucide-react';
import type {
  ExperienceItem,
  EducationItem,
  SkillItem,
  LanguageItem,
  CertificationItem,
  ProjectItem,
  VolunteerItem,
  AwardItem,
  AchievementItem,
  StrengthItem,
  CourseItem,
  PublicationItem,
  InterestItem,
  ReferenceItem,
  SpeakingItem,
  PatentItem,
  LanguageProficiency,
} from '../types/resumeData';

// ============================================================================
// TYPES
// ============================================================================

type SectionType =
  | 'personal'
  | 'experience'
  | 'education'
  | 'skills'
  | 'languages'
  | 'certifications'
  | 'projects'
  | 'publications'
  | 'volunteer'
  | 'awards'
  | 'achievements'
  | 'strengths'
  | 'courses'
  | 'interests'
  | 'references'
  | 'speaking'
  | 'patents';

interface EditModalState {
  open: boolean;
  section: SectionType | null;
  itemId: string | null;
  mode: 'add' | 'edit';
  focusField?: string;
}

// ============================================================================
// SECTION CARD COMPONENT
// ============================================================================

interface SectionCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onAdd?: () => void;
  isEmpty?: boolean;
  emptyMessage?: string;
  accentColor?: string;
  badge?: string;
}

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  icon,
  children,
  onAdd,
  isEmpty,
  emptyMessage = 'No items added yet',
  badge,
}) => {
  // Use consistent primary theme color
  const colors = {
    bg: 'from-primary/5',
    border: 'border-primary/20',
    icon: 'text-primary',
    button: 'bg-primary hover:bg-primary/90'
  };

  return (
    <div className={cn(
      'bg-white rounded-2xl border shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md',
      colors.border
    )}>
      {/* Header */}
      <div className={cn(
        'px-6 py-4 bg-gradient-to-r to-white flex items-center justify-between',
        colors.bg
      )}>
        <div className="flex items-center gap-3">
          <div className={cn('p-2 rounded-xl bg-white shadow-sm', colors.icon)}>
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            {badge && (
              <Badge variant="secondary" className="mt-1 text-xs font-normal">
                {badge}
              </Badge>
            )}
          </div>
        </div>
        {onAdd && (
          <Button
            size="sm"
            onClick={onAdd}
            className={cn('gap-1.5 rounded-xl text-white shadow-sm', colors.button)}
          >
            <Plus className="h-4 w-4" />
            Add
          </Button>
        )}
      </div>

      {/* Content */}
      <div className="px-6 py-4">
        {isEmpty ? (
          <div className="text-center py-8">
            <div className={cn('w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3', colors.icon)}>
              {icon}
            </div>
            <p className="text-sm text-gray-500">{emptyMessage}</p>
            {onAdd && (
              <Button
                variant="outline"
                size="sm"
                onClick={onAdd}
                className="mt-3 gap-1.5 rounded-lg"
              >
                <Plus className="h-4 w-4" />
                Add your first item
              </Button>
            )}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

// ============================================================================
// ITEM CARD COMPONENTS
// ============================================================================

interface ItemCardProps {
  children: React.ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ children, onEdit, onDelete }) => (
  <div className="group relative p-4 rounded-xl bg-gray-50/50 hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all duration-200">
    {children}
    {(onEdit || onDelete) && (
      <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {onEdit && (
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-lg hover:bg-white"
            onClick={onEdit}
          >
            <Pencil className="h-4 w-4 text-gray-500" />
          </Button>
        )}
        {onDelete && (
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-lg hover:bg-gray-100"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </Button>
        )}
      </div>
    )}
  </div>
);

// ============================================================================
// SORTABLE ITEM CARD COMPONENT
// ============================================================================

interface SortableItemCardProps {
  id: string;
  children: React.ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
}

const SortableItemCard: React.FC<SortableItemCardProps> = ({ id, children, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative p-4 rounded-xl bg-gray-50/50 hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all duration-200",
        isDragging && "opacity-50 shadow-lg border-primary/30 bg-white z-50"
      )}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute left-1 top-1/2 -translate-y-1/2 p-1.5 rounded-lg cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 hover:bg-gray-200 transition-all touch-none"
      >
        <GripVertical className="h-4 w-4 text-gray-400" />
      </div>

      {/* Content with left padding for drag handle */}
      <div className="pl-6">
        {children}
      </div>

      {/* Edit/Delete buttons */}
      {(onEdit || onDelete) && (
        <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-lg hover:bg-white"
              onClick={onEdit}
            >
              <Pencil className="h-4 w-4 text-gray-500" />
            </Button>
          )}
          {onDelete && (
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-lg hover:bg-gray-100"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// PROFILE HEADER COMPONENT
// ============================================================================

interface ProfileHeaderProps {
  profile: UserProfile | null;
  completeness: number;
  onEditPersonal: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile, completeness, onEditPersonal }) => {
  const { fullName, email, phone, location, title, linkedin, github, portfolio, photo } = profile?.personalInfo || {};

  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  };

  // Check which fields are missing
  const missingFields = [];
  if (!email) missingFields.push('Email');
  if (!phone) missingFields.push('Phone');
  if (!location) missingFields.push('Location');
  if (!title) missingFields.push('Title');
  if (!linkedin && !github && !portfolio) missingFields.push('Social links');

  return (
    <div className="relative">
      {/* Main Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Top Section with gradient and avatar */}
        <div className="relative">
          {/* Gradient Background */}
          <div className="h-32 bg-gradient-to-r from-primary via-primary to-blue-600" />

          {/* Decorative Pattern Overlay */}
          <div className="absolute inset-0 h-32 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          {/* Edit Button - Floating on gradient */}
          <Button
            variant="secondary"
            size="sm"
            onClick={onEditPersonal}
            className="absolute top-4 right-4 gap-2 bg-white/95 hover:bg-white shadow-lg border-0 rounded-full px-4"
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </Button>

          {/* Avatar - Positioned to overlap gradient and white section */}
          <div className="absolute -bottom-12 left-8">
            <div className="relative group">
              <Avatar className="h-24 w-24 ring-4 ring-white shadow-xl bg-white">
                <AvatarImage src={photo} alt={fullName} className="object-cover" />
                <AvatarFallback className="bg-gradient-to-br from-primary to-blue-600 text-white text-xl font-semibold">
                  {getInitials(fullName || '')}
                </AvatarFallback>
              </Avatar>

              {/* Profile Strength Badge - On avatar */}
              <div
                className={cn(
                  "absolute -bottom-1 -right-1 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold shadow-md border-2 border-white",
                  completeness >= 80
                    ? "bg-green-500 text-white"
                    : completeness >= 50
                    ? "bg-amber-500 text-white"
                    : "bg-red-500 text-white"
                )}
                title={`Profile ${completeness}% complete`}
              >
                {completeness}%
              </div>

              {/* Camera button on hover */}
              <button
                onClick={onEditPersonal}
                className="absolute top-0 right-0 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-50 transition-all border border-gray-200 opacity-0 group-hover:opacity-100"
              >
                <Camera className="h-3.5 w-3.5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-16 pb-6 px-8">
          {/* Name and Title */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                {fullName || 'Your Name'}
              </h1>
              {title ? (
                <p className="mt-1 text-base text-gray-600 line-clamp-2">
                  {title}
                </p>
              ) : (
                <button
                  onClick={onEditPersonal}
                  className="mt-1 text-base text-gray-400 hover:text-primary transition-colors flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" />
                  Add professional title
                </button>
              )}
            </div>

            {/* Social Links - Desktop */}
            <div className="hidden sm:flex items-center gap-1.5">
              {linkedin ? (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-gray-50 hover:bg-[#0077b5] text-gray-500 hover:text-white transition-all duration-200"
                  title="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              ) : (
                <button
                  onClick={onEditPersonal}
                  className="p-2.5 rounded-xl border-2 border-dashed border-gray-200 text-gray-300 hover:border-[#0077b5] hover:text-[#0077b5] transition-all duration-200"
                  title="Add LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </button>
              )}
              {github ? (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-gray-50 hover:bg-gray-900 text-gray-500 hover:text-white transition-all duration-200"
                  title="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
              ) : (
                <button
                  onClick={onEditPersonal}
                  className="p-2.5 rounded-xl border-2 border-dashed border-gray-200 text-gray-300 hover:border-gray-900 hover:text-gray-900 transition-all duration-200"
                  title="Add GitHub"
                >
                  <Github className="h-4 w-4" />
                </button>
              )}
              {portfolio ? (
                <a
                  href={portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-gray-50 hover:bg-primary text-gray-500 hover:text-white transition-all duration-200"
                  title="Portfolio"
                >
                  <Globe className="h-4 w-4" />
                </a>
              ) : (
                <button
                  onClick={onEditPersonal}
                  className="p-2.5 rounded-xl border-2 border-dashed border-gray-200 text-gray-300 hover:border-primary hover:text-primary transition-all duration-200"
                  title="Add Portfolio"
                >
                  <Globe className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Contact Info Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            {location ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full text-sm text-gray-600">
                <MapPin className="h-3.5 w-3.5 text-gray-400" />
                <span>{location}</span>
              </div>
            ) : (
              <button
                onClick={onEditPersonal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-dashed border-gray-200 rounded-full text-sm text-gray-400 hover:border-primary hover:text-primary transition-colors"
              >
                <MapPin className="h-3.5 w-3.5" />
                <span>Add location</span>
              </button>
            )}
            {email ? (
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-full text-sm text-gray-600 transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-gray-400" />
                <span>{email}</span>
              </a>
            ) : (
              <button
                onClick={onEditPersonal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-dashed border-gray-200 rounded-full text-sm text-gray-400 hover:border-primary hover:text-primary transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Add email</span>
              </button>
            )}
            {phone ? (
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-full text-sm text-gray-600 transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-gray-400" />
                <span>{phone}</span>
              </a>
            ) : (
              <button
                onClick={onEditPersonal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-dashed border-gray-200 rounded-full text-sm text-gray-400 hover:border-primary hover:text-primary transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>Add phone</span>
              </button>
            )}
          </div>

          {/* Social Links - Mobile */}
          <div className="flex sm:hidden items-center gap-1.5 mt-4">
            {linkedin ? (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-gray-50 hover:bg-[#0077b5] text-gray-500 hover:text-white transition-all duration-200"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            ) : (
              <button
                onClick={onEditPersonal}
                className="p-2.5 rounded-xl border-2 border-dashed border-gray-200 text-gray-300 hover:border-[#0077b5] hover:text-[#0077b5] transition-all duration-200"
              >
                <Linkedin className="h-4 w-4" />
              </button>
            )}
            {github ? (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-gray-50 hover:bg-gray-900 text-gray-500 hover:text-white transition-all duration-200"
              >
                <Github className="h-4 w-4" />
              </a>
            ) : (
              <button
                onClick={onEditPersonal}
                className="p-2.5 rounded-xl border-2 border-dashed border-gray-200 text-gray-300 hover:border-gray-900 hover:text-gray-900 transition-all duration-200"
              >
                <Github className="h-4 w-4" />
              </button>
            )}
            {portfolio ? (
              <a
                href={portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-gray-50 hover:bg-primary text-gray-500 hover:text-white transition-all duration-200"
              >
                <Globe className="h-4 w-4" />
              </a>
            ) : (
              <button
                onClick={onEditPersonal}
                className="p-2.5 rounded-xl border-2 border-dashed border-gray-200 text-gray-300 hover:border-primary hover:text-primary transition-all duration-200"
              >
                <Globe className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const ProfilePageV2: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useFirebaseAuth();

  // State
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [completeness, setCompleteness] = useState(0);
  const [editModal, setEditModal] = useState<EditModalState>({
    open: false,
    section: null,
    itemId: null,
    mode: 'add',
  });
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; section: SectionType | null; itemId: string | null }>({
    open: false,
    section: null,
    itemId: null,
  });
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  // Form states for different sections
  const [personalForm, setPersonalForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    title: '',
    summary: '',
    linkedin: '',
    github: '',
    portfolio: '',
    photo: '',
  });

  const [experienceForm, setExperienceForm] = useState<Partial<ExperienceItem>>({});
  const [educationForm, setEducationForm] = useState<Partial<EducationItem>>({});
  const [skillForm, setSkillForm] = useState<Partial<SkillItem>>({});
  const [languageForm, setLanguageForm] = useState<Partial<LanguageItem>>({});
  const [certificationForm, setCertificationForm] = useState<Partial<CertificationItem>>({});
  const [projectForm, setProjectForm] = useState<Partial<ProjectItem>>({});
  const [awardForm, setAwardForm] = useState<Partial<AwardItem>>({});
  const [publicationForm, setPublicationForm] = useState<Partial<PublicationItem>>({});
  const [volunteerForm, setVolunteerForm] = useState<Partial<VolunteerItem>>({});
  const [interestForm, setInterestForm] = useState<Partial<InterestItem>>({});
  const [referenceForm, setReferenceForm] = useState<Partial<ReferenceItem>>({});
  const [speakingForm, setSpeakingForm] = useState<Partial<SpeakingItem>>({});
  const [patentForm, setPatentForm] = useState<Partial<PatentItem>>({});

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Generic reorder handler for all sections
  const handleReorder = useCallback(async <T extends { id: string }>(
    section: keyof UserProfile,
    items: T[],
    activeId: string,
    overId: string
  ) => {
    const oldIndex = items.findIndex(item => item.id === activeId);
    const newIndex = items.findIndex(item => item.id === overId);

    if (oldIndex !== newIndex) {
      const reordered = arrayMove(items, oldIndex, newIndex);

      // Optimistically update UI
      setProfile(prev => prev ? { ...prev, [section]: reordered } : null);

      // Persist to backend
      try {
        await profileService.updateProfile({ [section]: reordered });
        toast.success('Order updated');
      } catch (error) {
        console.error('Failed to save order:', error);
        toast.error('Failed to save order');
        // Revert on failure
        setProfile(prev => prev ? { ...prev, [section]: items } : null);
      }
    }
  }, []);

  // Load profile data
  useEffect(() => {
    // Wait for auth to finish loading before checking user
    if (authLoading) {
      return;
    }

    const loadProfile = async () => {
      if (!user) {
        navigate('/auth');
        return;
      }

      try {
        setLoading(true);
        const profileData = await profileService.getProfile();
        setProfile(profileData);

        if (profileData) {
          setCompleteness(profileService.calculateCompleteness(profileData));
          // Pre-fill personal form
          setPersonalForm({
            fullName: profileData.personalInfo.fullName || '',
            email: profileData.personalInfo.email || '',
            phone: profileData.personalInfo.phone || '',
            location: profileData.personalInfo.location || '',
            title: profileData.personalInfo.title || '',
            summary: profileData.personalInfo.summary || '',
            linkedin: profileData.personalInfo.linkedin || '',
            github: profileData.personalInfo.github || '',
            portfolio: profileData.personalInfo.portfolio || '',
            photo: profileData.personalInfo.photo || '',
          });
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user, navigate, authLoading]);

  // Focus field when modal opens with focusField set
  useEffect(() => {
    if (editModal.open && editModal.focusField) {
      // Small delay to ensure modal is rendered
      const timer = setTimeout(() => {
        const element = document.getElementById(editModal.focusField!);
        if (element) {
          element.focus();
          // Scroll element into view
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [editModal.open, editModal.focusField]);

  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  // Open edit modal
  const openEditModal = (section: SectionType, itemId?: string, focusField?: string) => {
    const mode = itemId ? 'edit' : 'add';

    // Pre-fill form based on section and mode
    if (section === 'experience' && itemId && profile) {
      const item = profile.experience.find(e => e.id === itemId);
      if (item) setExperienceForm(item);
    } else if (section === 'experience') {
      setExperienceForm({ current: false, bulletPoints: [] });
    }

    if (section === 'education' && itemId && profile) {
      const item = profile.education.find(e => e.id === itemId);
      if (item) setEducationForm(item);
    } else if (section === 'education') {
      setEducationForm({});
    }

    if (section === 'skills' && itemId && profile) {
      const item = profile.skills.find(s => s.id === itemId);
      if (item) setSkillForm(item);
    } else if (section === 'skills') {
      setSkillForm({});
    }

    if (section === 'languages' && itemId && profile) {
      const item = profile.languages.find(l => l.id === itemId);
      if (item) setLanguageForm(item);
    } else if (section === 'languages') {
      setLanguageForm({ proficiency: 'Intermediate' });
    }

    if (section === 'certifications' && itemId && profile) {
      const item = profile.certifications.find(c => c.id === itemId);
      if (item) setCertificationForm(item);
    } else if (section === 'certifications') {
      setCertificationForm({});
    }

    if (section === 'projects' && itemId && profile) {
      const item = profile.projects.find(p => p.id === itemId);
      if (item) setProjectForm(item);
    } else if (section === 'projects') {
      setProjectForm({ technologies: [], techStack: [] });
    }

    if (section === 'awards' && itemId && profile) {
      const item = profile.awards.find(a => a.id === itemId);
      if (item) setAwardForm(item);
    } else if (section === 'awards') {
      setAwardForm({});
    }

    if (section === 'publications' && itemId && profile) {
      const item = profile.publications?.find(p => p.id === itemId);
      if (item) setPublicationForm(item);
    } else if (section === 'publications') {
      setPublicationForm({});
    }

    if (section === 'volunteer' && itemId && profile) {
      const item = profile.volunteer?.find(v => v.id === itemId);
      if (item) setVolunteerForm(item);
    } else if (section === 'volunteer') {
      setVolunteerForm({ current: false });
    }

    if (section === 'interests' && itemId && profile) {
      const item = profile.interests?.find(i => i.id === itemId);
      if (item) setInterestForm(item);
    } else if (section === 'interests') {
      setInterestForm({});
    }

    if (section === 'references' && itemId && profile) {
      const item = profile.references?.find(r => r.id === itemId);
      if (item) setReferenceForm(item);
    } else if (section === 'references') {
      setReferenceForm({});
    }

    if (section === 'speaking' && itemId && profile) {
      const item = profile.speaking?.find(s => s.id === itemId);
      if (item) setSpeakingForm(item);
    } else if (section === 'speaking') {
      setSpeakingForm({});
    }

    if (section === 'patents' && itemId && profile) {
      const item = profile.patents?.find(p => p.id === itemId);
      if (item) setPatentForm(item);
    } else if (section === 'patents') {
      setPatentForm({ status: 'Pending' });
    }

    if (section === 'personal' && profile) {
      setPersonalForm({
        fullName: profile.personalInfo.fullName || '',
        email: profile.personalInfo.email || '',
        phone: profile.personalInfo.phone || '',
        location: profile.personalInfo.location || '',
        title: profile.personalInfo.title || '',
        summary: profile.personalInfo.summary || '',
        linkedin: profile.personalInfo.linkedin || '',
        github: profile.personalInfo.github || '',
        portfolio: profile.personalInfo.portfolio || '',
        photo: profile.personalInfo.photo || '',
      });
    }

    setEditModal({ open: true, section, itemId: itemId || null, mode, focusField });
  };

  // Save handlers
  const handleSavePersonal = async () => {
    try {
      setSaving(true);
      await profileService.updateProfile({
        personalInfo: personalForm,
      });

      const updated = await profileService.getProfile();
      setProfile(updated);
      if (updated) setCompleteness(profileService.calculateCompleteness(updated));

      setEditModal({ open: false, section: null, itemId: null, mode: 'add' });
      toast.success('Personal info updated');
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveExperience = async () => {
    try {
      setSaving(true);
      const experiences = [...(profile?.experience || [])];

      if (editModal.mode === 'edit' && editModal.itemId) {
        const index = experiences.findIndex(e => e.id === editModal.itemId);
        if (index !== -1) {
          experiences[index] = { ...experiences[index], ...experienceForm } as ExperienceItem;
        }
      } else {
        const newExp: ExperienceItem = {
          id: `exp-${Date.now()}`,
          company: experienceForm.company || '',
          position: experienceForm.position || '',
          startDate: experienceForm.startDate || '',
          endDate: experienceForm.endDate || '',
          current: experienceForm.current || false,
          location: experienceForm.location,
          description: experienceForm.description,
          bulletPoints: experienceForm.bulletPoints || [],
        };
        experiences.unshift(newExp);
      }

      await profileService.updateProfile({ experience: experiences });
      const updated = await profileService.getProfile();
      setProfile(updated);
      if (updated) setCompleteness(profileService.calculateCompleteness(updated));

      setEditModal({ open: false, section: null, itemId: null, mode: 'add' });
      toast.success(editModal.mode === 'edit' ? 'Experience updated' : 'Experience added');
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveEducation = async () => {
    try {
      setSaving(true);
      const educations = [...(profile?.education || [])];

      if (editModal.mode === 'edit' && editModal.itemId) {
        const index = educations.findIndex(e => e.id === editModal.itemId);
        if (index !== -1) {
          educations[index] = { ...educations[index], ...educationForm } as EducationItem;
        }
      } else {
        const newEdu: EducationItem = {
          id: `edu-${Date.now()}`,
          school: educationForm.school || '',
          degree: educationForm.degree || '',
          field: educationForm.field || '',
          startDate: educationForm.startDate || '',
          endDate: educationForm.endDate || '',
          location: educationForm.location,
          gpa: educationForm.gpa,
        };
        educations.unshift(newEdu);
      }

      await profileService.updateProfile({ education: educations });
      const updated = await profileService.getProfile();
      setProfile(updated);
      if (updated) setCompleteness(profileService.calculateCompleteness(updated));

      setEditModal({ open: false, section: null, itemId: null, mode: 'add' });
      toast.success(editModal.mode === 'edit' ? 'Education updated' : 'Education added');
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSkill = async () => {
    try {
      setSaving(true);
      const skills = [...(profile?.skills || [])];

      if (editModal.mode === 'edit' && editModal.itemId) {
        const index = skills.findIndex(s => s.id === editModal.itemId);
        if (index !== -1) {
          skills[index] = { ...skills[index], ...skillForm } as SkillItem;
        }
      } else {
        const newSkill: SkillItem = {
          id: `skill-${Date.now()}`,
          name: skillForm.name || '',
          level: skillForm.level,
          category: skillForm.category,
        };
        skills.push(newSkill);
      }

      await profileService.updateProfile({ skills });
      const updated = await profileService.getProfile();
      setProfile(updated);
      if (updated) setCompleteness(profileService.calculateCompleteness(updated));

      setEditModal({ open: false, section: null, itemId: null, mode: 'add' });
      toast.success(editModal.mode === 'edit' ? 'Skill updated' : 'Skill added');
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveLanguage = async () => {
    try {
      setSaving(true);
      const languages = [...(profile?.languages || [])];

      if (editModal.mode === 'edit' && editModal.itemId) {
        const index = languages.findIndex(l => l.id === editModal.itemId);
        if (index !== -1) {
          languages[index] = { ...languages[index], ...languageForm } as LanguageItem;
        }
      } else {
        const newLang: LanguageItem = {
          id: `lang-${Date.now()}`,
          language: languageForm.language || '',
          proficiency: languageForm.proficiency || 'Intermediate',
        };
        languages.push(newLang);
      }

      await profileService.updateProfile({ languages });
      const updated = await profileService.getProfile();
      setProfile(updated);
      if (updated) setCompleteness(profileService.calculateCompleteness(updated));

      setEditModal({ open: false, section: null, itemId: null, mode: 'add' });
      toast.success(editModal.mode === 'edit' ? 'Language updated' : 'Language added');
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveCertification = async () => {
    try {
      setSaving(true);
      const certifications = [...(profile?.certifications || [])];

      if (editModal.mode === 'edit' && editModal.itemId) {
        const index = certifications.findIndex(c => c.id === editModal.itemId);
        if (index !== -1) {
          certifications[index] = { ...certifications[index], ...certificationForm } as CertificationItem;
        }
      } else {
        const newCert: CertificationItem = {
          id: `cert-${Date.now()}`,
          name: certificationForm.name || '',
          issuer: certificationForm.issuer || '',
          date: certificationForm.date || '',
          url: certificationForm.url,
        };
        certifications.unshift(newCert);
      }

      await profileService.updateProfile({ certifications });
      const updated = await profileService.getProfile();
      setProfile(updated);
      if (updated) setCompleteness(profileService.calculateCompleteness(updated));

      setEditModal({ open: false, section: null, itemId: null, mode: 'add' });
      toast.success(editModal.mode === 'edit' ? 'Certification updated' : 'Certification added');
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveProject = async () => {
    try {
      setSaving(true);
      const projects = [...(profile?.projects || [])];

      if (editModal.mode === 'edit' && editModal.itemId) {
        const index = projects.findIndex(p => p.id === editModal.itemId);
        if (index !== -1) {
          projects[index] = { ...projects[index], ...projectForm } as ProjectItem;
        }
      } else {
        const newProj: ProjectItem = {
          id: `proj-${Date.now()}`,
          name: projectForm.name || '',
          description: projectForm.description || '',
          technologies: projectForm.technologies || [],
          techStack: projectForm.techStack || [],
          url: projectForm.url,
          githubUrl: projectForm.githubUrl,
        };
        projects.unshift(newProj);
      }

      await profileService.updateProfile({ projects });
      const updated = await profileService.getProfile();
      setProfile(updated);
      if (updated) setCompleteness(profileService.calculateCompleteness(updated));

      setEditModal({ open: false, section: null, itemId: null, mode: 'add' });
      toast.success(editModal.mode === 'edit' ? 'Project updated' : 'Project added');
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAward = async () => {
    try {
      setSaving(true);
      const awards = [...(profile?.awards || [])];

      if (editModal.mode === 'edit' && editModal.itemId) {
        const index = awards.findIndex(a => a.id === editModal.itemId);
        if (index !== -1) {
          awards[index] = { ...awards[index], ...awardForm } as AwardItem;
        }
      } else {
        const newAward: AwardItem = {
          id: `award-${Date.now()}`,
          title: awardForm.title || '',
          issuer: awardForm.issuer || '',
          date: awardForm.date || '',
          description: awardForm.description,
        };
        awards.unshift(newAward);
      }

      await profileService.updateProfile({ awards });
      const updated = await profileService.getProfile();
      setProfile(updated);
      if (updated) setCompleteness(profileService.calculateCompleteness(updated));

      setEditModal({ open: false, section: null, itemId: null, mode: 'add' });
      toast.success(editModal.mode === 'edit' ? 'Award updated' : 'Award added');
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleSavePublication = async () => {
    try {
      setSaving(true);
      const publications = [...(profile?.publications || [])];

      if (editModal.mode === 'edit' && editModal.itemId) {
        const index = publications.findIndex(p => p.id === editModal.itemId);
        if (index !== -1) {
          publications[index] = { ...publications[index], ...publicationForm } as PublicationItem;
        }
      } else {
        const newPub: PublicationItem = {
          id: `pub-${Date.now()}`,
          title: publicationForm.title || '',
          publisher: publicationForm.publisher || '',
          date: publicationForm.date || '',
          url: publicationForm.url,
          description: publicationForm.description,
        };
        publications.unshift(newPub);
      }

      await profileService.updateProfile({ publications });
      const updated = await profileService.getProfile();
      setProfile(updated);
      if (updated) setCompleteness(profileService.calculateCompleteness(updated));

      setEditModal({ open: false, section: null, itemId: null, mode: 'add' });
      toast.success(editModal.mode === 'edit' ? 'Publication updated' : 'Publication added');
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveVolunteer = async () => {
    try {
      setSaving(true);
      const volunteer = [...(profile?.volunteer || [])];

      if (editModal.mode === 'edit' && editModal.itemId) {
        const index = volunteer.findIndex(v => v.id === editModal.itemId);
        if (index !== -1) {
          volunteer[index] = { ...volunteer[index], ...volunteerForm } as VolunteerItem;
        }
      } else {
        const newVol: VolunteerItem = {
          id: `vol-${Date.now()}`,
          organization: volunteerForm.organization || '',
          role: volunteerForm.role || '',
          startDate: volunteerForm.startDate || '',
          endDate: volunteerForm.endDate,
          current: volunteerForm.current || false,
          description: volunteerForm.description,
        };
        volunteer.unshift(newVol);
      }

      await profileService.updateProfile({ volunteer });
      const updated = await profileService.getProfile();
      setProfile(updated);
      if (updated) setCompleteness(profileService.calculateCompleteness(updated));

      setEditModal({ open: false, section: null, itemId: null, mode: 'add' });
      toast.success(editModal.mode === 'edit' ? 'Volunteer experience updated' : 'Volunteer experience added');
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveInterest = async () => {
    try {
      setSaving(true);
      const interests = [...(profile?.interests || [])];

      if (editModal.mode === 'edit' && editModal.itemId) {
        const index = interests.findIndex(i => i.id === editModal.itemId);
        if (index !== -1) {
          interests[index] = { ...interests[index], ...interestForm } as InterestItem;
        }
      } else {
        const newInterest: InterestItem = {
          id: `int-${Date.now()}`,
          name: interestForm.name || '',
          description: interestForm.description,
        };
        interests.push(newInterest);
      }

      await profileService.updateProfile({ interests });
      const updated = await profileService.getProfile();
      setProfile(updated);
      if (updated) setCompleteness(profileService.calculateCompleteness(updated));

      setEditModal({ open: false, section: null, itemId: null, mode: 'add' });
      toast.success(editModal.mode === 'edit' ? 'Interest updated' : 'Interest added');
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveReference = async () => {
    try {
      setSaving(true);
      const references = [...(profile?.references || [])];

      if (editModal.mode === 'edit' && editModal.itemId) {
        const index = references.findIndex(r => r.id === editModal.itemId);
        if (index !== -1) {
          references[index] = { ...references[index], ...referenceForm } as ReferenceItem;
        }
      } else {
        const newRef: ReferenceItem = {
          id: `ref-${Date.now()}`,
          name: referenceForm.name || '',
          title: referenceForm.title || '',
          company: referenceForm.company || '',
          relationship: referenceForm.relationship || '',
          email: referenceForm.email,
          phone: referenceForm.phone,
        };
        references.push(newRef);
      }

      await profileService.updateProfile({ references });
      const updated = await profileService.getProfile();
      setProfile(updated);
      if (updated) setCompleteness(profileService.calculateCompleteness(updated));

      setEditModal({ open: false, section: null, itemId: null, mode: 'add' });
      toast.success(editModal.mode === 'edit' ? 'Reference updated' : 'Reference added');
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSpeaking = async () => {
    try {
      setSaving(true);
      const speaking = [...(profile?.speaking || [])];

      if (editModal.mode === 'edit' && editModal.itemId) {
        const index = speaking.findIndex(s => s.id === editModal.itemId);
        if (index !== -1) {
          speaking[index] = { ...speaking[index], ...speakingForm } as SpeakingItem;
        }
      } else {
        const newTalk: SpeakingItem = {
          id: `spk-${Date.now()}`,
          event: speakingForm.event || '',
          topic: speakingForm.topic || '',
          date: speakingForm.date || '',
          location: speakingForm.location,
          url: speakingForm.url,
          description: speakingForm.description,
        };
        speaking.unshift(newTalk);
      }

      await profileService.updateProfile({ speaking });
      const updated = await profileService.getProfile();
      setProfile(updated);
      if (updated) setCompleteness(profileService.calculateCompleteness(updated));

      setEditModal({ open: false, section: null, itemId: null, mode: 'add' });
      toast.success(editModal.mode === 'edit' ? 'Speaking engagement updated' : 'Speaking engagement added');
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleSavePatent = async () => {
    try {
      setSaving(true);
      const patents = [...(profile?.patents || [])];

      if (editModal.mode === 'edit' && editModal.itemId) {
        const index = patents.findIndex(p => p.id === editModal.itemId);
        if (index !== -1) {
          patents[index] = { ...patents[index], ...patentForm } as PatentItem;
        }
      } else {
        const newPatent: PatentItem = {
          id: `pat-${Date.now()}`,
          title: patentForm.title || '',
          patentNumber: patentForm.patentNumber || '',
          date: patentForm.date || '',
          status: patentForm.status || 'Pending',
          inventors: patentForm.inventors,
          description: patentForm.description,
          url: patentForm.url,
        };
        patents.unshift(newPatent);
      }

      await profileService.updateProfile({ patents });
      const updated = await profileService.getProfile();
      setProfile(updated);
      if (updated) setCompleteness(profileService.calculateCompleteness(updated));

      setEditModal({ open: false, section: null, itemId: null, mode: 'add' });
      toast.success(editModal.mode === 'edit' ? 'Patent updated' : 'Patent added');
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  // Delete handler
  const handleDelete = async () => {
    if (!deleteConfirm.section || !deleteConfirm.itemId || !profile) return;

    try {
      setSaving(true);
      let updates: any = {};

      switch (deleteConfirm.section) {
        case 'experience':
          updates.experience = profile.experience.filter(e => e.id !== deleteConfirm.itemId);
          break;
        case 'education':
          updates.education = profile.education.filter(e => e.id !== deleteConfirm.itemId);
          break;
        case 'skills':
          updates.skills = profile.skills.filter(s => s.id !== deleteConfirm.itemId);
          break;
        case 'languages':
          updates.languages = profile.languages.filter(l => l.id !== deleteConfirm.itemId);
          break;
        case 'certifications':
          updates.certifications = profile.certifications.filter(c => c.id !== deleteConfirm.itemId);
          break;
        case 'projects':
          updates.projects = profile.projects.filter(p => p.id !== deleteConfirm.itemId);
          break;
        case 'awards':
          updates.awards = profile.awards.filter(a => a.id !== deleteConfirm.itemId);
          break;
        case 'publications':
          updates.publications = (profile.publications || []).filter(p => p.id !== deleteConfirm.itemId);
          break;
        case 'volunteer':
          updates.volunteer = (profile.volunteer || []).filter(v => v.id !== deleteConfirm.itemId);
          break;
        case 'interests':
          updates.interests = (profile.interests || []).filter(i => i.id !== deleteConfirm.itemId);
          break;
        case 'references':
          updates.references = (profile.references || []).filter(r => r.id !== deleteConfirm.itemId);
          break;
        case 'speaking':
          updates.speaking = (profile.speaking || []).filter(s => s.id !== deleteConfirm.itemId);
          break;
        case 'patents':
          updates.patents = (profile.patents || []).filter(p => p.id !== deleteConfirm.itemId);
          break;
      }

      await profileService.updateProfile(updates);
      const updated = await profileService.getProfile();
      setProfile(updated);
      if (updated) setCompleteness(profileService.calculateCompleteness(updated));

      setDeleteConfirm({ open: false, section: null, itemId: null });
      toast.success('Item deleted');
    } catch (error) {
      console.error('Error deleting:', error);
      toast.error('Failed to delete');
    } finally {
      setSaving(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa]">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-73px)]">
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
            <p className="text-gray-500">Loading your profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <ProfileHeader
          profile={profile}
          completeness={completeness}
          onEditPersonal={() => openEditModal('personal')}
        />

        {/* Summary Section */}
        <div className="mt-6 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Professional Summary</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openEditModal('personal', undefined, 'summary')}
              className="gap-1.5 text-gray-500 hover:text-primary"
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit
            </Button>
          </div>
          {profile?.personalInfo.summary ? (
            <p className="text-gray-600 leading-relaxed">{profile.personalInfo.summary}</p>
          ) : (
            <button
              onClick={() => openEditModal('personal', undefined, 'summary')}
              className="w-full p-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add a professional summary to highlight your expertise
            </button>
          )}
        </div>

        {/* Sections Grid */}
        <div className="mt-8 grid gap-6">
          {/* Experience Section */}
          <SectionCard
            title="Experience"
            icon={<Briefcase className="h-5 w-5" />}
            onAdd={() => openEditModal('experience')}
            isEmpty={!profile?.experience || profile.experience.length === 0}
            emptyMessage="Add your work experience"
            accentColor="blue"
            badge={profile?.experience?.length ? `${profile.experience.length} positions` : undefined}
          >
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(event: DragEndEvent) => {
                const { active, over } = event;
                if (over && active.id !== over.id && profile?.experience) {
                  handleReorder('experience', profile.experience, String(active.id), String(over.id));
                }
              }}
            >
              <SortableContext
                items={profile?.experience?.map(e => e.id) || []}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3">
                  {profile?.experience.map((exp) => (
                    <SortableItemCard
                      key={exp.id}
                      id={exp.id}
                      onEdit={() => openEditModal('experience', exp.id)}
                      onDelete={() => setDeleteConfirm({ open: true, section: 'experience', itemId: exp.id })}
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Building2 className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                          <p className="text-gray-600">{exp.company}</p>
                          <div className="flex items-center gap-3 mt-1.5 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                            </span>
                            {exp.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5" />
                                {exp.location}
                              </span>
                            )}
                          </div>
                          {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                            <ul className="mt-3 space-y-1">
                              {exp.bulletPoints.slice(0, 2).map((point, idx) => (
                                <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                  <span className="line-clamp-1">{point}</span>
                                </li>
                              ))}
                              {exp.bulletPoints.length > 2 && (
                                <li className="text-sm text-primary">
                                  +{exp.bulletPoints.length - 2} more
                                </li>
                              )}
                            </ul>
                          )}
                        </div>
                      </div>
                    </SortableItemCard>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </SectionCard>

          {/* Education Section */}
          <SectionCard
            title="Education"
            icon={<GraduationCap className="h-5 w-5" />}
            onAdd={() => openEditModal('education')}
            isEmpty={!profile?.education || profile.education.length === 0}
            emptyMessage="Add your education history"
            accentColor="purple"
            badge={profile?.education?.length ? `${profile.education.length} degrees` : undefined}
          >
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(event: DragEndEvent) => {
                const { active, over } = event;
                if (over && active.id !== over.id && profile?.education) {
                  handleReorder('education', profile.education, String(active.id), String(over.id));
                }
              }}
            >
              <SortableContext
                items={profile?.education?.map(e => e.id) || []}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3">
                  {profile?.education.map((edu) => (
                    <SortableItemCard
                      key={edu.id}
                      id={edu.id}
                      onEdit={() => openEditModal('education', edu.id)}
                      onDelete={() => setDeleteConfirm({ open: true, section: 'education', itemId: edu.id })}
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <GraduationCap className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h4>
                          <p className="text-gray-600">{edu.school}</p>
                          <div className="flex items-center gap-3 mt-1.5 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                            </span>
                            {edu.gpa && (
                              <span className="text-primary font-medium">GPA: {edu.gpa}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </SortableItemCard>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </SectionCard>

          {/* Skills Section - Full Width */}
          <SectionCard
            title="Skills"
            icon={<Code className="h-5 w-5" />}
            onAdd={() => openEditModal('skills')}
            isEmpty={!profile?.skills || profile.skills.length === 0}
            emptyMessage="Add your skills"
            badge={profile?.skills?.length ? `${profile.skills.length} skills` : undefined}
          >
            {(() => {
              // Group skills by category
              const grouped = (profile?.skills || []).reduce((acc, skill) => {
                const category = skill.category || 'Other';
                if (!acc[category]) acc[category] = [];
                acc[category].push(skill);
                return acc;
              }, {} as Record<string, typeof profile.skills>);

              const categories = Object.keys(grouped);

              if (categories.length <= 1) {
                // No categories or single category - show as flat list
                return (
                  <div className="flex flex-wrap gap-2.5">
                    {profile?.skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="group relative inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-gray-200 hover:border-primary/30 hover:bg-primary/5 rounded-full text-sm font-medium cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md"
                        onClick={() => openEditModal('skills', skill.id)}
                      >
                        <span className="text-gray-700 group-hover:text-gray-900">{skill.name}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteConfirm({ open: true, section: 'skills', itemId: skill.id });
                          }}
                          className="p-0.5 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-all -mr-1"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                );
              }

              // Multiple categories - show grouped
              return (
                <div className="space-y-5">
                  {categories.map((category) => (
                    <div key={category}>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{category}</h4>
                      <div className="flex flex-wrap gap-2.5">
                        {grouped[category].map((skill) => (
                          <div
                            key={skill.id}
                            className="group relative inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-gray-200 hover:border-primary/30 hover:bg-primary/5 rounded-full text-sm font-medium cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md"
                            onClick={() => openEditModal('skills', skill.id)}
                          >
                            <span className="text-gray-700 group-hover:text-gray-900">{skill.name}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteConfirm({ open: true, section: 'skills', itemId: skill.id });
                              }}
                              className="p-0.5 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-all -mr-1"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </SectionCard>

          {/* Languages Section - Full Width */}
          <SectionCard
            title="Languages"
            icon={<Languages className="h-5 w-5" />}
            onAdd={() => openEditModal('languages')}
            isEmpty={!profile?.languages || profile.languages.length === 0}
            emptyMessage="Add languages you speak"
            badge={profile?.languages?.length ? `${profile.languages.length} languages` : undefined}
          >
            <div className="flex flex-wrap gap-3">
              {profile?.languages.map((lang) => (
                <div
                  key={lang.id}
                  className="group inline-flex items-center gap-3 px-4 py-2.5 bg-white border border-gray-200 hover:border-primary/30 hover:bg-primary/5 rounded-xl cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md"
                  onClick={() => openEditModal('languages', lang.id)}
                >
                  <span className="font-semibold text-gray-800 group-hover:text-gray-900">{lang.language}</span>
                  <span className="px-2 py-0.5 text-xs font-medium text-primary/80 bg-primary/10 rounded-full">{lang.proficiency}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteConfirm({ open: true, section: 'languages', itemId: lang.id });
                    }}
                    className="p-0.5 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-all -mr-1"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Certifications Section */}
          <SectionCard
            title="Certifications"
            icon={<Award className="h-5 w-5" />}
            onAdd={() => openEditModal('certifications')}
            isEmpty={!profile?.certifications || profile.certifications.length === 0}
            emptyMessage="Add your certifications"
            accentColor="amber"
            badge={profile?.certifications?.length ? `${profile.certifications.length} certifications` : undefined}
          >
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(event: DragEndEvent) => {
                const { active, over } = event;
                if (over && active.id !== over.id && profile?.certifications) {
                  handleReorder('certifications', profile.certifications, String(active.id), String(over.id));
                }
              }}
            >
              <SortableContext
                items={profile?.certifications?.map(c => c.id) || []}
                strategy={verticalListSortingStrategy}
              >
                <div className="grid md:grid-cols-2 gap-3">
                  {profile?.certifications.map((cert) => (
                    <SortableItemCard
                      key={cert.id}
                      id={cert.id}
                      onEdit={() => openEditModal('certifications', cert.id)}
                      onDelete={() => setDeleteConfirm({ open: true, section: 'certifications', itemId: cert.id })}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Award className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 line-clamp-1">{cert.name}</h4>
                          <p className="text-sm text-gray-500">{cert.issuer}</p>
                          <p className="text-xs text-gray-400 mt-1">{cert.date}</p>
                        </div>
                      </div>
                    </SortableItemCard>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </SectionCard>

          {/* Projects Section */}
          <SectionCard
            title="Projects"
            icon={<FolderOpen className="h-5 w-5" />}
            onAdd={() => openEditModal('projects')}
            isEmpty={!profile?.projects || profile.projects.length === 0}
            emptyMessage="Showcase your projects"
            accentColor="indigo"
            badge={profile?.projects?.length ? `${profile.projects.length} projects` : undefined}
          >
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(event: DragEndEvent) => {
                const { active, over } = event;
                if (over && active.id !== over.id && profile?.projects) {
                  handleReorder('projects', profile.projects, String(active.id), String(over.id));
                }
              }}
            >
              <SortableContext
                items={profile?.projects?.map(p => p.id) || []}
                strategy={verticalListSortingStrategy}
              >
                <div className="grid md:grid-cols-2 gap-3">
                  {profile?.projects.map((proj) => (
                    <SortableItemCard
                      key={proj.id}
                      id={proj.id}
                      onEdit={() => openEditModal('projects', proj.id)}
                      onDelete={() => setDeleteConfirm({ open: true, section: 'projects', itemId: proj.id })}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-medium text-gray-900">{proj.name}</h4>
                          {(proj.url || proj.githubUrl) && (
                            <a
                              href={proj.url || proj.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 rounded hover:bg-primary/10 text-primary"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{proj.description}</p>
                        {proj.technologies && proj.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {proj.technologies.slice(0, 4).map((tech, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                            {proj.technologies.length > 4 && (
                              <Badge variant="outline" className="text-xs">
                                +{proj.technologies.length - 4}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </SortableItemCard>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </SectionCard>

          {/* Awards Section */}
          <SectionCard
            title="Awards & Honors"
            icon={<Trophy className="h-5 w-5" />}
            onAdd={() => openEditModal('awards')}
            isEmpty={!profile?.awards || profile.awards.length === 0}
            emptyMessage="Add your awards and achievements"
            accentColor="rose"
            badge={profile?.awards?.length ? `${profile.awards.length} awards` : undefined}
          >
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(event: DragEndEvent) => {
                const { active, over } = event;
                if (over && active.id !== over.id && profile?.awards) {
                  handleReorder('awards', profile.awards, String(active.id), String(over.id));
                }
              }}
            >
              <SortableContext
                items={profile?.awards?.map(a => a.id) || []}
                strategy={verticalListSortingStrategy}
              >
                <div className="grid md:grid-cols-2 gap-3">
                  {profile?.awards.map((award) => (
                    <SortableItemCard
                      key={award.id}
                      id={award.id}
                      onEdit={() => openEditModal('awards', award.id)}
                      onDelete={() => setDeleteConfirm({ open: true, section: 'awards', itemId: award.id })}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Trophy className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{award.title}</h4>
                          <p className="text-sm text-gray-500">{award.issuer}</p>
                          <p className="text-xs text-gray-400 mt-1">{award.date}</p>
                        </div>
                      </div>
                    </SortableItemCard>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </SectionCard>

          {/* Publications Section */}
          <SectionCard
            title="Publications"
            icon={<BookOpen className="h-5 w-5" />}
            onAdd={() => openEditModal('publications')}
            isEmpty={!profile?.publications || profile.publications.length === 0}
            emptyMessage="Add your publications and articles"
            accentColor="teal"
            badge={profile?.publications?.length ? `${profile.publications.length} publications` : undefined}
          >
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(event: DragEndEvent) => {
                const { active, over } = event;
                if (over && active.id !== over.id && profile?.publications) {
                  handleReorder('publications', profile.publications, String(active.id), String(over.id));
                }
              }}
            >
              <SortableContext
                items={profile?.publications?.map(p => p.id) || []}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3">
                  {profile?.publications?.map((pub) => (
                    <SortableItemCard
                      key={pub.id}
                      id={pub.id}
                      onEdit={() => openEditModal('publications', pub.id)}
                      onDelete={() => setDeleteConfirm({ open: true, section: 'publications', itemId: pub.id })}
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-semibold text-gray-900 line-clamp-1">{pub.title}</h4>
                            {pub.url && (
                              <a
                                href={pub.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 rounded hover:bg-primary/10 text-primary flex-shrink-0"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            )}
                          </div>
                          <p className="text-gray-600">{pub.publisher}</p>
                          <p className="text-sm text-gray-500 mt-1">{pub.date}</p>
                          {pub.description && (
                            <p className="text-sm text-gray-500 mt-2 line-clamp-2">{pub.description}</p>
                          )}
                        </div>
                      </div>
                    </SortableItemCard>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </SectionCard>

          {/* Volunteer Section */}
          <SectionCard
            title="Volunteer Experience"
            icon={<Heart className="h-5 w-5" />}
            onAdd={() => openEditModal('volunteer')}
            isEmpty={!profile?.volunteer || profile.volunteer.length === 0}
            emptyMessage="Add your volunteer experience"
            accentColor="rose"
            badge={profile?.volunteer?.length ? `${profile.volunteer.length} activities` : undefined}
          >
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(event: DragEndEvent) => {
                const { active, over } = event;
                if (over && active.id !== over.id && profile?.volunteer) {
                  handleReorder('volunteer', profile.volunteer, String(active.id), String(over.id));
                }
              }}
            >
              <SortableContext
                items={profile?.volunteer?.map(v => v.id) || []}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3">
                  {profile?.volunteer?.map((vol) => (
                    <SortableItemCard
                      key={vol.id}
                      id={vol.id}
                      onEdit={() => openEditModal('volunteer', vol.id)}
                      onDelete={() => setDeleteConfirm({ open: true, section: 'volunteer', itemId: vol.id })}
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Heart className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900">{vol.role}</h4>
                          <p className="text-gray-600">{vol.organization}</p>
                          <div className="flex items-center gap-3 mt-1.5 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              {vol.startDate} - {vol.current ? 'Present' : vol.endDate}
                            </span>
                          </div>
                          {vol.description && (
                            <p className="text-sm text-gray-500 mt-2 line-clamp-2">{vol.description}</p>
                          )}
                        </div>
                      </div>
                    </SortableItemCard>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </SectionCard>

          {/* Interests Section */}
          <SectionCard
            title="Interests & Hobbies"
            icon={<Sparkles className="h-5 w-5" />}
            onAdd={() => openEditModal('interests')}
            isEmpty={!profile?.interests || profile.interests.length === 0}
            emptyMessage="Add your interests and hobbies"
            badge={profile?.interests?.length ? `${profile.interests.length} interests` : undefined}
          >
            <div className="flex flex-wrap gap-2.5">
              {profile?.interests?.map((interest) => (
                <div
                  key={interest.id}
                  className="group relative inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-gray-200 hover:border-primary/30 hover:bg-primary/5 rounded-full text-sm font-medium cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md"
                  onClick={() => openEditModal('interests', interest.id)}
                >
                  <span className="text-gray-700 group-hover:text-gray-900">{interest.name}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteConfirm({ open: true, section: 'interests', itemId: interest.id });
                    }}
                    className="p-0.5 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-all -mr-1"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Speaking Section */}
          <SectionCard
            title="Speaking Engagements"
            icon={<Mic className="h-5 w-5" />}
            onAdd={() => openEditModal('speaking')}
            isEmpty={!profile?.speaking || profile.speaking.length === 0}
            emptyMessage="Add your speaking engagements and presentations"
            badge={profile?.speaking?.length ? `${profile.speaking.length} talks` : undefined}
          >
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(event: DragEndEvent) => {
                const { active, over } = event;
                if (over && active.id !== over.id && profile?.speaking) {
                  handleReorder('speaking', profile.speaking, String(active.id), String(over.id));
                }
              }}
            >
              <SortableContext
                items={profile?.speaking?.map(s => s.id) || []}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3">
                  {profile?.speaking?.map((talk) => (
                    <SortableItemCard
                      key={talk.id}
                      id={talk.id}
                      onEdit={() => openEditModal('speaking', talk.id)}
                      onDelete={() => setDeleteConfirm({ open: true, section: 'speaking', itemId: talk.id })}
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Mic className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900">{talk.topic}</h4>
                          <p className="text-gray-600">{talk.event}</p>
                          <div className="flex items-center gap-3 mt-1.5 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              {talk.date}
                            </span>
                            {talk.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5" />
                                {talk.location}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </SortableItemCard>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </SectionCard>

          {/* Patents Section */}
          <SectionCard
            title="Patents"
            icon={<Lightbulb className="h-5 w-5" />}
            onAdd={() => openEditModal('patents')}
            isEmpty={!profile?.patents || profile.patents.length === 0}
            emptyMessage="Add your patents and intellectual property"
            badge={profile?.patents?.length ? `${profile.patents.length} patents` : undefined}
          >
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(event: DragEndEvent) => {
                const { active, over } = event;
                if (over && active.id !== over.id && profile?.patents) {
                  handleReorder('patents', profile.patents, String(active.id), String(over.id));
                }
              }}
            >
              <SortableContext
                items={profile?.patents?.map(p => p.id) || []}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3">
                  {profile?.patents?.map((patent) => (
                    <SortableItemCard
                      key={patent.id}
                      id={patent.id}
                      onEdit={() => openEditModal('patents', patent.id)}
                      onDelete={() => setDeleteConfirm({ open: true, section: 'patents', itemId: patent.id })}
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Lightbulb className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900">{patent.title}</h4>
                          <p className="text-gray-600">{patent.patentNumber}</p>
                          <div className="flex items-center gap-3 mt-1.5 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              {patent.date}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {patent.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </SortableItemCard>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </SectionCard>

          {/* References Section */}
          <SectionCard
            title="References"
            icon={<Users className="h-5 w-5" />}
            onAdd={() => openEditModal('references')}
            isEmpty={!profile?.references || profile.references.length === 0}
            emptyMessage="Add your professional references"
            badge={profile?.references?.length ? `${profile.references.length} references` : undefined}
          >
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(event: DragEndEvent) => {
                const { active, over } = event;
                if (over && active.id !== over.id && profile?.references) {
                  handleReorder('references', profile.references, String(active.id), String(over.id));
                }
              }}
            >
              <SortableContext
                items={profile?.references?.map(r => r.id) || []}
                strategy={verticalListSortingStrategy}
              >
                <div className="grid md:grid-cols-2 gap-3">
                  {profile?.references?.map((ref) => (
                    <SortableItemCard
                      key={ref.id}
                      id={ref.id}
                      onEdit={() => openEditModal('references', ref.id)}
                      onDelete={() => setDeleteConfirm({ open: true, section: 'references', itemId: ref.id })}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{ref.name}</h4>
                          <p className="text-sm text-gray-600">{ref.title} at {ref.company}</p>
                          <p className="text-xs text-gray-500 mt-1">{ref.relationship}</p>
                        </div>
                      </div>
                    </SortableItemCard>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </SectionCard>
        </div>
      </main>

      {/* Edit Modal */}
      <Dialog open={editModal.open} onOpenChange={(open) => !open && setEditModal({ ...editModal, open: false })}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader className="pb-4 border-b">
            <DialogTitle className="text-xl">
              {editModal.mode === 'edit' ? 'Edit' : 'Add'} {editModal.section === 'personal' ? 'Personal Information' :
                editModal.section === 'experience' ? 'Work Experience' :
                editModal.section === 'education' ? 'Education' :
                editModal.section === 'skills' ? 'Skill' :
                editModal.section === 'languages' ? 'Language' :
                editModal.section === 'certifications' ? 'Certification' :
                editModal.section === 'projects' ? 'Project' :
                editModal.section === 'awards' ? 'Award' :
                editModal.section === 'publications' ? 'Publication' :
                editModal.section === 'volunteer' ? 'Volunteer Experience' :
                editModal.section === 'interests' ? 'Interest' :
                editModal.section === 'references' ? 'Reference' :
                editModal.section === 'speaking' ? 'Speaking Engagement' :
                editModal.section === 'patents' ? 'Patent' :
                editModal.section}
            </DialogTitle>
            <DialogDescription className="text-base">
              {editModal.section === 'personal'
                ? 'Update your personal and contact information. This will be displayed on your profile and resumes.'
                : `${editModal.mode === 'edit' ? 'Update' : 'Add'} your ${editModal.section} details`
              }
            </DialogDescription>
          </DialogHeader>

          <div className="py-6 max-h-[65vh] overflow-y-auto px-1">
            {/* Personal Info Form */}
            {editModal.section === 'personal' && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div className="col-span-2">
                    <Label htmlFor="fullName" className="text-sm font-medium">Full Name</Label>
                    <Input
                      id="fullName"
                      value={personalForm.fullName}
                      onChange={(e) => setPersonalForm({ ...personalForm, fullName: e.target.value })}
                      placeholder="John Doe"
                      className="mt-2 h-11"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={personalForm.email}
                      onChange={(e) => setPersonalForm({ ...personalForm, email: e.target.value })}
                      placeholder="john@example.com"
                      className="mt-2 h-11"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium">Phone</Label>
                    <Input
                      id="phone"
                      value={personalForm.phone}
                      onChange={(e) => setPersonalForm({ ...personalForm, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="mt-2 h-11"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="title" className="text-sm font-medium">Professional Title</Label>
                    <Input
                      id="title"
                      value={personalForm.title}
                      onChange={(e) => setPersonalForm({ ...personalForm, title: e.target.value })}
                      placeholder="Senior Software Engineer"
                      className="mt-2 h-11"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                    <Input
                      id="location"
                      value={personalForm.location}
                      onChange={(e) => setPersonalForm({ ...personalForm, location: e.target.value })}
                      placeholder="San Francisco, CA"
                      className="mt-2 h-11"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="summary" className="text-sm font-medium">Professional Summary</Label>
                    <Textarea
                      id="summary"
                      value={personalForm.summary}
                      onChange={(e) => setPersonalForm({ ...personalForm, summary: e.target.value })}
                      placeholder="Brief professional summary describing your experience, skills, and career goals..."
                      rows={5}
                      className="mt-2 resize-none"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="photo" className="text-sm font-medium">Photo URL</Label>
                    <Input
                      id="photo"
                      value={personalForm.photo}
                      onChange={(e) => setPersonalForm({ ...personalForm, photo: e.target.value })}
                      placeholder="https://..."
                      className="mt-2 h-11"
                    />
                  </div>
                  
                  {/* Social Links Section */}
                  <div className="col-span-2 pt-4 border-t mt-2">
                    <h4 className="text-sm font-semibold text-gray-700 mb-4">Social Links</h4>
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <Label htmlFor="linkedin" className="text-sm font-medium">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          value={personalForm.linkedin}
                          onChange={(e) => setPersonalForm({ ...personalForm, linkedin: e.target.value })}
                          placeholder="https://linkedin.com/in/..."
                          className="mt-2 h-11"
                        />
                      </div>
                      <div>
                        <Label htmlFor="github" className="text-sm font-medium">GitHub</Label>
                        <Input
                          id="github"
                          value={personalForm.github}
                          onChange={(e) => setPersonalForm({ ...personalForm, github: e.target.value })}
                          placeholder="https://github.com/..."
                          className="mt-2 h-11"
                        />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor="portfolio" className="text-sm font-medium">Portfolio Website</Label>
                        <Input
                          id="portfolio"
                          value={personalForm.portfolio}
                          onChange={(e) => setPersonalForm({ ...personalForm, portfolio: e.target.value })}
                          placeholder="https://yourportfolio.com"
                          className="mt-2 h-11"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Experience Form */}
            {editModal.section === 'experience' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="position">Position / Job Title</Label>
                    <Input
                      id="position"
                      value={experienceForm.position || ''}
                      onChange={(e) => setExperienceForm({ ...experienceForm, position: e.target.value })}
                      placeholder="Senior Software Engineer"
                      className="mt-1.5"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={experienceForm.company || ''}
                      onChange={(e) => setExperienceForm({ ...experienceForm, company: e.target.value })}
                      placeholder="Acme Inc."
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <MonthYearPicker
                      id="startDate"
                      value={experienceForm.startDate || ''}
                      onChange={(value) => setExperienceForm({ ...experienceForm, startDate: value })}
                      placeholder="Select start date"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <MonthYearPicker
                      id="endDate"
                      value={experienceForm.current ? '' : experienceForm.endDate || ''}
                      onChange={(value) => setExperienceForm({ ...experienceForm, endDate: value })}
                      placeholder={experienceForm.current ? 'Present' : 'Select end date'}
                      disabled={experienceForm.current}
                      className="mt-1.5"
                    />
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <Checkbox
                      id="current"
                      checked={experienceForm.current || false}
                      onCheckedChange={(checked) => setExperienceForm({
                        ...experienceForm,
                        current: !!checked,
                        endDate: checked ? 'Present' : experienceForm.endDate
                      })}
                    />
                    <Label htmlFor="current" className="text-sm font-normal cursor-pointer">
                      I currently work here
                    </Label>
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="expLocation">Location</Label>
                    <Input
                      id="expLocation"
                      value={experienceForm.location || ''}
                      onChange={(e) => setExperienceForm({ ...experienceForm, location: e.target.value })}
                      placeholder="San Francisco, CA"
                      className="mt-1.5"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={experienceForm.description || ''}
                      onChange={(e) => setExperienceForm({ ...experienceForm, description: e.target.value })}
                      placeholder="Brief description of your role..."
                      rows={3}
                      className="mt-1.5"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="bulletPoints">Key Achievements (one per line)</Label>
                    <Textarea
                      id="bulletPoints"
                      value={(experienceForm.bulletPoints || []).join('\n')}
                      onChange={(e) => setExperienceForm({
                        ...experienceForm,
                        bulletPoints: e.target.value.split('\n').filter(Boolean)
                      })}
                      placeholder="Led team of 5 engineers&#10;Increased performance by 40%&#10;Deployed to 1M+ users"
                      rows={4}
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Education Form */}
            {editModal.section === 'education' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="school">School / University</Label>
                    <Input
                      id="school"
                      value={educationForm.school || ''}
                      onChange={(e) => setEducationForm({ ...educationForm, school: e.target.value })}
                      placeholder="Stanford University"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="degree">Degree</Label>
                    <Input
                      id="degree"
                      value={educationForm.degree || ''}
                      onChange={(e) => setEducationForm({ ...educationForm, degree: e.target.value })}
                      placeholder="Bachelor of Science"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="field">Field of Study</Label>
                    <Input
                      id="field"
                      value={educationForm.field || ''}
                      onChange={(e) => setEducationForm({ ...educationForm, field: e.target.value })}
                      placeholder="Computer Science"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="eduStartDate">Start Date</Label>
                    <MonthYearPicker
                      id="eduStartDate"
                      value={educationForm.startDate || ''}
                      onChange={(value) => setEducationForm({ ...educationForm, startDate: value })}
                      placeholder="Select start date"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="eduEndDate">End Date</Label>
                    <MonthYearPicker
                      id="eduEndDate"
                      value={educationForm.endDate || ''}
                      onChange={(value) => setEducationForm({ ...educationForm, endDate: value })}
                      placeholder="Select end date"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gpa">GPA (optional)</Label>
                    <Input
                      id="gpa"
                      value={educationForm.gpa || ''}
                      onChange={(e) => setEducationForm({ ...educationForm, gpa: e.target.value })}
                      placeholder="3.8 / 4.0"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="eduLocation">Location (optional)</Label>
                    <Input
                      id="eduLocation"
                      value={educationForm.location || ''}
                      onChange={(e) => setEducationForm({ ...educationForm, location: e.target.value })}
                      placeholder="Stanford, CA"
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Skill Form */}
            {editModal.section === 'skills' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="skillName">Skill Name</Label>
                  <Input
                    id="skillName"
                    value={skillForm.name || ''}
                    onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                    placeholder="React, Python, AWS, etc."
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category (optional)</Label>
                  <Input
                    id="category"
                    value={skillForm.category || ''}
                    onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                    placeholder="Frontend, Backend, DevOps, etc."
                    className="mt-1.5"
                  />
                </div>
              </div>
            )}

            {/* Language Form */}
            {editModal.section === 'languages' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Input
                    id="language"
                    value={languageForm.language || ''}
                    onChange={(e) => setLanguageForm({ ...languageForm, language: e.target.value })}
                    placeholder="English, Spanish, etc."
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="proficiency">Proficiency</Label>
                  <Select
                    value={languageForm.proficiency || 'Intermediate'}
                    onValueChange={(value) => setLanguageForm({ ...languageForm, proficiency: value as LanguageProficiency })}
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select proficiency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Native">Native</SelectItem>
                      <SelectItem value="Fluent">Fluent</SelectItem>
                      <SelectItem value="Professional">Professional</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Basic">Basic</SelectItem>
                      <SelectItem value="Elementary">Elementary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Certification Form */}
            {editModal.section === 'certifications' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="certName">Certification Name</Label>
                  <Input
                    id="certName"
                    value={certificationForm.name || ''}
                    onChange={(e) => setCertificationForm({ ...certificationForm, name: e.target.value })}
                    placeholder="AWS Solutions Architect"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="issuer">Issuing Organization</Label>
                  <Input
                    id="issuer"
                    value={certificationForm.issuer || ''}
                    onChange={(e) => setCertificationForm({ ...certificationForm, issuer: e.target.value })}
                    placeholder="Amazon Web Services"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="certDate">Date Obtained</Label>
                  <MonthYearPicker
                    id="certDate"
                    value={certificationForm.date || ''}
                    onChange={(value) => setCertificationForm({ ...certificationForm, date: value })}
                    placeholder="Select date"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="certUrl">Certificate URL (optional)</Label>
                  <Input
                    id="certUrl"
                    value={certificationForm.url || ''}
                    onChange={(e) => setCertificationForm({ ...certificationForm, url: e.target.value })}
                    placeholder="https://..."
                    className="mt-1.5"
                  />
                </div>
              </div>
            )}

            {/* Project Form */}
            {editModal.section === 'projects' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="projName">Project Name</Label>
                  <Input
                    id="projName"
                    value={projectForm.name || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                    placeholder="E-commerce Platform"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="projDescription">Description</Label>
                  <Textarea
                    id="projDescription"
                    value={projectForm.description || ''}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    placeholder="Brief description of the project..."
                    rows={3}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                  <Input
                    id="technologies"
                    value={(projectForm.technologies || []).join(', ')}
                    onChange={(e) => setProjectForm({
                      ...projectForm,
                      technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                    })}
                    placeholder="React, Node.js, PostgreSQL"
                    className="mt-1.5"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="projUrl">Live URL (optional)</Label>
                    <Input
                      id="projUrl"
                      value={projectForm.url || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, url: e.target.value })}
                      placeholder="https://..."
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="githubUrl">GitHub URL (optional)</Label>
                    <Input
                      id="githubUrl"
                      value={projectForm.githubUrl || ''}
                      onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                      placeholder="https://github.com/..."
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Award Form */}
            {editModal.section === 'awards' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="awardTitle">Award Title</Label>
                  <Input
                    id="awardTitle"
                    value={awardForm.title || ''}
                    onChange={(e) => setAwardForm({ ...awardForm, title: e.target.value })}
                    placeholder="Employee of the Year"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="awardIssuer">Issuing Organization</Label>
                  <Input
                    id="awardIssuer"
                    value={awardForm.issuer || ''}
                    onChange={(e) => setAwardForm({ ...awardForm, issuer: e.target.value })}
                    placeholder="Company Name"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="awardDate">Date</Label>
                  <MonthYearPicker
                    id="awardDate"
                    value={awardForm.date || ''}
                    onChange={(value) => setAwardForm({ ...awardForm, date: value })}
                    placeholder="Select date"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="awardDescription">Description (optional)</Label>
                  <Textarea
                    id="awardDescription"
                    value={awardForm.description || ''}
                    onChange={(e) => setAwardForm({ ...awardForm, description: e.target.value })}
                    placeholder="Brief description..."
                    rows={2}
                    className="mt-1.5"
                  />
                </div>
              </div>
            )}

            {/* Publication Form */}
            {editModal.section === 'publications' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="pubTitle">Publication Title</Label>
                  <Input
                    id="pubTitle"
                    value={publicationForm.title || ''}
                    onChange={(e) => setPublicationForm({ ...publicationForm, title: e.target.value })}
                    placeholder="How to Generate PDF Invoices with JavaScript"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="publisher">Publisher / Platform</Label>
                  <Input
                    id="publisher"
                    value={publicationForm.publisher || ''}
                    onChange={(e) => setPublicationForm({ ...publicationForm, publisher: e.target.value })}
                    placeholder="Medium, Dev.to, Journal Name"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="pubDate">Publication Date</Label>
                  <MonthYearPicker
                    id="pubDate"
                    value={publicationForm.date || ''}
                    onChange={(value) => setPublicationForm({ ...publicationForm, date: value })}
                    placeholder="Select date"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="pubUrl">URL (optional)</Label>
                  <Input
                    id="pubUrl"
                    value={publicationForm.url || ''}
                    onChange={(e) => setPublicationForm({ ...publicationForm, url: e.target.value })}
                    placeholder="https://medium.com/..."
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="pubDescription">Description (optional)</Label>
                  <Textarea
                    id="pubDescription"
                    value={publicationForm.description || ''}
                    onChange={(e) => setPublicationForm({ ...publicationForm, description: e.target.value })}
                    placeholder="Brief description of the publication..."
                    rows={2}
                    className="mt-1.5"
                  />
                </div>
              </div>
            )}

            {/* Volunteer Form */}
            {editModal.section === 'volunteer' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="volRole">Role / Position</Label>
                    <Input
                      id="volRole"
                      value={volunteerForm.role || ''}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, role: e.target.value })}
                      placeholder="Volunteer Coordinator"
                      className="mt-1.5"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="organization">Organization</Label>
                    <Input
                      id="organization"
                      value={volunteerForm.organization || ''}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, organization: e.target.value })}
                      placeholder="Red Cross, Local Food Bank, etc."
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="volStartDate">Start Date</Label>
                    <MonthYearPicker
                      id="volStartDate"
                      value={volunteerForm.startDate || ''}
                      onChange={(value) => setVolunteerForm({ ...volunteerForm, startDate: value })}
                      placeholder="Select start date"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="volEndDate">End Date</Label>
                    <MonthYearPicker
                      id="volEndDate"
                      value={volunteerForm.current ? '' : volunteerForm.endDate || ''}
                      onChange={(value) => setVolunteerForm({ ...volunteerForm, endDate: value })}
                      placeholder={volunteerForm.current ? 'Present' : 'Select end date'}
                      disabled={volunteerForm.current}
                      className="mt-1.5"
                    />
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <Checkbox
                      id="volCurrent"
                      checked={volunteerForm.current || false}
                      onCheckedChange={(checked) => setVolunteerForm({
                        ...volunteerForm,
                        current: !!checked,
                        endDate: checked ? 'Present' : volunteerForm.endDate
                      })}
                    />
                    <Label htmlFor="volCurrent" className="text-sm font-normal cursor-pointer">
                      I currently volunteer here
                    </Label>
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="volDescription">Description (optional)</Label>
                    <Textarea
                      id="volDescription"
                      value={volunteerForm.description || ''}
                      onChange={(e) => setVolunteerForm({ ...volunteerForm, description: e.target.value })}
                      placeholder="Describe your volunteer activities and impact..."
                      rows={3}
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Interests Form */}
            {editModal.section === 'interests' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="interestName">Interest / Hobby</Label>
                  <Input
                    id="interestName"
                    value={interestForm.name || ''}
                    onChange={(e) => setInterestForm({ ...interestForm, name: e.target.value })}
                    placeholder="Photography, Hiking, Chess, etc."
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="interestDesc">Description (optional)</Label>
                  <Input
                    id="interestDesc"
                    value={interestForm.description || ''}
                    onChange={(e) => setInterestForm({ ...interestForm, description: e.target.value })}
                    placeholder="Brief description of your interest"
                    className="mt-1.5"
                  />
                </div>
              </div>
            )}

            {/* References Form */}
            {editModal.section === 'references' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="refName">Full Name</Label>
                    <Input
                      id="refName"
                      value={referenceForm.name || ''}
                      onChange={(e) => setReferenceForm({ ...referenceForm, name: e.target.value })}
                      placeholder="Jane Smith"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="refTitle">Job Title</Label>
                    <Input
                      id="refTitle"
                      value={referenceForm.title || ''}
                      onChange={(e) => setReferenceForm({ ...referenceForm, title: e.target.value })}
                      placeholder="Engineering Manager"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="refCompany">Company</Label>
                    <Input
                      id="refCompany"
                      value={referenceForm.company || ''}
                      onChange={(e) => setReferenceForm({ ...referenceForm, company: e.target.value })}
                      placeholder="Google"
                      className="mt-1.5"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="refRelationship">Relationship</Label>
                    <Input
                      id="refRelationship"
                      value={referenceForm.relationship || ''}
                      onChange={(e) => setReferenceForm({ ...referenceForm, relationship: e.target.value })}
                      placeholder="Former Manager, Colleague, etc."
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="refEmail">Email (optional)</Label>
                    <Input
                      id="refEmail"
                      type="email"
                      value={referenceForm.email || ''}
                      onChange={(e) => setReferenceForm({ ...referenceForm, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="refPhone">Phone (optional)</Label>
                    <Input
                      id="refPhone"
                      value={referenceForm.phone || ''}
                      onChange={(e) => setReferenceForm({ ...referenceForm, phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Speaking Form */}
            {editModal.section === 'speaking' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="talkTopic">Topic / Title</Label>
                    <Input
                      id="talkTopic"
                      value={speakingForm.topic || ''}
                      onChange={(e) => setSpeakingForm({ ...speakingForm, topic: e.target.value })}
                      placeholder="Building Scalable Systems"
                      className="mt-1.5"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="talkEvent">Event / Conference</Label>
                    <Input
                      id="talkEvent"
                      value={speakingForm.event || ''}
                      onChange={(e) => setSpeakingForm({ ...speakingForm, event: e.target.value })}
                      placeholder="AWS re:Invent, React Conf, etc."
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="talkDate">Date</Label>
                    <MonthYearPicker
                      id="talkDate"
                      value={speakingForm.date || ''}
                      onChange={(value) => setSpeakingForm({ ...speakingForm, date: value })}
                      placeholder="Select date"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="talkLocation">Location (optional)</Label>
                    <Input
                      id="talkLocation"
                      value={speakingForm.location || ''}
                      onChange={(e) => setSpeakingForm({ ...speakingForm, location: e.target.value })}
                      placeholder="Las Vegas, NV"
                      className="mt-1.5"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="talkUrl">Recording/Slides URL (optional)</Label>
                    <Input
                      id="talkUrl"
                      value={speakingForm.url || ''}
                      onChange={(e) => setSpeakingForm({ ...speakingForm, url: e.target.value })}
                      placeholder="https://youtube.com/..."
                      className="mt-1.5"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="talkDesc">Description (optional)</Label>
                    <Textarea
                      id="talkDesc"
                      value={speakingForm.description || ''}
                      onChange={(e) => setSpeakingForm({ ...speakingForm, description: e.target.value })}
                      placeholder="Brief description of your talk..."
                      rows={2}
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Patents Form */}
            {editModal.section === 'patents' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="patentTitle">Patent Title</Label>
                    <Input
                      id="patentTitle"
                      value={patentForm.title || ''}
                      onChange={(e) => setPatentForm({ ...patentForm, title: e.target.value })}
                      placeholder="Method for Improving..."
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="patentNumber">Patent Number</Label>
                    <Input
                      id="patentNumber"
                      value={patentForm.patentNumber || ''}
                      onChange={(e) => setPatentForm({ ...patentForm, patentNumber: e.target.value })}
                      placeholder="US1234567"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="patentDate">Filing/Grant Date</Label>
                    <MonthYearPicker
                      id="patentDate"
                      value={patentForm.date || ''}
                      onChange={(value) => setPatentForm({ ...patentForm, date: value })}
                      placeholder="Select date"
                      className="mt-1.5"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="patentStatus">Status</Label>
                    <Select
                      value={patentForm.status || 'Pending'}
                      onValueChange={(value) => setPatentForm({ ...patentForm, status: value as 'Pending' | 'Granted' | 'Published' })}
                    >
                      <SelectTrigger id="patentStatus" className="mt-1.5">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Granted">Granted</SelectItem>
                        <SelectItem value="Published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="patentUrl">Patent URL (optional)</Label>
                    <Input
                      id="patentUrl"
                      value={patentForm.url || ''}
                      onChange={(e) => setPatentForm({ ...patentForm, url: e.target.value })}
                      placeholder="https://patents.google.com/..."
                      className="mt-1.5"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="patentDesc">Description (optional)</Label>
                    <Textarea
                      id="patentDesc"
                      value={patentForm.description || ''}
                      onChange={(e) => setPatentForm({ ...patentForm, description: e.target.value })}
                      placeholder="Brief description of the patent..."
                      rows={2}
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="pt-4 border-t mt-2 gap-3 sm:gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setEditModal({ open: false, section: null, itemId: null, mode: 'add' })}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              size="lg"
              onClick={() => {
                switch (editModal.section) {
                  case 'personal':
                    handleSavePersonal();
                    break;
                  case 'experience':
                    handleSaveExperience();
                    break;
                  case 'education':
                    handleSaveEducation();
                    break;
                  case 'skills':
                    handleSaveSkill();
                    break;
                  case 'languages':
                    handleSaveLanguage();
                    break;
                  case 'certifications':
                    handleSaveCertification();
                    break;
                  case 'projects':
                    handleSaveProject();
                    break;
                  case 'awards':
                    handleSaveAward();
                    break;
                  case 'publications':
                    handleSavePublication();
                    break;
                  case 'volunteer':
                    handleSaveVolunteer();
                    break;
                  case 'interests':
                    handleSaveInterest();
                    break;
                  case 'references':
                    handleSaveReference();
                    break;
                  case 'speaking':
                    handleSaveSpeaking();
                    break;
                  case 'patents':
                    handleSavePatent();
                    break;
                }
              }}
              disabled={saving}
              className="gap-2 px-8 bg-primary hover:bg-primary/90"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {editModal.mode === 'edit' ? 'Save Changes' : 'Add'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirm.open} onOpenChange={(open) => !open && setDeleteConfirm({ open: false, section: null, itemId: null })}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Item</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this item? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteConfirm({ open: false, section: null, itemId: null })}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={saving}
              className="gap-2"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfilePageV2;
