import { motion } from 'framer-motion';

export function Demo() {
  return (
    <div className="relative min-h-[400px] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 p-8 backdrop-blur-xl">
      {/* Animated background circles */}
      <motion.div 
        className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-purple-500/30 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-blue-500/30 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent">
            Демо компонент
          </h2>
          <p className="mt-2 text-white/60">
            Проверяем работу стилей и анимаций
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group rounded-xl bg-white/5 p-6 backdrop-blur-lg transition-all hover:bg-white/10"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/20">
                <span className="text-2xl">🎨</span>
              </div>
              <div>
                <h3 className="font-semibold text-white">Стили работают</h3>
                <p className="text-sm text-white/60">Tailwind + Custom CSS</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group rounded-xl bg-white/5 p-6 backdrop-blur-lg transition-all hover:bg-white/10"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20">
                <span className="text-2xl">✨</span>
              </div>
              <div>
                <h3 className="font-semibold text-white">Анимации на месте</h3>
                <p className="text-sm text-white/60">Framer Motion</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex justify-center"
        >
          <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-3 text-white transition-all hover:shadow-lg hover:shadow-purple-500/30">
            <span className="relative z-10">Красивая кнопка</span>
            <div className="absolute inset-0 -z-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        </motion.div>
      </div>
    </div>
  );
} 