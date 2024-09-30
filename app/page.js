import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>This is the home page</h1>
      {console.log(uuidv4())}
    </div>
  );
}
