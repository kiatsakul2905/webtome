import { sql, type Experience } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const experiences = await sql`
      SELECT * FROM experiences 
      WHERE is_active = true 
      ORDER BY sort_order ASC
    `
    return NextResponse.json(experiences as Experience[])
  } catch (error) {
    console.error("Error fetching experiences:", error)
    return NextResponse.json(
      { error: "Failed to fetch experiences" },
      { status: 500 }
    )
  }
}
