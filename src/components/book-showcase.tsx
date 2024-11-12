/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useCartStore } from "@/store/useCartStore";
import { useState, type FC } from "react";

interface BookDetails {
  title: string;
  author: string;
  publisher: string;
  year: string;
  price: string;
  condition: string;
  binding: string;
  isbn: string;
  pages: string;
  category: string;
  edition: string;
  dimensions: string;
  description: string;
  imageUrl: string;
}

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  book: any;
}

const BookShowcase: FC<Props> = ({ book }) => {
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      id: book.id,
      image: `${book.kuvat[0]?.file_domain}/${book.kuvat[0]?.file_path}/${book.kuvat[0]?.file_md}`,
      title: book.nimi,
      price: book.hinta ? book.hinta.toString() : "",
      subTitle: "",
      quantity: 1,
      condition: book.kunto || "",
      binding: book.sidonta || "",
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const bookDetails: BookDetails = {
    title: book.nimi || "", // Extract book title
    author: book.tekija || "", // Extract author
    publisher: book.kustantaja || "", // Extract publisher
    year: book.painovuosi || "", // Extract year (assuming "painovuosi" is the publication year)
    price: book.hinta ? book.hinta.toString() : "", // Convert price to string
    condition: book.kunto || "", // Extract condition
    binding: book.sidonta || "", // Extract binding type
    isbn: book.isbn || "", // Extract ISBN
    pages: book.sivum || "", // Extract number of pages
    category: book.paatuoteryhma || "", // Extract category
    edition: book.painos || "", // Extract edition
    dimensions: "-", // You don't have a dimensions field in the data
    description: book.muuta || "", // You can add extra description if needed
    imageUrl: `${book.kuvat[0]?.file_domain}/${book.kuvat[0]?.file_path}/${book.kuvat[0]?.file_md}`,
  };

  const DetailRow = ({ label, value }: { label: string; value: string }) => (
    <div className="w-full py-1 flex items-start gap-x-2">
      <span className="font-semibold min-w-[100px]">{label}:</span>
      <span>{value}</span>
    </div>
  );

  return (
    <div className="w-full  px-4">
      <div className="flex flex-col gap-y-2 my-4">
        <h1 className="text-2xl md:text-4xl font-bold playfair-display">
          {bookDetails.title}
        </h1>
        <span className="text-lg underline">{bookDetails.author}</span>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="w-full md:col-span-4 lg:col-span-3">
          <img
            className="w-full max-w-[300px] mx-auto md:mx-0"
            src={bookDetails.imageUrl}
            alt={bookDetails.title}
          />
        </div>

        <div className="w-full md:col-span-8 lg:col-span-9">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-2">
                {bookDetails.author}: {bookDetails.title}
              </h2>
              <div className="space-y-1">
                <p>{bookDetails.author}</p>
                <p>
                  {bookDetails.year} • {bookDetails.publisher}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-y-2">
              <h3 className="text-2xl md:text-3xl font-bold playfair-display">
                {bookDetails.price} €
              </h3>
              <p className="text-sm">Lähetetään 1-2 arkipäivässä.</p>
              <p className="text-sm">Toimitus Suomeen 6,90 €</p>
              <button
                onClick={handleAddToCart}
                className="w-full mt-4 py-3 px-4 bg-[#FFC767] font-bold hover:bg-[#e6b35d] transition-colors rounded-sm"
              >
                Lisää ostoskoriin »
              </button>
            </div>
          </div>

          <div className="w-full border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mb-8">
              <div>
                <DetailRow label="Kunto" value={bookDetails.condition} />
                <DetailRow label="Sidonta" value={bookDetails.binding} />
                <DetailRow label="ISBN" value={bookDetails.isbn} />
                <DetailRow label="Sivuja" value={bookDetails.pages} />
              </div>
              <div>
                <DetailRow label="Tuoteryhmä" value={bookDetails.category} />
                <DetailRow label="Painos" value={bookDetails.edition} />
                <DetailRow label="Kustantaja" value={bookDetails.publisher} />
                <DetailRow
                  label="Tuotteen mitat"
                  value={bookDetails.dimensions}
                />
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {bookDetails.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookShowcase;
