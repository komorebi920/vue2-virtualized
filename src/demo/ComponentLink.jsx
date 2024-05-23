import { Vue, Component, Prop } from "vue-property-decorator";
import styles from "./ComponentLink.scss";

@Component({ name: "ComponentLink" })
export default class ComponentLink extends Vue {
  @Prop({ type: String }) to;

  render() {
    const { to, $slots } = this;

    return (
      <li class={styles.NavListItem}>
        <router-link class={styles.ComponentLink} to={to}>
          {$slots.default}
        </router-link>
      </li>
    );
  }
}
