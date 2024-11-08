import Image from "@/assets/news/1.jpg";

import { Search } from "lucide-react";
import { useEffect } from "react";
import { animatePageIn } from "@/lib/animations";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function NotFoundPage() {
  useEffect(() => {
    animatePageIn();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="w-1/2 mx-auto mt-10 flex flex-col items-center gap-6">
        <h2 className="text-4xl">Oh Page not found.</h2>
        <p className="text-center text-lg font-playfair">
          Sorry. We got lost in the randomness of articles; we can't find the
          page you're looking for. It may have removed or moved. Try something
          else.
        </p>
        <div className="relative w-[450px] h-10 flex items-center">
          <Search className="absolute left-2 z-[1]" size={20} />
          <Input className="absolute w-full bg-white pl-8 pr-28 z-0 text-lg py-6 rounded-2xl" />
          <Button className="absolute right-2 z-[1] bg-foreground-red" >Search</Button>
        </div>
      </div>
      <div className="my-20">
        <h3>Similar content to your search:</h3>
        <div className="grid grid-cols-4 items-stretch gap-8 h-44 mt-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="w-full h-full overflow-hidden relative rounded-3xl">
              <div className="absolute inset-0 z-[1] w-full h-full">
                <img src={Image} alt="" />
              </div>
              <h3 className="w-full absolute left-0 bottom-0 p-2 bg-black/20 text-white z-[2]">
                Football Match
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
