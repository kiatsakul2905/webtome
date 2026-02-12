import { sql } from "./lib/db"

async function insertContactInfo() {
  try {
    const data = {
      name_en: "kiatsakul paiyasen",
      name_th: "เกียรติสกุล ไพยเสน",
      phone: "063-973-0076",
      email: "kiasakul2905@email.com",
      github_url: "https://github.com",
      linkedin_url: "https://linkedin.com",
      facebook_url: "https://facebook.com",
      address_en: null,
      address_th: null,
      is_active: true,
    }

    const result = await sql`
      INSERT INTO contact_info (name_en, name_th, phone, email, github_url, linkedin_url, facebook_url, address_en, address_th, is_active)
      VALUES (${data.name_en}, ${data.name_th}, ${data.phone}, ${data.email}, ${data.github_url}, ${data.linkedin_url}, ${data.facebook_url}, ${data.address_en}, ${data.address_th}, ${data.is_active})
      RETURNING *
    `

    console.log("✅ Contact info inserted successfully!")
    console.log(JSON.stringify(result[0], null, 2))
  } catch (error) {
    console.error("❌ Error inserting contact info:", error)
    process.exit(1)
  }
}

insertContactInfo()
