"use client"

import { useState, useEffect } from "react"
import { useContactInfo } from "@/hooks/use-portfolio-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Save } from "lucide-react"

export default function AdminSettings() {
  const { contactInfo, mutate } = useContactInfo()
  const [formData, setFormData] = useState({
    id: 1,
    name_en: "",
    name_th: "",
    phone: "",
    email: "",
    github_url: "",
    linkedin_url: "",
    twitter_url: "",
    address_en: "",
    address_th: "",
    is_active: true,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  useEffect(() => {
    if (contactInfo) {
      setFormData({
        id: contactInfo.id || 1,
        name_en: contactInfo.name_en || "",
        name_th: contactInfo.name_th || "",
        phone: contactInfo.phone || "",
        email: contactInfo.email || "",
        github_url: contactInfo.github_url || "",
        linkedin_url: contactInfo.linkedin_url || "",
        twitter_url: contactInfo.twitter_url || "",
        address_en: contactInfo.address_en || "",
        address_th: contactInfo.address_th || "",
        is_active: contactInfo.is_active !== undefined ? contactInfo.is_active : true,
      })
    }
  }, [contactInfo])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    try {
      const response = await fetch("/api/contact", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to update contact info")
      }

      setMessage({ type: "success", text: "Contact info updated successfully!" })
      
      // Revalidate the data in the hooks
      if (mutate) {
        await mutate()
      }

      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "An error occurred",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="bg-card rounded-lg border border-border p-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Contact Information</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Section */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name_en" className="text-foreground">
                Name (English)
              </Label>
              <Input
                id="name_en"
                name="name_en"
                value={formData.name_en}
                onChange={handleChange}
                className="bg-background border-border"
                placeholder="Your name in English"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name_th" className="text-foreground">
                Name (Thai)
              </Label>
              <Input
                id="name_th"
                name="name_th"
                value={formData.name_th}
                onChange={handleChange}
                className="bg-background border-border"
                placeholder="Your name in Thai"
              />
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="bg-background border-border"
                placeholder="+66 12 345 6789"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-background border-border"
                placeholder="your@email.com"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-2">
            <Label htmlFor="github_url" className="text-foreground">
              GitHub URL
            </Label>
            <Input
              id="github_url"
              name="github_url"
              value={formData.github_url}
              onChange={handleChange}
              className="bg-background border-border"
              placeholder="https://github.com/username"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin_url" className="text-foreground">
              LinkedIn URL
            </Label>
            <Input
              id="linkedin_url"
              name="linkedin_url"
              value={formData.linkedin_url}
              onChange={handleChange}
              className="bg-background border-border"
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="twitter_url" className="text-foreground">
              Twitter URL
            </Label>
            <Input
              id="twitter_url"
              name="twitter_url"
              value={formData.twitter_url}
              onChange={handleChange}
              className="bg-background border-border"
              placeholder="https://twitter.com/username"
            />
          </div>

          {/* Address Section */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="address_en" className="text-foreground">
                Address (English)
              </Label>
              <Input
                id="address_en"
                name="address_en"
                value={formData.address_en}
                onChange={handleChange}
                className="bg-background border-border"
                placeholder="Your address in English"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address_th" className="text-foreground">
                Address (Thai)
              </Label>
              <Input
                id="address_th"
                name="address_th"
                value={formData.address_th}
                onChange={handleChange}
                className="bg-background border-border"
                placeholder="Your address in Thai"
              />
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="is_active"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <Label htmlFor="is_active" className="text-foreground cursor-pointer">
              Active
            </Label>
          </div>

          {/* Messages */}
          {message && (
            <div
              className={`p-4 rounded-lg ${
                message.type === "success"
                  ? "bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                  : "bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
