"use client"

import { useI18n } from "@/lib/i18n"
import { useSkills } from "@/hooks/use-portfolio-data"
import { Cpu, Code2, Database, Wrench, Loader2 } from "lucide-react"

export default function SkillsPage() {
  const { language, t } = useI18n()
  const { skillCategories: dbSkills, isLoading, error } = useSkills()

  // ใช้ข้อมูลจาก DB ถ้ามี และเป็น Array
  const skillCategories = Array.isArray(dbSkills) && !error ? dbSkills : []

  const getIcon = (iconName: string | null) => {
    if (!iconName) return <Cpu className="w-6 h-6" />
    switch (iconName) {
      case 'frontend': return <Code2 className="w-6 h-6" />
      case 'backend': return <Database className="w-6 h-6" />
      case 'tools': return <Wrench className="w-6 h-6" />
      default: return <Cpu className="w-6 h-6" />
    }
  }

  return (
    <div className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center justify-center p-3 rounded-xl bg-primary/10 text-primary mb-6">
            <Cpu className="h-8 w-8" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            {t("section.skills")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === "en"
              ? "Technologies and tools I work with"
              : "เทคโนโลยีและเครื่องมือที่ผมเลือกใช้"}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : skillCategories.length === 0 ? (
          <div className="text-center text-muted-foreground py-20">
            {t("common.noData")}
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((category) => (
              <div key={category.id} className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {getIcon(category.icon)}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {language === 'en' ? category.name_en : category.name_th}
                  </h3>
                </div>

                <div className="space-y-4">
                  {Array.isArray(category.skills) && category.skills.map((skill, index: number) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-foreground">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}