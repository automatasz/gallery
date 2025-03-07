import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="font-[family-name:var(--font-geist-sans)]" id="top">
      <div className="absolute inset-0 z-0 h-[70vh] bg-black opacity-50">
        <Image
          className="object-cover"
          src="/images/hero.png"
          alt="Green-haired woman in animation style"
          priority
          fill
          sizes="100vw"
        />
      </div>
      <section className="relative z-10 mx-auto mt-[56vh] pt-24 px-2 prose md:prose-lg lg:prose-xl">
        <div className="rounded-2xl rounded-b-none bg-base-300 md:mx-4 p-8">
          <h1 className="text-3xl font-bold">About</h1>
          <p>My name is Matas. I am a JavaScript developer from Lithuania. Specialist in front-end development. I specialize in Next.js (React) and Typescript, but also have experience with Nuxt (Vue) and Astro. As lurking in the artificial intelligence world is my hobby I was able to also get my hands on and help with a chatbot project :).</p>
          <p>This website is a side project of mine. It has a collection of AI-generated images. Images are generated using Stable Diffusion AI models. But also some of my photography portfolio. All images on the website are created or captured by me.</p>
        </div>
      </section>
      
    </main>
  );
}
