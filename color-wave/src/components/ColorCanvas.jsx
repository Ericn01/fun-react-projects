import { useEffect, useRef, useState } from "react";
import ColorGenerator from "../ColorGenerator.js";

/**
 * This component is responsible for displaying a random canvas based off the provided form values.
 * @param {*} formData the form parameters that control the display of the ColorCanvas
 * @returns A colored, randomly generated canvas.
 */
export const ColorCanvas = ({formData}) => {
    const canvasRef = useRef(null);

    const [colorGenerator, setColorGenerator] = useState(new ColorGenerator(formData.uniformity));

    // update color generator when uniformity changes
    useEffect( () => {
        colorGenerator.setUniformity(formData.uniformity)
    }, [formData.uniformity, colorGenerator]);

     // Generate and draw colors to canvas
    const drawCanvas = () => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        // Set canvas dimensions
        const canvasWidth = 800;
        const canvasHeight = 600;
        
        // Set actual canvas size (not just CSS size)
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        
        const granularity = formData.granularity;
        
        // Calculate how many rectangles we can fit
        const cols = Math.floor(canvasWidth / granularity);
        const rows = Math.floor(canvasHeight / granularity);
        
        console.log(`Drawing ${cols}x${rows} rectangles of size ${granularity}px`);
        
        // Draw rectangles
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                // Generate a random color
                const colorData = colorGenerator.generateColor();
                const hexColor = colorGenerator.hslToHex(
                    colorData.hue, 
                    colorData.saturation, 
                    colorData.lightness
                );
                
                // Set fill color and draw rectangle
                ctx.fillStyle = hexColor;
                ctx.fillRect(
                    col * granularity, 
                    row * granularity, 
                    granularity, 
                    granularity
                );
            }
        }
    };

    // Initial draw
    useEffect(() => {
        drawCanvas();
    }, []);

    // Redraw when formData changes (granularity or uniformity)
    useEffect(() => {
        drawCanvas();
    }, [formData.granularity, formData.uniformity]);

    // Handle manual regeneration (optional - for a "regenerate" button)
    const regenerateCanvas = () => {
        drawCanvas();
    };


    return (
        <section className="flex flex-col items-center space-y-4 w-full max-w-4xl border-2 border-amber-100 drop-shadow-lg rounded-lg p-4 bg-white">
            <div className="flex justify-between items-center w-full">
                <h2 className="text-lg font-semibold text-gray-700">Color Canvas</h2>
                <button 
                    onClick={regenerateCanvas}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors text-sm font-medium"
                >
                    Regenerate
                </button>
            </div>
            
            <div className="border border-gray-300 rounded-lg overflow-hidden shadow-inner">
                <canvas 
                    ref={canvasRef} 
                    className="block"
                    style={{ 
                        width: '800px', 
                        height: '600px',
                        maxWidth: '100%',
                        height: 'auto'
                    }}
                >
                    Your browser doesn't support canvas
                </canvas>
            </div>
            
            <div className="text-sm text-gray-600 space-y-1">
                <p>Granularity: {formData.granularity}px rectangles</p>
                <p>Uniformity: {formData.uniformity}% ({colorGenerator.getInfo().selectedFamilies.join(', ')})</p>
                <p>Grid: {Math.floor(800 / formData.granularity)} x {Math.floor(600 / formData.granularity)} rectangles</p>
            </div>
        </section>
    );
}