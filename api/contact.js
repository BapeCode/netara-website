import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

const SERVICE_LABELS = {
    panneaux: 'Panneaux photovoltaïques',
    electricity: 'Électricité',
    nettoyage: 'Nettoyage BTP & Pro',
    intervention: 'Intervention extrême',
    toiture: 'Nettoyage de toiture',
    facade: 'Nettoyage de façade',
    hydrofuge: 'Hydrofuge coloré',
    autre: 'Autre demande',
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value) =>
    value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

const field = (body, ...keys) => {
    for (const key of keys) {
        const v = body[key];
        if (typeof v === 'string') return v.trim();
    }
    return '';
};

router.post('/', async (req, res) => {
    const body = req.body ?? {};

    const civilite    = field(body, 'civilite');
    const firstname   = field(body, 'firstname', 'name');
    const commune     = field(body, 'commune');
    const phone       = field(body, 'phone');
    const email       = field(body, 'email');
    const serviceKey  = field(body, 'contact_services', 'service');
    const description = field(body, 'description', 'message');
    const honeypot    = field(body, 'website');

    if (honeypot) return res.json({ ok: true });

    // Seuls Nom, Téléphone et Ville sont obligatoires côté formulaire (cf. contact.html).
    // Civilité, Email, Service et Description sont optionnels.
    if (!firstname || !commune || !phone) {
        return res.status(400).json({ error: 'Champs obligatoires manquants.' });
    }
    if (
        firstname.length > 120 ||
        commune.length > 120 ||
        phone.length > 40 ||
        email.length > 200 ||
        description.length > 5000
    ) {
        return res.status(400).json({ error: 'Un des champs dépasse la longueur autorisée.' });
    }
    if (email && !EMAIL_REGEX.test(email)) {
        return res.status(400).json({ error: 'Adresse email invalide.' });
    }

    const serviceLabel = serviceKey ? (SERVICE_LABELS[serviceKey] ?? serviceKey) : 'Non précisé';

    const host    = process.env.SMTP_HOST;
    const portRaw = process.env.SMTP_PORT;
    const user    = process.env.SMTP_USER;
    const pass    = process.env.SMTP_PASS;
    const from    = process.env.MAIL_FROM ?? user;
    const to      = process.env.MAIL_TO ?? user;


    if (!host || !portRaw || !user || !pass || !to) {
        console.error('[contact] Configuration SMTP manquante.');
        return res.status(500).json({ error: "Service d'envoi indisponible." });
    }

    const port = Number(portRaw);
    if (!Number.isFinite(port)) {
        console.error('[contact] SMTP_PORT invalide:', portRaw);
        return res.status(500).json({ error: "Service d'envoi indisponible." });
    }

    const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
    });

    const safe = {
        civilite:    escapeHtml(civilite),
        firstname:   escapeHtml(firstname),
        commune:     escapeHtml(commune),
        phone:       escapeHtml(phone),
        email:       escapeHtml(email),
        service:     escapeHtml(serviceLabel),
        description: escapeHtml(description).replace(/\r?\n/g, '<br/>'),
    };

    const text = [
        'Nouvelle demande depuis le site Netara',
        '',
        `Service : ${serviceLabel}`,
        civilite ? `Civilité : ${civilite}` : null,
        `Nom : ${firstname}`,
        `Commune : ${commune}`,
        `Téléphone : ${phone}`,
        email ? `Email : ${email}` : null,
        '',
        'Description :',
        description || '(non renseignée)',
    ].filter((line) => line !== null).join('\n');

    // Toutes les valeurs safe.* sont passées par escapeHtml() avant interpolation.
    // Les annotations nosemgrep sont nécessaires car Semgrep ne reconnaît pas
    // escapeHtml() comme sanitizer et considère les valeurs encore tainted.
    const GOLD = '#c9a84c';
    const INK = '#0c0c0c';
    const MUTED = '#6b6b6b';
    const BORDER = '#eceae5';
    const BG = '#f8f7f4';

    const row = (label, valueHtml) =>
        '<tr>' +
        '<td style="padding:10px 0;border-bottom:1px solid ' + BORDER + ';width:130px;font-size:13px;color:' + MUTED + ';font-family:Arial,sans-serif;vertical-align:top;">' + label + '</td>' + // nosemgrep: javascript.express.security.injection.raw-html-format.raw-html-format
        '<td style="padding:10px 0;border-bottom:1px solid ' + BORDER + ';font-size:14px;color:' + INK + ';font-family:Arial,sans-serif;font-weight:600;">' + valueHtml + '</td>' + // nosemgrep: javascript.express.security.injection.raw-html-format.raw-html-format
        '</tr>';

    const rows = [
        row('Service', safe.service),
        civilite ? row('Civilité', safe.civilite) : null,
        row('Nom', safe.firstname),
        row('Commune', safe.commune),
        row('Téléphone', '<a href="tel:' + safe.phone + '" style="color:' + INK + ';text-decoration:none;">' + safe.phone + '</a>'),
        email ? row('Email', '<a href="mailto:' + safe.email + '" style="color:' + INK + ';text-decoration:none;">' + safe.email + '</a>') : null,
    ].filter((r) => r !== null).join('\n'); // nosemgrep: javascript.express.security.injection.raw-html-format.raw-html-format

    const html =
        '<div style="background:' + BG + ';padding:32px 16px;font-family:Arial,sans-serif;">' +
        '<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px;margin:0 auto;">' +
        '<tr><td style="background:' + INK + ';border-radius:12px 12px 0 0;padding:24px 32px;">' +
        '<span style="color:' + GOLD + ';font-size:12px;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;">Netara Nettoyage</span><br/>' +
        '<span style="color:#fff;font-size:20px;font-weight:700;font-family:Arial,sans-serif;">Nouvelle demande de devis</span>' +
        '</td></tr>' +
        '<tr><td style="background:#ffffff;border:1px solid ' + BORDER + ';border-top:none;border-radius:0 0 12px 12px;padding:32px;">' + // nosemgrep: javascript.express.security.injection.raw-html-format.raw-html-format
        '<table role="presentation" cellpadding="0" cellspacing="0" width="100%">' + rows + '</table>' + // nosemgrep: javascript.express.security.injection.raw-html-format.raw-html-format
        '<div style="margin-top:24px;">' +
        '<div style="font-size:13px;color:' + MUTED + ';font-family:Arial,sans-serif;margin-bottom:6px;">Description</div>' +
        '<div style="background:' + BG + ';border-radius:8px;padding:14px 16px;font-size:14px;color:' + INK + ';font-family:Arial,sans-serif;white-space:pre-wrap;line-height:1.5;">' + (safe.description || '<span style="color:' + MUTED + ';">Aucune description fournie.</span>') + '</div>' + // nosemgrep: javascript.express.security.injection.raw-html-format.raw-html-format
        '</div>' +
        '</td></tr>' +
        '<tr><td style="padding:16px 8px;text-align:center;">' +
        '<span style="font-size:12px;color:' + MUTED + ';font-family:Arial,sans-serif;">Reçu via le formulaire de contact sur netara.fr</span>' +
        '</td></tr>' +
        '</table>' +
        '</div>';

    try {
        await transporter.sendMail({
            from: `"Site Netara" <${from}>`,
            to,
            ...(email ? { replyTo: email } : {}),
            subject: `[Netara] ${serviceLabel} – ${civilite ? civilite + ' ' : ''}${firstname}`,
            text,
            html,
        });
    } catch (err) {
        console.error("[contact] Échec d'envoi:", err);
        return res.status(502).json({ error: "L'envoi a échoué, merci de réessayer plus tard." });
    }

    return res.json({ ok: true });
});

router.get('/', (_req, res) => res.status(405).json({ error: 'Méthode non autorisée.' }));

export default router;