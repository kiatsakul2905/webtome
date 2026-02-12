import { HeroSection } from "@/components/hero"
import { ExperiencePreview } from "@/components/experience-preview"
import { EducationPreview } from "@/components/education-preview"
import { SkillsPreview } from "@/components/skills-preview"
import { PortfolioPreview } from "@/components/portfolio-preview"
import { CertificatesPreview } from "@/components/certificate-preview"
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ExperiencePreview />
      <EducationPreview />
      <SkillsPreview />
      <PortfolioPreview />
      <CertificatesPreview />
    </>
  )
}
