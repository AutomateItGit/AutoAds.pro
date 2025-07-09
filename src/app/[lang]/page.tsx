import { getDictionary } from "@/lib/dictonnaries";

export default async function Home({params} : {params : Promise<{lang : "fr" | "en"}>}) {
  const {lang} = await params;
  const dictionary = await getDictionary(lang);

  return (
    <div>
      <h1>{dictionary.home.hello}</h1>
    </div>
  );
}
