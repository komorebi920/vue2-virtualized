import { Vue, Component } from "vue-property-decorator";
import {
  ContentBox,
  ContentBoxHeader,
  ContentBoxParagraph,
} from "../demo/ContentBox";
import AutoSizer from "../AutoSizer";
import InfiniteLoader from "./InfiniteLoader";
import List from "../List";
import styles from "./InfiniteLoader.example.scss";
import { generateRandomList } from "../demo/utils";

const STATUS_LOADING = 1;
const STATUS_LOADED = 2;
const _timeoutIdMap = {};
const list = generateRandomList();

@Component({ name: "InfiniteLoaderExample" })
export default class InfiniteLoaderExample extends Vue {
  state = {
    loadedRowCount: 0,
    loadedRowsMap: {},
    loadingRowCount: 0,
  };

  beforeDestroy() {
    Object.keys(_timeoutIdMap).forEach((timeoutId) => {
      clearTimeout(timeoutId);
    });
  }

  render() {
    const { loadedRowCount, loadingRowCount } = this.state;

    return (
      <ContentBox>
        <ContentBoxHeader
          text="InfiniteLoader"
          sourceLink="https://github.com/bvaughn/react-virtualized/blob/master/source/InfiniteLoader/InfiniteLoader.example.js"
          docsLink="https://github.com/bvaughn/react-virtualized/blob/master/docs/InfiniteLoader.md"
        />

        <ContentBoxParagraph>
          This component manages just-in-time data fetching to ensure that the
          all visible rows have been loaded. It also uses a threshold to
          determine how early to pre-fetch rows (before a user scrolls to them).
        </ContentBoxParagraph>

        <ContentBoxParagraph>
          <div class={styles.cacheButtonAndCountRow}>
            <button class={styles.button} onClick={this._clearData}>
              Flush Cached Data
            </button>

            <div class={styles.cacheCountRow}>
              {loadingRowCount} loading, {loadedRowCount} loaded
            </div>
          </div>
        </ContentBoxParagraph>

        <InfiniteLoader
          isRowLoaded={this._isRowLoaded}
          loadMoreRows={this._loadMoreRows}
          rowCount={list.size}
        >
          {({ onRowsRendered, registerChild }) => (
            <AutoSizer disableHeight>
              {({ width }) => (
                <List
                  ref={registerChild}
                  class={styles.List}
                  height={600}
                  onRowsRendered={onRowsRendered}
                  rowCount={list.size}
                  rowHeight={30}
                  rowRenderer={this._rowRenderer}
                  width={width}
                />
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>
      </ContentBox>
    );
  }

  _clearData() {
    this.$set(this.state, "loadedRowCount", 0);
    this.$set(this.state, "loadedRowsMap", {});
    this.$set(this.state, "loadingRowCount", 0);
  }

  _isRowLoaded({ index }) {
    const { loadedRowsMap } = this.state;
    return !!loadedRowsMap[index]; // STATUS_LOADING or STATUS_LOADED
  }

  _loadMoreRows({ startIndex, stopIndex }) {
    const { loadedRowsMap, loadingRowCount } = this.state;
    const increment = stopIndex - startIndex + 1;

    for (let i = startIndex; i <= stopIndex; i++) {
      loadedRowsMap[i] = STATUS_LOADING;
    }

    this.$set(this.state, "loadingRowCount", loadingRowCount + increment);

    const timeoutId = setTimeout(() => {
      const { loadedRowCount, loadingRowCount } = this.state;

      delete _timeoutIdMap[timeoutId];

      for (let i = startIndex; i <= stopIndex; i++) {
        loadedRowsMap[i] = STATUS_LOADED;
      }

      this.$set(this.state, "loadingRowCount", loadingRowCount - increment);
      this.$set(this.state, "loadedRowCount", loadedRowCount + increment);

      promiseResolver();
    }, 1000 + Math.round(Math.random() * 2000));

    _timeoutIdMap[timeoutId] = true;

    let promiseResolver;

    return new Promise((resolve) => {
      promiseResolver = resolve;
    });
  }

  _rowRenderer({ index, key, style }) {
    const { loadedRowsMap } = this.state;

    const row = list.get(index);
    let content;

    if (loadedRowsMap[index] === STATUS_LOADED) {
      content = row.name;
    } else {
      content = (
        <div class={styles.placeholder} style={{ width: `${row.size}px` }} />
      );
    }

    return (
      <div
        class={styles.row}
        key={key}
        style={{
          ...style,
          background: row.color,
          color: "#fff",
          "font-size": "16px",
          "font-weight": "bold",
        }}
      >
        {content}
      </div>
    );
  }
}
