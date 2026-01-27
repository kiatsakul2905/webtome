"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n"
import { useSkills } from "@/hooks/use-portfolio-data"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code2 } from "lucide-react"

export function SkillsPreview() {
  const { t } = useI18n()
  const { skillCategories, isLoading } = useSkills()

  const topSkills = skillCategories
    ? skillCategories.flatMap((cat) => cat.skills || []).slice(0, 6)
    : []

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <Code2 className="h-6 w-6 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              {t("section.skills")}
            </h2>
          </div>
          <Button variant="ghost" asChild className="group">
            <Link href="/skills">
              {t("section.viewMore")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {isLoading && <div className="text-muted-foreground">{t("common.loading")}</div>}
          {!isLoading && topSkills.length === 0 && (
            <div className="text-muted-foreground">{t("common.noData")}</div>
          )}
          {topSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors text-center"
            >
              <p className="font-medium text-foreground mb-2">{skill.name}</p>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{skill.level}%</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
