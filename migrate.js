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
console.log('🚀 Starting Sanity Data Migration Engine')
console.log('----------------------------------------------------')

if (!projectId || projectId === 'placeholder-project-id') {
  console.error('❌ ERROR: NEXT_PUBLIC_SANITY_PROJECT_ID is missing or invalid in .env.local.')
  console.error('Please configure your real project ID in .env.local before running the migration.\n')
  process.exit(1)
}

if (!token) {
  console.error('❌ ERROR: SANITY_WRITE_TOKEN (or SANITY_API_TOKEN) is missing.\n')
  console.error('How to execute this script safely with a Write Token:')
  console.error('1. Go to https://www.sanity.io/manage')
  console.error('2. Select your Project -> API -> Tokens.')
  console.error('3. Click "Add API token", assign role "Editor" or "Administrator", and copy the token.')
  console.error('4. Execute command:')
  console.error('   npx env-cmd -f .env.local node migrate.js')
  console.error('   OR')
  console.error('   $env:SANITY_WRITE_TOKEN="your_token"; node migrate.js  (PowerShell)')
  console.error('   SANITY_WRITE_TOKEN="your_token" node migrate.js       (Bash/Linux)\n')
  process.exit(1)
}

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false, // Always bypass CDN cache during migration writes
})

/* ==========================================================================
   HELPER FUNCTIONS
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
   STATIC PORTFOLIO DATA ARCHITECTURE
   ========================================================================== */

const projectsToMigrate = [
  // --- DIRECTING ---
  {
    id: 'import-project-dir-1',
    title: 'Whispers in the Wind',
    description: 'An atmospheric drama exploring memory, loss, and redemption in a coastal fishing village in Ghana.',
    imagePath: 'public/images/portfolio-hero.webp',
    deploymentUrl: 'https://youtu.be/VP3XJtT3xNo',
  },
  {
    id: 'import-project-dir-2',
    title: 'Echoes of Silence',
    description: 'A neo-noir psychological thriller centered on an archivist unearthing forgotten audio recordings.',
    imagePath: 'public/images/directing-2.webp',
    deploymentUrl: 'https://sarahadjei.com/projects/echoes-of-silence',
  },
  {
    id: 'import-project-dir-3',
    title: 'Chasing Shadows',
    description: 'A visually arresting documentary on underground performers surviving in modern metropolises.',
    imagePath: 'public/images/directing-3.webp',
    deploymentUrl: 'https://sarahadjei.com/projects/chasing-shadows',
  },
  {
    id: 'import-project-dir-4',
    title: 'Fragments of Time',
    description: 'Experimental surrealist short exploring distorted timelines and nostalgic memories.',
    imagePath: 'public/images/directing-4.webp',
    deploymentUrl: 'https://sarahadjei.com/projects/fragments-of-time',
  },
  {
    id: 'import-project-dir-5',
    title: 'Midnight Monologues',
    description: 'Intimate character study examining isolation and connection across urban landscapes.',
    imagePath: 'public/images/directing-5.webp',
    deploymentUrl: 'https://sarahadjei.com/projects/midnight-monologues',
  },
  {
    id: 'import-project-dir-6',
    title: 'Nocturne in Blue',
    description: 'Stylized noir short exploring late-night confessions and hidden identities.',
    imagePath: 'public/images/directing-6.webp',
    deploymentUrl: 'https://sarahadjei.com/projects/nocturne-in-blue',
  },

  // --- SCREENWRITING ---
  {
    id: 'import-project-writ-1',
    title: 'Beyond the Horizon Screenplay',
    description: 'Feature screenplay about a rogue astronomer tracking an anomaly off the coast of West Africa.',
    imagePath: 'public/images/screenwriting-1.webp',
    deploymentUrl: 'https://sarahadjei.com/screenwriting/beyond-the-horizon',
  },
  {
    id: 'import-project-writ-2',
    title: 'The Midnight Series Bible',
    description: 'An anthology series chronicling interconnected midnight encounters across major international cities.',
    imagePath: 'public/images/screenwriting-2.webp',
    deploymentUrl: 'https://sarahadjei.com/screenwriting/midnight-series',
  },
  {
    id: 'import-project-writ-3',
    title: 'Velvet Noir Script',
    description: 'Period drama script focusing on 1960s photojournalists during political transformation.',
    imagePath: 'public/images/screenwriting-3.webp',
    deploymentUrl: 'https://sarahadjei.com/screenwriting/velvet-noir',
  },

  // --- PERFORMANCE ---
  {
    id: 'import-project-act-1',
    title: 'A Silent Plea',
    description: 'Lead dramatic role portraying Maya, a determined investigative officer facing moral dilemmas.',
    imagePath: 'public/images/performance-2.webp',
    deploymentUrl: 'https://youtu.be/VP3XJtT3xNo',
  },
  {
    id: 'import-project-act-2',
    title: 'Behind the Glass',
    description: 'Supporting role in a psychological chamber drama focusing on confinement and truth.',
    imagePath: 'public/images/performance-3.webp',
    deploymentUrl: 'https://sarahadjei.com/performance/behind-the-glass',
  },

  // --- PRODUCTION ---
  {
    id: 'import-project-prod-1',
    title: 'Golden Hour Productions',
    description: 'Executive produced a 6-part mini series filmed across 3 international locations.',
    imagePath: 'public/images/production-1.webp',
    deploymentUrl: 'https://youtu.be/VP3XJtT3xNo',
  },
  {
    id: 'import-project-prod-2',
    title: 'City Lights Narrative',
    description: 'Overseeing complete physical production logistics, crew assembly, and post-production workflows.',
    imagePath: 'public/images/production-2.webp',
    deploymentUrl: 'https://sarahadjei.com/production/city-lights',
  },

  // --- BTS ---
  {
    id: 'import-project-bts-1',
    title: 'Anamorphic Rigging & Reel',
    description: 'Documenting 35mm anamorphic lens calibration and heavy lighting rigs on set.',
    imagePath: 'public/images/bts-1.webp',
    deploymentUrl: 'https://sarahadjei.com/bts/anamorphic-rigging',
  },
]

/* ==========================================================================
   MAIN MIGRATION EXECUTION LOOP
   ========================================================================== */

async function runMigration() {
  const createdProjectRefs = []
  let successCount = 0
  let failCount = 0

  console.log(`\n📦 [Phase 1/2] Migrating ${projectsToMigrate.length} Project Documents...`)

  for (const item of projectsToMigrate) {
    try {
      console.log(`\n🔹 Processing Project: "${item.title}"`)

      // Upload main project image if path exists
      let imageAssetId = null
      if (item.imagePath) {
        imageAssetId = await uploadAsset(item.imagePath, 'image')
      }

      const projectDoc = {
        _id: item.id,
        _type: 'project',
        title: item.title,
        slug: {
          _type: 'slug',
          current: slugify(item.title),
        },
        description: item.description,
        deploymentUrl: item.deploymentUrl,
        ...(imageAssetId
          ? {
              mainImage: {
                _type: 'image',
                options: { hotspot: true },
                asset: {
                  _type: 'reference',
                  _ref: imageAssetId,
                },
                alt: item.title,
              },
            }
          : {}),
      }

      // Idempotent upsert via createOrReplace
      await writeClient.createOrReplace(projectDoc)
      console.log(`  ✨ Saved Project Document ID: ${item.id}`)

      createdProjectRefs.push({
        _type: 'reference',
        _ref: item.id,
        _key: item.id.replace('import-project-', 'key-'),
      })

      successCount++
    } catch (err) {
      console.error(`  ❌ Error processing project "${item.title}":`, err.message)
      failCount++
    }
  }

  console.log(`\n📦 [Phase 2/2] Migrating Global Portfolio Singleton Document...`)

  try {
    // Upload site logo & resume PDF assets if local files exist
    const logoAssetId = await uploadAsset('public/images/sarah-portrait.webp', 'image')
    const resumeAssetId = await uploadAsset('public/resume.pdf', 'file')

    const portfolioDoc = {
      _id: 'import-portfolio-main',
      _type: 'portfolio',
      headline: 'SARAH ADJEI — FILMMAKER & VISUAL DIRECTOR',
      subtitle: 'Framing stories that linger. Directed by Sarah Adjei in Accra, Ghana.',
      ctaText: 'Get In Touch',
      ctaLink: 'mailto:Abena_koblyn@gmail.com',
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
        {
          _key: 'bio-block-2',
          _type: 'block',
          children: [
            {
              _key: 'bio-span-2',
              _type: 'span',
              text: 'Cinema is a medium of raw vulnerability. Every frame is an opportunity to explore the complex, unspoken layers of human relationships and culture. Writing builds the soul of a project, directing shapes its heartbeat, and acting lives its truth.',
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
      featuredProjects: createdProjectRefs,
      seoDescription:
        'Official portfolio of Sarah Adjei (Abyna Koblyn), filmmaker, screenwriter, producer, and director based in Accra, Ghana.',
      footerCopyright: '© 2025 Sarah Adjei. All rights reserved.',
      ...(logoAssetId
        ? {
            siteLogo: {
              _type: 'image',
              options: { hotspot: true },
              asset: {
                _type: 'reference',
                _ref: logoAssetId,
              },
              alt: 'Sarah Adjei Site Logo',
            },
          }
        : {}),
      ...(resumeAssetId
        ? {
            resumePdf: {
              _type: 'file',
              asset: {
                _type: 'reference',
                _ref: resumeAssetId,
              },
            },
          }
        : {}),
    }

    await writeClient.createOrReplace(portfolioDoc)
    console.log(`  ✨ Saved Portfolio Document ID: import-portfolio-main`)
  } catch (err) {
    console.error('  ❌ Error creating portfolio main document:', err.message)
  }

  console.log('\n----------------------------------------------------')
  console.log('🎉 Migration Completed Successfully!')
  console.log(`📊 Summary: ${successCount} projects migrated, ${failCount} failed.`)
  console.log('----------------------------------------------------')
}

runMigration()
