import React, {useEffect, useState} from "react";
import "./menuPrincipal.css";

const MenuPrincipal = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        "/promocion4.png",
        "/promocion5.jpg",
        "/promocion6.jpg"
    ];

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const intervalo = setInterval(nextImage, 4000);
        return () => clearInterval(intervalo)
    }, []);

    return (
        <header className="menu-principal">
            <div className="menu-promociones">
                <div className="promociones">
                    <img src={images[currentIndex]} alt={`Promoción ${currentIndex + 1}`}/>
                    <div>
                        <button className="prev" onClick={prevImage}>{"<"}</button>
                        <button className="next" onClick={nextImage}>{">"}</button>
                    </div>
                </div>
            </div>

        </header>
    );
};

export default MenuPrincipal;