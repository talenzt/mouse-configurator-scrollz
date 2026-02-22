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

  // Detectamos si es móvil para ajustar la cámara inicialmente
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="w-screen h-screen bg-[#050505] text-white font-sans overflow-hidden flex flex-col md:block">
      
      {/* Navbar: Ajustada para no estorbar en pantallas pequeñas */}
      <nav className="absolute top-0 w-full p-4 md:p-6 flex justify-between items-center z-20 backdrop-blur-md bg-black/10">
        <div className="flex flex-col">
          <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-blue-500 font-bold underline underline-offset-8 decoration-blue-500/30">Proyecto Tesis</span>
          <h1 className="text-lg md:text-xl font-light tracking-tighter mt-1 md:mt-2 italic">SCROLLZ <span className="font-bold text-white not-italic">Estudio</span></h1>
        </div>
      </nav>

      {/* Escena 3D: Ocupa todo el fondo */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          shadows 
          // Ajuste de cámara: En móvil sube el objetivo (y: 1) para que el mouse no quede tapado por el menú
          camera={{ 
            position: [0, isMobile ? 1.2 : 0.5, 5], 
            fov: isMobile ? 45 : 35 
          }}
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
            // En móvil evitamos que el usuario haga pan (mover con 2 dedos) para no romper la UX
            enablePan={!isMobile}
          />

          <Suspense fallback={null}>
            <Model />
            <ContactShadows position={[0, -0.01, 0]} opacity={0.1} scale={8} blur={4} />
          </Suspense>
        </Canvas>
      </div>

      {/* Panel de Configuración Responsivo */}
      {/* Móvil: Abajo, 45% de altura | Escritorio: Lateral derecho fijo */}
      <div className="absolute bottom-0 md:right-6 md:top-24 md:bottom-6 w-full md:w-80 h-[45vh] md:h-auto bg-black/60 md:bg-black/40 backdrop-blur-2xl border-t md:border border-white/10 rounded-t-3xl md:rounded-3xl p-6 z-10 flex flex-col shadow-2xl overflow-y-auto no-scrollbar transition-all duration-500">
        
        <h2 className="text-[10px] md:text-xs font-semibold mb-4 md:mb-6 border-b border-white/10 pb-4 tracking-widest uppercase text-gray-400">Atelier de Diseño</h2>
        
        <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
          {['carcasa', 'base', 'detalles'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 md:px-4 py-1.5 rounded-full text-[8px] md:text-[9px] uppercase tracking-[0.2em] transition-all ${activeTab === tab ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/5 text-gray-500 hover:bg-white/10'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-6 md:space-y-8 flex-grow">
          {activeTab === 'carcasa' && (
            <section className="animate-in fade-in slide-in-from-bottom-2 md:slide-in-from-right-2 duration-300">
              <label className="text-[8px] md:text-[9px] uppercase tracking-widest text-gray-500 mb-3 md:mb-4 block font-bold italic">Acabado Mate Superior</label>
              <HexColorPicker color={carcasaSuperiorColor} onChange={setCarcasaSuperiorColor} className="!w-full !h-32 md:!h-40" />
            </section>
          )}
          {activeTab === 'base' && (
            <section className="animate-in fade-in slide-in-from-bottom-2 md:slide-in-from-right-2 duration-300">
              <label className="text-[8px] md:text-[9px] uppercase tracking-widest text-gray-500 mb-3 md:mb-4 block font-bold italic">Base del Chasis</label>
              <HexColorPicker color={carcasaBaseColor} onChange={setCarcasaBaseColor} className="!w-full !h-32 md:!h-40" />
            </section>
          )}
          {activeTab === 'detalles' && (
            <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-2 md:slide-in-from-right-2 duration-300">
              <section>
                <label className="text-[8px] md:text-[9px] uppercase tracking-widest text-gray-500 mb-2 block font-bold italic">Rueda Táctica</label>
                <HexColorPicker color={ruedaColor} onChange={setRuedaColor} className="!w-full !h-24 md:!h-32" />
              </section>
              <section>
                <label className="text-[8px] md:text-[9px] uppercase tracking-widest text-gray-500 mb-2 block font-bold italic">Accionadores Laterales</label>
                <HexColorPicker color={botonesColor} onChange={setBotonesColor} className="!w-full !h-24 md:!h-32" />
              </section>
            </div>
          )}
        </div>

        {/* Botones de acción: Se mantienen al final del panel */}
        <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-white/10 space-y-3">
          <div className="flex gap-2">
            <button onClick={() => controlsRef.current?.reset()} className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-[8px] md:text-[9px] uppercase tracking-widest py-2 rounded-lg">Reset</button>
            <button onClick={descargarCaptura} className="flex-1 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 text-blue-400 text-[8px] md:text-[9px] uppercase tracking-widest py-2 rounded-lg">PNG</button>
          </div>
          <button className="w-full mt-1 bg-white text-black font-bold py-2 md:py-3 rounded-xl text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
            Enviar a Producción
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;