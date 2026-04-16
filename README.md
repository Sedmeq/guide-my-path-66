# 🧭 Guide My Path

> **Daha düzgün qərarlar, daha uğurlu karyera!**
> "Guide My Path" gənclərə və karyerasını dəyiştirmək və ya istiqamətləndirmək istəyən hər kəsə kömək edən müasir, interaktiv karyera bələdçisi platformasıdır.

Bu layihə istifadəçiləri analiz edən, onlara uyğun karyera yollarını təklif edən, Süni İntellekt dəstəyi ilə CV-lərini yoxlayan və öyrənmə prosesini oyunlaşdıran tam bir ekosistem kimi dizayn edilmişdir. Xüsusilə hakatonlar və startap yarışmaları üçün ideallaşdırılmışdır.

---

## 🌟 Əsas Xüsusiyyətlər (Key Features)

- **📊 İnteraktiv Dashboard:** İstifadəçinin fəaliyyətini izləyə biləcəyi, qərar qəbuletmə prosesini asanlaşdıran mərkəzi panel.
- **📝 Qabiliyyət və Qiymətləndirmə (Assessment):** İstifadəçilərin şəxsi keyfiyyətləri və bacarıqlarını tapmaq üçün test və qiymətləndirmə sistemi.
- **🤖 AI dəstəkli CV Yoxlama (CV Review):** İstifadəçi CV-sini (PDF formatında) sistemə yükləyir. Süni intellekt (AI) CV-ni bir HR zəkasında analiz edir, zəif tərəflərini göstərir və təkmilləşdirilməsi üçün tövsiyələr verir. (Məsələn: OpenRouter API vasitəsilə)
- **💼 Karyera Kəşfi (Careers):** Fərqli sahələr (məsələn, İT, Dizayn, Marketinq) üzrə karyera məlumatları, tələb olunan bacarıqlar və gələcək imkanlarına aid məlumatlar toplusu.
- **🎓 Oyunlaşdırılmış Öyrənmə (Games & Learning):** Öyrənmə prosesini əyləncəli və effektiv etmək üçün kiçik oyunlar, interaktiv quizlər və inkişaf resursları.

---

## 🛠 Texnologiya Steki (Tech Stack)

Bu layihə ən müasir web texnologiyalarından istifadə edilərək qurulub:

- **Frontend Framework:** [React 18](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/) (Çox sürətli layihə qurucusu)
- **Dil:** [TypeScript](https://www.typescriptlang.org/) (Tip təhlükəsizliyi üçün)
- **Stil və Dizayn:** [Tailwind CSS](https://tailwindcss.com/) (Utility-first CSS)
- **UI Komponentləri:** [shadcn/ui](https://ui.shadcn.com/) və [Radix UI](https://www.radix-ui.com/) (Açıq mənbəli, əlçatan UI komponentləri)
- **İkonlar:** [Lucide React](https://lucide.dev/)
- **Routing:** [React Router v6](https://reactrouter.com/) (Səhifələrarası keçidlər üçün)
- **Animasiyalar:** [Framer Motion](https://www.framer.com/motion/)

---

## 🚀 Quraşdırma və İşə Salma (Getting Started)

Proyekti öz kompüterinizdə (local mühitdə) işə salmaq üçün aşağıdakı addımları izləyin.

### Tələb olunanlar
- **Node.js** (v18 və ya daha yuxarı)
- **npm** və ya **bun** paket meneceri

### Qurulum

1. **Repozitoriyanı klonlayın və qovluğa daxil olun:**
   ```bash
   git clone <repo-url>
   cd guide-my-path-66
   ```

2. **Asılılıqları (dependencies) yükləyin:**
   Əgər `npm` istifadə edirsinizsə:
   ```bash
   npm install
   ```
   Əgər `bun` istifadə edirsinizsə:
   ```bash
   bun install
   ```

3. **Mühit dəyişənlərini ayarlayın (.env):**
   Ana qovluqda mövcud `.env` faylınızdakı lazımi AI API açarlarını (məsələn AI CV analiz üçün OpenRouter API açarı) qeyd edin.

   *Nümunə `.env` daxili:*
   ```env
   VITE_OPENROUTER_API_KEY=sizin_api_acariniz
   ```

4. **Layihəni işə salın:**
   ```bash
   npm run dev
   # və ya
   bun run dev
   ```

5. **Brauzerdə açın:**
   Terminalda göstərilən linkə (adətən `http://localhost:5173`) keçid edərək platformaya baxa bilərsiniz.

---

## 📁 Layihə Strukturu

\`\`\`text
src/
├── components/     # Təkrar istifadə oluna bilən UI komponentləri (düymələr, kartlar, modal-lar)
├── hooks/          # Xüsusi (Custom) React Hook-ları
├── lib/            # Köməkçi funksiyalar və shadcn ui utility faylları (utils.ts)
├── pages/          # Əsas tətbiq səhifələri
│   ├── Assessment.tsx # Qabiliyyət testi səhifəsi
│   ├── Careers.tsx    # Karyera kəşfi səhifəsi
│   ├── CVReview.tsx   # AI ilə CV Analiz səhifəsi
│   ├── Dashboard.tsx  # Əsas idarəetmə paneli
│   ├── Games.tsx      # Oyunlaşdırılmış öyrənmə
│   ├── Learning.tsx   # Təhsil materialları və quizlər
│   ├── Index.tsx      # Landing (Giriş) səhifəsi
│   └── NotFound.tsx   # 404 xəta səhifəsi
├── App.tsx         # Əsas komponent və reytinqlərin tranziti
├── index.css       # Qlobal Tailwind və mövzu rəngləri konfiqurasiyası
└── main.tsx        # React Render giriş nöqtəsi
\`\`\`

---

## 🎯 Gələcək Planlar (Roadmap)

- [ ] İstifadəçi profillərinin Backend (Məlumat bazası) dəstəyi ilə tam daimi yaddaşda saxlanılması (Node.js/Firebase və s.)
- [ ] Daha mürəkkəb oyunların əlavə edilməsi və Liderlər lövhəsi (Leaderboard).
- [ ] Səsli və Video formatında AI "Mock Interview" (sınaq müsahibə) simulyasiyası.
- [ ] Birbaşa Şirkətlər və İnsan Resursları ilə inteqrasiya (HR Dashboard).

---

**Layihə Xüsusi Olaraq Hakatonlar Üçün Hazırlanmışdır** 💡
Hər hansı bir çətinlik çəksəniz Issues bölməsində yaza bilərsiniz. Təşəkkürlər!
