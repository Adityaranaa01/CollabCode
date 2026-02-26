export const colors = {
  primary: "#895af6",
  primaryLight: "#a885f8",
  brandBlack: "#050505",
  brandPurple: "#8B5CF6",
  brandDarkPurple: "#2D1B69",
  backgroundDark: "#050308",
  backgroundLight: "#f6f5f8",
  surfaceDark: "#0d0a14",
  accentDark: "#16121f",
  editorBg: "#0b0814",
  consoleBg: "#0d0a16",
  modalBg: "#0d091a",
} as const;

export const typography = {
  fontDisplay: "'Inter', sans-serif",
  fontMono: "'JetBrains Mono', monospace",
  sizes: {
    hero: "clamp(4rem, 8vw, 9rem)",
    h1: "2.5rem",
    h2: "1.5rem",
    h3: "1.25rem",
    body: "1rem",
    sm: "0.875rem",
    xs: "0.75rem",
    micro: "0.625rem",
  },
} as const;

export const spacing = {
  navHeight: "3.5rem",
  sidebarWidth: "16rem",
  miniSidebarWidth: "3rem",
  rightPanelWidth: "20rem",
  statusBarHeight: "1.5rem",
} as const;

export const shadows = {
  glowPrimary: "0 0 20px -5px rgba(137, 90, 246, 0.4)",
  glowPrimaryStrong: "0 0 50px -12px rgba(137, 90, 246, 0.3)",
  glowButton: "0 0 20px rgba(137, 90, 246, 0.4)",
  cardHover: "0 25px 50px -12px rgba(137, 90, 246, 0.1)",
} as const;

export type Colors = typeof colors;
export type Typography = typeof typography;
