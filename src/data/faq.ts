export interface Faq {
  q: string;
  a: string;
}

/** Single source of truth for the FAQ section and the FAQPage JSON-LD. */
export const faqs: Faq[] = [
  {
    q: "Do I need internet to use Dotzie?",
    a: "No. Dotzie is fully offline-first. Every feature — adding expenses, viewing reports, exporting backups — works without a network connection.",
  },
  {
    q: "Where is my data stored?",
    a: "All entries live in an encrypted database on your device. Nothing is transmitted to a server, and there are no accounts to create.",
  },
  {
    q: "Is Dotzie free?",
    a: "The core tracker is free. A one-time in-app purchase unlocks advanced reports and custom categories. There is no subscription.",
  },
  {
    q: "Which platforms are supported?",
    a: "Dotzie is available on iOS and Android. It is built with React Native so the experience is consistent across both.",
  },
  {
    q: "Is my data backed up?",
    a: "You can export an encrypted backup file at any time and restore it on a new device using your passphrase. Backups never leave your device unless you share the file yourself.",
  },
];
