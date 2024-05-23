import { Vue, Component } from "vue-property-decorator";
import styles from "./Application.scss";

@Component({
  name: "Application",
})
export default class Application extends Vue {
  render() {
    return (
      <div class={styles.demo}>
        <div class={styles.headerRow}></div>

        <router-view />
      </div>
    );
  }
}
