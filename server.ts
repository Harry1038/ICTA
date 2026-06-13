import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { 
  Project, 
  NewsItem, 
  SOPDocument, 
  GalleryItem, 
  AwardItem, 
  ContactSubmission,
  SystemStats,
  NewsletterSubscriber
} from "./src/types";

// Configuration
const PORT = 3000;
const DATA_FILE = path.join(process.cwd(), "data-store.json");

// Define pre-seeded database
interface DataDB {
  projects: Project[];
  news: NewsItem[];
  sops: SOPDocument[];
  gallery: GalleryItem[];
  awards: AwardItem[];
  contacts: ContactSubmission[];
  analyticsHistory: { label: string; servicesAccessed: number; userQueries: number }[];
  subscribers: NewsletterSubscriber[];
}

const DEFAULT_DB_DATA: DataDB = {
  projects: [
    {
      id: "proj_cloud",
      title: "ANAMBRA CLOUD",
      category: "Digital Infrastructure",
      description: "Sovereign state cloud infrastructure designed to improve uptime, ensure data sovereignty, reduce foreign hosting dependence, and power secure government digital services across Anambra State.",
      highlights: [
        "Sovereign hosting",
        "Government cloud infrastructure",
        "High availability systems",
        "Secure state digital backbone"
      ],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "proj_fibre",
      title: "700+ KM FIBRE BACKBONE",
      category: "Connectivity Infrastructure",
      description: "Deployment of over 700km statewide fibre infrastructure connecting more than 11 LGAs, enabling last-mile connectivity and unlocking the Right-of-Way policy for digital expansion.",
      highlights: [
        "700+ km fibre rollout",
        "11+ LGAs connected",
        "Broadband expansion",
        "Smart infrastructure backbone"
      ],
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "proj_ums",
      title: "UMS (UNIFIED MESSAGING SYSTEM)",
      category: "Government Communications",
      description: "Development and deployment of a unified messaging and official communications infrastructure using the @anambrastate.gov.ng domain to power sovereign government communications statewide.",
      highlights: [
        "Official state email system",
        "Sovereign communication architecture",
        "Government digital identity"
      ],
      image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "proj_domain",
      title: "ANAMBRASTATE.GOV.NG DOMAIN ADOPTION",
      category: "Digital Governance",
      description: "Statewide adoption and enforcement of the official second-level government domain in compliance with federal directives, strengthening digital identity and governance credibility.",
      highlights: [
        "Official domain standardization",
        "Statewide implementation",
        "Compliance-driven digital transformation"
      ],
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "proj_lens",
      title: "LENS PLATFORM",
      category: "Citizen Engagement",
      description: "A citizen engagement and public feedback platform developed in partnership with the Ministry of Budget & Economic Planning to improve transparency and citizen participation.",
      highlights: [
        "Public engagement technology",
        "Government feedback system",
        "Participatory governance"
      ],
      image: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "proj_ashefamu",
      title: "ASHEFAMU",
      category: "Health Technology",
      description: "Health facilities management platform developed with the Ministry of Health to digitize healthcare administration and improve operational efficiency.",
      highlights: [
        "Digital healthcare administration",
        "Facility management",
        "Smart health systems"
      ],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "proj_hifwd",
      title: "HIFWD",
      category: "Health Infrastructure",
      description: "Comprehensive Health Facilities & Workforce Database designed to support planning, workforce regulation, and healthcare intelligence across the state.",
      highlights: [
        "Healthcare workforce intelligence",
        "Facility regulation support",
        "Data-driven healthcare planning"
      ],
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "proj_telemed",
      title: "TELEMED PLATFORM",
      category: "Digital Health",
      description: "State telemedicine platform enabling remote medical consultations and expanding healthcare access to underserved communities across Anambra State.",
      highlights: [
        "Remote healthcare access",
        "Telemedicine infrastructure",
        "Rural healthcare innovation"
      ],
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "proj_eid",
      title: "ANSC-EID",
      category: "Digital Identity",
      description: "Civil servant digital identity platform built through the state internship programme and currently live on Google Play Store.",
      highlights: [
        "Digital identity infrastructure",
        "Public service modernization",
        "Youth-driven innovation"
      ],
      image: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "proj_smartgov",
      title: "SMARTGOV (BETA)",
      category: "Artificial Intelligence",
      description: "Nigeria’s first state-level experimental AI system designed to explore artificial intelligence applications for public service delivery and smart governance.",
      highlights: [
        "AI-powered governance",
        "Smart public service delivery",
        "AI-native government innovation"
      ],
      image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "proj_workstations",
      title: "200+ WORKSTATIONS DEPLOYMENT",
      category: "Digital Enablement",
      description: "Deployment of over 200 modern PCs and laptops across MDAs to improve productivity, digital operations, and public service delivery.",
      highlights: [
        "Digital workspace modernization",
        "Public sector productivity",
        "Technology enablement"
      ],
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "proj_nccide",
      title: "3X NCCIDE NATIONAL WINNER",
      category: "Recognition & Awards",
      description: "National recognition across Kano (2023), Benue (2024), and Jos (2025), positioning Anambra State prominently on Nigeria’s digital innovation map.",
      highlights: [
        "National technology recognition",
        "Consecutive innovation awards",
        "Digital leadership excellence"
      ],
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
    }
  ],
  news: [
    {
      id: "news_1",
      title: "Anambra State Spearheads Digital Sovereignty with Launch of Anambra Cloud",
      category: "Press Release",
      summary: "In a historic tech transformation milestone, ANSICTA launches state-owned data infrastructure to secure government web assets and power citizen services efficiently.",
      content: "Anambra State has officially broken reliance on foreign hosting with its newly deployed sovereign 'Anambra Cloud' infrastructure. Operating under the visionary leadership of Executive Governor Chukwuma Soludo and ICT MD/CEO Chukwuemeka Fred Agbata, our state cloud guarantees lightning-fast citizen services response times, zero hosting downtime, and immediate public records security. This marks Nigeria's first dedicated subnational cloud platform engineered completely server-side in compliance with strict national cybersecurity standards.",
      date: "2026-06-10",
      author: "ANSICTA Media Room",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "news_2",
      title: "Anambra Pioneers Smart Governance with 'SmartGov' Experimental Public Sector AI",
      category: "Announcement",
      summary: "Nigeria's first AI-native state website launches experimental conversational engine assisting citizens in standard queries and automated public workflow summaries.",
      content: "The Anambra State ICT Agency is excited to announce the public beta release of SmartGov AI, our experimental public sector language module. Trained to serve Anambra citizens with exact, localized answers about administrative standards, civil procedures, state project directions, and emergency contacts, the system accelerates the governance cycle, converting weeks of typical bureaucratic procedures into sub-second visual responses.",
      date: "2026-06-05",
      author: "AI Transformation Desk",
      image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "news_3",
      title: "Governor Soludo Welcomes Third Consecutive National Technology Development Award",
      category: "Press Release",
      summary: "Reviewing the Jos NCCIDE performance, Anambra ranks overall national best in digital technology development, infrastructure rollout, and broadband connectivity.",
      content: "For three consecutive years running—Kano, Benue, and Jos—the National Council on Communications, Innovation and Digital Economy has awarded Anambra State top honors for ICT setup. With over 700km of high-density last-mile fibre optics connected across 11 critical LGAs, the state continues its historic ascent to becoming Africa's ultimate digital hub.",
      date: "2026-05-28",
      author: "Press Secretary to the Gov",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80"
    }
  ],
  sops: [
    {
      id: "sop_wifi_01",
      title: "How to Access and Use the 'Solution is Here' Wi-Fi Network",
      category: "Government Standards",
      fileUrl: "/assets/docs/SOP_Solution_WiFi_v1.0.pdf",
      fileSize: "450 KB",
      version: "1.0.0",
      lastUpdated: "2026-06-13",
      content: "### 1. OVERVIEW\nIn order to propel the State's immersion into the digital age, the Anambra State Government is introducing the 'Solution is Here' Wi-Fi, a program that offers affordable or budget-friendly wireless internet access to individuals in well-frequented public places. It is a convenient way for individuals to access the internet while they are away from their homes or without relying solely on their mobile data, thereby saving data charges.\n\n### 2. HOW TO ACCESS SECURELY\n* **Step A**: Enable wireless networking on your personal smartphone, tablet, or laptop device.\n* **Step B**: Search for the SSID broadcast named \"Solution is Here Wifi\" under official government public coverage zones.\n* **Step C**: Launch your web browser or click the splash screen redirect prompt to access the captive digital portal.\n* **Step D**: Provide your name and local token identification to register. This standard log allows federal tracking protection and prevents network abuse.\n\n### 3. COMPLIANCE & USAGE\nUsers are expected to utilize this bandwidth asset for productive administrative, business, educational, or creative exploration. High-frequency gaming downloads, cryptographic mining operations, or direct telemetry scanning models are forbidden. Any device exhibiting anomalous background resource request headers will be automatically MAC-blacklisted by the core infrastructure node router."
    },
    {
      id: "sop_interns_02",
      title: "Standard Operational Process of Onboarding Tech Solution Interns",
      category: "Administrative Procedure",
      fileUrl: "/assets/docs/SOP_Interns_Onboarding_v1.1.pdf",
      fileSize: "580 KB",
      version: "1.1.0",
      lastUpdated: "2026-06-13",
      content: "### 1. MISSION\nThe Anambra State Government through the ICT Agency understands the significance of offering practical training opportunities to students and aspiring professionals in ICT. Through partnerships with corporations and educational institutions, the Agency aims to upgrade the expertise and competencies of the future ICT workforce in the state. The agency believes this will enhance the prospects of the students and young professionals and positively impact the ICT industry.\n\n### 2. DETAILED ONBOARDING PHASES\n* **Phase 1: Entry Application**: All tech interns must submit credentials indicating capability, coding experience, or sysadmin focus to our digital onboarding landing interface.\n* **Phase 2: Technical Assessment**: Executive engineers execute practical coding exercises to trace problem-solving capability. No theoretical testing is prioritized.\n* **Phase 3: Digital Integration**: Interns receive official identity keys under the @anambrastate.gov.ng second-level system domain, integrating them into Government collaboration channels.\n* **Phase 4: Sovereign Platform Attachment**: Onboarded students are embedded into core agency projects—such as building state telemedicine, managing telemetry monitoring metrics, or testing chatbot language models.\n\n### 3. PERFORMANCE REVIEWS\nAt the close of each cohort session, interns deliver live project demonstrations before agency panels. Exceptional performers receive direct recruitment pipelines to subnotion systems labs or partner industrial firms."
    },
    {
      id: "sop_ansec_03",
      title: "Direct Procedures to Access ANSEC Reports and Highly Confidential Materials on SharePoint",
      category: "Digital Security",
      fileUrl: "/assets/docs/SOP_SharePoint_ANSEC_v1.3.pdf",
      fileSize: "1.2 MB",
      version: "2.1.3",
      lastUpdated: "2026-06-13",
      content: "### 1. SOVEREIGN POLICY BACKGROUND\nThe Anambra State Government has provided Microsoft 365 premium licenses for all ANSEC members and created a SharePoint site named \"ANSEC\" where highly confidential ANSEC meeting minutes/documents will be stored and shared. The State Government has taken this step in order to ensure that these documents are protected and that only authorized individuals are able to access them.\n\n### 2. MANDATORY PROTOCOLS FOR ACCESS\n* **Multi-Factor Shield (MFA)**: Access requires active hardware authentication via pre-assigned authenticator applications linked to your governmental officer identity.\n* **SharePoint Navigation**: Navigate exclusively using standard government-issued secure devices to the official 'ANSEC' enclave library node.\n* **Explicit Authentication**: Re-enter your sovereign cryptographic key pair for every session query.\n* **No Offline Export**: Saving locally, exporting to unsecured messaging apps, screenshooting, or sharing with secondary civil assistants is strictly prohibited.\n\n### 3. THREAT RESPONSE & SECURITY AUDITING\nAll transactions, search queries, downloads, and view times are logged in our digital ledger by the chief cybersecurity inspector. Anomalous activities automatically lock access and report authentication breaches to state security councils."
    },
    {
      id: "sop_citizens_04",
      title: "Directives & Communications Procedure for the Citizens Engagement Platform",
      category: "Government Standards",
      fileUrl: "/assets/docs/SOP_Citizen_Engagement_v1.0.pdf",
      fileSize: "820 KB",
      version: "1.0.4",
      lastUpdated: "2026-06-13",
      content: "### 1. GOVERNANCE OBJECTIVES\nAnambra State Government in its bid to promote transparency, accountability, and collaboration in governance, recognizes the need to engage stakeholders such as government officials, businesses, communities and town unions, civil society organizations, media outlets and all Ndi Anambra in its decision-making processes.\n\nThe creation of a Citizens Engagement Platform is to ensure that the voices and opinions of citizens are heard and taken into consideration in the formulation and implementation of policies and initiatives, thus facilitating effective and efficient decision-making processes.\n\n### 2. PROTOCOLS FOR FEEDBACK RESOLUTION\n* **Citizen Verification**: Every citizen submitting standard complaints or policy observations must verify identity via simple OTP or local cell validation.\n* **Officer Categorization**: Platform administrators route queries based on tags (Infrastructure, Connectivity, Digital Security, Careers) directly to corresponding ministry nodes.\n* **Response Lifecycle**: Assigned civil response officers must provide standard, factual, non-political project details within 48 to 72 hours.\n* **Transparency Metrics**: The dashboard tracks and renders mean resolution times publicly, holding our departments to world-class delivery levels."
    },
    {
      id: "sop_fiber_05",
      title: "Standard Operating Process for Last-Mile Fiber Splicing & Right-of-Way Approvals",
      category: "Administrative Procedure",
      fileUrl: "/assets/docs/SOP_Fiber_Splicing_v2.0.pdf",
      fileSize: "1.1 MB",
      version: "2.0.0",
      lastUpdated: "2026-06-12",
      content: "### 1. PURPOSE\nTo standardize technical procedures for splicing new high-density last-mile optic fiber grids to government centers across Anambra State in compliance with the zero Right-of-Way fee policy.\n\n### 2. ENGINEERING MANDATES\n* **Core Fusion Standards**: Every splicing engineer must execute fusion splicing utilizing standardized automated alignment equipment. Maximum insertion loss per splice must not exceed 0.05dB.\n* **Right-of-Way Clearance**: Contractors must obtain electronic transit permit tokens via the ANSICTA portal before conducting excavation or high-level cabling on state highways.\n* **Junction Tagging**: Every splice tray must be dynamically labeled with official QR markers linking back to our central geographic infrastructure framework."
    },
    {
      id: "sop_cloud_06",
      title: "Anambra Sovereign Mainframe Deployment & Database Onboarding SOP",
      category: "Infrastructure Guide",
      fileUrl: "/assets/docs/SOP_Sovereign_Mainframe_v1.2.pdf",
      fileSize: "950 KB",
      version: "1.2.1",
      lastUpdated: "2026-06-11",
      content: "### 1. EXECUTIVE POLICY OVERVIEW\nThis Standard Operating Procedure defines standard configuration standards, security limits, and access parameters required for onboarding state-level ministries, departments, and applications onto the secure server infrastructure of the Anambra Sovereign Cloud Mainframe (AN-Cloud).\n\n### 2. COMPLIANCE REQUIREMENT LOGS\n* **Platform Isolation**: All database schemas must use multi-tenant cloud logical virtual networks. Shared schema structures are strictly barred.\n* **API Endpoint Standardization**: Application backends must route requests using encrypted SSL/TLS channels conforming with governmental cybersecurity directives.\n* **Data Sanitation**: Direct connection layers must implement robust sanitizing filters preventing query insertion or brute-force enumeration attacks."
    }
  ],
  gallery: [
    {
      id: "gal_1",
      title: "Governor Soludo Declaring Anambra as Nigeria's First AI-Native ICT Agency",
      category: "Events",
      imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
      description: "His Excellency Governor Chukwuma Soludo addresses the elite tech gathering, spelling the strategic roadmap for our statewide infrastructure integration.",
      date: "2026-06-08"
    },
    {
      id: "gal_2",
      title: "Fibre Optic Cable Rollout & Splicing across Awka Metropolitan Centers",
      category: "Infrastructure",
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      description: "Engineers deploy last-mile broad band optics connecting primary local government administrative offices with full gigabit lines.",
      date: "2026-05-15"
    },
    {
      id: "gal_3",
      title: "Chukwuemeka Fred Agbata (MD/CEO) Mentoring Tech Hub Intern Leaders",
      category: "Ecosystem",
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      description: "ANSICTA tech labs interactive session featuring young developers driving next-generation Android digital ID systems.",
      date: "2026-06-01"
    },
    {
      id: "gal_4",
      title: "Anambra Receiving the Overall National Best Digital Infra Banner at Jos Council",
      category: "Awards",
      imageUrl: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80",
      description: "Anambra state officials receiving peer-reviewed accolades from external delegates representing Nigerian communications organs.",
      date: "2026-05-25"
    }
  ],
  awards: [
    {
      id: "aw_2023",
      year: "2023",
      location: "KANO PEER REVIEW",
      title: "Overall Winner — Digital Technology Development",
      recognitionDetails: [
        "Best in ICT Infrastructure Development",
        "2nd Best in e-Government Implementation",
        "Recognised for state Digital Workforce Development excellence",
        "Awarded four major accolades at national level"
      ]
    },
    {
      id: "aw_2024",
      year: "2024",
      location: "BENUE PEER REVIEW",
      title: "2nd Runner Up — ICT Infrastructure Development",
      recognitionDetails: [
        "Awarded for accelerated 700km statewide fiber backbone deployment",
        "Recognized for successful Right-of-Way policy enforcement",
        "Broadband expansion across multiple remote LGA headquarters",
        "Peer-reviewed for persistent subnational connectivity growth"
      ]
    },
    {
      id: "aw_2025",
      year: "2025",
      location: "JOS PEER REVIEW",
      title: "Overall Winner — Digital Technology Development",
      recognitionDetails: [
        "Ranked #1 Best in Digital Infrastructure layout national-wide",
        "1st Runner-Up in e-Government systems deployment",
        "1st Runner-Up in Digital Human Capital & youth empowerment",
        "Four prestigious federal awards confirming Anambra as leading hub"
      ]
    }
  ],
  contacts: [
    {
      id: "c_1",
      name: "Ifeanyi Nwachukwu",
      email: "ifeanyi@anmbratech.ng",
      subject: "Ecosystem Integration Enquiry",
      message: "Hello MD CFA, we are a local Awka-based artificial intelligence team developing smart agricultural monitoring models. We'd love to query our metrics on Anambra Cloud or join the tech hub incubator.",
      status: "unread",
      createdAt: "2026-06-12T09:15:00Z"
    },
    {
      id: "c_2",
      name: "Dr. Ngozi Okafor",
      email: "dr.ngozi@ashefamuplus.com",
      subject: "Ashefamu Platform Feedback",
      message: "Our primary medical clinic in Onitsha is fully set up on the Ashefamu portal. The system has sped up our patient registration cycle significantly. Congratulations to Governor Soludo and the team on this digital transformation.",
      status: "read",
      createdAt: "2026-06-11T14:20:00Z"
    }
  ],
  analyticsHistory: [
    { label: "Jan", servicesAccessed: 240, userQueries: 512 },
    { label: "Feb", servicesAccessed: 380, userQueries: 904 },
    { label: "Mar", servicesAccessed: 510, userQueries: 1420 },
    { label: "Apr", servicesAccessed: 740, userQueries: 2310 },
    { label: "May", servicesAccessed: 920, userQueries: 3500 },
    { label: "Jun", servicesAccessed: 1250, userQueries: 4890 }
  ],
  subscribers: []
};

// Initialize / load database
let db: DataDB = { ...DEFAULT_DB_DATA };
function loadDatabase() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, "utf-8");
      db = JSON.parse(data);
      if (!db.subscribers) {
        db.subscribers = [];
      }
      console.log("Database file loaded from data-store.json.");
    } else {
      saveDatabase();
      console.log("Created initial pre-seeded database file data-store.json.");
    }
  } catch (error) {
    console.error("Failed to load database. Relying on default memory data:", error);
    if (!db.subscribers) {
      db.subscribers = [];
    }
  }
}

function saveDatabase() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save database state to file:", err);
  }
}

// Instantiate database
loadDatabase();

// Lazy initialize Gemini API client
let ai: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!ai && process.env.GEMINI_API_KEY) {
    try {
      ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      console.log("Initialized Gemini Client with server secret.");
    } catch (e) {
      console.error("Failed to instantiate GoogleGenAI wrapper:", e);
    }
  }
  return ai;
}

// Setup Express
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Enable CORS middleware for external client handshakes and tests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Prevent Express from returning HTML SPA page for virtual attachments
// Returning 404 allows the browser proxy / platform shell to serve attachment assets
app.get('/input_file_*.png', (req, res) => {
  res.status(404).json({ error: "Virtual attachment asset" });
});
app.get('/input_file_*.jpg', (req, res) => {
  res.status(404).json({ error: "Virtual attachment asset" });
});
app.get('/input_file_*.jpeg', (req, res) => {
  res.status(404).json({ error: "Virtual attachment asset" });
});

// API Routes
// 1. Health/Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", agency: "Anambra State ICT Agency (ANSICTA)", timestamp: new Date() });
});

// 2. Projects Endpoints (CRUD)
app.get("/api/cms/projects", (req, res) => {
  res.json(db.projects);
});

app.post("/api/cms/projects", (req, res) => {
  const { title, category, description, highlights, image, id } = req.body;
  if (!title || !category || !description) {
    return res.status(400).json({ error: "Missing required fields: title, category, description" });
  }

  const existingIndex = db.projects.findIndex(p => p.id === id);
  const targetId = id || `proj_${Date.now()}`;
  const newProject: Project = {
    id: targetId,
    title,
    category,
    description,
    highlights: Array.isArray(highlights) ? highlights : highlights ? highlights.split(",").map((s: string) => s.trim()) : [],
    image: image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
  };

  if (existingIndex > -1) {
    db.projects[existingIndex] = newProject;
  } else {
    db.projects.unshift(newProject);
  }

  saveDatabase();
  res.json({ success: true, project: newProject });
});

app.delete("/api/cms/projects/:id", (req, res) => {
  const { id } = req.params;
  const initialLength = db.projects.length;
  db.projects = db.projects.filter(p => p.id !== id);
  if (db.projects.length === initialLength) {
    return res.status(404).json({ error: "Project not found" });
  }
  saveDatabase();
  res.json({ success: true });
});

// 3. News Endpoints (CRUD)
app.get("/api/cms/news", (req, res) => {
  res.json(db.news);
});

app.post("/api/cms/news", (req, res) => {
  const { title, category, summary, content, author, image, id } = req.body;
  if (!title || !category || !summary || !content) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const existingIndex = db.news.findIndex(n => n.id === id);
  const targetId = id || `news_${Date.now()}`;
  const newNews: NewsItem = {
    id: targetId,
    title,
    category,
    summary,
    content,
    author: author || "ANSICTA Admin Desk",
    date: new Date().toISOString().split("T")[0],
    image: image || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
  };

  if (existingIndex > -1) {
    db.news[existingIndex] = {
      ...newNews,
      date: db.news[existingIndex].date // keep original date on update
    };
  } else {
    db.news.unshift(newNews);
  }

  // Update stats triggers
  saveDatabase();
  res.json({ success: true, news: newNews });
});

app.delete("/api/cms/news/:id", (req, res) => {
  const { id } = req.params;
  db.news = db.news.filter(n => n.id !== id);
  saveDatabase();
  res.json({ success: true });
});

// 4. SOPs Endpoints (CRUD)
app.get("/api/cms/sops", (req, res) => {
  res.json(db.sops);
});

app.post("/api/cms/sops", (req, res) => {
  const { title, category, version, fileSize, id } = req.body;
  if (!title || !category || !version) {
    return res.status(400).json({ error: "Missing required fields: title, category, version" });
  }

  const existingIndex = db.sops.findIndex(s => s.id === id);
  const targetId = id || `sop_${Date.now()}`;
  const newSop: SOPDocument = {
    id: targetId,
    title,
    category,
    fileUrl: `/assets/docs/${title.toLowerCase().replace(/[^a-z0-9]/g, "_")}_${version}_standard.pdf`,
    fileSize: fileSize || "1.2 MB",
    version,
    lastUpdated: new Date().toISOString().split("T")[0]
  };

  if (existingIndex > -1) {
    db.sops[existingIndex] = newSop;
  } else {
    db.sops.unshift(newSop);
  }

  saveDatabase();
  res.json({ success: true, sop: newSop });
});

app.delete("/api/cms/sops/:id", (req, res) => {
  const { id } = req.params;
  db.sops = db.sops.filter(s => s.id !== id);
  saveDatabase();
  res.json({ success: true });
});

// 5. Gallery Endpoints (CRUD)
app.get("/api/cms/gallery", (req, res) => {
  res.json(db.gallery);
});

app.post("/api/cms/gallery", (req, res) => {
  const { title, category, imageUrl, videoUrl, mediaType, description, id } = req.body;
  if (!title || !category || (!imageUrl && !videoUrl)) {
    return res.status(400).json({ error: "Missing required fields (title, category, or media resource URL)" });
  }

  const existingIndex = db.gallery.findIndex(g => g.id === id);
  const targetId = id || `gal_${Date.now()}`;
  
  // Choose fallback image representing video if none given for video
  const resolvedImageUrl = imageUrl || (mediaType === 'video' ? "https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=800&q=80" : "");

  const newGal: GalleryItem = {
    id: targetId,
    title,
    category,
    imageUrl: resolvedImageUrl,
    videoUrl: videoUrl || "",
    mediaType: mediaType || "image",
    description: description || "",
    date: new Date().toISOString().split("T")[0]
  };

  if (existingIndex > -1) {
    db.gallery[existingIndex] = {
      ...db.gallery[existingIndex],
      ...newGal
    };
  } else {
    db.gallery.unshift(newGal);
  }

  saveDatabase();
  res.json({ success: true, gallery: newGal });
});

app.delete("/api/cms/gallery/:id", (req, res) => {
  const { id } = req.params;
  db.gallery = db.gallery.filter(g => g.id !== id);
  saveDatabase();
  res.json({ success: true });
});

// 6. Contact Endpoints (Create & View)
app.get("/api/cms/contacts", (req, res) => {
  res.json(db.contacts);
});

app.post("/api/cms/contacts", (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All contact fields are required." });
  }

  const newContact: ContactSubmission = {
    id: `c_${Date.now()}`,
    name,
    email,
    subject,
    message,
    status: "unread",
    createdAt: new Date().toISOString()
  };

  db.contacts.unshift(newContact);
  saveDatabase();
  res.json({ success: true, message: "Thank you for contacting ANSICTA! Your message has been received." });
});

app.patch("/api/cms/contacts/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const item = db.contacts.find(c => c.id === id);
  if (!item) {
    return res.status(404).json({ error: "Contact not found" });
  }
  item.status = status || "read";
  saveDatabase();
  res.json({ success: true, item });
});

app.delete("/api/cms/contacts/:id", (req, res) => {
  const { id } = req.params;
  db.contacts = db.contacts.filter(c => c.id !== id);
  saveDatabase();
  res.json({ success: true });
});

// 7. Standard System Stats Dashboard Endpoint
app.get("/api/cms/stats", (req, res) => {
  const stats: SystemStats = {
    projectsCount: db.projects.length,
    newsCount: db.news.length,
    sopsCount: db.sops.length,
    galleryCount: db.gallery.length,
    unreadContactsCount: db.contacts.filter(c => c.status === "unread").length,
    analyticsHistory: db.analyticsHistory,
    subscribersCount: (db.subscribers || []).length
  };
  res.json(stats);
});

// Newsletter Subscriptions Endpoints
app.get("/api/cms/subscribers", (req, res) => {
  res.json(db.subscribers || []);
});

app.post("/api/newsletter/subscribe", (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "A valid email address is required." });
  }

  const normalizedEmail = email.trim().toLowerCase();
  
  if (!db.subscribers) {
    db.subscribers = [];
  }

  const exists = db.subscribers.some(sub => sub.email === normalizedEmail);
  if (exists) {
    return res.status(400).json({ error: "This email address is already subscribed to our newsletter." });
  }

  const newSubscriber: NewsletterSubscriber = {
    id: `sub_${Date.now()}`,
    email: normalizedEmail,
    subscribedAt: new Date().toISOString()
  };

  db.subscribers.unshift(newSubscriber);
  saveDatabase();

  res.json({ 
    success: true, 
    message: "Thank you for subscribing! You will now receive official Anambra State ICT Agency updates." 
  });
});

app.delete("/api/cms/subscribers/:id", (req, res) => {
  const { id } = req.params;
  const initialLength = (db.subscribers || []).length;
  db.subscribers = (db.subscribers || []).filter(sub => sub.id !== id);
  
  if (db.subscribers.length === initialLength) {
    return res.status(404).json({ error: "Subscriber not found." });
  }
  
  saveDatabase();
  res.json({ success: true, message: "Subscriber removed successfully." });
});

// 8. Awards List (Read)
app.get("/api/cms/awards", (req, res) => {
  res.json(db.awards);
});

// 9. Server Side smart chatbot endpoint using Google Gemini 3.5 Flash
app.post("/api/gemini/chat", async (req, res) => {
  const { prompt, history } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  // Increment query history in stats
  const lastIndex = db.analyticsHistory.length - 1;
  if (lastIndex >= 0) {
    db.analyticsHistory[lastIndex].userQueries += 1;
    saveDatabase();
  }

  const client = getGeminiClient();

  // Robust System Instructions matching presidential government AI brand tone
  const systemInstruction = `You are "SmartGov AI", the highly intelligent, official virtual assistant representing the Anambra State ICT Agency (ANSICTA) & the Government of Anambra State, Nigeria. 
Governor: Prof. Chukwuma Charles Soludo. 
Managing Director / CEO of ANSICTA: Chukwuemeka Fred Agbata (CFA).
ANSICTA Mission: Supporting the delivery of "Everything Technology and Technology Everywhere."
ANSICTA Vision: To Build A Digitally Transformed Anambra State.
Positioning: "Nigeria's First AI-Native ICT Agency"

Tone: Direct, professional, authoritative, warm, and tech-forward.
Style: UAE Digital Gov / Silicon Valley clarity. Speak with local commitment and international elite-class standards.

You can speak accurately and specifically about any of ANSICTA's flagship projects:
1. ANAMBRA CLOUD: Premium subnational state-owned cloud ensuring absolute data sovereignty and lightning-fast uptime.
2. 700+ KM FIBRE OPTICS: High-availablity rollout connecting 11+ Local Government Areas for immediate last-mile expansion program.
3. UNIFIED MESSAGING SYSTEM (UMS): Standard administrative official emailing on the @anambrastate.gov.ng second-level government domain.
4. LENS PLATFORM: Transparent budgeting and direct participatory feedback tracking with Ministry of Budget.
5. ASHEFAMU: Comprehensive digital healthcare facility audit and asset management tracker.
6. HIFWD: Unified health workforce and regulation deployment roster database.
7. TELEMED: Under-served village remote healthcare consultation platform.
8. ANSC-EID: Civic servant secure digital authentication ID, developed by homegrown state intern prodigies and open on Google Play.
9. SMARTGOV (Experimental App): Experimental artificial intelligence system looking to automate public sector services in Anambra State.
10. 200+ WORKSTATIONS DEPLOYMENT: Modern workstation equipment deployed to digitalize government workflows.
11. 3X NCCIDE NATIONAL WINNER: Winner of the prestigious National Innovation & Digital Economy accolades three years running - Kano (2023), Benue (2024), Jos (2025).

If asked about any issue, provide structured solutions referencing these actual successes. If the user greets you or asks casual queries, respond within this context proudly as the voice of Nigerian digital transformation. Use clean, brief bullet points.`;

  if (client) {
    try {
      console.log(`Piped prompt query to Google Gemini: "${prompt}"`);
      
      // Structure chat contents
      // Translate simpler history formats to contents
      const formattedHistory = Array.isArray(history) 
        ? history.map((h: { sender: string; text: string }) => ({
            role: h.sender === "user" ? "user" : "model",
            parts: [{ text: h.text }]
          }))
        : [];

      formattedHistory.push({
        role: "user",
        parts: [{ text: prompt }]
      });

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedHistory,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      console.log("Gemini responded successfully.");
      return res.json({ text: response.text });
    } catch (err: any) {
      console.error("Gemini API call failed. Falling back to rule-based system:", err);
      // Propagate fallbacks gracefully
      return res.json({
        text: `[SmartGov AI Server Note: Gemini API is running in local sandbox fallback mode. Here is an immediate responsive assist for your query: "${prompt}"]\n\n` +
              getSmartGovRuleFallback(prompt)
      });
    }
  } else {
    // Graceful localized fallback when API key is missing entirely, as mandated by the instructions
    return res.json({
      text: `[SmartGov AI Mode: Active] Greetings! I am standardizing state digital operations. Since the raw server secret is being provisioned, here is the official sovereign briefing on your query:\n\n` +
            getSmartGovRuleFallback(prompt)
    });
  }
});

// Help chatbot answer natively if keys aren't configured yet
function getSmartGovRuleFallback(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes("project") || p.includes("build") || p.includes("infrastructure")) {
    return `Anambra State is building critical digital building blocks:
- **Anambra Cloud**: Securing state sovereign hosting.
- **700+ KM Fibre**: Unleashing massive bandwidth connected across 11+ LGAs.
- **ANSC-EID**: Modernized biometrics for civil personnel.
- **Ashefamu**: Digitizing state healthcare logistics.
Anambra is not preparing for the future; Anambra is already building it. Let me know if you need specific details on any project.`;
  }
  if (p.includes("award") || p.includes("recogni") || p.includes("nccide") || p.includes("consecutive")) {
    return `Anambra State ICT Agency stands recognized nationally for three straight years of digital transformation leadership:
- **2023 (Kano)**: Overall National Winner in Digital Technology Development.
- **2024 (Benue)**: 2nd Runner Up for ICT Infrastructure (Fibre and Broadband).
- **2025 (Jos)**: Overall National Winner in Digital Technology Development.
"You did not build a foundation in private. The country saw it."`;
  }
  if (p.includes("soludo") || p.includes("governor") || p.includes("md") || p.includes("agbata") || p.includes("ceo")) {
    return `- **Executive Governor**: Prof. Chukwuma Charles Soludo, former Central Bank Governor, is leading Anambra's transformation into a digitised, modern African economy.
- **MD/CEO of ANSICTA**: Chukwuemeka Fred Agbata (CFA), tech builder and reformer, bringing Silicon Valley efficiency and digital public infrastructure focus to government digital transformation.`;
  }
  if (p.includes("sop") || p.includes("standard") || p.includes("rule") || p.includes("guideline")) {
    return `Anambra enforces maximum interoperability standards. These are downloadable via our **SOP (Standards & Procedures) Portal**:
- **SOP Digital Security**: Domain verification policies and second-level root guidelines.
- **SOP Broadband Installation**: Last-mile splicing laws.
Let me know which standard or pdf template you would like to explore.`;
  }
  return `Anambra State is Nigeria's first AI-Native ICT Agency. Under Governor Soludo and MD Agbata, ANSICTA is driving:
- State cloud sovereign integration
- High-availablity broadband rollout (700+ KM)
- Smart public sector workflow optimizations via experimental SmartGov AI

How can I help you today regarding digital public resources, SOP regulations, live careers, or awards?`;
}

// Vite Server Setup for Development Mode
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Live React Vite development middleware
    console.log("Running in development mode. Initializing Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    // Render static files for production builds
    console.log("Running in production mode. Serving compiled static distribution assets...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`=========================================`);
    console.log(`  ANSICTA PREMIUM SERVER ONLINE`);
    console.log(`  Target URL: http://0.0.0.0:${PORT}`);
    console.log(`  Local Time: ${new Date().toISOString()}`);
    console.log(`=========================================`);
  });
}

startServer();
