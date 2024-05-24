import { Vue, Component } from "vue-property-decorator";
import {
  ContentBox,
  ContentBoxHeader,
  ContentBoxParagraph,
} from "../demo/ContentBox";
import AutoSizer from "./AutoSizer";
import List from "../List";
import styles from "./AutoSizer.example.scss";
import { generateRandomList } from "../demo/utils";

const list = generateRandomList();

@Component({
  name: "AutoSizerExample",
})
export default class AutoSizerExample extends Vue {
  hideDescription = false;

  render() {
    const { hideDescription } = this;

    return (
      <ContentBox style={{ height: 400 }}>
        <ContentBoxHeader
          text="AutoSizer"
          sourceLink="https://github.com/bvaughn/react-virtualized/blob/master/source/AutoSizer/AutoSizer.example.js"
          docsLink="https://github.com/bvaughn/react-virtualized/blob/master/docs/AutoSizer.md"
        />

        <ContentBoxParagraph>
          <label class={styles.checkboxLabel}>
            <input
              aria-label="Hide description (to show resize)?"
              class={styles.checkbox}
              type="checkbox"
              checked={hideDescription}
              onChange={(event) =>
                (this.hideDescription = event.target.checked)
              }
            />
            Hide description (to show resize)?
          </label>
        </ContentBoxParagraph>

        {!hideDescription && (
          <ContentBoxParagraph>
            This component decorates <code>List</code>, <code>Table</code>, or
            any other component and automatically manages its width and height.
            It uses Sebastian Decima's{" "}
            <a
              href="https://github.com/sdecima/javascript-detect-element-resize"
              target="_blank"
            >
              element resize event
            </a>{" "}
            to determine the appropriate size. In this example{" "}
            <code>AutoSizer</code> grows to fill the remaining width and height
            of this flex column.
          </ContentBoxParagraph>
        )}

        <div class={styles.AutoSizerWrapper}>
          <AutoSizer>
            {({ width, height }) => (
              <List
                class={styles.List}
                height={height}
                rowCount={list.size}
                rowHeight={30}
                rowRenderer={this._rowRenderer}
                width={width}
              />
            )}
          </AutoSizer>
        </div>
      </ContentBox>
    );
  }

  _rowRenderer = ({ index, key, style }) => {
    const row = list.get(index);

    return (
      <div key={key} class={styles.row} style={style}>
        {row.name}
      </div>
    );
  };
}
