import 'nodemailer';

const prerender = false;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const json = (status, body) => new Response(JSON.stringify(body), {
  status,
  headers: { "Content-Type": "application/json" }
});
const readFormField = (data, key) => {
  const value = data.get(key);
  return typeof value === "string" ? value.trim() : "";
};
const readJsonField = (body, key) => {
  const value = body[key];
  return typeof value === "string" ? value.trim() : "";
};
const parseFromJson = (body) => ({
  civilite: readJsonField(body, "civilite"),
  firstname: readJsonField(body, "firstname") || readJsonField(body, "name"),
  commune: readJsonField(body, "commune"),
  phone: readJsonField(body, "phone"),
  email: readJsonField(body, "email"),
  serviceKey: readJsonField(body, "contact_services") || readJsonField(body, "service"),
  description: readJsonField(body, "description") || readJsonField(body, "message"),
  honeypot: readJsonField(body, "website")
});
const parseFromForm = (data) => ({
  civilite: readFormField(data, "civilite"),
  firstname: readFormField(data, "firstname"),
  commune: readFormField(data, "commune"),
  phone: readFormField(data, "phone"),
  email: readFormField(data, "email"),
  serviceKey: readFormField(data, "contact_services"),
  description: readFormField(data, "description"),
  honeypot: readFormField(data, "website")
});
const POST = async ({ request, redirect }) => {
  const contentType = request.headers.get("content-type") ?? "";
  const wantsJson = (request.headers.get("accept") ?? "").includes("application/json") || contentType.includes("application/json");
  let fields;
  if (contentType.includes("application/json")) {
    try {
      const body = await request.json();
      fields = parseFromJson(body);
    } catch {
      return json(400, { error: "Requête invalide." });
    }
  } else {
    fields = parseFromForm(await request.formData());
  }
  const { civilite, firstname, commune, phone, email, serviceKey, description, honeypot } = fields;
  if (honeypot) {
    return wantsJson ? json(200, { ok: true }) : redirect("/contact?sent=1", 303);
  }
  if (!firstname || !commune || !phone || !email || !serviceKey || !description || !civilite) {
    return json(400, { error: "Champs obligatoires manquants." });
  }
  if (firstname.length > 120 || commune.length > 120 || phone.length > 40 || email.length > 200 || description.length > 5e3) {
    return json(400, { error: "Un des champs dépasse la longueur autorisée." });
  }
  if (!EMAIL_REGEX.test(email)) {
    return json(400, { error: "Adresse email invalide." });
  }
  {
    console.error("[contact] Configuration SMTP manquante.");
    return json(500, { error: "Service d'envoi indisponible." });
  }
};
const GET = () => json(405, { error: "Méthode non autorisée." });

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
