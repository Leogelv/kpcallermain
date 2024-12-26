import { motion } from 'framer-motion';
import { Unbounded } from 'next/font/google';

const unbounded = Unbounded({ subsets: ['latin'] });

export default function InnovationSection() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center px-4 py-20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`${unbounded.className} text-4xl md:text-5xl font-bold bg-gradient-to-br from-indigo-900 to-blue-900 bg-clip-text text-transparent mb-6`}>
            Инновации для вашего успеха
          </h2>
          <p className="text-xl text-indigo-950/80 max-w-3xl mx-auto">
            Инвестируйте в AI, который меняет правила игры
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Левая колонка - Технологии */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-white/90 to-indigo-50/90 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-indigo-100"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-blue-200 rounded-2xl flex items-center justify-center shadow-inner">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className={`${unbounded.className} text-2xl font-semibold text-indigo-950`}>
                Наши технологии
              </h3>
            </div>
            
            <div className="space-y-6">
              <div className="group bg-white/50 hover:bg-white/80 rounded-xl p-6 transition-all duration-300 border border-indigo-100/50">
                <div className="flex items-center gap-4 mb-3">
                  <div className="text-2xl">🤖</div>
                  <h4 className="font-semibold text-blue-950">Умный голосовой AI</h4>
                </div>
                <p className="text-indigo-950/70">Адаптируется к специфике вашего бизнеса и растёт вместе с вами</p>
              </div>

              <div className="group bg-white/50 hover:bg-white/80 rounded-xl p-6 transition-all duration-300 border border-indigo-100/50">
                <div className="flex items-center gap-4 mb-3">
                  <div className="text-2xl">🔄</div>
                  <h4 className="font-semibold text-blue-950">Полная интеграция</h4>
                </div>
                <p className="text-indigo-950/70">Бесшовное подключение ко всем вашим существующим платформам</p>
              </div>
            </div>
          </motion.div>

          {/* Правая колонка - Безопасность */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-blue-100"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl flex items-center justify-center shadow-inner">
                <span className="text-3xl">🔐</span>
              </div>
              <h3 className={`${unbounded.className} text-2xl font-semibold text-indigo-950`}>
                Ваши данные под защитой
              </h3>
            </div>

            <div className="space-y-6">
              <div className="group bg-white/50 hover:bg-white/80 rounded-xl p-6 transition-all duration-300 border border-blue-100/50">
                <div className="flex items-center gap-4 mb-3">
                  <div className="text-2xl">🛡️</div>
                  <h4 className="font-semibold text-blue-950">Современная защита</h4>
                </div>
                <p className="text-indigo-950/70">Используем передовые протоколы шифрования для защиты ваших данных</p>
              </div>

              <div className="group bg-white/50 hover:bg-white/80 rounded-xl p-6 transition-all duration-300 border border-blue-100/50">
                <div className="flex items-center gap-4 mb-3">
                  <div className="text-2xl">⚡️</div>
                  <h4 className="font-semibold text-blue-950">Надёжная работа</h4>
                </div>
                <p className="text-indigo-950/70">Гарантированная доступность даже при пиковых нагрузках</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Нижний призыв */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className={`${unbounded.className} text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent`}>
            С нами ваш бизнес готов к будущему!
          </p>
        </motion.div>
      </div>
    </section>
  );
} 