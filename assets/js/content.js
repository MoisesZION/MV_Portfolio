/*
 * ============================================================
 *  SITE CONTENT — edit this file to update the portfolio.
 * ============================================================
 *
 *  Everything the site displays (profile, experience, projects,
 *  skills, education, contact) lives here. No build step needed:
 *  save the file, refresh the browser.
 *
 *  Conventions
 *  - `null` means "not provided yet". The site shows a discreet
 *    "To be provided" marker instead of inventing a value.
 *  - Project `status` must be one of:
 *        "completed"     → finished work with confirmed results
 *        "in-progress"   → work currently being developed
 *        "draft"         → topic placeholder, details not yet confirmed
 *  - Project `type` must be one of: "professional", "academic", "personal", null
 *  - Images: put files in assets/img/ and reference them by path.
 *    Set `placeholder: true` on any image that is NOT a genuine project
 *    visual so it is labelled as such on the page.
 */

window.SITE_CONTENT = {
  profile: {
    name: "Moisés Eduardo Varela Almario",
    shortName: "Moisés Varela",
    initials: "MV",
    headline: "Environmental Engineer · GIS & Remote Sensing",
    role: "Sustainability Analyst & GIS Specialist at eGREEN SpA",
    lead:
      "I combine environmental engineering with geographic information systems, remote sensing and environmental data processing to support sustainability work.",
    keywords: [
      "GIS",
      "Remote Sensing",
      "Spatial Analysis",
      "Environmental Modeling",
      "Land-Cover Analysis",
      "Google Earth Engine",
      "Python",
      "Sustainability",
    ],
    about: [
      "I am an Environmental Engineer currently pursuing a postgraduate specialization in Geographic Information Systems (GIS).",
      "My profile brings together environmental engineering, GIS, remote sensing, geospatial analysis, environmental data processing and sustainability. I work with tools such as ArcGIS Pro, QGIS and Google Earth Engine, and with data sources including Sentinel-2 satellite imagery and GEDI.",
      "Since August 2024 I have worked as Sustainability Analyst & GIS Specialist at eGREEN SpA. My areas of experience include greenhouse gas accounting, life cycle assessment and forestry projects, and I am continuing to develop my skills in Python for geospatial data processing.",
    ],
    // Facts shown as small "at a glance" items in the About section.
    facts: [
      { label: "Discipline", value: "Environmental Engineering" },
      { label: "Studying", value: "Postgraduate specialization in GIS" },
      { label: "Current role", value: "Sustainability Analyst & GIS Specialist" },
      { label: "Based in", value: null }, // e.g. "Santiago, Chile"
      { label: "Languages", value: null }, // e.g. "Spanish (native), English"
    ],
    // Optional portrait, e.g. "assets/img/profile.jpg". Leave null to show initials.
    photo: null,
    // Optional CV PDF, e.g. "assets/docs/CV_Moises_Varela.pdf"
    cvUrl: null,
  },

  experience: [
    {
      role: "Sustainability Analyst & GIS Specialist",
      organization: "eGREEN SpA",
      organizationUrl: null,
      location: null,
      start: "August 2024",
      end: "Present",
      // Add 2–4 short, factual bullet points about your responsibilities.
      highlights: [],
      tags: ["Sustainability", "GIS"],
    },
    // Add earlier positions below using the same shape.
  ],

  projects: [
    {
      id: "sentinel-2-indices",
      title: "Sentinel-2 Spectral Indices",
      status: "draft",
      type: null,
      year: null,
      summary:
        "Topic placeholder: deriving spectral indices from Sentinel-2 imagery to characterise vegetation and land surface conditions.",
      tags: ["Sentinel-2", "Google Earth Engine", "Remote Sensing"],
      tools: ["Google Earth Engine", "Sentinel-2"],
      data: ["Sentinel-2 imagery"],
      thumbnail: { src: "assets/img/placeholders/spectral.svg", alt: "Placeholder graphic of abstract spectral bands", placeholder: true },
      sections: {
        context: null,
        objectives: null,
        methods: null,
        results: null,
      },
      gallery: [],
      links: [],
    },
    {
      id: "land-cover-analysis",
      title: "Satellite Imagery & Land-Cover Analysis",
      status: "draft",
      type: null,
      year: null,
      summary:
        "Topic placeholder: using satellite imagery and spatial analysis to map and compare land-cover classes.",
      tags: ["Land Cover", "Satellite Imagery", "Spatial Analysis"],
      tools: ["ArcGIS Pro", "QGIS"],
      data: [],
      thumbnail: { src: "assets/img/placeholders/landcover.svg", alt: "Placeholder graphic of abstract land-cover patches", placeholder: true },
      sections: { context: null, objectives: null, methods: null, results: null },
      gallery: [],
      links: [],
    },
    {
      id: "forestry-gis",
      title: "Forestry & Environmental GIS",
      status: "draft",
      type: null,
      year: null,
      summary:
        "Topic placeholder: applying GIS and remote sensing data, such as GEDI, to forestry and environmental projects.",
      tags: ["Forestry", "GEDI", "Environmental GIS"],
      tools: ["QGIS", "ArcGIS Pro"],
      data: ["GEDI"],
      thumbnail: { src: "assets/img/placeholders/forest.svg", alt: "Placeholder graphic of abstract canopy profile", placeholder: true },
      sections: { context: null, objectives: null, methods: null, results: null },
      gallery: [],
      links: [],
    },
    {
      id: "forest-fire-probability",
      title: "Forest Fire Probability Modeling",
      status: "draft",
      type: null,
      year: null,
      summary:
        "Topic placeholder: environmental modeling of the spatial probability of forest fire occurrence.",
      tags: ["Environmental Modeling", "Wildfire", "Spatial Analysis"],
      tools: [],
      data: [],
      thumbnail: { src: "assets/img/placeholders/fire.svg", alt: "Placeholder graphic of abstract probability surface", placeholder: true },
      sections: { context: null, objectives: null, methods: null, results: null },
      gallery: [],
      links: [],
    },
    /*
     * Example of a finished entry (copy, then edit):
     * {
     *   id: "my-project",                 // used in the URL: project.html?id=my-project
     *   title: "Project title",
     *   status: "completed",              // "completed" | "in-progress" | "draft"
     *   type: "academic",                 // "professional" | "academic" | "personal"
     *   year: "2025",
     *   summary: "One or two sentences shown on the card.",
     *   tags: ["Tag"],
     *   tools: ["QGIS"],
     *   data: ["Dataset name"],
     *   thumbnail: { src: "assets/img/projects/my-project.jpg", alt: "Describe the image", placeholder: false },
     *   sections: {
     *     context: "Why the project exists.",
     *     objectives: "What it set out to do.",
     *     methods: "How it was done.",
     *     results: "What was found (only confirmed results).",
     *   },
     *   gallery: [{ src: "assets/img/projects/map.jpg", alt: "…", caption: "…", placeholder: false }],
     *   links: [{ label: "GitHub repository", url: "https://…" }],
     * },
     */
  ],

  skills: [
    {
      group: "GIS Software",
      items: ["ArcGIS Pro", "QGIS"],
    },
    {
      group: "Remote Sensing",
      items: ["Google Earth Engine", "Sentinel-2 imagery", "GEDI data"],
    },
    {
      group: "Spatial Analysis & Modeling",
      items: ["Spatial analysis", "Environmental modeling", "Land-cover analysis"],
    },
    {
      group: "Programming",
      items: ["Python for geospatial data processing (currently developing)"],
    },
    {
      group: "Sustainability",
      items: ["Greenhouse gas accounting", "Life cycle assessment", "Forestry projects"],
    },
  ],

  education: [
    {
      title: "Postgraduate Specialization in Geographic Information Systems",
      institution: null,
      period: null,
      status: "In progress",
      notes: null,
    },
    {
      title: "Environmental Engineering",
      institution: null,
      period: null,
      status: "Completed",
      notes: null,
    },
  ],

  // Add certifications as { title, issuer, year, url }.
  certifications: [],

  contact: {
    intro:
      "I am open to conversations about GIS, remote sensing and environmental data projects.",
    email: null, // e.g. "name@example.com"
    linkedin: null, // full URL
    github: null, // full URL
    location: null,
  },
};
