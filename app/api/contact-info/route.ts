import { sql, type ContactInfo } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const contactInfo = await sql`
      SELECT * FROM contact_info 
      LIMIT 1
    `
    return NextResponse.json(contactInfo[0] as ContactInfo)
  } catch (error) {
    console.error("Error fetching contact info:", error)
    return NextResponse.json(
      { error: "Failed to fetch contact info" },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const {
      id,
      name_en,
      name_th,
      phone,
      email,
      github_url,
      linkedin_url,
      facebook_url,
      address_en,
      address_th,
      is_active,
    } = body

    if (!id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      )
    }

    const result = await sql`
      UPDATE contact_info
      SET name_en = ${name_en || null},
          name_th = ${name_th || null},
          phone = ${phone || null},
          email = ${email || null},
          github_url = ${github_url || null},
          linkedin_url = ${linkedin_url || null},
          facebook_url = ${facebook_url || null},
          address_en = ${address_en || null},
          address_th = ${address_th || null},
          is_active = ${is_active !== undefined ? is_active : true}
      WHERE id = ${id}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Contact info not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Contact info updated successfully",
      data: result[0] as ContactInfo,
    })
  } catch (error) {
    console.error("Error updating contact info:", error)
    return NextResponse.json(
      { error: "Failed to update contact info" },
      { status: 500 }
    )
  }
}
