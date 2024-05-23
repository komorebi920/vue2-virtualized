import { Vue, Component, Prop } from "vue-property-decorator";
import styles from "./LabeledInput.scss";

@Component({ name: "LabeledInput" })
export class LabeledInput extends Vue {
  @Prop({ type: Boolean }) disabled;

  @Prop({ type: String, required: true }) label;

  @Prop({ type: String, required: true }) name;

  @Prop({ type: Function, required: true }) change;

  @Prop({ type: String }) placeholder;

  @Prop({ type: [String, Number] }) value;

  get labelClassName() {
    const { disabled } = this;
    return { [styles.Label]: true, [styles.LabelDisabled]: disabled };
  }

  render() {
    const {
      disabled,
      label,
      name,
      change,
      placeholder,
      value,
      labelClassName,
    } = this;

    return (
      <div class={styles.LabeledInput}>
        <label class={labelClassName} title={label}>
          {label}
        </label>
        <input
          aria-label={label}
          class={styles.Input}
          name={name}
          placeholder={placeholder}
          onChange={change}
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
    const { $slots } = this;

    return <div class={styles.InputRow}>{$slots.default}</div>;
  }
}
