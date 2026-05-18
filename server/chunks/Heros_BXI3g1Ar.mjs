import { d as createLucideIcon } from './Footer_Y9EJItiz.mjs';
import { c as createComponent } from './astro-component_K9hO3ivE.mjs';
import 'piccolore';
import { m as maybeRenderHead, u as unescapeHTML, j as addAttribute, q as renderTemplate, r as renderComponent } from './server_DSd120XH.mjs';

const File = createLucideIcon("file", [["path", { "d": "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" }], ["path", { "d": "M14 2v5a1 1 0 0 0 1 1h5" }]]);

const ShieldCheck = createLucideIcon("shield-check", [["path", { "d": "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" }], ["path", { "d": "m9 12 2 2 4-4" }]]);

const $$Heros = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Heros;
  const { title, description, informations, ctas } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="flex justify-center items-center w-full h-full bg-surface relative overflow-hidden"> <div class="absolute inset-0 pointer-events-none -z-0"> <div class="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-primary-light blur-3xl float-slow"></div> <div class="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-primary-light blur-3xl float-slow" style="animation-delay: -3s;"></div> </div> <div class="max-w-7xl mx-auto min-h-screen w-full flex items-center pt-20 relative z-10"> <div class="flex flex-col items-center justify-center gap-4 w-full px-6"> <h1 class="hero-anim text-4xl md:text-7xl font-bold text-text text-center" style="--anim-delay: 100ms;">${unescapeHTML(title)}</h1> <p class="hero-anim text-sm md:text-lg text-text-muted max-w-2xl text-center" style="--anim-delay: 250ms;"> ${description} </p> <div class="hero-anim flex flex-col md:flex-row items-center gap-2" style="--anim-delay: 400ms;"> ${ctas.map((item, index) => renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(
    index === 0 ? "px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark hover:scale-[1.03] transition-all duration-300 w-full md:w-auto text-center shadow-md hover:shadow-lg" : "border border-transparent px-6 py-3 bg-transparent text-text-muted rounded-md hover:border-primary-border hover:text-text transition-all duration-300 w-full md:w-auto text-center",
    "class"
  )}> ${item.label} </a>`)} </div> <div class="hero-anim flex items-center gap-4" style="--anim-delay: 550ms;"> ${informations.map((item) => renderTemplate`<div class="flex items-center gap-0.5"> ${renderComponent($$result, "item.icon", item.icon, { "size": 12, "class": "text-text-muted" })} <p class="text-xs text-text-muted">${item.label}</p> </div>`)} </div> </div> </div> </section>`;
}, "/home/runner/work/netara-website/netara-website/src/components/Heros.astro", void 0);

export { $$Heros as $, File as F, ShieldCheck as S };
