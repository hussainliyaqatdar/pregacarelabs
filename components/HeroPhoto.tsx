import Image from "next/image";

export default function HeroPhoto() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-sm">
      <Image
        src="/images/hero-home-collection.png"
        alt="A phlebotomist in gloves and a mask visits a pregnant woman at home to collect a blood sample, using a professional collection kit with labelled sample tubes and a sharps container."
        width={1536}
        height={1024}
        priority
        className="w-full h-auto block"
      />
    </div>
  );
}
