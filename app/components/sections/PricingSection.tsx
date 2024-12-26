import { motion } from 'framer-motion';
import { Unbounded } from 'next/font/google';

const unbounded = Unbounded({ subsets: ['latin'] });

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0 }
};

export default function PricingSection() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center px-4 py-20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`${unbounded.className} text-4xl md:text-5xl font-bold bg-gradient-to-br from-blue-900 to-purple-900 bg-clip-text text-transparent mb-6`}>
            Выберите свой план
          </h2>
          <p className="text-xl text-indigo-950/80 max-w-3xl mx-auto">
            Тариф, который подойдет именно вашемуу проекту
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {/* Базовый тариф */}
          <motion.div
            variants={cardVariants}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <div className="bg-gradient-to-br from-white/90 to-blue-50/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-blue-100 relative h-full">
              <div className="text-3xl mb-4">🌱</div>
              <h3 className={`${unbounded.className} text-2xl font-bold text-blue-950 mb-2`}>Базовый</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className={`${unbounded.className} text-3xl font-bold text-blue-950`}>$9,000</span>
                <span className="text-indigo-950/70">/ проект</span>
              </div>
              <p className="text-indigo-950/70 mb-6">Срок разработки: 3-4 недели</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl leading-none">✓</span>
                  <span className="text-indigo-950/80">Интеграция с вашими API для получения информации</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl leading-none">✓</span>
                  <span className="text-indigo-950/80">Ответы на часто задаваемые вопросы (до 50 сценариев)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl leading-none">✓</span>
                  <span className="text-indigo-950/80">Проверка статусов и получение информации из CRM</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl leading-none">✓</span>
                  <span className="text-indigo-950/80">Базовая маршрутизация звонков</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl leading-none">✓</span>
                  <span className="text-indigo-950/80">Информирование о режиме работы и контактах</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl leading-none">✓</span>
                  <span className="text-indigo-950/80">Переключение на оператора при сложных запросах</span>
                </li>
              </ul>
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
            </div>
          </motion.div>

          {/* Бизнес тариф */}
          <motion.div
            variants={cardVariants}
            className="relative group lg:scale-105 lg:-mt-4"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <div className="bg-gradient-to-br from-white/90 to-violet-50/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-violet-100 relative h-full">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm">
                  Популярный выбор
                </span>
              </div>
              <div className="text-3xl mb-4">👑</div>
              <h3 className={`${unbounded.className} text-2xl font-bold text-violet-950 mb-2`}>Бизнес</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className={`${unbounded.className} text-3xl font-bold text-violet-950`}>$14,000</span>
                <span className="text-indigo-950/70">/ проект</span>
              </div>
              <p className="text-indigo-950/70 mb-6">Срок разработки: 5-6 недель</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-violet-500 text-xl leading-none">✓</span>
                  <span className="text-indigo-950/80">Все функции базового тарифа</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet-500 text-xl leading-none">✓</span>
                  <span className="text-indigo-950/80">Создание и изменение заявок в CRM</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet-500 text-xl leading-none">✓</span>
                  <span className="text-indigo-950/80">Исходящие звонки и уведомления</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet-500 text-xl leading-none">✓</span>
                  <span className="text-indigo-950/80">Умная маршрутизация по отделам</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet-500 text-xl leading-none">✓</span>
                  <span className="text-indigo-950/80">Автоматический перезвон при занятой линии</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet-500 text-xl leading-none">✓</span>
                  <span className="text-indigo-950/80">Интеграция с календарями и планировщиками</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet-500 text-xl leading-none">✓</span>
                  <span className="text-indigo-950/80">Расширенная аналитика и отчетность</span>
                </li>
              </ul>
              <motion.a
                href="https://t.me/Anton_Tvoretskiy"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full h-12 rounded-xl font-medium text-sm flex items-center justify-center gap-2
                  bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-blue-600/20 
                  hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-300 ${unbounded.className}`}
              >
                <span className="text-xl">💬</span>
                Связаться
              </motion.a>
            </div>
          </motion.div>

          {/* VIP тариф */}
          <motion.div
            variants={cardVariants}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <div className="bg-gradient-to-br from-white/90 to-purple-50/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-purple-100 relative h-full">
              <div className="text-3xl mb-4">👑</div>
              <h3 className={`${unbounded.className} text-2xl font-bold text-purple-950 mb-2`}>VIP</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className={`${unbounded.className} text-3xl font-bold text-purple-950`}>$20,000</span>
                <span className="text-indigo-950/70">/ проект</span>
              </div>
              <p className="text-indigo-950/70 mb-6">Срок разработки: 6-10 недель</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 text-xl leading-none">✓</span>
                  <span className="text-indigo-950/80">Все функции бизнес-тарифа</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 text-xl leading-none">✓</span>
                  <span className="text-indigo-950/80">Многошаговые сценарии обработки звонков</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 text-xl leading-none">✓</span>
                  <span className="text-indigo-950/80">Интеграция с любыми корпоративными системами</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 text-xl leading-none">✓</span>
                  <span className="text-indigo-950/80">Умное распознавание намерений клиента</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 text-xl leading-none">✓</span>
                  <span className="text-indigo-950/80">Автоматизация последовательных действий</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 text-xl leading-none">✓</span>
                  <span className="text-indigo-950/80">Персонализация на основе истории клиента</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 text-xl leading-none">✓</span>
                  <span className="text-indigo-950/80">Проактивные уведомления и рекомендации</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 text-xl leading-none">✓</span>
                  <span className="text-indigo-950/80">Выделенная команда поддержки 24/7</span>
                </li>
              </ul>
              <motion.a
                href="https://t.me/Anton_Tvoretskiy"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full h-12 rounded-xl font-medium text-sm flex items-center justify-center gap-2
                  bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-blue-600/20 
                  hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-300 ${unbounded.className}`}
              >
                <span className="text-xl">💬</span>
                Связаться
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 