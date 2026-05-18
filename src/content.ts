import type { LucideIcon } from "lucide-react";
import {
  AirVent,
  BedDouble,
  CalendarDays,
  Car,
  CookingPot,
  MapPin,
  MonitorPlay,
  ShieldCheck,
  Sparkles,
  Star,
  Waves,
  Wifi,
} from "lucide-react";

export const business = {
  name: "Chipo's Lux Apartments",
  shortName: "Chipolux Apartment",
  location: "Choma, Southern Province, Zambia",
  locationNote: "150 metres from the New Apostolic Church.",
  distanceFromTown: "Approximately 5 minutes from Choma Town.",
  phoneDisplay: "0764937372",
  whatsappNumber: "260764937372",
  email: "info@chiposluxapartments.com",
  careersEmail: "jobs@chiposluxapartments.com",
  tagline: "Home Away From Home",
};

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

export const images = {
  logo: asset("images/chipos-logo.png"),
  heroFront: asset("images/site/chipolux-front-exterior.jpg"),
  exteriorGarden: asset("images/site/chipolux-garden-exterior.jpg"),
  livingRoom: asset("images/site/chipolux-living-room.jpg"),
  bedroomWide: asset("images/site/chipolux-bedroom-wide.jpg"),
  bedroomWarm: asset("images/site/chipolux-bedroom-warm.jpg"),
  bedroomAc: asset("images/site/chipolux-bedroom-ac.jpg"),
  bathroomShower: asset("images/site/chipolux-bathroom-shower.jpg"),
  bathroomVanity: asset("images/site/chipolux-bathroom-vanity.jpg"),
  kitchen: asset("images/site/kitchen-main.jpg"),
  pool: asset("images/site/pool-courtyard.jpg"),
  videoTour: asset("videos/chipolux-video-tour.mp4"),
};

export const whatsappMessage =
  "Hello, I would like to book an apartment at Chipolux Apartment.";

export const whatsappLink = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(
  whatsappMessage,
)}`;

export const careersWhatsappMessage =
  "Hello, I would like to ask about career opportunities at Chipolux Apartment.";

export const careersWhatsappLink = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(
  careersWhatsappMessage,
)}`;

export const directionsLink = "https://maps.google.com/?q=-16.809271,27.001781";

// Uses the provided coordinates in a normal Google Maps iframe embed.
// Do not add a Google Maps API key to this frontend project.
export const mapEmbedUrl =
  "https://maps.google.com/maps?q=-16.809271,27.001781&z=16&output=embed";

export const heroStats = [
  "Short & long stays",
  "Secure parking",
  "Wi-Fi available",
  "Customer service",
];

export const apartmentHighlights = [
  {
    title: "Modern bedrooms",
    text: "Comfortable furnished bedrooms with air conditioning, soft bedding, and a calm private feel.",
    image: images.bedroomWide,
  },
  {
    title: "Relaxed living spaces",
    text: "A polished lounge area with smart TV, seating, and room to settle in after a day in Choma.",
    image: images.livingRoom,
  },
  {
    title: "Secure property setting",
    text: "A private exterior with greenery, secure parking, and convenient access around the apartments.",
    image: images.exteriorGarden,
  },
];

export const galleryItems = [
  {
    title: "Front exterior",
    category: "Exterior",
    detail: "The selected front view of Chipolux Apartment.",
    image: images.heroFront,
    layout: "wide",
  },
  {
    title: "Living room",
    category: "Apartment",
    detail: "A furnished lounge with smart TV and comfortable seating.",
    image: images.livingRoom,
    layout: "wide",
  },
  {
    title: "Garden bedroom",
    category: "Bedroom",
    detail: "Warm bedding, natural light, and a calm garden-side view.",
    image: images.bedroomWarm,
  },
  {
    title: "Air-conditioned bedroom",
    category: "Bedroom",
    detail: "A modern room with air conditioning and a private feel.",
    image: images.bedroomAc,
  },
  {
    title: "Wide bedroom view",
    category: "Bedroom",
    detail: "A neatly furnished bedroom with consistent finishes.",
    image: images.bedroomWide,
    layout: "wide",
  },
  {
    title: "Bathroom shower",
    category: "Bathroom",
    detail: "Marble-style finishes with a clean shower area.",
    image: images.bathroomShower,
  },
  {
    title: "Bathroom vanity",
    category: "Bathroom",
    detail: "Bright bathroom layout with towel rail and mirror.",
    image: images.bathroomVanity,
  },
  {
    title: "Garden exterior",
    category: "Exterior",
    detail: "Landscaped walkways and a quiet property setting.",
    image: images.exteriorGarden,
    layout: "wide",
  },
];

export const amenities: Array<{
  title: string;
  text: string;
  icon: LucideIcon;
}> = [
  {
    title: "Wi-Fi",
    text: "Fast and reliable internet access",
    icon: Wifi,
  },
  {
    title: "Air conditioning",
    text: "Comfortable rooms with air conditioning",
    icon: AirVent,
  },
  {
    title: "Smart TV",
    text: "Entertainment available in the apartment",
    icon: MonitorPlay,
  },
  {
    title: "Kitchen",
    text: "Convenient kitchen facilities",
    icon: CookingPot,
  },
  {
    title: "Security",
    text: "Safe and secure environment",
    icon: ShieldCheck,
  },
  {
    title: "Parking",
    text: "Secure on-site parking",
    icon: Car,
  },
  {
    title: "Swimming pool",
    text: "Relax and enjoy the outdoor pool area",
    icon: Waves,
  },
  {
    title: "Cleaning services",
    text: "Clean and well-maintained apartments",
    icon: Sparkles,
  },
];

export const pricing = [
  {
    name: "Nightly stays",
    rate: "Contact for rate",
    note: "Best for quick visits, work trips, and overnight stops in Choma.",
  },
  {
    name: "Weekly stays",
    rate: "Contact for rate",
    note: "A practical option for business travel, family visits, or short projects.",
  },
  {
    name: "Monthly stays",
    rate: "Contact for rate",
    note: "Suitable for longer assignments, relocation support, or extended family visits.",
  },
];

export const landmarks = [
  "150 metres from the New Apostolic Church",
];

export const testimonials = [
  {
    name: "Guest Review",
    rating: 5,
    text: "Very clean and comfortable apartments. The location is convenient and the staff were very helpful.",
  },
  {
    name: "Guest Review",
    rating: 5,
    text: "Perfect place for a short stay in Choma. Secure parking, good Wi-Fi, and a peaceful environment.",
  },
  {
    name: "Guest Review",
    rating: 5,
    text: "The apartment was modern, well furnished, and exactly what we needed for our stay.",
  },
];

export const careerAreas = [
  {
    title: "Guest care & bookings",
    text: "Friendly communication, guest check-ins, and support for booking inquiries.",
  },
  {
    title: "Housekeeping & apartment care",
    text: "Keeping rooms clean, fresh, and ready for short or long stay guests.",
  },
  {
    title: "Property support",
    text: "Helping maintain a secure, tidy, and welcoming apartment environment.",
  },
];

export const footerLinks = [
  { label: "Home", href: "#top" },
  { label: "Apartments", href: "#apartments" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Location", href: "#location" },
  { label: "Reviews", href: "#reviews" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1Gqg7K83dF/?mibextid=wwXIfr",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@chipos.lux.apartm?_r=1&_t=ZS-96MLkMCBryH",
  },
];

export const trustPoints = [
  { icon: BedDouble, label: "Fully furnished" },
  { icon: ShieldCheck, label: "Secure setting" },
  { icon: MapPin, label: "Choma location" },
  { icon: CalendarDays, label: "Short & long stays" },
  { icon: Star, label: "Guest-focused service" },
];
