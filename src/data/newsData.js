/**
 * SAVE THE SAHYADRI — NEWS & DOCUMENTATION REPOSITORY
 * 
 * Maintainable data configuration for editorial reporting and verification tracking.
 * Website administrators can update this file to reflect verified official documents,
 * gazette orders, Forest Department statements, or investigative journalistic updates.
 */

export const KARJAT_FACT_CARD = {
  reportedFigure: "32,490",
  category: "Reported Proposal / Forest Clearance Authorization",
  statusBadge: "Reported — verification pending",
  officialClarification: "News reports have cited a figure of 32,490 trees proposed or authorised for removal in connection with a project in the Karjat region. The original official order and the current cumulative number of trees felled must be independently verified.",
  distinctions: [
    {
      label: "1. Proposed Tree Removal",
      definition: "Total trees initially scoped or applied for under project environmental clearance assessments."
    },
    {
      label: "2. Authorised Tree Removal",
      definition: "Number of trees sanctioned by tree authority / forest department under specific conditions or stages."
    },
    {
      label: "3. Actual Tree Felling Reported",
      definition: "Felling actively witnessed or reported by local residents, journalists, or civil society monitors."
    },
    {
      label: "4. Verified Cumulative Count",
      definition: "Official Forest Dept ground-audit verification of actual trees cut to date (independent audit pending)."
    },
    {
      label: "5. Compensatory Plantation",
      definition: "Mandated offset planting ratios versus verified audits of actual sapling survival and ecological parity."
    }
  ]
};

export const NEWS_REPORTS = [
  {
    id: "rep-01",
    headline: "Environmental Concerns Raised Over Infrastructure & Land-Clearing Proposals in Karjat Eco-Belt",
    publisher: "Hindustan Times",
    publishDate: "2024-03-14",
    category: "Authorised tree removal",
    verificationStatus: "Reported by news source",
    url: "https://www.hindustantimes.com/cities/mumbai-news",
    summary: "Local environmental groups and village residents in Raigad district submitted memorandums urging review of tree-cutting permissions across sensitive Sahyadri foothill corridors.",
    scopeNotes: "Covers permissions under the Maharashtra (Urban Areas) Protection and Preservation of Trees Act."
  },
  {
    id: "rep-02",
    headline: "Forest Department Clarifies Protocol for Western Ghats Eco-Sensitive Zones (ESZ)",
    publisher: "The Indian Express",
    publishDate: "2024-02-28",
    category: "Regulatory guidelines",
    verificationStatus: "Official administrative record",
    url: "https://indianexpress.com/section/cities/mumbai/",
    summary: "State forest officials reiterated that infrastructure work in proximity to recognized wildlife corridors and watershed zones requires mandatory MoEFCC stage-one clearance.",
    scopeNotes: "Directives issued regarding buffer zones adjoining the Matheran Eco-Sensitive Zone and Sahyadri ranges."
  },
  {
    id: "rep-03",
    headline: "Ecologists Call for Cumulative Impact Assessment Across Karjat-Khandala Watersheds",
    publisher: "Mongabay-India",
    publishDate: "2023-11-19",
    category: "Ecological research",
    verificationStatus: "Peer scientific review",
    url: "https://india.mongabay.com/",
    summary: "Research highlights that fragmenting hill slopes causes topsoil erosion, impacts the catchment of Pej and Ulhas rivers, and threatens perennial water availability for downstream communities.",
    scopeNotes: "Catchment hydrology study analyzing slope gradients and monsoon runoff in the northern Western Ghats."
  },
  {
    id: "rep-04",
    headline: "Citizen Groups Advocate for Independent Tree Audits and Geo-Tagging of Compensatory Forests",
    publisher: "Times of India",
    publishDate: "2023-09-08",
    category: "Citizen representation",
    verificationStatus: "Public record",
    url: "https://timesofindia.indiatimes.com/city/mumbai",
    summary: "Nature conservationists demand public geo-tagging portals for any compensatory afforestation to ensure that indigenous tree species are planted in ecological zones rather than monoculture commercial plantations.",
    scopeNotes: "Submission to Raigad District Collectorate."
  }
];

export const OFFICIAL_DOCUMENTS_GUIDE = [
  {
    title: "Maharashtra Tree Authority Guidelines (1975 Act & Amendments)",
    type: "Statutory Law",
    issuingAuthority: "Government of Maharashtra",
    notes: "Governs public notice requirements, public objections window, and preservation mandates before tree permissions are granted."
  },
  {
    title: "MoEFCC Western Ghats Draft Eco-Sensitive Area Notification",
    type: "Central Government Notification",
    issuingAuthority: "Ministry of Environment, Forest and Climate Change (MoEFCC)",
    notes: "Delineates ecologically sensitive villages across Maharashtra Western Ghats where commercial deforestation is strictly regulated."
  },
  {
    title: "Supreme Court Directives on Compensatory Afforestation Fund (CAMPA)",
    type: "Judicial Precedent",
    issuingAuthority: "Supreme Court of India",
    notes: "Mandates strict accountability and verified afforestation ratios for forest diversion."
  }
];
