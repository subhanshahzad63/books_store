/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { Types } from "mongoose";
import { connectToDB } from "../db";
import { product } from "../modals/book.modal";

export async function getBooksAction() {
  try {
    await connectToDB();
    const products = await product.find();

    return products;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getBookByIdAction({ id }: { id: string }) {
  try {
    await connectToDB();
    const data = await product.findById(id);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function createAndSaveProducts(data: any[]) {
  await connectToDB();
  for (const item of data) {
    const productInstance = new product({
      _id: new Types.ObjectId(item._id.$oid),
      myytyPvm: item.myytyPvm.map((date: string) => new Date(date)),
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
      kuvat: item.kuvat.map((image: any) => ({
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
      })),
      old_data: item.old_data.map((oldData: any) => {
        const oldDataItem: any = {
          kuvat: Array.isArray(oldData.kuvat)
            ? oldData.kuvat.map((image: any) => ({
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
                created: new Date(image.created),
                edited: image.edited ? new Date(image.edited) : null,
                resized: image.resized ? new Date(image.resized) : null,
                deleted: image.deleted ? new Date(image.deleted) : null,
              }))
            : typeof oldData.kuvat === "string"
            ? JSON.parse(oldData.kuvat).map((image: any) => ({
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
                created: new Date(image.created),
                edited: image.edited ? new Date(image.edited) : null,
                resized: image.resized ? new Date(image.resized) : null,
                deleted: image.deleted ? new Date(image.deleted) : null,
              }))
            : [],
          lisaKuvat: Array.isArray(oldData.lisaKuvat)
            ? oldData.lisaKuvat.map((image: any) => ({
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
                created: new Date(image.created),
                edited: image.edited ? new Date(image.edited) : null,
                resized: image.resized ? new Date(image.resized) : null,
                deleted: image.deleted ? new Date(image.deleted) : null,
              }))
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
        return oldDataItem;
      }),
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
}
