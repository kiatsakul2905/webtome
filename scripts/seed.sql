-- Portfolio Website Seed Data
-- Run this after schema.sql to populate initial data

-- =============================================
-- EXPERIENCES DATA
-- =============================================
INSERT INTO experiences (title_en, title_th, company, period_en, period_th, description_en, description_th, technologies, sort_order) VALUES
(
  'Senior Frontend Developer',
  'Senior Frontend Developer',
  'Tech Corp',
  '2022 - Present',
  '2565 - ปัจจุบัน',
  'Lead the frontend development team, building scalable web applications using React and Next.js. Implemented design systems and improved performance by 40%.',
  'เป็นผู้นำทีมพัฒนา Frontend สร้างเว็บแอปพลิเคชันที่รองรับการขยายตัวด้วย React และ Next.js ออกแบบระบบและปรับปรุงประสิทธิภาพได้ 40%',
  ARRAY['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  1
),
(
  'Full Stack Developer',
  'Full Stack Developer',
  'Digital Agency',
  '2020 - 2022',
  '2563 - 2565',
  'Developed full-stack applications for various clients. Built RESTful APIs, implemented authentication systems, and created responsive user interfaces.',
  'พัฒนาแอปพลิเคชัน Full-stack สำหรับลูกค้าหลากหลาย สร้าง RESTful APIs ระบบยืนยันตัวตน และ UI ที่ตอบสนองทุกขนาดหน้าจอ',
  ARRAY['Node.js', 'Express', 'MongoDB', 'Vue.js'],
  2
),
(
  'Junior Web Developer',
  'Junior Web Developer',
  'Startup Inc',
  '2018 - 2020',
  '2561 - 2563',
  'Started my career building websites and web applications. Learned best practices in code quality, testing, and agile development.',
  'เริ่มต้นอาชีพด้วยการสร้างเว็บไซต์และเว็บแอปพลิเคชัน เรียนรู้แนวทางปฏิบัติที่ดีในคุณภาพโค้ด การทดสอบ และการพัฒนาแบบ Agile',
  ARRAY['HTML', 'CSS', 'JavaScript', 'PHP'],
  3
);

-- =============================================
-- EDUCATION DATA
-- =============================================
INSERT INTO education (degree_en, degree_th, institution_en, institution_th, period_en, period_th, field_en, field_th, sort_order) VALUES
(
  'Master of Computer Science',
  'วิทยาศาสตรมหาบัณฑิต สาขาวิทยาการคอมพิวเตอร์',
  'Stanford University',
  'มหาวิทยาลัยสแตนฟอร์ด',
  '2016 - 2018',
  '2559 - 2561',
  'Software Engineering',
  'วิศวกรรมซอฟต์แวร์',
  1
),
(
  'Bachelor of Science in Computer Science',
  'วิทยาศาสตรบัณฑิต สาขาวิทยาการคอมพิวเตอร์',
  'Chulalongkorn University',
  'จุฬาลงกรณ์มหาวิทยาลัย',
  '2012 - 2016',
  '2555 - 2559',
  'Computer Science',
  'วิทยาการคอมพิวเตอร์',
  2
);

-- =============================================
-- SKILL CATEGORIES DATA
-- =============================================
INSERT INTO skill_categories (name, name_en, name_th, icon, sort_order) VALUES
('frontend', 'Frontend', 'ฟรอนท์เอนด์', 'Monitor', 1),
('backend', 'Backend', 'แบ็คเอนด์', 'Server', 2),
('tools', 'Tools & DevOps', 'เครื่องมือ & DevOps', 'Wrench', 3);

-- =============================================
-- SKILLS DATA
-- =============================================
-- Frontend Skills
INSERT INTO skills (category_id, name, level, sort_order) VALUES
((SELECT id FROM skill_categories WHERE name = 'frontend'), 'HTML/CSS', 95, 1),
((SELECT id FROM skill_categories WHERE name = 'frontend'), 'JavaScript', 90, 2),
((SELECT id FROM skill_categories WHERE name = 'frontend'), 'TypeScript', 85, 3),
((SELECT id FROM skill_categories WHERE name = 'frontend'), 'React', 90, 4),
((SELECT id FROM skill_categories WHERE name = 'frontend'), 'Next.js', 85, 5),
((SELECT id FROM skill_categories WHERE name = 'frontend'), 'Vue.js', 75, 6),
((SELECT id FROM skill_categories WHERE name = 'frontend'), 'Tailwind CSS', 90, 7);

-- Backend Skills
INSERT INTO skills (category_id, name, level, sort_order) VALUES
((SELECT id FROM skill_categories WHERE name = 'backend'), 'Node.js', 85, 1),
((SELECT id FROM skill_categories WHERE name = 'backend'), 'Express', 80, 2),
((SELECT id FROM skill_categories WHERE name = 'backend'), 'Python', 75, 3),
((SELECT id FROM skill_categories WHERE name = 'backend'), 'PostgreSQL', 80, 4),
((SELECT id FROM skill_categories WHERE name = 'backend'), 'MongoDB', 75, 5),
((SELECT id FROM skill_categories WHERE name = 'backend'), 'Firebase', 80, 6),
((SELECT id FROM skill_categories WHERE name = 'backend'), 'Supabase', 75, 7);

-- Tools Skills
INSERT INTO skills (category_id, name, level, sort_order) VALUES
((SELECT id FROM skill_categories WHERE name = 'tools'), 'Git', 90, 1),
((SELECT id FROM skill_categories WHERE name = 'tools'), 'Docker', 70, 2),
((SELECT id FROM skill_categories WHERE name = 'tools'), 'AWS', 65, 3),
((SELECT id FROM skill_categories WHERE name = 'tools'), 'Figma', 80, 4),
((SELECT id FROM skill_categories WHERE name = 'tools'), 'VS Code', 95, 5),
((SELECT id FROM skill_categories WHERE name = 'tools'), 'Linux', 75, 6);

-- =============================================
-- PORTFOLIO PROJECTS DATA
-- =============================================
INSERT INTO portfolio_projects (title_en, title_th, description_en, description_th, image_url, technologies, project_link, is_featured, sort_order) VALUES
(
  'E-Commerce Platform',
  'แพลตฟอร์มอีคอมเมิร์ซ',
  'A full-featured e-commerce platform with product management, cart functionality, and payment integration.',
  'แพลตฟอร์มอีคอมเมิร์ซครบวงจร พร้อมการจัดการสินค้า ตะกร้าสินค้า และการชำระเงิน',
  '/projects/ecommerce.jpg',
  ARRAY['Next.js', 'Stripe', 'Prisma', 'PostgreSQL'],
  '#',
  true,
  1
),
(
  'Task Management App',
  'แอปจัดการงาน',
  'A collaborative task management application with real-time updates, team features, and progress tracking.',
  'แอปพลิเคชันจัดการงานแบบร่วมมือ พร้อมการอัปเดตแบบเรียลไทม์ ฟีเจอร์ทีม และการติดตามความคืบหน้า',
  '/projects/taskapp.jpg',
  ARRAY['React', 'Firebase', 'Tailwind CSS', 'Redux'],
  '#',
  true,
  2
),
(
  'Portfolio Website',
  'เว็บไซต์พอร์ตโฟลิโอ',
  'A modern portfolio website with dark/light theme, multi-language support, and responsive design.',
  'เว็บไซต์พอร์ตโฟลิโอสมัยใหม่ พร้อมธีมมืด/สว่าง รองรับหลายภาษา และดีไซน์ตอบสนอง',
  '/projects/portfolio.jpg',
  ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  '#',
  false,
  3
),
(
  'Weather Dashboard',
  'แดชบอร์ดพยากรณ์อากาศ',
  'A weather dashboard that displays real-time weather data with beautiful visualizations and forecasts.',
  'แดชบอร์ดสภาพอากาศที่แสดงข้อมูลแบบเรียลไทม์ พร้อมการแสดงผลที่สวยงามและการพยากรณ์',
  '/projects/weather.jpg',
  ARRAY['React', 'Chart.js', 'OpenWeather API', 'CSS Modules'],
  '#',
  false,
  4
),
(
  'Social Media App',
  'แอปโซเชียลมีเดีย',
  'A social media application with user profiles, posts, comments, and real-time messaging.',
  'แอปพลิเคชันโซเชียลมีเดียพร้อมโปรไฟล์ผู้ใช้ โพสต์ คอมเมนต์ และการส่งข้อความแบบเรียลไทม์',
  '/projects/social.jpg',
  ARRAY['Next.js', 'Supabase', 'Tailwind CSS', 'Socket.io'],
  '#',
  true,
  5
),
(
  'AI Chat Assistant',
  'ผู้ช่วยแชท AI',
  'An AI-powered chat assistant with natural language processing and contextual understanding.',
  'ผู้ช่วยแชทที่ขับเคลื่อนด้วย AI พร้อมการประมวลผลภาษาธรรมชาติและความเข้าใจบริบท',
  '/projects/aichat.jpg',
  ARRAY['Next.js', 'OpenAI API', 'Vercel AI SDK', 'Tailwind CSS'],
  '#',
  true,
  6
);

-- =============================================
-- CONTACT INFO DATA
-- =============================================
INSERT INTO contact_info (name_en, name_th, phone, email, github_url, linkedin_url, Facebook_url) VALUES
(
  'kiatsakul paiyasen',
  'เกียรติสกุลไพยเสน',
  '+66 12 345 6789',
  'john.doe@email.com',
  'https://github.com',
  'https://linkedin.com',
  'https://Facebook.com'
);

-- =============================================
-- SITE SETTINGS DATA
-- =============================================
INSERT INTO site_settings (key, value_en, value_th, description) VALUES
('site_title', 'John Doe | Full Stack Developer', 'จอห์น โด | Full Stack Developer', 'Website title'),
('site_description', 'Personal portfolio showcasing my work and skills as a Full Stack Developer', 'พอร์ตโฟลิโอส่วนตัวแสดงผลงานและทักษะในฐานะ Full Stack Developer', 'Meta description'),
('hero_greeting', 'Hello, I''m', 'สวัสดี, ผมคือ', 'Hero section greeting'),
('hero_description', 'Passionate about creating beautiful, functional, and user-friendly web applications. With expertise in modern technologies, I bring ideas to life through clean code and thoughtful design.', 'หลงใหลในการสร้างเว็บแอปพลิเคชันที่สวยงาม ใช้งานได้ดี และเป็นมิตรกับผู้ใช้ ด้วยความเชี่ยวชาญในเทคโนโลยีสมัยใหม่ ผมทำให้ไอเดียเป็นจริงผ่านโค้ดที่สะอาดและการออกแบบที่รอบคอบ', 'Hero section description');
