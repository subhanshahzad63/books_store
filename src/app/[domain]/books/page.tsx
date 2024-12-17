import { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import BookSearch from "./booksearch";
import {
  findBooks,
  // getAllGroups,
  // getAllLanguages,
} from "@/lib/actions/product.action";
import getVendor from "@/lib/getVendor";

interface SearchParams {
  query?: string;
  language?: string;
  productGroup?: string;
  author?: string;
  page?: string;
}

// Loading component for Suspense
function BookSearchSkeleton() {
  return (
    <div className="w-full min-h-screen animate-pulse">
      <div className="bg-gray-200 h-16 w-full mb-4"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-200 h-32 rounded-lg"></div>
        ))}
      </div>
    </div>
  );
}

async function BookSearchContent({
  query,
  language,
  productGroup,
  author,
  page = "1",
}: {
  query?: string;
  language?: string;
  productGroup?: string;
  author?: string;
  page?: string;
}) {
  noStore(); // Disable caching for dynamic content

  const pageNumber = parseInt(page, 10) || 1;

  const [vendor, { books: filteredBooks, total, totalPages }] =
    await Promise.all([
      getVendor(),
      findBooks({
        title: query,
        language: language,
        productGroup: productGroup,
        author: author,
        page: pageNumber,
        limit: 30, // You can adjust this limit as needed
      }),
    ]);

  return (
    <BookSearch
      filteredBooks={filteredBooks}
      vendor={vendor}
      languages={[]}
      groups={[]}
      query={query ?? ""}
      productGroup={productGroup ?? ""}
      language={language ?? ""}
      total={total}
      totalPages={totalPages}
      currentPage={pageNumber}
    />
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { query, language, productGroup, author, page } = await searchParams;

  return (
    <div className="w-full min-h-screen h-fit mt-[160px] pt-16">
      <MaxWidthWrapper>
        <Suspense fallback={<BookSearchSkeleton />}>
          <BookSearchContent
            query={query}
            language={language}
            productGroup={productGroup}
            author={author}
            page={page}
          />
        </Suspense>
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
          <div className="absolute inset-0 rounded-2xl bg-black/55 z-[1]" />
          <div className="w-full h-full flex flex-col z-[2] gap-y-4">
            <h2 className="text-white text-[64px] playfair-display">
              Salpakirja Oy
            </h2>
            <p className="text-white font-bold text-md my-2">
              Salpakirja Oy on kirjakauppa ja antikvariaatti, jonka kaikki
              tuotteet löytyvät myös verkkokaupoista www.salpakirja.net ja
              www.antikvaari.fi. Salpakirjan Kirjaspotti -nimellä toimivat
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
}
