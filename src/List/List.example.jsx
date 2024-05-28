import { Vue, Component } from "vue-property-decorator";
import styles from "./List.example.scss";
import AutoSizer from "../AutoSizer";
import List from "./List";
import {
  ContentBox,
  ContentBoxHeader,
  ContentBoxParagraph,
} from "../demo/ContentBox";
import { LabeledInput, InputRow } from "../demo/LabeledInput";
import { generateRandomList } from "../demo/utils";

const list = generateRandomList();

@Component({ name: "ListExample" })
export default class ListExample extends Vue {
  state = {
    listHeight: 600,
    listRowHeight: 50,
    overscanRowCount: 10,
    rowCount: list.size,
    scrollToIndex: undefined,
    showScrollingPlaceholder: false,
    useDynamicRowHeight: false,
  };

  render() {
    const {
      listHeight,
      listRowHeight,
      overscanRowCount,
      rowCount,
      scrollToIndex,
      showScrollingPlaceholder,
      useDynamicRowHeight,
    } = this.state;

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
                this.$set(
                  this.state,
                  "useDynamicRowHeight",
                  event.target.checked,
                )
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
                this.$set(
                  this.state,
                  "showScrollingPlaceholder",
                  event.target.checked,
                )
              }
            />
            Show scrolling placeholder?
          </label>
        </ContentBoxParagraph>

        <InputRow>
          <LabeledInput
            label="Num rows"
            name="rowCount"
            onChange={this._onRowCountChange}
            value={rowCount}
          />
          <LabeledInput
            label="Scroll to"
            name="onScrollToRow"
            placeholder="Index..."
            onChange={this._onScrollToRowChange}
            value={scrollToIndex || ""}
          />
          <LabeledInput
            label="List height"
            name="listHeight"
            onChange={(event) =>
              this.$set(
                this.state,
                "listHeight",
                parseInt(event.target.value, 10) || 1,
              )
            }
            value={listHeight}
          />
          <LabeledInput
            disabled={useDynamicRowHeight}
            label="Row height"
            name="listRowHeight"
            onChange={(event) =>
              this.$set(
                this.state,
                "listRowHeight",
                parseInt(event.target.value, 10) || 1,
              )
            }
            value={listRowHeight}
          />
          <LabeledInput
            label="Overscan"
            name="overscanRowCount"
            onChange={(event) =>
              this.$set(
                this.state,
                "overscanRowCount",
                parseInt(event.target.value, 10) || 1,
              )
            }
            value={overscanRowCount}
          />
        </InputRow>

        <div>
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                ref="List"
                class={styles.List}
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
          </AutoSizer>
        </div>
      </ContentBox>
    );
  }

  _getDatum(index) {
    return list.get(index % list.size);
  }

  _getRowHeight({ index }) {
    return this._getDatum(index).size;
  }

  _noRowsRenderer() {
    return <div class={styles.noRows}>No rows</div>;
  }

  _onRowCountChange(event) {
    const rowCount = parseInt(event.target.value, 10) || 0;

    this.$set(this.state, "rowCount", rowCount);
  }

  _onScrollToRowChange(event) {
    const { rowCount } = this.state;

    let scrollToIndex = Math.min(
      rowCount - 1,
      parseInt(event.target.value, 10),
    );

    if (isNaN(scrollToIndex)) {
      scrollToIndex = undefined;
    }

    this.$set(this.state, "scrollToIndex", scrollToIndex);
  }

  _rowRenderer({ index, isScrolling, key, style }) {
    const { showScrollingPlaceholder, useDynamicRowHeight } = this;

    if (showScrollingPlaceholder && isScrolling) {
      return (
        <div
          class={{
            [styles.row]: true,
            [styles.isScrollingPlaceholder]: true,
          }}
          key={key}
          style={style}
        >
          Scrolling...
        </div>
      );
    }

    const datum = this._getDatum(index);

    let additionalContent;

    if (useDynamicRowHeight) {
      switch (datum.size) {
        case 75:
          additionalContent = <div>It is medium-sized.</div>;
          break;
        case 100:
          additionalContent = (
            <div>
              It is large-sized.
              <br />
              It has a 3rd row.
            </div>
          );
          break;
      }
    }

    return (
      <div class={styles.row} key={key} style={style}>
        <div
          class={styles.letter}
          style={{
            backgroundColor: datum.color,
          }}
        >
          {datum.name.charAt(0)}
        </div>
        <div>
          <div class={styles.name}>{datum.name}</div>
          <div class={styles.index}>This is row {index}</div>
          {additionalContent}
        </div>
        {useDynamicRowHeight && (
          <span class={styles.height}>{datum.size}px</span>
        )}
      </div>
    );
  }
}
