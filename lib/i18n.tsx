"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type Language = "th" | "en"

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    "nav.experience": "Experience",
    "nav.education": "Education",
    "nav.skills": "Skills",
    "nav.portfolio": "Portfolio",
    "nav.contact": "Contact",
    
    // Hero
    "hero.greeting": "Hello, I'm",
    "hero.name": "Kiatsakul Paiyasen",
    "hero.role": "Full Stack Developer",
    "hero.description": "I build accessible, pixel-perfect digital experiences for the web. Passionate about creating beautiful and functional applications.",
    "hero.cta": "View My Work",
    "hero.scroll": "Scroll to explore",
    
    // Sections
    "section.experience": "Experience",
    "section.education": "Education",
    "section.skills": "Skills",
    "section.portfolio": "Portfolio",
    "section.viewMore": "View More",
    
    // Experience
    "exp.present": "Present",
    
    // Skills Categories
    "skills.frontend": "Frontend",
    "skills.backend": "Backend",
    "skills.tools": "Tools & Others",
    
    // Contact
    "contact.title": "Contact Me",
    "contact.description": "Feel free to reach out if you want to collaborate or just say hi!",
    "contact.form.firstName": "First Name",
    "contact.form.lastName": "Last Name",
    "contact.form.email": "Email",
    "contact.form.message": "Message",
    "contact.form.submit": "Send Message",
    "contact.info.title": "Contact Information",
    "contact.info.name": "Name",
    "contact.info.phone": "Phone",
    "contact.info.email": "Email",
    
    // Footer
    "footer.rights": "All rights reserved.",
    
    // Portfolio
    "portfolio.technologies": "Technologies",
    "portfolio.viewProject": "View Project",
  },
  th: {
    // Navigation
    "nav.experience": "ประสบการณ์",
    "nav.education": "การศึกษา",
    "nav.skills": "ทักษะ",
    "nav.portfolio": "ผลงาน",
    "nav.contact": "ติดต่อ",
    
    // Hero
    "hero.greeting": "สวัสดีครับ, ผมชื่อ",
    "hero.name": "เกียรติสกุล ไพยเสน",
    "hero.role": "Full Stack Developer",
    "hero.description": "ผมสร้างประสบการณ์ดิจิทัลที่เข้าถึงได้และสมบูรณ์แบบสำหรับเว็บ มีความหลงใหลในการสร้างแอปพลิเคชันที่สวยงามและใช้งานได้จริง",
    "hero.cta": "ดูผลงานของผม",
    "hero.scroll": "เลื่อนเพื่อสำรวจ",
    
    // Sections
    "section.experience": "ประสบการณ์",
    "section.education": "การศึกษา",
    "section.skills": "ทักษะ",
    "section.portfolio": "ผลงาน",
    "section.viewMore": "ดูเพิ่มเติม",
    
    // Experience
    "exp.present": "ปัจจุบัน",
    
    // Skills Categories
    "skills.frontend": "Frontend",
    "skills.backend": "Backend",
    "skills.tools": "เครื่องมือและอื่นๆ",
    
    // Contact
    "contact.title": "ติดต่อเรา",
    "contact.description": "ติดต่อเราได้เลยหากต้องการร่วมงานหรือแค่ทักทาย!",
    "contact.form.firstName": "ชื่อ",
    "contact.form.lastName": "นามสกุล",
    "contact.form.email": "อีเมล",
    "contact.form.message": "ข้อความ",
    "contact.form.submit": "ส่งข้อความ",
    "contact.info.title": "ข้อมูลติดต่อ",
    "contact.info.name": "ชื่อ",
    "contact.info.phone": "โทรศัพท์",
    "contact.info.email": "อีเมล",
    
    // Footer
    "footer.rights": "สงวนลิขสิทธิ์",
    
    // Portfolio
    "portfolio.technologies": "เทคโนโลยี",
    "portfolio.viewProject": "ดูโปรเจกต์",
  },
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
