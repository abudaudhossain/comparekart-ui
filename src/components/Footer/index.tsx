// components/Footer.tsx

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#07345d] text-[#b6cfe8] text-sm px-6 py-12">
      <div className="flex flex-col items-center text-center max-w-5xl mx-auto">

        {/* Climate Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 mb-6">
          <Image
            width={100}
            height={100}
            src="/climate-seal-retina.png"
            alt="Climate Neutral Badge"
            className="w-24 h-24"
          />

          <div className="text-white text-left ">
            <h3 className="text-base font-semibold mb-2">Less CO₂. More responsibility.</h3>
            <ul className="space-y-1">
              <li>✔️ Climate neutral company</li>
              <li>✔️ Committed to climate protection</li>
            </ul>
            <a href="#" className="underline text-sm inline-block mt-2 hover:text-blue-200">
              More info
            </a>
          </div>
        </div>

        {/* Footer Links */}
        <div className="space-x-3 mb-4 text-sm">
          <a href="#" className="hover:underline">Privacy</a>
          <span className="text-gray-400">·</span>
          <a href="#" className="hover:underline">Privacy settings</a>
          <span className="text-gray-400">·</span>
          <a href="#" className="hover:underline">About/Terms & Conditions</a>
        </div>

        {/* Legal / Fine Print */}
        <div className="text-xs text-center space-y-2 max-w-4xl">
          <p>
            * All prices are in pound sterling and include VAT. Shipping costs are not included. All prices, rankings, delivery times and shipping costs may be subject to interim changes.
          </p>
          <p>
            Payments via invoice and direct debit are subject to examination by the merchant.
          </p>
          <p>
            We publish user reviews of products on our website. A check as to whether these reviews come from users who have actually used or bought the product in question has not been carried out unless the user review appears alongside the label &apos;Verified Review&apos;. More information can be found on the respective product detail page.

          </p>
          <p>
            *** idealo may earn a commission when we refer customers to our partner shops
          </p>
        </div>
      </div>
    </footer>
  );
}
