-- Portfolio Website Database Schema
-- Compatible with PostgreSQL / Supabase

-- =============================================
-- 1. EXPERIENCES TABLE (ประสบการณ์การทำงาน)
-- =============================================
CREATE TABLE IF NOT EXISTS experiences (
  id SERIAL PRIMARY KEY,
  title_en VARCHAR(255) NOT NULL,
  title_th VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  period_en VARCHAR(100) NOT NULL,
  period_th VARCHAR(100) NOT NULL,
  description_en TEXT NOT NULL,
  description_th TEXT NOT NULL,
  technologies TEXT[] DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 2. EDUCATION TABLE (การศึกษา)
-- =============================================
CREATE TABLE IF NOT EXISTS education (
  id SERIAL PRIMARY KEY,
  degree_en VARCHAR(255) NOT NULL,
  degree_th VARCHAR(255) NOT NULL,
  institution_en VARCHAR(255) NOT NULL,
  institution_th VARCHAR(255) NOT NULL,
  period_en VARCHAR(100) NOT NULL,
  period_th VARCHAR(100) NOT NULL,
  field_en VARCHAR(255) NOT NULL,
  field_th VARCHAR(255) NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 3. SKILL CATEGORIES TABLE (หมวดหมู่ทักษะ)
-- =============================================
CREATE TABLE IF NOT EXISTS skill_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  name_en VARCHAR(100) NOT NULL,
  name_th VARCHAR(100) NOT NULL,
  icon VARCHAR(50),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 4. SKILLS TABLE (ทักษะ)
-- =============================================
CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  category_id INTEGER NOT NULL REFERENCES skill_categories(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  level INTEGER CHECK (level >= 0 AND level <= 100) DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 5. PORTFOLIO PROJECTS TABLE (ผลงาน)
-- =============================================
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id SERIAL PRIMARY KEY,
  title_en VARCHAR(255) NOT NULL,
  title_th VARCHAR(255) NOT NULL,
  description_en TEXT NOT NULL,
  description_th TEXT NOT NULL,
  image_url VARCHAR(500),
  technologies TEXT[] DEFAULT '{}',
  project_link VARCHAR(500),
  github_link VARCHAR(500),
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 6. CONTACT INFO TABLE (ข้อมูลติดต่อ)
-- =============================================
CREATE TABLE IF NOT EXISTS contact_info (
  id SERIAL PRIMARY KEY,
  name_en VARCHAR(255) NOT NULL,
  name_th VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  email VARCHAR(255) NOT NULL,
  github_url VARCHAR(500),
  linkedin_url VARCHAR(500),
  Facebook_url VARCHAR(500),
  address_en TEXT,
  address_th TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 7. CONTACT MESSAGES TABLE (ข้อความติดต่อ)
-- =============================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  replied_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 8. SITE SETTINGS TABLE (การตั้งค่าเว็บไซต์)
-- =============================================
CREATE TABLE IF NOT EXISTS site_settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(100) NOT NULL UNIQUE,
  value_en TEXT,
  value_th TEXT,
  description VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- INDEXES (ดัชนี)
-- =============================================
CREATE INDEX IF NOT EXISTS idx_experiences_sort ON experiences(sort_order);
CREATE INDEX IF NOT EXISTS idx_experiences_active ON experiences(is_active);
CREATE INDEX IF NOT EXISTS idx_education_sort ON education(sort_order);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_featured ON portfolio_projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_portfolio_sort ON portfolio_projects(sort_order);
CREATE INDEX IF NOT EXISTS idx_contact_messages_read ON contact_messages(is_read);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created ON contact_messages(created_at DESC);

-- =============================================
-- UPDATED_AT TRIGGER FUNCTION
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to tables with updated_at
DROP TRIGGER IF EXISTS update_experiences_updated_at ON experiences;
CREATE TRIGGER update_experiences_updated_at
    BEFORE UPDATE ON experiences
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_education_updated_at ON education;
CREATE TRIGGER update_education_updated_at
    BEFORE UPDATE ON education
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_skill_categories_updated_at ON skill_categories;
CREATE TRIGGER update_skill_categories_updated_at
    BEFORE UPDATE ON skill_categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_skills_updated_at ON skills;
CREATE TRIGGER update_skills_updated_at
    BEFORE UPDATE ON skills
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_portfolio_projects_updated_at ON portfolio_projects;
CREATE TRIGGER update_portfolio_projects_updated_at
    BEFORE UPDATE ON portfolio_projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_contact_info_updated_at ON contact_info;
CREATE TRIGGER update_contact_info_updated_at
    BEFORE UPDATE ON contact_info
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;
CREATE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON site_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
