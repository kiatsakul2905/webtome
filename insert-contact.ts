import { sql } from "./lib/db"

async function insertContactInfo() {
  try {
    const data = {
      name_en: "kiatsakul paiyasen",
      name_th: "เกียรติสกุล ไพยเสน",
      phone: "063-973-0076",
      email: "kiasakul2905@email.com",
      github_url: "https://github.com/kiatsakul2905",
      linkedin_url: "https://www.linkedin.com/in/%E0%B8%98%E0%B8%99%E0%B8%A7-%E0%B8%99%E0%B8%A8%E0%B8%97-%E0%B9%80%E0%B8%81%E0%B8%B5%E0%B8%A2%E0%B8%A3%E0%B8%95%E0%B8%B4%E0%B8%AA%E0%B8%81%E0%B8%B8%E0%B8%A5-%E0%B9%84%E0%B8%9E%E0%B8%A2%E0%B9%80%E0%B8%AA%E0%B8%99-805b943a8/",
      facebook_url: "https://www.facebook.com/kiatsakul.paiyasen?locale=th_TH",
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
