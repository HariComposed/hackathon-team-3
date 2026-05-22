// Hi-fi: New-project Setup — the homepage.
// Three steps · single column · text box anchored at the bottom · no sidebar.

const PLATFORMS_HF = [
{ id: 'braze', name: 'Braze', tag: 'Customer engagement', initials: 'BZ', color: '#FF4F00' },
{ id: 'shopify', name: 'Shopify', tag: 'Commerce', initials: 'SH', color: '#5E8E3E' },
{ id: 'talon', name: 'Talon One', tag: 'Promotions & loyalty', initials: 'T1', color: '#FF5C00' },
{ id: 'eagleeye', name: 'Eagle Eye', tag: 'Loyalty platform', initials: 'EE', color: '#0066FF' },
{ id: 'webfe', name: 'Web frontend', tag: 'In-house engineering', initials: 'WE', color: C.purple }];


const BRAZE_FEATURES = ['Content Cards', 'Banners', 'Email', 'SMS', 'Push', 'IP warming', 'Canvas flow', 'Catalogs'];
const SHOPIFY_FEATURES = ['Checkout API', 'Audiences', 'Webhooks', 'Functions'];
const WEBFE_FEATURES = ['React', 'Next.js', 'Storybook', 'Design tokens', 'Accessibility', 'Performance'];

function Setup({ onCreate }) {
  const [platforms, setPlatforms] = React.useState([]);
  const [intent, setIntent] = React.useState('project-start');
  const [client, setClient] = React.useState('existing');
  const [features, setFeatures] = React.useState([]);
  const [query, setQuery] = React.useState('');

  const toggle = (arr, v) => arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

  useLucide([platforms, intent, client, features]);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, background: C.bg }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '40px 32px 28px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          {/* Hero */}
          <div style={{ marginBottom: 28 }}>
            <Eyebrow>Start a project</Eyebrow>
            <h1 style={{ margin: '10px 0 6px', fontSize: 32, fontWeight: 600, color: C.fg, letterSpacing: '-0.015em', lineHeight: 1.15 }}>
              What are we working on?
            </h1>
            <p style={{ margin: 0, fontSize: 15, color: C.muted, lineHeight: 1.55, maxWidth: 560 }}>
              Three quick choices. Compose pulls the relevant knowledge from your team so Claude can help you build on it.
            </p>
          </div>

          {/* Step 1 — Platforms */}
          <StepCard step="1" title="Pick the platforms" hint="Multi-select. Features appear once you pick at least one.">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, padding: 20 }}>
              {PLATFORMS_HF.map((p) =>
              <PlatformTile key={p.id} platform={p} selected={platforms.includes(p.id)} onClick={() => setPlatforms(toggle(platforms, p.id))} />
              )}
            </div>
            {platforms.length > 0 &&
            <div style={{ borderTop: `1px solid ${C.rule}`, padding: '14px 20px 18px', background: '#FAFAFA' }}>
                <div style={{ fontSize: 11, fontWeight: 500, color: C.muted, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>
                  Narrow scope
                </div>
                {platforms.includes('braze') && <FeatureGroup label="Braze" features={BRAZE_FEATURES} selected={features} onToggle={(f) => setFeatures(toggle(features, f))} />}
                {platforms.includes('shopify') && <FeatureGroup label="Shopify" features={SHOPIFY_FEATURES} selected={features} onToggle={(f) => setFeatures(toggle(features, f))} />}
                {platforms.includes('webfe') && <FeatureGroup label="Web frontend" features={WEBFE_FEATURES} selected={features} onToggle={(f) => setFeatures(toggle(features, f))} />}
              </div>
            }
          </StepCard>

          {/* Step 2 — Intent + Client */}
          <StepCard step="2" title="What kind of work is this?" hint="Helps Claude scope the brief.">
            <div style={{ padding: '16px 20px 14px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
              {[
              { id: 'project-start', icon: 'rocket', label: 'Project start', sub: 'Discovery + scoping' },
              { id: 'prototype', icon: 'wand-sparkles', label: 'Prototype building', sub: 'Build a working POC' },
              { id: 'feature-explore', icon: 'compass', label: 'Feature exploration', sub: 'Compare platform options' },
              { id: 'advice', icon: 'lightbulb', label: 'General advice', sub: 'Quick best-practice question' }].
              map((i) => <IntentTile key={i.id} {...i} selected={intent === i.id} onClick={() => setIntent(i.id)} />)}
            </div>
            <div style={{ borderTop: `1px solid ${C.rule}`, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 13, color: C.muted, marginRight: 4 }}>Client</span>
              <Chip selected={client === 'existing'} onClick={() => setClient('existing')} icon="building-2">Existing</Chip>
              <Chip selected={client === 'new'} onClick={() => setClient('new')} icon="building">New client</Chip>
              <Chip selected={client === 'internal'} onClick={() => setClient('internal')} icon="users">Internal</Chip>
              {client === 'existing' &&
              <button style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                height: 30, padding: '0 10px', borderRadius: 8,
                border: `1px solid ${C.border}`, background: '#fff',
                fontFamily: 'Poppins, sans-serif', fontSize: 13, color: C.fg, cursor: 'pointer'
              }}>
                  <Avatar name="Acme Co" size={16} />
                  Acme Co
                  <Icon name="chevron-down" size={12} color={C.muted} />
                </button>
              }
            </div>
          </StepCard>

          {/* Step 3 — Notes & files */}
          <StepCard step="3" title="Anything else to share?" hint="Optional. Drop client decks, transcripts, or links — Claude reads them too.">
            <div style={{ padding: '16px 20px 20px' }}>
              <div style={{
                border: `1px dashed ${C.borderStrong}`, borderRadius: 10,
                padding: 14, background: C.bg,
                display: 'flex', alignItems: 'center', gap: 12
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                  background: 'rgba(108,92,231,.10)', color: C.purple,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Icon name="paperclip" size={16} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: C.fg }}>Drop files, or paste a URL</div>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>PDF · docx · md · csv · Notion · Confluence · Drive</div>
                </div>
                <Btn variant="ghost" size="sm" icon="folder-open">Browse</Btn>
              </div>
            </div>
          </StepCard>

          {/* Step 4 — Additional info / free-text prompt */}
          <StepCard step="4" title="Additional info" hint="Optional. The more you tell Claude, the better the brief.">
            <AdditionalInfo value={query} onChange={setQuery} />
          </StepCard>

          {/* Primary action */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8, marginTop: 18 }}>
            <span style={{ fontSize: 12, color: C.muted, marginRight: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Icon name="info" size={12} />
              Your draft saves automatically.
            </span>
            <Btn variant="secondary">Save as draft</Btn>
            <Btn variant="primary" icon="sparkles" iconRight="arrow-right" onClick={onCreate}>Open workspace</Btn>
          </div>
        </div>
      </div>
    </div>);

}

function StepCard({ step, title, hint, children }) {
  return (
    <section style={{
      background: '#FFFFFF', border: `1px solid ${C.border}`,
      borderRadius: 16, boxShadow: SH_SM,
      marginBottom: 14, overflow: 'hidden'
    }}>
      <header style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: `1px solid ${C.rule}` }}>
        <span style={{
          width: 26, height: 26, borderRadius: 8,
          background: 'rgba(108,92,231,.10)', color: C.purple,
          fontSize: 13, fontWeight: 600,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
        }}>{step}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: C.fg }}>{title}</div>
          {hint && <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{hint}</div>}
        </div>
      </header>
      {children}
    </section>);

}

function PlatformTile({ platform, selected, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative', padding: 12, textAlign: 'left',
        background: selected ? 'rgba(108,92,231,.06)' : '#FFFFFF',
        border: `${selected ? '1.5px' : '1px'} solid ${selected ? C.purple : hover ? C.borderStrong : C.border}`,
        borderRadius: 10,
        boxShadow: hover && !selected ? SH_LG : 'none',
        transform: hover ? 'translateY(-1px)' : 'translateY(0)',
        transition: 'all .15s cubic-bezier(.2,.8,.2,1)',
        cursor: 'pointer', fontFamily: 'Poppins, sans-serif',
        display: 'flex', flexDirection: 'column', gap: 8, minHeight: 100
      }}>
      
      <div style={{
        width: 30, height: 30, borderRadius: 8,
        background: platform.color, color: '#fff',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 11, fontWeight: 700, letterSpacing: '0.02em'
      }}>{platform.initials}</div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.fg }}>{platform.name}</div>
        <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{platform.tag}</div>
      </div>
      {selected &&
      <span style={{
        position: 'absolute', top: 8, right: 8,
        width: 18, height: 18, borderRadius: 9999, background: C.purple, color: '#fff',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
      }}>
          <Icon name="check" size={11} stroke={3} />
        </span>
      }
    </button>);

}

function IntentTile({ id, icon, label, sub, selected, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        textAlign: 'left', padding: 12,
        background: selected ? 'rgba(108,92,231,.06)' : '#FFFFFF',
        border: `${selected ? '1.5px' : '1px'} solid ${selected ? C.purple : hover ? C.borderStrong : C.border}`,
        borderRadius: 10, cursor: 'pointer',
        fontFamily: 'Poppins, sans-serif',
        display: 'flex', alignItems: 'flex-start', gap: 10,
        transition: 'all .15s'
      }}>
      
      <div style={{
        width: 32, height: 32, borderRadius: 8, flexShrink: 0,
        background: selected ? 'rgba(108,92,231,.15)' : C.bgSoft,
        color: selected ? C.purple : C.body,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <Icon name={icon} size={16} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.fg }}>{label}</div>
        <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{sub}</div>
      </div>
    </button>);

}

function FeatureGroup({ label, features, selected, onToggle }) {
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ fontSize: 10, fontWeight: 500, color: C.muted, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {features.map((f) =>
        <Chip key={f} selected={selected.includes(f)} onClick={() => onToggle(f)} size="sm">{f}</Chip>
        )}
        <Chip size="sm" icon="sparkles">Suggest more</Chip>
      </div>
    </div>);

}

// ─── Step 4 — Additional info textarea ─────────────────────────
function AdditionalInfo({ value, onChange }) {
  const [focus, setFocus] = React.useState(false);
  const examples = [
    "We want to test Content Cards for new users on Acme, 60-day pilot, +8% activation goal.",
    "Compare loyalty tier options across Talon One and Eagle Eye for a mid-market retailer.",
    "A render-test prototype for two Braze Content Card variants, Acme brand kit applied.",
  ];
  return (
    <div style={{ padding: '16px 20px 20px' }}>
      <div style={{
        padding: 12,
        background: '#FFFFFF',
        border: `1px solid ${focus ? C.purple : C.border}`,
        borderRadius: 12,
        boxShadow: focus ? SH_LG : 'none',
        transition: 'border-color .15s, box-shadow .15s'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8, flexShrink: 0, marginTop: 1,
            background: GRAD_BRAND, color: '#fff',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Icon name="sparkles" size={14} />
          </div>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
            rows={3}
            placeholder="Describe what you're building, what you've tried, what's already known, what success looks like…"
            style={{
              flex: 1, border: 0, outline: 'none', resize: 'vertical',
              fontFamily: 'Poppins, sans-serif', fontSize: 14, color: C.fg,
              lineHeight: 1.55, background: 'transparent', padding: '4px 0', minHeight: 72,
            }}
          />
        </div>
      </div>

      <div style={{ marginTop: 10, padding: '0 2px' }}>
        <div style={{ fontSize: 11, color: C.mutedLight, marginBottom: 6 }}>For a sharper brief, try writing something like:</div>
        <ul style={{
          margin: 0, paddingLeft: 16, listStyle: 'disc',
          fontSize: 11, color: C.mutedLight, lineHeight: 1.7,
          fontStyle: 'italic',
        }}>
          {examples.map((e, i) => <li key={i}>{e}</li>)}
        </ul>
      </div>
    </div>
  );
}

window.Setup = Setup;
window.PLATFORMS_HF = PLATFORMS_HF;

// Re-exports kept so Brief.jsx / Workspace.jsx can use these primitives.
function Mark({ children }) {
  return (
    <mark style={{
      background: 'rgba(108,92,231,.12)', color: C.fg,
      padding: '0 4px', borderRadius: 3, fontWeight: 500
    }}>{children}</mark>);

}

function BriefSection({ label, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ fontSize: 11, fontWeight: 500, color: C.muted, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>{label}</div>
      {children}
    </div>);

}

window.Mark = Mark;
window.BriefSection = BriefSection;