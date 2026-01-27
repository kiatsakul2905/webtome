import { sql, type Education } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const education = await sql`
      SELECT * FROM education 
      WHERE is_active = true 
      ORDER BY sort_order ASC
    `
    return NextResponse.json(education as Education[])
  } catch (error) {
    console.error("Error fetching education:", error)
    return NextResponse.json(
      { error: "Failed to fetch education" },
      { status: 500 }
    )
  }
}
