import { Vue, Component, Prop } from "vue-property-decorator";
import styles from "./ComponentLink.scss";

@Component({ name: "ComponentLink" })
export default class ComponentLink extends Vue {
  @Prop({ type: String }) to;

  render() {
    const { to } = this.$props;

    return (
      <li class={styles.NavListItem}>
        <router-link class={styles.ComponentLink} to={to}>
          {this.$slots.default}
        </router-link>
      </li>
    );
  }
}
