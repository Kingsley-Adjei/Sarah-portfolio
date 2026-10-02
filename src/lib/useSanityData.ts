import { useState, useEffect } from 'react'
import { client } from './sanity.client'

export interface SanityProject {
  id: string
  title: string
  description: string
  image: string
  role: string
  year: string
  youtubeUrl?: string
}

export interface SanityCategory {
  id: string
  title: string
  description: string
  iconName?: string
  projects: SanityProject[]
}

export interface SanityPortfolioContent {
  headline?: string
  subtitle?: string
  heroSetImage?: string
  ctaText?: string
  ctaLink?: string
  aboutHeaderTitle?: string
  aboutHeroImage?: string
  aboutPortraitImage?: string
  aboutCrewImage?: string
  aboutBannerImage?: string
  philosophyQuote?: string
  biography?: any[]
  skills?: string[]
  resumeUrl?: string
  contactEmail?: string
  contactPhone?: string
  categories?: SanityCategory[]
}

// Fetch published AND draft documents so changes take effect live
const SANITY_QUERY = `
*[_type == "portfolio"][0]{
  headline,
  subtitle,
  "heroSetImage": heroSetImage.asset->url,
  ctaText,
  ctaLink,
  aboutHeaderTitle,
  "aboutHeroImage": aboutHeroImage.asset->url,
  "aboutPortraitImage": aboutPortraitImage.asset->url,
  "aboutCrewImage": aboutCrewImage.asset->url,
  "aboutBannerImage": aboutBannerImage.asset->url,
  philosophyQuote,
  biography,
  skills,
  "resumeUrl": resumePdf.asset->url,
  contactEmail,
  contactPhone,
  "categories": portfolioCategories[]->{
    "id": _id,
    title,
    description,
    iconName,
    "projects": projects[]->{
      "id": _id,
      title,
      description,
      "image": mainImage.asset->url,
      role,
      year,
      "youtubeUrl": select(
        defined(youtubeUrl) => youtubeUrl,
        defined(videoFile.asset->url) => videoFile.asset->url,
        null
      )
    }
  }
}
`

export function useSanityData() {
  const [data, setData] = useState<SanityPortfolioContent | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await client.fetch(SANITY_QUERY)
        if (result) {
          setData(result)
        }
      } catch (err) {
        console.warn('[Sanity Hook] Fetching failed, using fallback static data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading }
}
