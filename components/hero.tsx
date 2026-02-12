"use client"

import Link from "next/link"
import Image from "next/image"
import { useI18n } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Facebook, Play } from "lucide-react"
import { useState } from "react"
import React from "react"
import { useContactInfo } from "@/hooks/use-portfolio-data"

export function HeroSection() {
  const { t } = useI18n()
  const { contactInfo } = useContactInfo()
  const [isVideoPlaying, setIsVideoPlaying] = useState(true) // ✓ Start playing by default
  const [videoError, setVideoError] = useState(false)
  const [videoAvailable, setVideoAvailable] = useState(true)

  // Check if video file exists and auto-play it
  const checkVideoAvailability = async () => {
    try {
      const response = await fetch("/videos/intro.mp4", { method: "HEAD" })
      if (!response.ok) {
        setVideoAvailable(false)
        setIsVideoPlaying(false)
      } else {
        setVideoAvailable(true)
        setIsVideoPlaying(true) // ✓ Auto-play when available
      }
    } catch (error) {
      setVideoAvailable(false)
      setIsVideoPlaying(false)
    }
  }

  // Check video on component mount
  React.useEffect(() => {
    checkVideoAvailability()
  }, [])

  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-primary font-medium opacity-0 animate-fade-in-up animation-delay-100" style={{ animationFillMode: 'forwards' }}>
                {t("hero.greeting")}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance opacity-0 animate-fade-in-up animation-delay-200" style={{ animationFillMode: 'forwards' }}>
                <span className="animate-text-shimmer">
                  {contactInfo ? (contactInfo.name_en || contactInfo.name_th || t("hero.name")) : t("hero.name")}
                </span>
              </h1>
              <h2 className="text-2xl sm:text-3xl text-primary font-semibold opacity-0 animate-fade-in-up animation-delay-300" style={{ animationFillMode: 'forwards' }}>
                {t("hero.role")}
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg opacity-0 animate-fade-in-up animation-delay-400" style={{ animationFillMode: 'forwards' }}>
              {t("hero.description")}
            </p>

            <div className="flex flex-wrap items-center gap-4 opacity-0 animate-fade-in-up animation-delay-500" style={{ animationFillMode: 'forwards' }}>
              <Button asChild size="lg" className="btn-animated group">
                <Link href="/portfolio">
                  {t("hero.cta")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/kiatsakul2905"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/%E0%B8%98%E0%B8%99%E0%B8%A7-%E0%B8%99%E0%B8%A8%E0%B8%97-%E0%B9%80%E0%B8%81%E0%B8%B5%E0%B8%A2%E0%B8%A3%E0%B8%95%E0%B8%B4%E0%B8%AA%E0%B8%81%E0%B8%B8%E0%B8%A5-%E0%B9%84%E0%B8%9E%E0%B8%A2%E0%B9%80%E0%B8%AA%E0%B8%99-805b943a8/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://www.facebook.com/kiatsakul.paiyasen?locale=th_TH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10"
                  aria-label="facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Content - Video for Desktop, Image for Mobile */}
          <div className="flex justify-center items-center opacity-0 animate-fade-in-right animation-delay-300" style={{ animationFillMode: 'forwards' }}>
            {/* Mobile: Profile Image */}
            <div className="lg:hidden relative w-64 h-64 sm:w-72 sm:h-72">
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 animate-float" />
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-primary/20 shadow-xl">
                <Image
                  src="/images/profile-placeholder.jpg"
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-primary/30 animate-bounce-subtle" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 rounded-full bg-primary/20 animate-bounce-subtle animation-delay-200" />
            </div>

            {/* Desktop: Video with Play Button */}
            <div className="hidden lg:block relative w-full max-w-md">
              <div className="video-container animate-float">
                {!isVideoPlaying || videoError || !videoAvailable ? (
                  <div className="relative aspect-video bg-card rounded-xl overflow-hidden shadow-2xl group cursor-pointer"
                       onClick={() => videoAvailable && !videoError && setIsVideoPlaying(true)}>
                    {/* Video Thumbnail */}
                    <Image
                      src="/images/video-thumbnail.jpg"
                      alt="Video thumbnail"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority
                      onError={(e) => {
                        console.warn("Thumbnail image failed to load")
                      }}
                    />
                    {/* Play Button Overlay */}
                    {!videoError && videoAvailable && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-[2px] transition-all duration-300 group-hover:bg-background/10">
                        <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 animate-glow">
                          <Play className="h-8 w-8 text-primary-foreground ml-1" fill="currentColor" />
                        </div>
                      </div>
                    )}
                    {/* Error/Not Available message */}
                    {(videoError || !videoAvailable) && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-[2px]">
                        <div className="text-center px-4">
                          <p className="text-sm text-muted-foreground mb-2">Video Coming Soon</p>
                          <p className="text-xs text-muted-foreground/70">Add your intro video to public/videos/intro.mp4</p>
                        </div>
                      </div>
                    )}
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-background/60 via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="relative aspect-video bg-card rounded-xl overflow-hidden shadow-2xl">
                    <video
                      autoPlay
                      muted
                      loop
                      controls={false}
                      className="w-full h-full object-cover"
                      poster="/images/video-thumbnail.jpg"
                      onError={() => {
                        console.warn("Video file not found at /videos/intro.mp4. Add your video file to continue.")
                        setVideoError(true)
                        setIsVideoPlaying(false)
                      }}
                    >
                      <source src="/videos/intro.mp4" type="video/mp4" />
                      <p className="p-4 text-sm text-muted-foreground">
                        Your browser does not support the video tag. 
                        <br />
                        Place your intro.mp4 file in the public/videos/ folder.
                      </p>
                    </video>
                  </div>
                )}
              </div>
              
              {/* Decorative floating elements */}
              <div className="absolute -top-6 -right-6 w-12 h-12 rounded-xl bg-primary/20 rotate-12 animate-float animation-delay-100" />
              <div className="absolute -bottom-4 -left-4 w-10 h-10 rounded-lg bg-primary/15 -rotate-12 animate-float animation-delay-300" />
              <div className="absolute top-1/2 -right-8 w-6 h-6 rounded-full bg-primary/25 animate-bounce-subtle" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hidden lg:flex justify-center mt-16 opacity-0 animate-fade-in-up animation-delay-500" style={{ animationFillMode: 'forwards' }}>
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-sm">{t("hero.scroll") || "Scroll to explore"}</span>
            <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-primary rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
