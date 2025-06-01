import React, { useEffect } from "react";
import ScrollableCards from "@/components/ScrollableCards";
import InfoSection from "@/components/InfoSection";
import Topbar from "@/components/Topbar";
import Footer from "@/components/footer";
import HizmetKonumSlider from "@/components/HizmetKonumSlider";
import BackendMessage from "@/components/BackendMessage";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const data = [
    { id: 1, image: "/e-1.jpg" },
    { id: 2, image: "/e-2.jpg" },
    { id: 3, image: "/e-3.jpg" },
    { id: 4, image: "/e-4.jpg" },
    { id: 5, image: "/e-5.jpg" },
  ];

  return (
    <>
      <Topbar />
      <main style={{ padding: "40px", backgroundColor: "#fafafa", minHeight: "100vh" }}>
        {/* Resim Kartları Bölümü */}
        <section style={{ textAlign: "center", marginBottom: "40px" }}>
          <ScrollableCards data={data} />
        </section>

        {/* Bilgilendirme Alanı */}
        <InfoSection />

        {/* Backend'den Gelen Mesaj */}
        <BackendMessage />

        {/* Slider */}
        <HizmetKonumSlider />

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
