import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

// Load environment variables from .env.local & .env
dotenv.config({ path: '.env.local' })
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/* ==========================================================================
   SANITY WRITE CLIENT INITIALIZATION
   ========================================================================== */

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN

console.log('----------------------------------------------------')
console.log('🚀 Starting Sanity Full Data & Category Migration Engine')
console.log('----------------------------------------------------')

if (!projectId || projectId === 'placeholder-project-id') {
  console.error('❌ ERROR: NEXT_PUBLIC_SANITY_PROJECT_ID is missing or invalid in .env.local.')
  console.error('Please configure your real project ID in .env.local before running the migration.\n')
  process.exit(1)
}

if (!token) {
  console.error('❌ ERROR: SANITY_WRITE_TOKEN (or SANITY_API_TOKEN) is missing in .env.local.\n')
  process.exit(1)
}

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false, // Bypass CDN cache to ensure immediate live DB updates
})

/* ==========================================================================
   HELPER UTILITIES
   ========================================================================== */

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

async function uploadAsset(filePath, assetType = 'image') {
  const absolutePath = path.resolve(__dirname, filePath)
  if (!fs.existsSync(absolutePath)) {
    console.warn(`  ⚠️ Local file not found: "${filePath}". Skipping asset upload.`)
    return null
  }

  try {
    const filename = path.basename(absolutePath)
    console.log(`  ⬆️ Uploading ${assetType}: ${filename}...`)
    const stream = fs.createReadStream(absolutePath)
    const assetDoc = await writeClient.assets.upload(assetType, stream, { filename })
    console.log(`  ✅ Uploaded ${assetType} asset ID: ${assetDoc._id}`)
    return assetDoc._id
  } catch (error) {
    console.error(`  ❌ Asset upload failed for "${filePath}":`, error.message)
    return null
  }
}

/* ==========================================================================
   CATEGORY & PROJECT DATA DEFINITIONS
   ========================================================================== */

const categoriesData = [
  {
    id: 'import-category-directing',
    title: 'Directing',
    slug: 'directing',
    description: 'Narrative feature films, high-concept short films, and dramatic visual storytelling.',
    iconName: 'film',
    projects: [
      {
        id: 'dir-1',
        title: 'Whispers in the Wind (Official Trailer)',
        description: 'An atmospheric drama exploring memory, loss, and redemption in a coastal fishing village.',
        imagePath: 'public/images/portfolio-hero.webp',
        role: 'Director / Co-Writer',
        year: '2025',
        youtubeUrl: 'https://youtu.be/VP3XJtT3xNo',
      },
      {
        id: 'dir-2',
        title: 'Echoes of Silence',
        description: 'A neo-noir psychological thriller centered on an archivist unearthing forgotten audio recordings.',
        imagePath: 'public/images/directing-2.webp',
        role: 'Director',
        year: '2025',
      },
      {
        id: 'dir-3',
        title: 'Chasing Shadows',
        description: 'A visually arresting documentary on underground performers surviving in modern metropolises.',
        imagePath: 'public/images/directing-3.webp',
        role: 'Director / Cinematographer',
        year: '2024',
      },
      {
        id: 'dir-4',
        title: 'Fragments of Time',
        description: 'Experimental surrealist short exploring distorted timelines and nostalgic memories.',
        imagePath: 'public/images/directing-4.webp',
        role: 'Director',
        year: '2024',
      },
      {
        id: 'dir-5',
        title: 'Midnight Monologues',
        description: 'Intimate character study examining isolation and connection across urban landscapes.',
        imagePath: 'public/images/directing-5.webp',
        role: 'Director',
        year: '2024',
      },
      {
        id: 'dir-6',
        title: 'Nocturne in Blue',
        description: 'Stylized noir short exploring late-night confessions and hidden identities.',
        imagePath: 'public/images/directing-6.webp',
        role: 'Director',
        year: '2023',
      },
      {
        id: 'dir-7',
        title: 'Tides of Grace',
        description: 'Poetic documentary capturing coastal heritage and generational storytelling.',
        imagePath: 'public/images/directing-7.webp',
        role: 'Director',
        year: '2023',
      },
      {
        id: 'dir-8',
        title: 'Beyond the Frame',
        description: 'Behind-the-camera visual study on framing, light, and performance dynamics.',
        imagePath: 'public/images/directing-8.webp',
        role: 'Director',
        year: '2023',
      },
      {
        id: 'dir-9',
        title: 'Silhouettes at Dusk',
        description: 'Anamorphic short film exploring twilight mood and unspoken subtext.',
        imagePath: 'public/images/directing-9.webp',
        role: 'Director',
        year: '2022',
      },
      {
        id: 'dir-10',
        title: 'The Unseen Journey',
        description: 'Visual reel capturing directorial highlights across independent feature productions.',
        imagePath: 'public/images/directing-10.webp',
        role: 'Director',
        year: '2022',
      },
    ],
  },
  {
    id: 'import-category-writing',
    title: 'Screenwriting',
    slug: 'screenwriting',
    description: 'Character-driven feature screenplays, episodic series bibles, and original narrative treatments.',
    iconName: 'clapperboard',
    projects: [
      {
        id: 'writ-1',
        title: 'Beyond the Horizon',
        description: 'Feature screenplay about a rogue astronomer tracking an anomaly off the coast of West Africa.',
        imagePath: 'public/images/screenwriting-1.webp',
        role: 'Screenwriter',
        year: '2025',
      },
      {
        id: 'writ-2',
        title: 'The Midnight Monologues Series',
        description: 'An anthology series chronicling interconnected midnight encounters across major international cities.',
        imagePath: 'public/images/screenwriting-2.webp',
        role: 'Creator & Lead Writer',
        year: '2024',
      },
      {
        id: 'writ-3',
        title: 'Velvet Noir',
        description: 'Period drama script focusing on 1960s photojournalists during political transformation.',
        imagePath: 'public/images/screenwriting-3.webp',
        role: 'Screenwriter',
        year: '2023',
      },
      {
        id: 'writ-4',
        title: 'Echoes of the Coast',
        description: 'Character study feature treatment depicting generational storytelling and unspoken heritage.',
        imagePath: 'public/images/screenwriting-4.webp',
        role: 'Screenwriter',
        year: '2023',
      },
    ],
  },
  {
    id: 'import-category-acting',
    title: 'Performance',
    slug: 'performance',
    description: 'On-screen dramatic roles, voiceover performances, and physically demanding character studies.',
    iconName: 'video',
    projects: [
      {
        id: 'act-1',
        title: 'A Silent Plea (Official Trailer)',
        description: 'Lead dramatic role portraying Maya, a determined investigative officer facing moral dilemmas.',
        imagePath: 'public/images/performance-2.webp',
        role: 'Lead Actress (Maya)',
        year: '2024',
        youtubeUrl: 'https://youtu.be/VP3XJtT3xNo',
      },
      {
        id: 'act-2',
        title: 'Behind the Glass',
        description: 'Supporting role in a psychological chamber drama focusing on confinement and truth.',
        imagePath: 'public/images/performance-2.webp',
        role: 'Supporting Role (Clara)',
        year: '2024',
      },
      {
        id: 'act-3',
        title: 'The Interrogation',
        description: 'Tense two-character thriller piece executed in real-time camera tracking.',
        imagePath: 'public/images/performance-3.webp',
        role: 'Lead Role (Detective Cole)',
        year: '2023',
      },
      {
        id: 'act-4',
        title: 'Echoes of Desire',
        description: 'Intense emotional study portraying a pianist grappling with creative identity.',
        imagePath: 'public/images/performance-4.webp',
        role: 'Lead Actress',
        year: '2023',
      },
      {
        id: 'act-5',
        title: 'Solitude in Solace',
        description: 'Monodrama performance focusing on grief, memory, and personal resilience.',
        imagePath: 'public/images/performance-5.webp',
        role: 'Solo Performance',
        year: '2023',
      },
      {
        id: 'act-6',
        title: 'Shadows of Gold',
        description: 'Period drama piece exploring family legacy and societal expectations.',
        imagePath: 'public/images/performance-6.webp',
        role: 'Lead Role',
        year: '2023',
      },
      {
        id: 'act-7',
        title: 'The Final Soliloquy',
        description: 'Dramatic stage-to-screen adaptation of classic monologue work.',
        imagePath: 'public/images/performance-7.webp',
        role: 'Lead Performer',
        year: '2022',
      },
      {
        id: 'act-8',
        title: 'Whispers of Dawn',
        description: 'Character piece following a woman navigating urban transformation.',
        imagePath: 'public/images/performance-8.webp',
        role: 'Lead Role',
        year: '2022',
      },
      {
        id: 'act-9',
        title: 'Nocturnal Echoes',
        description: 'Experimental acting reel showcasing raw emotional range and vocal depth.',
        imagePath: 'public/images/performance-9.webp',
        role: 'Lead Role',
        year: '2022',
      },
      {
        id: 'act-10',
        title: 'Crossroads',
        description: 'Short dramatic study examining choices and moral conviction.',
        imagePath: 'public/images/performance-10.webp',
        role: 'Lead Actress',
        year: '2021',
      },
      {
        id: 'act-11',
        title: 'The Last Gesture',
        description: 'Nuanced physical theatre performance recorded live on location.',
        imagePath: 'public/images/performance-11.webp',
        role: 'Lead Performer',
        year: '2021',
      },
    ],
  },
  {
    id: 'import-category-production',
    title: 'Production',
    slug: 'production',
    description: 'End-to-end creative producing, line management, location scouting, and festival distribution strategy.',
    iconName: 'sparkles',
    projects: [
      {
        id: 'prod-1',
        title: 'Golden Hour Productions (Official Trailer)',
        description: 'Executive produced a 6-part mini series filmed across 3 international locations.',
        imagePath: 'public/images/production-1.webp',
        role: 'Executive Producer',
        year: '2025',
        youtubeUrl: 'https://youtu.be/VP3XJtT3xNo',
      },
      {
        id: 'prod-2',
        title: 'City Lights Narrative',
        description: 'Overseeing complete physical production logistics, crew assembly, and post-production workflows.',
        imagePath: 'public/images/production-2.webp',
        role: 'Producer',
        year: '2024',
      },
      {
        id: 'prod-3',
        title: 'Unseen Cinema Initiative',
        description: 'Curating independent film showcases and funding mentorship grants for emerging voices.',
        imagePath: 'public/images/production-3.webp',
        role: 'Creative Producer',
        year: '2024',
      },
      {
        id: 'prod-4',
        title: 'Coastal Horizons Shoot',
        description: 'Line producing complex water-based shoots and remote equipment logistics.',
        imagePath: 'public/images/production-4.webp',
        role: 'Line Producer',
        year: '2023',
      },
      {
        id: 'prod-5',
        title: 'African Cinema Distribution',
        description: 'Developing festival strategy and theatrical rollouts across West Africa and Europe.',
        imagePath: 'public/images/production-5.webp',
        role: 'Producer & Strategist',
        year: '2023',
      },
    ],
  },
  {
    id: 'import-category-bts',
    title: 'Behind The Scenes',
    slug: 'behind-the-scenes',
    description: 'On-set photography, anamorphic camera rigging, lighting setups, and directorial process documentation.',
    iconName: 'film',
    projects: [
      {
        id: 'bts-1',
        title: 'Anamorphic Rigging & Reel',
        description: 'Documenting 35mm anamorphic lens calibration and heavy lighting rigs on set.',
        imagePath: 'public/images/bts-1.webp',
        role: 'BTS Director & Photographer',
        year: '2025',
        youtubeUrl: '/images/bts-blaco-video.mp4',
      },
      {
        id: 'bts-2',
        title: 'Directing the Ensemble',
        description: 'Intimate candid captures of scene blockings and director-actor collaborations.',
        imagePath: 'public/images/bts-2.webp',
        role: 'BTS Photographer',
        year: '2024',
      },
      {
        id: 'bts-3',
        title: 'Night Shoot Logistics',
        description: 'High-contrast nocturnal set photography showing atmosphere and crew dedication.',
        imagePath: 'public/images/bts-3.webp',
        role: 'BTS Photographer',
        year: '2024',
      },
      {
        id: 'bts-4',
        title: 'Location Scouting Stills',
        description: 'Architectural and landscape scouting documentation prior to principal photography.',
        imagePath: 'public/images/bts-4.webp',
        role: 'BTS Photographer',
        year: '2023',
      },
    ],
  },
]

/* ==========================================================================
   MAIN MIGRATION EXECUTION LOOP
   ========================================================================== */

async function runMigration() {
  const categoryRefs = []

  console.log('\n📦 [1/3] Uploading Media & Creating Project Documents...')

  for (const cat of categoriesData) {
    const projectRefsForCategory = []

    console.log(`\n📂 Processing Folder: "${cat.title}"`)

    for (const proj of cat.projects) {
      const projDocId = `import-proj-${cat.slug}-${proj.id}`

      try {
        let imageAssetId = null
        if (proj.imagePath) {
          imageAssetId = await uploadAsset(proj.imagePath, 'image')
        }

        const projectDoc = {
          _id: projDocId,
          _type: 'project',
          title: proj.title,
          slug: {
            _type: 'slug',
            current: slugify(proj.title),
          },
          role: proj.role,
          year: proj.year,
          description: proj.description,
          youtubeUrl: proj.youtubeUrl || null,
          ...(imageAssetId
            ? {
                mainImage: {
                  _type: 'image',
                  options: { hotspot: true },
                  asset: {
                    _type: 'reference',
                    _ref: imageAssetId,
                  },
                  alt: proj.title,
                },
              }
            : {}),
        }

        await writeClient.createOrReplace(projectDoc)
        console.log(`  ✨ Saved Project: "${proj.title}" (${projDocId})`)

        projectRefsForCategory.push({
          _type: 'reference',
          _ref: projDocId,
          _key: `key-${projDocId}`,
        })
      } catch (err) {
        console.error(`  ❌ Failed project "${proj.title}":`, err.message)
      }
    }

    console.log(`\n📦 [2/3] Saving Category Folder Document: "${cat.title}"...`)

    try {
      const categoryDoc = {
        _id: cat.id,
        _type: 'category',
        title: cat.title,
        slug: {
          _type: 'slug',
          current: cat.slug,
        },
        description: cat.description,
        iconName: cat.iconName,
        projects: projectRefsForCategory,
      }

      await writeClient.createOrReplace(categoryDoc)
      console.log(`  ✨ Saved Category Folder: "${cat.title}" (${cat.id})`)

      categoryRefs.push({
        _type: 'reference',
        _ref: cat.id,
        _key: `key-${cat.id}`,
      })
    } catch (err) {
      console.error(`  ❌ Failed category "${cat.title}":`, err.message)
    }
  }

  console.log(`\n📦 [3/3] Uploading About Me Pictures & Main Portfolio Document...`)

  try {
    const heroSetAssetId = await uploadAsset('public/images/hero-set.webp', 'image')
    const aboutHeroAssetId = await uploadAsset('public/images/about-hero.webp', 'image')
    const aboutPortraitAssetId = await uploadAsset('public/images/about-portrait.webp', 'image')
    const aboutCrewAssetId = await uploadAsset('public/images/about-crew.webp', 'image')
    const aboutBannerAssetId = await uploadAsset('public/images/about-banner.webp', 'image')
    const siteLogoAssetId = await uploadAsset('public/images/sarah-portrait.webp', 'image')

    const portfolioDoc = {
      _id: 'import-portfolio-main',
      _type: 'portfolio',
      headline: 'SARAH ADJEI — FILMMAKER & VISUAL DIRECTOR',
      subtitle: 'FRAMING STORIES THAT LINGER • ACCRA, GHANA',
      ctaText: 'Get In Touch',
      ctaLink: 'mailto:Abena_koblyn@gmail.com',
      aboutHeaderTitle: 'KNOW SARAH',
      philosophyQuote:
        'For me, cinema is a medium of raw vulnerability. Every frame is an opportunity to explore the complex, unspoken layers of human relationships and culture. I treat writing as building the soul of a project, directing as shaping its heartbeat, and acting as living its truth.',
      biography: [
        {
          _key: 'bio-block-1',
          _type: 'block',
          children: [
            {
              _key: 'bio-span-1',
              _type: 'span',
              text: 'Sarah Adjei is a filmmaker, screenwriter, and actress dedicated to carving out raw, visually arresting narratives. Navigating the intersection of delicate human emotion and bold storytelling, she brings a distinctive, moody aesthetic to both independent cinema and commercial screens. Whether directing behind the lens, drafting scripts, or performing, her creative mission remains unyielding: telling stories that linger.',
            },
          ],
          markDefs: [],
          style: 'normal',
        },
      ],
      skills: [
        'Directing',
        'Screenwriting',
        'Performance / Acting',
        'Creative Producing',
        'Anamorphic Cinematography',
        'Line Management',
        'Script Doctoring',
        'Location Scouting',
      ],
      portfolioCategories: categoryRefs,
      contactEmail: 'Abena_koblyn@gmail.com',
      contactPhone: '+233 27 723 3774',
      seoDescription:
        'Official portfolio of Sarah Adjei (Abyna Koblyn), filmmaker, screenwriter, producer, and director based in Accra, Ghana.',
      footerCopyright: '© 2025 Sarah Adjei. All rights reserved.',
      ...(heroSetAssetId
        ? { heroSetImage: { _type: 'image', options: { hotspot: true }, asset: { _type: 'reference', _ref: heroSetAssetId } } }
        : {}),
      ...(aboutHeroAssetId
        ? { aboutHeroImage: { _type: 'image', options: { hotspot: true }, asset: { _type: 'reference', _ref: aboutHeroAssetId } } }
        : {}),
      ...(aboutPortraitAssetId
        ? { aboutPortraitImage: { _type: 'image', options: { hotspot: true }, asset: { _type: 'reference', _ref: aboutPortraitAssetId } } }
        : {}),
      ...(aboutCrewAssetId
        ? { aboutCrewImage: { _type: 'image', options: { hotspot: true }, asset: { _type: 'reference', _ref: aboutCrewAssetId } } }
        : {}),
      ...(aboutBannerAssetId
        ? { aboutBannerImage: { _type: 'image', options: { hotspot: true }, asset: { _type: 'reference', _ref: aboutBannerAssetId } } }
        : {}),
      ...(siteLogoAssetId
        ? { siteLogo: { _type: 'image', options: { hotspot: true }, asset: { _type: 'reference', _ref: siteLogoAssetId } } }
        : {}),
    }

    await writeClient.createOrReplace(portfolioDoc)
    console.log('  ✨ Saved Portfolio Document ID: import-portfolio-main')
  } catch (err) {
    console.error('  ❌ Error creating main portfolio document:', err.message)
  }

  console.log('\n----------------------------------------------------')
  console.log('🎉 Category & Media Migration Completed Successfully!')
  console.log('----------------------------------------------------')
}

runMigration()
