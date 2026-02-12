import { sql, type Certificates } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const projects = await sql`
      SELECT * FROM certificates
      WHERE is_active = true 
      ORDER BY sort_order ASC
    `
    return NextResponse.json(projects as Certificates[])
  } catch (error) {
    console.error("Error fetching certificates:", error)
    return NextResponse.json(
      { error: "Failed to fetch certificates" },
      { status: 500 }
    )
  }
}
