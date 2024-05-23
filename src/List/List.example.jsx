import { Vue, Component } from "vue-property-decorator";
import styles from "./List.example.scss";
import {
  ContentBox,
  ContentBoxHeader,
  ContentBoxParagraph,
} from "../demo/ContentBox";
import { LabeledInput, InputRow } from "../demo/LabeledInput";
import { generateRandomList } from "../demo/utils";

const list = generateRandomList();

@Component({
  name: "ListExample",
})
export default class ListExample extends Vue {
  listHeight = 1000;

  listRowHeight = 1280;

  overscanRowCount = 10;

  rowCount = list.size;

  scrollToIndex = undefined;

  showScrollingPlaceholder = false;

  useDynamicRowHeight = false;

  render() {
    const {
      listHeight,
      listRowHeight,
      overscanRowCount,
      rowCount,
      scrollToIndex,
      showScrollingPlaceholder,
      useDynamicRowHeight,
    } = this;

    return (
      <ContentBox>
        <ContentBoxHeader
          text="List"
          sourceLink="https://github.com/bvaughn/react-virtualized/blob/master/source/List/List.example.js"
          docsLink="https://github.com/bvaughn/react-virtualized/blob/master/docs/List.md"
        />

        <ContentBoxParagraph>
          The list below is windowed (or "virtualized") meaning that only the
          visible rows are rendered. Adjust its configurable properties below to
          see how it reacts.
        </ContentBoxParagraph>

        <ContentBoxParagraph>
          <label class={styles.checkboxLabel}>
            <input
              aria-label="Use dynamic row heights?"
              checked={useDynamicRowHeight}
              class={styles.checkbox}
              type="checkbox"
              onChange={(event) =>
                (this.useDynamicRowHeight = event.target.checked)
              }
            />
            Use dynamic row heights?
          </label>

          <label class={styles.checkboxLabel}>
            <input
              aria-label="Show scrolling placeholder?"
              checked={showScrollingPlaceholder}
              class={styles.checkbox}
              type="checkbox"
              onChange={(event) =>
                (this.showScrollingPlaceholder = event.target.checked)
              }
            />
            Show scrolling placeholder?
          </label>
        </ContentBoxParagraph>

        <InputRow>
          <LabeledInput
            label="Num rows"
            name="rowCount"
            change={this._onRowCountChange}
            value={rowCount}
          />
          <LabeledInput
            label="Scroll to"
            name="onScrollToRow"
            placeholder="Index..."
            change={this._onScrollToRowChange}
            value={scrollToIndex || ""}
          />
          <LabeledInput
            label="List height"
            name="listHeight"
            change={(event) =>
              (this.listHeight = parseInt(event.target.value, 10) || 1)
            }
            value={listHeight}
          />
          <LabeledInput
            disabled={useDynamicRowHeight}
            label="Row height"
            name="listRowHeight"
            change={(event) =>
              (this.listRowHeight = parseInt(event.target.value, 10) || 1)
            }
            value={listRowHeight}
          />
          <LabeledInput
            label="Overscan"
            name="overscanRowCount"
            change={(event) =>
              (this.overscanRowCount = parseInt(event.target.value, 10) || 0)
            }
            value={overscanRowCount}
          />
        </InputRow>

        <div>
          {/* <AutoSizer disableHeight>
            {({ width }) => (
              <List
                ref="List"
                className={styles.List}
                height={listHeight}
                overscanRowCount={overscanRowCount}
                noRowsRenderer={this._noRowsRenderer}
                rowCount={rowCount}
                rowHeight={
                  useDynamicRowHeight ? this._getRowHeight : listRowHeight
                }
                rowRenderer={this._rowRenderer}
                scrollToIndex={scrollToIndex}
                width={width}
              />
            )}
          </AutoSizer> */}
        </div>
      </ContentBox>
    );
  }

  _onRowCountChange(event) {
    const rowCount = parseInt(event.target.value, 10) || 0;

    this.rowCount = rowCount;
  }

  _onScrollToRowChange(event) {
    const { rowCount } = this;
    let scrollToIndex = Math.min(
      rowCount - 1,
      parseInt(event.target.value, 10),
    );

    if (isNaN(scrollToIndex)) {
      scrollToIndex = undefined;
    }

    this.scrollToIndex = scrollToIndex;
  }
}
