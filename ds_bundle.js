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
    transition: 'background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)',
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
  }
  function out(e) {
    if (disabled) return;
    e.currentTarget.style.background = variants[variant].background;
    e.currentTarget.style.color = variants[variant].color;
  }
  function down(e) {
    if (!disabled) e.currentTarget.style.transform = 'translateY(1px)';
  }
  function up(e) {
    if (!disabled) e.currentTarget.style.transform = 'translateY(0)';
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
    e.currentTarget.style.background = variants[variant].background;
    e.currentTarget.style.color = variants[variant].color;
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

// ui_kits/butcher-shop/App.jsx
try { (() => {
/* Footer + shop toolbar + main App shell */
function Footer() {
  const cols = [['Shop', ['Beef', 'Pork', 'Lamb', 'Poultry', 'Boxes']], ['Learn', ['Our Farms', 'Dry-Aging', 'Cooking Guides', 'Journal']], ['Service', ['Delivery', 'Subscriptions', 'Gift Cards', 'Contact']]];
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--mc-charcoal)',
      color: 'var(--mc-ink-200)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '56px 24px 32px',
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
      gap: '40px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/logo-white.webp",
    alt: "Meat Connection",
    style: {
      height: '32px',
      marginBottom: '16px'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '13px',
      lineHeight: 1.6,
      color: 'var(--mc-ink-400)',
      maxWidth: '240px'
    }
  }, "Independent whole-animal butchery. Sourced responsibly, cut by hand, delivered cold.")), cols.map(([h, items]) => /*#__PURE__*/React.createElement("div", {
    key: h
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      fontWeight: 600,
      fontSize: '13px',
      color: '#fff',
      marginBottom: '14px'
    }
  }, h), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '9px'
    }
  }, items.map(i => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: "#",
    style: {
      color: 'var(--mc-ink-300)',
      textDecoration: 'none',
      fontSize: '13px'
    }
  }, i)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--mc-ink-700)',
      padding: '18px 24px',
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '12px',
      color: 'var(--mc-ink-500)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Meat Connection"), /*#__PURE__*/React.createElement("span", null, "Privacy \xB7 Terms")));
}
function ShopToolbar({
  active,
  onPick
}) {
  const {
    Tag
  } = window.MeatConnectionDesignSystem_3e7a26;
  const cats = ['All', 'Beef', 'Pork', 'Lamb', 'Poultry'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      flexWrap: 'wrap',
      marginBottom: '28px'
    }
  }, cats.map(c => /*#__PURE__*/React.createElement(Tag, {
    key: c,
    selected: active === c,
    onClick: () => onPick(c)
  }, c)));
}
function App() {
  const [view, setView] = React.useState('home'); // home | shop | product
  const [active, setActive] = React.useState(null);
  const [cat, setCat] = React.useState('All');
  const [cartOpen, setCartOpen] = React.useState(false);
  const [cart, setCart] = React.useState([]);
  function add(product, qty = 1) {
    setCart(c => {
      const ex = c.find(i => i.id === product.id);
      if (ex) return c.map(i => i.id === product.id ? {
        ...i,
        qty: i.qty + qty
      } : i);
      return [...c, {
        ...product,
        qty
      }];
    });
    setCartOpen(true);
  }
  function changeQty(item, d) {
    setCart(c => c.map(i => i.id === item.id ? {
      ...i,
      qty: Math.max(1, i.qty + d)
    } : i));
  }
  function remove(item) {
    setCart(c => c.filter(i => i.id !== item.id));
  }
  function open(product) {
    setActive(product);
    setView('product');
    window.scrollTo(0, 0);
  }
  function nav(v) {
    setView(v);
    window.scrollTo(0, 0);
  }
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const filtered = cat === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-page)',
      minHeight: '100vh'
    }
  }, /*#__PURE__*/React.createElement(MCHeader, {
    cartCount: count,
    onCart: () => setCartOpen(true),
    onNav: nav,
    view: view
  }), view === 'home' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MCHero, {
    onShop: () => nav('shop')
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '64px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      marginBottom: '28px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      fontWeight: 600,
      fontSize: '13px',
      color: 'var(--mc-red)'
    }
  }, "From the Counter"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontWeight: 700,
      fontSize: '40px',
      margin: '6px 0 0',
      color: 'var(--text-strong)'
    }
  }, "This Week's Cuts")), /*#__PURE__*/React.createElement("button", {
    onClick: () => nav('shop'),
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      fontWeight: 600,
      fontSize: '14px',
      color: 'var(--text-strong)'
    }
  }, "View All ", /*#__PURE__*/React.createElement(Icon, {
    name: "ArrowRight",
    size: 16
  }))), /*#__PURE__*/React.createElement(MCProductGrid, {
    products: PRODUCTS.slice(0, 4),
    onAdd: add,
    onOpen: open
  }))), view === 'shop' && /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '40px 24px 80px'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontWeight: 700,
      fontSize: '48px',
      margin: '0 0 8px',
      color: 'var(--text-strong)'
    }
  }, "The Counter"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '16px',
      color: 'var(--text-muted)',
      margin: '0 0 28px'
    }
  }, filtered.length, " cuts \xB7 hand-butchered to order"), /*#__PURE__*/React.createElement(ShopToolbar, {
    active: cat,
    onPick: setCat
  }), /*#__PURE__*/React.createElement(MCProductGrid, {
    products: filtered,
    onAdd: add,
    onOpen: open
  })), view === 'product' && active && /*#__PURE__*/React.createElement(MCProductDetail, {
    product: active,
    onAdd: add,
    onBack: () => nav('shop')
  }), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(MCCartDrawer, {
    open: cartOpen,
    items: cart,
    onClose: () => setCartOpen(false),
    onQty: changeQty,
    onRemove: remove
  }));
}
window.MCApp = App;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/butcher-shop/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/butcher-shop/CartDrawer.jsx
try { (() => {
/* Slide-in cart drawer */
function CartDrawer({
  open,
  items,
  onClose,
  onQty,
  onRemove
}) {
  const {
    Button
  } = window.MeatConnectionDesignSystem_3e7a26;
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const freeOver = 75;
  const remaining = Math.max(0, freeOver - subtotal);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(20,20,20,0.5)',
      opacity: open ? 1 : 0,
      pointerEvents: open ? 'auto' : 'none',
      transition: 'opacity var(--dur-med)',
      zIndex: 40
    }
  }), /*#__PURE__*/React.createElement("aside", {
    style: {
      position: 'fixed',
      top: 0,
      right: 0,
      height: '100%',
      width: '400px',
      maxWidth: '92vw',
      background: 'var(--surface-page)',
      boxShadow: 'var(--shadow-lg)',
      transform: open ? 'translateX(0)' : 'translateX(100%)',
      transition: 'transform var(--dur-slow) var(--ease-out)',
      zIndex: 50,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--mc-charcoal)',
      color: 'var(--mc-paper)',
      padding: '20px 22px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      fontWeight: 700,
      fontSize: '20px'
    }
  }, "Your Order"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      border: 'none',
      background: 'transparent',
      color: 'var(--mc-ink-200)',
      cursor: 'pointer',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "X",
    size: 22,
    color: "var(--mc-ink-200)"
  }))), items.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '14px',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ShoppingCart",
    size: 48,
    color: "var(--mc-ink-300)",
    strokeWidth: 1.4
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '15px'
    }
  }, "Your cart is empty.")) : /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '8px 0'
    }
  }, items.map(it => /*#__PURE__*/React.createElement("div", {
    key: it.id,
    style: {
      display: 'flex',
      gap: '14px',
      padding: '16px 22px',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '64px',
      height: '64px',
      flex: 'none',
      background: TONE_BG[it.tone] || 'var(--mc-cream)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-sm)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: it.icon,
    size: 30,
    color: TONE_FG[it.tone] || 'var(--mc-ink-800)',
    strokeWidth: 1.4
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontWeight: 600,
      fontSize: '15px',
      color: 'var(--text-strong)',
      lineHeight: 1.1
    }
  }, it.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '12px',
      color: 'var(--text-muted)',
      margin: '2px 0 8px'
    }
  }, it.weight, " \xB7 ", money(it.price)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-sm)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onQty(it, -1),
    style: miniBtn
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Minus",
    size: 13
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      width: '28px',
      textAlign: 'center',
      fontSize: '13px',
      fontWeight: 600
    }
  }, it.qty), /*#__PURE__*/React.createElement("button", {
    onClick: () => onQty(it, 1),
    style: miniBtn
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Plus",
    size: 13
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: () => onRemove(it),
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      color: 'var(--text-faint)',
      fontSize: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Trash2",
    size: 14,
    color: "var(--text-faint)"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '16px',
      color: 'var(--text-strong)'
    }
  }, money(it.price * it.qty))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 22px',
      borderTop: '2px solid var(--mc-charcoal)',
      background: 'var(--mc-bone)'
    }
  }, items.length > 0 && remaining > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '12px',
      color: 'var(--text-muted)',
      marginBottom: '12px',
      textAlign: 'center'
    }
  }, "Add ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--mc-red)'
    }
  }, money(remaining)), " more for free delivery"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: '14px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      fontWeight: 600,
      fontSize: '14px',
      color: 'var(--text-muted)'
    }
  }, "Subtotal"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '26px',
      color: 'var(--text-strong)'
    }
  }, money(subtotal))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    disabled: items.length === 0
  }, "Checkout"))));
}
const miniBtn = {
  width: '26px',
  height: '26px',
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--mc-charcoal)'
};
window.MCCartDrawer = CartDrawer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/butcher-shop/CartDrawer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/butcher-shop/Header.jsx
try { (() => {
/* Site header — charcoal bar with logo, nav, search & cart */
function Header({
  cartCount,
  onCart,
  onNav,
  view
}) {
  const {
    IconButton,
    Badge
  } = window.MeatConnectionDesignSystem_3e7a26;
  const links = ['Shop', 'Cuts', 'Subscriptions', 'About'];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      background: 'var(--mc-charcoal)',
      color: 'var(--mc-paper)',
      position: 'sticky',
      top: 0,
      zIndex: 30
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 24px',
      height: '72px',
      display: 'flex',
      alignItems: 'center',
      gap: '28px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/logo-white.webp",
    alt: "Meat Connection",
    style: {
      height: '34px',
      cursor: 'pointer'
    },
    onClick: () => onNav('home')
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: '4px',
      flex: 1
    }
  }, links.map(l => /*#__PURE__*/React.createElement("button", {
    key: l,
    onClick: () => onNav('shop'),
    style: {
      border: 'none',
      background: 'transparent',
      color: 'var(--mc-ink-200)',
      cursor: 'pointer',
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      fontWeight: 500,
      fontSize: '14px',
      padding: '8px 12px'
    },
    onMouseOver: e => e.currentTarget.style.color = '#fff',
    onMouseOut: e => e.currentTarget.style.color = 'var(--mc-ink-200)'
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      border: 'none',
      background: 'var(--mc-ink-700)',
      color: 'var(--mc-ink-200)',
      borderRadius: 'var(--radius-md)',
      padding: '9px 14px',
      cursor: 'pointer',
      fontFamily: 'var(--font-body)',
      fontSize: '13px'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Search",
    size: 16,
    color: "var(--mc-ink-200)"
  }), "Search cuts\u2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    variant: "red",
    ariaLabel: "Cart",
    onClick: onCart
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ShoppingCart",
    size: 18,
    color: "#fff"
  })), cartCount > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: '-6px',
      right: '-6px',
      background: '#fff',
      color: 'var(--mc-charcoal)',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '11px',
      minWidth: '20px',
      height: '20px',
      borderRadius: '999px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 5px',
      boxSizing: 'border-box'
    }
  }, cartCount)))));
}
window.MCHeader = Header;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/butcher-shop/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/butcher-shop/Hero.jsx
try { (() => {
/* Homepage hero — charcoal stage with red accent and a menu-board feature tile */
function Hero({
  onShop
}) {
  const {
    Button,
    Badge
  } = window.MeatConnectionDesignSystem_3e7a26;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--mc-charcoal)',
      color: 'var(--mc-paper)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '72px 24px',
      display: 'grid',
      gridTemplateColumns: '1.1fr 0.9fr',
      gap: '48px',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '20px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      height: '2px',
      width: '32px',
      background: 'var(--mc-red)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      letterSpacing: '0.18em',
      fontWeight: 600,
      fontSize: '13px',
      color: 'var(--mc-red-bright)'
    }
  }, "Independent Butcher \xB7 Est. 2014")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontWeight: 700,
      fontSize: '76px',
      lineHeight: 0.96,
      letterSpacing: '-0.01em',
      margin: 0
    }
  }, "Butchered Fresh.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--mc-red-bright)'
    }
  }, "Delivered Cold.")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '18px',
      lineHeight: 1.6,
      color: 'var(--mc-ink-200)',
      maxWidth: '460px',
      margin: '22px 0 32px'
    }
  }, "Whole-animal butchery from regenerative farms, cut to order and shipped in insulated, carbon-neutral packaging."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '12px'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: onShop,
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "ArrowRight",
      size: 18,
      color: "#fff"
    })
  }, "Shop the Counter"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    style: {
      color: 'var(--mc-paper)',
      borderColor: 'var(--mc-ink-400)'
    }
  }, "Our Story")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '28px',
      marginTop: '40px'
    }
  }, [['Free-range', 'sourcing'], ['35-day', 'dry-aging'], ['Next-day', 'delivery']].map(([a, b]) => /*#__PURE__*/React.createElement("div", {
    key: a
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontWeight: 700,
      fontSize: '22px'
    }
  }, a), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '12px',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--mc-ink-400)'
    }
  }, b))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      background: 'var(--mc-kraft)',
      color: 'var(--mc-ink-900)',
      aspectRatio: '4/5',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '28px',
      boxSizing: 'border-box',
      overflow: 'hidden',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: '-30px',
      right: '-20px',
      opacity: 0.2
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Beef",
    size: 300,
    color: "var(--mc-ink-900)",
    strokeWidth: 1
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "ink",
    solid: true
  }, "This Week's Cut")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontWeight: 700,
      fontSize: '52px',
      lineHeight: 0.95
    }
  }, "Dry-Aged Ribeye"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '15px',
      marginTop: '8px'
    }
  }, "35 days aged \xB7 400g \xB7 ", /*#__PURE__*/React.createElement("strong", null, "$32.00")))))));
}
window.MCHero = Hero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/butcher-shop/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/butcher-shop/ProductDetail.jsx
try { (() => {
/* Product detail view */
function ProductDetail({
  product,
  onAdd,
  onBack
}) {
  const {
    Button,
    Badge,
    Tabs,
    Select
  } = window.MeatConnectionDesignSystem_3e7a26;
  const [tab, setTab] = React.useState('desc');
  const [qty, setQty] = React.useState(1);
  const tabBody = {
    desc: product.desc + ' Hand-cut to order by our master butchers and vacuum-sealed for freshness.',
    origin: 'Sourced from a single regenerative farm in the Hawkesbury Valley. Pasture-raised, hormone-free, and traceable to the paddock.',
    cooking: 'Bring to room temperature, season generously, and sear hot. Rest for half the cooking time before slicing against the grain.',
    reviews: '★★★★★ "Best cut I\'ve cooked at home in years." — Verified buyer'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '32px 24px 80px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-body)',
      fontSize: '14px',
      marginBottom: '24px',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ArrowLeft",
    size: 16,
    color: "var(--text-muted)"
  }), " Back to the counter"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '48px',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(ProductImage, {
    product: product,
    height: 460,
    big: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '8px',
      marginBottom: '14px'
    }
  }, product.badge && /*#__PURE__*/React.createElement(Badge, {
    tone: "red",
    solid: true
  }, product.badge), /*#__PURE__*/React.createElement(Badge, {
    tone: "success"
  }, "In Stock")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontWeight: 700,
      fontSize: '48px',
      lineHeight: 0.98,
      margin: 0,
      color: 'var(--text-strong)'
    }
  }, product.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '32px',
      color: 'var(--mc-red)',
      margin: '16px 0'
    }
  }, money(product.price), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '15px',
      color: 'var(--text-muted)',
      fontWeight: 400,
      marginLeft: '6px'
    }
  }, "/ ", product.weight)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '14px',
      alignItems: 'flex-end',
      margin: '24px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '140px'
    }
  }, /*#__PURE__*/React.createElement(Select, {
    label: "Weight"
  }, /*#__PURE__*/React.createElement("option", null, product.weight), /*#__PURE__*/React.createElement("option", null, "2\xD7 ", product.weight), /*#__PURE__*/React.createElement("option", null, "Bulk box"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      border: '2px solid var(--mc-charcoal)',
      borderRadius: 'var(--radius-md)',
      height: '44px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setQty(Math.max(1, qty - 1)),
    style: qtyBtn
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Minus",
    size: 16
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      width: '40px',
      textAlign: 'center',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '18px'
    }
  }, qty), /*#__PURE__*/React.createElement("button", {
    onClick: () => setQty(qty + 1),
    style: qtyBtn
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "Plus",
    size: 16
  })))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    onClick: () => onAdd(product, qty),
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "ShoppingCart",
      size: 18,
      color: "#fff"
    })
  }, "Add ", qty, " to Cart \xB7 ", money(product.price * qty)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '20px',
      margin: '20px 0 28px'
    }
  }, [['Truck', 'Next-day chilled delivery'], ['ShieldCheck', '100% traceable sourcing'], ['Snowflake', 'Insulated packaging']].map(([ic, t]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '12px',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 16,
    color: "var(--mc-red)"
  }), " ", t))), /*#__PURE__*/React.createElement(Tabs, {
    value: tab,
    onChange: setTab,
    items: [{
      id: 'desc',
      label: 'Description'
    }, {
      id: 'origin',
      label: 'Origin'
    }, {
      id: 'cooking',
      label: 'How to Cook'
    }, {
      id: 'reviews',
      label: 'Reviews'
    }]
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '15px',
      lineHeight: 1.65,
      color: 'var(--text-body)',
      marginTop: '18px'
    }
  }, tabBody[tab]))));
}
const qtyBtn = {
  width: '40px',
  height: '40px',
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--mc-charcoal)'
};
window.MCProductDetail = ProductDetail;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/butcher-shop/ProductDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/butcher-shop/ProductGrid.jsx
try { (() => {
/* Product card + responsive grid */
function ProductCard({
  product,
  onAdd,
  onOpen
}) {
  const {
    Card,
    Button,
    Badge
  } = window.MeatConnectionDesignSystem_3e7a26;
  return /*#__PURE__*/React.createElement(Card, {
    variant: "default",
    padding: "none",
    style: {
      display: 'flex',
      flexDirection: 'column',
      cursor: 'pointer',
      transition: 'box-shadow var(--dur-med), transform var(--dur-med)'
    },
    onMouseOver: e => {
      e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
      e.currentTarget.style.transform = 'translateY(-3px)';
    },
    onMouseOut: e => {
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.transform = 'translateY(0)';
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => onOpen(product),
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(ProductImage, {
    product: product,
    height: 200
  }), product.badge && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '14px',
      left: '14px'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "red",
    solid: true
  }, product.badge))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => onOpen(product)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontWeight: 600,
      fontSize: '20px',
      lineHeight: 1.05,
      color: 'var(--text-strong)'
    }
  }, product.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '13px',
      color: 'var(--text-muted)',
      marginTop: '4px'
    }
  }, product.desc)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '24px',
      color: 'var(--text-strong)'
    }
  }, money(product.price), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '13px',
      color: 'var(--text-muted)',
      fontWeight: 400,
      marginLeft: '4px'
    }
  }, "/ ", product.weight)), /*#__PURE__*/React.createElement(Button, {
    variant: "ink",
    size: "sm",
    onClick: e => {
      e.stopPropagation();
      onAdd(product);
    },
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "Plus",
      size: 15,
      color: "#fff"
    })
  }, "Add"))));
}
function ProductGrid({
  products,
  onAdd,
  onOpen
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
      gap: '24px'
    }
  }, products.map(p => /*#__PURE__*/React.createElement(ProductCard, {
    key: p.id,
    product: p,
    onAdd: onAdd,
    onOpen: onOpen
  })));
}
Object.assign(window, {
  MCProductCard: ProductCard,
  MCProductGrid: ProductGrid
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/butcher-shop/ProductGrid.jsx", error: String((e && e.message) || e) }); }

// ui_kits/butcher-shop/shared.jsx
try { (() => {
/* Shared helpers for the Meat Connection butcher-shop UI kit */

// Lucide icon wrapper (programmatic, so we never hand-roll SVG)
function Icon({
  name,
  size = 20,
  color = 'currentColor',
  strokeWidth = 2,
  style = {}
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current || !window.lucide || !window.lucide[name]) return;
    ref.current.innerHTML = '';
    const el = window.lucide.createElement(window.lucide[name]);
    el.setAttribute('width', size);
    el.setAttribute('height', size);
    el.setAttribute('stroke', color);
    el.setAttribute('stroke-width', strokeWidth);
    ref.current.appendChild(el);
  });
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: 'inline-flex',
      ...style
    }
  });
}
const money = n => '$' + n.toFixed(2);

// Product image tiles are "menu-board" placeholders — replace with real photography.
const PRODUCTS = [{
  id: 'ribeye',
  name: 'Dry-Aged Ribeye',
  cat: 'Beef',
  icon: 'Beef',
  price: 32.0,
  weight: '400g',
  badge: 'Dry-Aged',
  tone: 'charcoal',
  desc: '35-day dry-aged, intensely marbled centre-cut ribeye.'
}, {
  id: 'sirloin',
  name: 'Grass-Fed Sirloin',
  cat: 'Beef',
  icon: 'Beef',
  price: 24.0,
  weight: '300g',
  badge: 'Grass-Fed',
  tone: 'kraft',
  desc: 'Lean, full-flavoured sirloin from pasture-raised cattle.'
}, {
  id: 'shortrib',
  name: 'Beef Short Ribs',
  cat: 'Beef',
  icon: 'Beef',
  price: 26.0,
  weight: '700g',
  badge: null,
  tone: 'cream',
  desc: 'Meaty bone-in short ribs — built for low-and-slow.'
}, {
  id: 'wagyu',
  name: 'Wagyu Burger Patties',
  cat: 'Beef',
  icon: 'Beef',
  price: 22.0,
  weight: '4-pack',
  badge: 'Best Seller',
  tone: 'red',
  desc: 'Hand-pressed Wagyu blend patties, 150g each.'
}, {
  id: 'belly',
  name: 'Pork Belly',
  cat: 'Pork',
  icon: 'Ham',
  price: 16.0,
  weight: '500g',
  badge: null,
  tone: 'cream',
  desc: 'Skin-on heritage pork belly for crackling and braises.'
}, {
  id: 'sausage',
  name: 'Italian Sausages',
  cat: 'Pork',
  icon: 'Ham',
  price: 12.0,
  weight: '6-pack',
  badge: null,
  tone: 'kraft',
  desc: 'Coarse-ground fennel & chilli sausages in natural casing.'
}, {
  id: 'lambrack',
  name: 'Frenched Lamb Rack',
  cat: 'Lamb',
  icon: 'Beef',
  price: 38.0,
  weight: '600g',
  badge: 'Premium',
  tone: 'charcoal',
  desc: 'Eight-bone Frenched rack — a clean, elegant roast.'
}, {
  id: 'chicken',
  name: 'Free-Range Chicken',
  cat: 'Poultry',
  icon: 'Drumstick',
  price: 14.0,
  weight: 'Whole',
  badge: 'Free-Range',
  tone: 'cream',
  desc: 'Slow-grown free-range bird, air-chilled for crisp skin.'
}];
const TONE_BG = {
  charcoal: 'var(--mc-charcoal)',
  kraft: 'var(--mc-kraft)',
  cream: 'var(--mc-cream)',
  red: 'var(--mc-red)'
};
const TONE_FG = {
  charcoal: 'var(--mc-paper)',
  kraft: 'var(--mc-ink-900)',
  cream: 'var(--mc-ink-800)',
  red: '#fff'
};

/** Menu-board product image placeholder. */
function ProductImage({
  product,
  height = 220,
  big = false
}) {
  const bg = TONE_BG[product.tone] || 'var(--mc-cream)';
  const fg = TONE_FG[product.tone] || 'var(--mc-ink-800)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: height + 'px',
      background: bg,
      color: fg,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: big ? '28px' : '18px',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '-10px',
      right: '-10px',
      opacity: 0.16
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: product.icon,
    size: big ? 200 : 120,
    color: fg,
    strokeWidth: 1.2
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      letterSpacing: '0.02em',
      lineHeight: 0.98,
      fontWeight: 700,
      fontSize: big ? '54px' : '30px'
    }
  }, product.name), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      fontFamily: 'var(--font-body)',
      fontSize: '12px',
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      opacity: 0.8,
      marginTop: '6px'
    }
  }, product.cat, " \xB7 ", product.weight));
}
Object.assign(window, {
  Icon,
  money,
  PRODUCTS,
  ProductImage,
  TONE_BG,
  TONE_FG
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/butcher-shop/shared.jsx", error: String((e && e.message) || e) }); }

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
