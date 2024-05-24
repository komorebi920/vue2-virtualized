import { Vue, Component, Prop } from "vue-property-decorator";
import styles from "./ContentBox.scss";

@Component({ name: "ContentBox" })
export class ContentBox extends Vue {
  @Prop({ type: Object }) styles;

  render() {
    const { styles: propStyles } = this.$props;

    return (
      <div class={styles.ContentBox} style={propStyles}>
        {this.$slots.default}
      </div>
    );
  }
}

@Component({ name: "ContentBoxHeader" })
export class ContentBoxHeader extends Vue {
  @Prop({ type: String }) text;

  @Prop({ type: String }) sourceLink;

  @Prop({ type: String }) docsLink;

  render() {
    const links = [];

    const { text, sourceLink, docsLink } = this.$props;

    if (sourceLink) {
      links.push(
        <a class={styles.Link} href={sourceLink} key="sourceLink">
          Source
        </a>,
      );
    }

    if (sourceLink && docsLink) {
      links.push(<span key="separator"> | </span>);
    }

    if (docsLink) {
      links.push(
        <a class={styles.Link} href={docsLink} key="docsLink">
          Docs
        </a>,
      );
    }

    return (
      <h1 class={styles.Header}>
        {text}

        {links.length > 0 && <small class={styles.Small}>{links}</small>}
      </h1>
    );
  }
}

@Component({ name: "ContentBoxParagraph" })
export class ContentBoxParagraph extends Vue {
  render() {
    return <div class={styles.Paragraph}>{this.$slots.default}</div>;
  }
}
