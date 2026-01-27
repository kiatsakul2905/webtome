"use client"

import Image from "next/image"
import { useI18n } from "@/lib/i18n"
import { usePortfolio } from "@/hooks/use-portfolio-data"
import { FolderOpen, ExternalLink, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PortfolioPage() {
  const { language, t } = useI18n()
  const { projects: dbProjects, isLoading, error } = usePortfolio()

  // Use database data if available, otherwise fallback to static data
  const projects = dbProjects && !error && Array.isArray(dbProjects) ? dbProjects.map(proj => ({
    id: proj.id,
    title: { en: proj.title_en, th: proj.title_th },
    description: { en: proj.description_en, th: proj.description_th },
    technologies: proj.technologies,
    link: proj.project_link || "#",
    github: proj.github_link || "#",
    image: proj.image_url,
  })) : []

  return (
    <div className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center justify-center p-3 rounded-xl bg-primary/10 text-primary mb-6">
            <FolderOpen className="h-8 w-8" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            {t("section.portfolio")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === "en"
              ? "A collection of projects I have worked on"
              : "ผลงานโปรเจกต์ที่ผมได้ทำ"}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          /* Projects Grid */
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: any) => (
              <div
                key={project.id}
                className="group rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden hover:shadow-lg"
              >
                {/* Project Image */}
                <div className="aspect-video bg-muted flex items-center justify-center relative overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title[language]}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <FolderOpen className="h-16 w-16 text-muted-foreground transition-transform group-hover:scale-110" />
                  )}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors"></div>
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {project.title[language]}
                    </h3>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {project.description[language]}
                  </p>

                  {/* Technologies */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {t("portfolio.technologies")}:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* View Project Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group/btn bg-transparent"
                    asChild
                  >
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("portfolio.viewProject")}
                      <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
