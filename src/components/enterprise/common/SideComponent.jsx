import { memo } from "react";
import Styles from "../../../assets/css/home.module.css";
import Package from "../../../assets/images/One-TimePackage-big.png";
const SideComponent = memo(() => {
  return (
    <div className={Styles.enterpriseNewScheduleTitleCard}>
      <div>
        <h4 className={Styles.enterpriseNewScheduleText}>Create Shift</h4>
      </div>
      <div>
        <img
          className={Styles.enterpriseOneTimePackageImg}
          src={Package}
          alt="Img"
        />
      </div>
    </div>
  );
});


export default SideComponent