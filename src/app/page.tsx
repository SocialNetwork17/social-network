import styles from "./page.module.css";
import {SuperCheckboxDemo} from "@/common/components/SuperCheckbox/Demo/SuperCheckboxDemo";

export default function Home() {
  return (
    <div className={styles.page}>
      <SuperCheckboxDemo/>
    </div>
  );
}
