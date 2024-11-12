import mongoose from "mongoose";
import Product, { IProduct as IBook } from "../schema/books";
import { connectToDB } from "../db";

// import { connectToDB as connectToDatabase } from "../db";

const bookData = [
  {
    image: "https://utfs.io/f/XskS7UxK1RObJ6zvgEXOdqT8fMva9Ec6iKDCUZFogX2LepIt",
    subtitle: "Sinikka Nopola, Tiina Nopola",
    title: "Risto Räppääjä ja villi kone",
    date: "2006-01-01",
    price: "5,00",
  },
  {
    image: "https://utfs.io/f/XskS7UxK1RObACQprrGdBgyq1eNpGQAjc03wTP5rJXnviakL",
    subtitle: "Agota Kristof ",
    title: "Kolmas valhe",
    date: "2006-01-01",
    price: "18,00",
  },
  {
    image: "https://utfs.io/f/XskS7UxK1ROb7bWpcSCOyhmFGCW4Yjn61XJ8wHaTZlvQUcVb",
    subtitle: "Agota Kristof",
    title: "Todiste",
    date: "2006-01-01",
    price: "18,00",
  },
  {
    image: "https://utfs.io/f/XskS7UxK1RObo54n0ffwermdwGJBSE4OpzjqPC1LKINWklMt",
    subtitle: "Chris Wickham",
    title: "The inheritance of Rome",
    date: "2010-01-01",
    price: "12,00",
  },
  {
    image: "https://utfs.io/f/XskS7UxK1RObmtD9jAeFVkCAqMwt27PeGsniN5J0YEDy1cOS",
    subtitle: "James Burnham",
    title: "The Machiavellians",
    date: "1943-01-01",
    price: "8,00",
  },
  {
    image: "https://utfs.io/f/XskS7UxK1RObiHMQkhjStoCamYF7pbP6vXheNsRgnHQUEKWL",
    subtitle: "Eskelinen Heikki J. - Kanerva Esko",
    title: "Pitäjänmäen Tarmo 75 vuotta 1925-2000",
    date: "2000-01-01",
    price: "5,00",
  },
];

export async function seedBooksAction() {
  await connectToDB();
  for (const book of bookData) {
    const newBook: IBook = new Product({
      _id: new mongoose.Types.ObjectId(),
      myytyPvm: [new Date(), new Date(2023, 3, 15), new Date(2022, 9, 1)],
      hakusanat: ["fiction", "historical", "biography", "novel", "literature"],
      tila: true,
      nimi: book.title,
      tekija: book.subtitle,
      paatuoteryhma: "Books",
      myyntipaikka: "Online Store",
      tuotekoodi: `BOOK-${Math.floor(100000 + Math.random() * 900000)}`,
      kustantaja: ["Random House", "Penguin Books", "Gateway"][
        Math.floor(Math.random() * 3)
      ],
      isbn: `978-${Math.floor(100000 + Math.random() * 900000)}-${Math.floor(
        100 + Math.random() * 900
      )}`,
      y_id: Math.floor(1000 + Math.random() * 9000),
      ynimi: ["John Doe", "Jane Smith", "Michael Johnson"][
        Math.floor(Math.random() * 3)
      ],
      ytila: Math.floor(1 + Math.random() * 3),
      pvm: new Date(book.date),
      hylly: ["A1", "B2", "C3"][Math.floor(Math.random() * 3)],
      sidonta: ["Hardcover", "Paperback", "Spiral"][
        Math.floor(Math.random() * 3)
      ],
      kunto: ["New", "Used", "Damaged"][Math.floor(Math.random() * 3)],
      painovuosi: new Date(book.date).getFullYear().toString(),
      painos: ["1st", "2nd", "3rd"][Math.floor(Math.random() * 3)],
      muuta: ["None", "Annotated", "Illustrated"][
        Math.floor(Math.random() * 3)
      ],
      hinta: parseFloat(book.price.replace(",", ".")),
      valuuttakoodi: "EUR",
      maara: Math.floor(5 + Math.random() * 20),
      kieli: ["English", "Finnish", "German"][Math.floor(Math.random() * 3)],
      sivum: Math.floor(200 + Math.random() * 300).toString(),
      kuvatieto: book.image,
      antikvaari_id: Math.floor(100 + Math.random() * 900),
      tuoteryhma: Math.floor(1 + Math.random() * 10),
      op: ["ACME Inc.", "Books R Us", "Literary Emporium"][
        Math.floor(Math.random() * 3)
      ],
      catalog_suggestions: [new mongoose.Types.ObjectId()],
      hintaHaku: parseFloat(book.price.replace(",", ".")),
      varasto: new mongoose.Types.ObjectId(),
      kuvat: [],
      old_data: [],
      asetukset: {
        tiedot_teokselta: true,
      },
      category: Math.floor(1 + Math.random() * 5),
      kategoria: Math.floor(1 + Math.random() * 10),
      kustantajaHaku: ["Random House", "Penguin Books", "Gateway"][
        Math.floor(Math.random() * 3)
      ],
      nimiHaku: book.title,
      nimikeLisatiedot: ["None", "Annotated", "Illustrated"][
        Math.floor(Math.random() * 3)
      ],
      piilotettu: [true, false][Math.floor(Math.random() * 2)],
      tarkistettu: new Date(
        2023,
        Math.floor(Math.random() * 12),
        Math.floor(1 + Math.random() * 28)
      ),
      tekijaHaku: book.subtitle,
      tuoteryhmat: [
        Math.floor(1 + Math.random() * 5),
        Math.floor(1 + Math.random() * 5),
        Math.floor(1 + Math.random() * 5),
      ],
      ver: "1.0",
    });

    try {
      await newBook.save();
    } catch (err) {
      console.log(err);
    }
  }

  console.log("Books seeded successfully!");
}
