import type { LucideIcon } from "lucide-react";
import {
  BedDouble,
  CalendarDays,
  Car,
  KeyRound,
  Leaf,
  ShieldCheck,
  Sparkles,
  Wifi,
} from "lucide-react";

export const business = {
  name: "Chipo's Lux Apartments",
  location: "Choma, Southern Province, Zambia",
  locationNote: "150 metres from the New Apostolic Church.",
  phoneDisplay: "0764937372",
  whatsappNumber: "260764937372",
  email: "Chipolux1@gmail.com",
  tagline: "Home Away From Home",
};

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

export const images = {
  logo: asset("images/chipos-logo.png"),
  heroExterior: asset("images/site/hero-exterior-pool.jpg"),
  heroLiving: asset("images/site/hero-living-panorama.jpg"),
  heroBedroom: asset("images/site/hero-bedroom.jpg"),
  living: asset("images/site/living-room-wide.jpg"),
  bedroomGarden: asset("images/site/bedroom-garden.jpg"),
  bedroomSuite: asset("images/site/bedroom-suite.jpg"),
  kitchen: asset("images/site/kitchen-main.jpg"),
  bathroom: asset("images/site/bathroom-main.jpg"),
  bathroomDetail: asset("images/site/bathroom-detail.jpg"),
  exteriorGarden: asset("images/site/exterior-garden.jpg"),
  parking: asset("images/site/parking-driveway.jpg"),
  pool: asset("images/site/pool-courtyard.jpg"),
  detailLamp: asset("images/site/room-detail-lamp.jpg"),
  wardrobe: asset("images/site/wardrobe.jpg"),
};

export const whatsappMessage =
  "Hello Chipo's Lux Apartments, I would like to inquire about booking an apartment in Choma.";

export const whatsappLink = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(
  whatsappMessage,
)}`;

export const directionsLink =
  "https://maps.google.com/?q=-16.809271,27.001781";

// Uses the provided coordinates in a normal Google Maps iframe embed.
// Do not add a Google Maps API key to this frontend project.
export const mapEmbedUrl =
  "https://maps.google.com/maps?q=-16.809271,27.001781&z=16&output=embed";

export const heroStats = [
  "Short & long stays",
  "Secure parking",
  "Wi-Fi available",
  "Housekeeping",
];

export const galleryItems = [
  {
    title: "Arrival courtyard",
    detail: "Modern apartment frontage with a landscaped outdoor pool area.",
    image: images.heroExterior,
    layout: "wide",
  },
  {
    title: "Living room",
    detail: "A furnished lounge with TV, seating, and space to unwind.",
    image: images.heroLiving,
    layout: "wide",
  },
  {
    title: "Bedroom with garden light",
    detail: "Calm bedding, bedside lighting, and natural light from the garden side.",
    image: images.bedroomGarden,
  },
  {
    title: "Suite bedroom",
    detail: "Soft neutral finishes, layered bedding, and a private room layout.",
    image: images.bedroomSuite,
  },
  {
    title: "Kitchenette",
    detail: "A practical self-catering kitchen with essential appliances.",
    image: images.kitchen,
  },
  {
    title: "Bathroom",
    detail: "Bright marble finishes with a clean shower and wash area.",
    image: images.bathroom,
  },
  {
    title: "Outdoor access",
    detail: "Walkways, greenery, and secure parking around the apartments.",
    image: images.parking,
  },
  {
    title: "Finishing details",
    detail: "Small touches that make each apartment feel prepared for guests.",
    image: images.detailLamp,
  },
];

export const amenities: Array<{
  title: string;
  text: string;
  icon: LucideIcon;
}> = [
  {
    title: "Fully furnished apartments",
    text: "Bedrooms, lounge spaces, storage, and kitchen essentials are ready on arrival.",
    icon: BedDouble,
  },
  {
    title: "Wi-Fi and modern amenities",
    text: "Useful everyday comforts for work trips, family stays, and longer visits.",
    icon: Wifi,
  },
  {
    title: "Housekeeping services",
    text: "Clean, cared-for spaces with practical support during your stay.",
    icon: Sparkles,
  },
  {
    title: "Secure parking",
    text: "On-site parking and controlled access for peace of mind.",
    icon: Car,
  },
  {
    title: "Security",
    text: "A secure environment for business guests, families, and travelers.",
    icon: ShieldCheck,
  },
  {
    title: "Short and long stays",
    text: "Flexible accommodation for overnight trips, weekly bookings, or monthly stays.",
    icon: CalendarDays,
  },
  {
    title: "Peaceful environment",
    text: "Landscaped outdoor areas and private rooms designed for quiet downtime.",
    icon: Leaf,
  },
  {
    title: "Privacy",
    text: "Your own furnished apartment with space to settle in and feel at home.",
    icon: KeyRound,
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
