import { c as createComponent } from './astro-component_BOE8xAgt.mjs';
import 'piccolore';
import { k as createRenderInstruction, j as addAttribute, n as renderHead, p as renderSlot, q as renderTemplate, m as maybeRenderHead, s as spreadAttributes, r as renderComponent, d as Fragment } from './server_DEaN1dVx.mjs';
import 'clsx';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate`<html lang="fr" id="container"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/x-icon" href="/favicon.ico"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Netara - Nettoyage</title>${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} ${renderScript($$result, "/home/runner/work/netara-website/netara-website/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/home/runner/work/netara-website/netara-website/src/layouts/Layout.astro", void 0);

const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};

const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
  return false;
};

const $$Icon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Icon;
  const {
    color = "currentColor",
    size = 24,
    "stroke-width": strokeWidth = 2,
    absoluteStrokeWidth = false,
    iconNode = [],
    class: className,
    ...rest
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes({
    ...defaultAttributes,
    width: size,
    height: size,
    stroke: color,
    "stroke-width": absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
    ...!hasA11yProp(rest) && { "aria-hidden": "true" },
    ...rest
  })}${addAttribute(["lucide", className], "class:list")}> ${iconNode.map(([Tag, attrs]) => renderTemplate`${renderComponent($$result, "Tag", Tag, { ...attrs })}`)} ${renderSlot($$result, $$slots["default"])} </svg>`;
}, "/home/runner/work/netara-website/netara-website/node_modules/@lucide/astro/src/Icon.astro", void 0);

const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();

const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

const createLucideIcon = (iconName, iconNode) => {
  const Component = createComponent(
    ($$result, $$props, $$slots) => {
      const { class: className, ...restProps } = $$props;
      return renderTemplate`${renderComponent(
        $$result,
        "Icon",
        $$Icon,
        {
          class: mergeClasses(
            Boolean(iconName) && `lucide-${toKebabCase(iconName)}`,
            Boolean(className) && className
          ),
          iconNode,
          ...restProps
        },
        { default: () => renderTemplate`${renderSlot($$result, $$slots["default"])}` }
      )}`;
    },
    void 0,
    "none"
  );
  return Component;
};

const ArrowLeft = createLucideIcon("arrow-left", [["path", { "d": "m12 19-7-7 7-7" }], ["path", { "d": "M19 12H5" }]]);

const Mail = createLucideIcon("mail", [["path", { "d": "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" }], ["rect", { "x": "2", "y": "4", "width": "20", "height": "16", "rx": "2" }]]);

const MapPin = createLucideIcon("map-pin", [["path", { "d": "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" }], ["circle", { "cx": "12", "cy": "10", "r": "3" }]]);

const Moon = createLucideIcon("moon", [["path", { "d": "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" }]]);

const Phone = createLucideIcon("phone", [["path", { "d": "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" }]]);

const Sun = createLucideIcon("sun", [["circle", { "cx": "12", "cy": "12", "r": "4" }], ["path", { "d": "M12 2v2" }], ["path", { "d": "M12 20v2" }], ["path", { "d": "m4.93 4.93 1.41 1.41" }], ["path", { "d": "m17.66 17.66 1.41 1.41" }], ["path", { "d": "M2 12h2" }], ["path", { "d": "M20 12h2" }], ["path", { "d": "m6.34 17.66-1.41 1.41" }], ["path", { "d": "m19.07 4.93-1.41 1.41" }]]);

const $$Headers = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Headers;
  const items = [
    {
      label: "Nos solutions",
      href: "#solutions"
    },
    {
      label: "Engagements",
      href: "#engagements"
    },
    {
      label: "Nos services",
      href: "#services"
    },
    {
      label: "Zones d'intervention",
      href: "#zones"
    },
    {
      label: "Netara Éléctricité",
      href: "/electricity"
    }
  ];
  const pathname = Astro2.url.pathname;
  const base = "/".endsWith("/") ? "/" : `${"/"}/`;
  const logoUrl = `${base}logo.png`;
  return renderTemplate`${maybeRenderHead()}<header class="fixed flex items-center justify-between p-4 w-full bg-surface border-b border-border z-50"> <nav class="flex items-center justify-between w-full max-w-7xl mx-auto"> ${pathname !== "/" ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <a href="/" class="items-center gap-2 hidden md:flex"> ${renderComponent($$result2, "ArrowLeft", ArrowLeft, { "class": "text-text-muted", "size": 18, "stroke-width": 1 })} <p class="text-text-muted font-normal text-sm md:text-md">Retour</p> </a> <a href="/" class="flex items-center justify-center gap-2"> <img${addAttribute(logoUrl, "src")} alt="Logo Netara Nettoyage" class="w-12 h-12 rounded-full object-cover" width="48" height="48" loading="eager" decoding="async"> <div class="flex flex-col items-start justify-start gap-0"> <h1 class="uppercase text-xl text-text">
Netara
</h1> <p class="text-sm font-normal text-text-muted">Nettoyage</p> </div> </a> ` })}` : renderTemplate`<a href="/" class="flex items-center justify-center gap-2"> <img${addAttribute(logoUrl, "src")} alt="Logo Netara Nettoyage" class="w-12 h-12 rounded-full object-cover" width="48" height="48" loading="eager" decoding="async"> <div class="flex flex-col items-start justify-start gap-0"> <h1 class="uppercase text-xl text-text">
Netara
</h1> <p class="text-sm font-normal text-text-muted">Nettoyage</p> </div> </a>
                <ul class="items-center gap-6 hidden md:flex justify-center"> ${items.map((item) => {
    const isElec = item.href == "/electricity";
    return renderTemplate`<div class="flex flex-row items-center gap-1"> <a${addAttribute(item.href, "href")}${addAttribute(`nav-link ${isElec ? "bg-yellow-500/60 px-2 py-1 rounded-full" : ""}`, "class")}> <li class="text-text-muted text-sm font-normal hover:text-text duration-300 transition-colors cursor-pointer">${item.label}</li> </a> <p${addAttribute(`${isElec ? "block" : "hidden"}`, "class")}>⚡</p> </div>`;
  })} </ul>`} <div class="flex items-center justify-end gap-2"> <div id="toggle-mode" class="text-text-muted hover:text-text transition-all duration-300 cursor-pointer p-2 hover:bg-text/20 rounded-md"> ${renderComponent($$result, "Moon", Moon, { "class": "block dark:hidden", "stroke-width": 1, "size": 18 })} ${renderComponent($$result, "Sun", Sun, { "class": "hidden dark:block", "stroke-width": 1, "size": 18 })} </div> <div> <a href="/contact" class="flex items-center justify-end gap-2 px-6 py-2 border-border border rounded-md text-sm bg-card hover:bg-primary hover:text-white hover:border-primary hover:scale-[1.03] transition-all duration-300">
Devis gratuit
</a> </div> </div> </nav> </header> ${renderScript($$result, "/home/runner/work/netara-website/netara-website/src/components/Headers.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/runner/work/netara-website/netara-website/src/components/Headers.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const base = "/".endsWith("/") ? "/" : `${"/"}/`;
  const logoUrl = `${base}logo.png`;
  const items = [
    {
      label: "Nos solutions",
      href: "#solutions"
    },
    {
      label: "Engagements",
      href: "#engagements"
    },
    {
      label: "Nos services",
      href: "#services"
    },
    {
      label: "Zones d'intervention",
      href: "#zones"
    },
    {
      label: "Politique de confidentialité",
      href: "/confidentiality"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<footer class="gap-6 bg-surface p-10 border-t border-border"> <div class="mx-auto max-w-7xl flex flex-col md:flex-row items-start justify-between mb-6 gap-4"> <div class="flex flex-col items-center md:items-start justify-start gap-3 flex-1"> <div class="flex items-center gap-3"> <img${addAttribute(logoUrl, "src")} alt="Logo Netara Nettoyage" class="w-14 h-14 rounded-full object-cover" width="56" height="56" loading="lazy" decoding="async"> <div class="flex flex-col"> <h4 class="uppercase text-xl font-semibold text-text">Netara</h4> <p class="text-xs text-text-muted">Façade · Toiture · Remise en état</p> </div> </div> <p class="text-text-muted text-sm md:text-sm font-normal text-center md:text-left">
Nettoyage <strong class="text-text">vapeur basse pression</strong>, écologique et sans produits chimiques. Hydrofuge coloré en option pour une protection longue durée dans le Rhône.
</p> </div> <div class="flex flex-col md:flex-row items-center md:items-start justify-end gap-6 md:flex-1 w-full"> <div class="flex flex-col items-center md:items-start justify-start gap-2"> <h4 class="text-xl font-semibold text-text">Navigation</h4> <ul class="flex flex-col items-center md:items-start gap-1"> ${items.map((item) => renderTemplate`<a class="text-text-muted text-sm md:text-sm font-normal hover:text-text duration-300 transition-colors"${addAttribute(item.href, "href")}> ${item.label} </a>`)} </ul> </div> <div class="flex flex-col items-center md:items-start justify-start gap-2"> <h4 class="text-xl font-semibold text-text">Contact</h4> <div class="flex items-center gap-2"> ${renderComponent($$result, "MapPin", MapPin, { "class": "text-primary", "size": 18, "stroke-width": 1 })} <p class="text-text-muted text-sm md:text-sm font-normal">6 rue de Bretagne, 69330 Meyzieu</p> </div> <a href="mailto:contact@netara.fr" class="flex items-center gap-2 hover:text-primary transition-colors duration-300"> ${renderComponent($$result, "Mail", Mail, { "class": "text-primary", "size": 18, "stroke-width": 1 })} <p class="text-text-muted text-sm md:text-sm font-normal">contact@netara.fr</p> </a> <a href="tel:+33659334143" class="flex items-center gap-2 hover:text-primary transition-colors duration-300"> ${renderComponent($$result, "Phone", Phone, { "class": "text-primary", "size": 18, "stroke-width": 1 })} <p class="text-text-muted text-sm md:text-sm font-normal">06.59.33.41.43</p> </a> </div> </div> </div> <div class="mx-auto max-w-7xl border-t border-border pt-6 flex justify-center items-center"> <p class="text-text-muted font-light text-sm">&copy; 2026 Netara Nettoyage — Tous droits réservés</p> </div> </footer>`;
}, "/home/runner/work/netara-website/netara-website/src/components/Footer.astro", void 0);

export { $$Footer as $, Mail as M, $$Headers as a, $$Layout as b, MapPin as c, createLucideIcon as d, renderScript as r };
