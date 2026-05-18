import { c as createComponent } from './astro-component_BOE8xAgt.mjs';
import 'piccolore';
import { m as maybeRenderHead, r as renderComponent, q as renderTemplate } from './server_DEaN1dVx.mjs';
import { d as createLucideIcon, b as $$Layout, a as $$Headers, $ as $$Footer } from './Footer_CQyxq9HV.mjs';
import { S as ShieldCheck, $ as $$Heros, F as File } from './Heros_-BsRNXU3.mjs';
import { $ as $$Image } from './_astro_assets_jB4Q0bcT.mjs';
import { C as Clock } from './clock_C04M0bTI.mjs';

const SquarePlus = createLucideIcon("square-plus", [["rect", { "width": "18", "height": "18", "x": "3", "y": "3", "rx": "2" }], ["path", { "d": "M8 12h8" }], ["path", { "d": "M12 8v8" }]]);

const Star = createLucideIcon("star", [["path", { "d": "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" }]]);

const WalletCards = createLucideIcon("wallet-cards", [["rect", { "width": "18", "height": "18", "x": "3", "y": "3", "rx": "2" }], ["path", { "d": "M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2" }], ["path", { "d": "M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21" }]]);

const Elec = new Proxy({"src":"/_astro/chantier_elec.e6jeF1Pt.png","width":1408,"height":768,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/netara-website/netara-website/src/assets/chantier_elec.png";
							}
							
							return target[name];
						}
					});

const Lumix = new Proxy({"src":"/_astro/spot_lumix.BD3l4D3d.png","width":1408,"height":768,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/runner/work/netara-website/netara-website/src/assets/spot_lumix.png";
							}
							
							return target[name];
						}
					});

const $$Urgence = createComponent(($$result, $$props, $$slots) => {
  const urgence = ["Panne de courant", "Disjoncteur qui saute", "Court-circuit", "Prise d\xE9fectueuse", "Tableau \xE9lectrique en panne", "\xC9clairage d\xE9faillant"];
  return renderTemplate`${maybeRenderHead()}<section class="flex flex-col items-center justify-center"> <div class="max-w-7xl mx-auto px-6 py-20 w-full"> <div class="flex flex-col items-center gap-2 mb-16"> <p class="text-md md:text-lg text-primary">Urgences</p> <h2 class="text-2xl md:text-4xl text-text font-serif font-bold text-center">Dépannage d'urgence</h2> <p class="text-md font-normal text-text-muted max-w-2xl mx-auto text-center">
Panne soudaine ? On intervient vite. Voici les situations que nous traitons en priorité.
</p> </div> <div class="flex flex-col items-start gap-2 w-full"> <h2 class="text-lg md:text-2xl font-semibold text-text">Réponse rapide, <br> intervention efficace</h2> <p class="text-sm text-text-muted">Contactez-nous, on se déplace. Chaque minute compte quand il s'agit d'électricité.</p> <div class="flex items-center gap-2 flex-col md:flex-row mb-8"> <div class="relative rounded-2xl overflow-hidden w-full group" data-reveal="left"> ${renderComponent($$result, "Image", $$Image, { "src": Elec, "alt": "Avant le nettoyage de la toiture", "class": "w-full h-72 sm:h-80 object-cover transition-transform duration-700 group-hover:scale-105" })} <div class="absolute bottom-0 left-0 p-6"> <span class="inline-block bg-yellow-500/80 text-card dark:text-text text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">Chantier électrique</span> </div> </div> <div class="relative rounded-2xl overflow-hidden w-full group" data-reveal="right" style="--reveal-delay: 120ms;"> ${renderComponent($$result, "Image", $$Image, { "src": Lumix, "alt": "Apr\xE8s le nettoyage de la toiture", "class": "w-full h-72 sm:h-80 object-cover transition-transform duration-700 group-hover:scale-105" })} <div class="absolute bottom-0 left-0 p-6"> <span class="inline-block bg-yellow-500/80 text-card dark:text-text text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">Spot Lumineux</span> </div> </div> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full"> ${urgence.map((item) => renderTemplate`<article class="flex items-center justify-start gap-2 p-6 rounded-md border border-border bg-card"> <div class="h-4 w-4 rounded-full bg-danger"></div> <p class="text-md md:text-lg text-text-muted">${item}</p> </article>`)} </div> </div> </div> </section>`;
}, "/home/runner/work/netara-website/netara-website/src/components/ElectricityPage/Urgence.astro", void 0);

const $$ServicesElec = createComponent(($$result, $$props, $$slots) => {
  const services = [
    {
      title: "\xC9clairage Int / Ext.",
      items: ["Installation luminaires", "Spots LED", "\xC9clairage terasse & Jardin", "D\xE9tection automatique"]
    },
    {
      title: "Prises \xE9lectriques",
      items: ["Ajout de prise", "Remplacement prises anciennes", "Mise aux normes"]
    },
    {
      title: "Tableau \xE9lectriques",
      items: ["Remplacement complet", "Mise en s\xE9curit\xE9", "Modernisation existante"]
    },
    {
      title: "R\xE9novation compl\xE8te",
      items: ["Maison & appartement", "Commerce", "Local professionnel"]
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="flex flex-col items-center justify-center" id="services-elec"> <div class="max-w-7xl mx-auto px-6 py-20 w-full"> <div class="flex flex-col items-center gap-2 mb-16"> <p class="text-md md:text-lg text-primary">Installation & Rénovation</p> <h2 class="text-2xl md:text-4xl text-text font-serif font-bold text-center">Nos services complets</h2> <p class="text-md font-normal text-text-muted max-w-2xl mx-auto text-center">
Du simple remplacement à la rénovation complète, notre équipe s'adapte à chaque chantier
</p> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mb-2"> ${services.map((item, index) => renderTemplate`<article class="flex flex-col items-start justify-start gap-2 p-6 rounded-md border border-border bg-card"> <p class="text-xl md:text-2xl font-semibold text-primary">0${index + 1}</p> <p class="text-lg md:text-xl font-semibold text-text">${item.title}</p> ${item.items.map((value) => renderTemplate`<div class="flex items-center gap-2"> <div class="h-2 w-2 rounded-full bg-primary"></div> <p class="text-xs md:text-sm text-text-muted">${value}</p> </div>`)} </article>`)} </div> <div class="flex items-center justify-start w-full gap-2 bg-card border-border border rounded-md p-6"> <div class="bg-primary-light rounded-md border border-primary-border flex justify-center items-center p-4"> ${renderComponent($$result, "WalletCards", WalletCards, { "size": 18, "stroke-width": 1, "class": "text-primary" })} </div> <div class="flex flex-col items-start justify-start"> <p class="text-primary font-semibold text-lg md:text-xl">Acompte requis au lancement</p> <p class="text-text-muted text-xs md:text-sm">Pour tout démarrage de travaux, un accompte est demandé. Cette condition garantit la planification sérieuse du chantier et la disponibilité de notre équipe pour votre projet.</p> </div> </div> </div> </section>`;
}, "/home/runner/work/netara-website/netara-website/src/components/ElectricityPage/ServicesElec.astro", void 0);

const $$WhyUs = createComponent(($$result, $$props, $$slots) => {
  const response = [
    {
      icon: ShieldCheck,
      title: "Normes \xE9lectriques",
      description: "Tous nos travaux respectent les normes NF C 15-100 en vigueur."
    },
    {
      icon: Clock,
      title: "Intervention rapide",
      description: "R\xE9activit\xE9 maximale pour les urgences, planification souple pour les travaux."
    },
    {
      icon: SquarePlus,
      title: "Devis clair & Transparent",
      description: "Pas de mauvaise surprise. Tout est d\xE9taill\xE9 avant le d\xE9but du chantier"
    },
    {
      icon: Star,
      title: "\xC9quipe sp\xE9cialis\xE9e",
      description: "Des \xE9lectriciens qualifi\xE9s avec conseils personnalis\xE9s sur chaque intervention."
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="flex flex-col items-center justify-center"> <div class="max-w-7xl mx-auto px-6 py-20 w-full"> <div class="flex flex-col items-center gap-2 mb-16"> <p class="text-md md:text-lg text-primary">Nos engagements</p> <h2 class="text-2xl md:text-4xl text-text font-serif font-bold text-center">Pourquoi choisir NETARA Électricité</h2> <p class="text-md font-normal text-text-muted max-w-2xl mx-auto text-center">
Une équipe qualifiée, un travail soigné, des conseils honnêtes.
</p> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mb-2"> ${response.map((item) => renderTemplate`<article class="flex flex-col items-start justify-start gap-2 p-6 rounded-md border border-border bg-card"> <div class="bg-primary-light rounded-md border border-primary-border flex justify-center items-center p-4"> ${renderComponent($$result, "item.icon", item.icon, { "size": 18, "stroke-width": 1, "class": "text-primary" })} </div> <p class="text-md md:text-lg font-semibold text-text">${item.title}</p> <p class="text-xs md:text-sm font-semibold text-text-muted">${item.description}</p> </article>`)} </div> </div> </section>`;
}, "/home/runner/work/netara-website/netara-website/src/components/ElectricityPage/WhyUs.astro", void 0);

const $$Electricity = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Headers", $$Headers, {})} ${renderComponent($$result2, "Heros", $$Heros, { "title": "Votre \xE9lectricien de <span class='text-primary'>confiance,</span> disponible vite.", "description": "NETARA \xC9lectricit\xE9 intervient rapidement pour tous vos travaux \xE9lectriques \u2014 d\xE9pannage urgent, installations neuves, r\xE9novation compl\xE8te \u2014 chez les particuliers comme les professionnels.", "ctas": [
    { label: "Demander une intervention", href: "/contact" },
    { label: "Nos services", href: "#services-elec" }
  ], "informations": [
    { label: "Intervention rapide", icon: Clock },
    { label: "Normes respect\xE9s", icon: ShieldCheck },
    { label: "Devis transparant", icon: File }
  ] })} ${renderComponent($$result2, "Urgence", $$Urgence, {})} ${renderComponent($$result2, "ServicesElec", $$ServicesElec, {})} ${renderComponent($$result2, "WhyUs", $$WhyUs, {})} ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/home/runner/work/netara-website/netara-website/src/pages/electricity.astro", void 0);

const $$file = "/home/runner/work/netara-website/netara-website/src/pages/electricity.astro";
const $$url = "/electricity";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Electricity,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
