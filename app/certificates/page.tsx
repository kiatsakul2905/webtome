"use client"

import Image from "next/image"
import { useI18n } from "@/lib/i18n"
import { useCertificates } from "@/hooks/use-portfolio-data"
import { FolderOpen, ExternalLink, Loader2 } from "lucide-react"


export default function CertificatePage() {
  const { language, t } = useI18n()
  const { projects: dbProjects, isLoading, error } = useCertificates()

  // Use database data if available, otherwise fallback to static data
  const projects = dbProjects && !error && Array.isArray(dbProjects) ? dbProjects.map(proj => ({
    id: proj.id,
    title: { en: proj.title_en, th: proj.title_th },
    description: { en: proj.description_en, th: proj.description_th },
    technologies: proj.technologies,
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
            {t("section.certificates")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === "en"
              ? "A collection of certificates I have earned"
              : "ผลงานใบรับรองที่ผมได้รับ"}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          /* cretificate Grid */
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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
