/* @ds-bundle: {"format":3,"namespace":"MeatConnectionDesignSystem_3e7a26","components":[{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"Tag","sourcePath":"components/feedback/Tag.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"IconButton","sourcePath":"components/forms/IconButton.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"}],"sourceHashes":{"components/feedback/Badge.jsx":"58c01535892a","components/feedback/Tag.jsx":"18e9bc33f2f5","components/feedback/Toast.jsx":"2fbe2848ba91","components/forms/Button.jsx":"b809b0a46fc3","components/forms/Checkbox.jsx":"738b25c9ebdf","components/forms/IconButton.jsx":"e16dd5df545a","components/forms/Input.jsx":"05ef96529760","components/forms/Select.jsx":"3be8d46cc0fb","components/forms/Switch.jsx":"df041e421755","components/navigation/Tabs.jsx":"4705eddeb2b4","components/surfaces/Card.jsx":"7431a6f4d1df","ui_kits/butcher-shop/App.jsx":"9da15b45d365","ui_kits/butcher-shop/CartDrawer.jsx":"a5f0da18e563","ui_kits/butcher-shop/Header.jsx":"748326ec3db4","ui_kits/butcher-shop/Hero.jsx":"3b9b9da1699b","ui_kits/butcher-shop/ProductDetail.jsx":"c1ace42a3dad","ui_kits/butcher-shop/ProductGrid.jsx":"4f29ce26e5f6","ui_kits/butcher-shop/shared.jsx":"9b6c2e57f051"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MeatConnectionDesignSystem_3e7a26 = window.MeatConnectionDesignSystem_3e7a26 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/feedback/Badge.jsx
try { (() => {
/** Small status/label pill. Tones: red, ink, success, warning, info, neutral, amber. */
function Badge({
  tone = 'neutral',
  solid = false,
  children,
  style = {}
}) {
  const tones = {
    red: {
      c: 'var(--mc-red)',
      bg: 'rgba(193,15,16,0.10)'
    },
    ink: {
      c: 'var(--mc-charcoal)',
      bg: 'rgba(29,29,29,0.08)'
    },
    success: {
      c: 'var(--mc-success)',
      bg: 'rgba(47,125,69,0.12)'
    },
    warning: {
      c: '#9A6512',
      bg: 'rgba(232,161,60,0.18)'
    },
    info: {
      c: 'var(--mc-info)',
      bg: 'rgba(42,91,140,0.12)'
    },
    amber: {
      c: '#9A6512',
      bg: 'rgba(232,161,60,0.18)'
    },
    neutral: {
      c: 'var(--text-muted)',
      bg: 'var(--mc-ink-100)'
    }
  };
  const t = tones[tone] || tones.neutral;
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    fontFamily: 'var(--font-display)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    fontWeight: 600,
    fontSize: '11px',
    lineHeight: 1,
    padding: '5px 9px',
    borderRadius: 'var(--radius-pill)',
    color: solid ? '#fff' : t.c,
    background: solid ? t.c : t.bg,
    ...style
  };
  return /*#__PURE__*/React.createElement("span", {
    style: base
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Badge.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tag.jsx
try { (() => {
/** Filter/category chip, optionally removable or selectable. */
function Tag({
  children,
  selected = false,
  onRemove,
  onClick,
  style = {}
}) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    fontFamily: 'var(--font-body)',
    fontWeight: 500,
    fontSize: '13px',
    lineHeight: 1,
    padding: '7px 12px',
    borderRadius: 'var(--radius-pill)',
    border: '2px solid ' + (selected ? 'var(--mc-charcoal)' : 'var(--border-default)'),
    background: selected ? 'var(--mc-charcoal)' : 'transparent',
    color: selected ? 'var(--text-on-dark)' : 'var(--text-body)',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'background var(--dur-fast), border-color var(--dur-fast)',
    ...style
  };
  return /*#__PURE__*/React.createElement("span", {
    style: base,
    onClick: onClick
  }, children, onRemove && /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onRemove();
    },
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      display: 'flex',
      padding: 0,
      color: 'inherit'
    },
    "aria-label": "Remove"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }))));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
/** Inline notification banner. Tones: success, danger, warning, info, ink. */
function Toast({
  tone = 'ink',
  title,
  children,
  onClose,
  icon = null,
  style = {}
}) {
  const tones = {
    success: 'var(--mc-success)',
    danger: 'var(--mc-danger)',
    warning: 'var(--mc-warning)',
    info: 'var(--mc-info)',
    ink: 'var(--mc-charcoal)'
  };
  const accent = tones[tone] || tones.ink;
  const base = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    background: 'var(--mc-charcoal)',
    color: 'var(--text-on-dark)',
    borderLeft: '4px solid ' + accent,
    borderRadius: 'var(--radius-md)',
    padding: '14px 16px',
    minWidth: '280px',
    maxWidth: '420px',
    boxShadow: 'var(--shadow-lg)',
    fontFamily: 'var(--font-body)',
    ...style
  };
  return /*#__PURE__*/React.createElement("div", {
    style: base,
    role: "status"
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      color: accent,
      marginTop: '1px'
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      fontWeight: 600,
      fontSize: '13px',
      marginBottom: children ? '3px' : 0
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '13px',
      color: 'var(--mc-ink-200)',
      lineHeight: 1.45
    }
  }, children)), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Dismiss",
    style: {
      border: 'none',
      background: 'transparent',
      color: 'var(--mc-ink-300)',
      cursor: 'pointer',
      display: 'flex',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }))));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Meat Connection primary action button.
 * Variants: primary (red), ink (charcoal), secondary (outline), ghost.
 */
function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  type = 'button',
  iconLeft = null,
  iconRight = null,
  children,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      padding: '8px 14px',
      fontSize: '12px',
      height: '34px'
    },
    md: {
      padding: '11px 20px',
      fontSize: '13px',
      height: '42px'
    },
    lg: {
      padding: '15px 28px',
      fontSize: '15px',
      height: '52px'
    }
  };
  const variants = {
    primary: {
      background: 'var(--action-primary)',
      color: 'var(--text-on-red)',
      border: '2px solid var(--action-primary)'
    },
    ink: {
      background: 'var(--action-ink)',
      color: 'var(--text-on-dark)',
      border: '2px solid var(--action-ink)'
    },
    secondary: {
      background: 'transparent',
      color: 'var(--text-strong)',
      border: '2px solid var(--mc-charcoal)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-strong)',
      border: '2px solid transparent'
    }
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: 'var(--font-display)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    fontWeight: 600,
    borderRadius: 'var(--radius-md)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    width: fullWidth ? '100%' : 'auto',
    transition: 'background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
    boxShadow: 'none',
    boxSizing: 'border-box',
    lineHeight: 1,
    ...sizes[size],
    ...variants[variant],
    ...style
  };
  const hoverBg = {
    primary: 'var(--action-primary-hover)',
    ink: 'var(--action-ink-hover)',
    secondary: 'var(--mc-charcoal)',
    ghost: 'var(--mc-ink-100)'
  };
  const hoverColor = {
    secondary: 'var(--text-on-dark)'
  };
  function over(e) {
    if (disabled) return;
    e.currentTarget.style.background = hoverBg[variant];
    if (hoverColor[variant]) e.currentTarget.style.color = hoverColor[variant];
    e.currentTarget.style.transform = 'translateY(-2px)';
    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
  }
  function out(e) {
    if (disabled) return;
    e.currentTarget.style.background = base.background;
    e.currentTarget.style.color = base.color;
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = 'none';
  }
  function down(e) {
    if (!disabled) e.currentTarget.style.transform = 'translateY(1px)';
  }
  function up(e) {
    if (!disabled) e.currentTarget.style.transform = 'translateY(-2px)';
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    style: base,
    onMouseOver: over,
    onMouseOut: out,
    onMouseDown: down,
    onMouseUp: up
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Square checkbox with red check fill. */
function Checkbox({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  style = {},
  ...rest
}) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const on = isControlled ? checked : internal;
  function toggle(e) {
    if (disabled) return;
    if (!isControlled) setInternal(e.target.checked);
    onChange && onChange(e);
  }
  const box = {
    width: '20px',
    height: '20px',
    flex: 'none',
    border: '2px solid ' + (on ? 'var(--mc-red)' : 'var(--mc-charcoal)'),
    background: on ? 'var(--mc-red)' : 'var(--mc-bone)',
    borderRadius: 'var(--radius-sm)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background var(--dur-fast), border-color var(--dur-fast)'
  };
  const wrap = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    color: 'var(--text-body)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    ...style
  };
  return /*#__PURE__*/React.createElement("label", {
    style: wrap
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: on,
    onChange: toggle,
    disabled: disabled,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    style: box
  }, on && /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "3.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Square icon-only button. Pass a Lucide (or other) SVG node as children.
 * Variants: solid (charcoal), red, outline, ghost.
 */
function IconButton({
  variant = 'ghost',
  size = 'md',
  disabled = false,
  ariaLabel,
  children,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: 34,
    md: 42,
    lg: 52
  };
  const dim = sizes[size];
  const variants = {
    solid: {
      background: 'var(--action-ink)',
      color: 'var(--text-on-dark)',
      border: '2px solid var(--action-ink)'
    },
    red: {
      background: 'var(--action-primary)',
      color: 'var(--text-on-red)',
      border: '2px solid var(--action-primary)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--text-strong)',
      border: '2px solid var(--mc-charcoal)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-strong)',
      border: '2px solid transparent'
    }
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: dim + 'px',
    height: dim + 'px',
    borderRadius: 'var(--radius-md)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition: 'background var(--dur-fast) var(--ease-out)',
    boxSizing: 'border-box',
    padding: 0,
    ...variants[variant],
    ...style
  };
  const hoverBg = {
    solid: 'var(--action-ink-hover)',
    red: 'var(--action-primary-hover)',
    outline: 'var(--mc-charcoal)',
    ghost: 'var(--mc-ink-100)'
  };
  function over(e) {
    if (disabled) return;
    e.currentTarget.style.background = hoverBg[variant];
    if (variant === 'outline') e.currentTarget.style.color = 'var(--text-on-dark)';
  }
  function out(e) {
    if (disabled) return;
    e.currentTarget.style.background = base.background;
    e.currentTarget.style.color = base.color;
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": ariaLabel,
    disabled: disabled,
    style: base,
    onMouseOver: over,
    onMouseOut: out
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Text input with optional label, leading icon, and error state. */
function Input({
  label,
  hint,
  error,
  iconLeft = null,
  size = 'md',
  id,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const sizes = {
    sm: {
      h: 38,
      fs: 13
    },
    md: {
      h: 44,
      fs: 14
    },
    lg: {
      h: 52,
      fs: 16
    }
  };
  const s = sizes[size];
  const borderColor = error ? 'var(--mc-danger)' : focus ? 'var(--mc-charcoal)' : 'var(--border-default)';
  const wrap = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    fontFamily: 'var(--font-body)'
  };
  const lbl = {
    fontFamily: 'var(--font-display)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    fontSize: '11px',
    fontWeight: 600,
    color: 'var(--text-strong)'
  };
  const field = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    height: s.h + 'px',
    padding: '0 14px',
    background: 'var(--mc-bone)',
    border: '2px solid ' + borderColor,
    borderRadius: 'var(--radius-md)',
    boxShadow: focus ? '0 0 0 3px rgba(193,15,16,0.12)' : 'none',
    transition: 'border-color var(--dur-fast), box-shadow var(--dur-fast)'
  };
  const input = {
    flex: 1,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontFamily: 'var(--font-body)',
    fontSize: s.fs + 'px',
    color: 'var(--text-strong)'
  };
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      ...wrap,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: lbl
  }, label), /*#__PURE__*/React.createElement("span", {
    style: field
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      color: 'var(--text-muted)'
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    id: id,
    style: input,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false)
  }, rest))), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '12px',
      color: error ? 'var(--mc-danger)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Styled native select with uppercase label. */
function Select({
  label,
  hint,
  error,
  children,
  id,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const borderColor = error ? 'var(--mc-danger)' : focus ? 'var(--mc-charcoal)' : 'var(--border-default)';
  const wrap = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    fontFamily: 'var(--font-body)'
  };
  const lbl = {
    fontFamily: 'var(--font-display)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    fontSize: '11px',
    fontWeight: 600,
    color: 'var(--text-strong)'
  };
  const field = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    height: '44px',
    background: 'var(--mc-bone)',
    border: '2px solid ' + borderColor,
    borderRadius: 'var(--radius-md)',
    boxShadow: focus ? '0 0 0 3px rgba(193,15,16,0.12)' : 'none'
  };
  const select = {
    appearance: 'none',
    WebkitAppearance: 'none',
    width: '100%',
    height: '100%',
    border: 'none',
    outline: 'none',
    background: 'transparent',
    padding: '0 38px 0 14px',
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    color: 'var(--text-strong)',
    cursor: 'pointer'
  };
  const caret = {
    position: 'absolute',
    right: '14px',
    pointerEvents: 'none',
    width: 0,
    height: 0,
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderTop: '6px solid var(--mc-charcoal)'
  };
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      ...wrap,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: lbl
  }, label), /*#__PURE__*/React.createElement("span", {
    style: field
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: id,
    style: select,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false)
  }, rest), children), /*#__PURE__*/React.createElement("span", {
    style: caret
  })), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '12px',
      color: error ? 'var(--mc-danger)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
/** Toggle switch — charcoal track turns red when on. */
function Switch({
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  label,
  style = {}
}) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const on = isControlled ? checked : internal;
  function toggle() {
    if (disabled) return;
    const next = !on;
    if (!isControlled) setInternal(next);
    onChange && onChange(next);
  }
  const track = {
    width: '44px',
    height: '24px',
    flex: 'none',
    borderRadius: 'var(--radius-pill)',
    background: on ? 'var(--mc-red)' : 'var(--mc-ink-300)',
    position: 'relative',
    transition: 'background var(--dur-med) var(--ease-out)'
  };
  const knob = {
    position: 'absolute',
    top: '3px',
    left: on ? '23px' : '3px',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    background: '#fff',
    boxShadow: 'var(--shadow-sm)',
    transition: 'left var(--dur-med) var(--ease-out)'
  };
  const wrap = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    color: 'var(--text-body)',
    ...style
  };
  return /*#__PURE__*/React.createElement("span", {
    style: wrap,
    onClick: toggle,
    role: "switch",
    "aria-checked": on
  }, /*#__PURE__*/React.createElement("span", {
    style: track
  }, /*#__PURE__*/React.createElement("span", {
    style: knob
  })), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
/** Underline tab bar. items: [{ id, label }]. Controlled via value/onChange. */
function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  style = {}
}) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? (items[0] && items[0].id));
  const active = isControlled ? value : internal;
  function pick(id) {
    if (!isControlled) setInternal(id);
    onChange && onChange(id);
  }
  const bar = {
    display: 'flex',
    gap: '4px',
    borderBottom: '2px solid var(--border-default)',
    fontFamily: 'var(--font-display)',
    ...style
  };
  return /*#__PURE__*/React.createElement("div", {
    style: bar,
    role: "tablist"
  }, items.map(it => {
    const on = it.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      role: "tab",
      "aria-selected": on,
      onClick: () => pick(it.id),
      style: {
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        padding: '12px 14px',
        marginBottom: '-2px',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        fontWeight: 600,
        fontSize: '13px',
        color: on ? 'var(--text-strong)' : 'var(--text-muted)',
        borderBottom: '3px solid ' + (on ? 'var(--mc-red)' : 'transparent'),
        transition: 'color var(--dur-fast), border-color var(--dur-fast)'
      }
    }, it.label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Surface container. Variants: default (bordered), elevated (shadow), inverse (charcoal). */
function Card({
  variant = 'default',
  padding = 'md',
  children,
  style = {},
  ...rest
}) {
  const pads = {
    none: '0',
    sm: '14px',
    md: '20px',
    lg: '28px'
  };
  const variants = {
    default: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      color: 'var(--text-body)'
    },
    elevated: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      boxShadow: 'var(--shadow-md)',
      color: 'var(--text-body)'
    },
    inverse: {
      background: 'var(--surface-inverse)',
      border: '1px solid var(--mc-ink-700)',
      color: 'var(--text-on-dark)'
    }
  };
  const base = {
    borderRadius: 'var(--radius-lg)',
    padding: pads[padding],
    overflow: 'hidden',
    fontFamily: 'var(--font-body)',
    ...variants[variant],
    ...style
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: base
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Card = __ds_scope.Card;

})();
