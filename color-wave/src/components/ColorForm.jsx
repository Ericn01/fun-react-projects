import { FormInputInfo } from "./FormInputInfo";

/**
 * The color form controls the parameters responsible for the rendering of the color canvas. 
 * @param {*} updateField function to update the values of the form.  
 * @param {*} formData the form data parameters
 * @returns 
 */
export const ColorForm = ( {updateField, formData} ) => {
    return (
    <form className="bg-white p-6 rounded-lg space-y-6 max-w-md mx-auto">
        <div className="space-y-2">
        <div className="flex items-center gap-2">
            <label htmlFor="granularity" className="text-sm font-medium text-gray-700">
                Granularity
            </label>
            <FormInputInfo tooltip="Controls the level of detail in the color pattern" />
        </div>
        <div className="space-y-1">
            <input
                type="range"
                name="granularity"
                id="granularity"
                value={formData.granularity}
                min={1}
                max={10}
                onChange={(e) => updateField('granularity', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500">
                <span>1</span>
                <span className="font-bold text-gray-700 ">{formData.granularity}</span>
                <span>10</span>
            </div>
        </div>
    </div>

    <div className="space-y-2">
        <div className="flex items-center gap-2">
            <label htmlFor="uniformity" className="text-sm font-medium text-gray-700">
                Uniformity
            </label>
            <FormInputInfo tooltip="Adjusts how consistent the color distribution appears" />
        </div>
        <div className="space-y-1">
            <input
                type="range"
                name="uniformity"
                id="uniformity"
                value={formData.uniformity}
                min={1}
                max={100}
                step={5}
                onChange={(e) => updateField('uniformity', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500">
                <span>1</span>
                <span className="font-bold text-gray-700">{formData.uniformity}</span>
                <span>100</span>
            </div>
            </div>
        </div>
        <div className="space-y-2">
            <div className="flex items-center gap-2">
            <label htmlFor="waveEffect" className="text-sm font-medium text-gray-700">
                Wave Effect
            </label>
            <FormInputInfo tooltip="Adds a wave-like distortion to the color pattern" />
            </div>
            <div className="flex items-center">
            <input
                name="waveEffect"
                id="waveEffect"
                type="checkbox"
                checked={formData.waveEffect}
                onChange={(e) => updateField('waveEffect', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <span className="ml-2 text-sm text-gray-600">
                {formData.waveEffect ? 'Enabled' : 'Disabled'}
            </span>
            </div>
        </div>
    </form>
  );
}
