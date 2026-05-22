// Hi-fi shared primitives — Composed Digital design system.
// Lucide icons via CDN; sentence case; AU English; no emoji.

const C = {
  purple: '#6C5CE7',
  purpleLight: '#7C3AED',
  purpleDark: '#4F46E5',
  bg: '#FAFAFA',
  card: '#FFFFFF',
  border: '#E7E7EE',
  borderStrong: '#D7D7E0',
  rule: '#ECECF1',
  fg: '#1A1A2E',
  body: '#374151',
  muted: '#6B7280',
  mutedLight: '#9CA3AF',
  ok: '#10B981',
  warn: '#F59E0B',
  err: '#EF4444',
  info: '#0891B2',
  bgSoft: '#F3F4F6',
  bgRow: '#FAFAFA',
};

const GRAD_BRAND = 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)';
const GRAD_LOGO = 'linear-gradient(135deg, #9D00FF 0%, #7BB1FD 100%)';
const SH_SM = '0 1px 3px rgba(0,0,0,.10)';
const SH_MD = '0 4px 6px rgba(0,0,0,.10)';
const SH_LG = '0 8px 24px rgba(108,92,231,.20)';

// Render or re-render Lucide icons after components mount.
function useLucide(deps = []) {
  React.useEffect(() => {
    const t = setTimeout(() => window.lucide && window.lucide.createIcons(), 0);
    return () => clearTimeout(t);
  }, deps);
}

// Icon uses a dangerouslySetInnerHTML wrapper so React treats the inner DOM as
// opaque. This prevents React's reconciler from conflicting with Lucide's SVG
// replacement, which caused the insertBefore crash when Lucide mutated nodes
// that React still held references to.
function Icon({ name, size = 16, stroke = 2, color, style }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current && window.lucide) {
      window.lucide.createIcons({ el: ref.current });
    }
  });
  return (
    <span
      ref={ref}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color, ...style }}
      dangerouslySetInnerHTML={{ __html: `<i data-lucide="${name}" width="${size}" height="${size}" stroke-width="${stroke}"></i>` }}
    />
  );
}

function Btn({ variant = 'primary', size = 'md', icon, iconRight, children, onClick, fullWidth, disabled, style }) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const h = size === 'sm' ? 32 : size === 'lg' ? 44 : 40;
  const px = size === 'sm' ? 12 : 18;
  const fs = size === 'sm' ? 13 : 14;

  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    height: h, padding: `0 ${px}px`, borderRadius: 8,
    fontFamily: 'Poppins, system-ui, sans-serif',
    fontSize: fs, fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'transform .15s cubic-bezier(.2,.8,.2,1), box-shadow .15s, background .15s, border-color .15s, color .15s',
    border: 0, whiteSpace: 'nowrap',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled ? 0.5 : 1,
    transform: press ? 'translateY(0)' : (hover && !disabled ? 'translateY(-2px)' : 'translateY(0)'),
  };

  let v;
  if (variant === 'primary') {
    v = {
      background: GRAD_BRAND, color: '#fff',
      boxShadow: hover && !press && !disabled ? SH_LG : 'none',
    };
  } else if (variant === 'secondary') {
    v = {
      background: '#FFFFFF', color: C.fg, border: `1px solid ${hover ? C.purple : C.border}`,
      boxShadow: hover && !press && !disabled ? SH_LG : SH_SM,
    };
  } else if (variant === 'ghost') {
    v = {
      background: hover && !disabled ? C.bgSoft : 'transparent', color: C.body,
    };
  } else if (variant === 'subtle') {
    v = {
      background: 'rgba(108,92,231,.10)', color: C.purple,
    };
  } else if (variant === 'danger') {
    v = {
      background: '#FFFFFF', color: C.err, border: `1px solid ${C.border}`,
    };
  }

  return (
    <button
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{ ...base, ...v, ...style }}
    >
      {icon && <Icon name={icon} size={size === 'sm' ? 14 : 16} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === 'sm' ? 14 : 16} />}
    </button>
  );
}

function IconBtn({ icon, label, onClick, active, size = 32, badge }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={onClick} aria-label={label}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        width: size, height: size, borderRadius: 8, position: 'relative',
        background: active ? 'rgba(108,92,231,.10)' : (hover ? C.bgSoft : 'transparent'),
        color: active ? C.purple : C.muted,
        border: 0, cursor: 'pointer', transition: 'all .15s ease',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <Icon name={icon} size={16} />
      {badge != null && (
        <span style={{
          position: 'absolute', top: 4, right: 4, minWidth: 14, height: 14, padding: '0 3px',
          background: C.purple, color: '#fff', fontSize: 9, fontWeight: 700,
          borderRadius: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '2px solid #fff',
        }}>{badge}</span>
      )}
    </button>
  );
}

function Badge({ tone = 'brand', icon, children, size = 'md' }) {
  const tones = {
    brand: { bg: 'rgba(108,92,231,.10)', fg: C.purple },
    soft:  { bg: C.bgSoft,                fg: C.body },
    outline: { bg: 'transparent', fg: C.body, bd: `1px solid ${C.border}` },
    ok:    { bg: 'rgba(16,185,129,.10)',  fg: C.ok },
    warn:  { bg: 'rgba(245,158,11,.10)',  fg: C.warn },
    err:   { bg: 'rgba(239,68,68,.10)',   fg: C.err },
    info:  { bg: 'rgba(8,145,178,.10)',   fg: C.info },
    dark:  { bg: '#1A1A2E', fg: '#fff' },
  }[tone];
  const fs = size === 'sm' ? 11 : 12;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontSize: fs, fontWeight: 500, padding: '2px 8px', borderRadius: 4,
      background: tones.bg, color: tones.fg, border: tones.bd, lineHeight: 1.4,
    }}>
      {icon && <Icon name={icon} size={fs - 1} />}
      {children}
    </span>
  );
}

function Chip({ icon, children, selected, onClick, size = 'md' }) {
  const [hover, setHover] = React.useState(false);
  const h = size === 'sm' ? 26 : 30;
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        height: h, padding: '0 12px', borderRadius: 9999,
        fontFamily: 'Poppins, system-ui, sans-serif',
        fontSize: 13, fontWeight: 500,
        background: selected ? 'rgba(108,92,231,.10)' : '#fff',
        color: selected ? C.purple : C.body,
        border: `1px solid ${selected ? C.purple : (hover ? C.borderStrong : C.border)}`,
        cursor: 'pointer', transition: 'all .15s ease', whiteSpace: 'nowrap',
      }}
    >
      {icon && <Icon name={icon} size={13} />}
      {children}
    </button>
  );
}

function Eyebrow({ children, color = C.purple }) {
  return (
    <div style={{
      fontSize: 12, fontWeight: 500, letterSpacing: '0.08em',
      textTransform: 'uppercase', color, lineHeight: 1,
    }}>{children}</div>
  );
}

function Avatar({ name, size = 28, bg, src }) {
  const initials = name ? name.split(' ').map(s => s[0]).slice(0, 2).join('') : '';
  const palette = ['#A78BFA', '#7BB1FD', '#34D399', '#F59E0B', '#EF4444', '#06B6D4', '#EC4899'];
  const colour = bg || palette[(name || '').length % palette.length];
  return (
    <span style={{
      width: size, height: size, borderRadius: 9999, flexShrink: 0,
      background: src ? `url(${src})` : colour,
      color: '#fff', fontSize: Math.round(size * 0.38), fontWeight: 600,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      lineHeight: 1, letterSpacing: '0.02em',
    }}>{!src && initials}</span>
  );
}

window.C = C;
window.GRAD_BRAND = GRAD_BRAND;
window.GRAD_LOGO = GRAD_LOGO;
window.SH_SM = SH_SM;
window.SH_MD = SH_MD;
window.SH_LG = SH_LG;
window.useLucide = useLucide;
window.Icon = Icon;
window.Btn = Btn;
window.IconBtn = IconBtn;
window.Badge = Badge;
window.Chip = Chip;
window.Eyebrow = Eyebrow;
window.Avatar = Avatar;
