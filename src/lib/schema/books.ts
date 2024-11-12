/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Document, Schema } from "mongoose";

// Update the old_data interface to handle both string and number array
interface OldData {
  kuvat: any[];
  lisaKuvat: any[];
  date: Date;
  asetukset: {
    tiedot_teokselta: boolean;
  } | null;
  piilotettu: string;
  kategoria: string;
  tuoteryhmat: string | number[]; // Updated to handle both string and number array
  kustantajaHaku: string;
  nimiHaku: string;
  tekijaHaku: string;
  category: string;
  tarkistettu: string;
  ver: string;
}

export interface IProduct extends Document {
  _id: {
    $oid: string;
  };
  myytyPvm: any[];
  hakusanat: any[];
  tila: boolean;
  nimi: string;
  tekija: string;
  paatuoteryhma: string;
  myyntipaikka: string;
  tuotekoodi: string;
  kustantaja: string;
  isbn: string;
  y_id: number;
  ynimi: string;
  ytila: number;
  pvm: Date;
  hylly: string;
  sidonta: string;
  kunto: string;
  painovuosi: string;
  painos: string;
  muuta: string;
  hinta: number;
  valuuttakoodi: string;
  maara: number;
  kieli: string;
  sivum: string;
  kuvatieto: string;
  antikvaari_id: number;
  tuoteryhma: number;
  op: string;
  catalog_suggestions: {
    $oid: string;
  }[];
  hintaHaku: number;
  varasto: {
    $oid: string;
  };
  kuvat: {
    _id: {
      $oid: string;
    };
    pos: number;
    process_id: {
      $oid: string;
    };
    file_domain: string;
    file_path: string;
    file_sm: string;
    file_md: string;
    file_lg: string;
    filename: string;
    filename_edit: string;
    filename_original: string;
    created: Date;
    edited: Date | null;
    resized: Date | null;
    deleted: Date | null;
  }[];
  old_data: OldData[];
  asetukset: {
    tiedot_teokselta: boolean;
  };
  category: number;
  kategoria: number;
  kustantajaHaku: string;
  nimiHaku: string;
  nimikeLisatiedot: string;
  piilotettu: boolean;
  tarkistettu: Date | null;
  tekijaHaku: string;
  tuoteryhmat: number[];
  ver: string;
}

const productSchema: Schema<IProduct> = new mongoose.Schema({
  _id: {
    $oid: { type: String, required: true },
  },
  myytyPvm: [Schema.Types.Mixed],
  hakusanat: [Schema.Types.Mixed],
  tila: { type: Boolean },
  nimi: { type: String },
  tekija: { type: String },
  paatuoteryhma: { type: String },
  myyntipaikka: { type: String },
  tuotekoodi: { type: String },
  kustantaja: { type: String },
  isbn: { type: String },
  y_id: { type: Number },
  ynimi: { type: String },
  ytila: { type: Number },
  pvm: { type: Date },
  hylly: { type: String },
  sidonta: { type: String },
  kunto: { type: String },
  painovuosi: { type: String },
  painos: { type: String },
  muuta: { type: String },
  hinta: { type: Number },
  valuuttakoodi: { type: String },
  maara: { type: Number },
  kieli: { type: String },
  sivum: { type: String },
  kuvatieto: { type: String },
  antikvaari_id: { type: Number },
  tuoteryhma: { type: Number },
  op: { type: String },
  catalog_suggestions: [
    {
      $oid: { type: String },
    },
  ],
  hintaHaku: { type: Number },
  varasto: {
    $oid: { type: String },
  },
  kuvat: [
    {
      _id: {
        $oid: { type: String },
      },
      pos: { type: Number },
      process_id: {
        $oid: { type: String },
      },
      file_domain: { type: String },
      file_path: { type: String },
      file_sm: { type: String },
      file_md: { type: String },
      file_lg: { type: String },
      filename: { type: String },
      filename_edit: { type: String },
      filename_original: { type: String },
      created: { type: Date },
      edited: { type: Date },
      resized: { type: Date },
      deleted: { type: Date },
    },
  ],
  old_data: [
    {
      kuvat: [Schema.Types.Mixed],
      lisaKuvat: [Schema.Types.Mixed],
      date: { type: Date },
      asetukset: {
        tiedot_teokselta: { type: Boolean },
      },
      piilotettu: { type: String },
      kategoria: { type: String },
      tuoteryhmat: { type: Schema.Types.Mixed }, // Updated to handle both string and array
      kustantajaHaku: { type: String },
      nimiHaku: { type: String },
      tekijaHaku: { type: String },
      category: { type: String },
      tarkistettu: { type: String },
      ver: { type: String },
    },
  ],
  asetukset: {
    tiedot_teokselta: { type: Boolean },
  },
  category: { type: Number },
  kategoria: { type: Number },
  kustantajaHaku: { type: String },
  nimiHaku: { type: String },
  nimikeLisatiedot: { type: String },
  piilotettu: { type: Boolean },
  tarkistettu: { type: Date },
  tekijaHaku: { type: String },
  tuoteryhmat: [{ type: Number }],
  ver: { type: String },
});

const Product =
  mongoose.models.Product3 ||
  mongoose.model<IProduct>("Product3", productSchema);

export default Product;
