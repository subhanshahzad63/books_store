/* eslint-disable @typescript-eslint/no-explicit-any */
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { getBooksAction } from "@/lib/actions/product.action";
import BookSearch from "./booksearch";
import { Book } from "@/types";

const Page = async ({}) => {
  const [books] = await Promise.all([getBooksAction()]);

  return (
    <div className="w-full min-h-screen h-fit mt-[160px] pt-16 ">
      <MaxWidthWrapper>
        <BookSearch books={books as Book[]} />
      </MaxWidthWrapper>

      <MaxWidthWrapper className="my-8">
        <div
          className="w-full min-h-[525px] h-fit p-8 rounded-2xl relative grid grid-cols-1 md:grid-cols-2"
          style={{
            backgroundImage: "url('/books-lib.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className=" absolute inset-0 rounded-2xl bg-black/55 z-[1]" />
          <div className="w-full h-full flex  flex-col z-[2] gap-y-4">
            <h2 className="text-white text-[64px] playfair-display">
              Salpakirja Oy
            </h2>

            <p className="text-white font-bold text-md my-2">
              Salpakirja Oy on kirjakauppa ja antikvariaatti, jonka kaikki
              tuotteet löytyvät myös verkkokaupoista www.salpakirja.net ja
              www.antikvaari.fi. Salpakirjan  Kirjaspotti -nimellä toimivat
              liikkeet löydät Kotkasta ja Haminasta.
            </p>
            <span className="text-white font-bold text-md my-2">
              Vuoden 2024 messukalenteri pitää sisällään noin 150 myyntipäivää,
              tapahtu mamyynnin aikataulun löydät Messukalenteri välilehdeltä
              tästä.
            </span>
            <p className="text-white font-bold text-md my-2">
              Uusien kirjojen lisäksi löydät liikkeestämme, myös hyväkuntoiset
              käytetyt kirjat. Antikvariaatti Salpakirjan laajin valikoima
              löytyy Kirjaspotin Haminan liikkeestä. Antikvariaatti Salpakirjan
              valikoimaa on esillä vuosittain myös Helsingin –, Jyväskylän ja
              Turun kirjamessuilla sekä muutamissa pienemmissä tapahtumissa.
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;
