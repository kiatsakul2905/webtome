import { sql } from "./lib/db"

async function insertContactInfo() {
  try {
    const data = {
      name_en: "kiatsakul paiyasen",
      name_th: "เกียรติสกุล ไพยเสน",
      phone: "+66 12 345 6789",
      email: "john.doe@email.com",
      github_url: "https://github.com",
      linkedin_url: "https://linkedin.com",
      twitter_url: "https://twitter.com",
      address_en: null,
      address_th: null,
      is_active: true,
    }

    const result = await sql`
      INSERT INTO contact_info (name_en, name_th, phone, email, github_url, linkedin_url, twitter_url, address_en, address_th, is_active)
      VALUES (${data.name_en}, ${data.name_th}, ${data.phone}, ${data.email}, ${data.github_url}, ${data.linkedin_url}, ${data.twitter_url}, ${data.address_en}, ${data.address_th}, ${data.is_active})
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
