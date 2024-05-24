import { Vue, Component, Prop } from "vue-property-decorator";
import styles from "./LabeledInput.scss";

@Component({ name: "LabeledInput" })
export class LabeledInput extends Vue {
  @Prop({ type: Boolean }) disabled;

  @Prop({ type: String, required: true }) label;

  @Prop({ type: String, required: true }) name;

  @Prop({ type: String }) placeholder;

  @Prop({ type: [String, Number] }) value;

  get labelClassName() {
    const { disabled } = this.$props;
    return { [styles.Label]: true, [styles.LabelDisabled]: disabled };
  }

  render() {
    const { disabled, label, name, placeholder, value } = this.$props;
    const { change: onChange } = this.$listeners;

    return (
      <div class={styles.LabeledInput}>
        <label class={this.labelClassName} title={label}>
          {label}
        </label>
        <input
          aria-label={label}
          class={styles.Input}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          disabled={disabled}
        />
      </div>
    );
  }
}

@Component({ name: "InputRow" })
export class InputRow extends Vue {
  render() {
    return <div class={styles.InputRow}>{this.$slots.default}</div>;
  }
}
