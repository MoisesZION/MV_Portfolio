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

  // Projects below come from Moisés's public GitHub repositories.
  projects: [
    {
      id: "bogota-wetlands",
      title: "Spatial Analysis of Bogotá's Wetlands",
      status: "in-progress",
      type: null,
      year: null,
      summary:
        "Python and GeoPandas workflow that cleans, dissolves and measures the 15 wetlands in Bogotá's vegetation-cover layer, then brings in roads, soils and protected areas.",
      tags: ["Python", "GeoPandas", "Urban Ecology", "Spatial Analysis"],
      tools: ["Python", "GeoPandas", "Pandas", "Matplotlib", "Folium", "Jupyter", "SQL"],
      data: [
        "Vegetation cover of Bogotá wetlands (shapefile)",
        "Bogotá municipal boundary",
        "Intermediate road network",
        "Soil, RUNAP protected areas and UPZ layers",
      ],
      thumbnail: { src: "assets/img/projects/bogota-wetlands/thumb.png", alt: "Map of the 15 wetland boundaries in Bogotá produced in the project notebook", placeholder: false },
      sections: {
        context:
          "Bogotá's wetlands are key urban ecosystems. This project builds a reproducible Python workflow to organise and analyse the city's wetland layers as a basis for further spatial analysis.",
        objectives:
          "Consolidate wetland vegetation-cover polygons into one boundary per wetland, calculate their areas in a projected CRS, and prepare the other city layers for overlay analysis.",
        methods: [
          "Loaded the wetland vegetation-cover layer (7,112 polygons) and dissolved it by wetland name into 15 boundaries, checking geometry validity.",
          "Reprojected from EPSG:4686 to EPSG:3116 (MAGNA-SIRGAS / Colombia Bogotá) to calculate areas in square metres and hectares.",
          "Exported results to GeoPackage, GeoJSON and CSV, and built an interactive Folium map. Additional layers (roads, soils, RUNAP, UPZ) were batch-reprojected for the next stage.",
        ],
        results: [
          "The 15 wetlands cover about 2,058 ha in total. The largest are Juan Amarillo or Tibabuyes (437.7 ha), Jaboque (351.9 ha) and Guaymaral (195.4 ha).",
          "Overlay analysis with the other layers is the next stage of the project.",
        ],
      },
      gallery: [
        { src: "assets/img/projects/bogota-wetlands/wetland-areas.png", alt: "Horizontal bar chart of wetland area in hectares for the 15 Bogotá wetlands", caption: "Area of each wetland in hectares (EPSG:3116).", placeholder: false },
        { src: "assets/img/projects/bogota-wetlands/wetland-boundaries.png", alt: "Map of dissolved wetland boundaries in Bogotá", caption: "Dissolved wetland boundaries.", placeholder: false },
      ],
      links: [{ label: "GitHub repository", url: "https://github.com/MoisesZION/humedales" }],
    },
    {
      id: "santander-land-cover-change",
      title: "Land-Cover Change Assessment in Santander, Colombia",
      status: "completed",
      type: null,
      year: null,
      summary:
        "Google Earth Engine workflow comparing 2020 and 2025 land cover in Santander to support field validation with cocoa producers, in the context of FEDECACAO–FAO work.",
      tags: ["Google Earth Engine", "Sentinel-2", "Land-Cover Change", "Deforestation"],
      tools: ["Google Earth Engine (JavaScript)"],
      data: [
        "Sentinel-2 Surface Reflectance (COPERNICUS/S2_SR_HARMONIZED)",
        "Dynamic World V1",
        "Hansen Global Forest Change 2024 v1.12",
        "JRC Global Forest Cover 2020",
        "FAO GAUL 2015 (boundaries)",
      ],
      thumbnail: { src: "assets/img/placeholders/landcover.svg", alt: "Placeholder graphic of abstract land-cover patches", placeholder: true },
      sections: {
        context:
          "A demonstrative exercise for the department of Santander, Colombia, developed in the context of joint work between FEDECACAO and FAO. It shows how global Earth observation products can support analysis and field verification of land-cover change in cocoa-producing areas. The repository describes it as an initial, demonstrative version.",
        objectives: [
          "Visualise land-cover change between 2020 and 2025 and compare Sentinel-2 imagery for both periods.",
          "Analyse NDVI change and flag areas classified as trees in 2020 that show another cover, or specifically crops, in 2025.",
          "Summarise historical tree-cover loss between 2001 and 2024 as annual statistics.",
        ],
        methods: [
          "Annual Sentinel-2 median mosaics for 2020 and 2025 (cloud filter below 30 % plus QA60 masking), with NDVI for each year and a dNDVI difference layer.",
          "Dynamic World modal land-cover class per year to detect the transitions trees → other cover and trees → crops.",
          "Hansen Global Forest Change with a 30 % canopy threshold to compute hectares of tree-cover loss per year, with optional GeoTIFF and CSV exports to Google Drive.",
        ],
        results:
          "The script produces map layers and annual loss statistics inside Google Earth Engine. The repository presents these as demonstration outputs that require field validation, not as a definitive compliance determination.",
      },
      gallery: [],
      links: [{ label: "GitHub repository", url: "https://github.com/MoisesZION/fedecacao-fao-cambio-cobertura" }],
    },
    {
      id: "soc-prediction",
      title: "Soil Organic Carbon Prediction with Remote Sensing and XGBoost",
      status: "in-progress",
      type: null,
      year: null,
      summary:
        "Pipeline that predicts topsoil organic carbon for an olive-grove property in Extremadura, Spain, from Sentinel-2, Sentinel-1, PlanetScope and terrain data using XGBoost.",
      tags: ["Machine Learning", "XGBoost", "Sentinel-2", "Soil Carbon"],
      tools: ["Python", "Google Earth Engine", "geemap", "Rasterio", "GeoPandas", "XGBoost", "Optuna", "scikit-learn"],
      data: [
        "Sentinel-2 seasonal composites (2021–2023)",
        "Sentinel-1 SAR (VV/VH)",
        "PlanetScope 4-band surface reflectance",
        "SRTM 30 m DEM",
        "LUCAS 2018 Topsoil (ESDAC) samples",
      ],
      thumbnail: { src: "assets/img/projects/soc-prediction/thumb.png", alt: "Predicted soil organic carbon map for the olive-grove property", placeholder: false },
      sections: {
        context:
          "Soil organic carbon is central to carbon accounting in agricultural land. The methodology is adapted from Wang et al. (2024), Remote Sensing 16(17), 3268, which estimated farmland SOC from multi-source remote sensing.",
        objectives:
          "Build a reproducible pipeline that goes from satellite data acquisition to a 20 m SOC map for an area of interest.",
        methods: [
          "Acquired seasonal Sentinel-2 composites, a six-window Sentinel-1 stack, PlanetScope imagery and SRTM terrain through Google Earth Engine and the Planet API.",
          "Engineered 171 features, including vegetation, soil, salinity, red-edge and moisture indices, radar indices and terrain variables.",
          "Trained an XGBoost regressor with Optuna hyper-parameter tuning and produced a GeoTIFF prediction map.",
        ],
        results: [
          "The current model is not yet reliable. Validation R² was 0.545 (RMSE 7.89 g/kg), but the small hold-out test set (n = 21) gave a negative R², and the gap between training and validation scores indicates overfitting.",
          "The figures below show pipeline outputs, not a validated SOC estimate. More ground-truth samples are needed.",
        ],
      },
      gallery: [
        { src: "assets/img/projects/soc-prediction/soc-map.png", alt: "Predicted SOC map and frequency distribution", caption: "Pipeline output: predicted SOC map (20 m) and value distribution. Not yet validated.", placeholder: false },
        { src: "assets/img/projects/soc-prediction/validation-scatter.png", alt: "Observed versus predicted SOC scatter plot", caption: "Observed vs predicted SOC.", placeholder: false },
        { src: "assets/img/projects/soc-prediction/feature-importance.png", alt: "Bar chart of XGBoost feature importance", caption: "Feature importance of the XGBoost model.", placeholder: false },
      ],
      links: [{ label: "GitHub repository", url: "https://github.com/MoisesZION/SOC_prediction" }],
    },
    {
      id: "whisp-workflow",
      title: "Local OpenForis WHISP Workflow",
      status: "in-progress",
      type: null,
      year: null,
      summary:
        "Runs the OpenForis WHISP deforestation-risk analysis locally with Google Earth Engine and Python, so custom GeoJSON plots can be assessed without the online interface.",
      tags: ["Deforestation Risk", "Google Earth Engine", "OpenForis WHISP", "Python"],
      tools: ["Python", "Google Earth Engine", "OpenForis WHISP", "Jupyter"],
      data: ["Custom GeoJSON plots", "WHISP multiband Earth Engine image (forest, commodity and disturbance layers)"],
      thumbnail: { src: "assets/img/placeholders/forest.svg", alt: "Placeholder graphic of abstract canopy profile", placeholder: true },
      sections: {
        context:
          "WHISP (\"What is in that plot?\") from OpenForis supports deforestation-free supply-chain assessments by cross-referencing plots with global forest and land-use datasets.",
        objectives:
          "Reproduce the official WHISP notebook locally and allow analysis of custom GeoJSON files.",
        methods: [
          "Authenticate with Google Earth Engine, load custom GeoJSON plots and build the WHISP multiband image.",
          "Compute WHISP statistics and risk indicators, then export results to CSV and an enriched GeoJSON.",
        ],
        results:
          "Earth Engine authentication, local execution, custom GeoJSON processing and CSV/GeoJSON export are working. Next steps listed in the repository: better documentation, exploring WHISP output variables and integrating Colombian datasets.",
      },
      gallery: [],
      links: [
        { label: "GitHub repository", url: "https://github.com/MoisesZION/Whisp_FAO" },
        { label: "Official OpenForis WHISP", url: "https://github.com/forestdatapartnership/whisp" },
      ],
    },
    {
      id: "ndvi-calculator",
      title: "NDVI Calculator Desktop App",
      status: "completed",
      type: "academic",
      year: null,
      summary:
        "Desktop application built with Python, PyQt5 and Qt Designer that calculates NDVI from RED and NIR values and explains what the result suggests about vegetation cover.",
      tags: ["Python", "PyQt5", "NDVI", "Desktop App"],
      tools: ["Python", "PyQt5", "Qt Designer"],
      data: [],
      thumbnail: { src: "assets/img/placeholders/spectral.svg", alt: "Placeholder graphic of abstract spectral bands", placeholder: true },
      sections: {
        context: "An academic project applying Python GUI development to a core remote-sensing concept.",
        objectives:
          "Compute NDVI = (NIR − RED) / (NIR + RED) from two input values and give a plain-language interpretation of the vegetation cover it suggests.",
        methods: [
          "Interface designed in Qt Designer and loaded from a .ui file; application logic in a dedicated class.",
          "Input validation for empty, non-numeric and out-of-range values (0–255) and protection against division by zero, with clear error dialogs.",
        ],
        results:
          "A working desktop app that returns NDVI to two decimals with an interpretation from water or bare surfaces up to very dense, vigorous vegetation.",
      },
      gallery: [],
      links: [{ label: "GitHub repository", url: "https://github.com/MoisesZION/ndvi-calculator-pyqt5" }],
    },
    {
      id: "qgis-plugins",
      title: "QGIS Plugins with PyQGIS",
      status: "completed",
      type: "academic",
      year: null,
      summary:
        "Three QGIS 3 plugins written in Python at Universidad Distrital: a WGS84 angular-to-metric distance converter, and tools to show and rename the active layer.",
      tags: ["QGIS", "PyQGIS", "Python", "Plugin Development"],
      tools: ["QGIS 3", "PyQGIS", "Python", "Qt Designer", "Plugin Builder"],
      data: [],
      thumbnail: { src: "assets/img/placeholders/code.svg", alt: "Placeholder graphic of abstract code lines", placeholder: true },
      sections: {
        context: "Developed as part of coursework at Universidad Distrital Francisco José de Caldas to extend QGIS with custom tools.",
        objectives: "Learn the QGIS plugin structure and automate small GIS tasks through the QGIS Python API.",
        methods: [
          "Conversor distancias: converts an angular distance in the WGS84 reference system to a metric distance.",
          "Mostrar capa activa: shows the display name of the active layer in the table of contents.",
          "Cambiar nombre capa: renames the active layer from a name entered by the user.",
        ],
        results: "Three working plugins (version 0.1) for QGIS 3.",
      },
      gallery: [],
      links: [{ label: "GitHub repository", url: "https://github.com/MoisesZION/QGIS_plugins" }],
    },
    {
      id: "markup-languages-workshop",
      title: "Geographic Markup Languages Workshop",
      status: "completed",
      type: "academic",
      year: null,
      summary:
        "Coursework website for MV Carbon, a nature-based solutions company concept, combining HTML, CSS and JavaScript with XML, KML and GML geographic data.",
      tags: ["HTML", "XML", "KML", "GML"],
      tools: ["HTML", "CSS", "JavaScript", "XML Schema (XSD)", "KML", "GML"],
      data: ["KML placemarks of sites in Bogotá", "GML geodata"],
      thumbnail: { src: "assets/img/placeholders/code.svg", alt: "Placeholder graphic of abstract code lines", placeholder: true },
      sections: {
        context: "Workshop for the Markup Languages course of the GIS specialization.",
        objectives: "Practise structuring, validating and displaying geographic and business data with web and geographic markup languages.",
        methods: [
          "Multi-page site with services, clients, locations and a CV page.",
          "Invoice data in XML validated against an XSD schema and transformed to HTML with JavaScript.",
          "Points of interest stored as KML and geodata as GML.",
        ],
        results: "A complete multi-page coursework site.",
      },
      gallery: [],
      links: [{ label: "GitHub repository", url: "https://github.com/MoisesZION/Taller_TLM" }],
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
