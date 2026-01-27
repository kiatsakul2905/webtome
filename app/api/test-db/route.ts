import { sql } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const result = await sql`SELECT 1`
    return NextResponse.json({ success: true, result })
  } catch (error) {
    console.error("Database connection failed:", error)
    return NextResponse.json(
      { success: false, error: "Database connection failed" },
      { status: 500 }
    )
  }
}
