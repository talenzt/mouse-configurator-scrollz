import { Suspense, useState, useRef } from 'react'; 
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { HexColorPicker } from "react-colorful";
import { Model } from './MouseModel'; 
import { useConfiguratorStore } from './store/useConfiguratorStore';

function App() {
  const { 
    carcasaSuperiorColor, setCarcasaSuperiorColor,
    carcasaBaseColor, setCarcasaBaseColor,
    botonesColor, setBotonesColor,
    ruedaColor, setRuedaColor 
  } = useConfiguratorStore();

  const [activeTab, setActiveTab] = useState('carcasa');
  const controlsRef = useRef<any>(null);

  const descargarCaptura = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'mi-mouse-scrollz.png';
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  return (
    <div className="w-screen h-screen bg-[#050505] text-white font-sans overflow-hidden">
      <nav className="absolute top-0 w-full p-6 flex justify-between items-center z-20 backdrop-blur-md bg-black/10">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.4em] text-blue-500 font-bold underline underline-offset-8 decoration-blue-500/30">Proyecto Tesis</span>
          <h1 className="text-xl font-light tracking-tighter mt-2 italic">SCROLLZ <span className="font-bold text-white not-italic">Estudio</span></h1>
        </div>
      </nav>

      <div className="absolute inset-0 z-0">
        <Canvas 
          shadows 
          camera={{ position: [0, 0.5, 4.5], fov: 35 }}
          gl={{ preserveDrawingBuffer: true, antialias: true }}
        >
          <ambientLight intensity={1.5} /> 
          <pointLight position={[5, 5, 5]} intensity={1} />
          <Environment preset="city" />
          
          <OrbitControls 
            ref={controlsRef}
            makeDefault 
            enableDamping={true} 
            dampingFactor={0.05} 
            minDistance={3.5}
            maxDistance={8}
          />

          <Suspense fallback={null}>
            <Model />
            <ContactShadows position={[0, -0.01, 0]} opacity={0.1} scale={8} blur={4} />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute right-6 top-24 bottom-6 w-80 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 z-10 flex flex-col shadow-2xl overflow-y-auto no-scrollbar">
        <h2 className="text-xs font-semibold mb-6 border-b border-white/10 pb-4 tracking-widest uppercase text-gray-400">Atelier de Diseño</h2>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {['carcasa', 'base', 'detalles'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-[9px] uppercase tracking-[0.2em] transition-all ${activeTab === tab ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/5 text-gray-500 hover:bg-white/10'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-8 flex-grow">
          {activeTab === 'carcasa' && (
            <section className="animate-in fade-in slide-in-from-right-2 duration-300">
              <label className="text-[9px] uppercase tracking-widest text-gray-500 mb-4 block font-bold italic">Acabado Mate Superior</label>
              <HexColorPicker color={carcasaSuperiorColor} onChange={setCarcasaSuperiorColor} className="!w-full !h-40" />
            </section>
          )}
          {activeTab === 'base' && (
            <section className="animate-in fade-in slide-in-from-right-2 duration-300">
              <label className="text-[9px] uppercase tracking-widest text-gray-500 mb-4 block font-bold italic">Base del Chasis</label>
              <HexColorPicker color={carcasaBaseColor} onChange={setCarcasaBaseColor} className="!w-full !h-40" />
            </section>
          )}
          {activeTab === 'detalles' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-2 duration-300">
              <section>
                <label className="text-[9px] uppercase tracking-widest text-gray-500 mb-4 block font-bold italic">Rueda Táctica</label>
                <HexColorPicker color={ruedaColor} onChange={setRuedaColor} className="!w-full !h-32" />
              </section>
              <section>
                <label className="text-[9px] uppercase tracking-widest text-gray-500 mb-4 block font-bold italic">Accionadores Laterales</label>
                <HexColorPicker color={botonesColor} onChange={setBotonesColor} className="!w-full !h-32" />
              </section>
            </div>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
          <div className="flex gap-2">
            <button onClick={() => controlsRef.current?.reset()} className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-[9px] uppercase tracking-widest py-2 rounded-lg">Reset</button>
            <button onClick={descargarCaptura} className="flex-1 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 text-blue-400 text-[9px] uppercase tracking-widest py-2 rounded-lg">PNG</button>
          </div>
          <button className="w-full mt-2 bg-white text-black font-bold py-3 rounded-xl text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
            Enviar a Producción
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;