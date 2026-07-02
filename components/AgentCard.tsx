import type { Agent } from "@/lib/types";
import { agentAvatar } from "@/lib/images";
import styles from "./AgentCard.module.css";

export function AgentCard({ agent }: { agent: Agent }) {
  return (
    <div className={styles.card}>
      <div
        className={styles.portrait}
        style={{ backgroundImage: `url(${agentAvatar(agent.email)})` }}
      />
      <div className={styles.info}>
        <div className={styles.role}>{agent.role}</div>
        <div className={styles.name}>{agent.name}</div>
        <div className={styles.meta}>
          {agent.years} years at Betterhomes &middot; {agent.deals}+ closed deals &middot; {agent.area}
        </div>
        <div className={styles.contactRow}>
          <a href={`tel:${agent.phone.replace(/\s+/g, "")}`} className={styles.contactLink}>
            <i className="ph ph-phone" aria-hidden /> {agent.phone}
          </a>
          <a href={`mailto:${agent.email}`} className={styles.contactLink}>
            <i className="ph ph-envelope-simple" aria-hidden /> {agent.email}
          </a>
        </div>
      </div>
    </div>
  );
}
