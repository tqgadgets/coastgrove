// PLACEHOLDER: Sample values for phone, email, address, and CSLB license — update before launch.
export const business = {
  name: 'Coast & Grove',
  tagline: 'Greener Lawns, Happier Homes',
  phone: '(949) 555-0142', // PLACEHOLDER
  phoneHref: 'tel:+19495550142', // PLACEHOLDER
  email: 'hello@coastandgrove.com', // PLACEHOLDER
  address: '2450 Harbor View Drive, Newport Beach, CA 92660', // PLACEHOLDER
  license: 'CSLB #000000', // PLACEHOLDER
  licenseNote: 'CSLB #000000, Licensed, Bonded & Insured', // PLACEHOLDER
  hours: 'Mon-Sat, 7:00 AM - 6:00 PM', // PLACEHOLDER
  copyright: '© 2026 Coast & Grove Landscaping. All rights reserved.',
};

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export const stats = [
  { value: '450+', label: 'Projects Completed' },
  { value: '12', label: 'Years in Business' },
  { value: '98%', label: 'Happy Clients' },
];

export const services = [
  {
    id: 'design-install',
    title: 'Design & Install',
    icon: 'PencilRuler',
    description:
      'Custom 2D and 3D landscape plans tailored to coastal Orange County microclimates, HOA guidelines, and daily outdoor living.',
    bullets: [
      'Site grading, soil preparation, and drainage planning',
      'Full planting, hardscape, and irrigation coordination',
      'Material samples and HOA submittal packages',
    ],
  },
  {
    id: 'lawn-turf',
    title: 'Lawn & Turf',
    icon: 'Leaf',
    description:
      'Thick, resilient warm-season sod and realistic low-water turf installations built for year-round Southern California color.',
    bullets: [
      'Drought-hardy Marathon and Bermuda sod installation',
      'Pet-friendly synthetic turf with permeable backing',
      'Laser-leveled base prep and clean stone edging',
    ],
  },
  {
    id: 'irrigation',
    title: 'Irrigation',
    icon: 'Droplets',
    description:
      'Weather-based smart controllers and precision drip zones that cut water waste while keeping roots deeply hydrated.',
    bullets: [
      'Wi-Fi smart controllers synced to local rainfall',
      'Subsurface and point-source drip conversions',
      'Pressure-regulated heads and backflow testing',
    ],
  },
  {
    id: 'hardscape-patios',
    title: 'Hardscape & Patios',
    icon: 'BrickWall',
    description:
      'Architectural pavers, natural stone walkways, seat walls, and fire features crafted to anchor your backyard.',
    bullets: [
      'Interlocking concrete and porcelain patio pavers',
      'Retaining walls, entry steps, and raised planters',
      'Built-in fire pits and outdoor kitchen pads',
    ],
  },
  {
    id: 'planting',
    title: 'Planting',
    icon: 'Flower2',
    description:
      'Curated California natives, coastal succulents, and specimen olive and citrus trees selected for structure and seasonal bloom.',
    bullets: [
      'Water-wise native and Mediterranean plant palettes',
      'Specimen tree sourcing, staking, and deep watering',
      'Organic compost amendment and bark mulch finishing',
    ],
  },
  {
    id: 'maintenance',
    title: 'Maintenance',
    icon: 'Scissors',
    description:
      'Dependable weekly and biweekly garden care that keeps lawns sharp, hedges shaped, and seasonal beds thriving.',
    bullets: [
      'Precision mowing, edging, and clean debris haul-away',
      'Seasonal shrub pruning and citrus fertilization',
      'Routine irrigation checks and head adjustments',
    ],
  },
  {
    id: 'lighting',
    title: 'Lighting',
    icon: 'Lightbulb',
    description:
      'Warm low-voltage LED fixtures that highlight mature trees, illuminate walkways safely, and extend patio evenings.',
    bullets: [
      'Solid brass path lights and tree uplighting',
      'Hardscape step and seat-wall undercap LEDs',
      'Astronomical dusk-to-dawn transformer timers',
    ],
  },
];

export const images = {
  heroMain: {
    src: '/images/hero-main.jpg',
    alt: 'Modern drought-tolerant front yard with ornamental grasses and a curved paver path',
  },
  heroDetail: {
    src: '/images/hero-detail.jpg',
    alt: 'Succulents, lavender and ornamental grasses in a raised garden bed',
  },
  heroAccent: {
    src: '/images/hero-accent.jpg',
    alt: 'Drought-tolerant flowers and ornamental grass in a stone garden planter',
  },
  about1: {
    src: '/images/about-1.jpg',
    alt: 'Freshly planted garden bed with young shrubs and mulch',
  },
  about2: {
    src: '/images/about-2.jpg',
    alt: 'Trimmed hedge and flower border along a stone path',
  },
  about3: {
    src: '/images/about-3.jpg',
    alt: 'Low-voltage landscape lighting glowing at dusk',
  },
  project1Before: {
    src: '/images/project1-before.jpg',
    alt: 'Newport Coast courtyard before remodel',
  },
  project1After: {
    src: '/images/project1-after.jpg',
    alt: 'Newport Coast courtyard after remodel',
  },
  project2Before: {
    src: '/images/project2-before.jpg',
    alt: 'Irvine backyard before turf and planting',
  },
  project2After: {
    src: '/images/project2-after.jpg',
    alt: 'Irvine backyard after turf and planting',
  },
  quoteBg: {
    src: '/images/quote-bg.jpg',
    alt: '',
  },
  aboutStory: {
    src: '/images/about-story.jpg',
    alt: 'Backyard patio with pergola and outdoor seating',
  },
};

export const projects = [
  {
    id: 'newport-coast-courtyard',
    title: 'Newport Coast Courtyard Remodel',
    city: 'Newport Beach',
    services: ['Hardscape & Patios', 'Lighting'],
    timeline: '6 weeks',
    size: '2,400 sq ft',
    beforeLabel: 'PHOTO: Newport Coast Courtyard — BEFORE, 4:3',
    afterLabel: 'PHOTO: Newport Coast Courtyard — AFTER, 4:3',
    beforeSrc: images.project1Before.src,
    beforeAlt: images.project1Before.alt,
    afterSrc: images.project1After.src,
    afterAlt: images.project1After.alt,
    description:
      'Cracked concrete slabs and overgrown hedges were cleared to create an open coastal courtyard centered around a warm limestone paver patio. Low-profile seat walls frame a custom fire feature, while drought-tolerant coastal grasses soften the perimeter. Brass low-voltage path and uplighting fixtures extend the space smoothly from sunset into evening.',
  },
  {
    id: 'irvine-backyard-turf',
    title: 'Irvine Backyard Turf & Planting',
    city: 'Irvine',
    services: ['Lawn & Turf', 'Irrigation', 'Planting'],
    timeline: '4 weeks',
    size: '3,100 sq ft',
    beforeLabel: 'PHOTO: Irvine Backyard — BEFORE, 4:3',
    afterLabel: 'PHOTO: Irvine Backyard — AFTER, 4:3',
    beforeSrc: images.project2Before.src,
    beforeAlt: images.project2Before.alt,
    afterSrc: images.project2After.src,
    afterAlt: images.project2After.alt,
    description:
      'A patchy, water-hungry lawn was replaced with a clean play area of low-water turf bordered by raised decomposed granite beds. We converted outdated spray heads to pressure-regulated drip lines paired with a weather-smart controller. Layered California natives, rosemary, and two mature olive trees bring shade and privacy without high water bills.',
  },
];

export const reviewsSummary = '4.9 average from 120+ reviews';

export const reviews = [
  {
    id: 'rev-1',
    name: 'Hannah Alvarez',
    city: 'Newport Beach',
    service: 'Hardscape & Patios',
    rating: 5,
    text: 'Coast & Grove turned our uneven front courtyard into a welcoming stone entry right on schedule. The crew kept the walkways swept every afternoon and walked us through every detail.',
  },
  {
    id: 'rev-2',
    name: 'David Kim',
    city: 'Irvine',
    service: 'Lawn & Turf',
    rating: 5,
    text: 'Our backyard used to turn brown every August despite constant watering. Their turf installation and smart drip zones cut our outdoor water bill in half and look great.',
  },
  {
    id: 'rev-3',
    name: 'Claire Bennett',
    city: 'Laguna Beach',
    service: 'Planting',
    rating: 5,
    text: 'They picked coastal plants that actually thrive in the salt air and steep hillside sun. Six months later, everything has filled in naturally with very little upkeep.',
  },
  {
    id: 'rev-4',
    name: 'Marcus Patel',
    city: 'Costa Mesa',
    service: 'Design & Install',
    rating: 5,
    text: 'From the first sketch to final walkthrough, communication was clear and there were zero surprise fees. We spend every weekend on the new patio now.',
  },
  {
    id: 'rev-5',
    name: 'Laura Simmons',
    city: 'Mission Viejo',
    service: 'Irrigation',
    rating: 5,
    text: 'Their team mapped all seven valve zones, fixed two hidden leaks, and set up the smart controller on my phone. My citrus trees and rose beds have never looked healthier.',
  },
  {
    id: 'rev-6',
    name: 'Trevor Brooks',
    city: 'Anaheim Hills',
    service: 'Lighting',
    rating: 5,
    text: 'Adding warm brass uplights to our oaks and step lights along the patio completely changed how our yard feels at night. Everything is tucked away cleanly with no visible wires.',
  },
];

export const processSteps = [
  {
    step: '01',
    title: 'Free Consultation',
    description:
      'We walk your property together, listen to how you want to use your yard, and evaluate sun, soil, and drainage.',
  },
  {
    step: '02',
    title: 'Design & Quote',
    description:
      'You receive a clear plant and material plan paired with a line-by-line fixed proposal and realistic build timeline.',
  },
  {
    step: '03',
    title: 'Build & Enjoy',
    description:
      'Our dedicated crew handles every phase cleanly from grading to final lighting aim so your yard is ready to live in.',
  },
];

export const values = [
  {
    title: 'Craftsmanship',
    description:
      'Proper base compaction, deep root prep, and solid brass hardware ensure every patio and garden bed lasts for years.',
  },
  {
    title: 'Water-Wise Design',
    description:
      'We pair Southern California native and Mediterranean plants with smart drip irrigation that respects local water resources.',
  },
  {
    title: 'Clear Communication',
    description:
      'You get one dedicated point of contact, daily site tidiness, and transparent milestone updates from start to finish.',
  },
];

export const serviceAreas = [
  'Irvine',
  'Newport Beach',
  'Laguna Beach',
  'Costa Mesa',
  'Mission Viejo',
  'Anaheim Hills',
  'Huntington Beach',
  'Tustin',
];

export const faqs = [
  {
    question: 'How long does a typical landscape remodel take?',
    answer:
      'Smaller turf and irrigation upgrades usually wrap up in 1 to 2 weeks, while full front or backyard builds with pavers, planting, and lighting take 4 to 8 weeks depending on scope and material lead times.',
  },
  {
    question: 'Do you handle HOA submittals and city permits?',
    answer:
      'Yes. We prepare scaled plans, plant lists, and paver material boards for Orange County HOA architectural committees and coordinate city permits whenever retaining walls, gas lines, or covered structures require them.',
  },
  {
    question: 'Can you design a drought-tolerant yard that still feels lush?',
    answer:
      'Yes. By layering silver-green olive trees, flowering sages, ornamental grasses, and warm stone mulch, we create full, colorful gardens that use up to 60% less water than traditional lawn-heavy yards.',
  },
  {
    question: 'What warranties come with your installations?',
    answer:
      'Hardscape pavers and retaining walls carry a 5-year workmanship warranty, irrigation components and brass lighting fixtures follow manufacturer warranties up to 10 years, and new trees and shrubs include a 1-year plant guarantee with proper watering.',
  },
  {
    question: 'How do pricing and estimates work?',
    answer:
      'After an on-site consultation, we provide a written, itemized proposal covering labor, materials, and disposal with no hidden markups. Payment is broken into clear project milestones as work progresses.',
  },
  {
    question: 'Do you offer ongoing maintenance after installation?',
    answer:
      'Yes. Clients can enroll in weekly or biweekly maintenance plans that include mowing, seasonal pruning, organic fertilizing, and quarterly smart irrigation controller tune-ups.',
  },
];

export const quoteFormOptions = {
  services: services.map((service) => service.title),
  budgets: [
    'Under $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000+',
    'Not sure yet',
  ],
};

export const homeContent = {
  hero: {
    badge: 'Premium Landscaping in Orange County',
    title: 'Greener Lawns, Happier Homes',
    description:
      'Custom outdoor living spaces, water-wise planting, and precision stonework designed and built for coastal Orange County neighborhoods.',
    primaryCta: 'Get a Free Quote',
    secondaryCta: 'View Our Projects',
    heroPhotoLabel: 'PHOTO: Hero landscape, 4:5',
    detailPhotoLabel: 'PHOTO: Garden detail, 1:1',
  },
  about: {
    badge: 'About Coast & Grove',
    title: 'Rooted in Craft, Built for Coastal Living',
    description:
      'For over 12 years, our licensed Orange County crew has helped homeowners replace tired lawns and cracked concrete with inviting, water-smart yards built to thrive in Southern California sun.',
    cta: 'More About Us',
  },
  services: {
    badge: 'Our Services',
    title: 'Complete Outdoor Care, Start to Finish',
    cta: 'Explore All Services',
  },
  projects: {
    badge: 'Our Projects',
    title: 'Real Transformations Across Orange County',
    cta: 'View Project Details',
  },
  reviews: {
    badge: 'Reviews',
    title: 'Trusted by Local Homeowners',
  },
  process: {
    badge: 'How It Works',
    title: 'A Simple Three-Step Build Process',
  },
  quote: {
    title: "Let's Grow Something Beautiful Together",
    description:
      'Tell us a bit about your property and goals. We will follow up to schedule an on-site walk-through and clear written estimate.',
    backgroundLabel: 'PHOTO: Garden background',
  },
};

export const pageBanners = {
  services: {
    badge: 'Our Services',
    title: 'Landscaping Services Tailored to Your Property',
    description:
      'From initial grading and smart irrigation to pavers, native planting, and ongoing garden care.',
  },
  projects: {
    badge: 'Our Projects',
    title: 'Featured Backyard & Courtyard Transformations',
    description:
      'See how we turn worn lawns and dated hardscapes into lasting outdoor living spaces.',
  },
  about: {
    badge: 'About Us',
    title: 'Local Craftsmanship With Water-Wise Roots',
    description:
      'Meet the Newport Beach team behind 450+ Orange County residential landscapes.',
  },
  contact: {
    badge: 'Contact Us',
    title: 'Request Your Free On-Site Estimate',
    description:
      'Reach out to discuss your yard, timeline, and budget with our project team.',
  },
};

export const aboutPageContent = {
  storyTitle: 'Twelve Years of Building Lasting Gardens',
  storyParagraphs: [
    'Coast & Grove began in Newport Beach with a simple goal: build residential landscapes that look effortless on day one and keep getting better five summers later. Instead of rushing through surface-level fixes, our crew invests in proper grading, amended soil, and durable stone and brass materials.',
    'Today our designers, irrigation technicians, and masons serve homeowners across Orange County—from coastal courtyards in Laguna Beach to family backyards in Irvine and Mission Viejo.',
  ],
  storyImageLabel: 'PHOTO: Coast & Grove crew on site, 4:3',
};

export const seo = {
  home: {
    title: 'Coast & Grove | Landscaping in Orange County, CA',
    description:
      'Custom landscape design, pavers, low-water turf, and smart irrigation in Newport Beach and Orange County, CA. Request a free on-site quote today.',
  },
  services: {
    title: 'Landscaping Services | Coast & Grove',
    description:
      'Explore full-service Orange County landscaping: custom design, drought-tolerant planting, hardscape patios, turf, smart irrigation, and outdoor lighting.',
  },
  projects: {
    title: 'Before & After Projects | Coast & Grove',
    description:
      'Browse real before-and-after backyard and courtyard transformations across Newport Beach, Irvine, and Orange County by Coast & Grove Landscaping.',
  },
  about: {
    title: 'About Us | Coast & Grove',
    description:
      'Meet the licensed Newport Beach landscaping team behind 450+ Orange County outdoor living spaces built with craftsmanship and water-wise care.',
  },
  contact: {
    title: 'Free Quote | Coast & Grove',
    description:
      'Request a free on-site landscaping estimate in Orange County. Share your yard goals, timeline, and budget with the Coast & Grove project team.',
  },
  notFound: {
    title: 'Page Not Found | Coast & Grove',
    description:
      'This page could not be found on Coast & Grove. Explore our Orange County landscaping services, recent projects, or request a free yard estimate.',
    noindex: true,
  },
};
