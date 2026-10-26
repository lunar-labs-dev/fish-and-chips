import { useState, type FormEvent, type ReactNode } from 'react';
import { brand } from '../data/site';
import { terms } from '../data/invest';

const field =
  'w-full rounded-2xl border-2 border-fc-ink/20 bg-fc-white px-4 py-3.5 text-lg text-fc-ink placeholder:text-fc-ink-soft/70 transition-colors focus:border-fc-ink focus:outline-none';

// Investor application. Until a form backend exists, submitting opens a prefilled email to head office.
export function InvestForm() {
  const [hasSite, setHasSite] = useState<'Yes' | 'No' | ''>('');
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? '').trim();
    const lines = [
      `Name: ${get('name')} ${get('surname')}`,
      `Email: ${get('email')}`,
      `Mobile: ${get('mobile')}`,
      `Physical address: ${get('address')}`,
      `R400k+ unencumbered capital: ${get('capital')}`,
      `Existing site: ${get('hasSite')}`,
      get('hasSite') === 'Yes' ? `Site and address: ${get('site')}` : `Preferred region: ${get('region')}`,
      `Operator type: ${get('operator')}`,
      '',
      get('message'),
    ];
    const subject = `Investor application: ${get('name')} ${get('surname')}`;
    window.location.href = `mailto:${brand.hqEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
    setSent(true);
  }

  return (
    <section id="apply" className="scroll-mt-20 bg-fc-white py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 md:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 className="m-0 font-ns-victor text-5xl leading-none font-bold tracking-[-0.04em] md:text-6xl">
            Apply to <span className="font-semibold text-fc-red italic">invest</span>
          </h2>
          <p className="mt-6 mb-0 max-w-sm text-xl leading-snug text-fc-ink-soft">
            Tell us about yourself and where you would like to open. Head office reviews every application in the order it arrives.
          </p>
          <p className="mt-6 mb-0 text-lg">
            Questions first?{' '}
            <a href={`mailto:${brand.hqEmail}`} className="link-underline">
              {brand.hqEmail}
            </a>
          </p>
        </div>

        <form onSubmit={onSubmit} className="grid gap-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Name">
              <input name="name" required autoComplete="given-name" className={field} />
            </Field>
            <Field label="Surname">
              <input name="surname" required autoComplete="family-name" className={field} />
            </Field>
            <Field label="Email">
              <input name="email" type="email" required autoComplete="email" className={field} />
            </Field>
            <Field label="Mobile">
              <input name="mobile" type="tel" required autoComplete="tel" className={field} />
            </Field>
          </div>
          <Field label="Physical address">
            <input name="address" autoComplete="street-address" className={field} />
          </Field>

          <Choice name="capital" legend="Do you have at least R400k of unencumbered capital available?" options={['Yes', 'No']} />
          <Choice
            name="hasSite"
            legend="Do you have an existing site you would like to open in?"
            options={['Yes', 'No']}
            onChange={(v) => setHasSite(v as 'Yes' | 'No')}
          />
          {hasSite === 'Yes' && (
            <Field label="The site and its address">
              <input name="site" required className={field} />
            </Field>
          )}
          {hasSite === 'No' && (
            <Field label="Which region would you like to open in?">
              <input name="region" required className={field} />
            </Field>
          )}
          <Choice name="operator" legend="Would you invest in a new store as a" options={['Silent operator', 'Active operator']} />

          <Field label="Anything else we should know?">
            <textarea name="message" rows={4} className={`${field} resize-y`} />
          </Field>

          <details className="rounded-2xl border-2 border-fc-ink/15 bg-fc-tile p-5 open:pb-6">
            <summary className="cursor-pointer font-ns-victor text-base font-semibold">Read the terms and conditions</summary>
            <ol className="mt-4 mb-0 grid gap-3 pl-5 text-base leading-relaxed text-fc-ink-soft">
              {terms.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ol>
          </details>

          <label className="flex items-start gap-3 text-lg">
            <input type="checkbox" name="terms" required className="mt-1.5 size-5 shrink-0 accent-fc-red" />
            <span>I accept the terms and conditions.</span>
          </label>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button type="submit" className="btn-red">
              Send application
            </button>
            <p className="m-0 text-base text-fc-ink-soft" aria-live="polite">
              {sent ? 'Your email app should open with the application ready to send.' : 'Opens your email app with everything filled in.'}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="font-ns-victor text-sm font-semibold">{label}</span>
      {children}
    </label>
  );
}

function Choice({ name, legend, options, onChange }: { name: string; legend: string; options: string[]; onChange?: (v: string) => void }) {
  return (
    <fieldset className="m-0 grid gap-3 border-0 p-0">
      <legend className="mb-3 p-0 text-lg leading-snug">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className="cursor-pointer">
            <input type="radio" name={name} value={o} required onChange={() => onChange?.(o)} className="peer sr-only" />
            <span className="block rounded-full border-2 border-fc-ink/20 px-5 py-2.5 font-ns-victor text-sm font-semibold transition-colors peer-checked:border-fc-ink peer-checked:bg-fc-ink peer-checked:text-fc-white peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-fc-red hover:border-fc-ink">
              {o}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
