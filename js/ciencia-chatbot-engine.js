(function (root, factory) {
  "use strict";

  var engine = factory();
  if (typeof module === "object" && module.exports) module.exports = engine;
  if (root) root.CienciaChatbotEngine = engine;
})(typeof window !== "undefined" ? window : null, function () {
  "use strict";

  var sourceDate = "2026-10-15";
  var intents = [
    { name: "COURSE_LIST", patterns: [/\b(courses?|trainings?|programmes?|programs?|classes|teach|listed|schedule|batch dates|availability|what can i study|what do you teach)\b/] },
    { name: "COURSE_DETAILS", patterns: [/\b(course|training|programme|program) details\b/] },
    { name: "COURSE_DURATION", patterns: [/\b(duration|how long|length|weeks?|months?|days?|schedule|timeline)\b/] },
    { name: "COURSE_FEE", patterns: [/\b(fee|fees|cost|price|pricing|tuition|pay|payment|how much|rupees?|rs)\b/] },
    { name: "COURSE_ELIGIBILITY", patterns: [/\b(eligib|qualif|bsc|b\.sc|msc|m\.sc|phd|ph\.d|student|join|admission|background|who can|who is eligible|apply)\b/] },
    { name: "COURSE_MODE", patterns: [/\b(online|classroom|in person|format|weekend|remote|mode)\b/] },
    { name: "COURSE_CURRICULUM", patterns: [/\b(curriculum|syllabus|topics?|modules?|cover|learn|teach|course content)\b/] },
    { name: "INTERNSHIP", patterns: [/\b(internship|intern|summer training)\b/] },
    { name: "PROJECT", patterns: [/\b(projects?|thesis|final year|dissertation|academic work)\b/] },
    { name: "RESEARCH_SERVICE", patterns: [/\b(research services?|research areas?|research support|consult|outsourc|data analysis|biostatistic|clinical trials?|pharma research)\b/] },
    { name: "LAB_FACILITY", patterns: [/\b(facilit|equipment|instrument|laboratory|lab|pcr|elisa|microscope|centrifuge|spectrophotometer|fermenter)\b/] },
    { name: "BIOINFORMATICS", patterns: [/\b(bioinformatics|sequence analysis|dna sequences?|gene data|genomics|proteomics|blast|fasta|gene prediction|phylogenetics)\b/] },
    { name: "CHEMINFORMATICS", patterns: [/\b(cheminformatics|chemiinformatics|chemical informatics)\b/] },
    { name: "CADD", patterns: [/\b(cadd|computer aided drug|molecular docking|virtual screening|ligand|pharmacophore|drug design|binding site|binding pocket|right compounds|find compounds|protein target|screen compounds)\b/] },
    { name: "IMMUNOINFORMATICS", patterns: [/\b(immunoinformatics|epitope|mhc binding)\b/] },
    { name: "SCIENTIFIC_WRITING", patterns: [/\b(scientific writing|thesis writing|journal|publication|grant|proposal|editing|manuscript)\b/] },
    { name: "PATENT", patterns: [/\b(patents?|patentability|landscape|product snapshot|freedom.to.operate|fto|ip clearance|wipo|pct)\b/] },
    { name: "IP_SERVICE", patterns: [/\b(intellectual property|ip services?|patent services?|filing|prosecution|opposition|non.infringing)\b/] },
    { name: "REGISTRATION", patterns: [/\b(registr\w*|enrol\w*|enroll\w*|apply|application form|sign up)\b/] },
    { name: "CAREER", patterns: [/\b(career|job|jobs|vacan|employment|recruit|placement)\b/] },
    { name: "PRODUCT", patterns: [/\b(products|produts|purealert(?:-c)?|water quality screening|water testing kit)\b/] },
    { name: "CONTACT", patterns: [/\b(contact|phone|telephone|call|whatsapp|email|e.mail|reach|number)\b/] },
    { name: "LOCATION", patterns: [/\b(where|location|located|address|directions|visit|map|hyderabad)\b/] },
    { name: "WORKING_HOURS", patterns: [/\b(hours|opening|open|close|working time|when are you open)\b/] },
    { name: "GENERAL_ORGANISATION", patterns: [/\b(ciencia|organisation|organization|company|founder|ceo|advisor|advisory)\b/] }
  ];

  var knowledge = [
    {
      id: "organisation",
      title: "About Ciencia Life Sciences",
      href: "aboutus.html",
      topic: "organisation",
      subtopic: "overview",
      sourceSection: "Executive overview; Organisation and approach",
      sourcePage: "aboutus.html",
      sourceStatus: "published",
      sourceDate: sourceDate,
      confidence: 0.96,
      entities: ["Ciencia Life Sciences", "Hyderabad"],
      intents: ["GENERAL_ORGANISATION"],
      keywords: ["organisation", "research training", "students", "researchers", "academics", "consulting", "outsourcing"],
      synonyms: ["company", "who is ciencia", "what does ciencia do", "life sciences organisation"],
      answer: "Ciencia Life Sciences describes itself as an integrated life-sciences research and training organisation in Hyderabad, supporting students, researchers, academics, and life-sciences organisations through practical training, academic projects, research services, and scientific support."
    },
    {
      id: "leadership",
      title: "Leadership and scientific advisors",
      href: "aboutus.html",
      topic: "organisation",
      subtopic: "leadership",
      sourceSection: "Leadership and Scientific Advisors",
      sourcePage: "aboutus.html",
      sourceStatus: "published",
      sourceDate: sourceDate,
      confidence: 0.94,
      entities: ["Dr. Sabitha Yadam", "Dr. Kaiser Jamil", "Dr. Vishnu Vardhan Reddy Martha", "Dr. A. Uma", "Dr. Rambabu Gundla", "Dr. N. K. Katari"],
      intents: ["GENERAL_ORGANISATION"],
      keywords: ["ceo", "research head", "founder", "scientific advisors", "advisory board", "advisor"],
      synonyms: ["leadership", "who runs ciencia", "science advisors"],
      answer: "The website identifies Dr. Sabitha Yadam as CEO and Research Head at Ciencia Labs LLP. Its listed scientific advisors include Dr. Kaiser Jamil, Dr. Vishnu Vardhan Reddy Martha, Dr. A. Uma, Dr. Rambabu Gundla, and Dr. N. K. Katari. These are the names shown in the website guide prepared 15 October 2026."
    },
    {
      id: "course-list",
      title: "Training programmes and course areas",
      href: "training.html",
      topic: "training",
      subtopic: "course catalogue",
      sourceSection: "Training programmes and curriculum detail",
      sourcePage: "training.html",
      sourceStatus: "mixed",
      sourceDate: sourceDate,
      confidence: 0.93,
      entities: ["Bioinformatics", "Cheminformatics", "Immunoinformatics", "CADD", "Molecular Biology", "Microbiology", "Genetic Engineering", "Biochemistry", "R Programming"],
      intents: ["COURSE_LIST", "COURSE_DETAILS"],
      keywords: ["courses", "training", "programmes", "classroom", "online", "certificate", "microbiology", "molecular biology", "genetic engineering", "biochemistry", "immunology", "analytical chemistry", "r programming", "genomics", "proteomics", "schedule", "batch dates", "availability"],
      synonyms: ["what can i study", "classes", "learn", "training options", "course offerings"],
      answer: "CIENCIA LIFE SCIENCES offers courses in Bioinformatics, Cheminformatics, Immunoinformatics, CADD/drug design, molecular biology, microbiology, genetic engineering, biochemistry, analytical chemistry, genomics/proteomics, and R programming, among other subjects. Some syllabus and duration details come from older course tabs; confirm current batches and availability with Ciencia."
    },
    {
      id: "course-bioinformatics",
      title: "Bioinformatics training",
      href: "bioinfo.html",
      topic: "training",
      subtopic: "Bioinformatics",
      sourceSection: "Bioinformatics and cheminformatics; training curriculum",
      sourcePage: "bioinfo.html",
      sourceStatus: "mixed",
      sourceDate: sourceDate,
      confidence: 0.96,
      entities: ["Bioinformatics", "BLAST", "FASTA", "Genomics", "Proteomics"],
      intents: ["COURSE_DETAILS", "COURSE_CURRICULUM", "BIOINFORMATICS"],
      keywords: ["bioinformatics", "biological databases", "sequence analysis", "genomics", "proteomics", "blast", "fasta", "gene prediction", "structure analysis", "phylogenetics", "molecular modelling"],
      synonyms: ["computational biology", "analyse dna sequences", "analyze dna sequences", "bioinformatics course"],
      answer: "Yes. Ciencia lists Bioinformatics training covering biological databases, sequence analysis, BLAST/FASTA, gene prediction, genomics and proteomics, protein structure analysis, phylogenetics, and molecular modelling. Practical syllabi also mention tools such as ClustalW, Primer3, MEGA, and PyMOL. Tool availability, batch dates, and the current syllabus should be confirmed."
    },
    {
      id: "course-cadd",
      title: "CADD, docking and virtual screening",
      href: "summar_certificate_syllabus.html",
      topic: "training",
      subtopic: "CADD and computer-aided drug design",
      sourceSection: "CADD certificate syllabus; Drug design topics",
      sourcePage: "summar_certificate_syllabus.html",
      sourceStatus: "published",
      sourceDate: sourceDate,
      confidence: 0.95,
      entities: ["CADD", "Molecular docking", "Virtual screening", "Ligand preparation", "Protein target"],
      intents: ["CADD", "COURSE_CURRICULUM", "CHEMINFORMATICS"],
      keywords: ["cadd", "computer aided drug design", "molecular docking", "virtual screening", "ligand preparation", "target preparation", "binding site analysis", "pharmacophore", "admet", "molecular modelling", "drug discovery"],
      synonyms: ["find compounds for a protein target", "find the right compounds", "match molecules to a target", "screen compounds", "how compounds fit a protein", "drug design software"],
      answer: "Ciencia lists CADD topics including ligand and target preparation, binding-site analysis, molecular docking, virtual-library screening, interaction analysis, pharmacophore generation, QSAR, and ADMET prediction. The listed syllabus includes both structure-based and ligand-based design. This supports training/research discussion, not a guarantee of compound discovery or experimental success."
    },
    {
      id: "course-eligibility",
      title: "Course eligibility",
      href: "training.html",
      topic: "training",
      subtopic: "eligibility",
      sourceSection: "Published eligibility and training features",
      sourcePage: "training.html",
      sourceStatus: "historical",
      sourceDate: sourceDate,
      confidence: 0.9,
      entities: ["B.Sc student", "M.Sc student", "Ph.D. scholar", "faculty", "scientist"],
      intents: ["COURSE_ELIGIBILITY"],
      keywords: ["eligibility", "bsc", "b.sc", "msc", "m.sc", "phd", "undergraduate", "postgraduate", "student", "faculty", "scientist", "background"],
      synonyms: ["who can join", "am i eligible", "can i apply", "qualifications"],
      answer: "Older course eligibility text includes relevant B.Sc./M.Sc. backgrounds in biological, medical, chemical, pharmaceutical, agricultural, and related sciences. A broader Bioinformatics section includes undergraduate, postgraduate, and Ph.D. students, faculty, scientists, and relevant R&D professionals. Eligibility varies by programme, so confirm the current requirements for the specific course."
    },
    {
      id: "course-mode",
      title: "Training formats",
      href: "training.html",
      topic: "training",
      subtopic: "delivery mode",
      sourceSection: "Training programmes and published training features",
      sourcePage: "training.html",
      sourceStatus: "published",
      sourceDate: sourceDate,
      confidence: 0.92,
      entities: ["online", "classroom", "weekend classes"],
      intents: ["COURSE_MODE"],
      keywords: ["online", "classroom", "weekend", "mode", "format", "remote", "in person"],
      synonyms: ["distance learning", "virtual classes", "face to face"],
      answer: "The website lists classroom and online training and mentions weekend classes. It does not establish that every course is available in every format; confirm the current delivery mode for the course and batch you want."
    },
    {
      id: "course-fees",
      title: "Historical course fees and durations",
      href: "training.html",
      topic: "training",
      subtopic: "historical fees and schedules",
      sourceSection: "Historical course figures, not current quotations",
      sourcePage: "training.html",
      sourceStatus: "historical",
      sourceDate: sourceDate,
      confidence: 0.91,
      entities: ["Bioinformatics", "Cheminformatics", "Immunoinformatics", "Docking", "Drug Design", "Virtual Screening"],
      intents: ["COURSE_FEE", "COURSE_DURATION"],
      keywords: ["historical", "fees", "price", "cost", "bioinformatics", "cheminformatics", "immunoinformatics", "docking", "drug design", "virtual screening", "duration", "days", "weeks", "months", "rupees"],
      synonyms: ["how much", "what does it cost", "is the fee current", "course price"],
      answer: "The guide reproduces older course-tab examples, not current quotations: Bioinformatics ₹30,000 (3 months); Cheminformatics ₹12,000 (1 month); Immunoinformatics ₹30,000 (3 months); Docking ₹5,000 (20 days); Drug Design ₹8,000 (20 days); and Virtual Screening ₹5,000 (2 weeks). These figures are historical listings and are not confirmed current fees or schedules. Ask Ciencia to confirm before making payment."
    },
    {
      id: "internship",
      title: "2027 summer internship notice",
      href: "index.html",
      topic: "internship",
      subtopic: "2027 announcement",
      sourceSection: "Homepage promotion; website notices",
      sourcePage: "index.html",
      sourceStatus: "current-announcement-incomplete",
      sourceDate: sourceDate,
      confidence: 0.97,
      entities: ["2027", "summer internship"],
      intents: ["INTERNSHIP"],
      keywords: ["internship", "summer", "2027", "dates", "start date", "batch", "fee", "schedule"],
      synonyms: ["summer intern programme", "internship this year", "2027 batch"],
      answer: "The homepage carries a “2027 SUMMER INTERNSHIP” promotion. The reviewed source does not state its 2027 start date, duration, fee, batch details, or confirmed schedule. Please contact Ciencia for current availability and registration details."
    },
    {
      id: "projects",
      title: "Academic and research projects",
      href: "project.html",
      topic: "projects",
      subtopic: "student and research project support",
      sourceSection: "Research projects and subject areas",
      sourcePage: "project.html",
      sourceStatus: "published",
      sourceDate: sourceDate,
      confidence: 0.95,
      entities: ["B.Sc student", "M.Sc student", "Ph.D. scholar", "Cancer biology", "Molecular docking"],
      intents: ["PROJECT", "RESEARCH_SERVICE"],
      keywords: ["project", "phd assistance", "academic", "student", "undergraduate", "postgraduate", "final year", "thesis", "cancer biology", "molecular docking", "project duration", "3 months", "6 months", "1 year"],
      synonyms: ["capstone", "dissertation", "help with my thesis", "project work", "final-year work"],
      answer: "Ciencia lists academic and research project support for undergraduate and postgraduate students and Ph.D. scholars, including practical methods, laboratory/computational work, biostatistics, thesis/report assistance, and progress guidance. The homepage mentions 3-month, 6-month, and 1-year project durations, but these are general listings, not guaranteed current openings or fixed timelines."
    },
    {
      id: "research-areas",
      title: "Research project subject areas",
      href: "project.html",
      topic: "research",
      subtopic: "research areas",
      sourceSection: "Research projects and subject areas",
      sourcePage: "project.html",
      sourceStatus: "published",
      sourceDate: sourceDate,
      confidence: 0.94,
      entities: ["Cancer biology", "Molecular docking", "Bioinformatics", "Immunoinformatics", "Nanotechnology"],
      intents: ["PROJECT", "RESEARCH_SERVICE"],
      keywords: ["research areas", "project subjects", "microbiology", "biochemistry", "biotechnology", "molecular biology", "bioinformatics", "virology", "clinical microbiology", "biomarkers", "cheminformatics", "molecular dynamics", "proteomics", "genomics", "molecular docking", "genetic engineering", "cancer biology", "oncology", "personalized medicine", "immunology", "immunoinformatics", "pharmacogenomics", "drug design", "virtual screening", "nanotechnology", "food microbiology", "agricultural microbiology"],
      synonyms: ["what do your researchers work on", "project topic areas", "areas of research"],
      answer: "The project page lists subject areas including microbiology, biochemistry, biotechnology, molecular biology, bioinformatics, virology, biomarkers, cheminformatics, molecular dynamics, proteomics/genomics, molecular docking, genetic engineering, cancer biology/oncology, personalized medicine, immunoinformatics, pharmacogenomics, drug design, virtual screening, nanotechnology, and food/agricultural microbiology. These are published topic areas, not confirmation of a current project opening."
    },
    {
      id: "research-services",
      title: "Research services",
      href: "Research.html",
      topic: "research",
      subtopic: "research support",
      sourceSection: "Research services and laboratory techniques",
      sourcePage: "Research.html",
      sourceStatus: "published",
      sourceDate: sourceDate,
      confidence: 0.94,
      entities: ["Cancer biology", "Molecular docking", "Biostatistics", "Clinical research"],
      intents: ["RESEARCH_SERVICE"],
      keywords: ["research support", "data analysis", "biostatistics", "experimental design", "clinical trials", "pharmaceutical research", "consulting", "outsourcing", "patent search", "database creation", "web mining", "phd project assistance"],
      synonyms: ["help with research", "research consultancy", "scientific assistance"],
      answer: "Research support listed by Ciencia includes Ph.D. and academic project assistance, bioinformatics and cheminformatics, data analysis, biostatistics and experimental-design discussion, publication support, database creation, web mining, clinical-trial/pharmaceutical research support, and consultancy. Discuss scope, deliverables, confidentiality, and availability directly with the team."
    },
    {
      id: "research-techniques",
      title: "Research techniques",
      href: "Research.html",
      topic: "research",
      subtopic: "laboratory and computational methods",
      sourceSection: "Techniques listed on the Research Services page",
      sourcePage: "Research.html",
      sourceStatus: "published",
      sourceDate: sourceDate,
      confidence: 0.93,
      entities: ["PCR", "HPLC", "Cell-line studies", "DNA isolation", "Molecular docking"],
      intents: ["RESEARCH_SERVICE", "LAB_FACILITY", "CADD"],
      keywords: ["pcr", "dna isolation", "protein isolation", "hplc", "cell line", "fermentation", "electrophoresis", "antimicrobial", "biochemical testing", "plant extraction", "cytotoxicity", "biomarker", "molecular docking"],
      synonyms: ["wet lab", "laboratory methods", "lab assays", "experimental techniques"],
      answer: "The Research Services page lists methods including PCR, DNA/protein isolation, biochemical testing, cell-line studies, fermentation, electrophoresis, HPLC, antimicrobial and cytotoxicity assays, plant extraction, and biomarker identification. A listed technique is not confirmation that a specific service or instrument is currently available for a new project; enquire about scope and capacity."
    },
    {
      id: "facilities",
      title: "Laboratory facilities and equipment",
      href: "Facilities.html",
      topic: "laboratory",
      subtopic: "equipment",
      sourceSection: "Laboratory facilities and equipment",
      sourcePage: "Facilities.html",
      sourceStatus: "published",
      sourceDate: sourceDate,
      confidence: 0.94,
      entities: ["PCR", "ELISA reader", "SDS-PAGE", "Spectrophotometer", "Fermenter", "Centrifuge"],
      intents: ["LAB_FACILITY"],
      keywords: ["equipment", "instruments", "pcr", "elisa reader", "electrophoresis", "spectrophotometer", "fermenter", "centrifuge", "biosafety cabinet", "laminar flow", "incubator", "microscope", "autoclave", "freezer", "bioinformatics software"],
      synonyms: ["what machines", "lab equipment", "facility list", "do you have pcr"],
      answer: "The facilities page lists conventional PCR, an ELISA reader, electrophoresis/SDS-PAGE equipment, a spectrophotometer, a fermenter, centrifuges, biosafety and laminar-flow cabinets, incubators, an inverted microscope, an autoclave, freezers, and bioinformatics resources. Confirm current access and availability for a specific experiment."
    },
    {
      id: "patent-services",
      title: "Patent and intellectual-property services",
      href: "patent.html",
      topic: "intellectual property",
      subtopic: "API Pharma reports and filing",
      sourceSection: "API Pharma Intellectual-Property Services",
      sourcePage: "patent.html",
      sourceStatus: "published",
      sourceDate: sourceDate,
      confidence: 0.95,
      entities: ["Patent landscape report", "Product snapshot", "FTO", "Patentability report", "WIPO PCT"],
      intents: ["PATENT", "IP_SERVICE"],
      keywords: ["patent", "ip", "intellectual property", "patent landscape report", "product snapshot", "ip clearance", "freedom to operate", "fto", "patentability", "invalidity", "opposition", "drafting", "indian filing", "wipo pct", "prosecution", "maintenance"],
      synonyms: ["patent help", "patent search", "protect an invention", "patent approval"],
      answer: "Ciencia's API Pharma IP page lists product snapshots; patent landscape, IP clearance, freedom-to-operate, patentability, and invalidity/opposition reports; non-infringing-option identification; patent drafting; Indian and WIPO PCT filing; prosecution; oppositions; and maintenance. A listed service is not a guarantee of patent approval or a legal outcome. Confirm jurisdiction, scope, fees, and deliverables with the team."
    },
    {
      id: "patent-timings",
      title: "Patent service turnaround discrepancies",
      href: "patent.html",
      topic: "intellectual property",
      subtopic: "published processing durations",
      sourceSection: "How selected reports are described; indicative duration table",
      sourcePage: "patent.html",
      sourceStatus: "conflicting",
      sourceDate: sourceDate,
      confidence: 0.98,
      entities: ["Patent landscape report", "Product snapshot"],
      intents: ["PATENT", "IP_SERVICE"],
      keywords: ["patent landscape", "duration", "how long", "turnaround", "timeline", "product snapshot", "5 days", "15 days", "20 days", "25 days", "30 days"],
      synonyms: ["how long does a patent report take", "report turnaround", "landscape timeline"],
      answer: "The published patent page gives conflicting indicative timings: a landscape report is listed as 20–30 days in its table but the prose says a minimum of about 20–25 days. Product snapshots appear as both 5 and 15 days. The source does not explain which is current, and these are not guaranteed legal-office timelines; please confirm the current estimate with Ciencia."
    },
    {
      id: "scientific-writing",
      title: "Scientific writing and documentation",
      href: "ScientificWritings.html",
      topic: "research",
      subtopic: "scientific writing",
      sourceSection: "Scientific Writing and Documentation",
      sourcePage: "ScientificWritings.html",
      sourceStatus: "published",
      sourceDate: sourceDate,
      confidence: 0.93,
      entities: ["Journal publication", "DST", "DBT", "Thesis"],
      intents: ["SCIENTIFIC_WRITING", "RESEARCH_SERVICE"],
      keywords: ["scientific writing", "journal publication", "grant proposal", "funding", "dst", "dbt", "thesis assistance", "research documentation", "editing", "manuscript", "statistics"],
      synonyms: ["help write a paper", "publication support", "research paper editing"],
      answer: "Ciencia lists journal-publication writing assistance, government funding and grant proposals (including DST and DBT), thesis assistance, research documentation, and support that may include data analysis, statistics, and bioinformatics. Agree scope, authorship, data responsibility, journal requirements, deadlines, and deliverables with the service team."
    },
    {
      id: "registration",
      title: "CLS Internship and Project Registration Form",
      href: "https://docs.google.com/forms/d/e/1FAIpQLScd2OQSTwebJW9BtFuSX1WdUNum8A2XzXa97V6GNqbvfL8elg/viewform?usp=header",
      target: "_blank",
      rel: "noopener noreferrer",
      topic: "registration",
      subtopic: "enquiry and registration",
      sourceSection: "Registration and enquiry process; website notices",
      sourcePage: "https://docs.google.com/forms/d/e/1FAIpQLScd2OQSTwebJW9BtFuSX1WdUNum8A2XzXa97V6GNqbvfL8elg/viewform?usp=header",
      sourceStatus: "published",
      sourceDate: sourceDate,
      confidence: 0.94,
      entities: ["20% registration payment", "registration form"],
      intents: ["REGISTRATION", "COURSE_FEE"],
      keywords: ["register", "registration", "enquiry form", "application", "payment", "20 percent", "receipt", "identity card", "how to sign up", "how do i register"],
      synonyms: ["sign up", "enrol", "enroll", "apply for a course"],
      answer: "Use the CLS Internship and Project Registration Form to submit your registration or project enquiry. Confirm current fees, payment instructions, and requirements directly with Ciencia before making a payment."
    },
    {
      id: "careers",
      title: "Careers and placement",
      href: "carrer.html",
      topic: "careers",
      subtopic: "vacancies and placement",
      sourceSection: "Careers; published eligibility and training features",
      sourcePage: "carrer.html",
      sourceStatus: "current-status-not-listed",
      sourceDate: sourceDate,
      confidence: 0.94,
      entities: ["Master's degree in life sciences", "placement assistance"],
      intents: ["CAREER"],
      keywords: ["job", "career", "vacancy", "vacancies", "employment", "resume", "cv", "placement", "placement assistance", "guarantee"],
      synonyms: ["are you hiring", "open positions", "job openings", "will you place me"],
      answer: "The careers page invites speculative applications from candidates with relevant qualifications and experience, including a master's degree in life sciences; it does not list specific current vacancies. The training material mentions placement assistance for worthy candidates, but does not state a guarantee or terms. Contact Ciencia to confirm current opportunities and support."
    },
    {
      id: "purealert-product",
      title: "PureAlert-C water-quality screening",
      href: "products.html",
      topic: "products",
      subtopic: "PureAlert-C",
      sourceSection: "PureAlert-C product overview; product format; responsible scientific claims",
      sourcePage: "products.html",
      sourceStatus: "published",
      sourceDate: sourceDate,
      confidence: 0.94,
      entities: ["PureAlert-C", "PureAlert", "water-quality screening"],
      intents: ["PRODUCT"],
      keywords: ["product", "products", "PureAlert", "PureAlert-C", "water quality", "water testing", "screening kit", "coliform", "microbiological screening", "colour change", "reagent", "3 mL", "bottle", "ordering", "order", "price", "cost", "fee", "incubation", "IIT Kharagpur", "laboratory evaluation", "sterile-water controls", "bacteria-spiked samples"],
      synonyms: ["water test kit", "water quality kit", "water screening product", "water contamination test", "simple water test", "pure alert", "pure alert c", "water quality device"],
      answer: "Ciencia Labs LLP offers PureAlert-C, a simple preliminary water-quality screening device intended to support visual screening for potential coliform contamination. PureAlert is supplied in a sealed plastic bottle containing approximately 3 mL of coloured liquid reagent, with product packaging and instructions for use. Interpret any visible response according to the final validated product instructions. It is not a definitive or universal drinking-water safety test and does not replace comprehensive water testing. For product and ordering information, WhatsApp 9492146241. The website does not list a price."
    },
    {
      id: "purealert-evaluation",
      title: "PureAlert reported laboratory evaluation",
      href: "products.html",
      topic: "products",
      subtopic: "PureAlert-C evaluation",
      sourceSection: "Laboratory Performance Evaluation; Independent Laboratory Evaluation",
      sourcePage: "products.html",
      sourceStatus: "reported-evaluation",
      sourceDate: sourceDate,
      confidence: 0.92,
      entities: ["PureAlert", "IIT Kharagpur", "100 devices"],
      intents: ["PRODUCT"],
      keywords: ["evaluation", "validated", "validation", "laboratory", "IIT", "Kharagpur", "100 devices", "60 water samples", "20 controls", "20 bacteria-spiked", "concordance", "sterile water", "different sources"],
      synonyms: ["PureAlert validation", "product test results", "laboratory results", "independent evaluation", "where evaluated"],
      answer: "The PureAlert product page reports a laboratory performance evaluation at the School of Medical Science and Technology, IIT Kharagpur, involving 100 devices: 60 water samples from different sources, 20 sterile-water controls, and 20 bacteria-spiked water samples. It reports 100% concordance in each group under the stated testing conditions. These are reported evaluation results, not a claim of 100% accuracy, sensitivity, specificity, guaranteed detection, or universal validation. The page states that further coliform-specific validation is required to establish analytical performance."
    },
    {
      id: "purealert-limitations",
      title: "PureAlert-C capabilities and limitations",
      href: "products.html",
      topic: "products",
      subtopic: "screening scope and limitations",
      sourceSection: "Why coliform screening matters; What PureAlert-C does not test; Frequently asked questions",
      sourcePage: "products.html",
      sourceStatus: "published",
      sourceDate: sourceDate,
      confidence: 0.93,
      entities: ["PureAlert-C", "coliform", "chemical contaminants", "heavy metals"],
      intents: ["PRODUCT"],
      keywords: ["does not test", "limits", "safe to drink", "negative result", "chemicals", "chemical contaminants", "heavy metals", "microorganisms", "contamination", "colour change", "how long", "test time", "incubation time", "incubation", "confirmation", "coliform-specific validation"],
      synonyms: ["is water safe", "is a negative result safe", "what does it detect", "what does it screen for", "test duration", "how long does the test take", "colour response meaning"],
      answer: "PureAlert-C is intended for preliminary microbiological screening, particularly visual screening for potential coliform contamination. It does not test for chemical contaminants, heavy metals, or every type of microorganism. A negative result does not prove water is safe to drink, and coliform detection does not automatically prove faecal contamination. The test interval and interpretation should follow the final validated product instructions; the website does not specify a validated test time or result-colour criteria. Further coliform-specific validation is required, and appropriate laboratory testing should be used for confirmation when needed."
    },
    {
      id: "contact-location",
      title: "Contact, location and working hours",
      href: "contact.html",
      topic: "contact",
      subtopic: "address, phone, email and hours",
      sourceSection: "Contact, Location, Hours and Online Channels",
      sourcePage: "contact.html",
      sourceStatus: "published",
      sourceDate: sourceDate,
      confidence: 0.97,
      entities: ["Hyderabad", "Sardarpatel Nagar", "Kukatpally", "+91 8247307129", "+91 9966239797", "ciencialifesciences@gmail.com"],
      intents: ["CONTACT", "LOCATION", "WORKING_HOURS"],
      keywords: ["address", "location", "where", "located", "office", "phone", "telephone", "whatsapp", "email", "hours", "monday", "saturday", "sunday", "hyderabad", "open", "closed"],
      synonyms: ["how to reach you", "contact details", "how can i call", "directions", "when open"],
      answer: "Ciencia lists its address as Sardarpatel Nagar, Nizampet X Roads, Kukatpally, Hyderabad, India 500085. Phone/WhatsApp: +91 8247307129 or +91 9966239797. General email: ciencialifesciences@gmail.com. Published hours are Monday–Saturday, 9:30 am–5:00 pm; Sunday closed. Confirm an appointment before visiting."
    },
    {
      id: "contact-email-discrepancy",
      title: "Contact email spelling discrepancy",
      href: "contact.html",
      topic: "contact",
      subtopic: "email",
      sourceSection: "Website notices; Careers; Contact details",
      sourcePage: "contact.html",
      sourceStatus: "conflicting",
      sourceDate: sourceDate,
      confidence: 0.97,
      entities: ["ciencialifesciences@gmail.com", "ciencialifescience@gmail.com"],
      intents: ["CONTACT", "CAREER"],
      keywords: ["email", "career email", "careers", "contact email", "different email"],
      synonyms: ["email address discrepancy", "which email should i use"],
      answer: "The general contact address is listed as ciencialifesciences@gmail.com. The careers page instead shows ciencialifescience@gmail.com (singular “lifescience”). The guide flags this discrepancy; use the general address for general enquiries and confirm the careers address if a message is returned."
    }
  ];
  var indexedPageKnowledge = [];

  var aliasGroups = [
    ["Bioinformatics", "bio informatics", "computational biology", "sequence analysis"],
    ["Cheminformatics", "chemiinformatics", "chemical informatics"],
    ["Immunoinformatics", "immune informatics", "epitope analysis"],
    ["CADD", "computer aided drug design", "computer-assisted drug design"],
    ["molecular docking", "find the right compounds for a protein target", "find compounds for a protein", "match compounds to a target", "screen compounds", "how molecules bind a protein", "binding pose"],
    ["virtual screening", "screen a compound library", "prioritise molecules", "compound screening"],
    ["course fee", "price", "cost", "how much", "tuition"],
    ["eligibility", "who can join", "can i apply", "qualifications"],
    ["course curriculum", "syllabus", "what will i learn", "topics covered"],
    ["internship", "summer intern", "intern"],
    ["project assistance", "thesis help", "final year project", "dissertation support"],
    ["laboratory facilities", "lab equipment", "instruments"],
    ["patent landscape report", "patent mapping", "freedom to operate", "fto"],
    ["registration", "regster", "register", "sign up", "enrol", "enroll"],
    ["hours", "hors", "working hours", "opening hours", "when are you open"],
    ["location", "where are you", "address", "directions"],
    ["research services", "research support", "consultancy"],
    ["PureAlert-C", "PureAlert", "Pure Alert", "water quality screening", "water testing kit", "water test kit"]
  ];

  var courseFees = {
    bioinformatics: "The guide records an older Bioinformatics listing of 3 months / ₹30,000.",
    cheminformatics: "The guide records an older Cheminformatics listing of 1 month / ₹12,000.",
    immunoinformatics: "The guide records an older Immunoinformatics listing of 3 months / ₹30,000.",
    docking: "The guide records an older Docking listing of 20 days / ₹5,000.",
    "drug design": "The guide records an older Drug Design listing of 20 days / ₹8,000.",
    "virtual screening": "The guide records an older Virtual Screening listing of 2 weeks / ₹5,000."
  };
  var courseDurations = {
    bioinformatics: "The guide records an older Bioinformatics listing of 3 months.",
    cheminformatics: "The guide records an older Cheminformatics listing of 1 month.",
    immunoinformatics: "The guide records an older Immunoinformatics listing of 3 months.",
    docking: "The guide records an older Docking listing of 20 days.",
    "drug design": "The guide records an older Drug Design listing of 20 days.",
    "virtual screening": "The guide records an older Virtual Screening listing of 2 weeks."
  };

  var stopWords = new Set(["a", "an", "and", "are", "as", "at", "be", "can", "ciencia", "do", "does", "for", "from", "how", "i", "in", "is", "it", "me", "my", "of", "on", "or", "the", "to", "we", "what", "when", "where", "which", "who", "with", "you", "your"]);
  var entityTerms = [
    { type: "course", terms: ["bioinformatics", "cheminformatics", "immunoinformatics", "CADD", "molecular biology", "microbiology", "genetic engineering", "biochemistry", "R programming", "analytical chemistry", "docking", "drug design", "virtual screening"] },
    { type: "subject", terms: ["molecular docking", "sequence analysis", "molecular biology", "PCR", "BLAST", "FASTA", "pharmacophore", "virtual screening"] },
    { type: "service", terms: ["patent landscape report", "product snapshot", "FTO report", "scientific writing", "data analysis", "biostatistics", "project assistance", "research support"] },
    { type: "userType", terms: ["B.Sc student", "BSc student", "M.Sc student", "MSc student", "Ph.D. scholar", "PhD scholar", "faculty", "scientist", "R&D professional"] },
    { type: "researchArea", terms: ["cancer biology", "oncology", "pharmacogenomics", "immunology", "virology", "proteomics", "genomics"] },
    { type: "location", terms: ["Hyderabad", "Kukatpally", "Sardarpatel Nagar"] }
  ];

  function normalize(text) {
    return String(text || "").toLowerCase().replace(/[\u2010-\u2015]/g, "-")
      .replace(/[^a-z0-9₹.+-]+/g, " ").replace(/\s+/g, " ").trim();
  }

  function words(text) {
    return normalize(text).split(" ").filter(function (word) {
      return word.length > 1 && !stopWords.has(word);
    });
  }

  function editDistance(left, right) {
    var row = [];
    for (var column = 0; column <= right.length; column += 1) row[column] = column;
    for (var i = 1; i <= left.length; i += 1) {
      var previous = row[0];
      row[0] = i;
      for (var j = 1; j <= right.length; j += 1) {
        var current = row[j];
        row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (left[i - 1] === right[j - 1] ? 0 : 1));
        previous = current;
      }
    }
    return row[right.length];
  }

  function hasFuzzyToken(text, token) {
    if (token.length < 4) return false;
    var maxDistance = 1;
    return words(text).some(function (candidate) {
      return candidate.length >= 4 && Math.abs(candidate.length - token.length) <= maxDistance && editDistance(candidate, token) <= maxDistance;
    });
  }

  function detectIntents(question) {
    var text = normalize(question);
    var intentText = text + " " + expandQuery(question).join(" ");
    var detected = intents.filter(function (intent) {
      return intent.patterns.some(function (pattern) { return pattern.test(intentText); });
    }).map(function (intent) { return intent.name; });
    if (detected.indexOf("COURSE_LIST") !== -1 && !/\b(ceo|founder|advisor|advisory|organisation|organization|company|about)\b/.test(text)) {
      detected = detected.filter(function (intent) { return intent !== "GENERAL_ORGANISATION"; });
    }
    var explicitCourseList = /\b(list|what courses|courses do you|offer courses|available courses|programmes?|programs?|classes|what training|training options|what can i study)\b/.test(text);
    if (!explicitCourseList && (detected.indexOf("COURSE_ELIGIBILITY") !== -1 || detected.indexOf("REGISTRATION") !== -1)) {
      detected = detected.filter(function (intent) { return intent !== "COURSE_LIST"; });
    }
    var specificIntents = ["INTERNSHIP", "PATENT", "IP_SERVICE", "PRODUCT", "BIOINFORMATICS", "CHEMINFORMATICS", "CADD", "IMMUNOINFORMATICS", "PROJECT", "RESEARCH_SERVICE", "LAB_FACILITY", "SCIENTIFIC_WRITING", "COURSE_ELIGIBILITY", "REGISTRATION", "CONTACT", "LOCATION", "WORKING_HOURS", "CAREER", "GENERAL_ORGANISATION"];
    var firstSpecific = specificIntents.filter(function (intent) { return detected.indexOf(intent) !== -1; })[0];
    var explicitCurriculum = /\b(curriculum|syllabus|topics?|modules?|course content)\b/.test(text);
    if (detected.indexOf("COURSE_LIST") !== -1 && !explicitCurriculum) {
      detected = detected.filter(function (intent) { return intent !== "COURSE_CURRICULUM"; });
    }
    if (firstSpecific) {
      detected = detected.filter(function (intent) {
        return intent !== "COURSE_CURRICULUM" || explicitCurriculum;
      });
      detected.sort(function (left, right) {
        if (left === firstSpecific) return -1;
        if (right === firstSpecific) return 1;
        return 0;
      });
    }
    return detected;
  }

  function extractEntities(question) {
    var text = normalize(question);
    var entities = {};
    entityTerms.forEach(function (group) {
      var matched = group.terms.filter(function (term) {
        return text.indexOf(normalize(term)) !== -1 || hasFuzzyToken(text, words(term)[0] || "");
      }).map(function (term) {
        var canonical = { "BSc student": "B.Sc student", "MSc student": "M.Sc student", "PhD scholar": "Ph.D. scholar" };
        return canonical[term] || term;
      });
      if (matched.length) entities[group.type] = matched;
    });
    var year = text.match(/\b20\d{2}\b/);
    if (year) entities.time = [year[0]];
    var duration = text.match(/\b\d+\s*(?:days?|weeks?|months?|years?)\b/);
    if (duration) entities.duration = [duration[0]];
    var currency = text.match(/(?:₹|rs\.?\s*)\s*\d[\d,]*/);
    if (currency) entities.amount = [currency[0]];
    return entities;
  }

  function expandQuery(question) {
    var normalized = normalize(question);
    var expanded = words(question);
    aliasGroups.forEach(function (group) {
      if (group.some(function (phrase) { return normalized.indexOf(normalize(phrase)) !== -1; })) {
        expanded = expanded.concat(words(group[0]));
      } else if (group.some(function (phrase) {
        return words(phrase).length === 1 && hasFuzzyToken(normalized, words(phrase)[0]);
      })) {
        expanded = expanded.concat(words(group[0]));
      }
    });
    return Array.from(new Set(expanded));
  }

  function resolveContext(question, context) {
    var normalized = normalize(question);
    var queryWords = words(question);
    var explicitEntities = extractEntities(question);
    var hasTopic = Object.keys(explicitEntities).some(function (key) { return key !== "time" && key !== "amount" && key !== "duration"; });
    var detectedIntents = detectIntents(question);
    var followUpIntents = ["COURSE_DURATION", "COURSE_FEE", "COURSE_ELIGIBILITY", "COURSE_MODE", "COURSE_CURRICULUM"];
    var hasNewIntent = detectedIntents.some(function (intent) { return followUpIntents.indexOf(intent) === -1; });
    var referential = /\b(it|that|this|they|them|there|those|these|one|same|more|also)\b/.test(normalized);
    var shortFollowUp = context && context.lastTopic && queryWords.length <= 5 && !hasTopic;
    if (!context || !context.lastTopic || hasTopic || hasNewIntent || (!referential && !shortFollowUp)) return question;
    return question + " " + context.lastTopic;
  }

  function scoreItem(item, queryTokens, detectedIntents, entities, question) {
    var primary = words([item.title, item.topic, item.subtopic].join(" "));
    var searchable = words(item.keywords.join(" ") + " " + item.synonyms.join(" "));
    var answerWords = words(item.answer);
    var score = 0;
    var used = new Set();
    queryTokens.forEach(function (token) {
      if (used.has(token)) return;
      used.add(token);
      if (searchable.indexOf(token) !== -1) score += 3;
      else if (primary.indexOf(token) !== -1) score += 2.2;
      else if (answerWords.indexOf(token) !== -1) score += 0.75;
      else if (hasFuzzyToken(searchable.join(" "), token)) score += 1.8;
    });
    detectedIntents.forEach(function (intent) {
      if (item.intents.indexOf(intent) !== -1) score += 3.4;
    });
    var extractedValues = Object.keys(entities).reduce(function (all, key) {
      return all.concat(entities[key].map(normalize));
    }, []);
    extractedValues.forEach(function (value) {
      if (item.entities.some(function (entity) { return normalize(entity) === value || normalize(entity).indexOf(value) !== -1 || value.indexOf(normalize(entity)) !== -1; })) score += 2.8;
    });
    if (normalize(question).indexOf(normalize(item.title)) !== -1) score += 2;
    return score;
  }

  function setPageKnowledge(pages) {
    indexedPageKnowledge = [];
    (Array.isArray(pages) ? pages : []).forEach(function (page) {
      if (!page || typeof page.href !== "string" || !Array.isArray(page.sections)) return;
      page.sections.forEach(function (section, index) {
        if (!section || typeof section.text !== "string") return;
        var text = section.text.replace(/\s+/g, " ").trim();
        var heading = typeof section.heading === "string" ? section.heading.trim() : "";
        if (text.length < 24) return;
        var pageTitle = typeof page.title === "string" ? page.title.trim() : "";
        var title = [pageTitle, heading].filter(Boolean).join(" — ") || page.href;
        var productPage = /\bproducts?\b|purealert|water quality screening/i.test(page.href + " " + pageTitle);
        var coursePage = /\b(courses?|training|programmes?|programs?)\b/i.test(title);
        indexedPageKnowledge.push({
          id: "page-" + page.href.replace(/[^a-z0-9]+/gi, "-") + "-" + index,
          title: title,
          href: page.href,
          topic: pageTitle,
          subtopic: heading,
          sourceSection: heading || pageTitle || "Page content",
          sourcePage: page.href,
          sourceStatus: "published",
          sourceDate: sourceDate,
          confidence: 0.88,
          entities: [],
          intents: productPage ? ["PRODUCT"] : coursePage ? ["COURSE_DETAILS", "COURSE_LIST"] : [],
          keywords: words(title + " " + text),
          synonyms: words(heading),
          answer: text
        });
      });
    });
  }

  function retrieve(question, context) {
    var resolvedQuestion = resolveContext(question, context);
    var detectedIntents = detectIntents(resolvedQuestion);
    var entities = extractEntities(resolvedQuestion);
    var queryTokens = expandQuery(resolvedQuestion);
    if (!queryTokens.length && !detectedIntents.length) return [];
    var results = knowledge.concat(indexedPageKnowledge).map(function (item) {
      return { item: item, score: scoreItem(item, queryTokens, detectedIntents, entities, resolvedQuestion) };
    }).filter(function (result) { return result.score >= 2.5; })
      .sort(function (left, right) { return right.score - left.score; });
    if (!results.length) return [];
    var bestScore = results[0].score;
    var selected = [results[0].item];
    if (detectedIntents.length > 1) {
      detectedIntents.forEach(function (intent) {
        var match = results.filter(function (result) {
          return result.item.intents.indexOf(intent) !== -1 && result.score >= Math.max(4.5, bestScore * 0.45);
        })[0];
        if (match && selected.indexOf(match.item) === -1) selected.push(match.item);
      });
    }

    if (detectedIntents.indexOf("COURSE_FEE") !== -1) {
      var requestedCourse = Object.keys(courseFees).filter(function (course) {
        return normalize(resolvedQuestion).indexOf(course) !== -1;
      })[0];
      if (requestedCourse && selected.indexOf(knowledge.find(function (item) { return item.id === "course-fees"; })) === -1) {
        selected.unshift(knowledge.find(function (item) { return item.id === "course-fees"; }));
      }
    }
    if (detectedIntents.indexOf("PRODUCT") !== -1) {
      var productMatch = results.filter(function (result) {
        return result.item.intents.indexOf("PRODUCT") !== -1;
      })[0];
      if (productMatch) selected = [productMatch.item];
    } else if (detectedIntents.indexOf("PATENT") !== -1 && /\b(how long|duration|timeline|turnaround|days?)\b/.test(normalize(resolvedQuestion))) {
      selected = [knowledge.find(function (item) { return item.id === "patent-timings"; })].concat(selected.filter(function (item) { return item.id !== "patent-timings"; }));
    } else if (detectedIntents.indexOf("PATENT") !== -1 && detectedIntents.indexOf("IP_SERVICE") === -1) {
      selected = [knowledge.find(function (item) { return item.id === "patent-services"; })];
    }
    if (/\bgeneral email\b/.test(normalize(resolvedQuestion))) {
      selected = [knowledge.find(function (item) { return item.id === "contact-location"; })];
    }
    return selected.slice(0, 3);
  }

  function courseSpecificAnswer(question, item, courseData, label) {
    var normalized = normalize(question);
    var course = Object.keys(courseData).filter(function (name) {
      return normalized.indexOf(name) !== -1;
    })[0];
    if (!course || !item) return null;
    return courseData[course] + " This is an older website listing, not a confirmed current " + label + ". Please confirm with Ciencia.";
  }

  function courseFeeAnswer(question, item) {
    if (!item || item.id !== "course-fees") return null;
    return courseSpecificAnswer(question, item, courseFees, "fee or duration");
  }

  function courseDurationAnswer(question, item) {
    if (!item || item.id !== "course-fees") return null;
    return courseSpecificAnswer(question, item, courseDurations, "duration or schedule");
  }

  function clarification(question, detectedIntents, entities, context) {
    var text = normalize(question);
    var hasCourse = Boolean(entities.course && entities.course.length);
    var hasSpecificTopic = ["course", "subject", "service", "researchArea"].some(function (key) {
      return Boolean(entities[key] && entities[key].length);
    });
    var vaguePhrase = /^(how much|how long|what fee|which one|which course|what about|and the|is it|do you have it|when does it start|when is (?:the )?batch|what is included|what about eligibility|which is better|what do i need|where is it|can i take it online|tell me about that|that course|how do i apply for it|can i join this)(\s|$)/.test(text);
    var unresolvedReference = (/\bit\b/.test(text) || /^(that|those|one)\b/.test(text)) && !hasSpecificTopic && (!detectedIntents.length || detectedIntents.indexOf("REGISTRATION") !== -1);
    var expandedWords = expandQuery(text);
    var hasKnownConcept = expandedWords.some(function (word) {
      return knowledge.some(function (item) {
        return words(item.keywords.join(" ") + " " + item.title).indexOf(word) !== -1;
      });
    });
    var genericShortAsk = words(text).length <= 2 && !detectedIntents.length && !hasKnownConcept;
    var specificIntent = detectedIntents.some(function (intent) {
      return ["PATENT", "IP_SERVICE", "PRODUCT", "REGISTRATION", "INTERNSHIP"].indexOf(intent) !== -1;
    });
    if (!context && ((vaguePhrase && !hasSpecificTopic && !specificIntent) || unresolvedReference || genericShortAsk)) {
      return "Which course, service, or programme do you mean? I can help with its curriculum, eligibility, duration, fees, or format.";
    }
    if (detectedIntents.indexOf("COURSE_FEE") !== -1 && !hasCourse && detectedIntents.indexOf("REGISTRATION") === -1 && detectedIntents.indexOf("PATENT") === -1 && detectedIntents.indexOf("PRODUCT") === -1 && !/\b(current|historical|all|list|course fees)\b/.test(text) && !context) {
      return "Which course's fee would you like to check? The guide only contains older listed fees, not confirmed current prices.";
    }
    var latestScheduleQuestion = detectedIntents.indexOf("COURSE_LIST") !== -1 && /\b(latest|current)\b/.test(text);
    if (detectedIntents.indexOf("COURSE_DURATION") !== -1 && !hasCourse && !detectedIntents.includes("PATENT") && !detectedIntents.includes("PRODUCT") && !latestScheduleQuestion && !context) {
      return "Which course or service duration do you mean? The published durations vary, and some are older listings.";
    }
    return null;
  }

  function isCourseChoiceQuestion(text) {
    return /\b(which|what)\s+course\b.*\b(best|right|suitable|good|should i choose)\b|\bbest course\b/.test(normalize(text));
  }

  function answerUnsupported() {
    return "I couldn't find reliable information about that in the published Ciencia pages and guide. I don't want to guess. For confirmation, contact +91 8247307129 or ciencialifesciences@gmail.com.";
  }

  function respond(question, context) {
    var resolvedQuestion = resolveContext(question, context);
    var detectedIntents = detectIntents(resolvedQuestion);
    var entities = extractEntities(resolvedQuestion);
    var results = retrieve(question, context);
    if (/\b(weather|share price|stock price|prescribe|symptoms|private phone number)\b/i.test(question)) {
      return { intent: detectedIntents[0] || "OTHER", intents: detectedIntents, entities: entities, items: [], answer: answerUnsupported(), confidence: 0, needsClarification: false, context: context || null };
    }

    if (!words(question).length) {
      return { intent: "OTHER", intents: [], entities: entities, items: [], answer: "Please enter a question about Ciencia's courses, projects, services, facilities, or contact information.", confidence: 0, needsClarification: true, context: context || null };
    }

    if (isCourseChoiceQuestion(question)) {
      return { intent: "COURSE_DETAILS", intents: ["COURSE_DETAILS"], entities: entities, items: [], answer: "There isn't enough information to recommend one course reliably. Tell me your academic background, interests, and goal, and I can point you to the relevant published course information.", confidence: 0.65, needsClarification: true, context: context || null };
    }

    var clarificationText = clarification(question, detectedIntents, entities, context);
    if (clarificationText) {
      return { intent: detectedIntents[0] || "OTHER", intents: detectedIntents, entities: entities, items: [], answer: clarificationText, confidence: 0.6, needsClarification: true, context: context || null };
    }

    var feeItem = results.filter(function (item) { return item.id === "course-fees"; })[0];
    if (feeItem) {
      var specificFee = courseFeeAnswer(resolvedQuestion, feeItem);
      var specificDuration = courseDurationAnswer(resolvedQuestion, feeItem);
      if (detectedIntents.indexOf("COURSE_FEE") !== -1 && specificFee) {
        return responseFromItems(question, resolvedQuestion, detectedIntents, entities, [feeItem], specificFee);
      }
      if (detectedIntents.indexOf("COURSE_DURATION") !== -1 && specificDuration) {
        return responseFromItems(question, resolvedQuestion, detectedIntents, entities, [feeItem], specificDuration);
      }
    }

    if (results.length) {
      var answer = results.map(function (item) { return item.answer; }).join("\n\n");
      return responseFromItems(question, resolvedQuestion, detectedIntents, entities, results, answer);
    }

    var topicOnly = Object.keys(entities).some(function (key) { return key === "course" || key === "subject" || key === "service"; });
    if (topicOnly && detectedIntents.length === 0) {
      return { intent: "COURSE_DETAILS", intents: ["COURSE_DETAILS"], entities: entities, items: [], answer: "What would you like to know about that topic—its curriculum, eligibility, duration, fees, or available format?", confidence: 0.42, needsClarification: true, context: context || null };
    }
    return { intent: detectedIntents[0] || "OTHER", intents: detectedIntents, entities: entities, items: [], answer: answerUnsupported(), confidence: 0, needsClarification: false, context: context || null };
  }

  function responseFromItems(question, resolvedQuestion, detectedIntents, entities, results, answer) {
    var primaryItem = results[0];
    var entityTopic = entities.course || entities.subject || entities.service;
    var topic = entityTopic && entityTopic.length ? entityTopic[0] : primaryItem.subtopic || primaryItem.topic;
    var nextContext = {
      lastTopic: topic,
      lastIntent: detectedIntents[0] || primaryItem.intents[0] || "OTHER",
      lastEntities: entities
    };
    return {
      intent: detectedIntents[0] || primaryItem.intents[0] || "OTHER",
      intents: detectedIntents.length ? detectedIntents : primaryItem.intents.slice(0, 1),
      entities: entities,
      items: results,
      answer: answer,
      confidence: primaryItem.confidence,
      needsClarification: false,
      context: nextContext
    };
  }

  return {
    intents: intents.map(function (intent) { return intent.name; }).concat(["OTHER"]),
    knowledge: knowledge,
    setPageKnowledge: setPageKnowledge,
    detectIntents: detectIntents,
    extractEntities: extractEntities,
    retrieve: retrieve,
    respond: respond
  };
});
