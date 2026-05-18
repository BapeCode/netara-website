import { c as createComponent } from './astro-component_BOE8xAgt.mjs';
import 'piccolore';
import { m as maybeRenderHead, q as renderTemplate, r as renderComponent } from './server_DEaN1dVx.mjs';
import { b as $$Layout, a as $$Headers, $ as $$Footer } from './Footer_CQyxq9HV.mjs';
import 'clsx';

const $$Mentions = createComponent(($$result, $$props, $$slots) => {
  const mentions = [
    {
      title: "Responsable du traitement",
      description: "NETARA \u2014 Nettoyage & \xC9lectricit\xE9, bas\xE9 \xE0 Meyzieu (69330). Contact : contact@netara.fr"
    },
    {
      title: "Donn\xE9es collect\xE9es",
      description: "Lors de votre demande de devis, nous collectons : civilit\xE9, nom, commune, t\xE9l\xE9phone (optionnel), e-mail (optionnel), adresse (optionnelle) et le contenu de votre message. Ces donn\xE9es sont strictement n\xE9cessaires au traitement de votre demande.\n"
    },
    {
      title: "Finalit\xE9 du traitement",
      description: "Vos donn\xE9es sont utilis\xE9es exclusivement pour vous recontacter suite \xE0 votre demande de devis. Elles ne sont ni revendues, ni transmises \xE0 des tiers, ni utilis\xE9es \xE0 des fins commerciales tierces.\n"
    },
    {
      title: "Dur\xE9e de conservation",
      description: "Vos donn\xE9es sont conserv\xE9es pour une dur\xE9e maximale de 3 ans apr\xE8s votre derni\xE8re interaction avec NETARA, conform\xE9ment aux recommandations de la CNIL.\n"
    },
    {
      title: "Vos droits (RGPD)",
      description: "Conform\xE9ment au R\xE8glement G\xE9n\xE9ral sur la Protection des Donn\xE9es (RGPD \u2014 UE 2016/679), vous disposez d'un droit d'acc\xE8s, de rectification, d'effacement, de portabilit\xE9 et d'opposition \xE0 vos donn\xE9es personnelles. Pour exercer ces droits, contactez-nous \xE0 : contact@netara.fr\n"
    },
    {
      title: "Cookies",
      description: "Ce site n'utilise pas de cookies de tra\xE7age ou publicitaires. Seuls des cookies techniques strictement n\xE9cessaires au fonctionnement du site peuvent \xEAtre utilis\xE9s.\n"
    },
    {
      title: "H\xE9bergement",
      description: "Ce site est h\xE9berg\xE9 sur un h\xE9bergeur Node.js Hostinger, dont les serveurs sont localis\xE9s en Europe, dans le respect des exigences RGPD."
    },
    {
      title: "R\xE9clamation",
      description: "Si vous estimez que le traitement de vos donn\xE9es n'est pas conforme \xE0 la r\xE9glementation, vous pouvez adresser une r\xE9clamation \xE0 la CNIL (www.cnil.fr)."
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="flex flex-col items-start justify-start max-w-7xl mx-auto p-32 gap-6"> <h1 class="text-xl md:text-2xl font-bold">Politique de confidentialité & Mentions légales</h1> ${mentions.map((item) => renderTemplate`<div class="flex flex-col items-start gap-2"> <span class="text-lg md:text-xl font-bold text-primary">${item.title}</span> <p class="text-text font-normal text-sm md:text-md">${item.description}</p> </div>`)} </section>`;
}, "/home/runner/work/netara-website/netara-website/src/components/ConfidentialityPage/Mentions.astro", void 0);

const $$Confidentiality = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Headers", $$Headers, {})} ${renderComponent($$result2, "Mentions", $$Mentions, {})} ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "/home/runner/work/netara-website/netara-website/src/pages/confidentiality.astro", void 0);

const $$file = "/home/runner/work/netara-website/netara-website/src/pages/confidentiality.astro";
const $$url = "/confidentiality";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Confidentiality,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
