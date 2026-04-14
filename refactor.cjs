const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname, "src");

const renameMap = {
  // Base
  "brand-primary-hover": "primary-hover",
  "brand-primary-foreground-strong": "primary-fg-strong",
  "brand-primary-foreground": "primary-fg",
  "brand-primary-rgb": "primary-rgb",
  "brand-primary": "primary",

  "brand-secondary-rgb": "secondary-rgb",
  "brand-secondary": "secondary",

  "brand-tertiary-rgb": "tertiary-rgb",
  "brand-tertiary": "tertiary",

  "brand-accent-soft": "accent-soft",
  "brand-accent-strong": "accent-strong",
  "brand-accent-rgb": "accent-rgb",
  "brand-accent": "accent",

  "brand-light-rgb": "light-rgb",
  "brand-pointer-rgb": "pointer-rgb",
  "brand-shadow-rgb": "shadow-rgb",

  // Feedback
  "success": "success",
  "info-soft": "info-soft",
  "info": "info",
  "warning": "warning",
  "danger": "danger",

  // Text
  "text-primary": "text",
  "text-secondary": "text-muted",
  "text-tertiary": "text-faint",
  "text-on-brand-strong": "text-on-primary-strong",
  "text-on-brand": "text-on-primary",

  // Surfaces
  "surface-canvas": "bg-canvas",
  "surface-base": "bg-base",
  "surface-elevated": "bg-elevated",
  "surface-overlay-strong": "bg-overlay-strong",
  "surface-overlay": "bg-overlay",
  "surface-panel": "surface-panel",
  "surface-community-card-strong": "surface-card-strong",
  "surface-community-card": "surface-card",
  "surface-community-code": "surface-code",
  "surface-glass-subtle": "glass-subtle",
  "surface-glass-muted": "glass-muted",
  "surface-glass-strong": "glass-strong",

  // Contrast Surfaces
  "surface-contrast-canvas": "contrast-canvas",
  "surface-contrast-sidebar": "contrast-sidebar",
  "surface-contrast-panel": "contrast-panel",
  "surface-contrast-muted": "contrast-muted",
  "surface-contrast-button": "contrast-button",
  "surface-contrast-input": "contrast-input",
  "surface-contrast-bubble": "contrast-bubble",
  "surface-contrast-accent": "contrast-accent",
  "surface-contrast-action-hover": "contrast-hover",
  "surface-contrast-action": "contrast-action",

  // Borders
  "border-subtle": "border-subtle",
  "border-muted": "border",
  "border-brand-soft": "border-brand-soft",
  "border-brand-subtle": "border-brand-subtle",
  "border-brand-faint": "border-brand-faint",
  "border-brand": "border-brand",

  // Fills & Rings
  "fill-brand-soft": "fill-brand-soft",
  "fill-brand-muted": "fill-brand-muted",
  "fill-brand-faint": "fill-brand-faint",
  "focus-ring-brand": "ring-brand",
  "selection-brand": "selection-brand",

  // Glows & Overlays
  "glow-warm-rgb": "glow-warm-rgb",
  "glow-cool-rgb": "glow-cool-rgb",
  "glow-info-rgb": "glow-info-rgb",
  "glow-accent-rgb": "glow-accent-rgb",
  "overlay-brand-soft-rgb": "overlay-soft-rgb",
  "overlay-brand-rgb": "overlay-brand-rgb",
  "overlay-rgb": "overlay-rgb",
};

const processFile = (filePath) => {
  let content = fs.readFileSync(filePath, "utf-8");
  let originalContent = content;

  // Replace colors.css mentions
  content = content.replace(/colors\.css/g, "theme.css");

  // Replace var(--color-*)
  for (const [oldName, newName] of Object.entries(renameMap)) {
    // Replace variable usages
    const varRegex = new RegExp(`var\\(--color-${oldName}\\)`, "g");
    content = content.replace(varRegex, `var(--${newName})`);
    
    // Replace variable definitions
    const defRegex = new RegExp(`--color-${oldName}:`, "g");
    content = content.replace(defRegex, `--${newName}:`);
    
    // Replace variable inside strings or other occurrences (rgb combinations etc.)
    const bareRegex = new RegExp(`--color-${oldName}(?=,|\\s|\\))`, "g");
    content = content.replace(bareRegex, `--${newName}`);
  }

  // Catch remaining loose --color-* occurrences and just strip `--color-` to `--`
  // as a fallback for any missed ones (like in rgb() calls)
  content = content.replace(/--color-([a-zA-Z0-9-]+)/g, "--$1");

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, "utf-8");
    console.log(`Updated ${filePath}`);
  }
};

const walkSync = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkSync(filePath);
    } else if (file.endsWith(".js") || file.endsWith(".jsx") || file.endsWith(".css")) {
      processFile(filePath);
    }
  }
};

walkSync(directoryPath);

// Rename colors.css to theme.css
const oldCssPath = path.join(__dirname, "src", "styles", "colors.css");
const newCssPath = path.join(__dirname, "src", "styles", "theme.css");

if (fs.existsSync(oldCssPath)) {
  fs.renameSync(oldCssPath, newCssPath);
  console.log("Renamed colors.css to theme.css");
} else {
  console.log("colors.css not found, maybe already renamed?");
}
