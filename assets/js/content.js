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
    headline: "Geospatial & Remote Sensing Analyst · Environmental Engineer",
    role: "Sustainability Analyst & GIS Specialist at eGREEN SpA",
    lead:
      "Environmental Engineer specialized in GIS, remote sensing and Earth observation for environmental and territorial monitoring.",
    keywords: [
      "GIS",
      "Remote Sensing",
      "Earth Observation",
      "Land-Cover Classification",
      "Biomass Estimation",
      "Google Earth Engine",
      "Python",
      "Carbon Projects",
    ],
    about: [
      "I am an Environmental Engineer specialized in GIS, remote sensing and Earth observation for environmental and territorial monitoring, currently pursuing a postgraduate specialization in Geographic Information Systems at Universidad Distrital Francisco José de Caldas.",
      "I have hands-on experience processing satellite imagery (Copernicus Sentinel, ALOS PALSAR, GEDI), performing land-cover classification and biomass estimation, and automating geospatial workflows with Python and Google Earth Engine. I work with QGIS and the ArcGIS ecosystem for spatial analysis, geospatial data quality control, metadata management and spatial databases supporting nature-based solutions.",
      "Since August 2024 I have worked as Sustainability Analyst & GIS Specialist at eGREEN SpA, where my work also covers carbon projects in voluntary markets, greenhouse gas accounting and life cycle assessment. I am continuing to develop my Python skills for geospatial data processing.",
    ],
    // Facts shown as small "at a glance" items in the About section.
    facts: [
      { label: "Discipline", value: "Environmental Engineering" },
      { label: "Studying", value: "Postgraduate specialization in GIS" },
      { label: "Current role", value: "Sustainability Analyst & GIS Specialist" },
      { label: "Based in", value: "Bogotá, Colombia" },
      { label: "Languages", value: "Spanish (native) · English (C1) · German (basic)" },
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
      location: "Remote · Bogotá, Colombia",
      start: "August 2024",
      end: "Present",
      highlights: [
        "Analyze and preprocess multi-sensor satellite imagery, including Copernicus Sentinel, ALOS PALSAR and GEDI, for environmental and nature-based solutions monitoring projects.",
        "Perform land-cover classification, above-ground biomass estimation and anthropogenic activity detection to assess ecosystem condition across project areas.",
        "Develop automated geospatial processing pipelines using Python (GeoPandas, Rasterio, GDAL), Google Earth Engine and ArcGIS, improving the efficiency and reproducibility of Earth observation workflows.",
        "Support the design, evaluation and baseline construction of carbon projects (AFOLU, Improved Forest Management) under voluntary market standards, including eligibility, additionality and risk assessments.",
        "Manage and quality-control large geospatial datasets, maintaining metadata integrity, spatial database organization and standardized technical documentation.",
        "Collaborate with multidisciplinary, international teams to translate geospatial analysis into decision-support products for sustainability initiatives.",
      ],
      tags: ["Earth Observation", "Carbon Projects", "GHG Accounting", "Python", "Google Earth Engine"],
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
      group: "GIS & Earth Observation",
      items: ["ArcGIS Pro", "ArcMap", "QGIS", "Google Earth Engine", "Satellite image processing (Sentinel, ALOS PALSAR, GEDI)"],
    },
    {
      group: "Spatial Analysis & Modeling",
      items: ["Land-cover classification", "Biomass estimation", "Spectral indices", "Environmental modeling"],
    },
    {
      group: "Programming & Automation",
      items: ["Python (GeoPandas, Rasterio, GDAL)", "SQL", "R", "Geospatial workflow automation", "Applied machine learning"],
    },
    {
      group: "Data Management",
      items: ["Spatial data quality control", "Metadata management", "Geospatial databases"],
    },
    {
      group: "Sustainability & Carbon",
      items: ["Greenhouse gas accounting", "Life cycle assessment", "Carbon projects in voluntary markets (AFOLU, IFM)", "Forestry projects"],
    },
    {
      group: "Languages",
      items: ["Spanish (native)", "English (C1)", "German (basic)"],
    },
  ],

  education: [
    {
      title: "Postgraduate Specialization in Geographic Information Systems",
      institution: "Universidad Distrital Francisco José de Caldas",
      period: "2026",
      status: "In progress",
      notes: "Coursework: Remote Sensing, Geostatistics, Database Design, GIS Laboratory, Object-Oriented Programming, Markup Languages.",
    },
    {
      title: "Master's in Environmental Project Management & Corporate Social Responsibility",
      institution: "EUDE Business School",
      period: "2025",
      status: "Completed",
      notes: null,
    },
    {
      title: "B.S. Environmental Engineering",
      institution: "Universidad Distrital Francisco José de Caldas",
      period: "2024",
      status: "Completed",
      notes: null,
    },
  ],

  // Certifications as { title, issuer, year, url }. Newest first.
  certifications: [
    { title: "Machine Learning & Data Science with Python", issuer: "Udemy", year: "Dec 2025", url: null },
    { title: "Exploring from the Sky with Remote Sensing and Drones", issuer: "Esri Colombia", year: "Nov 2025", url: null },
    { title: "ArcGIS Pro Software Course", issuer: "FG Training", year: "Apr 2025", url: null },
    { title: "Calculating Spectral Indices for Land & Aquatic Applications Using QGIS", issuer: "NASA", year: "Feb 2025", url: null },
    { title: "Preparing Data for Analysis with Microsoft Excel", issuer: "Microsoft", year: "Dec 2024", url: null },
    { title: "Environmental Licensing Virtual Course", issuer: "ANLA", year: "Nov 2024", url: null },
    { title: "Explorer Level Programming: Python", issuer: "MinTIC", year: "Aug 2024", url: null },
    { title: "Project Management with PMI Methodology", issuer: "Fundación Universitaria Compensar", year: "Jul 2024", url: null },
    { title: "GIS Application in Forestry and Agroecological Systems", issuer: "SENA", year: "Mar 2024", url: null },
    { title: "Diploma in Environmental Management, ISO 14001:2015", issuer: "Politécnico de Colombia", year: "Feb 2024", url: null },
    { title: "Data Science", issuer: "Universidad Distrital Francisco José de Caldas", year: "Nov 2023", url: null },
  ],

  contact: {
    intro:
      "I am open to conversations about GIS, remote sensing, environmental data and carbon project work.",
    email: "moisvara97@gmail.com",
    linkedin: "https://www.linkedin.com/in/moiseszion/",
    github: "https://github.com/MoisesZION",
    location: "Bogotá, Colombia",
  },
};
