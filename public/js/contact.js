document.querySelectorAll('[data-civ]').forEach((btn) => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('[data-civ]').forEach((b) => {
            b.classList.remove('active', 'border-primary');
        });
        btn.classList.add('active', 'border-primary');
        const civInput = document.getElementById('civilite-input');
        if (civInput && btn.dataset.civ) civInput.value = btn.dataset.civ;
    });
});

const form         = document.getElementById('contact-form');
const submitBtn    = document.getElementById('contact-submit');
const submitLabel  = document.getElementById('contact-submit-label');
const toast        = document.getElementById('contact-toast');
const toastCard    = document.getElementById('contact-toast-card');
const toastTitle   = document.getElementById('contact-toast-title');
const toastMsg     = document.getElementById('contact-toast-msg');
const toastIconOk  = document.getElementById('contact-toast-icon-success');
const toastIconErr = document.getElementById('contact-toast-icon-error');
const toastClose   = document.getElementById('contact-toast-close');

let toastTimer = null;

const hideToast = () => {
    if (!toast) return;
    toast.classList.remove('translate-x-0', 'opacity-100');
    toast.classList.add('translate-x-[120%]', 'opacity-0');
};

const showToast = (kind, title, msg) => {
    if (!toast || !toastCard || !toastTitle || !toastMsg || !toastIconOk || !toastIconErr) return;
    if (toastTimer !== null) { window.clearTimeout(toastTimer); toastTimer = null; }

    toastTitle.textContent = title;
    toastMsg.textContent   = msg;

    toastCard.classList.remove('border-success/30', 'border-danger/30', 'border-border');
    if (kind === 'success') {
        toastCard.classList.add('border-success/30');
        toastIconOk.classList.remove('hidden');
        toastIconErr.classList.add('hidden');
    } else {
        toastCard.classList.add('border-danger/30');
        toastIconErr.classList.remove('hidden');
        toastIconOk.classList.add('hidden');
    }

    toast.classList.remove('translate-x-[120%]', 'opacity-0');
    toast.classList.add('translate-x-0', 'opacity-100');

    toastTimer = window.setTimeout(hideToast, kind === 'success' ? 5000 : 7000);
};

toastClose?.addEventListener('click', hideToast);

form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!submitBtn || !submitLabel) return;

    submitBtn.disabled = true;
    const originalLabel = submitLabel.textContent;
    submitLabel.textContent = 'Envoi en cours...';

    try {
        const data = Object.fromEntries(new FormData(form).entries());

        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(typeof result.error === 'string' ? result.error : 'Une erreur est survenue.');
        }

        showToast('success', 'Message envoyé !', 'Merci, nous vous répondons sous 24h.');
        form.reset();
        document.querySelectorAll('[data-civ]').forEach((b) => b.classList.remove('active', 'border-primary'));
        const civInput = document.getElementById('civilite-input');
        if (civInput) civInput.value = 'M.';
    } catch (error) {
        showToast('error', "Échec de l'envoi", error.message ?? 'Une erreur est survenue.');
    } finally {
        submitBtn.disabled = false;
        submitLabel.textContent = originalLabel ?? 'Envoyer ma demande';
    }
});
