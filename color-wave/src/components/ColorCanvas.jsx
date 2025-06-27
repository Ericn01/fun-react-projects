import { useEffect, useRef, useState } from "react";
import ColorGenerator from "../ColorGenerator.js";
export const ColorCanvas = ({formData}) => {
    const canvasRef = useRef(null);

    const [colorGenerator, setColorGenerator] = useState(new ColorGenerator(formData.uniformity));

    const generateRandomColor = () => {

    }

    useEffect( () => {
        if (canvasRef.current){
            const canvas = canvasRef.current;
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;

            console.log(`Width:${canvasWidth}, Height: ${canvasHeight}`)
        }
    }, []);
    return (
        <section className="flex justify-center align-middle w-2xl border-2 border-amber-100 drop-shadow-lg">
            <canvas ref={canvasRef} className="w-[100%] "> {/* Cool stuff happens here */}</canvas>
        </section>
    )
}