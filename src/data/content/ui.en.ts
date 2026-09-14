import type * as Mk from "./ui";

/** English twin of `ui.ts`. */
export const ui: typeof Mk.ui = {
  site: {
    title: "WVP Consulting | Business and financial consulting",
    description:
      "WVP Plus Consulting provides financial and business consulting, access to finance, grants and co-financing, marketing and access to new markets for companies in North Macedonia and the region.",
    shareDescription:
      "Your partner in growth: access to finance, grants, business planning and new market development.",
    shareImageAlt: "WVP Plus Consulting",
    keywords: [
      "financial consulting",
      "business consulting",
      "grants",
      "co-financing",
      "IPARD",
      "access to finance",
      "investments",
      "business plan",
      "Skopje",
    ],
  },

  chrome: {
    skipToContent: "Skip to content",
    homeLinkLabel: "WVP Plus Consulting — home page",
    mainNavLabel: "Main navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    allServices: "View all services",
    linkedinLabel: "WVP Plus Consulting on LinkedIn",
    rightsReserved: "All rights reserved.",
    bookMeetingLines: ["Book a", "meeting"],
  },

  home: {
    metaTitle: "WVP Consulting | Business and financial consulting",
    metaDescription:
      "For our clients we choose the best. Financial consulting, access to finance, grants and co-financing, business development and access to new markets — with over 4,650 successfully completed projects.",
    heroLabel: "Featured messages",
    heroRoleDescription: "carousel",
    previousSlide: "Previous slide",
    nextSlide: "Next slide",
    slide: "Slide",
    servicesHeading: "See how we can help you",
    learnMore: "Learn more",
    learnMoreAbout: "about",
  },

  services: {
    metaTitle: "Services",
    metaDescription:
      "From access to finance to market and strategic business development — financial consulting, grants and co-financing, business consulting, marketing, market access and ESG standardization.",
    heroTitle: "Services",
    heroSubtitle:
      "From access to finance to market and strategic business development, we offer complete support for your business growth and development",
    heroImageAlt: "Consultants reviewing financial charts on a tablet",
    serviceImageAlt: "Illustration for the service",
  },

  programmes: {
    metaTitle: "Programmes",
    metaDescription:
      "Current grant and co-financing programmes: IPARD 3, the Fund for Innovation, EBRD, Creative Europe and national competitiveness measures.",
    heroImageAlt: "Coins and financial charts",
    coFinancingLabel: "Co-financing rate",
    coFinancing: "Co-financing",
    deadlineLabel: "Deadline",
    sectorsLabel: "Sectors",
    processHeading: "How a project runs",
    processSubtitle: "Four steps from the eligibility check to the payout",
    eligibilityCta: "Check whether you are eligible",
  },

  about: {
    metaTitle: "About us",
    metaDescription:
      "WVP Plus Consulting is part of the Austrian WVP GROUP, with a tradition dating back to 1985. Meet the history, values and team behind more than 4,650 completed projects.",
    heroTitle: "Our Company",
    heroSubtitle:
      "Dedicated to providing comprehensive financial and market access consulting.",
    heroImageAlt: "Reception and workspace in the company's offices",
    historyHeading: "Development history",
    historySubtitle:
      "From Skopje to the European Union market — the group's growth in the region",
    offerHeading: "What we offer",
    offerSubtitle:
      "A full range of services for financing, market entry and reporting",
    valuesHeading: "Our values",
    valuesSubtitle:
      "The principles that drive our work and shape our commitment to excellence",
    teamImageAlt: "Photo collage of the WVP Plus Consulting team",
  },

  contact: {
    metaTitle: "Contact",
    metaDescription:
      "Get in touch with the WVP Plus Consulting team — by phone, by email, at a meeting in our office or in an online consultation.",
    heroImageAlt: "Consultants at work in the company's office",
    openMapLabel: "Open the {city} location in Google Maps",
    mapImageAlt: "The building that houses the office in {city}",
  },

  contactForm: {
    subjects: [
      "Access to finance",
      "Grants and co-financing",
      "Business plan or investment programme",
      "Marketing and business development",
      "Access to new markets",
      "ESG standardization",
      "Other",
    ],
    labels: {
      firstName: "First name",
      lastName: "Last name",
      company: "Company",
      email: "Email",
      phone: "Phone",
      subject: "Subject",
      message: "Message / question",
    },
    placeholders: {
      firstName: "Your first name",
      lastName: "Your last name",
      company: "Your company name",
      email: "name@company.com",
      phone: "+389 7X XXX XXX",
      subject: "Select a subject",
      message: "Tell us a little more about your project…",
    },
    errors: {
      firstName: "Enter your first name.",
      lastName: "Enter your last name.",
      emailMissing: "Enter your email.",
      emailInvalid: "Enter a valid email address.",
      phone: "Enter a valid phone number.",
      subject: "Select a subject for your message.",
      message: "The message must be at least 10 characters long.",
    },
    honeypotLabel: "Website",
    challengeLoading:
      "The check that you are not a robot is still loading. Try again in a moment.",
    send: "Send message",
    sending: "Sending…",
    sent: "Message sent. We will contact you within 24 hours.",
    failed: "The message was not sent. Try again or email us directly.",
    requiredBefore: "Fields marked with",
    requiredStar: "an asterisk",
    requiredAfter: "are required.",
  },

  blog: {
    metaTitle: "Financial advice",
    metaDescription:
      "Financial news, open grant calls, experience from the field and success stories of the companies we work with.",
    heading: "Financial advice",
    subtitle: "Financial news, our experiences and success stories in one place",
    sectionHeading: "Finance in everyday practice",
    sectionSubtitle:
      "Learn more about financial news, our experiences and success stories",
    allPosts: "All posts",
    readMore: "Read more",
    backToPosts: "Back to posts",
    related: "Related posts",
    notFound: "Post not found",
    filterAll: "All",
    filterLabel: "Filter by category",
    emptyCategory: "There are no posts in this category.",
    languageNote: "Posts are available in Macedonian only.",
  },

  legal: {
    languageNote: "This document is available in Macedonian only.",
  },
};
