"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n"
import { useEducation } from "@/hooks/use-portfolio-data"
import { Button } from "@/components/ui/button"
import { ArrowRight, GraduationCap } from "lucide-react"

export function EducationPreview() {
  const { language, t } = useI18n()
  const { education, isLoading } = useEducation()
  const previewItems = (education || []).slice(0, 2)

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-6 w-6 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              {t("section.education")}
            </h2>
          </div>
          <Button variant="ghost" asChild className="group">
            <Link href="/education">
              {t("section.viewMore")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {isLoading && <div className="text-muted-foreground">{t("common.loading")}</div>}
          {!isLoading && previewItems.length === 0 && (
            <div className="text-muted-foreground">{t("common.noData")}</div>
          )}
          {previewItems.map((edu) => (
            <div
              key={edu.id}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-foreground">
                  {language === "en" ? edu.degree_en : edu.degree_th}
                </h3>
                <p className="text-primary font-medium">
                  {language === "en" ? edu.institution_en : edu.institution_th}
                </p>
                <p className="text-muted-foreground">
                  {language === "en" ? edu.field_en : edu.field_th}
                </p>
                <p className="text-sm text-muted-foreground">
                  {language === "en" ? edu.period_en : edu.period_th}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
