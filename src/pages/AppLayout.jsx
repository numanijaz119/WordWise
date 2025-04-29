import AppNav from "../components/AppNav";
import Sidebar from "../components/Sidebar";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.app}>
      <AppNav />
      <Sidebar />
      <p>App</p>
    </div>
  );
}

export default AppLayout;
