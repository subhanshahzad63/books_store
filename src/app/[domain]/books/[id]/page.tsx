import { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";
import BookShowcase from "@/components/book-showcase";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import ProductReel from "@/components/books-reel";
import {
  getBookByIdAction,
  getBooksAction,
} from "@/lib/actions/product.action";

function BookDetailsSkeleton() {
  return (
    <div className="w-full min-h-screen animate-pulse">
      <MaxWidthWrapper className="my-8 h-fit">
        <div className="bg-gray-200 h-[500px] w-full rounded-lg"></div>
      </MaxWidthWrapper>
      <MaxWidthWrapper className="h-fit my-8">
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 w-1/2 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-64 rounded-lg"></div>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

async function BookDetailsContent({ id }: { id: string }) {
  noStore(); // Disable static caching for dynamic content

  const [books, bookData] = await Promise.all([
    getBooksAction(),
    getBookByIdAction({ id }),
  ]);

  return (
    <>
      <MaxWidthWrapper className="my-8 h-fit">
        <BookShowcase book={bookData} />
      </MaxWidthWrapper>

      <MaxWidthWrapper className="h-fit my-8">
        <ProductReel
          books={books}
          title="Tuote-ehdotukset"
          desc="Ehdotukset perustuvat esitetyn tuotteen tekijään, tuoteryhmään tai aiheisiin."
        />
      </MaxWidthWrapper>
    </>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="w-full min-h-screen h-fit mt-[160px] pt-16">
      <Suspense fallback={<BookDetailsSkeleton />}>
        <BookDetailsContent id={id} />
      </Suspense>
    </div>
  );
}
