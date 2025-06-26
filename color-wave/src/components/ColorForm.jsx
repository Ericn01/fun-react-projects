export const ColorForm = ( {updateField, formData} ) => {
    return (
    <form>
        <input
            type="range"
            value={formData.granularity}
            min={1}
            max={10}
            onChange={(e) => updateField('granularity', Number(e.target.value))}
        />
        <input
            type="range"
            value={formData.uniformity}
            min={1}
            max={100}
            step={5}
            onChange={(e) => updateField('uniformity', Number(e.target.value))}
        />
        <input
            type="checkbox"
            checked={formData.waveEffect}
            onChange={(e) => updateField('waveEffect', e.target.checked)}
        />
    </form>
  );
}
