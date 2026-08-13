// Central content for the whole site — edit this one file to rebrand.

export const business = {
  name: 'Atelier Interiors',
  short: 'Atelier',
  tagline: 'Design that works beautifully.',
  intro:
    'An award-winning interior design studio in Mumbai crafting luxury residential and commercial spaces — from concept to turnkey handover.',
  phoneDisplay: '+91 98670 12345',
  phone: '+919867012345',
  whatsapp: '919867012345',
  email: 'studio@atelierinteriors.com',
  address: 'Studio 7, Kala Ghoda, Fort, Mumbai 400001',
  hours: 'Mon–Sat · 10:00 AM – 7:00 PM',
  mapEmbed: 'https://www.google.com/maps?q=Kala%20Ghoda%20Fort%20Mumbai&output=embed',
  mapLink: 'https://www.google.com/maps/search/?api=1&query=Kala+Ghoda+Fort+Mumbai',
  social: { instagram: 'https://instagram.com', facebook: 'https://facebook.com', pinterest: 'https://pinterest.com' },
}

export const whatsappLink = (text = "Hi Atelier, I'd like to discuss an interior project.") =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`

// Image sources with graceful fallback: local file → themed stock → generic stock → gradient.
const flickr = (kw, lock, w = 1000, h = 1200) => `https://loremflickr.com/${w}/${h}/${kw}?lock=${lock}`
const picsum = (seed, w = 1000, h = 1200) => `https://picsum.photos/seed/${seed}/${w}/${h}`
const img = (local, kw, lock, seed) => [local, flickr(kw, lock), picsum(seed)]

export const heroImages = {
  main: img('/images/hero/main.jpg', 'interior,living-room,luxury', 61, 'atl-main'),
  a: img('/images/hero/a.jpg', 'interior,kitchen', 62, 'atl-a'),
  b: img('/images/hero/b.jpg', 'interior,bedroom', 63, 'atl-b'),
}

export const stats = [
  { value: '250+', label: 'projects delivered' },
  { value: '15', label: 'years of craft' },
  { value: '18', label: 'design awards' },
  { value: '4.9★', label: 'client rating' },
]

// Advanced landing pages — one per service (/services/<slug>).
// Each follows the conversion structure: image → description → process → CTA.
export const services = [
  {
    slug: 'residential', icon: '🏠', title: 'Residential Interiors',
    tagline: 'Homes designed around your life',
    excerpt: 'Full-home design and turnkey execution for apartments, villas and bungalows.',
    priceFrom: 'from ₹1,500 / sq ft',
    image: img('/images/services/residential.jpg', 'interior,living-room', 71, 'svc-res'),
    overview: 'We design homes that feel personal and effortless — balancing beauty, function and budget. From layout and materials to lighting and styling, we manage the whole journey to a turnkey handover.',
    highlights: ['Space planning & 3D visualisation', 'Custom furniture & joinery', 'Material & finish selection', 'Turnkey execution & handover'],
    process: [
      ['Discovery', 'We learn how you live, your taste and your budget.'],
      ['Design', '3D concepts, materials and a detailed BOQ.'],
      ['Build', 'Our site team executes with weekly updates.'],
      ['Handover', 'Styled, cleaned and ready to move in.'],
    ],
  },
  {
    slug: 'commercial', icon: '🏢', title: 'Commercial Interiors',
    tagline: 'Workspaces that mean business',
    excerpt: 'Offices, retail and hospitality interiors that elevate your brand.',
    priceFrom: 'from ₹1,200 / sq ft',
    image: img('/images/services/commercial.jpg', 'office,interior,modern', 72, 'svc-com'),
    overview: 'Productive, on-brand commercial spaces — offices, showrooms, cafés and clinics — delivered on time and to spec, with minimal disruption to your business.',
    highlights: ['Brand-led space design', 'Ergonomics & workflow', 'MEP & compliance coordination', 'Fast-track fit-out'],
    process: [
      ['Brief', 'We align on brand, headcount and ways of working.'],
      ['Design', 'Layouts, 3D, materials and phasing plan.'],
      ['Fit-out', 'Coordinated build with all trades managed.'],
      ['Launch', 'A workspace ready for day one.'],
    ],
  },
  {
    slug: 'modular-kitchen', icon: '🍳', title: 'Modular Kitchens',
    tagline: 'Kitchens that cook beautifully',
    excerpt: 'Ergonomic, durable modular kitchens tailored to how you cook.',
    priceFrom: 'from ₹1,80,000',
    image: img('/images/services/kitchen.jpg', 'modular,kitchen,interior', 73, 'svc-kit'),
    overview: 'Smart, hard-working kitchens with premium hardware, clever storage and finishes that last. Designed around the work triangle and your daily rituals.',
    highlights: ['Optimised work triangle', 'Premium hardware & fittings', 'Moisture-resistant materials', 'Tall units & smart storage'],
    process: [
      ['Measure', 'Precise site measurement and needs assessment.'],
      ['Design', 'Layout, finishes and appliance planning.'],
      ['Install', 'Factory-made modules fitted cleanly.'],
      ['Cook', 'A kitchen that just works.'],
    ],
  },
  {
    slug: 'bedroom', icon: '🛏️', title: 'Bedroom Design',
    tagline: 'Restful rooms, thoughtfully made',
    excerpt: 'Calm, clutter-free bedrooms with bespoke wardrobes and lighting.',
    priceFrom: 'from ₹2,50,000',
    image: img('/images/services/bedroom.jpg', 'bedroom,interior,cozy', 74, 'svc-bed'),
    overview: 'Serene bedrooms designed for rest — layered lighting, generous storage and warm, tactile materials, tailored to each member of the family.',
    highlights: ['Bespoke wardrobes', 'Layered mood lighting', 'Acoustic & blackout options', 'Kids & guest rooms'],
    process: [
      ['Understand', 'Storage needs, routines and style.'],
      ['Design', 'Wardrobe, lighting and material plan.'],
      ['Build', 'Bespoke joinery installed on site.'],
      ['Rest', 'A room that helps you switch off.'],
    ],
  },
  {
    slug: 'living-room', icon: '🛋️', title: 'Living Room Design',
    tagline: 'Where your home comes together',
    excerpt: 'Statement living spaces built for hosting and everyday comfort.',
    priceFrom: 'from ₹3,00,000',
    image: img('/images/services/living.jpg', 'living-room,interior,sofa', 75, 'svc-liv'),
    overview: 'The heart of the home — designed to host and to relax. Feature walls, curated furniture, entertainment and lighting brought together in one considered scheme.',
    highlights: ['Feature walls & panelling', 'Curated furniture & décor', 'Entertainment integration', 'Layered lighting design'],
    process: [
      ['Vision', 'How you host and unwind day to day.'],
      ['Design', 'Concept, furniture and lighting scheme.'],
      ['Build', 'Joinery, finishes and styling.'],
      ['Gather', 'A room made for people.'],
    ],
  },
  {
    slug: 'office', icon: '💼', title: 'Office Interiors',
    tagline: 'Focus, meet flexibility',
    excerpt: 'Home offices and workspaces that keep you productive.',
    priceFrom: 'from ₹1,50,000',
    image: img('/images/services/office.jpg', 'office,workspace,interior', 76, 'svc-off'),
    overview: 'From a focused home office to a full floor, we design workspaces that support deep work, collaboration and wellbeing — with cable management done right.',
    highlights: ['Ergonomic workstations', 'Acoustic treatment', 'Cable & tech management', 'Meeting & breakout zones'],
    process: [
      ['Assess', 'How and where you work best.'],
      ['Design', 'Layout, ergonomics and storage.'],
      ['Build', 'Clean, functional execution.'],
      ['Work', 'A space that keeps you in flow.'],
    ],
  },
]
export const serviceBySlug = (slug) => services.find((s) => s.slug === slug)

// Portfolio / projects (filterable + lightbox).
export const projectCategories = ['All', 'Residential', 'Commercial', 'Kitchen', 'Bedroom']
export const projects = [
  { label: 'Sea-View Apartment', category: 'Residential', img: img('/images/projects/p1.jpg', 'apartment,interior', 81, 'pr1') },
  { label: 'Tech HQ Office', category: 'Commercial', img: img('/images/projects/p2.jpg', 'office,modern', 82, 'pr2') },
  { label: 'Chef’s Kitchen', category: 'Kitchen', img: img('/images/projects/p3.jpg', 'kitchen,modular', 83, 'pr3') },
  { label: 'Master Suite', category: 'Bedroom', img: img('/images/projects/p4.jpg', 'bedroom,luxury', 84, 'pr4') },
  { label: 'Penthouse Living', category: 'Residential', img: img('/images/projects/p5.jpg', 'living-room,penthouse', 85, 'pr5') },
  { label: 'Boutique Café', category: 'Commercial', img: img('/images/projects/p6.jpg', 'cafe,interior', 86, 'pr6') },
  { label: 'Island Kitchen', category: 'Kitchen', img: img('/images/projects/p7.jpg', 'kitchen,island', 87, 'pr7') },
  { label: 'Kids’ Bedroom', category: 'Bedroom', img: img('/images/projects/p8.jpg', 'kids,bedroom', 88, 'pr8') },
  { label: 'Villa Renovation', category: 'Residential', img: img('/images/projects/p9.jpg', 'villa,interior', 89, 'pr9') },
]

export const testimonials = [
  { name: 'Kabir & Neha', role: '3BHK, Worli', text: 'Atelier turned our apartment into a home we never want to leave. Transparent, on-budget and beautifully executed.' },
  { name: 'Rhea Malhotra', role: 'Café Owner', text: 'Our café was fully booked within a week of opening. The design does half the marketing for us.' },
  { name: 'Arjun Shah', role: 'Villa, Alibaug', text: 'Weekly updates, no surprises, stunning result. The turnkey handover was spotless.' },
  { name: 'Meera Iyer', role: '2BHK, Powai', text: 'They worked to our budget without ever making it feel like a compromise. We love our home.' },
  { name: 'Devansh Rao', role: 'Office, BKC', text: 'Our team’s new workspace boosted morale instantly. Delivered on time, exactly to the 3D visuals.' },
  { name: 'Ayesha Khan', role: 'Modular Kitchen, Bandra', text: 'The most functional kitchen I’ve ever cooked in. Every inch is thought through.' },
]

export const faqs = [
  ['How do you charge — per sq ft or a package?', 'Both options exist. Design-only is a percentage or fixed fee; turnkey is typically per sq ft. After a consultation we share a clear, itemised quote.'],
  ['How long does a project take?', 'A full home is usually 10–16 weeks depending on scope; kitchens and single rooms are faster. We share a phased timeline before we start.'],
  ['Do you handle execution or just design?', 'Both. We offer design-only, or full turnkey where we manage every trade to a finished, styled handover.'],
  ['Can you work to my budget?', 'Yes. We plan around your budget and are transparent about costs at every stage — no hidden charges.'],
  ['Do you provide a 3D design first?', 'Always. You approve 3D visuals and materials before any work begins, so there are no surprises.'],
]

// Studio process (shown on Home / About).
export const process = [
  ['01', 'Consultation', 'We visit or call to understand your space, needs and budget.'],
  ['02', 'Concept & 3D', 'Mood boards, 3D visuals, materials and a detailed quote.'],
  ['03', 'Execution', 'Our site team builds it, with weekly updates and quality checks.'],
  ['04', 'Turnkey handover', 'Styled, cleaned and ready — plus after-care support.'],
]

// Blog / CMS content.
export const posts = [
  {
    slug: '2025-kitchen-trends', title: '7 Modular Kitchen Trends for 2025', category: 'Kitchens',
    date: '2025-11-02', read: '5 min',
    excerpt: 'From fluted fronts to hidden appliances — the kitchen looks defining the year ahead.',
    image: img('/images/blog/b1.jpg', 'kitchen,modern', 91, 'bl1'),
    body: [
      'A great kitchen balances beauty and hard work. This year’s trends lean into warm materials, clever storage and quiet, integrated technology.',
      'Fluted and reeded fronts add texture without clutter, while handleless profiles keep lines clean. Tall pantry units and corner carousels are winning the storage race.',
      'Appliance garages and integrated dishwashers hide the busywork, so the kitchen reads calm even mid-cook. Warm brass and matte stone finishes tie it together.',
      'Our advice: invest in hardware and layout first — they’re what you feel every day. Finishes can flex to your budget.',
    ],
  },
  {
    slug: 'small-space-big-style', title: 'Small Space, Big Style: 6 Ideas', category: 'Tips',
    date: '2025-10-18', read: '4 min',
    excerpt: 'Make a compact home feel generous with these designer-approved moves.',
    image: img('/images/blog/b2.jpg', 'small,apartment,interior', 92, 'bl2'),
    body: [
      'Small homes reward discipline. Every piece should earn its place, and light should flow freely.',
      'Use full-height storage to draw the eye up, choose furniture with legs to keep the floor visible, and repeat one or two materials for a calm, cohesive look.',
      'Mirrors and layered lighting expand a room instantly. Multi-functional furniture — a bed with storage, a nesting table — does the heavy lifting.',
      'Finally, edit ruthlessly. In a small space, restraint is luxury.',
    ],
  },
  {
    slug: 'choosing-an-interior-designer', title: 'How to Choose an Interior Designer', category: 'Guides',
    date: '2025-09-30', read: '6 min',
    excerpt: 'The questions to ask before you sign — so your project runs smoothly.',
    image: img('/images/blog/b3.jpg', 'interior,design,studio', 93, 'bl3'),
    body: [
      'The right designer is part creative, part project manager. Look for both.',
      'Ask to see completed projects (not just renders), talk to past clients, and check who actually executes the work.',
      'Clarify the fee structure, timeline and what happens if scope changes. A good studio will be transparent from day one.',
      'Most importantly, choose someone who listens. Your home should feel like you — not their portfolio.',
    ],
  },
]
export const postBySlug = (slug) => posts.find((p) => p.slug === slug)

// Cost estimator ("custom functionality").
export const estimatorRooms = [
  { key: 'full-home', label: 'Full home', factor: 1 },
  { key: 'kitchen', label: 'Modular kitchen', factor: 1.15 },
  { key: 'living', label: 'Living room', factor: 1.05 },
  { key: 'bedroom', label: 'Bedroom', factor: 0.95 },
  { key: 'office', label: 'Office / workspace', factor: 1.0 },
]
export const estimatorPackages = [
  { key: 'essential', label: 'Essential', rate: 1300, blurb: 'Smart, budget-conscious design.' },
  { key: 'signature', label: 'Signature', rate: 1900, blurb: 'Our most popular, balanced spec.' },
  { key: 'bespoke', label: 'Bespoke', rate: 2800, blurb: 'Premium materials, fully custom.' },
]

// Booking workflow options.
export const projectTypes = ['Residential', 'Commercial', 'Modular Kitchen', 'Bedroom', 'Living Room', 'Office', 'Other']
export const propertySizes = ['1 BHK', '2 BHK', '3 BHK', '4 BHK / Villa', 'Commercial space']
export const budgetRanges = ['Under ₹5 lakh', '₹5–10 lakh', '₹10–25 lakh', '₹25–50 lakh', '₹50 lakh+']
export const timelines = ['Immediately', 'In 1–3 months', 'In 3–6 months', 'Just exploring']
