// Localization system for JACKBEAR.ai Academy
// Supports English (primary) and Spanish (secondary)

export type Language = "en" | "es";

export interface Translations {
  // Header & Navigation
  home: string;
  courses: string;
  icpedia: string;
  glossary: string;
  features: string;
  faq: string;
  dashboard: string;
  leaderboard: string;
  about: string;
  impact: string;
  architecture: string;
  login: string;
  logout: string;
  loggingIn: string;
  connecting: string;

  // Onboarding
  welcomeTitle: string;
  welcomeDescription: string;
  displayName: string;
  enterYourName: string;
  chooseAvatar: string;
  startLearning: string;
  creatingProfile: string;
  welcomeToast: string;
  welcomeToastDescription: string;

  // Landing Page
  phase0Live: string;
  learnWeb3Title: string;
  learnWeb3Description: string;
  joinTheAcademy: string;
  goToDashboard: string;
  learnMore: string;
  whyJackbear: string;
  whyJackbearDescription: string;
  learnByDoing: string;
  learnByDoingDescription: string;
  earnRewards: string;
  earnRewardsDescription: string;
  dailyStreaks: string;
  dailyStreaksDescription: string;
  competeCollaborate: string;
  competeCollaborateDescription: string;
  exploreLearningWorlds: string;
  exploreLearningWorldsDescription: string;
  world1Title: string;
  world1Description: string;
  world2Title: string;
  world2Description: string;
  readyToStartJourney: string;
  readyToStartJourneyDescription: string;
  continueLearning: string;
  joinAcademyNow: string;

  // Courses Page
  courseCatalog: string;
  courseCatalogDescription: string;
  expandAll: string;
  collapseAll: string;
  comingSoon: string;
  course: string;
  courses_plural: string;
  courseOverview: string;
  learningObjectives: string;
  world: string;
  status: string;
  duration: string;
  difficulty: string;
  lessons: string;
  beginner: string;
  intermediate: string;
  advanced: string;
  readyToStart: string;
  readyToStartDescription: string;
  failedToLoadCourses: string;
  retry: string;
  noCoursesAvailable: string;
  checkBackSoon: string;

  // FAQ Page
  faqTitle: string;
  faqSubtitle: string;
  faqQuestion1: string;
  faqAnswer1: string;
  faqQuestion2: string;
  faqAnswer2: string;
  faqQuestion3: string;
  faqAnswer3: string;
  faqQuestion4: string;
  faqAnswer4: string;
  faqQuestion5: string;
  faqAnswer5: string;
  faqQuestion6: string;
  faqAnswer6: string;
  faqQuestion7: string;
  faqAnswer7: string;
  faqQuestion8: string;
  faqAnswer8: string;
  faqQuestion9: string;
  faqAnswer9: string;
  faqQuestion10: string;
  faqAnswer10: string;

  // Features Page
  gamificationFeatures: string;
  gamificationFeaturesDescription: string;
  xpSystem: string;
  xpSystemDescription: string;
  levelProgression: string;
  levelProgressionDescription: string;
  questSystem: string;
  questSystemDescription: string;
  leaderboardFeature: string;
  leaderboardFeatureDescription: string;
  bearCreditsFeature: string;
  bearCreditsFeatureDescription: string;
  learningWorlds: string;
  learningWorldsDescription: string;
  community: string;
  communityDescription: string;

  // ICPEDIA
  icpediaTitle: string;
  icpediaDescription: string;
  searchTopics: string;
  filterByCategory: string;
  sortBy: string;
  alphabetical: string;
  byDate: string;
  gridView: string;
  listView: string;
  summary: string;
  keyTerms: string;
  whyItMatters: string;
  references: string;
  relatedTopics: string;

  // Glossary
  glossaryTitle: string;
  glossaryDescription: string;
  glossarySubtitle: string;
  searchTerms: string;
  allCategories: string;
  detailedDescription: string;
  tags: string;
  relatedLessons: string;
  externalReferences: string;
  noTermsFound: string;
  noTermsFoundDescription: string;
  failedToLoadGlossary: string;
  firstEditionGlossary: string;
  sovereignBasics: string;

  // Coffee Break AI
  coffeeBreakTitle: string;
  coffeeBreakDescription: string;
  watchOnYouTube: string;
  episode: string;

  // Impact & Scholarships
  impactTitle: string;
  impactVision: string;
  graduateEligibility: string;
  corporatePartners: string;
  applyNow: string;

  // Dashboard
  yourProgress: string;
  currentXP: string;
  currentLevel: string;
  dailyStreak: string;
  bearCredits: string;

  // Leaderboard
  topLearners: string;
  rank: string;
  learner: string;
  xp: string;
  level: string;

  // Common
  loading: string;
  error: string;
  close: string;
  save: string;
  cancel: string;
  submit: string;
  back: string;
  next: string;

  // Footer
  builtWithLove: string;

  // Errors
  pleaseEnterDisplayName: string;
  failedToCreateProfile: string;
  unexpectedError: string;
}

const translations: Record<Language, Translations> = {
  en: {
    // Header & Navigation
    home: "Home",
    courses: "Courses",
    icpedia: "ICPEDIA",
    glossary: "Glossary",
    features: "Features",
    faq: "FAQ",
    dashboard: "Dashboard",
    leaderboard: "Leaderboard",
    about: "About",
    impact: "Impact & Scholarships",
    architecture: "Architecture",
    login: "Login",
    logout: "Logout",
    loggingIn: "Logging in...",
    connecting: "Connecting...",

    // Onboarding
    welcomeTitle: "Welcome to JACKBEAR.ai!",
    welcomeDescription:
      "Let's set up your learner profile to start your Web3 journey.",
    displayName: "Display Name",
    enterYourName: "Enter your name",
    chooseAvatar: "Choose Your Avatar",
    startLearning: "Start Learning!",
    creatingProfile: "Creating Profile...",
    welcomeToast: "Welcome to JACKBEAR.ai Academy!",
    welcomeToastDescription: "Your journey into Web3 begins now.",

    // Landing Page
    phase0Live: "Beta Now Live",
    learnWeb3Title: "Learn Web3 + ICP + AI by Doing Quests",
    learnWeb3Description:
      "Join JACKBEAR.ai Academy and embark on an epic learning journey. Master blockchain technology through gamified missions, earn rewards, and become a Web3 expert.",
    joinTheAcademy: "Join the Academy",
    goToDashboard: "Go to Dashboard",
    learnMore: "Learn More",
    whyJackbear: "Why JACKBEAR.ai Academy?",
    whyJackbearDescription:
      "Experience a revolutionary approach to learning Web3 technology through gamification and hands-on practice.",
    learnByDoing: "Learn by Doing",
    learnByDoingDescription:
      "Complete interactive quests and missions to master Web3, ICP, and AI concepts.",
    earnRewards: "Earn Rewards",
    earnRewardsDescription:
      "Gain XP, level up, and earn Bear Points (BP) as you progress through the academy.",
    dailyStreaks: "Daily Streaks",
    dailyStreaksDescription:
      "Build consistent learning habits with daily check-ins and streak bonuses.",
    competeCollaborate: "Compete & Collaborate",
    competeCollaborateDescription:
      "Climb the leaderboard and connect with fellow learners in the community.",
    exploreLearningWorlds: "Explore Learning Worlds",
    exploreLearningWorldsDescription:
      "Journey through carefully crafted worlds, each designed to build your Web3 expertise step by step.",
    world1Title: "World 1: Sovereign Basics",
    world1Description:
      "Master the fundamentals of digital sovereignty, self-custody, and Web3 principles.",
    world2Title: "World 2: Web3 Foundations",
    world2Description:
      "Dive deep into blockchain technology, decentralization, and distributed systems.",
    readyToStartJourney: "Ready to Start Your Journey?",
    readyToStartJourneyDescription:
      "Join thousands of learners mastering Web3 technology through interactive quests and gamified learning.",
    continueLearning: "Continue Learning",
    joinAcademyNow: "Join the Academy Now",

    // Courses Page
    courseCatalog: "Course Catalog",
    courseCatalogDescription:
      "A comprehensive collection of Web3, ICP, and AI courses organized by learning worlds.",
    expandAll: "Expand All",
    collapseAll: "Collapse All",
    comingSoon: "Coming Soon",
    course: "course",
    courses_plural: "courses",
    courseOverview: "Course Overview",
    learningObjectives: "Learning Objectives",
    world: "World",
    status: "Status",
    duration: "Duration",
    difficulty: "Difficulty",
    lessons: "Lessons",
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    readyToStart: "Ready to Start Learning?",
    readyToStartDescription:
      "Join JACKBEAR.ai — ICPEDIA (Self-Evolving World Computer Academy) today and begin your journey through the worlds of Web3, ICP, and AI. Earn XP, maintain streaks, and compete on the leaderboard as you master cutting-edge technologies.",
    failedToLoadCourses: "Failed to load courses",
    retry: "Retry",
    noCoursesAvailable: "No courses available at the moment.",
    checkBackSoon: "Check back soon for new learning content!",

    // FAQ Page
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Everything you need to know about JACKBEAR.ai Web3 Academy",
    faqQuestion1: "What is JACKBEAR.ai Web3 Academy?",
    faqAnswer1:
      "JACKBEAR.ai Web3 Academy is a gamified learning platform that teaches Web3, Internet Computer Protocol (ICP), and AI through interactive quests and missions. You earn XP, level up, and gain Bear Points (BP) as you progress through different learning worlds.",
    faqQuestion2: "How do I get started?",
    faqAnswer2:
      'Simply click "Join the Academy" and log in with Internet Identity. Once logged in, you\'ll create your learner profile and can immediately start exploring worlds and completing quests.',
    faqQuestion3: "What are Bear Points (BP)?",
    faqAnswer3:
      "Bear Points (BP) are the reward currency in the academy. You earn them by completing quests and missions. In Phase 0, they are simulated for tracking purposes. Future phases will introduce additional utility for Bear Points (BP).",
    faqQuestion4: "How does the XP and leveling system work?",
    faqAnswer4:
      "You earn XP (Experience Points) by completing lessons, quests, and maintaining daily streaks. Every 1000 XP increases your level by 1. Higher levels unlock more advanced content and showcase your expertise on the leaderboard.",
    faqQuestion5: "What are daily streaks?",
    faqAnswer5:
      "Daily streaks track consecutive days of activity in the academy. Check in daily to maintain your streak and earn bonus XP. Longer streaks provide bigger rewards!",
    faqQuestion6: "How does the leaderboard work?",
    faqAnswer6:
      "The leaderboard ranks all learners by their total Bear Points (BP). Compete with others to climb the ranks and showcase your Web3 expertise. Your position updates in real-time as you earn more BP.",
    faqQuestion7: "What learning worlds are available?",
    faqAnswer7:
      "The academy features seven learning worlds covering everything from sovereign basics to advanced topics. World 1 focuses on digital sovereignty and self-custody, while subsequent worlds explore Web3 foundations, DeFi, smart contracts, ICP, NFTs, and legacy building.",
    faqQuestion8: "Is there a community?",
    faqAnswer8:
      "Yes! We have a community chat widget where you can connect with fellow learners, ask questions, and share your progress. The full community features are coming soon in future updates.",
    faqQuestion9: "Do I need prior programming experience?",
    faqAnswer9:
      "No prior experience is required! Our curriculum is designed to take you from beginner to advanced. We start with fundamental concepts and gradually introduce more complex topics as you progress.",
    faqQuestion10: "Is the academy free?",
    faqAnswer10:
      "Yes, JACKBEAR.ai Web3 Academy is free to join and use. All core learning content, quests, and features are available at no cost.",

    // Features Page
    gamificationFeatures: "Gamification Features",
    gamificationFeaturesDescription:
      "Discover the powerful features that make learning Web3 engaging, rewarding, and fun.",
    xpSystem: "XP System",
    xpSystemDescription:
      "Earn Experience Points for every lesson completed, quest finished, and milestone achieved.",
    levelProgression: "Level Progression",
    levelProgressionDescription:
      "Advance through levels as you accumulate XP and unlock new content and challenges.",
    questSystem: "Quest System",
    questSystemDescription:
      "Complete daily and special quests to earn XP and Bear Points (BP).",
    leaderboardFeature: "Leaderboard",
    leaderboardFeatureDescription:
      "Compete with learners worldwide and climb the ranks to showcase your skills.",
    bearCreditsFeature: "Bear Points (BP)",
    bearCreditsFeatureDescription:
      "Earn reward currency by completing quests and achieving milestones.",
    learningWorlds: "Learning Worlds",
    learningWorldsDescription:
      "Progress through themed worlds, each focusing on specific Web3 and ICP concepts.",
    community: "Community",
    communityDescription:
      "Connect with fellow learners, share progress, and get support from the community.",

    // ICPEDIA
    icpediaTitle: "ICPEDIA Research",
    icpediaDescription: "Explore Web3 topics with AI-generated daily content",
    searchTopics: "Search topics...",
    filterByCategory: "Filter by category",
    sortBy: "Sort by",
    alphabetical: "Alphabetical",
    byDate: "By Date",
    gridView: "Grid View",
    listView: "List View",
    summary: "Summary",
    keyTerms: "Key Terms",
    whyItMatters: "Why It Matters",
    references: "References",
    relatedTopics: "Related Topics",

    // Glossary
    glossaryTitle: "Web3 Glossary",
    glossaryDescription:
      "Your comprehensive guide to Web3, ICP, blockchain, and AI terminology",
    glossarySubtitle: "First Edition — World 1: Sovereign Basics",
    searchTerms: "Search terms...",
    allCategories: "All",
    detailedDescription: "Detailed Description",
    tags: "Tags",
    relatedLessons: "Related Lessons",
    externalReferences: "External References",
    noTermsFound: "No terms found matching your search",
    noTermsFoundDescription: "Try adjusting your search or filter criteria",
    failedToLoadGlossary: "Failed to load glossary terms",
    firstEditionGlossary: "First Edition Glossary",
    sovereignBasics: "Aligned to World 1: Sovereign Basics",

    // Coffee Break AI
    coffeeBreakTitle: "Coffee Break AI",
    coffeeBreakDescription:
      "Learn with CaffeineAI - accessible AI tools for all ages",
    watchOnYouTube: "Watch on YouTube",
    episode: "Episode",

    // Impact & Scholarships
    impactTitle: "Impact & Scholarships",
    impactVision:
      "Sponsoring CaffeineAI subscriptions for underprivileged and Indigenous students globally",
    graduateEligibility: "Graduate Eligibility",
    corporatePartners: "Corporate Partners",
    applyNow: "Apply Now",

    // Dashboard
    yourProgress: "Your Progress",
    currentXP: "Current XP",
    currentLevel: "Current Level",
    dailyStreak: "Daily Streak",
    bearCredits: "Bear Points (BP)",

    // Leaderboard
    topLearners: "Top Learners",
    rank: "Rank",
    learner: "Learner",
    xp: "XP",
    level: "Level",

    // Common
    loading: "Loading...",
    error: "Error",
    close: "Close",
    save: "Save",
    cancel: "Cancel",
    submit: "Submit",
    back: "Back",
    next: "Next",

    // Footer
    builtWithLove: "Built with love using",

    // Errors
    pleaseEnterDisplayName: "Please enter a display name",
    failedToCreateProfile: "Failed to create profile. Please try again.",
    unexpectedError: "An unexpected error occurred. Please try again.",
  },
  es: {
    // Header & Navigation
    home: "Inicio",
    courses: "Cursos",
    icpedia: "ICPEDIA",
    glossary: "Glosario",
    features: "Características",
    faq: "Preguntas Frecuentes",
    dashboard: "Panel",
    leaderboard: "Clasificación",
    about: "Acerca de",
    impact: "Impacto y Becas",
    architecture: "Arquitectura",
    login: "Iniciar Sesión",
    logout: "Cerrar Sesión",
    loggingIn: "Iniciando sesión...",
    connecting: "Conectando...",

    // Onboarding
    welcomeTitle: "¡Bienvenido a JACKBEAR.ai!",
    welcomeDescription:
      "Configuremos tu perfil de estudiante para comenzar tu viaje en Web3.",
    displayName: "Nombre para Mostrar",
    enterYourName: "Ingresa tu nombre",
    chooseAvatar: "Elige tu Avatar",
    startLearning: "¡Comenzar a Aprender!",
    creatingProfile: "Creando Perfil...",
    welcomeToast: "¡Bienvenido a JACKBEAR.ai Academy!",
    welcomeToastDescription: "Tu viaje en Web3 comienza ahora.",

    // Landing Page
    phase0Live: "Beta Ahora en Vivo",
    learnWeb3Title: "Aprende Web3 + ICP + IA Haciendo Misiones",
    learnWeb3Description:
      "Únete a JACKBEAR.ai Academy y embárcate en un viaje de aprendizaje épico. Domina la tecnología blockchain a través de misiones gamificadas, gana recompensas y conviértete en un experto en Web3.",
    joinTheAcademy: "Únete a la Academia",
    goToDashboard: "Ir al Panel",
    learnMore: "Saber Más",
    whyJackbear: "¿Por Qué JACKBEAR.ai Academy?",
    whyJackbearDescription:
      "Experimenta un enfoque revolucionario para aprender tecnología Web3 a través de gamificación y práctica práctica.",
    learnByDoing: "Aprende Haciendo",
    learnByDoingDescription:
      "Completa misiones y desafíos interactivos para dominar conceptos de Web3, ICP e IA.",
    earnRewards: "Gana Recompensas",
    earnRewardsDescription:
      "Obtén XP, sube de nivel y gana Bear Points (BP) mientras progresas en la academia.",
    dailyStreaks: "Rachas Diarias",
    dailyStreaksDescription:
      "Construye hábitos de aprendizaje consistentes con registros diarios y bonos de racha.",
    competeCollaborate: "Compite y Colabora",
    competeCollaborateDescription:
      "Escala en la clasificación y conéctate con otros estudiantes en la comunidad.",
    exploreLearningWorlds: "Explora Mundos de Aprendizaje",
    exploreLearningWorldsDescription:
      "Viaja a través de mundos cuidadosamente diseñados, cada uno creado para construir tu experiencia en Web3 paso a paso.",
    world1Title: "Mundo 1: Fundamentos Soberanos",
    world1Description:
      "Domina los fundamentos de la soberanía digital, autocustodia y principios Web3.",
    world2Title: "Mundo 2: Fundamentos Web3",
    world2Description:
      "Sumérgete profundamente en tecnología blockchain, descentralización y sistemas distribuidos.",
    readyToStartJourney: "¿Listo para Comenzar tu Viaje?",
    readyToStartJourneyDescription:
      "Únete a miles de estudiantes dominando la tecnología Web3 a través de misiones interactivas y aprendizaje gamificado.",
    continueLearning: "Continuar Aprendiendo",
    joinAcademyNow: "Únete a la Academia Ahora",

    // Courses Page
    courseCatalog: "Catálogo de Cursos",
    courseCatalogDescription:
      "Una colección completa de cursos de Web3, ICP e IA organizados por mundos de aprendizaje.",
    expandAll: "Expandir Todo",
    collapseAll: "Contraer Todo",
    comingSoon: "Próximamente",
    course: "curso",
    courses_plural: "cursos",
    courseOverview: "Descripción del Curso",
    learningObjectives: "Objetivos de Aprendizaje",
    world: "Mundo",
    status: "Estado",
    duration: "Duración",
    difficulty: "Dificultad",
    lessons: "Lecciones",
    beginner: "Principiante",
    intermediate: "Intermedio",
    advanced: "Avanzado",
    readyToStart: "¿Listo para Comenzar a Aprender?",
    readyToStartDescription:
      "Únete a JACKBEAR.ai — ICPEDIA (Academia de Computadora Mundial Auto-Evolutiva) hoy y comienza tu viaje a través de los mundos de Web3, ICP e IA. Gana XP, mantén rachas y compite en la clasificación mientras dominas tecnologías de vanguardia.",
    failedToLoadCourses: "Error al cargar los cursos",
    retry: "Reintentar",
    noCoursesAvailable: "No hay cursos disponibles en este momento.",
    checkBackSoon: "¡Vuelve pronto para nuevo contenido de aprendizaje!",

    // FAQ Page
    faqTitle: "Preguntas Frecuentes",
    faqSubtitle: "Todo lo que necesitas saber sobre JACKBEAR.ai Web3 Academy",
    faqQuestion1: "¿Qué es JACKBEAR.ai Web3 Academy?",
    faqAnswer1:
      "JACKBEAR.ai Web3 Academy es una plataforma de aprendizaje gamificada que enseña Web3, Protocolo de Computadora de Internet (ICP) e IA a través de misiones y desafíos interactivos. Ganas XP, subes de nivel y obtienes Bear Points (BP) mientras progresas a través de diferentes mundos de aprendizaje.",
    faqQuestion2: "¿Cómo empiezo?",
    faqAnswer2:
      'Simplemente haz clic en "Únete a la Academia" e inicia sesión con Internet Identity. Una vez que hayas iniciado sesión, crearás tu perfil de estudiante y podrás comenzar inmediatamente a explorar mundos y completar misiones.',
    faqQuestion3: "¿Qué son los Bear Points (BP)?",
    faqAnswer3:
      "Los Bear Points (BP) son la moneda de recompensa en la academia. Los ganas completando misiones y desafíos. En la Fase 0, se simulan con fines de seguimiento. Las fases futuras introducirán utilidad adicional para los Bear Points (BP).",
    faqQuestion4: "¿Cómo funciona el sistema de XP y niveles?",
    faqAnswer4:
      "Ganas XP (Puntos de Experiencia) completando lecciones, misiones y manteniendo rachas diarias. Cada 1000 XP aumenta tu nivel en 1. Los niveles más altos desbloquean contenido más avanzado y muestran tu experiencia en la clasificación.",
    faqQuestion5: "¿Qué son las rachas diarias?",
    faqAnswer5:
      "Las rachas diarias rastrean días consecutivos de actividad en la academia. Regístrate diariamente para mantener tu racha y ganar XP de bonificación. ¡Las rachas más largas proporcionan mayores recompensas!",
    faqQuestion6: "¿Cómo funciona la clasificación?",
    faqAnswer6:
      "La clasificación clasifica a todos los estudiantes por su Total de Puntos Bear (BP). Compite con otros para escalar en los rangos y mostrar tu experiencia en Web3. Tu posición se actualiza en tiempo real a medida que ganas más BP.",
    faqQuestion7: "¿Qué mundos de aprendizaje están disponibles?",
    faqAnswer7:
      "La academia presenta siete mundos de aprendizaje que cubren todo, desde fundamentos soberanos hasta temas avanzados. El Mundo 1 se enfoca en soberanía digital y autocustodia, mientras que los mundos subsiguientes exploran fundamentos Web3, DeFi, contratos inteligentes, ICP, NFTs y construcción de legado.",
    faqQuestion8: "¿Hay una comunidad?",
    faqAnswer8:
      "¡Sí! Tenemos un widget de chat comunitario donde puedes conectarte con otros estudiantes, hacer preguntas y compartir tu progreso. Las características completas de la comunidad llegarán pronto en futuras actualizaciones.",
    faqQuestion9: "¿Necesito experiencia previa en programación?",
    faqAnswer9:
      "¡No se requiere experiencia previa! Nuestro plan de estudios está diseñado para llevarte de principiante a avanzado. Comenzamos con conceptos fundamentales e introducimos gradualmente temas más complejos a medida que progresas.",
    faqQuestion10: "¿Es gratuita la academia?",
    faqAnswer10:
      "Sí, JACKBEAR.ai Web3 Academy es gratuita para unirse y usar. Todo el contenido de aprendizaje principal, misiones y características están disponibles sin costo.",

    // Features Page
    gamificationFeatures: "Características de Gamificación",
    gamificationFeaturesDescription:
      "Descubre las poderosas características que hacen que aprender Web3 sea atractivo, gratificante y divertido.",
    xpSystem: "Sistema de XP",
    xpSystemDescription:
      "Gana Puntos de Experiencia por cada lección completada, misión terminada y hito alcanzado.",
    levelProgression: "Progresión de Niveles",
    levelProgressionDescription:
      "Avanza a través de niveles a medida que acumulas XP y desbloqueas nuevo contenido y desafíos.",
    questSystem: "Sistema de Misiones",
    questSystemDescription:
      "Completa misiones diarias y especiales para ganar XP y Bear Points (BP).",
    leaderboardFeature: "Clasificación",
    leaderboardFeatureDescription:
      "Compite con estudiantes de todo el mundo y escala en los rangos para mostrar tus habilidades.",
    bearCreditsFeature: "Bear Points (BP)",
    bearCreditsFeatureDescription:
      "Gana moneda de recompensa completando misiones y alcanzando hitos.",
    learningWorlds: "Mundos de Aprendizaje",
    learningWorldsDescription:
      "Progresa a través de mundos temáticos, cada uno enfocado en conceptos específicos de Web3 e ICP.",
    community: "Comunidad",
    communityDescription:
      "Conéctate con otros estudiantes, comparte progreso y obtén apoyo de la comunidad.",

    // ICPEDIA
    icpediaTitle: "Investigación ICPEDIA",
    icpediaDescription:
      "Explora temas de Web3 con contenido diario generado por IA",
    searchTopics: "Buscar temas...",
    filterByCategory: "Filtrar por categoría",
    sortBy: "Ordenar por",
    alphabetical: "Alfabético",
    byDate: "Por Fecha",
    gridView: "Vista de Cuadrícula",
    listView: "Vista de Lista",
    summary: "Resumen",
    keyTerms: "Términos Clave",
    whyItMatters: "Por Qué Importa",
    references: "Referencias",
    relatedTopics: "Temas Relacionados",

    // Glossary
    glossaryTitle: "Glosario Web3",
    glossaryDescription:
      "Tu guía completa de terminología Web3, ICP, blockchain e IA",
    glossarySubtitle: "Primera Edición — Mundo 1: Fundamentos Soberanos",
    searchTerms: "Buscar términos...",
    allCategories: "Todos",
    detailedDescription: "Descripción Detallada",
    tags: "Etiquetas",
    relatedLessons: "Lecciones Relacionadas",
    externalReferences: "Referencias Externas",
    noTermsFound: "No se encontraron términos que coincidan con tu búsqueda",
    noTermsFoundDescription:
      "Intenta ajustar tu búsqueda o criterios de filtro",
    failedToLoadGlossary: "Error al cargar términos del glosario",
    firstEditionGlossary: "Glosario Primera Edición",
    sovereignBasics: "Alineado con Mundo 1: Fundamentos Soberanos",

    // Coffee Break AI
    coffeeBreakTitle: "Coffee Break AI",
    coffeeBreakDescription:
      "Aprende con CaffeineAI - herramientas de IA accesibles para todas las edades",
    watchOnYouTube: "Ver en YouTube",
    episode: "Episodio",

    // Impact & Scholarships
    impactTitle: "Impacto y Becas",
    impactVision:
      "Patrocinando suscripciones de CaffeineAI para estudiantes desfavorecidos e indígenas a nivel mundial",
    graduateEligibility: "Elegibilidad para Graduados",
    corporatePartners: "Socios Corporativos",
    applyNow: "Aplicar Ahora",

    // Dashboard
    yourProgress: "Tu Progreso",
    currentXP: "XP Actual",
    currentLevel: "Nivel Actual",
    dailyStreak: "Racha Diaria",
    bearCredits: "Bear Points (BP)",

    // Leaderboard
    topLearners: "Mejores Estudiantes",
    rank: "Rango",
    learner: "Estudiante",
    xp: "XP",
    level: "Nivel",

    // Common
    loading: "Cargando...",
    error: "Error",
    close: "Cerrar",
    save: "Guardar",
    cancel: "Cancelar",
    submit: "Enviar",
    back: "Atrás",
    next: "Siguiente",

    // Footer
    builtWithLove: "Construido con amor usando",

    // Errors
    pleaseEnterDisplayName: "Por favor ingresa un nombre para mostrar",
    failedToCreateProfile:
      "Error al crear el perfil. Por favor intenta de nuevo.",
    unexpectedError: "Ocurrió un error inesperado. Por favor intenta de nuevo.",
  },
};

// Browser language detection
export function detectBrowserLanguage(): Language {
  if (typeof window === "undefined") return "en";

  const browserLang = navigator.language || (navigator as any).userLanguage;
  const langCode = browserLang.toLowerCase().split("-")[0];

  // Check if detected language is supported
  if (langCode === "es") return "es";

  // Default to English
  return "en";
}

// Get translations for a specific language
export function getTranslations(lang: Language): Translations {
  return translations[lang] || translations.en;
}

// LocalStorage key for language preference
export const LANGUAGE_STORAGE_KEY = "jackbear-language-preference";

// Get stored language preference
export function getStoredLanguage(): Language | null {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored === "en" || stored === "es") return stored;

  return null;
}

// Store language preference
export function storeLanguage(lang: Language): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
}

// Get current language (stored preference or browser detection)
export function getCurrentLanguage(): Language {
  const stored = getStoredLanguage();
  if (stored) return stored;

  return detectBrowserLanguage();
}
