import { useEffect, useState } from 'react'
import './App.css'
import { ColorForm } from './components/ColorForm.jsx';

function App() {
  const [formData, setFormData] = useState({
    granularity: 1,
    uniformity: 1, 
    waveEffect: false
  });

  useEffect( () => {
    const savedData = localStorage.getItem("formData");
    if (savedData){
      setFormData(JSON.parse(savedData))
    }
  }, []);

  useEffect( () => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData])

  const updateField = (field, value) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  return (
    <main className='bg-black m-0 p-0'>
      <ColorForm updateField={updateField} formData={formData}/>

    </main>
  )
}

export default App
