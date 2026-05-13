import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Navigation,
  Phone,
  Send,
  X,
} from "lucide-react";
import {
  amenities,
  business,
  directionsLink,
  galleryItems,
  heroStats,
  images,
  mapEmbedUrl,
  pricing,
  whatsappLink,
} from "./content";

type BookingForm = {
  fullName: string;
  phone: string;
  email: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  message: string;
};

const navItems = [
  { label: "Apartments", href: "#apartments" },
  { label: "Amenities", href: "#amenities" },
  { label: "Rates", href: "#rates" },
  { label: "Location", href: "#location" },
  { label: "Contact", href: "#contact" },
];

const initialForm: BookingForm = {
  fullName: "",
  phone: "",
  email: "",
  checkIn: "",
  checkOut: "",
  guests: "1",
  message: "",
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState<BookingForm>(initialForm);
  const [formError, setFormError] = useState("");

  const mapReady = mapEmbedUrl.startsWith("https://");
  const mapSrc = mapReady ? mapEmbedUrl : "about:blank";
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const phoneHref = `tel:${business.phoneDisplay.replace(/\s/g, "")}`;

  const handleFieldChange = (field: keyof BookingForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (formError) setFormError("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.fullName.trim() || !form.phone.trim()) {
      setFormError("Please add your name and phone number so Chipo's Lux Apartments can respond.");
      return;
    }

    const details = [
      "Hello Chipo's Lux Apartments, I would like to inquire about booking an apartment in Choma.",
      "",
      `Full name: ${form.fullName.trim()}`,
      `Phone: ${form.phone.trim()}`,
      form.email.trim() ? `Email: ${form.email.trim()}` : "",
      form.checkIn ? `Check-in date: ${form.checkIn}` : "",
      form.checkOut ? `Check-out date: ${form.checkOut}` : "",
      form.guests ? `Number of guests: ${form.guests}` : "",
      form.message.trim() ? `Message: ${form.message.trim()}` : "",
    ].filter(Boolean);

    const inquiryUrl = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(
      details.join("\n"),
    )}`;

    window.open(inquiryUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-ivory text-ink">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/50 bg-ivory/95 shadow-[0_10px_35px_rgba(8,43,73,0.08)] backdrop-blur-xl">
        <div className="section-shell flex items-center justify-between gap-3 py-3">
          <a href="#top" className="flex min-w-0 items-center gap-3" aria-label="Chipo's Lux Apartments home">
            <span className="flex h-11 w-14 shrink-0 items-center justify-center rounded bg-white shadow-sm ring-1 ring-sand/70 sm:h-12 sm:w-16">
              <img
                src={images.logo}
                alt="Chipo's Lux Apartments"
                className="w-14 object-contain sm:w-16"
              />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate font-display text-[1.2rem] font-bold text-ink sm:text-[1.4rem]">
                Chipo's Lux
              </span>
              <span className="block text-[0.62rem] font-extrabold uppercase tracking-[0.22em] text-wine sm:text-[0.68rem]">
                Apartments
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a href={phoneHref} className="icon-link">
              <Phone aria-hidden="true" size={18} />
              <span>{business.phoneDisplay}</span>
            </a>
            <a className="btn-primary" href={whatsappLink} target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden="true" size={18} />
              Book via WhatsApp
            </a>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded border border-sand bg-white text-ink shadow-sm lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>

        {menuOpen ? (
          <nav className="border-t border-sand/70 bg-ivory px-4 pb-5 pt-2 lg:hidden" aria-label="Mobile navigation">
            <div className="mx-auto grid max-w-7xl gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded px-2 py-3 text-sm font-bold uppercase tracking-[0.18em] text-ink"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a className="btn-primary mt-2 justify-center" href={whatsappLink} target="_blank" rel="noreferrer">
                <MessageCircle aria-hidden="true" size={18} />
                Book via WhatsApp
              </a>
            </div>
          </nav>
        ) : null}
      </header>

      <main id="top">
        <section className="hero-section">
          <img
            src={images.heroExterior}
            alt="Chipo's Lux Apartments exterior with courtyard and pool"
            className="hero-bg"
          />
          <div className="hero-shade" />

          <div className="section-shell relative z-10 flex min-h-[calc(100svh-3rem)] flex-col justify-end pb-10 pt-32 lg:pb-14">
            <div className="max-w-4xl text-white">
              <p className="eyebrow text-champagne">Choma furnished accommodation</p>
              <h1 className="mt-5 max-w-4xl font-display text-[2.82rem] font-bold leading-[0.94] sm:text-6xl lg:text-7xl">
                <span className="block sm:inline">Fully</span>{" "}
                <span className="block sm:inline">furnished</span>{" "}
                <span className="block sm:inline">apartments in</span>{" "}
                <span className="block sm:inline">Choma</span>
              </h1>
              <p className="mt-6 max-w-[20rem] text-base leading-8 text-white/80 sm:max-w-2xl sm:text-lg">
                Comfortable, secure, and affordable luxury apartments for short and long stays in Southern Province.
              </p>
              <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <a className="btn-primary w-full justify-center sm:w-auto" href={whatsappLink} target="_blank" rel="noreferrer">
                  <MessageCircle aria-hidden="true" size={19} />
                  Book via WhatsApp
                </a>
                <a className="btn-light w-full justify-center sm:w-auto" href="#apartments">
                  View Apartments
                  <ArrowRight aria-hidden="true" size={19} />
                </a>
              </div>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {heroStats.map((item) => (
                <div key={item} className="hero-stat">
                  <CheckCircle2 aria-hidden="true" size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-20 -mt-6">
          <div className="section-shell">
            <div className="arrival-strip">
              <div>
                <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.25em] text-wine">
                  {business.tagline}
                </p>
                <p className="mt-2 max-w-2xl font-display text-3xl font-bold leading-tight text-ink">
                  A quiet, private base in Choma with the daily essentials already handled.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["Location", business.locationNote],
                  ["Stay type", "Short and long stays"],
                  ["Contact", business.phoneDisplay],
                ].map(([label, value]) => (
                  <div key={label} className="arrival-fact">
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell grid gap-12 py-20 lg:grid-cols-[0.72fr_1fr] lg:items-center lg:py-28">
          <div>
            <p className="eyebrow">About the apartments</p>
            <h2 className="section-title mt-4">Comfortable stays with the essentials taken care of</h2>
            <p className="copy-large mt-6">
              Chipo's Lux Apartments provides fully furnished apartments in Choma for guests who want a peaceful,
              private, and convenient place to stay. The apartments are suitable for business travelers, families,
              tourists, and individuals looking for short-stay or long-stay accommodation.
            </p>
          </div>

          <div className="about-collage">
            <img
              src={images.heroLiving}
              alt="Furnished living room at Chipo's Lux Apartments"
              className="about-main"
              loading="lazy"
              decoding="async"
            />
            <img
              src={images.wardrobe}
              alt="Apartment wardrobe and storage"
              className="about-inset"
              loading="lazy"
              decoding="async"
            />
          </div>
        </section>

        <section id="apartments" className="scroll-mt-24 bg-cream py-20 lg:py-28">
          <div className="section-shell">
            <div className="grid gap-6 lg:grid-cols-[0.72fr_1fr] lg:items-end">
              <div>
                <p className="eyebrow">Apartment showcase</p>
                <h2 className="section-title mt-4">A real look at the apartments and outdoor spaces</h2>
              </div>
              <p className="copy max-w-2xl lg:justify-self-end">
                These are the actual Chipo's Lux Apartments photos, curated into the areas guests care about first:
                arrival, lounge, bedroom, kitchen, bathroom, and parking.
              </p>
            </div>

            <div className="gallery-grid mt-10">
              {galleryItems.map((item) => (
                <article key={item.title} className={`gallery-card ${item.layout === "wide" ? "lg:col-span-2" : ""}`}>
                  <img
                    src={item.image}
                    alt={`${item.title} at Chipo's Lux Apartments`}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="gallery-overlay">
                    <span>{item.title}</span>
                    <p>{item.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="amenities" className="scroll-mt-24 py-20 lg:py-28">
          <div className="section-shell grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
            <div className="sticky-copy">
              <p className="eyebrow">Amenities</p>
              <h2 className="section-title mt-4">Practical comfort, not empty decoration</h2>
              <p className="copy mt-5">
                The offer stays clear: furnished rooms, clean spaces, secure access, and useful amenities for guests
                who need somewhere reliable to stay in Choma.
              </p>
              <img
                src={images.bathroomDetail}
                alt="Bathroom shelf detail at Chipo's Lux Apartments"
                className="mt-8 aspect-[5/4] w-full rounded object-cover shadow-card"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="amenity-list">
              {amenities.map((amenity) => {
                const Icon = amenity.icon;
                return (
                  <article key={amenity.title} className="amenity-row">
                    <span className="amenity-icon">
                      <Icon aria-hidden="true" size={22} />
                    </span>
                    <div>
                      <h3>{amenity.title}</h3>
                      <p>{amenity.text}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="rates" className="scroll-mt-24">
          <div className="rates-panel">
            <img
              src={images.living}
              alt="Living room seating at Chipo's Lux Apartments"
              className="rates-bg"
              loading="lazy"
              decoding="async"
            />
            <div className="rates-shade" />
            <div className="section-shell relative z-10 py-20 text-white lg:py-28">
              <div className="grid gap-8 lg:grid-cols-[0.78fr_1fr] lg:items-end">
                <div>
                  <p className="eyebrow text-champagne">Rates & Booking</p>
                  <h2 className="section-title mt-4 text-white">Flexible stays, quoted directly</h2>
                </div>
                <p className="copy max-w-2xl text-white/75 lg:justify-self-end">
                  Rates may vary depending on length of stay, number of guests, and availability. Contact us directly
                  for the latest pricing.
                </p>
              </div>

              <div className="mt-10 grid gap-4 lg:grid-cols-3">
                {pricing.map((item) => (
                  <article key={item.name} className="rate-card">
                    <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-champagne">{item.name}</p>
                    <h3 className="mt-4 font-display text-4xl font-bold">{item.rate}</h3>
                    <p className="mt-4 text-sm leading-6 text-white/75">{item.note}</p>
                  </article>
                ))}
              </div>

              <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-white/20 pt-6 sm:flex-row sm:items-center">
                <p className="text-sm leading-6 text-white/75">Send your preferred dates and guest count for a direct response.</p>
                <a className="btn-gold" href={whatsappLink} target="_blank" rel="noreferrer">
                  <MessageCircle aria-hidden="true" size={18} />
                  Check Availability on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="location" className="scroll-mt-24 py-20 lg:py-28">
          <div className="section-shell grid gap-10 lg:grid-cols-[0.92fr_0.68fr] lg:items-center">
            <div className="map-wrap">
              <iframe
                title="Chipo's Lux Apartments location in Choma"
                src={mapSrc}
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {!mapReady ? (
                <div className="map-placeholder">
                  <MapPin aria-hidden="true" size={34} />
                  <span>Choma, Southern Province</span>
                </div>
              ) : null}
            </div>

            <div>
              <p className="eyebrow">Location</p>
              <h2 className="section-title mt-4">Find us in Choma</h2>
              <p className="copy mt-5">
                Located in Choma, Southern Province, Zambia. {business.locationNote}
              </p>
              <img
                src={images.exteriorGarden}
                alt="Garden exterior at Chipo's Lux Apartments"
                className="mt-7 aspect-[4/3] w-full rounded object-cover shadow-card"
                loading="lazy"
                decoding="async"
              />
              <div className="mt-5 rounded border border-sand bg-white p-5 shadow-sm">
                <div className="flex gap-3">
                  <MapPin className="mt-1 shrink-0 text-wine" aria-hidden="true" size={21} />
                  <div>
                    <p className="font-bold text-ink">{business.name}</p>
                    <p className="mt-1 text-sm leading-6 text-ink/70">{business.location}</p>
                    <p className="mt-1 text-sm leading-6 text-ink/70">{business.locationNote}</p>
                  </div>
                </div>
                <a className="btn-secondary mt-5 w-full justify-center" href={directionsLink} target="_blank" rel="noreferrer">
                  <Navigation aria-hidden="true" size={18} />
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 bg-mist py-20 lg:py-28">
          <div className="section-shell grid gap-10 lg:grid-cols-[0.72fr_1fr]">
            <div>
              <p className="eyebrow">Contact</p>
              <h2 className="section-title mt-4">Ask about dates, rates, or a longer stay</h2>
              <p className="copy mt-5">
                Share your preferred dates and guest count. The form opens WhatsApp with your details ready to send.
              </p>

              <div className="mt-8 grid gap-3">
                <a className="contact-line" href={phoneHref}>
                  <Phone aria-hidden="true" size={20} />
                  <span>{business.phoneDisplay}</span>
                </a>
                <a className="contact-line" href={`mailto:${business.email}`}>
                  <Mail aria-hidden="true" size={20} />
                  <span>{business.email}</span>
                </a>
              </div>
            </div>

            <form className="booking-form" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="field">
                  <span>Full name *</span>
                  <input
                    value={form.fullName}
                    onChange={(event) => handleFieldChange("fullName", event.target.value)}
                    autoComplete="name"
                    required
                  />
                </label>
                <label className="field">
                  <span>Phone number *</span>
                  <input
                    value={form.phone}
                    onChange={(event) => handleFieldChange("phone", event.target.value)}
                    autoComplete="tel"
                    required
                  />
                </label>
                <label className="field sm:col-span-2">
                  <span>Email address</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => handleFieldChange("email", event.target.value)}
                    autoComplete="email"
                  />
                </label>
                <label className="field">
                  <span>Check-in date</span>
                  <input
                    type="date"
                    value={form.checkIn}
                    onChange={(event) => handleFieldChange("checkIn", event.target.value)}
                  />
                </label>
                <label className="field">
                  <span>Check-out date</span>
                  <input
                    type="date"
                    value={form.checkOut}
                    onChange={(event) => handleFieldChange("checkOut", event.target.value)}
                  />
                </label>
                <label className="field">
                  <span>Number of guests</span>
                  <input
                    type="number"
                    min="1"
                    value={form.guests}
                    onChange={(event) => handleFieldChange("guests", event.target.value)}
                  />
                </label>
                <label className="field sm:col-span-2">
                  <span>Message</span>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(event) => handleFieldChange("message", event.target.value)}
                    placeholder="Tell us the apartment type or stay length you are looking for."
                  />
                </label>
              </div>

              {formError ? <p className="mt-4 rounded bg-wine/10 px-4 py-3 text-sm font-semibold text-wine">{formError}</p> : null}

              <button className="btn-primary mt-6 w-full justify-center" type="submit">
                <Send aria-hidden="true" size={18} />
                Send Inquiry on WhatsApp
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-ink py-10 text-white">
        <div className="section-shell grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <img src={images.logo} alt="Chipo's Lux Apartments" className="h-14 w-auto rounded bg-white p-2" />
            <p className="mt-4 max-w-md text-sm leading-6 text-white/70">
              Fully furnished apartments in Choma for short and long stays.
            </p>
          </div>
          <div>
            <p className="footer-title">Contact</p>
            <p className="footer-text">{business.location}</p>
            <p className="footer-text">{business.locationNote}</p>
            <p className="footer-text">Phone / WhatsApp: {business.phoneDisplay}</p>
            <p className="footer-text">Email: {business.email}</p>
          </div>
          <div>
            <p className="footer-title">Quick links</p>
            <div className="mt-3 grid gap-2">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="footer-link">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="section-shell mt-8 border-t border-white/10 pt-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
          Copyright {currentYear} Chipo's Lux Apartments. All rights reserved.
        </div>
      </footer>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#1f8f54] text-white shadow-[0_14px_36px_rgba(31,143,84,0.34)] transition hover:-translate-y-0.5 hover:bg-[#187846] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1f8f54]"
        aria-label="Book Chipo's Lux Apartments on WhatsApp"
      >
        <MessageCircle aria-hidden="true" size={25} />
      </a>
    </div>
  );
}

export default App;
