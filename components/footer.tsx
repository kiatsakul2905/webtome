"use client"

import React from "react"

import { useState } from "react"
import { useI18n } from "@/lib/i18n"
import { useContactInfo, sendContactMessage } from "@/hooks/use-portfolio-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Github, Linkedin, Facebook, Mail, Phone, User, Loader2, CheckCircle } from "lucide-react"

export function Footer() {
  const { language, t } = useI18n()
  const { contactInfo: dbContactInfo, error, mutate } = useContactInfo()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Use database data if available, otherwise show defaults
  const contactInfo = dbContactInfo && !error ? {
    name: { en: dbContactInfo.name_en || "Contact Us", th: dbContactInfo.name_th || "ติดต่อเรา" },
    email: dbContactInfo.email || "",
    phone: dbContactInfo.phone || "",
    social: {
      github: dbContactInfo.github_url || "",
      linkedin: dbContactInfo.linkedin_url || "",
      facebook: dbContactInfo.facebook_url || "",
    },
  } : {
    name: { en: "Contact Us", th: "ติดต่อเรา" },
    email: "",
    phone: "",
    social: { github: "", linkedin: "", facebook: "" },
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      await sendContactMessage({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        message: formData.message,
      })
      setSubmitSuccess(true)
      setFormData({ firstName: "", lastName: "", email: "", message: "" })
      setTimeout(() => setSubmitSuccess(false), 5000)
      // Revalidate contact info after successful submission
      if (mutate) {
        await mutate()
      }
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to send message")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <footer id="contact" className="bg-muted/50 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t("contact.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            {t("contact.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-foreground">
                  {t("contact.form.firstName")}
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-foreground">
                  {t("contact.form.lastName")}
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="bg-background border-border"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                {t("contact.form.email")}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-foreground">
                {t("contact.form.message")}
              </Label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="bg-background border-border resize-none"
              />
            </div>
            {submitSuccess && (
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle className="h-5 w-5" />
                <span>{language === "en" ? "Message sent successfully!" : "ส่งข้อความสำเร็จ!"}</span>
              </div>
            )}
            {submitError && (
              <div className="text-destructive text-sm">
                {submitError}
              </div>
            )}
            <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {language === "en" ? "Sending..." : "กำลังส่ง..."}
                </>
              ) : (
                t("contact.form.submit")
              )}
            </Button>
          </form>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-6">
                {t("contact.info.title")}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <User className="h-5 w-5 text-primary" />
                  <span>{contactInfo.name[language]}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>{contactInfo.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>{contactInfo.email}</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href={contactInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-background border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={contactInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-background border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={contactInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-background border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                aria-label="facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} {contactInfo.name[language]}. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  )
}
