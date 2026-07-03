import { AGENTS } from "@/lib/listings";
import { agentAvatar } from "@/lib/images";
import styles from "./AgentSpotlight.module.css";

const SPOTLIGHT = [AGENTS.james, AGENTS.fatima, AGENTS.omar];

export function AgentSpotlight() {
  return (
    <section className={styles.section}>
      <div className="bh-container">
        <div className="bh-eyebrow">Meet the team</div>
        <h2 className={styles.heading}>The people behind the listings.</h2>
        <p className={styles.sub}>
          Every property on this site has one agent attached to it, not a call centre. Here are
          three of the 250-plus you could end up talking to.
        </p>

        <div className={styles.grid}>
          {SPOTLIGHT.map((agent) => (
            <div key={agent.email} className={styles.card}>
              <span
                className={styles.avatar}
                style={{ backgroundImage: `url(${agentAvatar(agent.email, 400)})` }}
              />
              <div className={styles.role}>{agent.role}</div>
              <div className={styles.name}>{agent.name}</div>
              <div className={styles.meta}>
                {agent.years} years at betterhomes &middot; {agent.deals}+ deals &middot; {agent.area}
              </div>
              <div className={styles.actions}>
                <a href={`tel:${agent.phone.replace(/\s+/g, "")}`} className={styles.actionBtn}>
                  <i className="ph ph-phone" aria-hidden /> Call
                </a>
                <a href={`mailto:${agent.email}`} className={styles.actionBtn}>
                  <i className="ph ph-envelope-simple" aria-hidden /> Email
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
