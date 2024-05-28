import { Vue, Component } from "vue-property-decorator";
import {
  ContentBox,
  ContentBoxHeader,
  ContentBoxParagraph,
} from "../demo/ContentBox";
import { LabeledInput, InputRow } from "../demo/LabeledInput";
import AutoSizer from "../AutoSizer";
import Grid from "./Grid";
import styles from "./Grid.example.scss";
import { generateRandomList } from "../demo/utils";

const list = generateRandomList();

@Component({ name: "GridExample" })
export default class GridExample extends Vue {
  state = {
    columnCount: 1000,
    height: 300,
    overscanColumnCount: 0,
    overscanRowCount: 10,
    rowHeight: 40,
    rowCount: 1000,
    scrollToColumn: undefined,
    scrollToRow: undefined,
    useDynamicRowHeight: false,
  };

  render() {
    const {
      columnCount,
      height,
      overscanColumnCount,
      overscanRowCount,
      rowHeight,
      rowCount,
      scrollToColumn,
      scrollToRow,
      useDynamicRowHeight,
    } = this.state;

    return (
      <ContentBox>
        <ContentBoxHeader
          text="Grid"
          sourceLink="https://github.com/bvaughn/react-virtualized/blob/master/source/Grid/Grid.example.js"
          docsLink="https://github.com/bvaughn/react-virtualized/blob/master/docs/Grid.md"
        />

        <ContentBoxParagraph>
          Renders tabular data with virtualization along the vertical and
          horizontal axes. Row heights and column widths must be calculated
          ahead of time and specified as a fixed size or returned by a getter
          function.
        </ContentBoxParagraph>

        <ContentBoxParagraph>
          <label class={styles.checkboxLabel}>
            <input
              aria-label="Use dynamic row height?"
              class={styles.checkbox}
              type="checkbox"
              value={useDynamicRowHeight}
              onChange={(event) =>
                this._updateUseDynamicRowHeights(event.target.checked)
              }
            />
            Use dynamic row height?
          </label>
        </ContentBoxParagraph>

        <InputRow>
          <LabeledInput
            label="Num columns"
            name="columnCount"
            onChange={this._onColumnCountChange}
            value={columnCount}
          />
          <LabeledInput
            label="Num rows"
            name="rowCount"
            onChange={this._onRowCountChange}
            value={rowCount}
          />
          <LabeledInput
            label="Scroll to column"
            name="onScrollToColumn"
            placeholder="Index..."
            onChange={this._onScrollToColumnChange}
            value={scrollToColumn || ""}
          />
          <LabeledInput
            label="Scroll to row"
            name="onScrollToRow"
            placeholder="Index..."
            onChange={this._onScrollToRowChange}
            value={scrollToRow || ""}
          />
          <LabeledInput
            label="List height"
            name="height"
            onChange={(event) =>
              this.$set(
                this.state,
                "height",
                parseInt(event.target.value, 10) || 1,
              )
            }
            value={height}
          />
          <LabeledInput
            disabled={useDynamicRowHeight}
            label="Row height"
            name="rowHeight"
            onChange={(event) =>
              this.$set(
                this.state,
                "rowHeight",
                parseInt(event.target.value, 10) || 1,
              )
            }
            value={rowHeight}
          />
          <LabeledInput
            label="Overscan columns"
            name="overscanColumnCount"
            onChange={(event) =>
              this.$set(
                this.state,
                "overscanColumnCount",
                parseInt(event.target.value, 10) || 1,
              )
            }
            value={overscanColumnCount}
          />
          <LabeledInput
            label="Overscan rows"
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

        <AutoSizer disableHeight>
          {({ width }) => (
            <Grid
              cellRenderer={this._cellRenderer}
              class={styles.BodyGrid}
              columnWidth={this._getColumnWidth}
              columnCount={columnCount}
              height={height}
              noContentRenderer={this._noContentRenderer}
              overscanColumnCount={overscanColumnCount}
              overscanRowCount={overscanRowCount}
              rowHeight={useDynamicRowHeight ? this._getRowHeight : rowHeight}
              rowCount={rowCount}
              scrollToColumn={scrollToColumn}
              scrollToRow={scrollToRow}
              width={width}
            />
          )}
        </AutoSizer>
      </ContentBox>
    );
  }

  _cellRenderer({ columnIndex, key, rowIndex, style }) {
    if (columnIndex === 0) {
      return this._renderLeftSideCell({ columnIndex, key, rowIndex, style });
    } else {
      return this._renderBodyCell({ columnIndex, key, rowIndex, style });
    }
  }

  _getColumnWidth({ index }) {
    switch (index) {
      case 0:
        return 50;
      case 1:
        return 100;
      case 2:
        return 300;
      default:
        return 80;
    }
  }

  _getDatum(index) {
    return list.get(index % list.size);
  }

  _getRowClassName(row) {
    return row % 2 === 0 ? styles.evenRow : styles.oddRow;
  }

  _getRowHeight({ index }) {
    return this._getDatum(index).size;
  }

  _noContentRenderer() {
    return <div class={styles.noCells}>No cells</div>;
  }

  _renderBodyCell({ columnIndex, key, rowIndex, style }) {
    const rowClass = this._getRowClassName(rowIndex);
    const datum = this._getDatum(rowIndex);

    let content;

    switch (columnIndex) {
      case 1:
        content = datum.name;
        break;
      case 2:
        content = datum.random;
        break;
      default:
        content = `r:${rowIndex}, c:${columnIndex}`;
        break;
    }

    const classNames =
      `${rowClass} ${styles.cell}` +
      (columnIndex > 2 ? ` ${styles.centeredCell}` : "");

    return (
      <div class={classNames} key={key} style={style}>
        {content}
      </div>
    );
  }

  _renderLeftSideCell({ key, rowIndex, style }) {
    const datum = this._getDatum(rowIndex);

    const classNames = `${styles.cell} ${styles.letterCell}`;

    // Don't modify styles.
    // These are frozen by React now (as of 16.0.0).
    // Since Grid caches and re-uses them, they aren't safe to modify.
    style = {
      ...style,
      backgroundColor: datum.color,
    };

    return (
      <div class={classNames} key={key} style={style}>
        {datum.name.charAt(0)}
      </div>
    );
  }

  _updateUseDynamicRowHeights(value) {
    this.$set(this.state, "useDynamicRowHeight", value);
  }

  _onColumnCountChange(event) {
    this.$set(this.state, "columnCount", parseInt(event.target.value, 10) || 0);
  }

  _onRowCountChange(event) {
    this.$set(this.state, "rowCount", parseInt(event.target.value, 10) || 0);
  }

  _onScrollToColumnChange(event) {
    const { columnCount } = this.state;
    let scrollToColumn = Math.min(
      columnCount - 1,
      parseInt(event.target.value, 10),
    );

    if (isNaN(scrollToColumn)) {
      scrollToColumn = undefined;
    }

    this.$set(this.state, "scrollToColumn", scrollToColumn);
  }

  _onScrollToRowChange(event) {
    const { rowCount } = this.state;
    let scrollToRow = Math.min(rowCount - 1, parseInt(event.target.value, 10));

    if (isNaN(scrollToRow)) {
      scrollToRow = undefined;
    }

    this.$set(this.state, "scrollToRow", scrollToRow);
  }
}
