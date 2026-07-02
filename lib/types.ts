export type PropertyType = "Apartment" | "Villa" | "Townhouse" | "Penthouse";

export type CompletionStatus = "Ready" | "Off-plan";

export type DealType = "Sale" | "Rent";

export type FurnishingStatus = "Furnished" | "Unfurnished" | "Partly furnished";

export type RentFrequency = "Yearly" | "Monthly";

export type Agent = {
  name: string;
  role: string;
  area: string;
  years: number;
  deals: number;
  phone: string;
  email: string;
};

export type GalleryPhoto = {
  label: string;
  url: string;
};

export type Listing = {
  id: string;
  title: string;
  community: string;
  subCommunity?: string;
  type: PropertyType;
  status: CompletionStatus;
  dealType: DealType;
  furnished?: FurnishingStatus;
  rentFrequency?: RentFrequency;
  tag?: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  description: string;
  amenities: string[];
  photo: string;
  gallery: GalleryPhoto[];
  agent: Agent;
  featured: boolean;
  listedOn: string;
};
