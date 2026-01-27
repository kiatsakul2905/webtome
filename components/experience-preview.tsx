"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n"
import { useExperiences } from "@/hooks/use-portfolio-data"
import { Button } from "@/components/ui/button"
import { ArrowRight, Briefcase } from "lucide-react"

export function ExperiencePreview() {
  const { language, t } = useI18n()
  const { experiences, isLoading } = useExperiences()
  const previewItems = (experiences || []).slice(0, 2)

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <Briefcase className="h-6 w-6 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              {t("section.experience")}
            </h2>
          </div>
          <Button variant="ghost" asChild className="group">
            <Link href="/experience">
              {t("section.viewMore")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="space-y-6">
          {isLoading && <div className="text-muted-foreground">{t("common.loading")}</div>}
          {!isLoading && previewItems.length === 0 && (
            <div className="text-muted-foreground">{t("common.noData")}</div>
          )}
          {previewItems.map((exp) => (
            <div
              key={exp.id}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">
                    {language === "en" ? exp.title_en : exp.title_th}
                  </h3>
                  <p className="text-primary font-medium">{exp.company}</p>
                  <p className="text-muted-foreground line-clamp-2">
                    {language === "en" ? exp.description_en : exp.description_th}
                  </p>
                </div>
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {language === "en" ? exp.period_en : exp.period_th}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
