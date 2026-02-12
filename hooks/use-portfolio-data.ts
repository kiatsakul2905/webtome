"use client"

import useSWR from "swr"
import type {
  Experience,
  Education,
  SkillCategory,
  Skill,
  PortfolioProject,
  Certificates,
  ContactInfo,
  SiteSettings,
} from "@/lib/db"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

// SWR configuration for real-time updates
const swrConfig = {
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  revalidateIfStale: true,
  dedupingInterval: 0,
  focusThrottleInterval: 0,
  refreshInterval: 5000, // Refresh every 5 seconds for real-time feel
}

export interface SkillCategoryWithSkills extends SkillCategory {
  skills: Skill[]
}

export function useExperiences() {
  const { data, error, isLoading } = useSWR<Experience[]>(
    "/api/experiences",
    fetcher,
    swrConfig
  )
  return { experiences: data, error, isLoading }
}

export function useEducation() {
  const { data, error, isLoading } = useSWR<Education[]>(
    "/api/education",
    fetcher,
    swrConfig
  )
  return { education: data, error, isLoading }
}

export function useSkills() {
  const { data, error, isLoading } = useSWR<SkillCategoryWithSkills[]>(
    "/api/skills",
    fetcher,
    swrConfig
  )
  return { skillCategories: data, error, isLoading }
}

export function usePortfolio() {
  const { data, error, isLoading } = useSWR<PortfolioProject[]>(
    "/api/portfolio",
    fetcher,
    swrConfig
  )
  return { projects: data, error, isLoading }
}

export function useCertificates() {
  const { data, error, isLoading } = useSWR<Certificates[]>(
    "/api/certificates",
    fetcher,
    swrConfig
  )
  return { projects: data, error, isLoading }
}

export function useContactInfo() {
  const { data, error, isLoading, mutate } = useSWR<ContactInfo>(
    "/api/contact",
    fetcher,
    swrConfig
  )
  return { contactInfo: data, error, isLoading, mutate }
}

export function useSiteSettings() {
  const { data, error, isLoading } = useSWR<SiteSettings>(
    "/api/settings",
    fetcher,
    swrConfig
  )
  return { settings: data, error, isLoading }
}

export async function sendContactMessage(data: {
  name: string
  email: string
  message: string
}) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Failed to send message")
  }

  return response.json()
}
