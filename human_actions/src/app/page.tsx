import Header from "@/components/Header";
import Hero from "@/components/Hero";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-b from-black to-blue-900">
     <Header/>
     <Hero/>
    </main>
  );
}
