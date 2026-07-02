import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { EstBadge } from "@/components/Wordmark";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact us — betterhomes",
  description: "Get in touch with betterhomes for buying, renting, selling, or managing property in Dubai.",
};

const DEPARTMENTS = [
  { label: "Sales enquiries", email: "sales@bhomes.com", detail: "Buying a home or investment property" },
  { label: "Leasing & rentals", email: "leasing@bhomes.com", detail: "Renting an apartment, villa, or townhouse" },
  { label: "Property management", email: "management@bhomes.com", detail: "Landlords and owners' associations" },
  { label: "Careers", email: "careers@bhomes.com", detail: "Joining betterhomes as an agent or in operations" },
];

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className="bh-container">
          <div className="bh-eyebrow">Get in touch</div>
          <h1 className={styles.title}>Contact us.</h1>
          <p className={styles.subtitle}>
            Whether you&apos;re buying, renting, selling, or just weighing up a move, a specialist
            who knows the neighbourhood will get back to you &mdash; usually within one business day.
          </p>
        </div>
      </div>

      <div className={`bh-container ${styles.layout}`}>
        <div className={styles.formCol}>
          <ContactForm />
        </div>

        <div className={styles.infoCol}>
          <div className={styles.infoCard}>
            <div className={styles.infoTitle}>Head office</div>
            <p className={styles.infoLine}>
              <i className="ph ph-map-pin" aria-hidden /> Building 3, Emaar Square, Sheikh Zayed Road,
              Dubai, UAE
            </p>
            <p className={styles.infoLine}>
              <i className="ph ph-phone" aria-hidden />{" "}
              <a href="tel:+97145550100">+971 4 555 0100</a>
            </p>
            <p className={styles.infoLine}>
              <i className="ph ph-envelope-simple" aria-hidden />{" "}
              <a href="mailto:hello@bhomes.com">hello@bhomes.com</a>
            </p>
            <p className={styles.infoLine}>
              <i className="ph ph-whatsapp-logo" aria-hidden />{" "}
              <a href="https://wa.me/97145550100" target="_blank" rel="noopener noreferrer">
                Message us on WhatsApp
              </a>
            </p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoTitle}>Opening hours</div>
            <div className={styles.hoursRow}>
              <span>Sunday &ndash; Thursday</span>
              <span>9:00am &ndash; 7:00pm</span>
            </div>
            <div className={styles.hoursRow}>
              <span>Saturday</span>
              <span>10:00am &ndash; 4:00pm</span>
            </div>
            <div className={styles.hoursRow}>
              <span>Friday</span>
              <span>Closed</span>
            </div>
          </div>

          <div className={styles.estCard}>
            <EstBadge color="var(--bh-slate-blue)" size={18} />
            <p>Homegrown in Dubai since 1986. Trust better, get better.</p>
          </div>
        </div>
      </div>

      <div className={`bh-container ${styles.departments}`}>
        <h2 className={styles.departmentsTitle}>Reach the right team directly.</h2>
        <div className={styles.departmentsGrid}>
          {DEPARTMENTS.map((dept) => (
            <a key={dept.email} href={`mailto:${dept.email}`} className={styles.departmentCard}>
              <div className={styles.departmentLabel}>{dept.label}</div>
              <p className={styles.departmentDetail}>{dept.detail}</p>
              <span className={styles.departmentEmail}>
                {dept.email} <i className="ph ph-arrow-right" aria-hidden />
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
