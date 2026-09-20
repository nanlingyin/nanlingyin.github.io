import './styles.css'

const icon = (name, size = 18) => {
  const paths = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.2-.4 6.5-1.6 6.5-7A5.5 5.5 0 0 0 19 3.7 5.1 5.1 0 0 0 18.9 0S17.7-.4 15 1.3a13.4 13.4 0 0 0-7 0C5.3-.4 4.1 0 4.1 0A5.1 5.1 0 0 0 4 3.7a5.5 5.5 0 0 0-1.5 3.8c0 5.4 3.3 6.6 6.5 7A4.8 4.8 0 0 0 8 18v4"/><path d="M8 21c-4.5 1.5-5-2-7-2"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>',
    play: '<path d="m8 5 11 7-11 7V5Z"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    external: '<path d="M14 3h7v7M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
  }
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`
}

const featureData = [
  { tag: '01 / STATE', title: 'Emotion State', text: 'Continuous emotional state instead of one-shot labels.', visual: 'vad' },
  { tag: '02 / REACTION', title: 'Reaction Engine', text: 'Generate immediate character reactions from context.', visual: 'reaction' },
  { tag: '03 / INTENT', title: 'Motion Intent', text: 'Translate semantics into expressive movement intent.', visual: 'motion' },
  { tag: '04 / ADAPTER', title: 'Model Adaptation', text: 'Map abstract behavior into any Live2D profile.', visual: 'adapter' },
]

const motionStates = {
  affection: { label: 'affection', reaction: 'affection', mood: 'warm / hesitant', valence: '-0.12', arousal: '0.39', engagement: '0.59', pitch: '-4.2°', yaw: '+8.6°', gaze: 'soft_follow' },
  delight: { label: 'delight', reaction: 'delight', mood: 'bright / open', valence: '+0.72', arousal: '0.68', engagement: '0.86', pitch: '+2.8°', yaw: '-5.1°', gaze: 'direct_warm' },
  concern: { label: 'concern', reaction: 'concern', mood: 'quiet / close', valence: '-0.44', arousal: '0.31', engagement: '0.74', pitch: '+5.6°', yaw: '+2.3°', gaze: 'check_in' },
}

const featureVisual = (type) => {
  if (type === 'vad') return `<div class="vad-orbit"><span class="vad-dot d1"></span><span class="vad-dot d2"></span><span class="vad-dot d3"></span><i></i><b>VAD</b></div><div class="mini-readout"><span>valence</span><strong>+0.72</strong><span>arousal</span><strong>+0.41</strong></div>`
  if (type === 'reaction') return `<div class="reaction-graph"><span class="pulse p1"></span><span class="pulse p2"></span><span class="pulse p3"></span><span class="pulse p4"></span><div class="graph-line"></div><b>context → reaction</b></div>`
  if (type === 'motion') return `<div class="motion-path"><svg viewBox="0 0 250 110" preserveAspectRatio="none"><path d="M5 85 C55 5 90 105 135 45 S210 10 245 55"/><circle cx="89" cy="74" r="4"/><circle cx="182" cy="33" r="4"/></svg><span>soft_head_tilt</span></div>`
  return `<div class="adapter-map"><span>intent</span><i></i><span>profile</span><i></i><span class="param">ParamAngleX</span><span class="param">EyeOpen</span><span class="param">BodyAngle</span></div>`
}

const app = document.querySelector('#app')
app.innerHTML = `
  <div class="site-shell">
    <header class="nav-wrap">
      <nav class="nav container">
        <a class="brand" href="#top" aria-label="SoulLink home"><span class="brand-mark"><img src="/assets/soul-mark.png" alt="" /></span><span>SoulLink <em>Emotion SDK</em></span></a>
        <div class="nav-links"><a href="#system">System</a><a href="#capabilities">Capabilities</a><a href="#developers">Developers</a><a href="#open-source">Open source</a></div>
        <div class="nav-actions"><a class="nav-github" href="https://github.com/nanlingyin/soullink-emotion-sdk" target="_blank" rel="noreferrer">${icon('github', 16)} GitHub</a><a class="nav-docs" href="/docs.html">Docs ${icon('arrow', 15)}</a><button class="lang-toggle" type="button" aria-label="Switch language">中</button><button class="menu-button" aria-label="Open menu">${icon('chevron', 18)}</button></div>
      </nav>
    </header>

    <main id="top">
      <section class="hero container">
        <div class="hero-copy">
          <div class="eyebrow"><span class="live-dot"></span> OPEN SOURCE · AI CHARACTER BEHAVIOR INFRASTRUCTURE</div>
          <h1>Bring emotions<br /><span>to motion.</span></h1>
          <p class="hero-lede">A real-time emotion and motion framework for expressive AI characters. Turn language, voice, and context into continuous states, reactions, and movement.</p>
          <div class="hero-actions"><a class="button button-dark" href="#developers">Explore SDK ${icon('arrow', 17)}</a><a class="button button-light" href="https://github.com/nanlingyin/soullink-emotion-sdk" target="_blank" rel="noreferrer">${icon('github', 17)} View on GitHub</a></div>
          <div class="hero-meta"><span>TypeScript-first</span><i></i><span>Live2D ready</span><i></i><span>MIT licensed</span><i></i><span>v0.2.0-beta.1</span></div>
        </div>
        <div class="hero-stage" aria-label="Live emotion visualization">
          <div class="stage-glow"></div><div class="stage-grid"></div>
          <svg class="stage-orbit" viewBox="0 0 560 620" aria-hidden="true"><ellipse cx="280" cy="315" rx="214" ry="272"/><ellipse cx="280" cy="315" rx="178" ry="230" transform="rotate(56 280 315)"/><path d="M65 360 C185 190 345 190 495 295"/><circle cx="72" cy="357" r="5"/><circle cx="494" cy="294" r="5"/></svg>
          <div class="hero-lockup" aria-hidden="true"><img src="/assets/soul-lockup-center.png" alt="" /></div>
          <div class="hero-character"><img src="/assets/character-full.png" alt="SoulLink character" /></div>
          <div class="stage-caption">A living state, continuously composed.</div>
        </div>
      </section>

      <section class="signal-strip"><div class="container signal-inner"><span>Text / Voice / Event</span><b>→</b><span>Emotion State</span><b>→</b><span>Reaction</span><b>→</b><span>Motion Intent</span><b>→</b><span>Character Presence</span></div></section>

      <section class="section section-system" id="system"><div class="container"><div class="section-kicker">THE CORE IDEA <span>01</span></div><div class="section-heading split"><div><h2>From language<br /><em>to emotion to motion.</em></h2></div><p>Characters feel alive when expression is a process, not a preset. SoulLink keeps a continuous emotional state and turns it into performance in real time.</p></div><div class="pipeline"><div class="pipeline-path"></div><div class="pipeline-node node-1"><span class="node-icon">✦</span><small>INPUT</small><strong>Text · Voice · Event</strong><em>what happened?</em></div><div class="pipeline-node node-2"><span class="node-icon">◌</span><small>UNDERSTAND</small><strong>Reaction Engine</strong><em>what does it mean?</em></div><div class="pipeline-node node-3"><span class="node-icon">◒</span><small>STATE</small><strong>Emotion State</strong><em>how does it feel?</em></div><div class="pipeline-node node-4"><span class="node-icon">⌁</span><small>COMPOSE</small><strong>Motion Intent</strong><em>how should it move?</em></div><div class="pipeline-node node-5"><span class="node-icon">◈</span><small>PERFORM</small><strong>Live2D Runtime</strong><em>make it present.</em></div></div></div></section>

      <section class="section section-capabilities" id="capabilities"><div class="container"><div class="section-kicker">THE BUILDING BLOCKS <span>02</span></div><div class="section-heading split"><h2>Behavior you can<br /><em>actually build on.</em></h2><p>Small, composable primitives for teams building AI companions, VTubers, games, and the next generation of character interfaces.</p></div><div class="feature-grid">${featureData.map((f) => `<article class="feature-card"><div class="feature-top"><span>${f.tag}</span><span class="feature-arrow">↗</span></div><h3>${f.title}</h3><p>${f.text}</p><div class="feature-visual ${f.visual}">${featureVisual(f.visual)}</div></article>`).join('')}</div></div></section>

      <section class="section semantic-section"><div class="container"><div class="section-kicker">SEMANTIC MOTION <span>03</span></div><div class="section-heading split"><h2>Not a preset animation.<br /><em>A reason to move.</em></h2><p>SoulLink composes semantic intent from the conversation itself. The same words can land differently depending on the state around them.</p></div><div class="semantic-demo"><div class="demo-input"><div class="demo-label">INPUT / MESSAGE <span>streaming</span></div><blockquote>“我以后再也不理你了”</blockquote><div class="interpretation"><div class="demo-label">AI INTERPRETATION</div><div class="data-grid"><span>reaction_class</span><strong data-demo="reaction">affection</strong><span>social_orientation</span><strong>approach</strong><span>valence</span><strong data-demo="valence">-0.12</strong><span>arousal</span><strong data-demo="arousal">0.39</strong><span>engagement</span><strong data-demo="engagement">0.59</strong></div></div></div><div class="demo-connector"><div class="connector-orbit"></div><span>semantic<br />mapping</span></div><div class="demo-output"><div class="demo-label">MOTION INTENT <span class="status-live">● live</span></div><div class="intent-title"><span class="intent-symbol">⌁</span><strong>soft_head_tilt</strong></div><div class="intent-rows"><div><span>head gesture</span><b>hesitate</b></div><div><span>gaze behavior</span><b data-demo="gaze">soft_follow</b></div><div><span>head yaw</span><b data-demo="yaw">-4.2°</b></div><div><span>head pitch</span><b data-demo="pitch">+5.6°</b></div><div><span>warmth</span><b>0.68</b></div><div><span>concern</span><b>0.42</b></div></div><div class="intent-spark"><i></i><i></i><i></i><i></i><i></i><i></i></div></div></div><div class="demo-switcher"><span>Try another state</span><button class="state-button active" data-state="affection">Affection</button><button class="state-button" data-state="delight">Delight</button><button class="state-button" data-state="concern">Concern</button></div></div></section>

      <section class="section jev-section"><div class="container"><div class="section-kicker">JEV EXPERIMENT <span>03A</span></div><div class="section-heading split"><h2>Semantic decisions,<br /><em>mapped to a real model.</em></h2><p>JEV is the optional speech-conversation path in the current beta. It chooses expressive intent; SoulLink keeps model-specific numbers and playback safety in code.</p></div><div class="jev-panel"><div class="jev-flow"><div class="jev-step"><span class="jev-number">01</span><div><strong>LLM reply</strong><small>conversation context → response text</small></div></div><div class="jev-line"></div><div class="jev-step"><span class="jev-number">02</span><div><strong>TTS</strong><small>response text → voice audio</small></div></div><div class="jev-line"></div><div class="jev-step jev-emphasis"><span class="jev-number">03</span><div><strong>JEV planner</strong><small>semantic intent → gesture, gaze, expression</small></div></div><div class="jev-line"></div><div class="jev-step"><span class="jev-number">04</span><div><strong>Audio-synced playback</strong><small>CDI3 mapping · smootherstep · hand back</small></div></div></div><div class="jev-readout"><div class="jev-readout-top"><span>JEV / SAMPLE DECISION</span><b>typesafe/jev-1.13</b></div><div class="jev-intent-row"><span>head gesture</span><strong>nod</strong><em>strength 0.60</em></div><div class="jev-intent-row"><span>gaze behavior</span><strong>contact</strong><em>strength 0.68</em></div><div class="jev-intent-row"><span>smile strength</span><strong>0.44</strong><em>confidence 0.72</em></div><div class="jev-intent-row"><span>movement energy</span><strong>0.37</strong><em>confidence 0.77</em></div><div class="jev-ownership"><span>152 parameter frame record</span><b>owned → playback</b><small>Unowned channels keep Idle / VAD / physics. Mouth opening follows decoded audio RMS.</small></div></div></div><div class="jev-note"><span>EXPERIMENTAL BOUNDARY</span><p>Current JEV conversation generates a complete speech-and-motion plan before playback. It is not streaming generation yet; the browser lab keeps the raw plan, adapted playback plan, confidence, overrides, and telemetry for replay.</p></div></div></section>

      <section class="section realtime-section"><div class="container realtime-grid"><div><div class="section-kicker">REAL-TIME BY DESIGN <span>04</span></div><h2>Built for character<br /><em>behavior in motion.</em></h2><p>Streaming-friendly primitives keep the loop responsive while letting emotion settle, interrupt, and change naturally.</p><a class="text-link" href="/docs.html#1-整体数据流">Read the architecture ${icon('arrow', 16)}</a></div><div class="timeline"><div class="timeline-line"></div><div class="timeline-item"><b>0 ms</b><span>input</span><i>message enters the loop</i></div><div class="timeline-item"><b>40 ms</b><span>reaction</span><i>context becomes a feeling</i></div><div class="timeline-item"><b>80 ms</b><span>motion intent</span><i>meaning becomes movement</i></div><div class="timeline-item"><b>100 ms</b><span>character response</span><i>the model answers back</i></div></div></div></section>

      <section class="section architecture-section"><div class="container"><div class="section-kicker">UNDER THE HOOD <span>05</span></div><div class="section-heading split"><h2>A behavior layer<br /><em>between thought and form.</em></h2><p>Keep your conversation stack. SoulLink sits between your model and your character runtime, translating meaning into embodied presence.</p></div><div class="architecture"><div class="arch-column upstream"><span>YOUR STACK</span><div class="arch-box"><b>Conversation Model</b><small>LLM · Memory · Embedding</small></div><div class="arch-box"><b>Voice Layer</b><small>ASR · TTS · Prosody</small></div></div><div class="arch-spine"><div class="arch-logo">SL</div><span></span><span></span><span></span></div><div class="arch-column soul"><span>SOULLINK EMOTION SDK</span><div class="arch-box strong"><b>Emotion Engine</b><small>state · reaction · intent</small></div><div class="arch-box strong"><b>Motion Mixer</b><small>idle · speech · reaction</small></div><div class="arch-box strong"><b>Model Profile</b><small>semantic → parameter map</small></div></div><div class="arch-column runtime"><span>RUNTIME</span><div class="arch-box"><b>Live2D / Character</b><small>Pixi · Unity · Web</small></div></div></div></div></section>

      <section class="section dev-section" id="developers"><div class="container"><div class="dev-header"><div><div class="section-kicker">DEVELOPER EXPERIENCE <span>06</span></div><h2>Simple enough to start.<br /><em>Deep enough to grow.</em></h2></div><div class="platform-tabs"><button class="platform active">TypeScript</button><button class="platform">Flutter</button><button class="platform">Unity</button><button class="platform">Web</button></div></div><div class="code-shell"><div class="code-top"><span><i></i><i></i><i></i></span><small>emotion.ts</small><button class="copy-button" aria-label="Copy code">${icon('copy', 16)} Copy</button></div><pre><code><span class="syntax-key">const</span> soul = <span class="syntax-key">new</span> <span class="syntax-type">SoulLink</span>({
  profile: modelProfile,
  mode: <span class="syntax-string">"streaming"</span>
})

<span class="syntax-key">const</span> reaction = <span class="syntax-key">await</span> soul.<span class="syntax-fn">react</span>({
  text: <span class="syntax-string">"我好喜欢你"</span>,
  context: conversationState
})

soul.<span class="syntax-fn">apply</span>(reaction)
<span class="syntax-comment">// → emotion state → motion intent → Live2D</span></code></pre><div class="code-footer"><span><i></i> runtime connected</span><span>0.8.4-beta</span></div></div></div></section>

      <section class="section profiles-section"><div class="container"><div class="section-kicker">MODEL PROFILES <span>07</span></div><div class="section-heading split"><h2>One behavior model.<br /><em>Different characters.</em></h2><p>Author meaning once. Let each model profile decide how that meaning becomes a parameter, gesture, or expression.</p></div><div class="profile-demo"><div class="profile-intent"><span class="intent-symbol">⌁</span><small>MOTION INTENT</small><strong>soft_head_tilt</strong><span>semantic behavior</span></div><div class="profile-connector"><span></span><span></span><span></span></div><div class="profile-cards"><div class="profile-card"><div class="profile-avatar a"><span>◌</span></div><div><small>PROFILE A</small><strong>Amane</strong><em>ParamAngleX · EyeOpen</em></div></div><div class="profile-card"><div class="profile-avatar b"><span>◈</span></div><div><small>PROFILE B</small><strong>Hiyori</strong><em>BodyAngle · Breath</em></div></div><div class="profile-card"><div class="profile-avatar c"><span>✦</span></div><div><small>PROFILE C</small><strong>Custom model</strong><em>your parameter map</em></div></div></div></div></div></section>

      <section class="section character-section"><div class="container character-wrap"><div class="character-image"><div class="image-ring"></div><img src="/assets/character-full.png" alt="SoulLink visual identity character" /></div><div class="character-copy"><div class="section-kicker">A SMALL BELIEF <span>08</span></div><h2>Technology should not make characters feel more artificial.</h2><p>It should make them feel more alive.</p><div class="character-note"><span>◌</span><div><strong>Presence is a system.</strong><small>Emotion · Reaction · Expression · Motion</small></div></div></div></div></section>

      <section class="section open-section" id="open-source"><div class="container open-box"><div><div class="section-kicker">OPEN SOURCE <span>09</span></div><h2>Build something<br /><em>worth feeling.</em></h2><p>SoulLink Emotion SDK is MIT licensed and built in the open for developers making AI characters more expressive.</p></div><div class="open-actions"><a class="button button-dark" href="https://github.com/nanlingyin/soullink-emotion-sdk" target="_blank" rel="noreferrer">${icon('github', 17)} View on GitHub</a><a class="button button-light" href="/docs.html">${icon('book', 17)} Read the docs</a><div class="open-meta"><span>MIT license</span><span>TypeScript</span><span>Live2D ready</span></div></div></div></section>
    </main>
    <footer class="footer"><div class="container footer-top"><a class="brand" href="#top"><span class="brand-mark"><img src="/assets/soul-mark.png" alt="" /></span><span>SoulLink <em>Emotion SDK</em></span></a><p>Bring emotions to motion.</p><div class="footer-links"><a href="#system">System</a><a href="/docs.html">Docs</a><a href="https://github.com/nanlingyin/soullink-emotion-sdk" target="_blank" rel="noreferrer">GitHub</a></div></div><div class="container footer-bottom"><span>© 2026 SoulLink Emotion SDK</span><span>Made for more expressive AI characters <b>✦</b></span></div></footer>
  </div>
`

const jevSection = document.querySelector('.jev-section')
if (jevSection) {
  jevSection.innerHTML = `<div class="container"><div class="section-kicker">JEV DECISION MODEL <span>03A</span></div><div class="section-heading split"><h2>JEV behavior decisions,<br /><em>mapped to Live2D performance.</em></h2><p>JEV is the decision model that turns conversational meaning into Live2D action. It selects expressive intent and parameter ownership; SoulLink maps those choices to the current model's CDI3 ranges and keeps playback safe.</p></div><div class="jev-panel"><div class="jev-flow"><div class="jev-step"><span class="jev-number">01</span><div><strong>LLM / context</strong><small>message · reply · emotion state</small></div></div><div class="jev-line"></div><div class="jev-step jev-emphasis"><span class="jev-number">02</span><div><strong>JEV decision model</strong><small>semantic intent → gesture, gaze, expression</small></div></div><div class="jev-line"></div><div class="jev-step"><span class="jev-number">03</span><div><strong>CDI3 parameter mapping</strong><small>intent strength → model parameter range</small></div></div><div class="jev-line"></div><div class="jev-step"><span class="jev-number">04</span><div><strong>Live2D playback</strong><small>smootherstep · runtime hand back</small></div></div></div><div class="jev-readout"><div class="jev-readout-top"><span>JEV / SAMPLE DECISION</span><b>typesafe/jev-1.13</b></div><div class="jev-intent-row"><span>head gesture</span><strong>nod</strong><em>strength 0.60</em></div><div class="jev-intent-row"><span>gaze behavior</span><strong>contact</strong><em>strength 0.68</em></div><div class="jev-intent-row"><span>smile strength</span><strong>0.44</strong><em>confidence 0.72</em></div><div class="jev-intent-row"><span>movement energy</span><strong>0.37</strong><em>confidence 0.77</em></div><div class="jev-ownership"><span>152 parameter frame record</span><b>owned → playback</b><small>Only JEV-owned channels follow the plan. Unowned channels keep Idle / VAD / physics; mouth opening remains audio RMS.</small></div></div></div><div class="jev-note"><span>EXPERIMENTAL BOUNDARY</span><p>Current JEV integration generates a complete behavior plan before playback. It is a decision model, not a voice or TTS service; semantic choices are mapped to Live2D parameters and replayed with confidence, overrides, and telemetry.</p></div></div>`
}

app.innerHTML = app.innerHTML
  .replace('SoulLink Emotion SDK is MIT licensed and built in the open for developers making AI characters more expressive.', 'SoulLink Emotion SDK is released under the Apache License 2.0 and built in the open for developers making AI characters more expressive.')
  .replaceAll('MIT licensed', 'Apache-2.0 licensed')
  .replaceAll('MIT license', 'Apache-2.0 license')

const liveValues = {}
const translations = {
  zh: {
    'System': '系统', 'Capabilities': '能力', 'Developers': '开发者', 'Open source': '开源', 'Docs': '文档',
    'OPEN SOURCE · AI CHARACTER BEHAVIOR INFRASTRUCTURE': '开源 · AI 角色行为基础设施',
    'Bring emotions': '让情绪', 'to motion.': '成为动作。',
    'A real-time emotion and motion framework for expressive AI characters. Turn language, voice, and context into continuous states, reactions, and movement.': '面向表达型 AI 角色的实时情绪与动作框架。将语言、语音和上下文转化为连续状态、即时反应与自然动作。',
    'Explore SDK': '探索 SDK', 'View on GitHub': '在 GitHub 查看', 'TypeScript-first': 'TypeScript 优先', 'Live2D ready': '支持 Live2D', 'MIT licensed': 'MIT 许可',
    'VALENCE': '效价', 'AROUSAL': '唤醒度', 'ENGAGEMENT': '投入度', 'REACTION': '反应', 'MOTION INTENT': '动作意图', 'head yaw': '头部偏航', 'gaze': '视线', 'A living state, continuously composed.': '一个持续生成的鲜活状态。',
    'Text / Voice / Event': '文本 / 语音 / 事件', 'Emotion State': '情绪状态', 'Reaction': '反应', 'Motion Intent': '动作意图', 'Character Presence': '角色存在感',
    'THE CORE IDEA': '核心理念', 'From language': '从语言', 'to emotion to motion.': '到情绪，再到动作。', 'Characters feel alive when expression is a process, not a preset. SoulLink keeps a continuous emotional state and turns it into performance in real time.': '当表达成为过程而不是预设，角色才会真正鲜活。SoulLink 维护连续的情绪状态，并将它实时转化为角色表现。',
    'INPUT': '输入', 'Text · Voice · Event': '文本 · 语音 · 事件', 'what happened?': '发生了什么？', 'UNDERSTAND': '理解', 'Reaction Engine': '反应引擎', 'what does it mean?': '这意味着什么？', 'STATE': '状态', 'how does it feel?': '感受如何？', 'COMPOSE': '编排', 'how should it move?': '应该如何动作？', 'PERFORM': '表现', 'Live2D Runtime': 'Live2D 运行时', 'make it present.': '让它真实存在。',
    'THE BUILDING BLOCKS': '核心能力', 'Behavior you can': '可构建的', 'actually build on.': '角色行为能力。', 'Small, composable primitives for teams building AI companions, VTubers, games, and the next generation of character interfaces.': '为 AI 陪伴、VTuber、游戏和下一代角色界面打造的可组合基础模块。',
    '01 / STATE': '01 / 状态', '02 / REACTION': '02 / 反应', '03 / INTENT': '03 / 意图', '04 / ADAPTER': '04 / 适配', 'Continuous emotional state instead of one-shot labels.': '连续的情绪状态，而不是一次性的标签。', 'Generate immediate character reactions from context.': '根据上下文生成即时角色反应。', 'Translate semantics into expressive movement intent.': '将语义转化为具有表现力的动作意图。', 'Map abstract behavior into any Live2D profile.': '将抽象行为映射到任意 Live2D 模型配置。',
    'SEMANTIC MOTION': '语义动作', 'Not a preset animation.': '不是预设动画。', 'A reason to move.': '而是动作的理由。', 'SoulLink composes semantic intent from the conversation itself. The same words can land differently depending on the state around them.': 'SoulLink 从对话本身生成语义意图。同一句话，在不同状态下会产生不同的表达。', 'INPUT / MESSAGE': '输入 / 消息', 'streaming': '流式处理中', 'AI INTERPRETATION': 'AI 理解', 'semantic': '语义', 'mapping': '映射', 'Try another state': '试试其他状态', 'Affection': '亲和', 'Delight': '喜悦', 'Concern': '关切',
    'JEV EXPERIMENT': 'JEV 实验能力', 'Semantic decisions,': '语义决策，', 'mapped to a real model.': '映射到真实模型。', 'JEV is the optional speech-conversation path in the current beta. It chooses expressive intent; SoulLink keeps model-specific numbers and playback safety in code.': 'JEV 是当前 beta 中可选的语音对话链路。它负责选择表达意图，SoulLink 在代码中处理模型专属数值与播放安全。', 'Rivo reply': 'Rivo 回复', 'conversation context → response text': '对话上下文 → 回复文本', 'JEV 1.13 planner': 'JEV 1.13 规划器', 'head gesture · gaze · expression · gesture': '头部动作 · 视线 · 表情 · 手势', 'CDI3 mapping': 'CDI3 映射', 'semantic strength → model parameter range': '语义强度 → 模型参数范围', 'Audio-synced playback': '音频同步播放', 'smootherstep in · follow · hand back': '平滑接入 · 跟随 · 交还', 'JEV / SAMPLE DECISION': 'JEV / 示例决策', 'head gesture': '头部动作', 'nod': '点头', 'strength 0.60': '强度 0.60', 'gaze behavior': '视线行为', 'contact': '接触注视', 'strength 0.68': '强度 0.68', 'smile strength': '微笑强度', 'confidence 0.72': '置信度 0.72', 'movement energy': '动作能量', 'confidence 0.77': '置信度 0.77', '152 parameter frame record': '152 参数帧记录', 'owned → playback': '接管 → 播放', 'Unowned channels keep Idle / VAD / physics. Mouth opening follows decoded audio RMS.': '未接管通道继续由 Idle / VAD / 物理驱动。嘴型开合跟随解码音频 RMS。', 'EXPERIMENTAL BOUNDARY': '实验边界', 'Current JEV conversation generates a complete speech-and-motion plan before playback. It is not streaming generation yet; the browser lab keeps the raw plan, adapted playback plan, confidence, overrides, and telemetry for replay.': '当前 JEV 对话会在播放前生成完整的语音与动作计划，暂时还不是流式生成；浏览器实验台会保留原始计划、适配后的播放计划、置信度、覆盖项和 telemetry，支持回放。',
    'REAL-TIME BY DESIGN': '为实时而生', 'Built for character': '为角色行为', 'behavior in motion.': '实时运动而构建。', 'Streaming-friendly primitives keep the loop responsive while letting emotion settle, interrupt, and change naturally.': '流式友好的基础模块让循环保持响应，同时允许情绪自然沉淀、打断与变化。', 'Read the architecture': '阅读架构', 'input': '输入', 'message enters the loop': '消息进入循环', 'reaction': '反应', 'context becomes a feeling': '上下文变成感受', 'motion intent': '动作意图', 'meaning becomes movement': '语义变成动作', 'character response': '角色回应', 'the model answers back': '模型做出回应',
    'UNDER THE HOOD': '系统内部', 'A behavior layer': '一层行为系统', 'between thought and form.': '连接思考与形体。', 'Keep your conversation stack. SoulLink sits between your model and your character runtime, translating meaning into embodied presence.': '保留现有对话技术栈。SoulLink 位于模型与角色运行时之间，将语义转化为具身的存在感。', 'YOUR STACK': '你的技术栈', 'Conversation Model': '对话模型', 'Voice Layer': '语音层', 'SOULLINK EMOTION SDK': 'SOULLINK 情绪 SDK', 'Emotion Engine': '情绪引擎', 'Motion Mixer': '动作混合器', 'Model Profile': '模型配置', 'RUNTIME': '运行时', 'Live2D / Character': 'Live2D / 角色',
    'DEVELOPER EXPERIENCE': '开发者体验', 'Simple enough to start.': '简单到可以立即开始。', 'Deep enough to grow.': '深入到足以持续成长。', 'Copy': '复制', 'Copied': '已复制', 'runtime connected': '运行时已连接',
    'MODEL PROFILES': '模型配置', 'One behavior model.': '一个行为模型。', 'Different characters.': '不同的角色。', 'Author meaning once. Let each model profile decide how that meaning becomes a parameter, gesture, or expression.': '只需定义一次语义。让每个模型配置决定它如何成为参数、手势或表情。', 'semantic behavior': '语义行为', 'Custom model': '自定义模型', 'your parameter map': '你的参数映射',
    'A SMALL BELIEF': '一个小小信念', 'Technology should not make characters feel more artificial.': '技术不该让角色变得更人工。', 'It should make them feel more alive.': '它应该让角色更有生命力。', 'Presence is a system.': '存在感是一套系统。',
    'OPEN SOURCE': '开源项目', 'Build something': '构建一些', 'worth feeling.': '值得感受的东西。', 'SoulLink Emotion SDK is MIT licensed and built in the open for developers making AI characters more expressive.': 'SoulLink Emotion SDK 采用 MIT 许可并开放构建，帮助开发者让 AI 角色更具表现力。', 'Read the docs': '阅读文档', 'Bring emotions to motion.': '让情绪成为动作。', 'Made for more expressive AI characters': '为更具表现力的 AI 角色而生', 'System': '系统', 'Docs': '文档'
  }
}
translations.zh['voice audio and motion plan start in parallel'] = '语音与动作计划并行生成'
translations.zh['LLM reply'] = 'LLM 回复'
translations.zh['TTS'] = 'TTS 语音'
translations.zh['response text → voice audio'] = '回复文本 → 语音音频'
translations.zh['JEV planner'] = 'JEV 动作规划'
translations.zh['semantic intent → gesture, gaze, expression'] = '语义意图 → 手势、视线、表情'
translations.zh['CDI3 mapping · smootherstep · hand back'] = 'CDI3 映射 · 平滑接入 · 交还'
translations.zh['JEV behavior decisions,'] = 'JEV 行为决策，'
translations.zh['JEV DECISION MODEL'] = 'JEV 决策模型'
translations.zh['mapped to Live2D performance.'] = '映射到 Live2D 表现。'
translations.zh["JEV is the decision model that turns conversational meaning into Live2D action. It selects expressive intent and parameter ownership; SoulLink maps those choices to the current model's CDI3 ranges and keeps playback safe."] = 'JEV 是将对话语义转化为 Live2D 动作的决策模型。它选择表达意图与参数归属，SoulLink 再将这些选择映射到当前模型的 CDI3 范围，并保证播放安全。'
translations.zh['LLM / context'] = 'LLM / 上下文'
translations.zh['message · reply · emotion state'] = '消息 · 回复 · 情绪状态'
translations.zh['JEV decision model'] = 'JEV 决策模型'
translations.zh['CDI3 parameter mapping'] = 'CDI3 参数映射'
translations.zh['intent strength → model parameter range'] = '意图强度 → 模型参数范围'
translations.zh['Live2D playback'] = 'Live2D 播放'
translations.zh['smootherstep · runtime hand back'] = 'smootherstep · 交还运行时'
translations.zh['Only JEV-owned channels follow the plan. Unowned channels keep Idle / VAD / physics; mouth opening remains audio RMS.'] = '只有 JEV 接管的通道跟随计划。未接管通道继续由 Idle / VAD / 物理驱动；嘴型开合仍来自音频 RMS。'
translations.zh['Current JEV integration generates a complete behavior plan before playback. It is a decision model, not a voice or TTS service; semantic choices are mapped to Live2D parameters and replayed with confidence, overrides, and telemetry.'] = '当前 JEV 集成会在播放前生成完整的行为计划。它是决策模型，而不是语音或 TTS 服务；语义选择会映射到 Live2D 参数，并记录置信度、覆盖项和 telemetry 供回放。'
translations.zh['Apache-2.0 licensed'] = 'Apache-2.0 许可'
translations.zh['Apache-2.0 license'] = 'Apache-2.0 许可'
translations.zh['SoulLink Emotion SDK is released under the Apache License 2.0 and built in the open for developers making AI characters more expressive.'] = 'SoulLink Emotion SDK 以 Apache License 2.0 发布，并开放构建，帮助开发者让 AI 角色更具表现力。'
const stateLabels = { en: { affection: 'affection', delight: 'delight', concern: 'concern' }, zh: { affection: '亲和', delight: '喜悦', concern: '关切' } }
let currentLanguage = localStorage.getItem('soullink-language') || 'en'
let activeState = 'affection'
const sourceText = new WeakMap()
const applyLanguage = (language) => {
  currentLanguage = language
  localStorage.setItem('soullink-language', language)
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
  document.title = language === 'zh' ? 'SoulLink Emotion SDK｜让情绪成为动作' : 'SoulLink Emotion SDK | Bring Emotions to Motion'
  const description = document.querySelector('meta[name="description"]')
  if (description) description.content = language === 'zh' ? '面向表达型 AI 角色的实时情绪与动作框架。' : 'A real-time emotion and motion framework for expressive AI characters.'
  const walker = document.createTreeWalker(app, NodeFilter.SHOW_TEXT)
  let node
  while ((node = walker.nextNode())) {
    if (node.parentElement.closest('pre, code')) continue
    if (!sourceText.has(node)) sourceText.set(node, node.nodeValue)
    const original = sourceText.get(node)
    const key = original.trim()
    const translated = language === 'zh' ? translations.zh[key] : key
    if (translated && translated !== key) node.nodeValue = original.replace(key, translated)
    else if (language === 'en') node.nodeValue = original
  }
  document.querySelector('.lang-toggle').textContent = language === 'zh' ? 'EN' : '中'
  const liveReaction = document.querySelector('[data-live="reaction"]')
  if (liveReaction) liveReaction.textContent = stateLabels[language][activeState]
  document.querySelector('[data-demo="reaction"]').textContent = stateLabels[language][activeState]
}

setInterval(() => {
  Object.keys(liveValues).forEach((key) => {
    liveValues[key] += (Math.random() - 0.5) * 0.025
    liveValues[key] = Math.max(0.1, Math.min(0.98, liveValues[key]))
    const el = document.querySelector(`[data-live="${key}"]`)
    if (el) el.textContent = liveValues[key].toFixed(2)
    const bar = document.querySelector(`.label-${key} .meter b`)
    if (bar) bar.style.width = `${liveValues[key] * 100}%`
  })
}, 1600)

document.querySelectorAll('.state-button').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.state-button').forEach((b) => b.classList.remove('active'))
  button.classList.add('active')
  const state = motionStates[button.dataset.state]
  activeState = button.dataset.state
  document.querySelectorAll('[data-demo]').forEach((el) => { const key = el.dataset.demo; if (state[key]) el.textContent = state[key] })
  const liveReaction = document.querySelector('[data-live="reaction"]')
  if (liveReaction) liveReaction.textContent = stateLabels[currentLanguage][activeState]
  document.querySelector('[data-demo="reaction"]').textContent = stateLabels[currentLanguage][activeState]
  const liveYaw = document.querySelector('[data-live="yaw"]')
  const liveGaze = document.querySelector('[data-live="gaze"]')
  if (liveYaw) liveYaw.textContent = state.yaw
  if (liveGaze) liveGaze.textContent = state.gaze
}) )

document.querySelector('.copy-button').addEventListener('click', async (event) => {
  const code = document.querySelector('pre').innerText
  try { await navigator.clipboard.writeText(code) } catch {}
  event.currentTarget.innerHTML = `${icon('copy', 16)} Copied`
  setTimeout(() => { event.currentTarget.innerHTML = `${icon('copy', 16)} Copy` }, 1500)
})

document.querySelector('.menu-button').addEventListener('click', () => document.querySelector('.nav-links').classList.toggle('open'))
document.querySelectorAll('.nav-links a').forEach((link) => link.addEventListener('click', () => document.querySelector('.nav-links').classList.remove('open')))
document.querySelector('.lang-toggle').addEventListener('click', () => applyLanguage(currentLanguage === 'en' ? 'zh' : 'en'))
applyLanguage(currentLanguage)
