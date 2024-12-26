import { motion } from 'framer-motion';
import { Unbounded } from 'next/font/google';
import Image from 'next/image';

const unbounded = Unbounded({ subsets: ['latin'] });

export default function AdvantagesSection() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[1400px] rounded-[2rem] 
          bg-white/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]
          border border-white/50 overflow-hidden p-6 lg:p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Первый ряд */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-blue-100 md:col-span-3"
          >
            <div className="flex flex-col items-center">
              <h2 className={`${unbounded.className} text-4xl md:text-5xl font-bold bg-gradient-to-br from-blue-900 to-violet-900 bg-clip-text text-transparent mb-6 text-center`}>
                Ваш кол-центр теперь умнее
              </h2>
              <p className="text-xl text-indigo-950/80 max-w-3xl text-center">
                Наш голосовой AI создан для того, чтобы сделать вашу работу эффективнее
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-blue-100"
          >
            <div className="text-3xl mb-4">🎯</div>
            <h3 className={`${unbounded.className} text-xl font-semibold mb-3 text-blue-950`}>Живой диалог</h3>
            <p className="text-indigo-950/70">Поддерживает естественную беседу, словно это ваш лучший оператор</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-br from-white/80 to-purple-50/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-purple-100"
          >
            <div className="text-3xl mb-4">⚡️</div>
            <h3 className={`${unbounded.className} text-xl font-semibold mb-3 text-purple-950`}>24/7 Доступность</h3>
            <p className="text-indigo-950/70">Работает круглосуточно, обрабатывая запросы без участия человека</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-gradient-to-br from-white/80 to-violet-50/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-violet-100"
          >
            <div className="text-3xl mb-4">🔄</div>
            <h3 className={`${unbounded.className} text-xl font-semibold mb-3 text-violet-950`}>CRM Интеграция</h3>
            <p className="text-indigo-950/70">Интегрируется с вашей CRM для персона��изации диалогов</p>
          </motion.div>

          {/* Второй ряд */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="bg-gradient-to-br from-white/80 to-emerald-50/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-emerald-100"
          >
            <div className="text-3xl mb-4">🤖</div>
            <h3 className={`${unbounded.className} text-xl font-semibold mb-3 text-emerald-950`}>Умный Ассистент</h3>
            <p className="text-indigo-950/70">Проверяет бронирования, управляет заказами и формирует заявки автоматически</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="bg-gradient-to-br from-white/80 to-amber-50/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-amber-100"
          >
            <div className="text-3xl mb-4">📊</div>
            <h3 className={`${unbounded.className} text-xl font-semibold mb-3 text-amber-950`}>Аналитика в Реальном Времени</h3>
            <p className="text-indigo-950/70">Отслеживает эффективность и предоставляет детальные отчеты по каждому звонку</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="bg-gradient-to-br from-white/80 to-rose-50/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-rose-100"
          >
            <div className="text-3xl mb-4">🎓</div>
            <h3 className={`${unbounded.className} text-xl font-semibold mb-3 text-rose-950`}>Постоянное Обучение</h3>
            <p className="text-indigo-950/70">Самообучается на основе каждого разговора, становясь всё эффективнее</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex justify-center mt-8"
          >
            <motion.a
              href="https://t.me/Anton_Tvoretskiy"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full max-w-[400px] h-12 rounded-xl font-medium text-sm flex items-center justify-center gap-2
                bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-600/20 
                hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-300 ${unbounded.className}`}
            >
              <span className="text-xl">💬</span>
              Связаться
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
} 