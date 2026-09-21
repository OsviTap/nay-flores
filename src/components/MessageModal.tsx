import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LetterPage {
  title: string;
  text: string;
}

const pages: LetterPage[] = [
  {
    title: 'Algo que permanece',
    text: 'Sé que ya no hablamos como antes y que muchas cosas quizá cambiaron. Aun así, hay algo que no ha cambiado en mí: el lugar que siempre tendrás en mi corazón. Eres y seguirás siendo una persona muy especial para mí, alguien a quien nunca podría olvidar.',
  },
  {
    title: 'Lo que me cuesta expresar',
    text: 'Sé que a veces puede parecer contradictorio lo que siento con lo que demuestro. Mi timidez y mi forma introvertida de ser muchas veces me dificultan acercarme o encontrar las palabras adecuadas. Durante mucho tiempo me ha resultado más fácil evadir los problemas, incluso cuando sé que debería afrontarlos.',
  },
  {
    title: 'Un intento de acercarme',
    text: 'Siempre intento mejorar en ese aspecto, sobre todo con las personas que realmente me importan, como tú. Por eso reuní valor para intentar acercarme durante las fiestas de agosto. Incluso pensé en ir directamente al templo para poder encontrarte, tomando en cuenta que ese día también trabajabas.',
  },
  {
    title: 'Lo que ocurrió',
    text: 'Sin embargo, ese día sucedió algo inesperado. Mi abuelo, el último que me queda, sufrió una emergencia médica. Lo encontraron inconsciente en el baño de su casa, después de haber pasado allí toda la noche, y tuvimos que llevarlo de urgencia en una ambulancia.',
  },
  {
    title: 'Esos días',
    text: 'Como mi mamá siempre está pendiente de todo y se trataba de mi abuelo, estuvimos acompañándolo. Le realizaron una cirugía de emergencia durante la madrugada y pasamos aquellos días en el hospital, turnándonos para cuidarlo. Por esa razón, todo lo que había planeado quedó suspendido.',
  },
  {
    title: 'Me alegra verte avanzar',
    text: 'A pesar del tiempo y de la distancia, gracias a tus estados y a los videos que compartes he podido saber un poco de cómo estás y de todo lo que has vivido. Me alegra verte crecer, avanzar y disfrutar lo que haces. Siempre voy a desearte éxito y a alegrarme sinceramente por cada objetivo que consigas.',
  },
  {
    title: 'Lo que quisiera conservar',
    text: 'También pienso en todo lo que me perdí desde la última vez que hablamos. Espero que esto te ayude a entender, aunque sea un poco, mi intención de acercarme nuevamente. No sé si hacerlo puede parecer egoísta o inoportuno; hay muchas cosas que todavía no sé. Pero sí tengo algo claro: no quisiera perder por completo la relación que alguna vez tuvimos.',
  },
  {
    title: 'Sin exigirte nada',
    text: 'Y si nuestra relación nunca vuelve a ser como antes, aun así seguiré deseándote lo mejor. Me alegrará saber que continúas progresando, cumpliendo tus objetivos y construyendo la vida que quieres. No te escribo para exigirte una respuesta, sino para decirte con sinceridad lo que llevaba tiempo guardando.',
  },
];

export function MessageModal({ isOpen, onClose }: MessageModalProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === pages.length - 1;
  const page = pages[currentPage];

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft' && !isFirstPage) {
        setCurrentPage((previous) => previous - 1);
      }
      if (event.key === 'ArrowRight' && !isLastPage) {
        setCurrentPage((previous) => previous + 1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isFirstPage, isLastPage, onClose]);

  const handleClose = () => {
    setCurrentPage(0);
    onClose();
  };

  const goNext = () => {
    if (!isLastPage) setCurrentPage((previous) => previous + 1);
  };

  const goPrevious = () => {
    if (!isFirstPage) setCurrentPage((previous) => previous - 1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-3 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="letter-title"
          onClick={handleClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.section
            className="relative flex max-h-[min(760px,calc(100dvh-24px))] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-amber-200/30 bg-[#fffaf0] text-slate-800 shadow-2xl sm:max-h-[min(820px,calc(100dvh-48px))] sm:rounded-3xl"
            onClick={(event) => event.stopPropagation()}
            initial={{ y: 24, scale: 0.97 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <header className="flex shrink-0 items-center justify-between border-b border-amber-900/10 bg-amber-50/80 px-5 py-4 sm:px-8 sm:py-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-amber-700">Una carta para Jhajaira</p>
                <p className="mt-1 text-xs text-slate-500">21 de septiembre</p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="rounded-full p-2 text-slate-500 transition hover:bg-amber-100 hover:text-slate-900"
                aria-label="Cerrar carta"
              >
                <span aria-hidden="true" className="text-xl leading-none">×</span>
              </button>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-7 sm:px-12 sm:py-10">
              <AnimatePresence mode="wait">
                <motion.article
                  key={currentPage}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="mb-3 text-sm font-medium text-amber-700">Parte {currentPage + 1}</p>
                  <h2 id="letter-title" className="font-serif text-3xl leading-tight text-slate-900 sm:text-4xl">
                    {page.title}
                  </h2>
                  <div className="mt-6 h-px w-16 bg-amber-500" />
                  <p className="mt-6 text-[1.06rem] leading-8 text-slate-700 sm:text-lg sm:leading-9">
                    {page.text}
                  </p>
                </motion.article>
              </AnimatePresence>
            </div>

            <footer className="shrink-0 border-t border-amber-900/10 bg-white/70 px-5 py-4 sm:px-8 sm:py-5">
              <div className="mb-4 flex items-center justify-between text-xs text-slate-500">
                <span>{currentPage + 1} de {pages.length}</span>
                <div className="flex gap-1.5" aria-label="Progreso de la carta">
                  {pages.map((pageItem, index) => (
                    <button
                      key={pageItem.title}
                      type="button"
                      onClick={() => setCurrentPage(index)}
                      aria-label={`Ir a la parte ${index + 1}`}
                      className={`h-1.5 rounded-full transition-all ${index === currentPage ? 'w-7 bg-amber-600' : 'w-1.5 bg-amber-200 hover:bg-amber-400'}`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={goPrevious}
                  disabled={isFirstPage}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  Anterior
                </button>

                {isLastPage ? (
                  <button
                    type="button"
                    onClick={handleClose}
                    className="rounded-xl bg-amber-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-amber-700"
                  >
                    Cerrar carta
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={goNext}
                    className="rounded-xl bg-amber-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-amber-700"
                  >
                    Continuar
                  </button>
                )}
              </div>
            </footer>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}