import { sql, type SkillCategory, type Skill } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const categories = await sql`
      SELECT * FROM skill_categories 
      WHERE is_active = true
      ORDER BY sort_order ASC
    ` as SkillCategory[]

    const skills = await sql`
      SELECT * FROM skills 
      WHERE is_active = true
      ORDER BY sort_order ASC
    ` as Skill[]

    // Group skills by category
    const result = categories.map((category) => ({
      ...category,
      skills: skills.filter((skill) => skill.category_id === category.id),
    }))

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching skills:", error)
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    )
  }
}
