import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { defaultPortfolioConfig } from "../config/defaultConfig.js";
import {
  SITE_CONFIG,
  PROJECTS,
  SKILLS,
  EXPERIENCE,
  NAV_LINKS,
  HERO_TYPING_PHRASES,
  ABOUT_PARAGRAPHS,
  ABOUT_STATS,
  EDUCATION,
  CERTIFICATIONS,
} from "../utils/constants.js";
import { useTheme } from "./ThemeContext.jsx";

const AppContext = createContext(null);

export const OVERRIDE_KEY = "portfolio-config-override";
export const CONFIG_UPDATE_EVENT = "portfolio:config-updated";

function mergeDeep(base, patch) {
  if (!patch || typeof patch !== "object") return base;
  const out = Array.isArray(base) ? [...base] : { ...base };
  for (const key of Object.keys(patch)) {
    const pv = patch[key];
    const bv = out[key];
    if (pv && typeof pv === "object" && !Array.isArray(pv) && bv && typeof bv === "object" && !Array.isArray(bv)) {
      out[key] = mergeDeep(bv, pv);
    } else if (pv !== undefined) {
      out[key] = pv;
    }
  }
  return out;
}

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return {
    r: (n >> 16) & 255,
    g: (n >> 8) & 255,
    b: n & 255,
  };
}

function buildHeroGradient(primary, secondary, warm) {
  try {
    const p = hexToRgb(primary);
    const s = hexToRgb(secondary);
    const w = hexToRgb(warm);
    return `radial-gradient(ellipse 120% 80% at 50% -20%, rgba(${p.r},${p.g},${p.b},0.35), transparent 55%),
      radial-gradient(ellipse 80% 50% at 100% 50%, rgba(${s.r},${s.g},${s.b},0.2), transparent 50%),
      radial-gradient(ellipse 60% 40% at 0% 100%, rgba(${w.r},${w.g},${w.b},0.12), transparent 50%)`;
  } catch {
    return "";
  }
}

function applyTypography(typography) {
  if (typeof document === "undefined") return;
  const { fontPrimary, fontSecondary, baseFontSize, googleFontsFamilies } = typography;
  const primary = fontPrimary || "Outfit";
  const secondary = fontSecondary || "Inter";
  const id = "portfolio-google-fonts";
  let link = document.getElementById(id);
  const families =
    googleFontsFamilies || "Outfit:wght@400;500;600;700;800&family=Inter:wght@400;500;600";
  const href = `https://fonts.googleapis.com/css2?family=${families}&display=swap`;
  if (!link) {
    link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
  if (link.getAttribute("href") !== href) {
    link.setAttribute("href", href);
  }

  const root = document.documentElement;
  root.style.setProperty(
    "--font-family-primary",
    `'${primary}', ui-sans-serif, system-ui, sans-serif`
  );
  root.style.setProperty(
    "--font-family-secondary",
    `'${secondary}', ui-sans-serif, system-ui, sans-serif`
  );
  if (baseFontSize) {
    root.style.fontSize = baseFontSize;
  }
  document.body.style.fontFamily = `'${primary}', ui-sans-serif, system-ui, sans-serif`;
}

function applyThemeTokens(themeName, config) {
  if (typeof document === "undefined") return;
  const t = config.themes?.[themeName] || config.themes?.dark;
  if (!t) return;

  const root = document.documentElement;
  const set = (k, v) => root.style.setProperty(k, v);

  set("--color-bg-primary", t.background);
  set("--color-bg-secondary", t.backgroundSecondary);
  set("--color-bg-elevated", t.backgroundElevated);
  set("--color-text-primary", t.textPrimary);
  set("--color-text-secondary", t.textSecondary);
  set("--color-accent", t.primary);
  set("--color-accent-secondary", t.secondary);
  set("--color-accent-warm", t.accentWarm);
  set("--color-border", t.border);
  set("--color-glass", t.glass);
  set("--color-glass-border", t.glassBorder);

  const grad = buildHeroGradient(t.primary, t.secondary, t.accentWarm);
  if (grad) set("--gradient-hero", grad);

  set("--shadow-glow", `0 0 80px ${t.primary}22`);
}

async function fetchRemoteConfig() {
  const envUrl = import.meta.env.VITE_CONFIG_URL?.trim();
  const candidates = [
    envUrl,
    "/api/config",
    "/api/config.json",
  ].filter(Boolean);

  for (const url of candidates) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json && typeof json === "object") return json;
      }
    } catch {
      /* try next */
    }
  }
  return null;
}

export function AppProvider({ children }) {
  const { theme } = useTheme();
  const [status, setStatus] = useState("loading");
  const [config, setConfig] = useState(() => mergeDeep(defaultPortfolioConfig, {}));
  const refreshTimer = useRef(null);

  const applyAll = useCallback(
    (cfg) => {
      applyTypography(cfg.typography || defaultPortfolioConfig.typography);
      applyThemeTokens(theme, cfg);
      window.clearTimeout(refreshTimer.current);
      refreshTimer.current = window.setTimeout(() => {
        ScrollTrigger.refresh();
      }, 120);
    },
    [theme]
  );

  const loadConfig = useCallback(async () => {
    setStatus("loading");
    let merged = mergeDeep(defaultPortfolioConfig, {});

    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(OVERRIDE_KEY) : null;
      if (raw) {
        const local = JSON.parse(raw);
        merged = mergeDeep(merged, local);
      }
    } catch {
      /* ignore */
    }

    const remote = await fetchRemoteConfig();
    if (remote) {
      merged = mergeDeep(merged, remote);
    }

    setConfig(merged);
    setStatus("ready");
  }, []);

  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  useEffect(() => {
    applyAll(config);
  }, [theme, config, applyAll]);

  useEffect(() => {
    const onUpdate = () => loadConfig();
    window.addEventListener(CONFIG_UPDATE_EVENT, onUpdate);
    return () => window.removeEventListener(CONFIG_UPDATE_EVENT, onUpdate);
  }, [loadConfig]);

  const refresh = useCallback(() => {
    loadConfig();
  }, [loadConfig]);

  const site = useMemo(() => {
    const c = config.content || {};
    return {
      ...SITE_CONFIG,
      logoText: config.branding?.logoText ?? SITE_CONFIG.logoText,
      logoImage: config.branding?.logoImageUrl ?? SITE_CONFIG.logoImage,
      authorName: c.authorName ?? SITE_CONFIG.authorName,
      authorRole: c.authorRole ?? SITE_CONFIG.authorRole,
      authorDescription: c.authorDescription ?? SITE_CONFIG.authorDescription,
      heroSubheading: c.heroSubheading ?? SITE_CONFIG.heroSubheading,
      contactEmail: c.contactEmail ?? SITE_CONFIG.contactEmail,
      contactPhone: c.contactPhone ?? SITE_CONFIG.contactPhone,
      contactLocation: c.contactLocation ?? SITE_CONFIG.contactLocation,
      contactApiUrl: SITE_CONFIG.contactApiUrl,
      socialLinks: { ...SITE_CONFIG.socialLinks, ...(c.socialLinks || {}) },
      heroTypingPhrases:
        Array.isArray(c.heroTypingPhrases) && c.heroTypingPhrases.length
          ? c.heroTypingPhrases
          : HERO_TYPING_PHRASES,
      aboutParagraphs:
        Array.isArray(c.aboutParagraphs) && c.aboutParagraphs.length > 0
          ? c.aboutParagraphs
          : ABOUT_PARAGRAPHS,
      aboutStats:
        Array.isArray(c.aboutStats) && c.aboutStats.length > 0 ? c.aboutStats : ABOUT_STATS,
    };
  }, [config]);

  const projects = useMemo(() => {
    const list = config.content?.projects;
    return Array.isArray(list) && list.length ? list : PROJECTS;
  }, [config]);

  const skills = useMemo(() => {
    const list = config.content?.skills;
    return Array.isArray(list) && list.length ? list : SKILLS;
  }, [config]);

  const experience = useMemo(() => {
    const list = config.content?.experience;
    return Array.isArray(list) && list.length ? list : EXPERIENCE;
  }, [config]);

  const navLinks = useMemo(() => {
    const list = config.content?.navLinks;
    return Array.isArray(list) && list.length ? list : NAV_LINKS;
  }, [config]);

  const education = useMemo(() => {
    const list = config.content?.education;
    return Array.isArray(list) && list.length ? list : EDUCATION;
  }, [config]);

  const certifications = useMemo(() => {
    const list = config.content?.certifications;
    return Array.isArray(list) && list.length ? list : CERTIFICATIONS;
  }, [config]);

  const value = useMemo(
    () => ({
      status,
      config,
      site,
      projects,
      skills,
      experience,
      education,
      certifications,
      navLinks,
      refresh,
      branding: config.branding || defaultPortfolioConfig.branding,
    }),
    [status, config, site, projects, skills, experience, education, certifications, navLinks, refresh]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
