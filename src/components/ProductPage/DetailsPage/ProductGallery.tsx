"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  images: string[];
}

export default function ProductGallery({ images }: Props) {
  const [active, setActive] = useState(images[0]);

  return (
    <div className="space-y-4 ">
      <div className="border rounded overflow-hidden max-h-[400px] ">
        <Image width={200} height={200} src={active} alt="Main Image" className="w-full object-cover max-h-[400px]" />
      </div>

      <div className="flex space-x-2">
        {images.map((img) => (
          <Image
            height={100}
            width={100}
            key={img}
            src={img}
            alt="Thumbnail"
            className={`w-16 h-16 object-cover border-2 cursor-pointer rounded ${img === active ? "border-blue-500" : "border-transparent"
              }`}
            onClick={() => setActive(img)}
          />
        ))}
      </div>
    </div>
  );
}
