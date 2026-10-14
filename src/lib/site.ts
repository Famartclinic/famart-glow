export const SITE = {
  name: "Famart Healthcare Medical and Skin Clinic",
  shortName: "Famart Healthcare",
  tagline: "Medical and Skin Clinic",
  phone: "+254708931682",
  phoneDisplay: "+254 708 931 682",
  phoneAlt: "+254747077433",
  phoneAltDisplay: "+254 747 077 433",
  whatsapp: "254725077433",
  email: "info@famarthealthcare.co.ke",
  address: "Nairobi Pipeline, opposite Honeysuckle Gardens Estate",
  city: "Nairobi",
  country: "Kenya",
  hours: "Monday – Friday, 9:00 AM – 5:00 PM",
  mapsQuery: "Honeysuckle+Gardens+Estate+Pipeline+Nairobi+Kenya",
} as const;

export const waLink = (message = "Hello Famart Healthcare, I would like to book an appointment.") =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;

/** Bare WhatsApp link with no prefilled text — always safe to open. */
export const waPlainLink = `https://wa.me/${SITE.whatsapp}`;

/** Builds a clean, readable booking message. */
export const bookingMessage = (d: {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  date?: string;
  time?: string;
  message?: string;
}) => {
  const lines = [
    "Hello Famart Healthcare, I would like to book an appointment.",
    "",
    d.name ? `Name: ${d.name}` : "",
    d.phone ? `Phone: ${d.phone}` : "",
    d.email ? `Email: ${d.email}` : "",
    d.service ? `Service: ${d.service}` : "",
    d.date ? `Preferred date: ${d.date}` : "",
    d.time ? `Preferred time: ${d.time}` : "",
    d.message ? `Message: ${d.message}` : "",
  ].filter(Boolean);
  return lines.join("\n");
};

/**
 * Opens WhatsApp with the prefilled message. If the message cannot be
 * prefilled (encoding issue, over-long URL, blocked popup), it falls back to a
 * clean chat window so the patient is never left stranded.
 */
export const openWhatsApp = (message?: string): { prefilled: boolean } => {
  const open = (url: string) => {
    const w = typeof window !== "undefined" ? window.open(url, "_blank", "noopener") : null;
    if (!w && typeof window !== "undefined") window.location.href = url;
    return true;
  };

  if (message) {
    try {
      const url = waLink(message);
      if (url.length <= 1800) {
        open(url);
        return { prefilled: true };
      }
    } catch {
      /* fall through to the plain link */
    }
  }
  open(waPlainLink);
  return { prefilled: false };
};

export const telLink = `tel:${SITE.phone}`;
export const telLinkAlt = `tel:${SITE.phoneAlt}`;

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${SITE.mapsQuery}`;

export type Service = {
  slug: string;
  name: string;
  icon: string;
  desc: string;
  /**
   * Photo served from `public/images/services`. Omit it and the service falls
   * back to on-brand artwork, so the site stays complete while photos are added.
   */
  image?: string;
  /** Describes the photo for screen readers and search engines. */
  imageAlt?: string;
};

export const services: Service[] = [
  { slug: "acne-treatment", name: "Acne Treatment", icon: "Sparkles", desc: "Targeted medical therapy for acne, breakouts and post-acne scarring." },
  {
    slug: "eczema-management",
    name: "Eczema Management",
    icon: "Droplets",
    desc: "Long-term relief plans for dry, itchy and inflamed eczema-prone skin.",
    image: "/images/services/eczema-management.jpg",
    imageAlt:
      "Close-up of thickened, hyperpigmented eczema skin on a patient's leg before treatment at Famart Healthcare.",
  },
  { slug: "psoriasis-treatment", name: "Psoriasis Treatment", icon: "ShieldPlus", desc: "Evidence-based control of plaques, flares and scalp psoriasis." },
  { slug: "skin-allergy-treatment", name: "Skin Allergy Treatment", icon: "AlertCircle", desc: "Identify triggers and calm hives, contact dermatitis and reactions." },
  { slug: "fungal-skin-infections", name: "Fungal Skin Infections", icon: "Bug", desc: "Accurate diagnosis and treatment of ringworm, tinea and yeast infections." },
  { slug: "skin-rash-diagnosis", name: "Skin Rash Diagnosis", icon: "Search", desc: "Clear answers for unexplained rashes with a thorough clinical review." },
  { slug: "pigmentation-disorders", name: "Pigmentation Disorders", icon: "Palette", desc: "Care for melasma, dark spots, hyperpigmentation and uneven tone." },
  { slug: "skin-consultation", name: "Skin Consultation", icon: "Stethoscope", desc: "One-on-one assessment with a personalised skin care plan." },
  { slug: "general-dermatology", name: "General Dermatology", icon: "HeartPulse", desc: "Full-spectrum medical dermatology for adults and children." },
  { slug: "cosmetic-skin-care", name: "Cosmetic Skin Care", icon: "Gem", desc: "Safe, medically guided treatments for glow, texture and confidence." },
  { slug: "hair-scalp-conditions", name: "Hair & Scalp Conditions", icon: "Scissors", desc: "Hair loss, dandruff and scalp inflammation assessed and treated." },
  { slug: "mole-assessment", name: "Mole Assessment", icon: "ScanEye", desc: "Careful examination of moles and lesions for early warning signs." },
  { slug: "wart-removal", name: "Wart Removal", icon: "Zap", desc: "Quick in-clinic removal of warts, skin tags and small growths." },
  { slug: "skin-infection-treatment", name: "Skin Infection Treatment", icon: "Syringe", desc: "Prompt care for bacterial, viral and inflammatory skin infections." },
  { slug: "patient-follow-up", name: "Patient Follow-up", icon: "CalendarCheck", desc: "Structured review visits so your treatment keeps working." },
  { slug: "dark-spots-treatment", name: "Dark Spots Treatment", icon: "CircleDot", desc: "Fade dark spots, post-acne marks and uneven patches with medical-grade care." },
  { slug: "genital-wart-treatment", name: "Genital Warts Treatment", icon: "ShieldCheck", desc: "Discreet, confidential treatment of genital and common warts." },
  { slug: "herpes-treatment", name: "Herpes Treatment", icon: "Shield", desc: "Confidential management of cold sores and genital herpes outbreaks." },
  { slug: "skin-tag-removal", name: "Acrochordon (Skin Tag) Treatment", icon: "Scissors", desc: "Laser or medical removal of acrochordons (skin tags), quickly and safely." },
  { slug: "stretch-mark-removal", name: "Stretch Marks Treatment", icon: "Waves", desc: "Laser treatment to soften and fade stretch marks on body and abdomen." },
  { slug: "keloid-treatment", name: "Keloid & Scar Treatment", icon: "Bandage", desc: "Flatten and calm keloids and hypertrophic scars with clinical therapy." },
  { slug: "cracked-feet-treatment", name: "Cracked Feet Treatment", icon: "Footprints", desc: "Heal painful heel fissures and cracked feet with a medical foot-care plan." },
  { slug: "laser-services", name: "Laser Services", icon: "Zap", desc: "In-clinic laser treatment for skin tags, stretch marks, scars and more." },
  { slug: "alopecia-treatment", name: "Alopecia Treatment", icon: "Wind", desc: "Diagnosis and medical treatment for hair loss, thinning and alopecia on the scalp and beard." },
  { slug: "tinea-versicolor-treatment", name: "Tinea Versicolor Treatment", icon: "Bug", desc: "Clear up tinea versicolor patches and discolouration with antifungal therapy." },
  { slug: "pityriasis-versicolor-treatment", name: "Pityriasis Versicolor Treatment", icon: "Palette", desc: "Medical care for pityriasis versicolor yeast patches and their recurrence." },
  { slug: "tattoo-laser-removal", name: "Tattoo Laser Removal", icon: "Sparkle", desc: "Laser tattoo removal that safely breaks down ink on all skin tones." },
  { slug: "dermatosis-papulosa-nigra-treatment", name: "Dermatosis Papulosa Nigra Treatment", icon: "Dot", desc: "Gentle removal of DPN bumps on the cheeks, forehead and neck for smoother skin." },
  { slug: "nail-fungus-treatment", name: "Nail Fungus (Onychomycosis) Treatment", icon: "Hand", desc: "Treat thick, discoloured and crumbling nails with proven antifungal therapy." },
];

export const whyChooseUs = [
  { icon: "Award", title: "Experienced Professionals", desc: "A clinical team with deep experience in skin health." },
  { icon: "HeartHandshake", title: "Patient-Centered Care", desc: "We listen first, then build care around you." },
  { icon: "Microscope", title: "Modern Treatment", desc: "Current protocols and modern clinical practice." },
  { icon: "Wallet", title: "Affordable Services", desc: "Transparent, fair pricing for quality dermatology." },
  { icon: "MapPin", title: "Convenient Pipeline Location", desc: "Easy to reach in Pipeline, opposite Honeysuckle Gardens Estate." },
  { icon: "BookOpenCheck", title: "Evidence-Based Medicine", desc: "Treatments backed by clinical evidence." },
  { icon: "Timer", title: "Fast Appointments", desc: "Short waiting times and same-week slots." },
  { icon: "BadgeCheck", title: "Quality Healthcare", desc: "Consistent standards at every single visit." },
] as const;

export const testimonials = [
  { name: "Wanjiru M.", text: "My acne cleared up within weeks. The doctor explained everything clearly and the plan actually worked." },
  { name: "Brian O.", text: "I had a rash for months. One consultation at Famart and I finally had a proper diagnosis and treatment." },
  { name: "Aisha K.", text: "Clean clinic, warm staff and very affordable. The follow-up visit showed they genuinely care." },
  { name: "Peter N.", text: "Booked on WhatsApp and was seen the same week. Excellent eczema care for my son." },
  { name: "Faith C.", text: "The pigmentation treatment changed my confidence completely. Highly professional service." },
  { name: "Samuel G.", text: "Convenient Pipeline location and no long queues. This is how healthcare should feel." },
] as const;

export const faqs = [
  { q: "Do I need an appointment?", a: "An appointment is recommended so we can reserve dedicated consultation time for you. You can book online, call us or send a WhatsApp message and we will confirm your slot." },
  { q: "What skin conditions do you treat?", a: "We treat acne, eczema, psoriasis, skin allergies, fungal infections, unexplained rashes, pigmentation disorders, hair and scalp conditions, warts, moles, skin infections and more." },
  { q: "How long does treatment take?", a: "A first consultation usually takes 20–30 minutes. Treatment length depends on the condition — some infections resolve in one to two weeks, while chronic conditions such as eczema or psoriasis are managed with a longer-term plan and review visits." },
  { q: "Do you accept walk-in patients?", a: "Yes. Walk-in patients are welcome during working hours, Monday to Friday, 9:00 AM to 5:00 PM. Booked patients are attended to first, so booking ahead reduces your waiting time." },
  { q: "Where are you located?", a: "We are in Nairobi Pipeline, opposite Honeysuckle Gardens Estate — easy to reach from Embakasi, South B, Imara Daima, Fedha and the wider Nairobi area." },
] as const;

export type ServiceDetail = {
  headline: string;
  intro: string;
  /** Search-engine and social preview description (roughly 150–160 characters). */
  metaDescription?: string;
  benefits: readonly string[];
  faqs: readonly { q: string; a: string }[];
};

const cta = (name: string) =>
  `Book a ${name.toLowerCase()} consultation at our Nairobi Pipeline clinic and get a clear, personalised plan.`;

export const serviceDetails: Record<string, ServiceDetail> = {
  "dark-spots-treatment": {
    headline: "Dark Spots and Hyperpigmentation Treatment in Nairobi",
    metaDescription:
      "Dark spot and hyperpigmentation treatment in Nairobi Pipeline. Fade post-acne marks, melasma and uneven tone safely with medical-grade dermatology care.",
    intro:
      "Dark spots from acne, insect bites, shaving or sun exposure can take years to fade on their own. Our dermatological skin care clinic in Nairobi Pipeline assesses what caused the pigmentation and builds a safe fading plan that protects your natural skin tone.",
    benefits: [
      "Treatment for post-acne marks and dark spots",
      "Melasma and sun-related pigmentation care",
      "Safe, skin-tone appropriate lightening protocols",
      "Sunscreen and maintenance routines that hold results",
    ],
    faqs: [
      { q: "How long do dark spots take to fade?", a: "Most patients see visible improvement in 8–12 weeks. Deeper pigmentation takes longer and is reviewed at follow-up visits." },
      { q: "Are skin lightening creams safe?", a: "Unregulated bleaching creams damage skin. We only prescribe medically approved treatment at safe strengths." },
      { q: "Will the dark spots come back?", a: "Not if the cause is treated and you use daily sun protection, which we include in every plan." },
    ],
  },
  "genital-wart-treatment": {
    headline: "Warts and Genital Warts Treatment in Nairobi",
    metaDescription:
      "Confidential genital warts and wart treatment in Nairobi Pipeline. Safe laser and medical removal of common, plantar and genital warts by skin specialists.",
    intro:
      "Warts are caused by a virus and spread easily if left untreated. We remove common, plantar and genital warts using laser or medical treatment, in a private, judgement-free consultation at our Nairobi Pipeline clinic.",
    benefits: [
      "Removal of common, plantar and genital warts",
      "Laser and medical treatment options",
      "Completely confidential consultation",
      "Advice on preventing spread and recurrence",
    ],
    faqs: [
      { q: "Is the treatment painful?", a: "We numb the area first, so most people describe only mild discomfort during removal." },
      { q: "Is my visit confidential?", a: "Yes. Genital wart consultations are private and your information is never shared." },
      { q: "Can warts come back?", a: "The virus can persist, so we review you after treatment and treat any new lesions early." },
    ],
  },
  "herpes-treatment": {
    headline: "Herpes Treatment in Nairobi",
    metaDescription:
      "Confidential herpes treatment in Nairobi Pipeline for cold sores and genital herpes. Fast relief, outbreak control and suppressive therapy from skin specialists.",
    intro:
      "Cold sores and genital herpes are common and very treatable. Our clinicians confirm the diagnosis, settle the current outbreak quickly and set up a plan that reduces how often outbreaks return.",
    benefits: [
      "Fast relief for painful herpes outbreaks",
      "Cold sore and genital herpes care",
      "Suppressive therapy for frequent recurrences",
      "Confidential, respectful consultations",
    ],
    faqs: [
      { q: "How quickly does treatment work?", a: "Antiviral treatment started early usually shortens an outbreak to a few days." },
      { q: "Can herpes be cured?", a: "The virus stays in the body, but treatment controls outbreaks so well that many patients rarely get them." },
      { q: "Is my consultation private?", a: "Yes, entirely confidential." },
    ],
  },
  "skin-tag-removal": {
    headline: "Acrochordon (Skin Tag) Removal in Nairobi",
    metaDescription:
      "Acrochordon (skin tag) removal in Nairobi Pipeline. Quick, safe laser or medical treatment for skin tags on the neck, underarms, eyelids and body.",
    intro:
      "Acrochordons — commonly called skin tags — on the neck, underarms, eyelids and body are harmless but often uncomfortable or unwanted. We remove them in-clinic using laser or medical treatment, with minimal downtime and careful attention to scarring.",
    benefits: [
      "Laser and medical skin tag removal",
      "Safe removal around the neck, underarms and eyelids",
      "Quick in-clinic procedure",
      "Aftercare that minimises marks",
    ],
    faqs: [
      { q: "How long does removal take?", a: "Most sessions take 15–30 minutes depending on how many tags are removed." },
      { q: "Will it leave a scar?", a: "Correctly performed removal usually heals with no visible mark, and we give aftercare to protect the skin." },
      { q: "Do skin tags grow back?", a: "A removed tag does not return, though new ones can form elsewhere." },
    ],
  },
  "stretch-mark-removal": {
    headline: "Stretch Marks Laser Treatment in Nairobi",
    intro:
      "Stretch marks on the abdomen, thighs, hips and arms respond well to laser treatment. We assess how old and how deep the marks are, then use laser therapy to improve their colour and texture over a course of sessions.",
    benefits: [
      "Laser treatment for old and new stretch marks",
      "Care for post-pregnancy and weight-change marks",
      "Improves colour, texture and skin tone",
      "A clear session plan with realistic expectations",
    ],
    faqs: [
      { q: "Do stretch marks disappear completely?", a: "They fade significantly and become much less visible, but complete erasure is not realistic — we are honest about this at your consultation." },
      { q: "How many sessions will I need?", a: "Most patients need a course of sessions spaced a few weeks apart; we confirm the number after examining your skin." },
      { q: "Is laser treatment safe on dark skin?", a: "Yes, when settings are chosen correctly for your skin tone, which is part of our assessment." },
    ],
  },
  "keloid-treatment": {
    headline: "Keloid and Hypertrophic Scar Treatment in Nairobi",
    metaDescription:
      "Keloid and hypertrophic scar treatment in Nairobi Pipeline. Flatten, soften and calm raised, itchy scars and prevent new keloids from forming.",
    intro:
      "Keloids and raised hypertrophic scars can be itchy, painful and distressing. We flatten and soften them using clinical therapy tailored to the scar's age, size and location, and help prevent new keloids from forming.",
    benefits: [
      "Treatment for keloids on the ears, chest, back and shoulders",
      "Care for raised hypertrophic and surgical scars",
      "Relief from itching, tenderness and pain",
      "Prevention advice for keloid-prone skin",
    ],
    faqs: [
      { q: "Can keloids be removed permanently?", a: "Keloids can recur, so we combine treatment with prevention and review you regularly to keep them flat." },
      { q: "Do you treat keloids from ear piercing?", a: "Yes, ear keloids are one of the most common cases we see." },
      { q: "How many sessions are needed?", a: "Most keloids need a course of treatment over several weeks; we set out the plan at your first visit." },
    ],
  },
  "cracked-feet-treatment": {
    headline: "Cracked Feet and Heel Fissure Treatment in Nairobi",
    intro:
      "Cracked heels are more than a cosmetic problem — deep fissures are painful and can become infected. We treat the cracks, identify the underlying cause such as fungal infection, eczema or diabetes-related dryness, and put a foot-care routine in place.",
    benefits: [
      "Treatment for painful heel fissures",
      "Diagnosis of the underlying cause",
      "Care for fungal and eczema-related foot problems",
      "A practical daily foot-care routine",
    ],
    faqs: [
      { q: "Why do my heels keep cracking?", a: "Common causes include very dry skin, fungal infection, eczema, prolonged standing and diabetes. Treating the cause is what stops it returning." },
      { q: "How soon will my feet heal?", a: "Most patients feel relief within days and see healing over two to four weeks." },
      { q: "Do you treat diabetic foot problems?", a: "We assess and treat the skin, and we refer promptly where wider diabetic foot care is needed." },
    ],
  },
  "laser-services": {
    headline: "Laser Skin Treatment Services in Nairobi",
    intro:
      "Our clinic offers in-clinic laser treatment for skin tags, stretch marks, scars, warts and other skin concerns. Every laser session starts with a clinical assessment so the treatment and settings are matched to your skin type.",
    benefits: [
      "Laser skin tag and wart removal",
      "Laser treatment for stretch marks and scars",
      "Settings matched to your skin tone",
      "Clinical assessment before every session",
    ],
    faqs: [
      { q: "Is laser treatment safe for African skin?", a: "Yes, when the device settings are correctly matched to your skin type — which is exactly why every session begins with an assessment." },
      { q: "Is it painful?", a: "Most patients describe a warm snapping sensation. Numbing is used where needed." },
      { q: "How much downtime is there?", a: "Most people return to normal activity the same day, with simple aftercare for a few days." },
    ],
  },
  "acne-treatment": {
    headline: "Acne Treatment in Nairobi",
    intro:
      "Acne is more than a cosmetic concern — it is a medical skin condition. At Famart Healthcare we assess the type and severity of your acne, identify the triggers behind it and build a treatment plan that clears active breakouts while protecting your skin from scarring.",
    benefits: [
      "Medical-grade topical and oral acne therapy",
      "Care for teenage, adult and hormonal acne",
      "Post-acne scar and dark spot management",
      "Guidance on skincare products that suit Kenyan skin",
    ],
    faqs: [
      { q: "How long before my acne clears?", a: "Most patients notice a visible reduction in breakouts within 4–8 weeks. Deeper cystic acne and scarring take longer and are reviewed at follow-up visits." },
      { q: "Will the treatment leave dark marks?", a: "Treated early, acne is far less likely to leave marks. Where pigmentation already exists we add a fading protocol to your plan." },
      { q: "Do you treat adult and hormonal acne?", a: "Yes. Adult and hormonal acne needs a different approach from teenage acne, and we tailor therapy accordingly." },
    ],
  },
  "eczema-management": {
    headline: "Eczema Treatment and Management in Nairobi",
    intro:
      "Eczema flares are unpredictable, itchy and exhausting. Our dermatology team focuses on calming the current flare quickly and then keeping your skin stable with a long-term maintenance routine you can actually follow.",
    benefits: [
      "Rapid relief for itching and inflammation",
      "Child and adult eczema care",
      "Trigger identification and avoidance advice",
      "Moisturiser and barrier-repair routines",
    ],
    faqs: [
      { q: "Is eczema curable?", a: "Eczema is a long-term condition, but with the right plan it can be controlled so well that flares become rare and mild." },
      { q: "Can you treat eczema in babies and children?", a: "Yes. We regularly manage childhood eczema with gentle, age-appropriate treatment." },
      { q: "How often should I come for review?", a: "Usually every 4–8 weeks at first, then less often once your skin is stable." },
    ],
  },
  "psoriasis-treatment": {
    headline: "Psoriasis Treatment in Nairobi",
    metaDescription:
      "Psoriasis treatment in Nairobi Pipeline for the skin, scalp and nails. Evidence-based therapy to reduce plaques, control flares and keep psoriasis in remission.",
    intro:
      "Psoriasis affects the skin, scalp and confidence. We use evidence-based therapy to reduce plaques and scaling, control flares and keep the condition in remission for as long as possible.",
    benefits: [
      "Plaque, scalp and nail psoriasis care",
      "Topical, systemic and combination therapy",
      "Flare-prevention and lifestyle guidance",
      "Structured review to monitor progress",
    ],
    faqs: [
      { q: "Is psoriasis contagious?", a: "No. Psoriasis is an immune-driven condition and cannot be passed to another person." },
      { q: "What triggers a psoriasis flare?", a: "Stress, infections, some medicines, skin injury and weather changes are common triggers. We help you identify yours." },
      { q: "Do you treat scalp psoriasis?", a: "Yes, scalp psoriasis is one of the most common presentations we see and it responds well to targeted treatment." },
    ],
  },
  "skin-allergy-treatment": {
    headline: "Skin Allergy Treatment in Nairobi",
    intro:
      "Hives, contact dermatitis and sudden reactions need a proper diagnosis, not guesswork. We work through your history and exposures to find the trigger, calm the reaction and prevent it happening again.",
    benefits: [
      "Treatment for hives, itching and swelling",
      "Contact and cosmetic allergy assessment",
      "Drug and food reaction review",
      "Prevention plan and emergency advice",
    ],
    faqs: [
      { q: "How do you find what I am allergic to?", a: "We take a detailed history of products, medicines, foods and exposures, examine the pattern of the rash and, where needed, arrange further testing." },
      { q: "How fast will the itching stop?", a: "Most acute reactions settle within days of starting treatment. Chronic hives need a longer, structured plan." },
      { q: "Are the medicines safe long term?", a: "Yes, when prescribed and monitored properly. We review your dose at every visit." },
    ],
  },
  "fungal-skin-infections": {
    headline: "Fungal Skin Infection Treatment in Nairobi",
    intro:
      "Ringworm, athlete's foot, nail fungus and yeast infections are often self-treated with the wrong creams for months. We confirm the diagnosis and prescribe the right antifungal at the right strength and duration.",
    benefits: [
      "Ringworm, tinea and candida treatment",
      "Nail and scalp fungal infection care",
      "Correct diagnosis before treatment",
      "Advice to stop reinfection at home",
    ],
    faqs: [
      { q: "Why does my ringworm keep coming back?", a: "Usually because treatment was stopped too early, the strength was too low, or household reinfection was not addressed. We tackle all three." },
      { q: "How long is treatment?", a: "Skin infections often clear in 2–4 weeks. Nail infections need several months of consistent treatment." },
      { q: "Is it contagious?", a: "Yes, most fungal skin infections spread by contact, so we also advise on protecting your family." },
    ],
  },
  "skin-rash-diagnosis": {
    headline: "Skin Rash Diagnosis in Nairobi",
    intro:
      "An unexplained rash can be anything from a simple irritation to a sign of an internal condition. Our consultation gives you a clear diagnosis and a treatment plan instead of another guess.",
    benefits: [
      "Thorough clinical examination",
      "History-led diagnosis of unclear rashes",
      "Referral for tests where needed",
      "Clear explanation of what your rash is",
    ],
    faqs: [
      { q: "What should I bring to the appointment?", a: "Bring any creams or medicines you have used, plus photos of the rash when it was at its worst." },
      { q: "Should I stop my current creams before coming?", a: "Where possible, pause steroid creams for a day or two so the rash can be seen clearly — unless it is severe." },
      { q: "Will I get a diagnosis on the same day?", a: "In most cases yes. Some rashes require tests, and we explain the next step clearly." },
    ],
  },
  "pigmentation-disorders": {
    headline: "Pigmentation and Dark Spot Treatment in Nairobi",
    intro:
      "Melasma, dark patches and uneven tone respond best to medically supervised treatment. We use safe, dermatologist-approved protocols — never skin-damaging bleaching products.",
    benefits: [
      "Melasma and hyperpigmentation care",
      "Post-inflammatory dark spot fading",
      "Safe treatment for deeper skin tones",
      "Sun protection and maintenance plan",
    ],
    faqs: [
      { q: "How long until my dark spots fade?", a: "Visible improvement usually starts at 6–12 weeks. Melasma is a long-term condition that needs maintenance." },
      { q: "Do you use skin-lightening creams?", a: "We never use unsafe bleaching agents. We prescribe regulated, evidence-based pigment therapy only." },
      { q: "Will it come back?", a: "It can, especially with sun exposure. Daily sunscreen and review visits keep results stable." },
    ],
  },
  "skin-consultation": {
    headline: "Dermatology Skin Consultation in Nairobi",
    intro:
      "A full one-on-one assessment of your skin with a qualified clinician. We listen to your concern, examine your skin properly and leave you with a written, personalised plan.",
    benefits: [
      "20–30 minute focused consultation",
      "Personalised treatment and skincare plan",
      "Honest advice on what is and is not needed",
      "Follow-up scheduling on the same day",
    ],
    faqs: [
      { q: "How long does a consultation take?", a: "Usually 20–30 minutes, longer for complex or multiple concerns." },
      { q: "Do I need to book in advance?", a: "Booking is recommended so we can reserve dedicated time, but walk-ins are welcome during working hours." },
      { q: "Will I get medication the same day?", a: "In most cases yes, your prescription is issued at the end of the consultation." },
    ],
  },
  "general-dermatology": {
    headline: "General Dermatology in Nairobi",
    intro:
      "Full-spectrum medical dermatology for adults and children — from everyday skin complaints to chronic conditions that need long-term management.",
    benefits: [
      "Adult and paediatric dermatology",
      "Chronic skin condition management",
      "Prescription and procedure-based care",
      "Coordinated follow-up over time",
    ],
    faqs: [
      { q: "Do you see children?", a: "Yes, we treat children of all ages with age-appropriate medication and dosing." },
      { q: "Can I be seen for more than one problem?", a: "Yes. Mention all your concerns at the start so we can allocate enough time." },
      { q: "Do you provide medical reports?", a: "Yes, we can issue a clinical summary or report on request." },
    ],
  },
  "cosmetic-skin-care": {
    headline: "Cosmetic Skin Care in Nairobi",
    intro:
      "Medically guided cosmetic care that improves glow, texture and tone without compromising skin health. Every treatment is chosen after a proper clinical assessment.",
    benefits: [
      "Skin texture and radiance treatments",
      "Doctor-led product recommendations",
      "Safe protocols for melanin-rich skin",
      "Realistic, staged treatment planning",
    ],
    faqs: [
      { q: "Are cosmetic treatments safe for dark skin?", a: "Yes, when chosen correctly. We use settings and products validated for melanin-rich skin to avoid pigmentation." },
      { q: "How many sessions will I need?", a: "It depends on the treatment and your goal — we set out the number and spacing at your first visit." },
      { q: "Is there downtime?", a: "Most of our cosmetic treatments have little or no downtime. We tell you in advance if any is expected." },
    ],
  },
  "hair-scalp-conditions": {
    headline: "Hair Loss and Scalp Treatment in Nairobi",
    intro:
      "Hair loss, thinning edges, dandruff and scalp inflammation all have treatable causes. We diagnose the cause first, then treat it — including traction alopecia from styling.",
    benefits: [
      "Hair loss and thinning assessment",
      "Dandruff and seborrheic dermatitis care",
      "Traction alopecia and edge restoration advice",
      "Scalp infection and itching treatment",
    ],
    faqs: [
      { q: "Can lost hair grow back?", a: "Often yes, especially when treated early and when the follicles are not permanently scarred." },
      { q: "Do you treat traction alopecia from braids?", a: "Yes, and we advise on styling changes that protect regrowth." },
      { q: "How soon will I see results?", a: "Hair grows slowly — expect the first meaningful change at 3–4 months." },
    ],
  },
  "mole-assessment": {
    headline: "Mole and Skin Lesion Assessment in Nairobi",
    intro:
      "Any mole that changes in size, shape, colour or sensation deserves a professional look. We examine moles and lesions carefully and advise on monitoring, removal or referral.",
    benefits: [
      "Careful examination of moles and lesions",
      "Early warning sign checks",
      "Removal advice where appropriate",
      "Peace of mind and documented review",
    ],
    faqs: [
      { q: "When should I worry about a mole?", a: "If it changes in size, shape or colour, has an irregular border, bleeds, itches or looks different from your other moles, have it checked." },
      { q: "Can the mole be removed on the same day?", a: "Some can. Others need planning or referral, which we explain during the assessment." },
      { q: "Does the check hurt?", a: "No, the examination itself is painless." },
    ],
  },
  "wart-removal": {
    headline: "Wart and Skin Tag Removal in Nairobi",
    intro:
      "Quick, clean in-clinic removal of warts, skin tags and small benign growths, with proper aftercare so the area heals neatly.",
    benefits: [
      "Same-visit removal in many cases",
      "Warts, skin tags and small growths",
      "Minimal discomfort and quick healing",
      "Aftercare instructions and review",
    ],
    faqs: [
      { q: "Is removal painful?", a: "Discomfort is brief and minimal; local anaesthetic is used where needed." },
      { q: "Will it leave a scar?", a: "Most removals heal with little or no visible mark when aftercare is followed." },
      { q: "Can warts come back?", a: "Warts are viral and can recur. We advise on reducing that risk and treat recurrences promptly." },
    ],
  },
  "skin-infection-treatment": {
    headline: "Skin Infection Treatment in Nairobi",
    intro:
      "Boils, cellulitis, impetigo and other bacterial or viral skin infections need prompt, correct treatment. We assess severity, start therapy quickly and review healing.",
    benefits: [
      "Bacterial and viral skin infection care",
      "Boils, abscesses and cellulitis treatment",
      "Correct antibiotic selection",
      "Wound care and healing review",
    ],
    faqs: [
      { q: "How urgent is a skin infection?", a: "Spreading redness, fever or severe pain needs to be seen the same day. Come in as soon as possible." },
      { q: "Will I need antibiotics?", a: "Only if the infection is bacterial. We avoid unnecessary antibiotics." },
      { q: "How long does healing take?", a: "Most straightforward infections improve within a week of correct treatment." },
    ],
  },
  "patient-follow-up": {
    headline: "Patient Follow-up Care in Nairobi",
    intro:
      "Treatment works best when it is reviewed. Our structured follow-up visits check your progress, adjust your plan and keep chronic conditions under control.",
    benefits: [
      "Scheduled progress reviews",
      "Treatment adjustment as your skin changes",
      "Long-term control of chronic conditions",
      "Ongoing relationship with your clinician",
    ],
    faqs: [
      { q: "How often should I come for follow-up?", a: "Typically every 4–8 weeks while treatment is being established, then less frequently." },
      { q: "What if my skin is already better?", a: "A short review still helps — it confirms the plan is working and prevents relapse." },
      { q: "Can I book follow-up on WhatsApp?", a: "Yes, send us a message and we will confirm your review slot." },
    ],
  },
  "alopecia-treatment": {
    headline: "Alopecia (Hair Loss) Treatment in Nairobi",
    metaDescription:
      "Alopecia and hair loss treatment in Nairobi Pipeline. Diagnosis of alopecia areata, androgenetic and traction hair loss with targeted therapy to regrow hair.",
    intro:
      "Alopecia causes patchy or widespread hair loss on the scalp, beard and body. We identify the type — from androgenetic and alopecia areata to traction and telogen effluvium — then start targeted treatment to slow shedding, calm inflammation and support regrowth.",
    benefits: [
      "Diagnosis of the type and cause of your hair loss",
      "Treatment for patches, thinning and active shedding",
      "Scalp, beard and edge (traction) alopecia care",
      "A regrowth and follow-up plan with realistic expectations",
    ],
    faqs: [
      { q: "Will my hair grow back?", a: "Many types of alopecia improve with treatment, especially when addressed early. We give you a realistic outlook after examining your scalp." },
      { q: "Is alopecia contagious?", a: "No. Alopecia is not infectious and cannot be passed to anyone else." },
      { q: "How long before I see results?", a: "Shedding usually slows within weeks, while visible regrowth typically takes three to six months of consistent treatment." },
    ],
  },
  "tinea-versicolor-treatment": {
    headline: "Tinea Versicolor Treatment in Nairobi",
    metaDescription:
      "Tinea versicolor treatment in Nairobi Pipeline. Clear fungal patches on the chest, back and neck with antifungal therapy and stop the infection returning.",
    intro:
      "Tinea versicolor is a common yeast overgrowth that leaves lighter or darker patches on the chest, back and neck. We confirm the diagnosis, clear the active infection with antifungal treatment and advise on how to reduce recurrence, especially in warm, humid weather.",
    benefits: [
      "Confirm tinea versicolor and rule out other causes",
      "Antifungal treatment for active patches",
      "Advice to reduce recurring flare-ups",
      "Follow-up to confirm the infection has cleared",
    ],
    faqs: [
      { q: "Why do the patches change colour?", a: "The yeast affects pigment production, so affected skin may look lighter or darker than the rest. Colour usually evens out as the skin renews." },
      { q: "Is tinea versicolor contagious?", a: "It is not spread person to person, but the yeast lives naturally on skin and overgrows in warm, moist conditions." },
      { q: "How long does clearing take?", a: "The infection usually clears within two to four weeks of treatment, and skin tone then evens over the following months." },
    ],
  },
  "pityriasis-versicolor-treatment": {
    headline: "Pityriasis Versicolor Treatment in Nairobi",
    metaDescription:
      "Pityriasis versicolor treatment in Nairobi Pipeline. Medical care for scaly yeast patches and discolouration, with a plan to prevent recurrence.",
    intro:
      "Pityriasis versicolor — also called tinea versicolor — is a yeast-related rash that causes scaly, discoloured patches on oily parts of the body. Our clinicians treat the active infection, settle the scaling and help you keep it from recurring.",
    benefits: [
      "Accurate diagnosis of pityriasis versicolor",
      "Antifungal therapy for scaling and patches",
      "Care for sensitive and dark skin tones",
      "Prevention plan for recurring episodes",
    ],
    faqs: [
      { q: "Is pityriasis versicolor the same as tinea versicolor?", a: "Yes — both names describe the same yeast-related skin condition. Only the terminology differs." },
      { q: "Will the pale patches go away?", a: "The scaly rash clears quickly with treatment, and the colour difference fades over weeks to months as pigment returns." },
      { q: "Can it come back?", a: "The yeast can overgrow again, especially in heat and humidity, so we give you a simple prevention routine." },
    ],
  },
  "tattoo-laser-removal": {
    headline: "Tattoo Laser Removal in Nairobi",
    metaDescription:
      "Laser tattoo removal in Nairobi Pipeline. Safe, gradual fading of unwanted tattoos on dark and light skin with a personalised treatment plan.",
    intro:
      "Laser tattoo removal breaks down tattoo ink into tiny particles your body clears naturally over time. We assess the ink colours, depth and your skin type, then plan a safe course of sessions that gives you the cleanest possible result with minimal scarring.",
    benefits: [
      "Laser removal for black, coloured and layered tattoos",
      "Settings matched to your skin tone",
      "A realistic session plan and progress review",
      "Aftercare that protects the skin and limits scarring",
    ],
    faqs: [
      { q: "How many sessions will I need?", a: "Most tattoos need several sessions spaced weeks apart; amateur tattoos and black ink respond fastest, and we confirm the number after assessing your tattoo." },
      { q: "Does it leave a scar?", a: "When performed correctly with the right settings, laser tattoo removal usually leaves little to no scarring." },
      { q: "Is it safe on African skin?", a: "Yes, provided the laser settings and aftercare are matched to your skin type — which is central to our assessment." },
    ],
  },
  "dermatosis-papulosa-nigra-treatment": {
    headline: "Dermatosis Papulosa Nigra (DPN) Treatment in Nairobi",
    metaDescription:
      "Dermatosis papulosa nigra treatment in Nairobi Pipeline. Safe, gentle removal of dark DPN bumps on the face and neck for smoother skin without harsh scarring.",
    intro:
      "Dermatosis papulosa nigra causes small, dark, raised bumps on the cheeks, forehead, nose and neck, most often in people with darker skin. They are harmless, but many patients want them removed for smoother, clearer skin. We remove them gently with minimal downtime.",
    benefits: [
      "Gentle removal of DPN bumps on face and neck",
      "Safe techniques for melanin-rich skin",
      "Minimal downtime and careful aftercare",
      "Advice on reducing new bumps forming",
    ],
    faqs: [
      { q: "Are DPN bumps dangerous?", a: "No — dermatosis papulosa nigra is harmless and not cancerous. Removal is usually for cosmetic reasons." },
      { q: "Can they come back?", a: "New bumps can form over time, but the treated ones are removed. We will show you how to care for your skin afterwards." },
      { q: "Will removal leave dark marks?", a: "With the right approach for darker skin, healing is usually good. We give aftercare that reduces the risk of marks." },
    ],
  },
  "nail-fungus-treatment": {
    headline: "Nail Fungus (Onychomycosis) Treatment in Nairobi",
    metaDescription:
      "Nail fungus (onychomycosis) treatment in Nairobi Pipeline. Medical therapy for thick, discoloured and crumbling toenails and fingernails, with follow-up care.",
    intro:
      "Onychomycosis makes nails thick, yellow, brittle and sometimes painful. The infection lives under the nail, so it rarely clears with nail polish or home remedies. We confirm it, start proven antifungal treatment and monitor your nails as they grow back healthy.",
    benefits: [
      "Diagnosis of fungal, traumatic and psoriasis nail changes",
      "Proven oral and topical antifungal treatment",
      "Care for thickened, painful or crumbling nails",
      "Follow-up until healthy nail grows back",
    ],
    faqs: [
      { q: "How long does nail fungus take to clear?", a: "Because nails grow slowly, toenails can take nine to twelve months and fingernails about six months. We review progress along the way." },
      { q: "Is nail fungus contagious?", a: "Yes. It spreads through shared floors, shoes and towels, so we advise on protecting your household and preventing reinfection." },
      { q: "Will my nail grow back normally?", a: "In most cases, healthy nail grows back with correct treatment. Severely damaged nails may take longer and need continued review." },
    ],
  },
};

export const serviceCta = cta;

/** Conditions the clinic treats — used for SEO-focused listings. */
export const conditionsTreated = [
  { name: "Eczema", slug: "eczema-management" },
  { name: "Psoriasis", slug: "psoriasis-treatment" },
  { name: "Fungal infections (dandruff, ringworm)", slug: "fungal-skin-infections" },
  { name: "Pigmentation disorders (vitiligo, melasma)", slug: "pigmentation-disorders" },
  { name: "Acne and pimples", slug: "acne-treatment" },
  { name: "Dark spots", slug: "dark-spots-treatment" },
  { name: "Warts including genital warts", slug: "genital-wart-treatment" },
  { name: "Herpes", slug: "herpes-treatment" },
  { name: "Skin tags / acrochordons (laser or medical treatment)", slug: "skin-tag-removal" },
  { name: "Stretch marks (laser treatment)", slug: "stretch-mark-removal" },
  { name: "Keloids and hypertrophic scars", slug: "keloid-treatment" },
  { name: "Cracked feet", slug: "cracked-feet-treatment" },
  { name: "Laser services", slug: "laser-services" },
  { name: "Alopecia (hair loss)", slug: "alopecia-treatment" },
  { name: "Tinea versicolor", slug: "tinea-versicolor-treatment" },
  { name: "Pityriasis versicolor", slug: "pityriasis-versicolor-treatment" },
  { name: "Tattoo laser removal", slug: "tattoo-laser-removal" },
  { name: "Dermatosis papulosa nigra (DPN)", slug: "dermatosis-papulosa-nigra-treatment" },
  { name: "Nail fungus (onychomycosis)", slug: "nail-fungus-treatment" },
] as const;
