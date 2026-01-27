"use client"

import { useI18n } from "@/lib/i18n"
import { useExperiences } from "@/hooks/use-portfolio-data"
import { Briefcase, Loader2 } from "lucide-react"

export default function ExperiencePage() {
  const { language, t } = useI18n()
  const { experiences: dbExperiences, isLoading, error } = useExperiences()

  // Use database data if available, otherwise fallback to static data
  const experiences = Array.isArray(dbExperiences) && !error ? dbExperiences.map(exp => ({
    id: exp.id,
    company: exp.company,
    title: { en: exp.title_en, th: exp.title_th },
    period: { en: exp.period_en, th: exp.period_th },
    description: { en: exp.description_en, th: exp.description_th },
    technologies: exp.technologies,
  })) : []

  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center justify-center p-3 rounded-xl bg-primary/10 text-primary mb-6">
            <Briefcase className="h-8 w-8" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            {t("section.experience")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === "en"
              ? "My professional journey and work experience"
              : "เส้นทางอาชีพและประสบการณ์การทำงานของผม"}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          /* Timeline */
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-border"></div>

            {/* Experience items */}
            <div className="space-y-12">
              {experiences.map((exp: any, index: number) => (
                <div
                  key={exp.id}
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background"></div>

                  {/* Content */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"} pl-8 md:pl-0`}>
                    <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                      <div className="flex flex-col gap-2 mb-4">
                        <span className="text-sm text-primary font-medium">
                          {exp.period[language]}
                        </span>
                        <h3 className="text-xl font-semibold text-foreground">
                          {exp.title[language]}
                        </h3>
                        <p className="text-muted-foreground font-medium">
                          {typeof exp.company === 'string' ? exp.company : exp.company}
                        </p>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {exp.description[language]}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech: string) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Spacer for timeline layout */}
                  <div className="hidden md:block md:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
