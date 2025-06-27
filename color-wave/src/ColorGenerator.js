export default class ColorGenerator { 
    constructor(unifomity=50) {
        this.uniformity = unifomity;
        this.colorFamilies = ['red', 'green', 'blue'];
        this.selectedFamilies = this.selectColorFamilies();
    }

    // Select which color families to use based on uniformity
    selectColorFamilies() {
        const { uniformity } = this;
        if (uniformity >= 90) {
            // 90-100%: Single color family
            const singleFamily = this.colorFamilies[Math.floor(Math.random() * 3)];
            return [singleFamily];
        } else if (uniformity >= 40) {
            // 40-89%: Two color families
            const shuffled = [...this.colorFamilies].sort(() => Math.random() - 0.5);
            return shuffled.slice(0, 2);
        } else {
            // 1-39%: All three color families (more random)
            return [...this.colorFamilies];
        }
    }

    // Generate a color within a specific family
    generateColorInFamily(family) {
        let hue, saturation, lightness;
        
        // Define hue ranges for each color family
        switch (family) {
        case 'red':
            // Red: 0-30° and 330-360° on color wheel
            hue = Math.random() < 0.5 
            ? Math.random() * 30 
            : 330 + Math.random() * 30;
            break;
        case 'green':
            // Green: 90-150° on color wheel
            hue = 90 + Math.random() * 60;
            break;
        case 'blue':
            // Blue: 210-270° on color wheel
            hue = 210 + Math.random() * 60;
            break;
        default:
            hue = Math.random() * 360;
        }
        
        // Generate saturation and lightness with some variation
        saturation = 40 + Math.random() * 60; // 40-100%
        lightness = 30 + Math.random() * 40;  // 30-70%
        
        return { hue, saturation, lightness };
    }
    // Used when generating a completely random colour
    generateRandomColor() {
        return {
            hue: Math.random() * 360,
            saturation: 40 + Math.random() * 60, // 40-100%
            lightness: 30 + Math.random() * 40  // 30-70
        }
    };

    generateColor () {
        const { uniformity } = this;

        // With low uniformity (1-10%), we mostly generate a random color
        if (uniformity <= 10) {
            const useRandomColor = Math.random() < (1- uniformity / 100) 
            if(useRandomColor){
                return this.generateRandomColor();
            }
        }

            // Select a family from the available families
        const selectedFamily = this.selectedFamilies[
        Math.floor(Math.random() * this.selectedFamilies.length)
        ];
        
        return this.generateColorInFamily(selectedFamily);
    }
        // Generate multiple colors
    generateColors(count) {
        const colors = [];
        for (let i = 0; i < count; i++) {
            colors.push(this.generateColor());
        }
        return colors;
    }

    // Convert HSL to RGB
    hslToRgb(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;
        
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs((h * 6) % 2 - 1));
        const m = l - c / 2;
        
        let r, g, b;
        
        if (0 <= h && h < 1/6) {
            r = c; g = x; b = 0;
        } else if (1/6 <= h && h < 1/3) {
            r = x; g = c; b = 0;
        } else if (1/3 <= h && h < 1/2) {
            r = 0; g = c; b = x;
        } else if (1/2 <= h && h < 2/3) {
            r = 0; g = x; b = c;
        } else if (2/3 <= h && h < 5/6) {
            r = x; g = 0; b = c;
        } else {
            r = c; g = 0; b = x;
        }
        
        return {
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((b + m) * 255)
        };
    }

    // Convert HSL to hex
    hslToHex(h, s, l) {
        const rgb = this.hslToRgb(h, s, l);
        return `#${rgb.r.toString(16).padStart(2, '0')}${rgb.g.toString(16).padStart(2, '0')}${rgb.b.toString(16).padStart(2, '0')}`;
    }

    // Generate colors with hex values
    generateColorsWithHex(count) {
        return this.generateColors(count).map(color => ({
        ...color,
        hex: this.hslToHex(color.hue, color.saturation, color.lightness)
        }));
    }

    // Update uniformity and recalculate color families
    setUniformity(newUniformity) {
        this.uniformity = newUniformity;
        this.selectedFamilies = this.selectColorFamilies();
    }

    // Get info about current configuration
    getInfo() {
        return {
        uniformity: this.uniformity,
        selectedFamilies: this.selectedFamilies,
        familyCount: this.selectedFamilies.length
        };
    }
}

