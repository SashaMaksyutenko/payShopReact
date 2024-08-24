import Link from "next/link";
import styles from "./styles.module.scss";
export default function Header() {
  return (
    <div className={styles.header}>
      <ul >
        <li>
          <Link className={styles.noUnderline} href="">Store</Link>
        </li>
        <li>
          <Link className={styles.noUnderline} href="">Electronics</Link>
        </li>
        <li>
          <Link className={styles.noUnderline} href="">Watches</Link>
        </li>
      </ul>
    </div>
  );
}