# vue2-virtualized

## 介绍

基于 vue2 + jsx 复刻 [react-virtualized@9.22.4](https://github.com/bvaughn/react-virtualized/tree/v9.22.4)

## Why Not...

调研了两个适用于 vue2 的高 star 虚拟滚动组件，[vue-virtual-scroll-list](https://github.com/tangbc/vue-virtual-scroll-list) 和 [vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller)，这两个组件都强大且易用，可以满足大部分开发场景，但是也都存在一个弊端，即撑开滚动容器的方式：

- [vue-virtual-scroll-list](https://github.com/tangbc/vue-virtual-scroll-list) 通过 padding 撑开滚动容器
- [vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller) 通过 min-height 撑开滚动容器

而 padding 和 min-height 在浏览器中都存在最大值的问题，例如在 Chrome 中约为 1.67771e7 像素，因此在极限场景下，这两个组件无法满足需求。

## TODO...

- [x] Grid
- [x] List
- [x] AutoSizer
- [x] InifiniteLoader
- [ ] Collection
- [ ] Masonary
- [ ] Table
- [ ] Collection
- [ ] ArrowKeyStepper
- [ ] CellMeasurer
- [ ] ColumnSizer
- [ ] MultiGrid
- [ ] ScrollSync
- [ ] WindowScroller
