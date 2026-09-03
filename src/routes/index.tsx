import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const logoUrl = `${import.meta.env.BASE_URL}acrylamide-appIcon.png`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AcrylAMIDE — Rust Agentic Multiplexer & IDE" },
      {
        name: "description",
        content:
          "AcrylAMIDE is a Rust-based agentic multiplexer and IDE on GPUI and Acrylamide. 128 parallel agent threads, 0.12ms latency, 120 FPS native canvas.",
      },
      { property: "og:title", content: "AcrylAMIDE — Too Fast To Be Safe" },
      {
        property: "og:description",
        content:
          "Unhinged raw velocity for chaotic systems engineers. Rust + GPUI + Acrylamide agentic multiplexing.",
      },
    ],
  }),
  component: Index,
});

const NAV = [
  { id: "01", label: "ARCHITECTURE", href: "#architecture" },
  { id: "02", label: "BENCHMARKS", href: "#benchmarks" },
  { id: "03", label: "AMIDE CLI", href: "#cli" },
  { id: "04", label: "LORE", href: "#lore" },
];

const TERMINAL_LINES: { tag: string; text: string; tone: "acid" | "warn" | "dim" }[] = [
  { tag: "[ACRYL::AMIDE]", text: "Spawning 128 parallel agentic threads...", tone: "acid" },
  { tag: "[GPUI::RENDER]", text: "Frame latency: 0.12ms (120 FPS locked)", tone: "dim" },
  { tag: "[ACRYL::GEL]", text: "Compiling AST stream across 42,000 files...", tone: "dim" },
  { tag: "[WARNING]", text: "May cause extreme developer velocity.", tone: "warn" },
  { tag: "[STATUS]", text: "Technical debt dissolved in 1.4 seconds.", tone: "acid" },
];

const METRICS = [
  { label: "LATENCY", value: "0.12ms", sub: "Sub-frame agent thread switching" },
  { label: "WORKLOAD", value: "128x", sub: "Concurrent AI model multiplexing" },
  { label: "RENDERING", value: "120 FPS", sub: "Native GPU canvas via GPUI" },
  { label: "GC PAUSE", value: "0.00ms", sub: "Zero-cost Rust memory model" },
];

const COMPARISON = [
  ["Primary focus", "User safety & predictability", "Hazardous developer velocity"],
  ["Architecture", "Single / dual thread helpers", "128-thread Agentic Multiplexer"],
  ["Execution engine", "Webview / Electron overhead", "Pure Rust + GPUI + Acrylamide"],
  ["CLI command", "code .", "amide run --toxic"],
  ["Vibe", '"Minimalist luxury"', "Biohazard cyber-reactor"],
];

const MODULES = [
  {
    id: "M-01",
    title: "AGENT MULTIPLEXING (AM)",
    body: "Parallel AST context routing across local and cloud models simultaneously. Zero thread blocking, zero polite queueing.",
  },
  {
    id: "M-02",
    title: "GEL BUFFER INTEGRATION",
    body: "Sub-millisecond text processing pipeline designed for multi-agent real-time code mutation on live buffers.",
  },
  {
    id: "M-03",
    title: "HAZARDOUS CLI (amide)",
    body: "Run headless agent refactoring direct from your terminal using amide run or amide launch. No GUI required, no supervision offered.",
  },
];

function Logo() {
  return (
    <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-primary/40 bg-black/60 shadow-[0_0_15px_oklch(0.885_0.29_137/0.25)] backdrop-blur-md">
      <img src={logoUrl} alt="Acrylamide logo" className="h-8 w-8 object-contain" />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b hairline bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-3">
          <Logo />
          <span className="text-[15px] font-bold tracking-tight">
            Acryl<span className="text-primary text-glow">AM</span>IDE
          </span>
        </a>
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={n.href}
              className="mono-label text-muted-foreground transition-colors hover:text-primary"
            >
              [{n.id} // {n.label}]
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <span className="mono-label hidden items-center gap-2 text-muted-foreground md:inline-flex">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            REACTOR: ACTIVE (128 THREADS)
          </span>
          <a
            href="#cli"
            className="mono-label glass-panel rounded-sm px-3 py-2 text-primary transition-shadow hover:shadow-[var(--glow-sm)]"
          >
            [INSTALL CLI]
          </a>
        </div>
      </div>
    </header>
  );
}

function InstallBox() {
  const cmd = "curl -sSL https://acryl.dev/install.sh | sh";
  const [copied, setCopied] = useState(false);
  return (
    <div className="glass-panel rounded-sm">
      <div className="flex items-center justify-between border-b hairline px-4 py-2">
        <span className="mono-label text-muted-foreground">INSTALL // ONE SHOT</span>
        <button
          onClick={() => {
            navigator.clipboard?.writeText(cmd);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          }}
          className="mono-label text-primary hover:text-glow"
        >
          {copied ? "[COPIED]" : "[COPY]"}
        </button>
      </div>
      <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <code className="font-mono text-[13px] text-foreground">
          <span className="text-primary">$ </span>
          {cmd}
        </code>
        <a
          href="#cli"
          className="mono-label shrink-0 rounded-sm border border-primary/50 bg-primary/10 px-3 py-2 text-primary transition-shadow hover:shadow-[var(--glow-sm)]"
        >
          amide launch
        </a>
      </div>
    </div>
  );
}

function Terminal() {
  const [count, setCount] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    timer.current = setInterval(() => {
      setCount((c) => (c >= TERMINAL_LINES.length ? 1 : c + 1));
    }, 900);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  return (
    <div className="glass-panel relative overflow-hidden rounded-sm">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-primary/10 to-transparent scanline" />
      <div className="flex items-center justify-between border-b hairline px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-warning/70" />
          <span className="h-2 w-2 rounded-full bg-primary/70" />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/50" />
          <span className="mono-label ml-2 text-muted-foreground">AMIDE :: EXEC LOOP</span>
        </div>
        <span className="mono-label text-primary">LIVE</span>
      </div>
      <div className="min-h-[280px] space-y-2 px-4 py-4 font-mono text-[12px] leading-relaxed">
        {TERMINAL_LINES.slice(0, count).map((l) => (
          <p key={l.tag} className="flex gap-2">
            <span
              className={
                l.tone === "warn"
                  ? "text-warning"
                  : l.tone === "acid"
                    ? "text-primary text-glow"
                    : "text-muted-foreground"
              }
            >
              {l.tag}
            </span>
            <span className={l.tone === "warn" ? "text-warning" : "text-foreground/90"}>
              {l.text}
            </span>
          </p>
        ))}
        <p className="text-primary">
          <span className="animate-pulse">▊</span>
        </p>
      </div>
      <div className="grid grid-cols-3 border-t hairline">
        {[
          ["THREADS", "128"],
          ["FRAME", "0.12ms"],
          ["HEAP", "STATIC"],
        ].map(([k, v]) => (
          <div key={k} className="border-r hairline px-4 py-3 last:border-r-0">
            <div className="mono-label text-muted-foreground">{k}</div>
            <div className="font-mono text-sm text-primary">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Index() {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto max-w-[1400px] border-x hairline">
        {/* HERO */}
        <section className="grid grid-cols-1 lg:grid-cols-2">
          <div className="border-b hairline px-6 py-14 lg:border-r lg:border-b-0 lg:px-10 lg:py-20">
            <span className="mono-label inline-block rounded-full border hairline px-3 py-1.5 text-primary">
              ACRYL.DEV // RUST AGENTIC MULTIPLEXER
            </span>
            <h1 className="mt-8 text-[clamp(2.6rem,6vw,4.6rem)] leading-[0.92] font-bold tracking-[-0.03em] uppercase">
              Too fast to be safe.
              <br />
              <span className="text-primary text-glow">Highly toxic</span>
              <br />
              to technical debt.
            </h1>
            <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              While corporate tools sell "minimalist luxury", AcrylAMIDE delivers unhinged raw
              velocity. Built in Rust on GPUI &amp; Acrylamide for parallel multi-agent
              orchestration.
            </p>
            <div className="mt-9">
              <InstallBox />
            </div>
          </div>
          <div className="px-6 py-14 lg:px-10 lg:py-20">
            <Terminal />
          </div>
        </section>

        {/* METRICS */}
        <section id="benchmarks" className="grid grid-cols-2 border-y hairline lg:grid-cols-4">
          {METRICS.map((m) => (
            <div
              key={m.label}
              className="border-r border-b hairline px-6 py-9 last:border-r-0 lg:border-b-0"
            >
              <div className="mono-label text-muted-foreground">{m.label}</div>
              <div className="mt-3 font-mono text-[clamp(1.8rem,3vw,2.6rem)] font-bold text-primary text-glow">
                {m.value}
              </div>
              <div className="mt-2 text-[13px] text-muted-foreground">{m.sub}</div>
            </div>
          ))}
        </section>

        {/* COMPARISON */}
        <section id="architecture" className="px-6 py-16 lg:px-10">
          <div className="mono-label text-muted-foreground">// 01 ARCHITECTURE COMPARISON</div>
          <h2 className="mt-4 text-[clamp(1.8rem,4vw,3rem)] leading-none font-bold tracking-tight uppercase">
            Safe SaaS vs. <span className="text-primary text-glow">Reactor core</span>
          </h2>
          <div className="mt-10 overflow-x-auto border hairline">
            <table className="w-full min-w-[680px] border-collapse text-left">
              <thead>
                <tr className="border-b hairline">
                  <th className="mono-label border-r hairline px-5 py-4 text-muted-foreground">
                    SYSTEM SPECIFICATION
                  </th>
                  <th className="mono-label border-r hairline px-5 py-4 text-muted-foreground">
                    SAFE CORPORATE IDEs (VS CODE, ZED)
                  </th>
                  <th className="mono-label px-5 py-4 text-primary">ACRYLAMIDE (ACRYL.DEV)</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map(([spec, safe, acryl]) => (
                  <tr key={spec} className="border-b hairline last:border-b-0">
                    <td className="border-r hairline px-5 py-4 font-mono text-[13px] text-foreground">
                      {spec}
                    </td>
                    <td className="border-r hairline px-5 py-4 font-mono text-[13px] text-muted-foreground line-through decoration-warning/50">
                      {safe}
                    </td>
                    <td className="px-5 py-4 font-mono text-[13px] text-primary">{acryl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* MODULES */}
        <section id="cli" className="grid grid-cols-1 border-y hairline md:grid-cols-3">
          {MODULES.map((m) => (
            <article
              key={m.id}
              className="glass-panel border-0 border-b border-r-0 hairline px-6 py-10 last:border-b-0 md:border-r md:border-b-0 md:last:border-r-0"
            >
              <div className="mono-label text-primary">{m.id}</div>
              <h3 className="mt-4 text-lg font-bold tracking-tight uppercase">{m.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{m.body}</p>
            </article>
          ))}
        </section>

        {/* LORE */}
        <section id="lore" className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]">
          <div className="border-b hairline px-6 py-16 lg:border-r lg:border-b-0 lg:px-10">
            <div className="mono-label text-muted-foreground">// 04 LORE</div>
            <h2 className="mt-4 text-[clamp(1.8rem,4vw,3rem)] leading-none font-bold tracking-tight uppercase">
              Acrylamide is a <span className="text-warning">neurotoxin</span>. So is our roadmap.
            </h2>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
              Named after the industrial monomer that polymerizes under heat, AcrylAMIDE fuses agent
              threads into a single hardened runtime. There is no telemetry consent dialog, no
              onboarding carousel, no quarterly "delight" release. There is a reactor, and it is
              already at temperature.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["NO ELECTRON", "NO GC", "NO SUPERVISION", "NO REFUNDS"].map((t) => (
                <span key={t} className="mono-label border hairline px-3 py-1.5 text-primary">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="px-6 py-16 lg:px-10">
            <div className="glass-panel rounded-sm p-6">
              <div className="mono-label text-warning">⚠ HAZARD CLASS 4 — VELOCITY</div>
              <div className="mt-5 space-y-3 font-mono text-[12px] text-muted-foreground">
                {[
                  ["EXPOSURE", "CONTINUOUS"],
                  ["ANTIDOTE", "NONE KNOWN"],
                  ["SIDE EFFECTS", "SHIPPING"],
                  ["CONTAINMENT", "cargo install amide"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-b hairline pb-3">
                    <span className="mono-label">{k}</span>
                    <span className="text-primary">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t hairline">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
          <span className="mono-label text-muted-foreground">
            ACRYLAMIDE // ACRYL.DEV — DESIGNED FOR CHAOTIC SYSTEMS ENGINEERS
          </span>
          <span className="mono-label inline-flex items-center gap-2 text-primary">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            [SYSTEM STATUS: ALL REACTOR THREADS ONLINE]
          </span>
          <span className="mono-label flex gap-4 text-muted-foreground">
            <a href="https://github.com/acryl-dev/amide" className="hover:text-primary">
              GITHUB
            </a>
            <a href="https://crates.io/crates/amide" className="hover:text-primary">
              CRATES.IO
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
