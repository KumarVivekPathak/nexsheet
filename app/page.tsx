import Image from "next/image";
import { config } from "../config";

export default async function Home() {

  const res = await fetch("http://localhost:3000/api/users");
  const data = await res.json();
  console.log(data);
  console.log(config.DATABASE_URL);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans ">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        <div>Sign Up</div>
        <div>Sign In</div>
        <div>Welcome to nexsheet</div>
      </main>
    </div>
  );
}
