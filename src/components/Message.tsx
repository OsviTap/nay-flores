import { motion } from 'framer-motion';

interface MessageProps {
  isVisible: boolean;
}

export function Message({ isVisible }: MessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 30,
        scale: isVisible ? 1 : 0.9,
      }}
      transition={{
        duration: 1,
        delay: 0.3,
        type: "spring",
        stiffness: 80,
      }}
      className="absolute inset-x-0 top-0 bottom-0 z-10 pointer-events-none flex flex-col"
    >
      {/* Header fijo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-center pt-4 sm:pt-6 md:pt-8 px-4 pointer-events-none"
      >
        <h1
          className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 sm:mb-3 drop-shadow-2xl"
          style={{
            fontFamily: "'Playfair Display', serif",
            background: 'linear-gradient(135deg, #e0f7fa 0%, #40e0d0 50%, #20b2aa 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 4px 20px rgba(64,224,208,0.4))',
          }}
        >
          Para Nay 💎
        </h1>
      </motion.div>

      {/* Mensaje scrolleable */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="flex-1 overflow-y-auto pointer-events-auto px-4 sm:px-6 pb-24 sm:pb-28 message-scroll"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 5%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 5%, black 85%, transparent 100%)',
        }}
      >
        <div className="max-w-lg mx-auto">
          {/* Aviso */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-center mb-4 py-2 px-3 rounded-lg"
            style={{
              background: 'rgba(64,224,208,0.1)',
              border: '1px solid rgba(64,224,208,0.2)',
            }}
          >
            <p className="text-cyan-200/60 text-[10px] sm:text-xs">
              📜 Hay mucho que decir... desplázate para leer todo
            </p>
          </motion.div>

          {/* Texto del mensaje */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="rounded-2xl p-4 sm:p-5 md:p-6"
            style={{
              background: 'rgba(10,22,40,0.6)',
              border: '1px solid rgba(64,224,208,0.15)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <p
              className="text-xs sm:text-sm leading-relaxed text-cyan-100/80"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Se que no hablamos como antes y que muchas cosas quizás cambiaron y muchas otras pasaron, pero algo que nunca puede cambiar en mi es ese espacio que siempre tendrás en mi corazón. Eres y siempre serás esa personita muy special, alguien que nunca olvidaría.

              <br /><br />

              Sé que es algo contradictorio con lo que puedo demostrar, es solo que quizás me impide un poco mi timidez, lo introvertido que me dificulta poder llegar o saber cómo llegar a las personas. Al parecer es por eso mismo que soy introvertido, es que siempre me es más fácil evadir algún problema por más grande o pequeño que sea. Y bueno, siempre intento mejorar en esa situación, al menos con las personas que realmente me importan, como lo eres tú.

              <br /><br />

              Intenté acercarme con todo el valor y demás justo para las fechas de fiestas de agosto, donde quería ir directamente quizás al templo para poder encontrarte, igual porque trabajas ese día normal. Pero justo ese día sucedió algo muy inesperado, y fue que mi abuelo, el último que me queda, sufrió como una pre embolia, donde lo encontraron inconsciente en el baño de su casa, lo cual pasó así inconsciente toda la noche y pues lo llevamos de emergencia en ambulancia ese día.

              <br /><br />

              Y como mi mamá es la que siempre está ahí en todo y al ser mi abuelo, estuvimos ahí. Le hicieron una cirugía de emergencia en la madrugada por temas de la fiesta, estuvimos en eso todos esos días de fiesta quedándonos, intercambiando turnos para estar con él, lo cual por ello lo que tenía planeado se me fue todo.

              <br /><br />

              Pero en fin, gracias a tus estados y cortos pude ver como vas creciendo, todo lo que vas viviendo y que literalmente estás siendo como el vino 🍷. Me alegra un montón, siempre te desearé el éxito, que cada vez llegues mucho más lejos. No sabes como me alegra verte feliz con lo que haces.

              <br /><br />

              Y bueno todo lo demás que me perdí en todo este tiempo desde la última vez que hablamos. Y bueno, con todo esto espero me deje entender un poco, o al menos en parte, mi intención de intentar acercarme un poco o algo hacia tu persona. La verdad no sé si es muy egoísta, o ser sin cara de mi parte, hay muchas cosas que no sé pero sí una, y es como paso igual hace un tiempo, y es que no quisiera perder por completo la relación que alguna vez tuvimos.

              <br /><br />

              Y si ya nunca vuelve a ser como antes, de igual manera siempre intentaré de seguirte en lo que se pueda para seguir viendo como vas progresando, como vas cumpliendo cada vez más objetivos. 💙
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
