import { sql, type SiteSettings } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const settings = await sql`
      SELECT * FROM site_settings 
      LIMIT 1
    `
    return NextResponse.json(settings[0] as SiteSettings)
  } catch (error) {
    console.error("Error fetching site settings:", error)
    return NextResponse.json(
      { error: "Failed to fetch site settings" },
      { status: 500 }
    )
  }
}
