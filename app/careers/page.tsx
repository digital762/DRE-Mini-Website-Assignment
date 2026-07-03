import type { Metadata } from "next";
import { Button } from "@/components/Button";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Careers — betterhomes",
  description: "Join betterhomes — open roles across sales, leasing, property management, and operations in Dubai.",
};

const BENEFITS = [
  {
    icon: "graduation-cap",
    title: "betterhomes Academy",
    body: "A structured onboarding programme and ongoing training, whether you're a first-year agent or ten years in.",
  },
  {
    icon: "trend-up",
    title: "Uncapped commission",
    body: "Transparent, competitive commission splits with no ceiling — your pipeline is the only limit.",
  },
  {
    icon: "megaphone",
    title: "Brand and lead support",
    body: "Marketing, photography, and portal placement handled centrally, so you spend your time with clients, not admin.",
  },
  {
    icon: "users-three",
    title: "A team, not a desk",
    body: "Agents work in community-specialist pods, sharing leads and knowledge instead of competing over the same building.",
  },
];

const ROLES = [
  {
    title: "Sales Agent — Dubai Marina & JBR",
    type: "Full-time · Commission",
    body: "Own a portfolio of Marina and JBR listings, from first viewing through to transfer.",
  },
  {
    title: "Sales Agent — Downtown & Business Bay",
    type: "Full-time · Commission",
    body: "Off-plan and secondary market sales across two of Dubai's fastest-moving communities.",
  },
  {
    title: "Leasing Consultant — Dubai-wide",
    type: "Full-time · Commission",
    body: "Match tenants to apartments and villas across our rental portfolio, with a strong renewal pipeline.",
  },
  {
    title: "Property Manager",
    type: "Full-time · Salaried",
    body: "Manage a portfolio of landlord accounts — renewals, maintenance coordination, and owner reporting.",
  },
  {
    title: "Marketing Executive",
    type: "Full-time · Salaried",
    body: "Run listing photography schedules, portal campaigns, and social content for the sales and leasing teams.",
  },
  {
    title: "Compliance Officer",
    type: "Full-time · Salaried",
    body: "Review listings and contracts against RERA requirements before they go live.",
  },
];

export default function CareersPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className="bh-container">
          <div className="bh-eyebrow">Careers</div>
          <h1 className={styles.title}>Build your career on forty years of trust.</h1>
          <p className={styles.subtitle}>
            betterhomes agents don&apos;t compete for leads inside their own office &mdash; they
            specialise by community and back each other up. If that sounds better than a bullpen,
            we should talk.
          </p>
          <Button href="mailto:careers@bhomes.com" variant="primary" iconRight="arrow-right">
            Send your CV
          </Button>
        </div>
      </div>

      <section className={styles.section}>
        <div className="bh-container">
          <div className="bh-eyebrow">Why betterhomes</div>
          <h2 className={styles.sectionTitle}>What you get, beyond a desk.</h2>
          <div className={styles.benefitsGrid}>
            {BENEFITS.map((b) => (
              <div key={b.title} className={styles.benefitCard}>
                <i className={`ph ph-${b.icon}`} aria-hidden />
                <div className={styles.benefitTitle}>{b.title}</div>
                <p>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.rolesSection}>
        <div className="bh-container">
          <div className="bh-eyebrow">Open roles</div>
          <h2 className={styles.sectionTitle}>Current openings.</h2>
          <div className={styles.rolesList}>
            {ROLES.map((role) => (
              <div key={role.title} className={styles.roleRow}>
                <div className={styles.roleInfo}>
                  <div className={styles.roleTitle}>{role.title}</div>
                  <div className={styles.roleType}>{role.type}</div>
                  <p className={styles.roleBody}>{role.body}</p>
                </div>
                <a
                  href={`mailto:careers@bhomes.com?subject=${encodeURIComponent(`Application: ${role.title}`)}`}
                  className={styles.applyBtn}
                >
                  Apply <i className="ph ph-arrow-right" aria-hidden />
                </a>
              </div>
            ))}
          </div>

          <div className={styles.fallbackNote}>
            <p>Don&apos;t see your role? We&apos;re always hearing from good agents and operators.</p>
            <a href="mailto:careers@bhomes.com?subject=General%20application">
              Send your CV to careers@bhomes.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
