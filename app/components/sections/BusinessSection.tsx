import { motion } from 'framer-motion';
import { Unbounded } from 'next/font/google';

const unbounded = Unbounded({ subsets: ['latin'] });

export default function BusinessSection() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center px-4 py-20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`${unbounded.className} text-4xl md:text-5xl font-bold bg-gradient-to-br from-violet-900 to-purple-900 bg-clip-text text-transparent mb-6`}>
            Ваш новый стандарт эффективности
          </h2>
          <p className="text-xl text-indigo-950/80 max-w-3xl mx-auto">
            Персонализированное общение на автопилоте
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
          {/* Левая колонка - Возможности */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h3 className={`${unbounded.className} text-2xl font-semibold mb-6 text-indigo-950`}>Наш AI способен:</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4 bg-gradient-to-br from-white/80 to-blue-50/80 p-4 rounded-xl border border-blue-100">
                <div className="text-2xl">📞</div>
                <div>
                  <h4 className="font-semibold mb-2 text-blue-950">Умные входящие звонки</h4>
                  <p className="text-indigo-950/70">Принимает входящие звонки, моментально отвечая с учетом данных вашей CRM</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-gradient-to-br from-white/80 to-purple-50/80 p-4 rounded-xl border border-purple-100">
                <div className="text-2xl">📈</div>
                <div>
                  <h4 className="font-semibold mb-2 text-purple-950">Активные продажи</h4>
                  <p className="text-indigo-950/70">Совершает исходящие продажи и уведомления, увеличивая доход</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-gradient-to-br from-white/80 to-violet-50/80 p-4 rounded-xl border border-violet-100">
                <div className="text-2xl">🧠</div>
                <div>
                  <h4 className="font-semibold mb-2 text-violet-950">Постоянное обучение</h4>
                  <p className="text-indigo-950/70">Обучается и адаптируется к уникальным сценариям вашего бизнеса</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Правая колонка - Выгоды */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-blue-100"
          >
            <h3 className={`${unbounded.className} text-2xl font-semibold mb-6 text-indigo-950`}>Для бизнеса это значит:</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center shadow-inner">
                  <span className="text-2xl">💰</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-blue-950">Экономия до 70% ресурсов</h4>
                  <p className="text-indigo-950/70">Существенное снижение операционных затрат</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center shadow-inner">
                  <span className="text-2xl">⚡️</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-purple-950">Мгновенная масштабируемость</h4>
                  <p className="text-indigo-950/70">Увеличивайте объемы без доп. затрат</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-100 to-violet-200 rounded-full flex items-center justify-center shadow-inner">
                  <span className="text-2xl">🎯</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-violet-950">Повышенная точность</h4>
                  <p className="text-indigo-950/70">Улучшенное качество обслуживания</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA кнопка */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <motion.a
            href="https://t.me/Anton_Tvoretskiy"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full h-12 rounded-xl font-medium text-sm flex items-center justify-center gap-2
              bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-600/20 
              hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-300 ${unbounded.className}`}
          >
            <span className="text-xl">💬</span>
            Связаться
          </motion.a>
          <p className="mt-4 text-indigo-950/70">Сделайте интеллектуальные технологии частью вашей стратегии!</p>
        </motion.div>
      </div>
    </section>
  );
} 