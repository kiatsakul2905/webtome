import { sql, type PortfolioProject } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const projects = await sql`
      SELECT * FROM portfolio_projects 
      WHERE is_active = true 
      ORDER BY sort_order ASC
    `
    return NextResponse.json(projects as PortfolioProject[])
  } catch (error) {
    console.error("Error fetching portfolio:", error)
    return NextResponse.json(
      { error: "Failed to fetch portfolio" },
      { status: 500 }
    )
  }
}
