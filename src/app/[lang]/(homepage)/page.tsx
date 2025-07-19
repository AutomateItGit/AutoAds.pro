import Header from "@/components/ui/Header";
import { getDictionary } from "@/lib/dictonnaries";

export default async function Home({params} : {params : Promise<{lang : "fr" | "en"}>}) {
  const {lang} = await params;
  const dictionary = await getDictionary(lang);

  return (
    <div>
      <Header params={params} />
    </div>
  );
}
