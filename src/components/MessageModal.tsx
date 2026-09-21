import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const pages = [
  {
    text: "Se que no hablamos como antes y que muchas cosas quizás cambiaron y muchas otras pasaron, pero algo que nunca puede cambiar en mi es ese espacio que siempre tendrás en mi corazón. Eres y siempre serás esa personita muy special, alguien que nunca olvidaría.",
    emoji: "💙",
  },
  {
    text: "Sé que es algo contradictorio con lo que puedo demostrar, es solo que quizás me impide un poco mi timidez, lo introvertido que me dificulta poder llegar o saber cómo llegar a las personas. Al parecer es por eso mismo que soy introvertido, es que siempre me es más fácil evadir algún problema por más grande o pequeño que sea.",
    emoji: "😔",
  },
  {
    text: "Y bueno, siempre intento mejorar en esa situación, al menos con las personas que realmente me importan, como lo eres tú. Intenté acercarme con todo el valor y demás justo para las fechas de fiestas de agosto, donde quería ir directamente quizás al templo para poder encontrarte, igual porque trabajas ese día normal.",
    emoji: "🙏",
  },
  {
    text: "Pero justo ese día sucedió algo muy inesperado, y fue que mi abuelo, el último que me queda, sufrió como una pre embolia, donde lo encontraron inconsciente en el baño de su casa, lo cual pasó así inconsciente toda la noche y pues lo llevamos de emergencia en ambulancia ese día.",
    emoji: "💔",
  },
  {
    text: "Y como mi mamá es la que siempre está ahí en todo y al ser mi abuelo, estuvimos ahí. Le hicieron una cirugía de emergencia en la madrugada por temas de la fiesta, estuvimos en eso todos esos días de fiesta quedándonos, intercambiando turnos para estar con él, lo cual por ello lo que tenía planeado se me fue todo.",
    emoji: "🏥",
  },
  {
    text: "Pero en fin, gracias a tus estados y cortos pude ver como vas creciendo, todo lo que vas viviendo y que literalmente estás siendo como el vino 🍷. Me alegra un montón, siempre te desearé el éxito, que cada vez llegues mucho más lejos. No sabes como me alegra verte feliz con lo que haces.",
    emoji: "✨",
  },
  {
    text: "Y bueno todo lo demás que me perdí en todo este tiempo desde la última vez que hablamos. Y bueno, con todo esto espero me deje entender un poco, o al menos en parte, mi intención de intentar acercarme un poco o algo hacia tu persona. La verdad no sé si es muy egoísta, o ser sin cara de mi parte, hay muchas cosas que no sé pero sí una, y es como paso igual hace un tiempo, y es que no quisiera perder por completo la relación que alguna vez tuvimos.",
    emoji: "🤲",
  },
  {
    text: "Y si ya nunca vuelve a ser como antes, de igual manera siempre intentaré de seguirte en lo que se pueda para seguir viendo como vas progresando, como vas cumpliendo cada vez más objetivos.",
    emoji: "💙",
  },
];

export function MessageModal({ isOpen, onClose }: MessageModalProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleClose = () => {
    setCurrentPage(0);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
          style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 250, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl sm:rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(10,22,40,0.98), rgba(13,40,71,0.98))',
              border: '1px solid rgba(64,224,208,0.3)',
              boxShadow: '0 0 50px rgba(64,224,208,0.15)',
            }}
          >
            {/* Barra superior */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />

            {/* Header */}
            <div className="text-center pt-5 pb-3 px-5">
              <motion.div
                key={currentPage}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="text-4xl sm:text-5xl mb-2"
              >
                {pages[currentPage].emoji}
              </motion.div>
              <p className="text-cyan-200/40 text-[10px] sm:text-xs uppercase tracking-widest">
                {currentPage + 1} de {pages.length}
              </p>
            </div>

            {/* Paginador puntos */}
            <div className="flex justify-center gap-1.5 pb-3 px-5">
              {pages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    background: i === currentPage ? '#40e0d0' : 'rgba(64,224,208,0.2)',
                    transform: i === currentPage ? 'scale(1.3)' : 'scale(1)',
                  }}
                />
              ))}
            </div>

            {/* Contenido del mensaje */}
            <div className="px-5 sm:px-6 min-h-[160px] sm:min-h-[200px]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentPage}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm sm:text-base leading-relaxed text-cyan-100/85"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {pages[currentPage].text}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Botones de navegación */}
            <div className="flex justify-between items-center px-5 sm:px-6 py-4 sm:py-5">
              <motion.button
                onClick={prevPage}
                disabled={currentPage === 0}
                whileHover={currentPage > 0 ? { scale: 1.05 } : {}}
                whileTap={currentPage > 0 ? { scale: 0.95 } : {}}
                className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all"
                style={{
                  background: currentPage === 0 ? 'rgba(64,224,208,0.05)' : 'rgba(64,224,208,0.1)',
                  border: '1px solid rgba(64,224,208,0.15)',
                  color: currentPage === 0 ? 'rgba(224,247,250,0.3)' : '#e0f7fa',
                  cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
                }}
              >
                ← Anterior
              </motion.button>

              {currentPage === pages.length - 1 ? (
                <motion.button
                  onClick={handleClose}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(64,224,208,0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm"
                  style={{
                    background: 'linear-gradient(135deg, #40e0d0, #20b2aa)',
                    color: '#0a1628',
                  }}
                >
                  Cerrar 💎
                </motion.button>
              ) : (
                <motion.button
                  onClick={nextPage}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(64,224,208,0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm"
                  style={{
                    background: 'linear-gradient(135deg, #40e0d0, #20b2aa)',
                    color: '#0a1628',
                  }}
                >
                  Siguiente →
                </motion.button>
              )}
            </div>

            {/* Botón cerrar */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-cyan-200/40 hover:text-cyan-200 hover:bg-cyan-900/30 transition-all"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
