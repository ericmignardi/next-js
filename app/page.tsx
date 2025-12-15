import Image from "next/image";
import starcasterImg from "@/public/starcaster.jpg";

const HomePage = () => {
  return (
    <div>
      {/* Next.js Image Component - size optimization, visual stability, lazy loading, asset flexibility, blur placeholder, priority loading */}
      <Image
        src={starcasterImg}
        alt="Tom DeLonge Fender Starcaster"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 835px"
        priority // Add for above-the-fold images (disables lazy loading)
        // fill // Fill parent container (use with sizes)
        // placeholder="blur" // Blur while loading, automatic for static
      />
    </div>
  );
};

export default HomePage;
