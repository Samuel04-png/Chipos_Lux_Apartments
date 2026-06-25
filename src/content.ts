import type { LucideIcon } from "lucide-react";

export const business = {
  name: "Chipo's Lux Apartments",
  shortName: "Chipolux Apartment",
  location: "Choma, Southern Province, Zambia",
  locationNote: "",
  distanceFromTown: "",
  phoneDisplay: "0764937372",
  whatsappNumber: "260764937372",
  email: "info@chiposluxapartments.com",
  careersEmail: "jobs@chiposluxapartments.com",
  tagline: "Home Away From Home",
};

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

export const homePageLink = import.meta.env.BASE_URL;
export const jobsPageLink = `${import.meta.env.BASE_URL}jobs/`;

export const images = {
  logo: asset("images/chipos-logo.png"),
  heroFront: asset("images/site/chipolux-garden-exterior.jpg"),
  frontExterior: asset("images/site/chipolux-front-exterior.jpg"),
  exteriorGarden: asset("images/site/chipolux-garden-exterior.jpg"),
  livingRoom: asset("images/site/chipolux-living-room.jpg"),
  bedroomWide: asset("images/site/chipolux-bedroom-wide.jpg"),
  bedroomWarm: asset("images/site/chipolux-bedroom-warm.jpg"),
  bedroomAc: asset("images/site/chipolux-bedroom-ac.jpg"),
  bathroomShower: asset("images/site/chipolux-bathroom-shower.jpg"),
  bathroomVanity: asset("images/site/chipolux-bathroom-vanity.jpg"),
  kitchen: asset("images/site/kitchen-main.jpg"),
  pool: asset("images/site/pool-courtyard.jpg"),
  hiringAdvert: asset("images/site/chipolux-hiring-advert.jpeg"),
  videoTour: asset("videos/chipolux-video-tour.mp4"),
};

export const whatsappMessage = "Hello, I would like to book an apartment at Chipolux Apartment.";

export const whatsappLink = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(
  whatsappMessage,
)}`;

export const directionsLink = "https://maps.google.com/?q=-16.809271,27.001781";

// Uses the provided coordinates in a normal Google Maps iframe embed.
// Do not add a Google Maps API key to this frontend project.
export const mapEmbedUrl = "https://maps.google.com/maps?q=-16.809271,27.001781&z=16&output=embed";

type ApartmentHighlight = {
  title: string;
  text: string;
  image: string;
};

type GalleryItem = {
  title: string;
  category: string;
  detail: string;
  image: string;
  layout?: "wide";
};

type Amenity = {
  title: string;
  text: string;
  icon: LucideIcon;
};

type PricingItem = {
  name: string;
  rate: string;
  note: string;
};

type Testimonial = {
  name: string;
  rating: number;
  text: string;
};

type CareerArea = {
  title: string;
  text: string;
};

type JobOpening = {
  title: string;
  positions: string;
  responsibilities: string[];
  qualifications: string[];
};

type FooterLink = {
  label: string;
  href: string;
};

type SocialLink = {
  label: string;
  href: string;
};

type TrustPoint = {
  icon: LucideIcon;
  label: string;
};

// Public website content entries intentionally cleared at the owner's request.
// These arrays previously contained demo/static marketing, gallery, review, pricing, and job data.
export const heroStats: string[] = [];
export const apartmentHighlights: ApartmentHighlight[] = [];
export const galleryItems: GalleryItem[] = [];
export const amenities: Amenity[] = [];
export const pricing: PricingItem[] = [];
export const landmarks: string[] = [];
export const testimonials: Testimonial[] = [];
export const careerAreas: CareerArea[] = [];
export const jobOpenings: JobOpening[] = [];
export const footerLinks: FooterLink[] = [];
export const socialLinks: SocialLink[] = [];
export const trustPoints: TrustPoint[] = [];

export const hiringDetails = {
  bannerText: "",
  intro: "",
  location: "",
  deadline: "",
  deadlineNote: "",
  applyEmail: business.careersEmail,
  applicationNote: "",
};
