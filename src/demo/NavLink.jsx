import { Vue, Component, Prop } from "vue-property-decorator";
import Icon from "./Icon";
import styles from "./NavLink.scss";

@Component({ name: "NavLink" })
export default class NavLink extends Vue {
  @Prop({ type: String }) href;

  @Prop({ type: String }) iconType;

  @Prop({ type: String }) to;

  render() {
    const { href, iconType, to } = this.$props;

    let link;
    let icon;

    if (iconType) {
      icon = <Icon class={styles.Icon} type={iconType} />;
    }

    if (to) {
      link = (
        <router-link class={styles.NavLink} to={to}>
          {icon} {this.$slots.default}
        </router-link>
      );
    } else {
      link = (
        <a class={styles.NavLink} href={href} target="_blank">
          {icon} {this.$slots.default}
        </a>
      );
    }

    return <li class={styles.NavListItem}>{link}</li>;
  }
}
