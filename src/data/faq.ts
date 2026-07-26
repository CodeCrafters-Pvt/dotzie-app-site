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
    a: "Everything you add stays private on your own phone. Nothing is sent to a server, and there are no accounts to create.",
  },
  {
    q: "Is Dotzie free?",
    a: "Yes — the tracker is free to use. Whenever you want extras like richer reports and custom categories, you can switch to Pro right inside the app. No subscription.",
  },
  {
    q: "Which platforms are supported?",
    a: "Dotzie is available on iOS and Android, with the same calm experience on both.",
  },
  {
    q: "Is my data backed up?",
    a: "You can save a backup file whenever you like and restore it on a new phone. Backups only leave your device if you choose to share the file yourself.",
  },
];
