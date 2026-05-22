// Sketchy wireframe primitives — hand-drawn vibe, b&w + Composed purple accent
// All components attach to window so other Babel scripts can use them.

const PURPLE = '#6C5CE7';
const INK = '#1a1a2e';
const MUTED = '#7a7a85';
const HILITE = '#fff2a8';

// Sketchy / wobbly border-radius generator — makes boxes feel hand-drawn.
function roughRadius(seed = 0) {
  const r = (n) => 4 + ((seed * 13 + n * 7) % 5);
  return `${r(1)}px ${r(2)}px ${r(3)}px ${r(4)}px / ${r(5)}px ${r(6)}px ${r(7)}px ${r(8)}px`;
}

// Slight per-element tilt so straight edges don't feel CAD-perfect.
function tilt(seed = 0) {
  const a = ((seed * 31) % 7 - 3) * 0.06;
  return `rotate(${a.toFixed(2)}deg)`;
}

// Box — the workhorse "drawn rectangle".
function Box({ children, dashed, filled, ghost, accent, seed = 0, style, className = '', ...rest }) {
  const s = {
    border: `${dashed ? '1.6px dashed' : '1.6px solid'} ${accent ? PURPLE : INK}`,
    borderRadius: roughRadius(seed),
    background: filled ? '#f3f1ec' : ghost ? 'transparent' : '#fff',
    color: INK,
    padding: '10px 12px',
    transform: tilt(seed),
    ...style,
  };
  return <div className={'wf-box ' + className} style={s} {...rest}>{children}</div>;
}

// Sticky-note / annotation in margin
function Note({ children, color = '#fef4a8', rotate = -2, style }) {
  return (
    <div style={{
      fontFamily: 'Caveat, cursive',
      fontSize: 18,
      lineHeight: 1.15,
      background: color,
      color: '#5a4a2a',
      padding: '8px 12px',
      borderRadius: '6px 4px 8px 5px / 4px 7px 5px 6px',
      boxShadow: '1px 2px 0 rgba(0,0,0,0.08)',
      transform: `rotate(${rotate}deg)`,
      display: 'inline-block',
      maxWidth: 240,
      ...style,
    }}>{children}</div>
  );
}

// Handwritten label
function H({ children, size = 16, weight = 400, color = INK, style, as: As = 'span' }) {
  return <As style={{ fontFamily: 'Architects Daughter, cursive', fontSize: size, fontWeight: weight, color, lineHeight: 1.25, ...style }}>{children}</As>;
}

// "Hand-drawn" title
function Hand({ children, size = 28, color = INK, style, as: As = 'span' }) {
  return <As style={{ fontFamily: 'Caveat, cursive', fontSize: size, fontWeight: 700, color, lineHeight: 1, letterSpacing: '0.01em', ...style }}>{children}</As>;
}

// Sketchy button
function Btn({ children, primary, ghost, small, seed = 0, style, ...rest }) {
  return (
    <span style={{
      fontFamily: 'Architects Daughter, cursive',
      fontSize: small ? 13 : 15,
      padding: small ? '4px 10px' : '6px 14px',
      border: `1.6px solid ${INK}`,
      background: primary ? PURPLE : ghost ? 'transparent' : '#fff',
      color: primary ? '#fff' : INK,
      borderColor: primary ? PURPLE : INK,
      borderRadius: roughRadius(seed),
      transform: tilt(seed + 1),
      display: 'inline-block',
      whiteSpace: 'nowrap',
      ...style,
    }} {...rest}>{children}</span>
  );
}

// Pill / chip
function Chip({ children, selected, seed = 0, style }) {
  return (
    <span style={{
      fontFamily: 'Architects Daughter, cursive',
      fontSize: 13,
      padding: '3px 10px',
      border: `1.4px solid ${selected ? PURPLE : INK}`,
      background: selected ? `${PURPLE}1a` : '#fff',
      color: selected ? PURPLE : INK,
      borderRadius: '999px',
      display: 'inline-block',
      whiteSpace: 'nowrap',
      transform: tilt(seed + 4),
      ...style,
    }}>{children}</span>
  );
}

// Highlight (yellow marker effect)
function HL({ children, style }) {
  return <span style={{ background: `linear-gradient(180deg, transparent 50%, ${HILITE} 50%)`, padding: '0 2px', ...style }}>{children}</span>;
}

// A "drawn line" — for connectors, dividers
function Line({ vertical, dashed, color = INK, length = 40, thickness = 1.4, style }) {
  return (
    <div style={{
      width: vertical ? thickness : length,
      height: vertical ? length : thickness,
      background: dashed ? `repeating-linear-gradient(${vertical ? '180deg' : '90deg'}, ${color} 0 4px, transparent 4px 8px)` : color,
      ...style,
    }} />
  );
}

// Image placeholder — diagonal-cross box
function PH({ w = 80, h = 60, label, style }) {
  return (
    <div style={{
      width: w, height: h, position: 'relative',
      border: `1.4px solid ${INK}`,
      borderRadius: roughRadius(w + h),
      background: `
        linear-gradient(to top right, transparent calc(50% - 1px), ${INK} calc(50% - 1px), ${INK} calc(50% + 0px), transparent calc(50% + 1px)),
        linear-gradient(to top left, transparent calc(50% - 1px), ${INK} calc(50% - 1px), ${INK} calc(50% + 0px), transparent calc(50% + 1px)),
        #fff
      `,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Architects Daughter, cursive', fontSize: 11, color: MUTED,
      ...style,
    }}>
      {label && <span style={{ background: '#fff', padding: '0 4px' }}>{label}</span>}
    </div>
  );
}

// Platform logo card — multi-select cards on screen 1
function PlatformCard({ name, tag, selected, w = 120, h = 96 }) {
  return (
    <div style={{
      width: w, height: h, position: 'relative',
      border: `${selected ? '2.4px' : '1.6px'} solid ${selected ? PURPLE : INK}`,
      borderRadius: roughRadius(name.length),
      background: selected ? `${PURPLE}10` : '#fff',
      padding: '8px 10px',
      transform: tilt(name.length),
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}>
      {/* mini logo placeholder — circle + first letter */}
      <div style={{
        width: 28, height: 28, borderRadius: '50%',
        border: `1.4px solid ${INK}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Caveat, cursive', fontSize: 18, fontWeight: 700,
      }}>{name[0]}</div>
      <div>
        <div style={{ fontFamily: 'Architects Daughter, cursive', fontSize: 15, fontWeight: 700 }}>{name}</div>
        {tag && <div style={{ fontFamily: 'Architects Daughter, cursive', fontSize: 11, color: MUTED }}>{tag}</div>}
      </div>
      {selected && (
        <div style={{
          position: 'absolute', top: -8, right: -8,
          width: 22, height: 22, borderRadius: '50%',
          background: PURPLE, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Caveat, cursive', fontSize: 16, fontWeight: 700,
          border: '1.6px solid #fff',
        }}>✓</div>
      )}
    </div>
  );
}

// KB doc row — used in sidebars
function KbDoc({ title, kind, highlighted, indent = 0, seed = 0 }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6,
      padding: '4px 6px',
      marginLeft: indent * 12,
      background: highlighted ? `${HILITE}` : 'transparent',
      borderRadius: 4,
      border: highlighted ? `1.4px dashed ${PURPLE}` : '1.4px solid transparent',
      fontFamily: 'Architects Daughter, cursive',
      fontSize: 13,
      transform: tilt(seed),
    }}>
      <span style={{ width: 12, height: 14, border: `1.2px solid ${INK}`, borderRadius: 2, flex: '0 0 auto', position: 'relative' }}>
        <span style={{ position: 'absolute', top: 3, left: 2, right: 2, height: 1, background: INK }} />
        <span style={{ position: 'absolute', top: 6, left: 2, right: 4, height: 1, background: INK }} />
      </span>
      <span style={{ flex: '1 1 auto', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</span>
      {kind && <span style={{ fontSize: 10, color: MUTED, padding: '1px 5px', border: `1px solid ${MUTED}`, borderRadius: 3 }}>{kind}</span>}
    </div>
  );
}

// Top bar — Composed logo + model selector + project switcher
function TopBar({ project = 'New chat', model = 'Claude Sonnet 4.5', extras }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16,
      padding: '10px 18px',
      borderBottom: `1.4px solid ${INK}`,
      background: '#fff',
      fontFamily: 'Architects Daughter, cursive',
    }}>
      <div style={{
        fontFamily: 'Caveat, cursive', fontSize: 22, fontWeight: 700,
        background: 'linear-gradient(90deg, #9D00FF, #7BB1FD)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        letterSpacing: '-0.01em',
      }}>composed</div>
      <span style={{ color: MUTED, fontSize: 13 }}>/</span>
      <Box seed={2} style={{ padding: '3px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
        <H size={13}>{project}</H>
        <span style={{ color: MUTED, fontSize: 11 }}>▼</span>
      </Box>
      <div style={{ flex: 1 }} />
      {extras}
      <Box seed={5} style={{ padding: '3px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: PURPLE }} />
        <H size={13}>{model}</H>
        <span style={{ color: MUTED, fontSize: 11 }}>▼</span>
      </Box>
      <Box seed={8} style={{ width: 28, height: 28, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'Caveat, cursive', fontSize: 16 }}>S</span>
      </Box>
    </div>
  );
}

// Screen / desktop frame — a single "browser window" for each wireframe
function Screen({ width = 1180, height = 720, title, children, style }) {
  return (
    <div style={{
      width, height, position: 'relative',
      background: '#fafafa',
      border: `2px solid ${INK}`,
      borderRadius: '10px 8px 12px 7px / 8px 10px 7px 11px',
      overflow: 'hidden',
      ...style,
    }}>
      {title && (
        <div style={{
          position: 'absolute', top: -28, left: 0,
          fontFamily: 'Caveat, cursive', fontSize: 20, color: INK, fontWeight: 700,
        }}>{title}</div>
      )}
      {/* fake browser dots */}
      <div style={{ position: 'absolute', top: 8, left: 12, display: 'flex', gap: 6 }}>
        <span style={{ width: 9, height: 9, borderRadius: '50%', border: `1.2px solid ${INK}` }} />
        <span style={{ width: 9, height: 9, borderRadius: '50%', border: `1.2px solid ${INK}` }} />
        <span style={{ width: 9, height: 9, borderRadius: '50%', border: `1.2px solid ${INK}` }} />
      </div>
      <div style={{ paddingTop: 24, height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
}

// Section header inside a direction (above the artboards)
function DirectionHeader({ num, title, sub, idea }) {
  return (
    <div style={{ marginBottom: 24, maxWidth: 900 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap' }}>
        <Hand size={48} color={PURPLE}>{num}.</Hand>
        <Hand size={40}>{title}</Hand>
      </div>
      {sub && <H size={16} color={MUTED} style={{ marginTop: 4, display: 'block' }}>{sub}</H>}
      {idea && (
        <div style={{ marginTop: 12, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <Note rotate={-1.5}>{idea}</Note>
        </div>
      )}
    </div>
  );
}

Object.assign(window, {
  PURPLE, INK, MUTED, HILITE,
  roughRadius, tilt,
  Box, Note, H, Hand, Btn, Chip, HL, Line, PH,
  PlatformCard, KbDoc, TopBar, Screen, DirectionHeader,
});
