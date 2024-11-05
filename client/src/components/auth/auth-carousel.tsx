import "react-alice-carousel/lib/alice-carousel.css";
import "@/components/auth/style.css";

import Image1 from "@/assets/login/1.jpg";
import Image2 from "@/assets/login/2.jpg";
import Image3 from "@/assets/login/3.jpg";
import Image4 from "@/assets/login/4.jpg";
import Image5 from "@/assets/login/5.jpg";

import { MoveUpRight, ScanEye } from "lucide-react";
import AliceCarousel from "react-alice-carousel";

const AuthCarousel = () => {
  const items = [
    <div
      className="item w-full h-full overflow-hidden rounded-lg"
      data-value="1"
    >
      <img src={Image1} alt="" />
      <div className="absolute top-4 left-4 z-10 py-1.5 px-2 rounded-lg bg-white">
        <ScanEye strokeWidth="3" />
      </div>
      <div className="absolute bottom-10 left-4">
        <div className="flex flex-col items-start gap-4">
          <button className="py-2 px-4 bg-slate-200/60 flex items-center gap-2 rounded-full">
            <span>abc.test.com</span>
            <MoveUpRight strokeWidth={3} size={14} />
          </button>
          <div className="text-white text-4xl text-left font-playfair font-semibold line-clamp-4">
            "The 66chat's flexibility is tryly renarkable. It effortlessly
            adapts to awide range of research methodologies and study designs."
          </div>
          <div className="text-white text-lg">
            <span>PiKayQi Nguyen</span>
            <span> - </span>
            <span>Content Creator</span>
          </div>
        </div>
      </div>
    </div>,
    <div
      className="item w-full h-full overflow-hidden rounded-lg"
      data-value="2"
    >
      <img src={Image2} alt="" />
      <div className="absolute top-4 left-4 z-10 py-1.5 px-2 rounded-lg bg-white">
        <ScanEye strokeWidth="3" />
      </div>
      <div className="absolute bottom-10 left-4">
        <div className="flex flex-col items-start gap-4">
          <button className="py-2 px-4 bg-slate-200/60 flex items-center gap-2 rounded-full">
            <span>abc.test.com</span>
            <MoveUpRight strokeWidth={3} size={14} />
          </button>
          <div className="text-white text-4xl text-left font-playfair font-semibold line-clamp-4">
            "The 66chat's flexibility is tryly renarkable. It effortlessly
            adapts to awide range of research methodologies and study designs."
          </div>
          <div className="text-white text-lg">
            <span>PiKayQi Nguyen</span>
            <span> - </span>
            <span>Content Creator</span>
          </div>
        </div>
      </div>
    </div>,
    <div
      className="item w-full h-full overflow-hidden rounded-lg"
      data-value="3"
    >
      <img src={Image3} alt="" />
      <div className="absolute top-4 left-4 z-10 py-1.5 px-2 rounded-lg bg-white">
        <ScanEye strokeWidth="3" />
      </div>
      <div className="absolute bottom-10 left-4">
        <div className="flex flex-col items-start gap-4">
          <button className="py-2 px-4 bg-slate-200/60 flex items-center gap-2 rounded-full">
            <span>abc.test.com</span>
            <MoveUpRight strokeWidth={3} size={14} />
          </button>
          <div className="text-white text-4xl text-left font-playfair font-semibold line-clamp-4">
            "The 66chat's flexibility is tryly renarkable. It effortlessly
            adapts to awide range of research methodologies and study designs."
          </div>
          <div className="text-white text-lg">
            <span>PiKayQi Nguyen</span>
            <span> - </span>
            <span>Content Creator</span>
          </div>
        </div>
      </div>
    </div>,
    <div
      className="item w-full h-full overflow-hidden rounded-lg"
      data-value="4"
    >
      <img src={Image4} alt="" />
      <div className="absolute top-4 left-4 z-10 py-1.5 px-2 rounded-lg bg-white">
        <ScanEye strokeWidth="3" />
      </div>
      <div className="absolute bottom-10 left-4">
        <div className="flex flex-col items-start gap-4">
          <button className="py-2 px-4 bg-slate-200/60 flex items-center gap-2 rounded-full">
            <span>abc.test.com</span>
            <MoveUpRight strokeWidth={3} size={14} />
          </button>
          <div className="text-white text-4xl text-left font-playfair font-semibold line-clamp-4">
            "The 66chat's flexibility is tryly renarkable. It effortlessly
            adapts to awide range of research methodologies and study designs."
          </div>
          <div className="text-white text-lg">
            <span>PiKayQi Nguyen</span>
            <span> - </span>
            <span>Content Creator</span>
          </div>
        </div>
      </div>
    </div>,
    <div
      className="item w-full h-full overflow-hidden rounded-lg"
      data-value="5"
    >
      <img src={Image5} alt="" />
      <div className="absolute top-4 left-4 z-10 py-1.5 px-2 rounded-lg bg-white">
        <ScanEye strokeWidth="3" />
      </div>
      <div className="absolute bottom-10 left-4">
        <div className="flex flex-col items-start gap-4">
          <button className="py-2 px-4 bg-slate-200/60 flex items-center gap-2 rounded-full">
            <span>abc.test.com</span>
            <MoveUpRight strokeWidth={3} size={14} />
          </button>
          <div className="text-white text-4xl text-left font-playfair font-semibold line-clamp-4">
            "The 66chat's flexibility is tryly renarkable. It effortlessly
            adapts to awide range of research methodologies and study designs."
          </div>
          <div className="text-white text-lg">
            <span>PiKayQi Nguyen</span>
            <span> - </span>
            <span>Content Creator</span>
          </div>
        </div>
      </div>
    </div>,
  ];

  return (
    <AliceCarousel
      autoPlay
      autoPlayControls
      autoPlayStrategy="none"
      autoPlayInterval={3000}
      animationType="fadeout"
      animationDuration={800}
      disableButtonsControls
      infinite
      items={items}
      mouseTracking={false}
      touchTracking={false}
    />
  );
};

export default AuthCarousel;
