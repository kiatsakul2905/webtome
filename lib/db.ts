import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

export const sql = neon(process.env.DATABASE_URL)

// Types for database tables
export interface Experience {
  id: number
  title_en: string
  title_th: string
  company: string
  period_en: string
  period_th: string
  description_en: string
  description_th: string
  technologies: string[]
  sort_order: number
  is_active: boolean
  created_at?: string
  updated_at?: string
}

export interface Education {
  id: number
  degree_en: string
  degree_th: string
  institution_en: string
  institution_th: string
  period_en: string
  period_th: string
  field_en: string
  field_th: string
  sort_order: number
  is_active: boolean
  created_at?: string
  updated_at?: string
}

export interface SkillCategory {
  id: number
  name: string
  name_en: string
  name_th: string
  icon: string | null
  sort_order: number
  is_active: boolean
  created_at?: string
  updated_at?: string
}

export interface Skill {
  id: number
  category_id: number
  name: string
  level: number
  sort_order: number
  is_active: boolean
  created_at?: string
  updated_at?: string
}

export interface PortfolioProject {
  id: number
  title_en: string
  title_th: string
  description_en: string
  description_th: string
  image_url: string | null
  technologies: string[]
  project_link: string | null
  github_link: string | null
  is_featured: boolean
  sort_order: number
  is_active: boolean
  created_at?: string
  updated_at?: string
}

export interface ContactInfo {
  id: number
  name_en: string
  name_th: string
  email: string
  phone: string | null
  address_en: string | null
  address_th: string | null
  github_url: string | null
  linkedin_url: string | null
  twitter_url: string | null
  is_active: boolean
  created_at?: string
  updated_at?: string
}

export interface ContactMessage {
  id: number
  name: string
  email: string
  message: string
  is_read: boolean
  created_at: string
}

export interface SiteSettings {
  id: number
  hero_name_en: string
  hero_name_th: string
  hero_role_en: string
  hero_role_th: string
  hero_greeting_en: string
  hero_greeting_th: string
  hero_description_en: string
  hero_description_th: string
  profile_image_url: string | null
  intro_video_url: string | null
  video_thumbnail_url: string | null
}
