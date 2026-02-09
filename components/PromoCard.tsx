import Image from "next/image";

export default function PromoCard() {
  return (
    <div className="relative w-full h-[140px] rounded-2xl overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/promo-coffee.jpg"
        alt="Promo"
        fill
        className="object-cover"
        sizes="(max-width: 430px) 100vw, 400px"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-6">
        <span className="inline-block w-fit bg-[#ED5151] text-white text-[10px] font-bold px-2 py-1 rounded mb-2">
          Promo
        </span>
        <h2 className="text-[28px] font-bold text-white leading-[1.1] tracking-tight">
          Buy one get<br />one FREE
        </h2>
      </div>
    </div>
  );
}
