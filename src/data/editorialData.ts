/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Weaver, 
  TextileDiscipline, 
  WeaveMaterial, 
  WeaveDensity, 
  EmbroideryType, 
  BoutiqueProduct, 
  AppointmentService,
  SareeVideo
} from '../types';

// Weaver Profiles (Generational Master Artisans of Banaras / Varanasi)
export const masterWeavers: Record<string, Weaver> = {
  wazir: {
    id: "weaver-1",
    name: "Master Wazir Ahmad",
    region: "Chowk, Banaras (Varanasi)",
    photo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=500&auto=format&fit=crop",
    bio: "Head weaver and founder's lineage at Wazir & Co, Master Wazir carries forward a six-generation heritage of Kadwa and Jangla Banarasi weaves. His looms are famous for real silver and gold zari brocades.",
    craft: "6th Generation Master Banarasi Weaver",
    experienceYears: 48,
    generations: 6
  },
  anwar: {
    id: "weaver-2",
    name: "Anwar Wazir",
    region: "Lallapura, Banaras",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=500&auto=format&fit=crop",
    bio: "Pioneer of Meenakari Benarasi silk cutwork. Anwar leads a guild of 35 artisan families crafting lightweight, flowing Banarasi drapes with vibrant silk enameling.",
    craft: "National Awardee of Meenakari Banarasi Weaving",
    experienceYears: 32,
    generations: 4
  },
  verma: {
    id: "weaver-3",
    name: "Rajesh & Shruti Verma",
    region: "Madanpura, Banaras",
    photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=500&auto=format&fit=crop",
    bio: "Guardians of royal silk and Shikargah motifs, reviving royal 19th-century court designs depicting hunting scenes, peacocks, and intricate gold filigree borders.",
    craft: "Royal Silk Guild Master",
    experienceYears: 40,
    generations: 5
  }
};

// Textile Disciplines (The Pure Banarasi Curations for The Heritage Archives)
export const textileDisciplines: TextileDiscipline[] = [
  {
    id: "katan-kadwa",
    title: "Red Pure Banarasi Silk Saree",
    subTagline: "Imperial Handwoven Benarasi Silk",
    subtitle: "Embossed gold & silver zari motifs woven without loose floats on reverse",
    description: "The pinnacle of Banarasi craft. Each motif is individually hand-penciled and woven into pure Benarasi silk yarn with painstaking precision, leaving a clean, flawless reverse side.",
    mainImage: "https://i.pinimg.com/1200x/48/27/7d/48277d6150819046676867dca0250ffc.jpg",
    craftStory: "Kadwa weaving requires two master artisans working synchronously on a heavy pitloom. Every single floral 'buta' or 'creeper' is hand-inserted with a small wooden spool called a 'sirki'. It takes great dedication to produce a single heirloom Benarasi silk saree.",
    threadCount: 300,
    weeksToComplete: 18,
    weaver: masterWeavers.wazir,
    historicalContext: "Patronized by Indian royalty and Mughal courts since the 16th century, pure Benarasi Silk remains the ultimate bridal treasure from Banaras.",
    motifs: ["Jangla Floral Creepers", "Kalka Paisley", "Kadwa Floral Buta", "Shikargah Royal Fauna"]
  },
  {
    id: "khaddi-georgette",
    title: "Emerald Green Pure Banarasi Silk Saree",
    subTagline: "Royal Gemstone Elegance",
    subtitle: "Dense gold zari foliage and creeper vines handwoven on deep emerald silk",
    description: "An opulent emerald green pure Banarasi silk saree adorned with dense gold zari Jangla creepers and traditional Banarasi borders. Woven for grand royal occasions.",
    mainImage: "https://i.pinimg.com/1200x/aa/d3/d7/aad3d752872d66a2936f0a8cbbd62ffa.jpg",
    craftStory: "Woven with tightly twisted silk yarns, emerald Jangla offers a rich structured fall that drapes effortlessly around the body with shimmering metallic depth.",
    threadCount: 280,
    weeksToComplete: 12,
    weaver: masterWeavers.anwar,
    historicalContext: "Popularized in Banaras courts as a majestic bridal statement piece representing life, royalty, and timeless heritage.",
    motifs: ["Gold Jangla Jaal", "Bel Floral Vine", "Zari Lattice Grid", "Peacock Plumes"]
  },
  {
    id: "tissue-shikargah",
    title: "Golden Pure Banarasi Silk Saree",
    subTagline: "Gilded Metallic Splendor",
    subtitle: "Radiant golden shimmer woven with precious zari",
    description: "An ethereal fusion of metallic gold threads and fine mulberry silk warp. Reflects light with an unforgettable iridescent glow.",
    mainImage: "https://i.pinimg.com/1200x/2b/ca/15/2bca152d256acdb02d79758b094f8b2a.jpg",
    craftStory: "Crafted by interweaving real gold or silver metallic zari in the weft with ultra-fine silk warp threads. The fabric possesses an otherworldly metallic shine that catches every beam of light.",
    threadCount: 250,
    weeksToComplete: 14,
    weaver: masterWeavers.verma,
    historicalContext: "Originally woven exclusively for royal coronation robes and bridal trousseaus across Banaras and Rajasthan courts.",
    motifs: ["Shikargah Hunting Panels", "Zari Gold Border", "Golden Lattice", "Lotus Bloom"]
  },
  {
    id: "lavender-khaddi",
    title: "Pastel Lavender Pure Banarasi Silk Saree",
    subTagline: "Featherlight Meenakari Grace",
    subtitle: "Fluid Benarasi silk with colorful Meenakari silk floral accents",
    description: "Soft pastel lavender Pure Banarasi Silk Saree with vibrant silk Meenakari threadwork inside silver zari floral vines. Featherlight, fluid, and comfortable.",
    mainImage: "https://i.pinimg.com/1200x/03/49/52/0349528dba1d8eed6c5c9b32fc94fb9a.jpg",
    craftStory: "Woven on pitlooms in Banaras using high-twist pure silk yarns that produce a light, bouncy texture with delicate hand-dyed pastel shades.",
    threadCount: 180,
    weeksToComplete: 8,
    weaver: masterWeavers.anwar,
    historicalContext: "Embraced by modern connoisseurs seeking breezy, lightweight luxury for daytime sangeets and intimate wedding rituals.",
    motifs: ["Meenakari Floral Jaal", "Silver Zari Bel", "Scalloped Border"]
  },
  {
    id: "ruby-magenta-katan",
    title: "Royal Magenta Pink Pure Banarasi Silk Saree",
    subTagline: "Traditional Heritage Loom",
    subtitle: "Intricate royal court motifs handwoven on lustrous magenta silk",
    description: "A breathtaking magenta pink Pure Banarasi Silk Saree showcasing ancient courtly Shikargah motifs of royal elephants, birds, and blooming lotuses.",
    mainImage: "https://i.pinimg.com/1200x/8c/30/38/8c3038350ab1b5a3976fc741f3345705.jpg",
    craftStory: "Shikargah is one of the rarest Banarasi weaving styles, taking months for master weavers to punch drawloom cards for animal and floral figures.",
    threadCount: 320,
    weeksToComplete: 16,
    weaver: masterWeavers.wazir,
    historicalContext: "Inspired by ancient Banaras royal court tapestries and game reserves preserved in Banaras museum archives.",
    motifs: ["Shikargah Fauna", "Royal Elephants", "Golden Lotus", "Brocade Pallu"]
  },
  {
    id: "gold-tanchoi",
    title: "Mustard Gold Pure Banarasi Silk Saree",
    subTagline: "Satin Handwoven Weave",
    subtitle: "Smooth silk weave without floats using multi-colored silk warp",
    description: "Vibrant mustard yellow gold Pure Banarasi Silk Saree with self-patterned brocade weave and delicate metallic zari highlights.",
    mainImage: "https://i.pinimg.com/1200x/5e/e9/c8/5ee9c846a6c434fb59ae960f9227e417.jpg",
    craftStory: "Originated from master weavers who settled in Banaras, crafting a signature smooth texture with intricate raised floral relief.",
    threadCount: 220,
    weeksToComplete: 10,
    weaver: masterWeavers.verma,
    historicalContext: "Treasured across generations for its soft touch against the skin and lightweight royal appearance.",
    motifs: ["Relief Flowers", "Paisley Border", "Gold Zari Edge"]
  }
];

// Interactive Weave Lab Configurations
export const weaveMaterials: WeaveMaterial[] = [
  {
    id: "katan-silk",
    name: "Pure Mulberry Banarasi Silk",
    origin: "Chowk, Banaras",
    feel: "Lustrous, substantial drape with rich structured fall and royal hand-feel.",
    description: "Twisted pure mulberry silk filaments spun together to form a strong, highly lustrous yarn that gives Pure Banarasi Silk its legendary strength and royal sheen.",
    availableDensities: ["density-med", "density-high"],
    zariRatio: "35% Gold-Plated Zari"
  },
  {
    id: "khaddi-georgette-mat",
    name: "Pure Benarasi Soft Silk",
    origin: "Lallapura, Banaras",
    feel: "Ultralight, fluid drape with effortless body contouring.",
    description: "Hand-spun silk yarns woven on traditional pitlooms and hand-dyed using organic color vats.",
    availableDensities: ["density-low", "density-med"],
    zariRatio: "15% Fine Cutwork Zari"
  },
  {
    id: "tissue-gold-mat",
    name: "Royal Golden Banarasi Silk",
    origin: "Madanpura, Banaras",
    feel: "Crisp, iridescent metallic sheen with a majestic heirloom finish.",
    description: "Woven with metallic zari warp and pure silk weft, producing a mirror-like golden reflection favoured for grand bridal trousseaus.",
    availableDensities: ["density-high", "density-couture"],
    zariRatio: "50% Real Silver-Gold Zari"
  }
];

export const weaveDensities: WeaveDensity[] = [
  {
    id: "density-low",
    label: "Fluid Silk (120 Count)",
    count: "120s Silk Thread Count",
    description: "Lightweight and breathable, ideal for festive receptions and evening celebrations.",
    zoomOverlayPattern: "repeating-linear-gradient(45deg, rgba(74, 18, 26, 0.04) 0px, rgba(74, 18, 26, 0.04) 2px, transparent 2px, transparent 12px)",
    difficultyMultiplier: 1.2
  },
  {
    id: "density-med",
    label: "Heritage Loom (200 Count)",
    count: "200s Pure Silk Thread Count",
    description: "The gold standard for classic Pure Banarasi Silk. Perfectly balanced weight and structure.",
    zoomOverlayPattern: "repeating-linear-gradient(90deg, rgba(47, 62, 70, 0.06) 0px, rgba(47, 62, 70, 0.06) 1px, transparent 1px, transparent 4px)",
    difficultyMultiplier: 1.8
  },
  {
    id: "density-high",
    label: "Imperial Kadwa (300 Count)",
    count: "300s Heavy Silk Thread Count",
    description: "Requires two master artisans. Motifs are hand-inserted with zero loose float threads.",
    zoomOverlayPattern: "repeating-linear-gradient(0deg, rgba(197, 168, 128, 0.08) 0px, rgba(197, 168, 128, 0.08) 1px, transparent 1px, transparent 2px)",
    difficultyMultiplier: 2.5
  },
  {
    id: "density-couture",
    label: "Wazir Royal Archive (400+ Count)",
    count: "400s Real Gold Zari Thread Count",
    description: "Museum-grade heirloom quality reserved for royal weddings and heritage collectors.",
    zoomOverlayPattern: "radial-gradient(circle, rgba(74, 18, 26, 0.08) 0.5px, transparent 0.5px)",
    difficultyMultiplier: 4.0
  }
];

export const embroideryTypes: EmbroideryType[] = [
  {
    id: "emb-none",
    name: "Pure Benarasi Silk Woven Zari",
    description: "No post-loom embroidery. The beauty relies entirely on pure Jacquard and Kadwa loom weaving.",
    timePerSqInch: "0 hours"
  },
  {
    id: "emb-meenakari",
    name: "Meenakari Silk Thread Enameling",
    description: "Hand-inserted colorful silk threads accenting the gold zari motifs for a multi-tonal floral effect.",
    timePerSqInch: "4.0 hours"
  },
  {
    id: "emb-zardozi",
    name: "Royal Banarasi Zardozi & Dabka",
    description: "Hand-sewing coiled metallic silver and gold wires onto stiff silk borders for regal embossed depth.",
    timePerSqInch: "7.0 hours"
  }
];

// Curated Pure Banarasi Saree Masterpieces
export const curatedProducts: BoutiqueProduct[] = [
  {
    id: "saree-1",
    title: "Red Pure Banarasi Silk Saree",
    category: "Sarees",
    subCategory: "Pure Banarasi Silk Saree",
    price: 24500,
    image: "https://i.pinimg.com/1200x/48/27/7d/48277d6150819046676867dca0250ffc.jpg",
    secondaryImage: "https://i.pinimg.com/1200x/48/27/7d/48277d6150819046676867dca0250ffc.jpg",
    description: "The imperial centerpiece of Iraaya. Red Pure Banarasi Silk Saree woven in deep scarlet red silk on pitlooms in Banaras, featuring embossed Kadwa gold zari floral motifs and a regal architectural pallu.",
    threadCount: "Pure Banarasi Silk",
    artisanName: "Master Wazir Ahmad & Guild",
    motifsUsed: ["Kadwa Gold Buta", "Jangla Floral Bel", "Kalka Paisley Pallu"],
    specs: ["100% Pure Benarasi Silk", "Pure gold-plated zari threadwork", "Clean back finish with no loose floats", "Silk Mark Certified Authenticity"],
    inStock: true,
    isBestSeller: true,
    isPremium: true
  },
  {
    id: "saree-2",
    title: "Emerald Green Pure Banarasi Silk Saree",
    category: "Sarees",
    subCategory: "Pure Banarasi Silk Saree",
    price: 22800,
    image: "https://i.pinimg.com/1200x/aa/d3/d7/aad3d752872d66a2936f0a8cbbd62ffa.jpg",
    secondaryImage: "https://i.pinimg.com/1200x/aa/d3/d7/aad3d752872d66a2936f0a8cbbd62ffa.jpg",
    description: "An opulent Emerald Green Pure Banarasi Silk Saree adorned with dense gold zari Jangla creepers and traditional Banarasi borders. Woven for grand royal occasions.",
    threadCount: "Pure Banarasi Silk",
    artisanName: "Anwar Wazir & Lallapura Weavers",
    motifsUsed: ["Gold Jangla Jaal", "Heavy Zari Border", "Floral Creepers"],
    specs: ["100% Pure Benarasi Silk", "Hand-dyed rich gem tone emerald", "Intricate gold zari brocade work", "Comes with unstitched silk blouse piece"],
    inStock: true,
    isBestSeller: true,
    isPremium: false
  },
  {
    id: "saree-3",
    title: "Golden Pure Banarasi Silk Saree",
    category: "Sarees",
    subCategory: "Pure Banarasi Silk Saree",
    price: 28000,
    image: "https://i.pinimg.com/1200x/2b/ca/15/2bca152d256acdb02d79758b094f8b2a.jpg",
    secondaryImage: "https://i.pinimg.com/1200x/2b/ca/15/2bca152d256acdb02d79758b094f8b2a.jpg",
    description: "A showstopping Golden Pure Banarasi Silk Saree from Iraaya. Crafted with metallic gold zari weft and ultra-fine silk warp, showcasing shimmering gold brocade weave.",
    threadCount: "Pure Banarasi Silk",
    artisanName: "Rajesh Verma & Madanpura Guild",
    motifsUsed: ["Gold Tissue Weave", "Royal Floral Brocade", "Gilded Lattice"],
    specs: ["100% Pure Metallic Tissue Silk", "Heavy heirloom gold zari finish", "Unmatched metallic luster", "Silk Mark Authenticity Sealed"],
    inStock: true,
    isBestSeller: false,
    isPremium: true
  },
  {
    id: "saree-4",
    title: "Pastel Lavender Pure Banarasi Silk Saree",
    category: "Sarees",
    subCategory: "Pure Banarasi Silk Saree",
    price: 16500,
    image: "https://i.pinimg.com/1200x/03/49/52/0349528dba1d8eed6c5c9b32fc94fb9a.jpg",
    secondaryImage: "https://i.pinimg.com/1200x/03/49/52/0349528dba1d8eed6c5c9b32fc94fb9a.jpg",
    description: "Soft Pastel Lavender Pure Banarasi Silk Saree with vibrant silk Meenakari threadwork inside silver zari floral vines. Featherlight, fluid, and comfortable.",
    threadCount: "Pure Banarasi Silk",
    artisanName: "Banaras Khaddi Guild",
    motifsUsed: ["Meenakari Floral Jaal", "Silver Zari Border", "Paisley Medallion"],
    specs: ["100% Pure Silk Georgette", "Featherlight, soft body drape", "Meenakari colored silk detailing", "Silk Mark Certified"],
    inStock: true,
    isBestSeller: true,
    isPremium: false
  },
  {
    id: "saree-5",
    title: "Midnight Black Pure Banarasi Silk Saree",
    category: "Sarees",
    subCategory: "Pure Banarasi Silk Saree",
    price: 26000,
    image: "https://i.pinimg.com/1200x/8c/30/38/8c3038350ab1b5a3976fc741f3345705.jpg",
    secondaryImage: "https://i.pinimg.com/1200x/8c/30/38/8c3038350ab1b5a3976fc741f3345705.jpg",
    description: "A dramatic Midnight Black Pure Banarasi Silk Saree adorned with gold Kadwa motifs and multi-colored Meenakari floral highlights. Dramatic, majestic, and unforgettable.",
    threadCount: "Pure Banarasi Silk",
    artisanName: "Master Wazir Heritage Guild",
    motifsUsed: ["Black Katan Weave", "Multi-colored Meenakari", "Gold Zari Temple Border"],
    specs: ["100% Pure Katan Mulberry Silk", "Striking contrast gold & color weave", "Rich structured fall", "Includes matching unstitched blouse piece"],
    inStock: true,
    isBestSeller: false,
    isPremium: true
  },
  {
    id: "saree-6",
    title: "Royal Plum Purple Pure Banarasi Silk Saree",
    category: "Sarees",
    subCategory: "Pure Banarasi Silk Saree",
    price: 19200,
    image: "https://i.pinimg.com/1200x/5e/e9/c8/5ee9c846a6c434fb59ae960f9227e417.jpg",
    secondaryImage: "https://i.pinimg.com/1200x/5e/e9/c8/5ee9c846a6c434fb59ae960f9227e417.jpg",
    description: "Deep Royal Plum Purple Pure Banarasi Silk Saree woven with intricate satin-weave self patterns and shimmering gold zari borders. Smooth as liquid glass with a rich metallic luster.",
    threadCount: "Pure Banarasi Silk",
    artisanName: "Chowk Banaras Weavers",
    motifsUsed: ["Tanchoi Swirls", "Gold Border", "Paisley Selvedge"],
    specs: ["100% Pure Tanchoi Silk", "Liquid smooth satin hand-feel", "Rich sheen and royal fall", "Includes matching silk blouse piece"],
    inStock: true,
    isBestSeller: true,
    isPremium: false
  },
  {
    id: "saree-7",
    title: "Regal Magenta Pink Pure Banarasi Silk Saree",
    category: "Sarees",
    subCategory: "Pure Banarasi Silk Saree",
    price: 25500,
    image: "https://i.pinimg.com/1200x/83/3e/8e/833e8e19cff57d690a2dcf7d58b432cf.jpg",
    secondaryImage: "https://i.pinimg.com/1200x/83/3e/8e/833e8e19cff57d690a2dcf7d58b432cf.jpg",
    description: "A ceremonial bridal Regal Magenta Pink Pure Banarasi Silk Saree with antique gold zari Kadwa weaving throughout the body and pallu.",
    threadCount: "Pure Banarasi Silk",
    artisanName: "Master Wazir Ahmad & Guild",
    motifsUsed: ["Kadwa Antique Gold Buti", "Intricate Kalka Pallu", "Traditional Border"],
    specs: ["100% Pure Benarasi Katan Silk", "Antique gold zari finish", "Clean back without floats", "Silk Mark Authenticity Certified"],
    inStock: true,
    isBestSeller: false,
    isPremium: true
  },
  {
    id: "saree-8",
    title: "Turquoise Blue Pure Banarasi Silk Saree",
    category: "Sarees",
    subCategory: "Pure Banarasi Silk Saree",
    price: 18000,
    image: "https://i.pinimg.com/736x/a2/03/bb/a203bb9b7c51c517fffedfdb3fee4e4e.jpg",
    secondaryImage: "https://i.pinimg.com/736x/a2/03/bb/a203bb9b7c51c517fffedfdb3fee4e4e.jpg",
    description: "Vibrant Turquoise Blue Pure Banarasi Silk Saree featuring gold zari floral lattice and hand cutwork technique.",
    threadCount: "Pure Banarasi Silk",
    artisanName: "Lallapura Cutwork Guild",
    motifsUsed: ["Cutwork Zari Lattice", "Turquoise Silk Sheen", "Floral Vine Border"],
    specs: ["100% Pure Silk Georgette", "Soft and fluid drape", "Vibrant ocean turquoise shade", "Includes unstitched blouse piece"],
    inStock: true,
    isBestSeller: true,
    isPremium: false
  },
  {
    id: "saree-9",
    title: "Dusky Blush Pink Pure Banarasi Silk Saree",
    category: "Sarees",
    subCategory: "Pure Banarasi Silk Saree",
    price: 15800,
    image: "https://i.pinimg.com/1200x/79/c2/fb/79c2fb7d354e4f6271b00324635689a0.jpg",
    secondaryImage: "https://i.pinimg.com/1200x/79/c2/fb/79c2fb7d354e4f6271b00324635689a0.jpg",
    description: "An ethereal Dusky Blush Pink Pure Banarasi Silk Saree woven with delicate silver zari floral vines. Light as morning mist, ideal for daytime nuptials.",
    threadCount: "Pure Banarasi Silk",
    artisanName: "Banaras Organza Studio",
    motifsUsed: ["Silver Zari Vines", "Lotus Medallions", "Sheer Border"],
    specs: ["100% Pure Silk Organza", "Crisp lightweight structure", "Subtle silver zari sheen", "Dry clean only"],
    inStock: true,
    isBestSeller: false,
    isPremium: false
  },
  {
    id: "saree-10",
    title: "Royal Navy Blue Pure Banarasi Silk Saree",
    category: "Sarees",
    subCategory: "Pure Banarasi Silk Saree",
    price: 23500,
    image: "https://i.pinimg.com/1200x/6c/eb/b8/6cebb883c254ba7e4fd93897afb32b0d.jpg",
    secondaryImage: "https://i.pinimg.com/1200x/6c/eb/b8/6cebb883c254ba7e4fd93897afb32b0d.jpg",
    description: "Rich Royal Navy Blue Pure Banarasi Silk Saree woven with all-over gold zari brocade jaal and contrasting red selvage.",
    threadCount: "Pure Banarasi Silk",
    artisanName: "Chowk Guild Master Wazir",
    motifsUsed: ["All-Over Gold Brocade", "Red Selvedge Accent", "Royal Pallu"],
    specs: ["100% Pure Benarasi Silk", "Heavy gold zari brocade", "Classic royal blue hue", "Silk Mark Authenticity Certified"],
    inStock: true,
    isBestSeller: true,
    isPremium: true
  },
  {
    id: "saree-11",
    title: "Royal Maroon Gold Pure Banarasi Silk Saree",
    category: "Sarees",
    subCategory: "Pure Banarasi Silk Saree",
    price: 32000,
    image: "https://i.pinimg.com/1200x/3c/ad/aa/3cadaa5250a611fb19b46e7d8fef7bb7.jpg",
    secondaryImage: "https://i.pinimg.com/1200x/3c/ad/aa/3cadaa5250a611fb19b46e7d8fef7bb7.jpg",
    description: "The pinnacle heirloom Royal Maroon Gold Pure Banarasi Silk Saree woven with pure silver-gold electroplated zari on rich maroon silk.",
    threadCount: "Pure Banarasi Silk",
    artisanName: "Master Wazir Ahmad & Sons",
    motifsUsed: ["Shikargah Court Motifs", "Real Zari Border", "Imperial Arch Pallu"],
    specs: ["100% Pure Heirloom Silk", "Electroplated silver-gold real zari", "Museum-grade craftsmanship", "Delivered in silk preservation box"],
    inStock: true,
    isBestSeller: false,
    isPremium: true
  },
  {
    id: "zaira-bs12",
    title: "Royal Emerald & Gold Zari Pure Banarasi Silk Saree",
    category: "Sarees",
    subCategory: "Pure Banarasi Silk Saree",
    price: 21500,
    image: "https://i.pinimg.com/1200x/34/49/a5/3449a5e3b72f044049893524d178e53a.jpg",
    secondaryImage: "https://i.pinimg.com/1200x/34/49/a5/3449a5e3b72f044049893524d178e53a.jpg",
    description: "A majestic Pure Banarasi Silk Saree handcrafted with intricate gold zari brocade weave, rich borders, and an ornate traditional pallu direct from Benaras master artisans.",
    threadCount: "Pure Katan Silk",
    artisanName: "Master Wazir Ahmad & Guild",
    motifsUsed: ["Kadwa Gold Jaal", "Royal Zari Border", "Floral Paisley Pallu"],
    specs: ["100% Pure Banarasi Katan Silk", "Pure electroplated gold zari threadwork", "Silk Mark Certified Authenticity", "Includes unstitched silk blouse piece"],
    inStock: true,
    isBestSeller: true,
    isPremium: true,
  },
  {
    id: "zaira-bs25",
    title: "Vintage Wine & Antique Gold Zari Pure Banarasi Silk Saree",
    category: "Sarees",
    subCategory: "Pure Banarasi Silk Saree",
    price: 23500,
    image: "https://i.pinimg.com/736x/70/9a/5b/709a5b42ec82d266121a4cc8a900b98e.jpg",
    secondaryImage: "https://i.pinimg.com/736x/70/9a/5b/709a5b42ec82d266121a4cc8a900b98e.jpg",
    description: "A deep vintage wine-red Banarasi silk drape adorned with antique gold zari weaving and handcrafted traditional floral motifs.",
    threadCount: "Pure Banarasi Katan",
    artisanName: "Banaras Heritage Guild",
    motifsUsed: ["Antique Gold Zari", "Floral Jaal", "Selvedge Edge"],
    specs: ["100% Pure Katan Silk", "Handwoven in Banaras", "Silk Mark Certified"],
    inStock: true,
    isBestSeller: true,
    isPremium: true,
  },
  {
    id: "zaira-bs26",
    title: "Midnight Blue & Gold Brocade Banarasi Silk Saree",
    category: "Sarees",
    subCategory: "Pure Banarasi Silk Saree",
    price: 25800,
    image: "https://i.pinimg.com/1200x/f3/4a/dd/f34adde06607535b7b5a9420bc1122d6.jpg",
    secondaryImage: "https://i.pinimg.com/1200x/f3/4a/dd/f34adde06607535b7b5a9420bc1122d6.jpg",
    description: "Royal midnight blue Banarasi silk saree enriched with metallic gold brocade zari work and heavy ornamental pallu.",
    threadCount: "Pure Tissue Silk",
    artisanName: "Lallapura Weavers Guild",
    motifsUsed: ["Gold Brocade", "Kalka Motif", "Temple Border"],
    specs: ["100% Pure Benarasi Silk", "Electroplated gold threadwork", "Silk Mark Authenticity"],
    inStock: true,
    isBestSeller: true,
    isPremium: true,
  },
  {
    id: "zaira-bs27",
    title: "Festive Crimson Red & Gold Kadwa Jaal Banarasi Saree",
    category: "Sarees",
    subCategory: "Pure Banarasi Silk Saree",
    price: 28900,
    image: "https://i.pinimg.com/1200x/7a/39/ba/7a39baf0e79413088664eff4a2a5618d.jpg",
    secondaryImage: "https://i.pinimg.com/1200x/7a/39/ba/7a39baf0e79413088664eff4a2a5618d.jpg",
    description: "Iconic bridal crimson red Banarasi silk saree with all-over intricate Kadwa zari jaal work.",
    threadCount: "Pure Katan Silk 220s",
    artisanName: "Master Wazir & Guild",
    motifsUsed: ["Kadwa Gold Jaal", "Jangla Weave", "Grand Pallu"],
    specs: ["100% Pure Mulberry Silk", "Handwoven on pitlooms", "Silk Mark Certified"],
    inStock: true,
    isBestSeller: true,
    isPremium: true,
  }
];

// Showcase Videos of Banarasi Sarees
export const sareeVideos: SareeVideo[] = [
  {
    id: "vid-1",
    title: "Red Pure Banarasi Silk Saree",
    sareeName: "Red Pure Banarasi Silk Saree",
    sareeType: "Pure Banarasi Silk Saree",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-wearing-a-traditional-indian-dress-41525-large.mp4",
    thumbnail: "https://i.pinimg.com/1200x/48/27/7d/48277d6150819046676867dca0250ffc.jpg",
    duration: "0:45",
    likesCount: 1240,
    description: "Watch the majestic gold zari shimmer on Red Pure Banarasi Silk Saree as it drapes gracefully.",
    price: 24500,
    productRefId: "saree-1"
  },
  {
    id: "vid-2",
    title: "Pastel Lavender Pure Banarasi Silk Saree",
    sareeName: "Pastel Lavender Pure Banarasi Silk Saree",
    sareeType: "Pure Banarasi Silk Saree",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-indian-woman-in-traditional-dress-smiling-41523-large.mp4",
    thumbnail: "https://i.pinimg.com/1200x/03/49/52/0349528dba1d8eed6c5c9b32fc94fb9a.jpg",
    duration: "0:38",
    likesCount: 980,
    description: "Featherlight body drape and multi-tone Meenakari silk work under natural sunlight in Banaras studio.",
    price: 16500,
    productRefId: "saree-4"
  },
  {
    id: "vid-3",
    title: "Golden Pure Banarasi Silk Saree",
    sareeName: "Golden Pure Banarasi Silk Saree",
    sareeType: "Pure Banarasi Silk Saree",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-in-a-traditional-indian-saree-posing-41524-large.mp4",
    thumbnail: "https://i.pinimg.com/1200x/2b/ca/15/2bca152d256acdb02d79758b094f8b2a.jpg",
    duration: "0:52",
    likesCount: 2150,
    description: "Close-up 4K footage of real metallic gold zari warp and weft weave producing liquid metallic reflections.",
    price: 28000,
    productRefId: "saree-3"
  },
  {
    id: "vid-4",
    title: "Midnight Black Pure Banarasi Silk Saree",
    sareeName: "Midnight Black Pure Banarasi Silk Saree",
    sareeType: "Pure Banarasi Silk Saree",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-wearing-a-saree-outdoors-41526-large.mp4",
    thumbnail: "https://i.pinimg.com/1200x/8c/30/38/8c3038350ab1b5a3976fc741f3345705.jpg",
    duration: "0:41",
    likesCount: 1620,
    description: "A dramatic look at multi-colored Meenakari motifs popping against rich black background.",
    price: 26000,
    productRefId: "saree-5"
  }
];


// Artisanal Appointment Consultation Categories
export const appointmentServices: AppointmentService[] = [
  {
    id: "bridal-couture",
    title: "Imperial Banarasi Bridal Customization",
    subTitle: "Bespoke Royal Trousseau Mapping",
    description: "A private consultation with our master designers in Banaras to draft your dream bridal drape. Includes custom zari weaving, custom dye matching, and family name weaving in pallu.",
    duration: "120 Minutes",
    priceEstimate: "Complimentary (By Appointment)"
  },
  {
    id: "blouse-engineering",
    title: "Banarasi Blouse Architecture & Fit",
    subTitle: "Custom Saree Companion Tailoring",
    description: "A precision fitting session utilizing 22 body measurements. Our specialist blouse architects craft custom structured corsets and traditional cholis paired with your Banarasi drapes.",
    duration: "60 Minutes",
    priceEstimate: "$75 Standard Session"
  },
  {
    id: "family-heirloom",
    title: "Banarasi Heirloom Restoration & Commission",
    subTitle: "Vintage Saree Preservation",
    description: "Bring in vintage Banarasi sarees for physical analysis, re-polishing, and restoration. Alternatively, commission a bespoke Banarasi pattern to be hand-woven exclusively for your family over 3-6 months.",
    duration: "90 Minutes",
    priceEstimate: "Complimentary (By Appointment Only)"
  }
];

// Atmospheric Banaras Sitar & Tanpura Drone (Web Audio API)
export const playTanpuraDrone = (audioCtx: AudioContext): { stop: () => void } => {
  const gainNode = audioCtx.createGain();
  gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  gainNode.connect(audioCtx.destination);
  gainNode.gain.linearRampToValueAtTime(0.22, audioCtx.currentTime + 2.0);

  let active = true;

  const droneOscs: OscillatorNode[] = [];
  const droneGains: GainNode[] = [];

  const baseFreqs = [110, 164.81, 220, 329.63]; // A-E Tanpura drone tuned to Banaras classical scale

  baseFreqs.forEach((freq, idx) => {
    const osc = audioCtx.createOscillator();
    const oscGain = audioCtx.createGain();
    
    osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    oscGain.gain.value = 0.08 / (idx + 1);
    
    osc.connect(oscGain);
    oscGain.connect(gainNode);
    
    osc.start();
    droneOscs.push(osc);
    droneGains.push(oscGain);
  });

  return {
    stop: () => {
      if (!active) return;
      active = false;
      try {
        gainNode.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 1.0);
        setTimeout(() => {
          droneOscs.forEach(o => o.stop());
        }, 1100);
      } catch {
        // ignore audio cleanup edge cases
      }
    }
  };
};
