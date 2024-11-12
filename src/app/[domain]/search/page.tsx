import { getBooksAction } from "@/lib/actions/product.action";
import ClientPage from "./client-page";

const SearchPage = async () => {
  const [books] = await Promise.all([getBooksAction()]);

  if (!books) {
    return (
      <div className="w-full h-screen">
        <h2 className="text-3xl font-bold">there is no item to display</h2>
      </div>
    );
  }

  return <ClientPage books={books} />;
};

export default SearchPage;
