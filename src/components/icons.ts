import {
  Award,
  CalendarDays,
  ChartLine,
  ChartNetwork,
  Euro,
  FileText,
  Globe,
  HandCoins,
  Handshake,
  Leaf,
  Lightbulb,
  Mail,
  Phone,
  ReceiptEuro,
  Target,
  Users,
  WalletCards,
  type LucideIcon,
} from "lucide-react";

/**
 * Name → component map for icons chosen in the content layer.
 *
 * `lucide-react` ships with a `"use client"` directive, so any module importing
 * it lands on the client side of the boundary — and takes everything else in
 * that module with it. Holding icon *components* in `src/data` therefore pushed
 * `services.ts`, `about.ts` and `contact.ts` into the JavaScript of every page,
 * descriptions and all. Data names an icon; this map resolves it.
 *
 * Deliberately not exported from a barrel: importing it should be a decision,
 * not something a component picks up while reaching for a layout helper.
 */
export const icons = {
  award: Award,
  calendarDays: CalendarDays,
  chartLine: ChartLine,
  chartNetwork: ChartNetwork,
  euro: Euro,
  fileText: FileText,
  globe: Globe,
  handCoins: HandCoins,
  handshake: Handshake,
  leaf: Leaf,
  lightbulb: Lightbulb,
  mail: Mail,
  phone: Phone,
  receiptEuro: ReceiptEuro,
  target: Target,
  users: Users,
  walletCards: WalletCards,
} satisfies Record<string, LucideIcon>;

/** The set of icons the content layer is allowed to ask for. */
export type IconName = keyof typeof icons;
