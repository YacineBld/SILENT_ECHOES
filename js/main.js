/* ============================================================
   SILENT ECHOES — main.js
   Interactions: theme, particles, typewriter, reveals, counters,
   ECHO companion, games, interactive story, calculator, quiz,
   video gallery, RSS feed.
   ============================================================ */

"use strict";

/* ================= THEME TOGGLE ================= */
(function theme() {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  const root = document.documentElement;
  function apply(t) {
    root.dataset.theme = t;
    btn.textContent = t === "light" ? "☾" : "☀";
    btn.setAttribute("aria-label", t === "light" ? "Switch to dark theme" : "Switch to light theme");
    try { localStorage.setItem("echoes-theme", t); } catch (e) {}
  }
  btn.addEventListener("click", () =>
    apply(root.dataset.theme === "light" ? "dark" : "light"));
  apply(root.dataset.theme === "light" ? "light" : "dark");
})();
const isLight = () => document.documentElement.dataset.theme === "light";

/* ================= HERO: PARTICLE NETWORK ================= */
(function particles() {
  const canvas = document.getElementById("particles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w, h, pts = [];
  const N = 70, LINK = 130;

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  for (let i = 0; i < N; i++) {
    pts.push({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.6 + 0.6,
    });
  }

  let mouse = { x: -9999, y: -9999 };
  canvas.parentElement.addEventListener("mousemove", e => {
    const b = canvas.getBoundingClientRect();
    mouse.x = e.clientX - b.left; mouse.y = e.clientY - b.top;
  });

  (function tick() {
    ctx.clearRect(0, 0, w, h);
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = isLight() ? "rgba(10,142,160,.75)" : "rgba(0,240,255,.7)";
      ctx.fill();
    }
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const a = pts[i], b = pts[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < LINK) {
          ctx.strokeStyle = isLight()
            ? `rgba(10,142,160,${(1 - d / LINK) * 0.25})`
            : `rgba(0,240,255,${(1 - d / LINK) * 0.16})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      const a = pts[i];
      const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
      if (dm < 160) {
        ctx.strokeStyle = isLight()
          ? `rgba(214,22,95,${(1 - dm / 160) * 0.4})`
          : `rgba(255,45,120,${(1 - dm / 160) * 0.35})`;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
      }
    }
    requestAnimationFrame(tick);
  })();
})();

/* ================= LITE VIDEO EMBEDS ================= */
/* Chapter videos: thumbnail + play button → click loads the
   real YouTube iframe. If embeds are blocked (file://, ad
   blocker), the card still looks good and the ↗ link works. */
(function liteEmbed() {
  document.querySelectorAll(".video-wrap.lite").forEach(w => {
    const id = w.dataset.ytid;
    if (!id) return;
    const t = w.dataset.title || "YouTube video";
    w.innerHTML = `
      <img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="${t}" loading="lazy">
      <button class="lite-play" aria-label="Play: ${t}">▶</button>`;
    w.setAttribute("role", "button");
    w.setAttribute("tabindex", "0");
    w.setAttribute("aria-label", "Play: " + t);
    const play = () => {
      w.classList.remove("lite");
      w.removeAttribute("role"); w.removeAttribute("tabindex");
      w.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1&rel=0" title="${t}" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    };
    w.addEventListener("click", play);
    w.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); play(); } });
  });
})();

/* ================= HERO: SHORT FILM ================= */
/* The film loops muted as a live teaser beside the title;
   one click unmutes it and hands over native controls. */
(function heroFilm() {
  const v = document.getElementById("hero-film");
  const btn = document.getElementById("film-toggle");
  if (!v) return;
  v.play().catch(() => {}); // muted autoplay is allowed by browsers
  function enableSound() {
    v.muted = false;
    v.loop = false;
    v.currentTime = 0;
    v.controls = true;
    btn.style.display = "none";
    v.play().catch(() => {});
  }
  btn.addEventListener("click", e => { e.stopPropagation(); enableSound(); });
  v.addEventListener("click", () => { if (v.muted && !v.controls) enableSound(); });
})();

/* ================= HERO: TYPEWRITER ================= */
(function typewriter() {
  const el = document.getElementById("typed");
  if (!el) return;
  const lines = [
    "Every click leaves an echo.",
    "Who listens to ours?",
    "log( user ) > log( human ) ?",
  ];
  let li = 0, ci = 0, del = false;
  (function type() {
    const line = lines[li];
    el.textContent = line.slice(0, ci);
    if (!del) {
      if (++ci > line.length) { del = true; return setTimeout(type, 2200); }
      setTimeout(type, 55);
    } else {
      if (--ci === 0) { del = false; li = (li + 1) % lines.length; }
      setTimeout(type, 26);
    }
  })();
})();

/* ================= SCROLL: progress, reveal, counters, nav ================= */
(function scrollFx() {
  const bar = document.getElementById("progress-bar");
  window.addEventListener("scroll", () => {
    const p = window.scrollY / (document.body.scrollHeight - innerHeight);
    bar.style.width = (p * 100).toFixed(2) + "%";
  }, { passive: true });

  const io = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
    }
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  // animated counters
  const cio = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const el = e.target, target = parseFloat(el.dataset.target), dec = +el.dataset.decimals;
      const t0 = performance.now(), dur = 1600;
      (function step(t) {
        const k = Math.min((t - t0) / dur, 1);
        el.textContent = (target * (1 - Math.pow(1 - k, 3))).toFixed(dec);
        if (k < 1) requestAnimationFrame(step);
      })(t0);
      cio.unobserve(el);
    }
  }, { threshold: 0.6 });
  document.querySelectorAll(".stat-num").forEach(el => cio.observe(el));

  // nav active link
  const links = document.querySelectorAll(".nav-links a");
  const nio = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
    }
  }, { rootMargin: "-40% 0px -55% 0px" });
  document.querySelectorAll("section[id]").forEach(s => nio.observe(s));
})();

/* ================= INTRO: DATA TRAIL ================= */
(function trail() {
  const timeEl = document.getElementById("trail-time");
  if (!timeEl) return;
  const actEl = document.getElementById("trail-act");
  const btn = document.getElementById("trail-next");
  const chips = document.getElementById("trail-chips");
  const verdict = document.getElementById("trail-verdict");
  let step = -1;

  btn.addEventListener("click", () => {
    step++;
    if (step >= TRAIL_STEPS.length) {
      // reset
      step = -1; chips.innerHTML = ""; verdict.textContent = "";
      timeEl.textContent = "— : —";
      actEl.textContent = "Press START to begin your day.";
      btn.textContent = "▶ Start the day";
      return;
    }
    const s = TRAIL_STEPS[step];
    timeEl.textContent = s.time;
    actEl.textContent = s.act;
    for (const c of s.chips) {
      const el = document.createElement("span");
      el.className = "chip"; el.textContent = c;
      chips.appendChild(el);
    }
    if (step === TRAIL_STEPS.length - 1) {
      verdict.textContent = TRAIL_VERDICT;
      btn.textContent = "↻ Start over";
    } else {
      btn.textContent = "→ " + TRAIL_STEPS[step + 1].time;
    }
  });
})();

/* ================= CH1: ECHO COMPANION ================= */
(function echo() {
  const avatar = document.getElementById("echo");
  if (!avatar) return;
  const moodEl = document.getElementById("echo-mood");
  const ring = document.getElementById("ring-fill");
  const scoreNum = document.getElementById("score-num");
  const co2El = document.getElementById("co2-val");
  const treesEl = document.getElementById("echo-trees");
  const grove = document.getElementById("echo-grove");
  const log = document.getElementById("echo-log");
  const btns = document.querySelectorAll(".echo-btns .btn");

  let score = 70, co2 = 0, trees = 0;
  const CIRC = 264; // 2π × r42

  function addLog(text, good) {
    const li = document.createElement("li");
    li.textContent = text;
    if (good) li.className = "good";
    log.prepend(li);
    while (log.children.length > 10) log.lastChild.remove();
  }

  function render() {
    scoreNum.textContent = Math.round(score);
    ring.style.strokeDashoffset = CIRC * (1 - score / 100);
    ring.style.stroke = score < 25 ? "var(--magenta)" : score < 55 ? "#f0a500" : "var(--cyan)";
    co2El.textContent = Math.round(co2);
    treesEl.textContent = trees;
    const st = ECHO_STATES.find(s => score >= s.min);
    avatar.className = "echo " + st.cls;
    moodEl.textContent = st.mood;
    // below 15 → machine has won, digital actions locked until you go outside
    const locked = score < 15;
    btns.forEach(b => { b.disabled = locked && b.dataset.act !== "outside"; });
  }

  function plantTree() {
    if (trees >= 8) return;
    trees++;
    const t = document.createElement("span");
    t.className = "tree"; t.textContent = "🌳";
    grove.appendChild(t);
  }

  btns.forEach(b => b.addEventListener("click", () => {
    const a = ECHO_ACTIONS[b.dataset.act];
    score = Math.max(0, Math.min(100, score + a.score));
    co2 = Math.max(0, co2 + a.co2);
    const good = a.score > 0;
    window.ECHOES && ECHOES.add(good ? 3 : -2, a.text);
    addLog(`${a.text} ${good ? "→ +" : "→ "}${a.score} balance${a.co2 ? `, +${a.co2}g CO₂` : ""}`, good);
    if (good && Math.random() < 0.7) addLog(ECHO_LOGS.up[Math.floor(Math.random() * ECHO_LOGS.up.length)], true);
    if (!good) addLog(ECHO_LOGS.down[Math.floor(Math.random() * ECHO_LOGS.down.length)]);
    if (b.dataset.act === "outside" && score >= 80) { plantTree(); }
    if (score === 0) addLog("ECHO has gone full machine. Reboot: go outside.", false);
    render();
  }));

  render();
})();

/* ================= CH1: FOCUS TEST ================= */
(function focus() {
  const area = document.getElementById("focus-area");
  if (!area) return;
  const startBtn = document.getElementById("focus-start");
  const result = document.getElementById("focus-result");
  let running = false;

  startBtn.addEventListener("click", () => {
    if (running) return;
    running = true;
    result.textContent = "";
    startBtn.style.display = "none";
    area.classList.add("playing");
    let closed = 0, spawned = 0;

    function spawn() {
      if (!running) return;
      spawned++;
      const p = document.createElement("div");
      p.className = "popup";
      const txt = FOCUS_POPUPS[Math.floor(Math.random() * FOCUS_POPUPS.length)];
      p.innerHTML = `<span class="px">✕</span>${txt}`;
      p.style.left = (5 + Math.random() * 68) + "%";
      p.style.top = (8 + Math.random() * 74) + "%";
      p.addEventListener("click", () => { closed++; p.remove(); });
      area.appendChild(p);
      setTimeout(() => p.remove(), 4000); // missed pop-ups fade
    }

    const spawnLoop = setInterval(spawn, 750);
    spawn();

    setTimeout(() => {
      running = false;
      clearInterval(spawnLoop);
      area.querySelectorAll(".popup").forEach(p => p.remove());
      area.classList.remove("playing");
      result.innerHTML =
        `You closed <strong>${closed}</strong> pop-ups in 15 seconds. ` +
        `Research (UC Irvine) found each interruption costs ~23 minutes of deep focus. ` +
        `Your brain runs this gauntlet all day — ${spawned} notifications wanted your attention just now.`;
      window.ECHOES && ECHOES.add(4, "attention reclaimed");
      startBtn.textContent = "↻ Try again";
      startBtn.style.display = "";
    }, 15000);
  });
})();

/* ================= CH2: INTERACTIVE STORY ================= */
(function story() {
  const chat = document.getElementById("chat");
  const choices = document.getElementById("choices");
  if (!chat) return;

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  function addMsg(m) {
    const div = document.createElement("div");
    div.className = "msg " + m.cls;
    if (m.cls === "sys") { div.textContent = m.text; }
    else {
      const who = document.createElement("span");
      who.className = "who"; who.textContent = m.who;
      div.appendChild(who);
      div.appendChild(document.createTextNode(m.text));
    }
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
  }

  async function typing() {
    const t = document.createElement("div");
    t.className = "msg typing"; t.textContent = "…";
    chat.appendChild(t); chat.scrollTop = chat.scrollHeight;
    await sleep(650);
    t.remove();
  }

  async function play(nodeKey) {
    const node = STORY[nodeKey];
    choices.innerHTML = "";
    for (const m of node.messages) {
      await typing();
      addMsg(m);
      await sleep(420);
    }
    if (node.end) return showEnd(node.end);
    for (const c of node.choices) {
      const b = document.createElement("button");
      b.className = "choice-btn";
      b.textContent = c.text;
      b.addEventListener("click", () => play(c.next), { once: true });
      choices.appendChild(b);
    }
  }

  function showEnd(end) {
    if (end.sig) window.ECHOES && ECHOES.add(end.sig, "story ending");
    const sys = document.createElement("div");
    sys.className = "msg sys";
    sys.textContent = "— end of conversation —";
    chat.appendChild(sys);

    const card = document.createElement("div");
    card.className = "story-end";
    card.innerHTML = `<strong>${end.title}</strong><br><br>${end.text}`;
    choices.appendChild(card);

    const rb = document.createElement("button");
    rb.className = "btn btn-ghost";
    rb.style.marginTop = "14px";
    rb.textContent = "↻ Replay — try a different choice";
    rb.addEventListener("click", () => { chat.innerHTML = ""; play("start"); });
    choices.appendChild(rb);
    chat.scrollTop = chat.scrollHeight;
  }

  play("start");
})();

/* ================= CH2: REPORT OR SCROLL ================= */
(function reportOrScroll() {
  const card = document.getElementById("report-card");
  if (!card) return;
  const explain = document.getElementById("report-explain");
  const progress = document.getElementById("report-progress");
  const btnRep = document.getElementById("rep-report");
  const btnSkip = document.getElementById("rep-skip");
  let i = 0, correct = 0, answered = false;

  function render() {
    answered = false;
    explain.textContent = "";
    explain.className = "report-explain";
    card.textContent = REPORT_CARDS[i].msg;
    progress.textContent = `MESSAGE ${i + 1} / ${REPORT_CARDS.length}`;
    btnRep.textContent = "🚩 Report";
    btnSkip.textContent = "Keep scrolling";
  }

  function answer(reported) {
    if (answered) return;
    answered = true;
    const c = REPORT_CARDS[i];
    const right = reported === c.bad;
    if (right) correct++;
    window.ECHOES && ECHOES.add(right ? 2 : -1, right ? "flagged correctly" : "missed it");
    explain.className = "report-explain " + (right ? "ok" : "bad");
    explain.textContent = (right ? "✓ " : "✗ ") + c.why;
    progress.textContent = `MESSAGE ${i + 1} / ${REPORT_CARDS.length} — score: ${correct}`;
    if (i < REPORT_CARDS.length - 1) {
      btnRep.textContent = "→ Next message";
      btnSkip.textContent = "→ Next message";
      const next = () => { i++; render(); cleanup(); };
      function cleanup() { btnRep.removeEventListener("click", next); btnSkip.removeEventListener("click", next); }
      btnRep.addEventListener("click", next);
      btnSkip.addEventListener("click", next);
    } else {
      btnRep.style.display = "none";
      btnSkip.style.display = "none";
      progress.textContent =
        `FINAL SCORE: ${correct} / ${REPORT_CARDS.length} — ` +
        (correct === REPORT_CARDS.length ? "a moderator's eye. The feed needs more people like you."
         : correct >= 3 ? "decent instincts — context is everything. When in doubt, check on the target, not the post."
         : "the algorithm thanks you for scrolling. So does the bully.");
    }
  }

  btnRep.addEventListener("click", () => answer(true));
  btnSkip.addEventListener("click", () => answer(false));
  render();
})();

/* ================= CH3: THE 20-SECOND DECISION ================= */
(function decision() {
  const box = document.getElementById("dec-box");
  if (!box) return;
  const startBtn = document.getElementById("dec-start");

  startBtn.addEventListener("click", () => {
    box.innerHTML = "";
    const file = document.createElement("div");
    file.className = "dec-file";
    file.innerHTML = `<p class="dec-ref">${DECISION_FILE.ref}</p>` +
      DECISION_FILE.fields.map(f => `<div class="dec-row"><span>${f[0]}</span><span>${f[1]}</span></div>`).join("");
    const timer = document.createElement("div");
    timer.className = "dec-timer";
    const bar = document.createElement("div");
    timer.appendChild(bar);
    const btns = document.createElement("div");
    btns.className = "dec-btns";
    const yes = document.createElement("button");
    yes.className = "btn btn-dec"; yes.textContent = "APPROVE STRIKE";
    const no = document.createElement("button");
    no.className = "btn"; no.textContent = "REJECT";
    btns.append(yes, no);
    box.append(file, timer, btns);

    let done = false;
    function finish(choice) {
      if (done) return;
      done = true;
      clearInterval(tick);
      box.innerHTML = "";
      const r = document.createElement("div");
      r.className = "dec-reveal";
      const sigMap = { approve: -8, reject: 6, timeout: -5 };
      window.ECHOES && ECHOES.add(sigMap[choice], choice === "approve" ? "strike approved" : choice === "reject" ? "target rejected" : "defaulted to machine");
      const verdict = choice === "approve"
        ? "<strong>STRIKE LOGGED.</strong> "
        : choice === "reject"
        ? "<strong>TARGET REJECTED — this time.</strong> "
        : "<strong>NO REVIEW RECORDED — treated as approval.</strong> ";
      r.innerHTML = verdict + DECISION_FILE.reveal;
      const rb = document.createElement("button");
      rb.className = "btn btn-ghost"; rb.style.marginTop = "18px";
      rb.textContent = "↻ Review another file";
      rb.addEventListener("click", () => { box.innerHTML = ""; box.appendChild(startBtn); });
      box.append(r, rb);
    }

    const t0 = performance.now();
    const tick = setInterval(() => {
      const left = DECISION_FILE.seconds - (performance.now() - t0) / 1000;
      bar.style.width = Math.max(0, (left / DECISION_FILE.seconds) * 100) + "%";
      if (left <= 0) finish("timeout");
    }, 50);

    yes.addEventListener("click", () => finish("approve"));
    no.addEventListener("click", () => finish("reject"));
  });
})();

/* ================= CH3: SPOT THE BOT ================= */
(function spotBot() {
  const panelA = document.getElementById("bot-a");
  if (!panelA) return;
  const panelB = document.getElementById("bot-b");
  const roundEl = document.getElementById("bot-round");
  const explain = document.getElementById("bot-explain");
  const scoreEl = document.getElementById("bot-score");
  let i = 0, score = 0, answered = false;

  function render() {
    answered = false;
    explain.textContent = "";
    const r = BOT_ROUNDS[i];
    // randomise which panel holds the human text
    const humanOnA = Math.random() < 0.5;
    panelA.textContent = humanOnA ? r.human : r.bot;
    panelB.textContent = humanOnA ? r.bot : r.human;
    panelA.dataset.side = "POST A"; panelB.dataset.side = "POST B";
    panelA.dataset.human = humanOnA; panelB.dataset.human = !humanOnA;
    panelA.className = "bot-panel"; panelB.className = "bot-panel";
    roundEl.textContent = `ROUND ${i + 1} / ${BOT_ROUNDS.length} — click the HUMAN post`;
  }

  function answer(panel) {
    if (answered) return;
    answered = true;
    const right = panel.dataset.human === "true";
    if (right) score++;
    window.ECHOES && ECHOES.add(right ? 2 : -1, right ? "bot spotted" : "fooled by AI");
    panel.classList.add(right ? "right" : "wrong");
    (panel === panelA ? panelB : panelA).classList.add(right ? "wrong" : "right");
    explain.textContent = BOT_ROUNDS[i].why;
    scoreEl.textContent = `SCORE: ${score} / ${BOT_ROUNDS.length}`;
    setTimeout(() => {
      i++;
      if (i < BOT_ROUNDS.length) render();
      else {
        roundEl.textContent = "DIAGNOSTIC COMPLETE";
        panelA.style.display = "none"; panelB.style.display = "none";
        explain.textContent =
          `You spotted ${score} of ${BOT_ROUNDS.length} bots. ` +
          (score >= 3 ? "Sharp eyes — but AI gets better every month. The safest rule: verify the source, not the style."
           : "It fooled you — and it's getting better. That's exactly why verification matters more than vibes.");
        scoreEl.textContent = "";
        const rb = document.createElement("button");
        rb.className = "btn btn-ghost"; rb.style.marginTop = "12px";
        rb.textContent = "↻ Play again";
        rb.addEventListener("click", () => {
          i = 0; score = 0;
          panelA.style.display = ""; panelB.style.display = "";
          rb.remove(); render();
        });
        scoreEl.parentElement.appendChild(rb);
      }
    }, 2200);
  }

  panelA.addEventListener("click", () => answer(panelA));
  panelB.addEventListener("click", () => answer(panelB));
  render();
})();

/* ================= CH4: THIRST CALCULATOR ================= */
(function calc() {
  const slider = document.getElementById("queries");
  if (!slider) return;
  const lbl = document.getElementById("queries-label");
  const day = document.getElementById("water-day");
  const year = document.getElementById("water-year");
  const bottles = document.getElementById("water-bottles");

  // ~15 ml freshwater per AI query (mid-range estimate from
  // UC Riverside "Making AI Less Thirsty", 2023 — illustrative)
  const ML_PER_QUERY = 15;

  function render() {
    const q = +slider.value;
    lbl.textContent = q;
    const ml = q * ML_PER_QUERY;
    day.textContent = ml >= 1000 ? (ml / 1000).toFixed(1) + " L" : ml;
    const litresYear = (ml * 365) / 1000;
    year.textContent = litresYear.toLocaleString("en-US", { maximumFractionDigits: 0 });
    bottles.textContent = Math.round(ml * 365 / 500).toLocaleString("en-US");
  }
  slider.addEventListener("input", render);
  render();
})();

/* ================= CH5: QUIZ ================= */
(function quiz() {
  const box = document.getElementById("quiz-box");
  if (!box) return;
  let i = 0, score = 0;

  function renderQ() {
    const q = QUIZ.questions[i];
    box.innerHTML = "";
    const head = document.createElement("p");
    head.className = "quiz-q";
    head.innerHTML = `<span>QUESTION ${i + 1} / ${QUIZ.questions.length}</span>${q.q}`;
    box.appendChild(head);
    const opts = document.createElement("div");
    opts.className = "quiz-opts";
    for (const o of q.opts) {
      const b = document.createElement("button");
      b.className = "choice-btn";
      b.textContent = o.t;
      b.addEventListener("click", () => {
        score += o.s; i++;
        i < QUIZ.questions.length ? renderQ() : showResult();
      });
      opts.appendChild(b);
    }
    box.appendChild(opts);
  }

  function showResult() {
    const max = QUIZ.questions.length * 3;
    const r = [...QUIZ.results].reverse().find(x => score >= x.min);
    window.ECHOES && ECHOES.add(score - 7, "self-diagnostic");
    box.innerHTML = "";
    const div = document.createElement("div");
    div.className = "quiz-result";
    div.innerHTML = `
      <h4>${r.name}</h4>
      <div class="quiz-bar"><div style="width:${(score / max) * 100}%"></div></div>
      <p>HUMANITY SCORE: ${score} / ${max}</p>
      <p>${r.text}</p>`;
    const rb = document.createElement("button");
    rb.className = "btn btn-ghost";
    rb.textContent = "↻ Run diagnostic again";
    rb.addEventListener("click", () => { i = 0; score = 0; renderQ(); });
    div.appendChild(rb);
    box.appendChild(div);
  }

  renderQ();
})();

/* ================= CH5: DIGITAL PLEDGE ================= */
(function pledge() {
  const btn = document.getElementById("pledge-sign");
  if (!btn) return;
  const card = document.getElementById("pledge-card");
  const nameInput = document.getElementById("pledge-name");

  btn.addEventListener("click", () => {
    const checks = [...document.querySelectorAll(".pledge-form input[type=checkbox]:checked")];
    const name = nameInput.value.trim() || "Anonymous human";
    if (!checks.length) {
      card.className = "pledge-card show";
      card.innerHTML = "<h4>NOTHING SELECTED</h4><p style='color:var(--dim)'>A pledge needs at least one commitment — pick something small. Small counts.</p>";
      return;
    }
    card.className = "pledge-card show";
    card.innerHTML = `
      <h4>◈ THE DIGITAL PLEDGE</h4>
      <p class="p-name">I, ${name.replace(/</g, "&lt;")}, choose to:</p>
      <ul>${checks.map(c => `<li>${c.value}</li>`).join("")}</ul>
      <p class="p-date">Signed ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} — SILENT ECHOES</p>`;
    window.ECHOES && ECHOES.add(10, "pledge signed");
    card.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
})();

/* ================= WATCH — VIDEO GALLERY ================= */
(function watch() {
  const grid = document.getElementById("watch-grid");
  if (!grid) return;
  const tabs = document.getElementById("watch-tabs");

  function render(cat) {
    grid.innerHTML = "";
    VIDEOS[cat].forEach((v, i) => {
      const c = document.createElement("div");
      c.className = "vid-card";
      c.style.animationDelay = (i * 70) + "ms";
      c.innerHTML = `
        <img src="https://i.ytimg.com/vi/${v.id}/hqdefault.jpg" alt="${v.t}" loading="lazy">
        <div class="play"><span>▶</span></div>
        <a class="vid-ext" href="https://youtu.be/${v.id}" target="_blank" rel="noopener" title="Open on YouTube">↗</a>
        <div class="vid-info"><strong>${v.t}</strong><small>${v.s}</small></div>`;
      c.querySelector(".vid-ext").addEventListener("click", e => e.stopPropagation());
      c.addEventListener("click", () => {
        if (c.classList.contains("playing")) return;
        c.classList.add("playing");
        c.innerHTML = `<iframe src="https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0" title="${v.t}" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      });
      grid.appendChild(c);
    });
  }

  tabs.addEventListener("click", e => {
    const b = e.target.closest(".tab");
    if (!b) return;
    tabs.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    b.classList.add("active");
    render(b.dataset.cat);
  });

  render("feed");
})();

/* ================= LIVE FEED (RSS) ================= */
(function feed() {
  const grid = document.getElementById("feed-grid");
  const status = document.getElementById("feed-status");
  const tabs = document.getElementById("feed-tabs");
  if (!grid) return;

  const cache = {};

  function fmtDate(iso) {
    try {
      const d = new Date(iso.replace(" ", "T"));
      return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    } catch { return ""; }
  }

  function card(item, catLabel, source) {
    const a = document.createElement("a");
    a.className = "news-card";
    a.href = item.url || item.link;
    a.target = "_blank"; a.rel = "noopener";
    a.innerHTML = `
      <span class="news-cat">${catLabel}</span>
      <span class="news-title">${item.title}</span>
      <span class="news-meta"><span>${source || ""}</span><span>${fmtDate(item.pubDate || "")}</span></span>`;
    return a;
  }

  function cleanSource(feedTitle) {
    // "Technology | The Guardian" -> "The Guardian" ; "BBC News - World" -> "World · BBC"
    if (!feedTitle) return "";
    const parts = feedTitle.split("|");
    if (parts.length > 1) return parts.pop().trim();
    return feedTitle.trim();
  }

  async function fetchCat(key) {
    if (cache[key]) return cache[key];
    const results = await Promise.all(NEWS_FEEDS[key].rss.map(async url => {
      const ctrl = new AbortController();
      const to = setTimeout(() => ctrl.abort(), 9000);
      try {
        const res = await fetch(RSS_API + encodeURIComponent(url), { signal: ctrl.signal });
        const json = await res.json();
        if (json.status !== "ok" || !json.items) return [];
        const src = cleanSource(json.feed && json.feed.title);
        return json.items.slice(0, 5).map(it => ({
          title: it.title, link: it.link, pubDate: it.pubDate, source: src,
        }));
      } catch { return []; }
      finally { clearTimeout(to); }
    }));
    const items = results.flat();
    if (!items.length) throw new Error("feed error");
    // newest first, keep 6
    items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
    cache[key] = items.slice(0, 6);
    return cache[key];
  }

  async function load(cat) {
    grid.innerHTML = "";
    status.className = "feed-status";
    status.textContent = "Connecting to the signal…";
    try {
      if (cat === "all") {
        const keys = Object.keys(NEWS_FEEDS);
        const results = await Promise.all(keys.map(k => fetchCat(k).catch(() => [])));
        if (!results.flat().length) throw new Error("feed error");
        let i = 0;
        results.forEach((items, idx) => {
          items.slice(0, 2).forEach(it => {
            const c = card(it, NEWS_FEEDS[keys[idx]].label, it.source);
            c.style.animationDelay = (i++ * 60) + "ms";
            grid.appendChild(c);
          });
        });
      } else {
        const items = await fetchCat(cat);
        items.forEach((it, i) => {
          const c = card(it, NEWS_FEEDS[cat].label, it.source);
          c.style.animationDelay = (i * 60) + "ms";
          grid.appendChild(c);
        });
      }
      status.classList.add("ok");
      status.textContent = `▸ LIVE — updated ${new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })} · via The Guardian & BBC RSS`;
    } catch {
      // fallback: curated links
      status.classList.add("warn");
      status.textContent = "▸ LIVE SIGNAL UNAVAILABLE — showing curated sources instead";
      const items = FALLBACK_NEWS.filter(n => cat === "all" || n.cat === cat);
      items.forEach((n, i) => {
        const c = card({ title: n.title, url: n.url }, NEWS_FEEDS[n.cat].label, n.source);
        c.style.animationDelay = (i * 60) + "ms";
        grid.appendChild(c);
      });
    }
  }

  tabs.addEventListener("click", e => {
    const b = e.target.closest(".tab");
    if (!b) return;
    tabs.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    b.classList.add("active");
    load(b.dataset.feed);
  });

  // lazy-load when the feed section first scrolls into view
  const fio = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { load("all"); fio.disconnect(); }
  }, { threshold: 0.05 });
  fio.observe(document.getElementById("feed"));
})();

/* ================= GLOBAL: HUMANITY SIGNAL HUD ================= */
/* A site-wide score influenced by every choice the visitor makes
   in the games - the site literally judges your digital humanity. */
(function signal() {
  const hud = document.createElement("aside");
  hud.id = "signal-hud";
  hud.setAttribute("role", "status");
  hud.setAttribute("aria-live", "polite");
  hud.innerHTML = `
    <p class="sig-title">HUMANITY SIGNAL</p>
    <div class="sig-bar"><div id="sig-fill"></div></div>
    <p class="sig-val"><span id="sig-num">50</span>% <span class="sig-hint">- your choices shape it</span></p>`;
  document.body.appendChild(hud);
  let v = 50;
  const fill = hud.querySelector("#sig-fill");
  const num = hud.querySelector("#sig-num");
  window.ECHOES = {
    add(n, note) {
      v = Math.max(0, Math.min(100, v + n));
      fill.style.width = v + "%";
      num.textContent = v;
      if (note) {
        const t = document.createElement("div");
        t.className = "sig-toast";
        t.textContent = (n > 0 ? "+" : "") + n + " — " + note;
        hud.appendChild(t);
        setTimeout(() => t.remove(), 2800);
      }
    },
  };
  hud.addEventListener("click", () => hud.classList.toggle("mini"));
})();

/* ================= BOOT SEQUENCE ================= */
(function boot() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  try { if (sessionStorage.getItem("echoes-booted")) return; sessionStorage.setItem("echoes-booted", "1"); } catch (e) {}
  const lines = [
    ["SILENT_ECHOES v2.6 // booting", ""],
    ["loading empathy_module ......... OK", "ok"],
    ["scanning attention span ........ 6h40/day detected", ""],
    ["scanning teen feeds ............ 46% harassed", "warn"],
    ["scanning conflict systems ...... LAVENDER online", "warn"],
    ["scanning water reserves ........ 24.7B litres allocated", "warn"],
    ["human operator detected ........ welcome", "ok"],
  ];
  const o = document.createElement("div");
  o.id = "boot";
  const term = document.createElement("div");
  term.className = "boot-term";
  o.appendChild(term);
  document.body.appendChild(o);
  let i = 0, finished = false;
  function done() {
    if (finished) return;
    finished = true;
    o.classList.add("off");
    setTimeout(() => o.remove(), 650);
  }
  (function next() {
    if (finished) return;
    if (i >= lines.length) {
      const h = document.createElement("p");
      h.className = "boot-hint"; h.textContent = "CLICK OR PRESS ANY KEY TO ENTER";
      term.appendChild(h);
      setTimeout(done, 1400);
      return;
    }
    const p = document.createElement("p");
    p.className = lines[i][1];
    p.textContent = lines[i][0];
    term.appendChild(p);
    i++;
    setTimeout(next, 240 + Math.random() * 260);
  })();
  o.addEventListener("click", done);
  document.addEventListener("keydown", done, { once: true });
})();

/* ================= CURSOR ECHOES ================= */
(function cursorEcho() {
  if (!matchMedia("(pointer:fine)").matches) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let last = 0;
  document.addEventListener("mousemove", e => {
    const now = performance.now();
    if (now - last < 55) return;
    last = now;
    const d = document.createElement("span");
    d.className = "echo-dot";
    d.style.left = e.clientX + "px";
    d.style.top = e.clientY + "px";
    document.body.appendChild(d);
    setTimeout(() => d.remove(), 750);
  }, { passive: true });
})();

/* ================= GLITCH TITLE LETTERS ================= */
(function titleFx() {
  const h = document.querySelector(".glitch");
  if (!h) return;
  const t = h.textContent;
  h.textContent = "";
  for (const ch of t) {
    const s = document.createElement("span");
    s.textContent = ch === " " ? "\u00A0" : ch;
    h.appendChild(s);
  }
  h.addEventListener("mouseover", e => {
    const s = e.target;
    if (s.tagName !== "SPAN" || s._busy) return;
    s._busy = true;
    s.style.transform = `translate(${(Math.random() - .5) * 16}px, ${(Math.random() - .5) * 16}px)`;
    s.style.color = Math.random() < .5 ? "var(--cyan)" : "var(--magenta)";
    setTimeout(() => { s.style.transform = ""; s.style.color = ""; s._busy = false; }, 350);
  });
})();
