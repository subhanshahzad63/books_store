import { Types } from "mongoose";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CardItem {
  id: string;
  image: string;
  title: string;
  price: string;
  quantity?: number;
  subTitle?: string;
  condition?: string;
  binding?: string;
  date?: string;
}

export interface Book {
  _id: {
    $oid: string;
  };
  nimi: string;
  tekija: string;
  kieli: string;
  paatuoteryhma: string;
  hinta: number;
  kunto: string;
  kustantaja: string;
  painovuosi: string;
  sivum: string;
  kuvat?: Array<{
    file_domain: string;
    file_path: string;
    file_sm: string;
    file_md: string;
    file_lg: string;
  }>;
  [key: string]: any; // for other potential properties
}

export interface SearchQuery {
  query: string;
  language: string;
  productGroup: string;
}

export interface BookSearchParams {
  title?: string;
  language?: string;
  productGroup?: string;
  author?: string;
}

export interface BookDocument {
  _id: Types.ObjectId;
  nimi: string;
  kieli?: string;
  tuoteryhma?: string;
  tekija?: string;
  y_id: string;
}

export interface Vendor {
  domain: string;
  _id: {
    $oid: string;
  };
  tila: number;
  ynimi: string; // Business name
  osoite: string; // Address
  pno: string; // Postal code
  ptp: string; // City
  maa: string; // Country
  puh: string; // Phone
  matkapuh: string; // Mobile phone
  lytunnus: string; // Business ID
  omistaja: string | null; // Owner
  email: string;
  antikvaariKauppias: boolean; // Antiquarian bookseller
  antikvaari_id: number;
  maksutavat: Array<{
    maksutapa: string; // Payment method
    tiedot: string; // Payment details
    tila: boolean; // Status
  }>;
  toimitustavat: Array<{
    toimitustapa: string; // Delivery method
    toimitustiedot: string; // Delivery details
    tila: boolean; // Status
  }>;
  tuoteTila: boolean; // Product status
  views: number;
  colors: Array<{
    id: number;
    name: string;
    hex: string;
  }>;
  logo: string;
  frontpage: {
    title: string;
    excerpt: string;
    hero: string;
    readmore: {
      text: string;
      url: string;
    };
  };
  pages: Array<{
    id: number;
    name: string;
    url: string;
    content: string;
  }>;
}
