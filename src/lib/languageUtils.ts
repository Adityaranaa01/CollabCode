/**
 * Central language utilities for CollabCode IDE.
 * Maps language identifiers to file extensions, display names, and Monaco language IDs.
 */

export interface LanguageInfo {
  id: string;            // Monaco language ID
  displayName: string;   // Human-readable name
  extension: string;     // File extension (with dot)
  supportsPreview: boolean; // Can be rendered in an iframe
}

const LANGUAGE_MAP: Record<string, LanguageInfo> = {
  // Web
  html:       { id: "html",       displayName: "HTML",        extension: ".html",  supportsPreview: true },
  css:        { id: "css",        displayName: "CSS",         extension: ".css",   supportsPreview: true },
  javascript: { id: "javascript", displayName: "JavaScript",  extension: ".js",    supportsPreview: true },
  typescript: { id: "typescript", displayName: "TypeScript",  extension: ".ts",    supportsPreview: false },
  jsx:        { id: "javascript", displayName: "JSX",         extension: ".jsx",   supportsPreview: true },
  tsx:        { id: "typescript", displayName: "TSX",         extension: ".tsx",   supportsPreview: false },
  json:       { id: "json",       displayName: "JSON",        extension: ".json",  supportsPreview: false },
  xml:        { id: "xml",        displayName: "XML",         extension: ".xml",   supportsPreview: false },

  // Systems & scripting
  python:     { id: "python",     displayName: "Python",      extension: ".py",    supportsPreview: false },
  java:       { id: "java",       displayName: "Java",        extension: ".java",  supportsPreview: false },
  csharp:     { id: "csharp",     displayName: "C#",          extension: ".cs",    supportsPreview: false },
  cpp:        { id: "cpp",        displayName: "C++",         extension: ".cpp",   supportsPreview: false },
  c:          { id: "c",          displayName: "C",           extension: ".c",     supportsPreview: false },
  go:         { id: "go",         displayName: "Go",          extension: ".go",    supportsPreview: false },
  rust:       { id: "rust",       displayName: "Rust",        extension: ".rs",    supportsPreview: false },
  ruby:       { id: "ruby",       displayName: "Ruby",        extension: ".rb",    supportsPreview: false },
  php:        { id: "php",        displayName: "PHP",         extension: ".php",   supportsPreview: false },
  swift:      { id: "swift",      displayName: "Swift",       extension: ".swift", supportsPreview: false },
  kotlin:     { id: "kotlin",     displayName: "Kotlin",      extension: ".kt",    supportsPreview: false },

  // Config & data
  yaml:       { id: "yaml",       displayName: "YAML",        extension: ".yaml",  supportsPreview: false },
  markdown:   { id: "markdown",   displayName: "Markdown",    extension: ".md",    supportsPreview: true },
  sql:        { id: "sql",        displayName: "SQL",         extension: ".sql",   supportsPreview: false },
  graphql:    { id: "graphql",    displayName: "GraphQL",     extension: ".graphql", supportsPreview: false },
  shell:      { id: "shell",      displayName: "Shell",       extension: ".sh",    supportsPreview: false },
  dockerfile: { id: "dockerfile", displayName: "Dockerfile",  extension: "",       supportsPreview: false },

  // Fallback
  plaintext:  { id: "plaintext",  displayName: "Plain Text",  extension: ".txt",   supportsPreview: false },
};

/**
 * Get language info for a given language key.
 * Falls back to plaintext if not found.
 */
export function getLanguageInfo(language: string): LanguageInfo {
  const key = language.toLowerCase().trim();
  return LANGUAGE_MAP[key] || LANGUAGE_MAP.plaintext;
}

/**
 * Get the Monaco language ID for a given language key.
 */
export function getMonacoLanguage(language: string): string {
  return getLanguageInfo(language).id;
}

/**
 * Get the file extension for a given language.
 */
export function getFileExtension(language: string): string {
  return getLanguageInfo(language).extension;
}

/**
 * Check if a language supports live preview.
 */
export function supportsPreview(language: string): boolean {
  return getLanguageInfo(language).supportsPreview;
}

/**
 * Get all available language keys (for language selector).
 */
export function getAllLanguages(): LanguageInfo[] {
  return Object.values(LANGUAGE_MAP).filter((l) => l.id !== "plaintext");
}

/**
 * Default editor settings with localStorage persistence.
 */
export interface EditorSettings {
  fontSize: number;
  minimap: boolean;
  wordWrap: boolean;
  lineNumbers: boolean;
  tabSize: number;
}

const STORAGE_KEY = "collabcode-editor-settings";

export const DEFAULT_EDITOR_SETTINGS: EditorSettings = {
  fontSize: 13,
  minimap: false,
  wordWrap: false,
  lineNumbers: true,
  tabSize: 2,
};

export function loadEditorSettings(): EditorSettings {
  if (typeof window === "undefined") return DEFAULT_EDITOR_SETTINGS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_EDITOR_SETTINGS;
    return { ...DEFAULT_EDITOR_SETTINGS, ...JSON.parse(stored) };
  } catch {
    return DEFAULT_EDITOR_SETTINGS;
  }
}

export function saveEditorSettings(settings: EditorSettings): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // localStorage full or unavailable
  }
}
