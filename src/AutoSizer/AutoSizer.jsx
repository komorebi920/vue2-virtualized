import { Vue, Component, Prop } from "vue-property-decorator";
import createDetectElementResize from "@/vendor/detectElementResize";

let _parentNode;

let _autoSizer;

let _window; // uses any instead of Window because Flow doesn't have window type

let _detectElementResize;

@Component({ name: "AutoSizer" })
export default class AutoSizer extends Vue {
  /** Optional custom CSS class name to attach to root AutoSizer element.  */
  @Prop({ type: String }) className;

  /** Default height to use for initial render; useful for SSR */
  @Prop({ type: Number }) defaultHeight;

  /** Default width to use for initial render; useful for SSR */
  @Prop({ type: Number }) defaultWidth;

  /** Disable dynamic :height property */
  @Prop({ type: Boolean, default: false }) disableHeight;

  /** Disable dynamic :width property */
  @Prop({ type: Boolean, default: false }) disableWidth;

  /** Nonce of the inlined stylesheet for Content Security Policy */
  @Prop({ type: String }) nonce;

  /** Callback to be invoked on-resize */
  // @Prop({ type: Function }) onResize;

  height = 0;

  width = 0;

  created() {
    this.height = this.$props.defaultHeight || 0;
    this.width = this.$props.defaultWidth || 0;
  }

  mounted() {
    const { nonce } = this.$props;

    if (
      _autoSizer &&
      _autoSizer.parentNode &&
      _autoSizer.parentNode.ownerDocument &&
      _autoSizer.parentNode.ownerDocument.defaultView &&
      _autoSizer.parentNode instanceof
        _autoSizer.parentNode.ownerDocument.defaultView.HTMLElement
    ) {
      // Delay access of parentNode until mount.
      // This handles edge-cases where the component has already been unmounted before its ref has been set,
      // As well as libraries like react-lite which have a slightly different lifecycle.
      _parentNode = _autoSizer.parentNode;
      _window = _autoSizer.parentNode.ownerDocument.defaultView;

      // Defer requiring resize handler in order to support server-side rendering.
      // See issue #41
      _detectElementResize = createDetectElementResize(nonce, _window);
      _detectElementResize.addResizeListener(_parentNode, this._onResize);

      this._onResize();
    }
  }

  beforeDestroy() {
    if (_detectElementResize && _parentNode) {
      _detectElementResize.removeResizeListener(_parentNode, this._onResize);
    }
  }

  render() {
    const { className, disableHeight, disableWidth } = this.$props;
    const { height, width } = this;

    // Outer div should not force width/height since that may prevent containers from shrinking.
    // Inner component should overflow and use calculated width/height.
    // See issue #68 for more information.
    const outerStyle = { overflow: "visible" };
    const childParams = {};

    if (!disableHeight) {
      outerStyle.height = 0;
      childParams.height = height;
    }

    if (!disableWidth) {
      outerStyle.width = 0;
      childParams.width = width;
    }

    /**
     * TODO: Avoid rendering children before the initial measurements have been collected.
     * At best this would just be wasting cycles.
     * Add this check into version 10 though as it could break too many ref callbacks in version 9.
     * Note that if default width/height props were provided this would still work with SSR.
    if (
      height !== 0 &&
      width !== 0
    ) {
      child = children({ height, width })
    }
    */

    return (
      <div class={className} ref={this._setRef} style={outerStyle}>
        {this.$scopedSlots.default(childParams)}
      </div>
    );
  }

  _onResize() {
    const { disableHeight, disableWidth } = this.$props;
    const { resize: onResize } = this.$listeners;

    if (_parentNode) {
      // Guard against AutoSizer component being removed from the DOM immediately after being added.
      // This can result in invalid style values which can result in NaN values if we don't handle them.
      // See issue #150 for more context.

      const height = _parentNode.offsetHeight || 0;
      const width = _parentNode.offsetWidth || 0;

      const win = _window || window;
      const style = win.getComputedStyle(_parentNode) || {};
      const paddingLeft = parseInt(style.paddingLeft, 10) || 0;
      const paddingRight = parseInt(style.paddingRight, 10) || 0;
      const paddingTop = parseInt(style.paddingTop, 10) || 0;
      const paddingBottom = parseInt(style.paddingBottom, 10) || 0;

      const newHeight = height - paddingTop - paddingBottom;
      const newWidth = width - paddingLeft - paddingRight;

      if (
        (!disableHeight && this.height !== newHeight) ||
        (!disableWidth && this.width !== newWidth)
      ) {
        this.height = height - paddingTop - paddingBottom;
        this.width = width - paddingLeft - paddingRight;

        typeof onResize === "function" && onResize({ height, width });
      }
    }
  }

  _setRef(autoSizer) {
    _autoSizer = autoSizer;
  }
}
