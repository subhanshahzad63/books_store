/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
"use server";

import { Types } from "mongoose";
import { connectToDB } from "../db";
import { product } from "../modals/book.modal";
import getVendor from "../getVendor";
import { Groupe } from "../modals/group.modal";
import { BookDocument, BookSearchParams, Vendor } from "@/types";

// Helper function to map images (avoids repeating code)
function mapImages(images: any[]) {
  return images.map(
    (image: {
      _id: { $oid: number };
      pos: any;
      process_id: { $oid: number };
      file_domain: any;
      file_path: any;
      file_sm: any;
      file_md: any;
      file_lg: any;
      filename: any;
      filename_edit: any;
      filename_original: any;
      created: { $date: string | number | Date };
      edited: string | number | Date;
      resized: string | number | Date;
      deleted: string | number | Date;
    }) => ({
      _id: new Types.ObjectId(image._id.$oid),
      pos: image.pos,
      process_id: new Types.ObjectId(image.process_id.$oid),
      file_domain: image.file_domain,
      file_path: image.file_path,
      file_sm: image.file_sm,
      file_md: image.file_md,
      file_lg: image.file_lg,
      filename: image.filename,
      filename_edit: image.filename_edit,
      filename_original: image.filename_original,
      created: new Date(image.created.$date),
      edited: image.edited ? new Date(image.edited) : null,
      resized: image.resized ? new Date(image.resized) : null,
      deleted: image.deleted ? new Date(image.deleted) : null,
    })
  );
}

// Helper function to process old data (avoids repeating code)
function mapOldData(oldData: {
  kuvat: string;
  lisaKuvat: any;
  date: { $date: string | number | Date };
  asetukset: any;
  piilotettu: any;
  kategoria: any;
  tuoteryhmat: string;
  kustantajaHaku: any;
  nimiHaku: any;
  tekijaHaku: any;
  category: any;
  tarkistettu: any;
  ver: any;
}) {
  return {
    kuvat: Array.isArray(oldData.kuvat)
      ? mapImages(oldData.kuvat)
      : typeof oldData.kuvat === "string"
      ? JSON.parse(oldData.kuvat).map(mapImages)
      : [],
    lisaKuvat: Array.isArray(oldData.lisaKuvat)
      ? mapImages(oldData.lisaKuvat)
      : [],
    date: new Date(oldData.date.$date),
    asetukset: oldData.asetukset,
    piilotettu: oldData.piilotettu,
    kategoria: oldData.kategoria,
    tuoteryhmat: Array.isArray(oldData.tuoteryhmat)
      ? oldData.tuoteryhmat
      : oldData.tuoteryhmat
      ? JSON.parse(oldData.tuoteryhmat)
      : [],
    kustantajaHaku: oldData.kustantajaHaku,
    nimiHaku: oldData.nimiHaku,
    tekijaHaku: oldData.tekijaHaku,
    category: oldData.category,
    tarkistettu: oldData.tarkistettu,
    ver: oldData.ver,
  };
}

// Cached books action with error handling and timeout management
export async function getBooksAction() {
  await connectToDB();
  const vendor = await getVendor();
  const products = await product
    .find({ y_id: vendor?.antikvaari_id })
    .limit(10);
  return products;
}
export async function getAllBooks() {
  await connectToDB();
  const vendor = await getVendor();
  const products = await product
    .find({ y_id: vendor?.antikvaari_id })
    .limit(15);
  return products;
}
export async function getAllBooksForSearch() {
  await connectToDB();
  const vendor = await getVendor();
  const products = await product.find({ y_id: vendor?.antikvaari_id });

  return products;
}

export async function getAllLanguages() {
  await connectToDB();
  const vendor = await getVendor();

  if (!vendor?.antikvaari_id) {
    return [];
  }

  // Query products using vendor's antikvaari_id
  const products = await product.find({ y_id: vendor.antikvaari_id });

  // Extract unique languages
  const languages = [...new Set(products.map((prod) => prod.kieli))];

  return languages;
}

export async function getAllGroups() {
  await connectToDB(); // Ensure database connection
  const vendor = await getVendor(); // Fetch vendor details

  if (!vendor?.antikvaari_id) {
    return []; // If vendor ID is missing, return empty array
  }

  // Query products using vendor's antikvaari_id
  const products = await product.find({ y_id: vendor.antikvaari_id });

  // Extract unique group IDs
  const GroupsId = [...new Set(products.map((prod) => prod.tuoteryhma))];

  // Query all groups using the extracted IDs
  const groups = await Groupe.find({ _id: { $in: GroupsId } });

  return groups; // Return the group details, not just the IDs
}

export async function getBookByIdAction({ id }: { id: string }) {
  try {
    await connectToDB();
    const data = await product.findById(id);

    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
export const findBooks = async ({
  title,
  language,
  productGroup,
  author,
  page = 1,
  limit = 30,
}: BookSearchParams & { page?: number; limit?: number }): Promise<{
  books: BookDocument[];
  total: number;
  totalPages: number;
}> => {
  try {
    // Get the vendor's information early to do a quick check
    const vendor: Vendor | null = await getVendor();
    console.log("Vendor:", vendor); // Add this line to log vendor details

    if (!vendor?.antikvaari_id) {
      return { books: [], total: 0, totalPages: 0 };
    }

    console.log(title);
    // Build the query object more efficiently
    const query: Record<string, unknown> = {
      y_id: vendor.antikvaari_id,
    };

    // Optimized condition addition
    if (title) {
      query.nimi = { $regex: new RegExp(title, "i") };
      console.log("Title regex:", query.nimi); // Log title regex
    }
    if (language) {
      query.kieli = language;
    }
    if (productGroup) {
      query.tuoteryhma = productGroup;
    }
    if (author) {
      query.tekija = { $regex: new RegExp(author, "i") };
      console.log("Author regex:", query.tekija); // Log author regex
    }

    console.log("Full query object:", query); // Log full query object

    // Pagination calculation
    const skip = (page - 1) * limit;

    // Aggregation pipeline with pagination
    const [result] = await product
      .aggregate([{ $match: query }, { $count: "total" }])
      .exec();

    const total = result ? result.total : 0;
    const totalPages = Math.ceil(total / limit);

    // Fetch paginated books
    const books = await product
      .aggregate([{ $match: query }, { $skip: skip }, { $limit: limit }])
      .exec();

    return {
      books: books as BookDocument[],
      total,
      totalPages,
    };
  } catch (error) {
    console.error("Error finding books:", error);
    throw new Error("Failed to retrieve books");
  }
};

export async function createAndSaveProducts(data: any[]) {
  await connectToDB();
  const productPromises = data.map(
    async (item: {
      _id: { $oid: number };
      myytyPvm: any[];
      hakusanat: any;
      tila: any;
      nimi: any;
      tekija: any;
      paatuoteryhma: any;
      myyntipaikka: any;
      tuotekoodi: any;
      kustantaja: any;
      isbn: any;
      y_id: any;
      ynimi: any;
      ytila: any;
      pvm: { $date: string | number | Date };
      hylly: any;
      sidonta: any;
      kunto: any;
      painovuosi: any;
      painos: any;
      muuta: any;
      hinta: any;
      valuuttakoodi: any;
      maara: any;
      kieli: any;
      sivum: any;
      kuvatieto: any;
      antikvaari_id: any;
      tuoteryhma: any;
      op: any;
      hintaHaku: any;
      varasto: { $oid: number };
      kuvat: any;
      old_data: any[];
      asetukset: any;
      category: any;
      kategoria: any;
      kustantajaHaku: any;
      nimiHaku: any;
      nimikeLisatiedot: any;
      piilotettu: any;
      tarkistettu: string | number | Date;
      tekijaHaku: any;
      tuoteryhmat: any;
      ver: any;
    }) => {
      const productInstance = new product({
        _id: new Types.ObjectId(item._id.$oid),
        myytyPvm: item.myytyPvm.map(
          (date: string | number | Date) => new Date(date)
        ),
        hakusanat: item.hakusanat,
        tila: item.tila,
        nimi: item.nimi,
        tekija: item.tekija,
        paatuoteryhma: item.paatuoteryhma,
        myyntipaikka: item.myyntipaikka,
        tuotekoodi: item.tuotekoodi,
        kustantaja: item.kustantaja,
        isbn: item.isbn,
        y_id: item.y_id,
        ynimi: item.ynimi,
        ytila: item.ytila,
        pvm: new Date(item.pvm.$date),
        hylly: item.hylly,
        sidonta: item.sidonta,
        kunto: item.kunto,
        painovuosi: item.painovuosi,
        painos: item.painos,
        muuta: item.muuta,
        hinta: item.hinta,
        valuuttakoodi: item.valuuttakoodi,
        maara: item.maara,
        kieli: item.kieli,
        sivum: item.sivum,
        kuvatieto: item.kuvatieto,
        antikvaari_id: item.antikvaari_id,
        tuoteryhma: item.tuoteryhma,
        op: item.op,
        catalog_suggestions: [],
        hintaHaku: item.hintaHaku,
        varasto: new Types.ObjectId(item.varasto.$oid),
        kuvat: mapImages(item.kuvat),
        old_data: item.old_data.map(mapOldData),
        asetukset: item.asetukset,
        category: item.category,
        kategoria: item.kategoria,
        kustantajaHaku: item.kustantajaHaku,
        nimiHaku: item.nimiHaku,
        nimikeLisatiedot: item.nimikeLisatiedot,
        piilotettu: item.piilotettu,
        tarkistettu: item.tarkistettu ? new Date(item.tarkistettu) : null,
        tekijaHaku: item.tekijaHaku,
        tuoteryhmat: item.tuoteryhmat,
        ver: item.ver,
      });

      await productInstance.save();
    }
  );

  // Use Promise.all to handle the product saving concurrently
  await Promise.all(productPromises);
}
