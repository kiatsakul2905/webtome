"use client"

import React from "react"

import { useI18n } from "@/lib/i18n"
import { useSkills } from "@/hooks/use-portfolio-data"
import { Code2, Server, Wrench, Loader2 } from "lucide-react"

function SkillCard({ name, level }: { name: string; level: number }) {
  return (
    <div className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <span className="font-medium text-foreground">{name}</span>
        <span className="text-sm text-muted-foreground">{level}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${level}%` }}
        ></div>
      </div>
    </div>
  )
}

function SkillCategory({
  title,
  icon: Icon,
  skills,
}: {
  title: string
  icon: React.ComponentType<{ className?: string }>
  skills: { name: string; level: number }[]
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {skills.map((skill) => (
          <SkillCard key={skill.name} name={skill.name} level={skill.level} />
        ))}
      </div>
    </div>
  )
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2,
  Server,
  Wrench,
}

export default function SkillsPage() {
  const { language, t } = useI18n()
  const { skillCategories, isLoading, error } = useSkills()

  // Use database data if available, otherwise fallback to static data
  const useDbData = skillCategories && !error && skillCategories.length > 0

  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center justify-center p-3 rounded-xl bg-primary/10 text-primary mb-6">
            <Code2 className="h-8 w-8" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            {t("section.skills")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === "en"
              ? "Technologies and tools I work with"
              : "เทคโนโลยีและเครื่องมือที่ผมใช้ทำงาน"}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : useDbData ? (
          /* Skills from Database */
          <div className="space-y-12">
            {skillCategories.map((category) => {
              const Icon = iconMap[category.icon as keyof typeof iconMap] || Code2
              return (
                <SkillCategory
                  key={category.id}
                  title={language === "en" ? category.name_en : category.name_th}
                  icon={Icon}
                  skills={category.skills.map(s => ({ name: s.name, level: s.level }))}
                />
              )
            })}
          </div>
        ) : (
          /* No Static Skills Data Fallback */
          <div className="text-center text-muted-foreground py-20">
            {t("common.noData")}
          </div>
        )}
      </div>
    </div>
  )
}
