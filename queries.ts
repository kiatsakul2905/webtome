import { sql } from "./lib/db";
import type {
  Experience,
  Education,
  PortfolioProject,
  Certificates,
  ContactInfo,
  SkillCategory,
  Skill,
} from "./lib/db";

export async function getExperiences() {
  try {
    const rows = await sql`
      SELECT * FROM experiences 
      WHERE is_visible = true 
      ORDER BY sort_order ASC
    `;
    return rows as Experience[];
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return [];
  }
}

export async function getEducation() {
  try {
    const rows = await sql`
      SELECT * FROM education 
      WHERE is_visible = true 
      ORDER BY sort_order ASC
    `;
    return rows as Education[];
  } catch (error) {
    console.error("Error fetching education:", error);
    return [];
  }
}

export async function getPortfolioProjects() {
  try {
    const rows = await sql`
      SELECT * FROM portfolio_projects 
      WHERE is_visible = true 
      ORDER BY sort_order ASC
    `;
    return rows as PortfolioProject[];
  } catch (error) {
    console.error("Error fetching portfolio projects:", error);
    return [];
  }
}

export async function getContactInfo() {
  try {
    const rows = await sql`SELECT * FROM contact_info LIMIT 1`;
    return rows.length > 0 ? (rows[0] as ContactInfo) : null;
  } catch (error) {
    console.error("Error fetching contact info:", error);
    return null;
  }
}

export type SkillGroup = SkillCategory & { skills: Skill[] };

export async function getSkills() {
  try {
    // ดึงข้อมูลหมวดหมู่และทักษะพร้อมกัน (Parallel)
    const [categories, skills] = await Promise.all([
      sql`SELECT * FROM skill_categories ORDER BY sort_order ASC`,
      sql`SELECT * FROM skills ORDER BY sort_order ASC`,
    ]);

    // จับคู่ทักษะเข้ากับหมวดหมู่
    const groupedSkills: SkillGroup[] = (categories as SkillCategory[]).map((category) => ({
      ...category,
      skills: (skills as Skill[]).filter((skill) => skill.category_id === category.id),
    }));

    return groupedSkills;
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
}

export async function getCertificates() {
  try {
    const rows = await sql`
      SELECT * FROM certificates
      WHERE is_visible = true 
      ORDER BY sort_order ASC
    `;
    return rows as PortfolioProject[];
  } catch (error) {
    console.error("Error fetching certificates:", error);
    return [];
  }
}