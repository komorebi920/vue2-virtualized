import { Vue, Component, Prop } from "vue-property-decorator";
import Grid, { defaultOverscanIndicesGetter } from "../Grid";

/**
 * It is inefficient to create and manage a large list of DOM elements within a scrolling container
 * if only a few of those elements are visible. The primary purpose of this component is to improve
 * performance by only rendering the DOM nodes that a user is able to see based on their current
 * scroll position.
 *
 * This component renders a virtualized list of elements with either fixed or dynamic heights.
 */

@Component({
  name: "List",
  components: { Grid },
})
export default class List extends Vue {
  @Prop({ type: String }) "aria-label";

  /**
   * Removes fixed height from the scrollingContainer so that the total height
   * of rows can stretch the window. Intended for use with WindowScroller
   */
  @Prop({ type: Boolean, default: false }) autoHeight;

  /**
   * Used to estimate the total height of a List before all of its rows have actually been measured.
   * The estimated total height is adjusted as rows are rendered.
   */
  @Prop({ type: Number, default: 30 }) estimatedRowSize;

  /** Height constraint for list (determines how many actual rows are rendered) */
  @Prop({ type: Number, default: 30 }) height;

  /** Optional renderer to be used in place of rows when rowCount is 0 */
  @Prop({ type: Function }) noRowsRenderer;

  /** Callback invoked with information about the slice of rows that were just rendered.  */
  // @Prop({ type: Function }) onRowsRendered;

  /**
   * Callback invoked whenever the scroll offset changes within the inner scrollable region.
   * This callback can be used to sync scrolling between lists, tables, or grids.
   */
  // @Prop({ type: Function }) onScroll;

  /** See Grid#overscanIndicesGetter */
  @Prop({ type: Function, default: defaultOverscanIndicesGetter })
  overscanIndicesGetter;

  /**
   * Number of rows to render above/below the visible bounds of the list.
   * These rows can help for smoother scrolling on touch devices.
   */
  @Prop({ type: Number, default: 10 }) overscanRowCount;

  /** Either a fixed row height (number) or a function that returns the height of a row given its index.  */
  @Prop({ type: [Function, Number] }) rowHeight;

  /** Responsible for rendering a row given an index; ({ index: number }): node */
  @Prop({ type: Function }) rowRenderer;

  /** Number of rows in list. */
  @Prop({ type: Number }) rowCount;

  /** See Grid#scrollToAlignment */
  @Prop({ type: String, default: "auto" }) scrollToAlignment;

  /** Row index to ensure visible (by forcefully scrolling if necessary) */
  @Prop({ type: Number, default: -1 }) scrollToIndex;

  /** Vertical offset. */
  @Prop({ type: Number }) scrollTop;

  /** Tab index for focus */
  @Prop({ type: Number }) tabIndex;

  /** Width of list */
  @Prop({ type: Number }) width;

  Grid;

  forceUpdateGrid() {
    if (this.Grid) {
      this.Grid.forceUpdate();
    }
  }

  /** See Grid#getOffsetForCell */
  getOffsetForRow({ alignment, index }) {
    if (this.Grid) {
      const { scrollTop } = this.Grid.getOffsetForCell({
        alignment,
        rowIndex: index,
        columnIndex: 0,
      });

      return scrollTop;
    }
    return 0;
  }

  /** CellMeasurer compatibility */
  invalidateCellSizeAfterRender({ columnIndex, rowIndex }) {
    if (this.Grid) {
      this.Grid.invalidateCellSizeAfterRender({
        rowIndex,
        columnIndex,
      });
    }
  }

  /** See Grid#measureAllCells */
  measureAllRows() {
    if (this.Grid) {
      this.Grid.measureAllCells();
    }
  }

  /** CellMeasurer compatibility */
  recomputeGridSize({ columnIndex = 0, rowIndex = 0 }) {
    if (this.Grid) {
      this.Grid.recomputeGridSize({
        rowIndex,
        columnIndex,
      });
    }
  }

  /** See Grid#recomputeGridSize */
  recomputeRowHeights(index = 0) {
    if (this.Grid) {
      this.Grid.recomputeGridSize({
        rowIndex: index,
        columnIndex: 0,
      });
    }
  }

  /** See Grid#scrollToPosition */
  scrollToPosition(scrollTop = 0) {
    if (this.Grid) {
      this.Grid.scrollToPosition({ scrollTop });
    }
  }

  /** See Grid#scrollToCell */
  scrollToRow(index = 0) {
    if (this.Grid) {
      this.Grid.scrollToCell({
        columnIndex: 0,
        rowIndex: index,
      });
    }
  }

  render() {
    const { noRowsRenderer, scrollToIndex, width } = this.$props;

    return (
      <Grid
        {...{ props: this.$props }}
        autoContainerWidth
        cellRenderer={this._cellRenderer}
        class="ReactVirtualized__List"
        columnWidth={width}
        columnCount={1}
        noContentRenderer={noRowsRenderer}
        onScroll={this._onScroll}
        onSectionRendered={this._onSectionRendered}
        ref={this._setRef}
        scrollToRow={scrollToIndex}
      />
    );
  }

  _cellRenderer({ parent, rowIndex, style, isScrolling, isVisible, key }) {
    const { rowRenderer } = this.$props;

    // TRICKY The style object is sometimes cached by Grid.
    // This prevents new style objects from bypassing shallowCompare().
    // However as of React 16, style props are auto-frozen (at least in dev mode)
    // Check to make sure we can still modify the style before proceeding.
    // https://github.com/facebook/react/commit/977357765b44af8ff0cfea327866861073095c12#commitcomment-20648713
    const widthDescriptor = Object.getOwnPropertyDescriptor(style, "width");
    if (widthDescriptor && widthDescriptor.writable) {
      // By default, List cells should be 100% width.
      // This prevents them from flowing under a scrollbar (if present).
      style.width = "100%";
    }

    return rowRenderer({
      index: rowIndex,
      style,
      isScrolling,
      isVisible,
      key,
      parent,
    });
  }

  _setRef(ref) {
    this.Grid = ref;
  }

  _onScroll({ clientHeight, scrollHeight, scrollTop }) {
    const { scroll: onScroll } = this.$listeners;

    typeof onScroll === "function" &&
      onScroll({ clientHeight, scrollHeight, scrollTop });
  }

  _onSectionRendered({
    rowOverscanStartIndex,
    rowOverscanStopIndex,
    rowStartIndex,
    rowStopIndex,
  }) {
    const { rowsRendered: onRowsRendered } = this.$listeners;

    typeof onRowsRendered === "function" &&
      onRowsRendered({
        overscanStartIndex: rowOverscanStartIndex,
        overscanStopIndex: rowOverscanStopIndex,
        startIndex: rowStartIndex,
        stopIndex: rowStopIndex,
      });
  }
}
