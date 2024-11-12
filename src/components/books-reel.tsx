import type { FC } from "react";
import Card from "./book-card";

interface ProductReelProps {
  title: string;
  desc?: string;
  books: {
    _id: string;
    nimi: string; // Book title
    tekija: string; // Author name
    hinta: number; // Price
    pvm: { $date: string }; // Date
    kuvat: {
      file_domain: string;
      file_path: string;
      file_md: string;
    }[]; // Image array
  }[];
}

const ProductReel: FC<ProductReelProps> = ({ title, desc, books }) => {
  return (
    <>
      <div className="w-full my-4 h-[50px] flex items-center justify-between gap-x-4">
        <h2 className="text-black text-[40px] playfair-display text-nowrap">
          {title}
        </h2>
        <div className="h-[0.5px] w-full bg-black" />
      </div>

      {desc && (
        <div className="w-full h-fit">
          <p>{desc}</p>
        </div>
      )}

      <div className="w-full h-[30px] flex items-center justify-start md:justify-end">
        <span className="text-2xl">Näytä kaikki</span>
      </div>

      <div className="w-full my-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 min-h-[600px] h-fit gap-4">
        {books.map((item) => {
          const imageUrl = `${item.kuvat[0]?.file_domain}/${item.kuvat[0]?.file_path}/${item.kuvat[0]?.file_md}`;
          return (
            <Card
              id={item._id}
              key={item._id}
              image={imageUrl}
              price={item.hinta.toString()}
              subTitle={item.tekija}
              title={item.nimi}
              date={new Date(item.pvm.$date).toLocaleDateString()}
            />
          );
        })}
      </div>
    </>
  );
};

export default ProductReel;
