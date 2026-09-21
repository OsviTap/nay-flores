import { useEffect, useState } from 'react';
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
      'Quise escribirte estas líneas con calma, no para pedirte nada ni para cambiar lo que haya cambiado, sino porque hay cosas que a veces se entienden mejor cuando se escriben con sinceridad.',
      'Sé que ya no hablamos como antes y que el tiempo puede llevarnos por caminos distintos. Aun así, hay algo que permanece: el lugar especial que tienes en mi memoria y en mi corazón. Eres una persona que no podría olvidar.',
    ],
  },
  {
    chapter: 'Segunda página',
    title: 'Lo que no siempre sé decir',
    paragraphs: [
      'Reconozco que muchas veces mis acciones no han sabido reflejar lo que pienso o siento. Mi timidez y mi forma introvertida de ser me han hecho difícil acercarme, encontrar las palabras correctas o enfrentar conversaciones que para mí significan mucho.',
      'No es una excusa. Es algo que intento comprender y mejorar, especialmente cuando se trata de personas importantes para mí. Y tú eres una de esas personas.',
    ],
  },
  {
    chapter: 'Tercera página',
    title: 'Un intento pendiente',
    paragraphs: [
      'Durante las fiestas de agosto reuní valor para intentar acercarme. Había pensado en ir al templo para poder encontrarte, porque sabía que ese día trabajabas. Quería hacerlo de una manera sencilla, pero sincera.',
      'Sin embargo, ese plan cambió de forma inesperada y no pude hacerlo como lo había imaginado.',
    ],
  },
  {
    chapter: 'Cuarta página',
    title: 'Un momento difícil',
    paragraphs: [
      'Ese mismo día mi abuelo sufrió una emergencia médica. Lo encontramos inconsciente y tuvimos que llevarlo de urgencia al hospital. Fueron días de incertidumbre, acompañamiento y turnos familiares para estar cerca de él.',
      'Todo lo que había pensado quedó en pausa. No te lo cuento para justificarme, sino porque quería que supieras por qué aquel intento no llegó a ocurrir.',
    ],
  },
  {
    chapter: 'Quinta página',
    title: 'Verte avanzar',
    paragraphs: [
      'A pesar del tiempo y de la distancia, he podido saber un poco de ti por lo que compartes. Me alegra verte avanzar, aprender, vivir experiencias y construir tus propios objetivos.',
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

export function MessageModal({ isOpen, onClose }: MessageModalProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === letterPages.length - 1;
  const currentLetterPage = letterPages[currentPage];

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#10100f]/70 p-3 backdrop-blur-md sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="letter-heading"
          onClick={handleClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-amber-300/20 blur-3xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          />
          <motion.div
            className="pointer-events-none absolute -bottom-24 -right-20 h-96 w-96 rounded-full bg-orange-400/15 blur-3xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          />

          <motion.section
            className="relative flex h-[min(760px,calc(100dvh-24px))] w-full max-w-3xl flex-col overflow-hidden rounded-[1.75rem] border border-[#d9c8a2] bg-[#fdf9ef] shadow-[0_24px_100px_rgba(0,0,0,0.45)] sm:h-[min(820px,calc(100dvh-48px))] sm:rounded-[2.25rem]"
            onClick={(event) => event.stopPropagation()}
            initial={{ y: 32, scale: 0.96, rotateX: 2 }}
            animate={{ y: 0, scale: 1, rotateX: 0 }}
            exit={{ y: 32, scale: 0.96, rotateX: 2 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-60" style={{ backgroundImage: 'radial-gradient(rgba(124, 89, 35, 0.16) 0.7px, transparent 0.7px)', backgroundSize: '7px 7px' }} />
            <div className="pointer-events-none absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-[#9f7a35] via-[#d2b46c] to-[#9f7a35]" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-1.5 bg-gradient-to-b from-[#9f7a35] via-[#d2b46c] to-[#9f7a35]" />

            <header className="relative z-10 flex shrink-0 items-center justify-between border-b border-[#cdbb90]/60 bg-[#fffdf7]/80 px-5 py-4 backdrop-blur-sm sm:px-9 sm:py-5">
              <div>
                <p className="font-serif text-xl tracking-wide text-[#5b4422] sm:text-2xl">Una carta para Nay</p>
                <p className="mt-0.5 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-[#9a7a43] sm:text-xs">Con respeto y sinceridad</p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                aria-label="Cerrar carta"
                className="grid h-9 w-9 place-items-center rounded-full border border-[#d4c093] text-lg text-[#775a2e] transition hover:bg-[#f3e8c9] hover:text-[#3d2d17] focus:outline-none focus:ring-2 focus:ring-[#b5904c]"
              >
                <span aria-hidden="true">×</span>
              </button>
            </header>

            <main className="relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-8 sm:px-16 sm:py-12">
              <div className="mx-auto max-w-xl">
                <AnimatePresence mode="wait">
                  <motion.article
                    key={currentPage}
                    initial={{ opacity: 0, x: 18, filter: 'blur(3px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: -18, filter: 'blur(3px)' }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                  >
                    <p className="text-center text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[#a27b39]">
                      {currentLetterPage.chapter}
                    </p>
                    <div className="mx-auto mt-4 h-px w-14 bg-[#c39a4b]" />

                    <h2 id="letter-heading" className="mt-6 text-center font-serif text-3xl leading-tight text-[#382713] sm:mt-7 sm:text-5xl">
                      {currentLetterPage.title}
                    </h2>

                    <div className="mt-8 space-y-5 text-[1.04rem] leading-8 text-[#493a26] sm:mt-10 sm:text-lg sm:leading-9">
                      {currentLetterPage.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="text-pretty first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-5xl first-letter:leading-[0.8] first-letter:text-[#a97d32] sm:first-letter:text-6xl">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {isLastPage && (
                      <motion.p
                        className="mt-10 text-right font-serif text-xl italic text-[#755625] sm:text-2xl"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                      >
                        Con aprecio.
                      </motion.p>
                    )}
                  </motion.article>
                </AnimatePresence>
              </div>
            </main>

            <footer className="relative z-10 shrink-0 border-t border-[#cdbb90]/60 bg-[#fffdf7]/85 px-5 py-4 backdrop-blur-sm sm:px-9 sm:py-5">
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-xs text-[#846a3d]">Página {currentPage + 1} de {letterPages.length}</p>
                <div className="flex max-w-[60%] items-center justify-end gap-1.5" aria-label="Progreso de lectura">
                  {letterPages.map((page, index) => (
                    <button
                      key={page.title}
                      type="button"
                      onClick={() => setCurrentPage(index)}
                      aria-label={`Ir a ${page.chapter.toLowerCase()}`}
                      className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#b5904c] ${index === currentPage ? 'w-7 bg-[#a8792f]' : 'w-1.5 bg-[#dfcfa8] hover:bg-[#ba944d]'}`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <motion.button
                  type="button"
                  onClick={goPrevious}
                  disabled={isFirstPage}
                  whileHover={isFirstPage ? undefined : { y: -1 }}
                  whileTap={isFirstPage ? undefined : { scale: 0.98 }}
                  className="rounded-xl border border-[#cdbb90] px-4 py-2.5 text-sm font-medium text-[#5e4826] transition hover:bg-[#f5ecd6] disabled:cursor-not-allowed disabled:opacity-35 sm:px-5"
                >
                  Anterior
                </motion.button>

                {isLastPage ? (
                  <motion.button
                    type="button"
                    onClick={handleClose}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-xl bg-[#8a6529] px-5 py-2.5 text-sm font-medium text-[#fffdf7] shadow-sm transition hover:bg-[#6d4e20] sm:px-6"
                  >
                    Cerrar carta
                  </motion.button>
                ) : (
                  <motion.button
                    type="button"
                    onClick={goNext}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-xl bg-[#8a6529] px-5 py-2.5 text-sm font-medium text-[#fffdf7] shadow-sm transition hover:bg-[#6d4e20] sm:px-6"
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