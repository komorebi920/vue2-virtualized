import { Vue, Component } from "vue-property-decorator";
import styles from "./Application.scss";
import NavLink from "./NavLink";
import { TYPES } from "./Icon";
import ComponentLink from "./ComponentLink";

@Component({ name: "Application", components: { NavLink } })
export default class Application extends Vue {
  customElement;

  render() {
    return (
      <div class={styles.demo}>
        <div class={styles.headerRow}>
          <div class={styles.logoRow}>
            <div class={styles.ReactVirtualizedContainer}>
              <img
                alt="Vue virtualized"
                class={styles.logo}
                src="https://cloud.githubusercontent.com/assets/29597/11736841/c0497158-9f87-11e5-8dfe-9c0be97d4286.png"
              />
              <div class={styles.PrimaryLogoText}>Vue</div>
              <div class={styles.SecondaryLogoText}>Virtualized</div>
            </div>

            <ul class={styles.NavList}>
              <NavLink to="/components/List" iconType={TYPES.COMPONENTS}>
                Components
              </NavLink>
              <NavLink to="/wizard" iconType={TYPES.WIZARD}>
                Wizard
              </NavLink>
              <NavLink
                href="https://github.com/bvaughn/react-virtualized"
                iconType={TYPES.SOURCE}
              >
                Source
              </NavLink>
              <NavLink
                href="https://github.com/bvaughn/react-virtualized/tree/master/docs#documentation"
                iconType={TYPES.DOCUMENTATION}
              >
                Documentation
              </NavLink>
              <NavLink
                href="https://github.com/bvaughn/react-virtualized/issues"
                iconType={TYPES.ISSUES}
              >
                Issues
              </NavLink>
            </ul>
          </div>

          <div class={styles.ComponentList}>
            <ComponentLink to="/components/Collection">
              Collection
            </ComponentLink>
            <ComponentLink to="/components/Grid">Grid</ComponentLink>
            <ComponentLink to="/components/List">List</ComponentLink>
            <ComponentLink to="/components/Masonry">Masonry</ComponentLink>
            <ComponentLink to="/components/Table">Table</ComponentLink>
          </div>

          <div class={styles.HighOrderComponentList}>
            <ComponentLink to="/components/ArrowKeyStepper">
              ArrowKeyStepper
            </ComponentLink>
            <ComponentLink to="/components/AutoSizer">AutoSizer</ComponentLink>
            <ComponentLink to="/components/CellMeasurer">
              CellMeasurer
            </ComponentLink>
            <ComponentLink to="/components/ColumnSizer">
              ColumnSizer
            </ComponentLink>
            <ComponentLink to="/components/InfiniteLoader">
              InfiniteLoader
            </ComponentLink>
            <ComponentLink to="/components/MultiGrid">MultiGrid</ComponentLink>
            <ComponentLink to="/components/ScrollSync">
              ScrollSync
            </ComponentLink>
            <ComponentLink to="/components/WindowScroller">
              WindowScroller
            </ComponentLink>
          </div>
        </div>

        <div
          class={styles.bodyStyle}
          ref={(element) => (this.customElement = element)}
        >
          <router-view />
        </div>
      </div>
    );
  }
}
