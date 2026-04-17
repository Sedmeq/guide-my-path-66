export interface Career {
  id: string;
  title: string;
  emoji: string;
  description: string;
  matchPercentage: number;
  requiredSkills: string[];
  avgSalary: string;
  growth: string;
  whyRecommended: string;
}

export interface SkillProfile {
  name: string;
  level: number;
  maxLevel: number;
  category: string;
}

export interface LearningStep {
  id: string;
  title: string;
  type: "course" | "project" | "certification";
  duration: string;
  completed: boolean;
  provider?: string;
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  matchReason: string;
}

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  type: "internship" | "job" | "volunteer";
  location: string;
  matchPercentage: number;
}

export const careers: Career[] = [
  {
    id: "ux-designer",
    title: "UX Dizayner",
    emoji: "🎨",
    description: "İstifadəçiləri sevindirən intuitiv rəqəmsal təcrübələr dizayn edin",
    matchPercentage: 94,
    requiredSkills: ["İstifadəçi Araşdırması", "Prototipləşdirmə", "Vizual Dizayn", "Empatiya", "Ünsiyyət"],
    avgSalary: "İllik $85,000",
    growth: "2030-cu ilə qədər +13%",
    whyRecommended: "Güclü yaradıcı düşüncəniz və empatiya bacarıqlarınız analitik qabiliyyətlərinizlə birlikdə UX dizaynını sizin üçün ideal seçim edir.",
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    emoji: "📊",
    description: "Biznes qərarlarını dəstəkləmək üçün məlumatlardan dəyərli nəticələr çıxarın",
    matchPercentage: 87,
    requiredSkills: ["Python", "Statistika", "Maşın Öyrənməsi", "SQL", "Məlumatların Vizualizasiyası"],
    avgSalary: "İllik $120,000",
    growth: "2030-cu ilə qədər +36%",
    whyRecommended: "Məntiqi düşünmə və problem həll etmə bacarıqlarınız data elminin tələbləri ilə yüksək uyğunluq göstərir.",
  },
  {
    id: "product-manager",
    title: "Product Manager",
    emoji: "🚀",
    description: "Məhsul strategiyasını idarə edin və biznes ilə texnologiyanı birləşdirin",
    matchPercentage: 82,
    requiredSkills: ["Strategiya", "Ünsiyyət", "Analitika", "Liderlik", "Texniki Bilik"],
    avgSalary: "İllik $110,000",
    growth: "2030-cu ilə qədər +10%",
    whyRecommended: "Liderlik, ünsiyyət və analitik bacarıqlarınızın balansı sizi güclü məhsul menecerinə çevirir.",
  },
  {
    id: "software-engineer",
    title: "Proqram Təminatı Mühəndisi",
    emoji: "💻",
    description: "Gələcəyin rəqəmsal məhsullarını və platformalarını yaradın",
    matchPercentage: 78,
    requiredSkills: ["Proqramlaşdırma", "Sistem Dizaynı", "Problemlərin Həlli", "Komanda işi", "Alqoritmlər"],
    avgSalary: "İllik $115,000",
    growth: "2030-cu ilə qədər +25%",
    whyRecommended: "Məntiqi və sistemli düşüncə tərziniz mühəndislik sahəsində uğur qazanmaq potensialınızı göstərir.",
  },
];

export const userSkills: SkillProfile[] = [
  { name: "Yaradıcı Düşüncə", level: 85, maxLevel: 100, category: "Yaradıcı" },
  { name: "Problemlərin Həlli", level: 78, maxLevel: 100, category: "Analitik" },
  { name: "Ünsiyyət", level: 72, maxLevel: 100, category: "Sosial" },
  { name: "Liderlik", level: 65, maxLevel: 100, category: "Sosial" },
  { name: "Texniki Bacarıq", level: 70, maxLevel: 100, category: "Texniki" },
  { name: "Empatiya", level: 88, maxLevel: 100, category: "Sosial" },
  { name: "Analitik Düşüncə", level: 74, maxLevel: 100, category: "Analitik" },
  { name: "Uyğunlaşma", level: 80, maxLevel: 100, category: "Şəxsi" },
];

export const learningPath: LearningStep[] = [
  { id: "1", title: "UX Əsasları", type: "course", duration: "4 həftə", completed: true, provider: "Coursera" },
  { id: "2", title: "İstifadəçi Araşdırması Metodları", type: "course", duration: "3 həftə", completed: true, provider: "Google" },
  { id: "3", title: "Figma üzrə Masterklass", type: "course", duration: "6 həftə", completed: false, provider: "Udemy" },
  { id: "4", title: "Mobil Tətbiq Dizaynı Layihəsi", type: "project", duration: "2 həftə", completed: false },
  { id: "5", title: "İnteraktiv Dizayn", type: "course", duration: "5 həftə", completed: false, provider: "Coursera" },
  { id: "6", title: "Google UX Sertifikatı", type: "certification", duration: "6 ay", completed: false, provider: "Google" },
];

export const mentors: Mentor[] = [
  { id: "1", name: "Sarah Chen", role: "Baş UX Dizayner", company: "Google", avatar: "SC", matchReason: "Sizin əsas karyera istiqamətinizə uyğun sahədə mütəxəssisdir" },
  { id: "2", name: "Ahmed Hassan", role: "Məhsul Rəhbəri", company: "Spotify", avatar: "AH", matchReason: "Yaradıcı və analitik profilinizə uyğundur" },
  { id: "3", name: "Maya Johnson", role: "Data Alimi", company: "Netflix", avatar: "MJ", matchReason: "Analitik inkişafınıza dəstək ola bilər" },
];

export const opportunities: Opportunity[] = [
  { id: "1", title: "UX Dizayn Təcrübəçisi", company: "Figma", type: "internship", location: "Məsafədən", matchPercentage: 95 },
  { id: "2", title: "Junior Məhsul Dizayneri", company: "Shopify", type: "job", location: "Toronto, Kanada", matchPercentage: 88 },
  { id: "3", title: "Sosial Layihələr üçün Dizayn", company: "UNICEF", type: "volunteer", location: "Məsafədən", matchPercentage: 82 },
];

export interface AssessmentQuestion {
  id: number;
  type: "scenario" | "preference" | "challenge";
  question: string;
  emoji: string;
  options: { text: string; traits: Record<string, number> }[];
}

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 1,
    type: "scenario",
    emoji: "🏝️",
    question: "Komandanızla birlikdə kimsəsiz bir adada qalmısınız. İlk olaraq nə edirsiniz?",
    options: [
      { text: "Adanın xəritəsini çıxarıb sağ qalma planı qururam", traits: { analytical: 3, leadership: 2 } },
      { text: "Sığınacaq tikirəm — praktik olmaq lazımdır", traits: { technical: 3, adaptability: 2 } },
      { text: "Hamının vəziyyətini yoxlayıram", traits: { empathy: 3, communication: 2 } },
      { text: "Yaradıcı qaçış planları düşünürəm", traits: { creative: 3, problemSolving: 2 } },
    ],
  },
  {
    id: 2,
    type: "preference",
    emoji: "🎯",
    question: "Şənbə səhəridir. Səni daha çox nə həyəcanlandırır?",
    options: [
      { text: "Gözəl bir dizayn yaratmaq", traits: { creative: 3, empathy: 1 } },
      { text: "Çətin bir tapmaca həll etmək", traits: { analytical: 3, problemSolving: 2 } },
      { text: "Komanda görüşü təşkil etmək", traits: { leadership: 2, communication: 3 } },
      { text: "Yeni texnoloji bacarıq öyrənmək", traits: { technical: 3, adaptability: 2 } },
    ],
  },
  {
    id: 3,
    type: "scenario",
    emoji: "🚀",
    question: "Startapınız maliyyə əldə etdi. Hansı rolu götürərdiniz?",
    options: [
      { text: "Strategiyanı müəyyən edən lider", traits: { leadership: 3, creative: 2 } },
      { text: "Prototipi hazırlayan proqramçı", traits: { technical: 3, problemSolving: 2 } },
      { text: "Dizaynı hazırlayan şəxs", traits: { creative: 3, empathy: 2 } },
      { text: "Məlumatları analiz edən analitik", traits: { analytical: 3, communication: 1 } },
    ],
  },
  {
    id: 4,
    type: "challenge",
    emoji: "⏱️",
    question: "Son tarix sabahdır və plan pozulub. Nə edirsiniz?",
    options: [
      { text: "Sakit qalaraq planı yenidən qururam", traits: { adaptability: 3, analytical: 2 } },
      { text: "Komandanı toplayıb işləri bölürəm", traits: { leadership: 3, communication: 2 } },
      { text: "Yaradıcı çıxış yolu tapıram", traits: { creative: 2, problemSolving: 3 } },
      { text: "Təkbaşına problemi həll edirəm", traits: { technical: 2, adaptability: 2 } },
    ],
  },
  {
    id: 5,
    type: "preference",
    emoji: "🌟",
    question: "Sənin üçün ən vacib təsir hansıdır?",
    options: [
      { text: "İnsanların həyatını yaxşılaşdırmaq", traits: { empathy: 3, creative: 2 } },
      { text: "Məlumatlarda qanunauyğunluqları tapmaq", traits: { analytical: 3, technical: 2 } },
      { text: "Komandanı uğura aparmaq", traits: { leadership: 3, communication: 2 } },
      { text: "Sıfırdan nəsə yaratmaq", traits: { technical: 3, problemSolving: 2 } },
    ],
  },
  {
    id: 6,
    type: "scenario",
    emoji: "🎨",
    question: "Məktəbin veb saytını yenidən dizayn edirsən. İlk olaraq nə edirsən?",
    options: [
      { text: "Tələbələrlə müsahibə aparıram", traits: { empathy: 3, communication: 2 } },
      { text: "Yeni dizayn maketləri hazırlayıram", traits: { creative: 3, empathy: 1 } },
      { text: "Məlumatları analiz edirəm", traits: { analytical: 3, technical: 1 } },
      { text: "Tez bir prototip hazırlayıram", traits: { technical: 3, problemSolving: 2 } },
    ],
  },
];