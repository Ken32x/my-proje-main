import React from "react";
import ScrollableCards from "@/components/ScrollableCards";
import InfoSection from "@/components/InfoSection";
import Topbar from "@/components/Topbar";
import Footer from "@/components/footer";




export default function Home() {
  const data = [
    { id: 1, title: "Kart 1", image: "/e-1.jpg" },
    { id: 2, title: "Kart 2", image: "/e-2.jpg" },
    { id: 3, title: "Kart 3", image: "/e-3.jpg" },
    { id: 4, title: "Kart 4", image: "/e-4.jpg" },
    { id: 5, title: "Kart 5", image: "/e-5.jpg" },
  ];
  

  return (
    <>
      <Topbar />
      <main style={{ padding: "40px", backgroundColor: "#fafafa", minHeight: "100vh" }}>
        {/* Resim Kartları Bölümü */}
        <section style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2>Resimler</h2>
          <ScrollableCards data={data} />
        </section>

        {/* Bilgilendirme Alanı */}
        <InfoSection />
        <Footer />
        
        
       
      </main>
    </>
  );
}
