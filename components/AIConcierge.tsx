"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { LISTINGS } from "@/lib/listings";
import { parseQuery, matchListings, explainQuery } from "@/lib/aiSearch";
import { formatAEDCompact } from "@/lib/format";
import { useCompare } from "@/lib/providers";
import type { Listing, DealType } from "@/lib/types";
import styles from "./AIConcierge.module.css";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
  matches?: Listing[];
  seeAllHref?: string;
};

const STARTER_PROMPTS = [
  "3 bedroom apartment with sea view",
  "villa for rent under AED 200K",
  "2 bed in Downtown Dubai with pool",
];

function buildSeeAllHref(dealType: DealType, queryText: string): string {
  const base = dealType === "Rent" ? "/properties-for-rent" : "/properties-for-sale";
  return `${base}?q=${encodeURIComponent(queryText)}`;
}

export function AIConcierge() {
  const pathname = usePathname();
  const { count: compareCount } = useCompare();
  const trayVisible = compareCount > 0 && pathname !== "/compare";
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Hi, I'm the betterhomes concierge. Describe what you're looking for — beds, area, budget, or a feature like “sea view” — and I'll pull real matches.",
    },
  ]);
  const listRef = useRef<HTMLDivElement>(null);

  function scrollToBottom() {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    });
  }

  function ask(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const parsed = parseQuery(trimmed);
    const dealType: DealType = parsed.dealTypeHint ?? "Sale";
    const dataset = LISTINGS.filter((l) => l.dealType === dealType);
    const matches = matchListings(dataset, parsed);
    const explanation = explainQuery(parsed, matches.length, dealType);

    setMessages((prev) => [
      ...prev,
      { role: "user", text: trimmed },
      {
        role: "assistant",
        text:
          matches.length > 0
            ? explanation
            : `${explanation} Try loosening a filter — a different area or a wider budget.`,
        matches: matches.slice(0, 3),
        seeAllHref: matches.length > 3 ? buildSeeAllHref(dealType, trimmed) : undefined,
      },
    ]);
    setInput("");
    scrollToBottom();
  }

  return (
    <div className={styles.wrap} style={trayVisible ? { bottom: "calc(var(--space-6) + 64px)" } : undefined}>
      {open && (
        <div className={styles.panel} role="dialog" aria-label="betterhomes concierge">
          <div className={styles.header}>
            <div className={styles.headerTitle}>
              <i className="ph-fill ph-sparkle" aria-hidden />
              betterhomes concierge
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat">
              <i className="ph ph-x" aria-hidden />
            </button>
          </div>

          <div className={styles.messages} ref={listRef}>
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? styles.userBubble : styles.assistantBubble}>
                <p>{m.text}</p>
                {m.matches && m.matches.length > 0 && (
                  <div className={styles.matches}>
                    {m.matches.map((listing) => (
                      <Link key={listing.id} href={`/listings/${listing.id}`} className={styles.matchCard}>
                        <span
                          className={styles.matchPhoto}
                          style={{ backgroundImage: `url(${listing.photo})` }}
                        />
                        <span className={styles.matchInfo}>
                          <span className={styles.matchTitle}>{listing.title}</span>
                          <span className={styles.matchPrice}>
                            {formatAEDCompact(listing.price)}
                            {listing.dealType === "Rent" ? "/yr" : ""} &middot; {listing.beds === 0 ? "Studio" : `${listing.beds} bed`}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
                {m.seeAllHref && (
                  <Link href={m.seeAllHref} className={styles.seeAll}>
                    See all results <i className="ph ph-arrow-right" aria-hidden />
                  </Link>
                )}
              </div>
            ))}
          </div>

          {messages.length === 1 && (
            <div className={styles.prompts}>
              {STARTER_PROMPTS.map((p) => (
                <button key={p} type="button" onClick={() => ask(p)}>
                  {p}
                </button>
              ))}
            </div>
          )}

          <form
            className={styles.inputRow}
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe what you're looking for..."
              aria-label="Message the concierge"
            />
            <button type="submit" aria-label="Send">
              <i className="ph-fill ph-paper-plane-right" aria-hidden />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className={styles.launcher}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close concierge chat" : "Open concierge chat"}
      >
        <i className={open ? "ph ph-x" : "ph-fill ph-chat-circle-dots"} aria-hidden />
        {!open && <span>Ask betterhomes</span>}
      </button>
    </div>
  );
}
