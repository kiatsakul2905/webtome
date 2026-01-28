"use client"

import Link from "next/link"
import Image from "next/image"
import { useI18n } from "@/lib/i18n"
import { usePortfolio } from "@/hooks/use-portfolio-data"
import { Button } from "@/components/ui/button"
import { ArrowRight, FolderOpen, ExternalLink } from "lucide-react"

export function PortfolioPreview() {
  const { language, t } = useI18n()
  const { projects, isLoading } = usePortfolio()
  const previewItems = (projects || []).slice(0, 3)

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <FolderOpen className="h-6 w-6 text-primary" />
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              {t("section.portfolio")}
            </h2>
          </div>
          <Button variant="ghost" asChild className="group">
            <Link href="/portfolio">
              {t("section.viewMore")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading && <div className="text-muted-foreground">{t("common.loading")}</div>}
          {!isLoading && previewItems.length === 0 && (
            <div className="text-muted-foreground">{t("common.noData")}</div>
          )}
          {previewItems.map((project) => (
            <div
              key={project.id}
              className="group rounded-xl bg-card border border-border hover:border-primary/50 transition-colors overflow-hidden"
            >
              <div className="aspect-video bg-muted flex items-center justify-center relative overflow-hidden">
                {project.image_url ? (
                  <Image
                    src={project.image_url}
                    alt={language === "en" ? project.title_en : project.title_th}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <FolderOpen className="h-12 w-12 text-muted-foreground" />
                )}
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {language === "en" ? project.title_en : project.title_th}
                  </h3>
                  {project.project_link && (
                    <a
                      href={project.project_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="View project"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {language === "en" ? project.description_en : project.description_th}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
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
          ))}
        </div>
      </div>
    </section>
  )
}
