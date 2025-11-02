import styles from "./page.module.css";
import {RecaptchaDemo} from "@/common/components/Recaptcha/Demo/RecaptchaDemo";


export default function Home() {
  return (
    <div className={styles.page}>
      <RecaptchaDemo/>
    </div>
  );
}
