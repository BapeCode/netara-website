const prerender = false;
const POST = async ({ request }) => {
  const data = await request.formData();
  const civilite = data.get("civilite");
  const nom = data.get("firstname");
  const commune = data.get("commune");
  const phone = data.get("phone");
  const email = data.get("email");
  const service = data.get("contact_services");
  const description = data.get("description");
  if (!nom || !commune || !phone || !email || !service || !description || !civilite) {
    return new Response(JSON.stringify({ error: "Champs obligatoires manquants." }), {
      status: 400
    });
  }
  return new Response(JSON.stringify({ success: true }), { status: 200 });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
