import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LetterPage {
  chapter: string;
  title: string;
  paragraphs: string[];
}

const letterPages: LetterPage[] = [
  {
    chapter: 'Primera página',
    title: 'Para Nay',
    paragraphs: [
      'Quise escribirte estas líneas con calma, no para pedirte nada ni para cambiar lo que haya cambiado, sino porque hay cosas que se entienden mejor cuando se dicen con sinceridad.',
      'Sé que ya no hablamos como antes y que el tiempo puede llevarnos por caminos distintos. Aun así, sigues teniendo un lugar especial en mi memoria y en mi corazón.',
    ],
  },
  {
    chapter: 'Segunda página',
    title: 'Lo que no siempre sé decir',
    paragraphs: [
      'Muchas veces mis acciones no han sabido reflejar lo que pienso o siento. Mi timidez y mi forma introvertida de ser me han dificultado acercarme, encontrar las palabras correctas o enfrentar conversaciones que para mí significan mucho.',
      'No lo digo como una excusa. Es algo que intento comprender y mejorar, especialmente con las personas importantes para mí. Y tú eres una de ellas.',
    ],
  },
  {
    chapter: 'Tercera página',
    title: 'Un intento pendiente',
    paragraphs: [
      'Durante las fiestas de agosto reuní valor para intentar acercarme. Había pensado en ir al templo para encontrarte, porque sabía que ese día trabajabas. Quería hacerlo de una manera sencilla, pero sincera.',
      'Sin embargo, ese plan cambió de forma inesperada y no pude hacerlo como lo había imaginado.',
    ],
  },
  {
    chapter: 'Cuarta página',
    title: 'Un momento difícil',
    paragraphs: [
      'Ese mismo día mi abuelo sufrió una emergencia médica. Tuvimos que llevarlo de urgencia al hospital y fueron días de incertidumbre, acompañamiento y turnos familiares para estar cerca de él.',
      'Todo lo que había pensado quedó en pausa. No te lo cuento para justificarme, sino porque quería que supieras por qué aquel intento no llegó a ocurrir.',
    ],
  },
  {
    chapter: 'Quinta página',
    title: 'Verte avanzar',
    paragraphs: [
      'A pesar del tiempo y de la distancia, he podido saber un poco de ti por lo que compartes. Me alegra verte avanzar, vivir experiencias y construir tus propios objetivos.',
      'De verdad deseo que sigas llegando lejos. Me alegra saber que encuentras motivos para sonreír y que haces cosas que te hacen bien.',
    ],
  },
  {
    chapter: 'Sexta página',
    title: 'La intención de esta carta',
    paragraphs: [
      'Tal vez me perdí muchas cosas desde la última vez que hablamos. Por eso quise escribirte: para que puedas entender, aunque sea un poco, que mi intención de acercarme no nace de la indiferencia ni de algo momentáneo.',
      'No sé si este mensaje llega en el momento correcto. Tampoco pretendo poner sobre ti la responsabilidad de responder de una forma determinada. Solo quería ser honesto contigo.',
    ],
  },
  {
    chapter: 'Séptima página',
    title: 'Algo que quisiera cuidar',
    paragraphs: [
      'No quisiera perder por completo el vínculo que alguna vez tuvimos. Entiendo que las personas cambian, que las etapas terminan y que no todo puede volver a ser como antes.',
      'Pero incluso si las cosas son distintas, me gustaría que quedara espacio para el respeto, los buenos recuerdos y la posibilidad de saber, de vez en cuando, cómo estás.',
    ],
  },
  {
    chapter: 'Última página',
    title: 'Con aprecio',
    paragraphs: [
      'Si nuestra relación nunca vuelve a ser como antes, lo entenderé. Aun así, seguiré deseándote lo mejor y alegrándome por cada paso que des, por cada meta que cumplas y por todo lo bueno que llegue a tu vida.',
      'Gracias por tomar el tiempo de leerme. Esta carta no busca exigir nada; solo dejarte una verdad dicha con respeto y con cariño.',
    ],
  },
];

interface Spark {
  id: number;
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
}

function MagicSparks() {
  const sparks = useMemo<Spark[]>(
    () => Array.from({ length: 18 }, (_, id) => ({
      id,
      left: `${6 + Math.random() * 88}%`,
      top: `${8 + Math.random() * 80}%`,
      size: 2 + Math.random() * 3,
      duration: 2.2 + Math.random() * 2.6,
      delay: Math.random() * 2.5,
    })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {sparks.map((spark) => (
        <motion.span
          key={spark.id}
          className="absolute rounded-full bg-[#f8dc82] shadow-[0_0_10px_rgba(255,220,126,0.95)]"
          style={{
            left: spark.left,
            top: spark.top,
            width: spark.size,
            height: spark.size,
          }}
          animate={{
            opacity: [0, 0.95, 0.25, 0],
            scale: [0.35, 1.25, 0.7, 0.35],
            y: [0, -14, -24],
          }}
          transition={{
            duration: spark.duration,
            delay: spark.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export function MessageModal({ isOpen, onClose }: MessageModalProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === letterPages.length - 1;
  const currentLetterPage = letterPages[currentPage];

  const handleClose = () => {
    setCurrentPage(0);
    onClose();
  };

  const goNext = () => {
    if (!isLastPage) setCurrentPage((page) => page + 1);
  };

  const goPrevious = () => {
    if (!isFirstPage) setCurrentPage((page) => page - 1);
  };

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose();
      if (event.key === 'ArrowLeft' && !isFirstPage) goPrevious();
      if (event.key === 'ArrowRight' && !isLastPage) goNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isFirstPage, isLastPage]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#090b12]/80 px-2 py-4 backdrop-blur-md sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="letter-heading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="pointer-events-none fixed -left-24 top-8 h-72 w-72 rounded-full bg-amber-300/15 blur-3xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          />
          <motion.div
            className="pointer-events-none fixed -bottom-16 -right-16 h-80 w-80 rounded-full bg-[#6851b8]/20 blur-3xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          />

          <motion.section
            className="relative my-auto flex w-full max-w-[280px] flex-col overflow-hidden rounded-2xl border border-[#d8be77]/70 bg-[#fffaf0] shadow-[0_20px_70px_rgba(0,0,0,0.5)] sm:max-w-xl sm:rounded-3xl"
            onClick={(event) => event.stopPropagation()}
            initial={{ y: 20, scale: 0.97 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 20, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 280, damping: 25 }}
          >
            <MagicSparks />
            <div className="pointer-events-none absolute inset-0 opacity-50" style={{ backgroundImage: 'radial-gradient(rgba(118, 85, 34, 0.15) 0.65px, transparent 0.65px)', backgroundSize: '7px 7px' }} />
            <div className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#694b1d] via-[#d8b45f] to-[#694b1d]" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-[#694b1d] via-[#d8b45f] to-[#694b1d]" />

            <header className="relative z-10 flex items-center justify-between border-b border-[#dac797]/70 bg-[#fffdf8]/80 px-5 py-3.5 backdrop-blur-sm sm:px-7 sm:py-4">
              <div>
                <p className="font-serif text-lg tracking-wide text-[#503916] sm:text-xl">Una carta para Nay</p>
                <p className="mt-0.5 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-[#96733a]">Con respeto y sinceridad</p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Cerrar carta"
                className="grid h-8 w-8 place-items-center rounded-full border border-[#d8c18e] text-base text-[#75572a] transition hover:bg-[#f3e8cf] hover:text-[#392811] focus:outline-none focus:ring-2 focus:ring-[#a98036]"
              >
                <span aria-hidden="true">×</span>
              </button>
            </header>

            <main className="relative z-10 px-5 py-6 sm:px-10 sm:py-8">
              <AnimatePresence mode="wait">
                <motion.article
                  key={currentPage}
                  initial={{ opacity: 0, x: 14, filter: 'blur(2px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -14, filter: 'blur(2px)' }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  <p className="text-center text-[0.6rem] font-medium uppercase tracking-[0.25em] text-[#a27b39]">
                    {currentLetterPage.chapter}
                  </p>
                  <div className="mx-auto mt-3 h-px w-12 bg-[#c69b46]" />

                  <h2 id="letter-heading" className="mt-4 text-center font-serif text-3xl leading-tight text-[#35240f] sm:mt-5 sm:text-4xl">
                    {currentLetterPage.title}
                  </h2>

                  <div className="mt-6 space-y-4 text-[0.98rem] leading-7 text-[#493a26] sm:mt-7 sm:text-[1.05rem] sm:leading-8">
                    {currentLetterPage.paragraphs.map((paragraph, index) => (
                      <p
                        key={paragraph}
                        className={index === 0 ? 'first-letter:float-left first-letter:mr-1.5 first-letter:font-serif first-letter:text-4xl first-letter:leading-[0.8] first-letter:text-[#a97d32] sm:first-letter:text-5xl' : ''}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {isLastPage && (
                    <motion.p
                      className="mt-7 text-right font-serif text-lg italic text-[#755625]"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Con aprecio.
                    </motion.p>
                  )}
                </motion.article>
              </AnimatePresence>
            </main>

            <footer className="relative z-10 border-t border-[#dac797]/70 bg-[#fffdf8]/85 px-5 py-3.5 backdrop-blur-sm sm:px-7 sm:py-4">
              <div className="mb-3 flex items-center justify-between gap-4">
                <p className="text-[0.7rem] text-[#846a3d]">Página {currentPage + 1} de {letterPages.length}</p>
                <div className="flex items-center justify-end gap-1" aria-label="Progreso de lectura">
                  {letterPages.map((page, index) => (
                    <button
                      key={page.title}
                      type="button"
                      onClick={() => setCurrentPage(index)}
                      aria-label={`Ir a ${page.chapter.toLowerCase()}`}
                      className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#a98036] ${index === currentPage ? 'w-6 bg-[#8d6424]' : 'w-1.5 bg-[#dfcfa8] hover:bg-[#ba944d]'}`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <motion.button
                  type="button"
                  onClick={goPrevious}
                  disabled={isFirstPage}
                  whileTap={isFirstPage ? undefined : { scale: 0.98 }}
                  className="rounded-lg border border-[#cdbb90] px-3.5 py-2 text-xs font-medium text-[#5e4826] transition hover:bg-[#f5ecd6] disabled:cursor-not-allowed disabled:opacity-35 sm:px-4 sm:text-sm"
                >
                  Anterior
                </motion.button>

                {isLastPage ? (
                  <motion.button
                    type="button"
                    onClick={handleClose}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-lg bg-[#7f5b24] px-4 py-2 text-xs font-medium text-[#fffdf7] shadow-sm transition hover:bg-[#654518] sm:px-5 sm:text-sm"
                  >
                    Cerrar carta
                  </motion.button>
                ) : (
                  <motion.button
                    type="button"
                    onClick={goNext}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-lg bg-[#7f5b24] px-4 py-2 text-xs font-medium text-[#fffdf7] shadow-sm transition hover:bg-[#654518] sm:px-5 sm:text-sm"
                  >
                    Continuar
                  </motion.button>
                )}
              </div>
            </footer>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}