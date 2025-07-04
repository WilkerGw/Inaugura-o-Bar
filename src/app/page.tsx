import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.main}>
        <header className={styles.header}>
          <p className={styles.txtHeader}>Rua Augusta, 236</p>
          <Image src="/beer-logo.png" alt="logo" width={70} height={70} className={styles.logoBeer}></Image>
          <p className={styles.txtHeader}>11 99999 9999</p>
        </header>
        <div className={styles.heroSection}>
          <Image src="/logo.png" alt="hero" width={500} height={500} className={styles.logo}></Image>
          <h1>14 Ago, 2025</h1>
          <h2>Save the date</h2>
        </div>
      </section>
      <section className={styles.secondary}>

      </section>
    </div>
  );
}
