export type PropertyType = "Apartment" | "Villa" | "Townhouse" | "Penthouse";

export type CompletionStatus = "Ready" | "Off-plan";

export type Agent = {
  name: string;
  role: string;
  area: string;
  years: number;
  deals: number;
  phone: string;
  email: string;
  gradient: string;
};

export type GalleryPhoto = {
  label: string;
  gradient: string;
};

export type Listing = {
  id: string;
  title: string;
  community: string;
  subCommunity?: string;
  type: PropertyType;
  status: CompletionStatus;
  tag?: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  description: string;
  amenities: string[];
  gradient: string;
  gallery: GalleryPhoto[];
  agent: Agent;
  featured: boolean;
  listedOn: string;
};
