import { HeroSection } from "@/components/hero"
import { ExperiencePreview } from "@/components/experience-preview"
import { EducationPreview } from "@/components/education-preview"
import { SkillsPreview } from "@/components/skills-preview"
import { PortfolioPreview } from "@/components/portfolio-preview"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ExperiencePreview />
      <EducationPreview />
      <SkillsPreview />
      <PortfolioPreview />
    </>
  )
}
