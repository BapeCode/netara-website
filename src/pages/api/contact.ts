import type { APIRoute } from "astro";

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
    const data = await request.formData();

    const civilite = data.get("civilite") as string
    const nom = data.get("firstname") as string
    const commune = data.get("commune") as string
    const phone = data.get("phone") as string
    const email = data.get("email") as string
    const service = data.get("contact_services") as string
    const description = data.get("description") as string

    if (!nom || !commune || !phone || !email || !service || !description || !civilite) {
        return new Response(JSON.stringify({ error: "Champs obligatoires manquants." }), {
            status: 400,
        })
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 })
}