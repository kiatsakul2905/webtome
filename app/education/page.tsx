"use client"

import { useI18n } from "@/lib/i18n"
import { useEducation } from "@/hooks/use-portfolio-data"
import { GraduationCap, Calendar, MapPin, BookOpen, Loader2 } from "lucide-react"

export default function EducationPage() {
  const { language, t } = useI18n()
  const { education: dbEducation, isLoading, error } = useEducation()

  // Use database data if available, otherwise show empty
  const education = Array.isArray(dbEducation) && !error ? dbEducation.map(edu => ({
    id: edu.id,
    institution: { en: edu.institution_en, th: edu.institution_th },
    degree: { en: edu.degree_en, th: edu.degree_th },
    field: { en: edu.field_en, th: edu.field_th },
    period: { en: edu.period_en, th: edu.period_th },
  })) : []

  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center justify-center p-3 rounded-xl bg-primary/10 text-primary mb-6">
            <GraduationCap className="h-8 w-8" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            {t("section.education")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === "en"
              ? "My academic background and qualifications"
              : "ประวัติการศึกษาและคุณวุฒิของผม"}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          /* Education Timeline */
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>

            {/* Education items */}
            <div className="space-y-8">
              {education.map((edu: any) => (
                <div key={edu.id} className="relative flex gap-8">
                  {/* Timeline dot */}
                  <div className="relative z-10 shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {edu.degree[language]}
                      </h3>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>{edu.institution[language]}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <BookOpen className="h-4 w-4 text-primary" />
                          <span>{edu.field[language]}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span>{edu.period[language]}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
