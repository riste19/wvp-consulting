import type { LegalDocument } from "./legal";

/** English twin of `legal.ts`. */

export const privacyPolicy: LegalDocument = {
  title: "Privacy policy",
  description:
    "How WVP Plus Consulting collects, uses and protects the personal data of its website visitors and clients.",
  updated: "12 September 2026",
  intro:
    "This policy explains what personal data we process when you use our website or get in touch with us, why we process it, and what rights you have.",
  sections: [
    {
      heading: "What data we collect",
      paragraphs: [
        "We collect only the data we need to answer your enquiry and deliver the service we have agreed on.",
      ],
      items: [
        "What you enter in the contact form: your first and last name, company, email address, phone number and message",
        "What you tell us directly, by email or phone",
        "Basic technical data about your visit to the website",
      ],
    },
    {
      heading: "Why we use it",
      paragraphs: [
        "We use the data only to answer your question, prepare an offer and deliver the consulting service we have agreed on. We do not use it for automated decision-making.",
      ],
    },
    {
      heading: "Sharing with third parties",
      paragraphs: [
        "We do not sell or rent personal data. We share data only when it is necessary to deliver the service — for example with a bank, fund or government institution to which your application is submitted — and then only with your consent or on the basis of a legal obligation.",
      ],
    },
    {
      heading: "How long we keep it",
      paragraphs: [
        "We keep the data for as long as our business relationship lasts and for the period required by the statutory rules on archiving. After that, the data is deleted or anonymised.",
      ],
    },
    {
      heading: "Cookies",
      paragraphs: [
        "This website does not use cookies for tracking, profiling or advertising. We set no analytics or marketing cookies, and embed no social media or map content that would follow you around the web.",
        "The website stores no data in your browser, whether in cookies or by any similar technology. That is why we show no consent banner: there is no processing that would need one.",
        "If we ever introduce visitor statistics or another technology that requires consent, this policy will be updated before that technology is switched on.",
      ],
    },
    {
      heading: "Your rights",
      paragraphs: [
        "You have the right at any time to access, correct, restrict or erase your personal data, and to object to its processing.",
      ],
      items: [
        "The right to request a copy of the data we hold about you",
        "The right to have inaccurate data corrected",
        "The right to have your data erased when there is no longer a basis for processing it",
        "The right to lodge a complaint with the authority responsible for personal data protection",
      ],
    },
    {
      heading: "Supervisory authority",
      paragraphs: [
        "The processing of personal data in the Republic of North Macedonia is supervised by the Personal Data Protection Agency, under the Law on Personal Data Protection (Official Gazette of the Republic of North Macedonia No. 42/2020).",
        "If you believe your rights have been violated in the processing of your personal data, you may file a request with the Agency to establish the violation:",
      ],
      items: [
        "Personal Data Protection Agency",
        "Blvd. Goce Delčev 18 (MRT building, 14th floor), P.O. Box 417, 1000 Skopje",
        "Phone: +389 2 3230 635",
        "Email: info@privacy.mk",
        "Website: azlp.mk",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [
        "For any question about how we process personal data, write to us at info@wvpconsulting.com.",
      ],
    },
  ],
};

export const termsOfUse: LegalDocument = {
  title: "Terms of use",
  description:
    "The terms under which you may use the WVP Plus Consulting website and its content.",
  updated: "1 January 2025",
  intro:
    "By accessing and using this website, you agree to the terms below. If you do not agree with them, please do not use the website.",
  sections: [
    {
      heading: "Purpose of the content",
      paragraphs: [
        "The content of this website is for information only and is not financial, legal or investment advice. Any business decision should be made after an individual analysis and a consultation with our team.",
      ],
    },
    {
      heading: "Accuracy of information",
      paragraphs: [
        "Information on open calls, deadlines, co-financing rates and amounts changes often. We do our best to keep it up to date, but reserve the right to change it without notice. Always check the current conditions with the competent institution or with us.",
      ],
    },
    {
      heading: "Intellectual property",
      paragraphs: [
        "The texts, graphics, logo and other materials on this website are protected. They may not be downloaded, copied or published without our prior written consent.",
      ],
    },
    {
      heading: "External links",
      paragraphs: [
        "This website may contain links to external websites. We are not responsible for their content or their privacy practices.",
      ],
    },
    {
      heading: "Limitation of liability",
      paragraphs: [
        "We are not liable for any direct or indirect damage arising from the use of information published on this website without prior professional advice.",
      ],
    },
    {
      heading: "Changes to these terms",
      paragraphs: [
        "We reserve the right to change these terms at any time. The version published on this page, with the date of its last update, is the one that applies.",
      ],
    },
  ],
};
