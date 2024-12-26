import { motion } from 'framer-motion';
import { Unbounded } from 'next/font/google';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

// Данные для графиков
const monthlyData = [
  { name: 'Янв', value: 65, efficiency: 78 },
  { name: 'Фев', value: 72, efficiency: 82 },
  { name: 'Мар', value: 85, efficiency: 85 },
  { name: 'Апр', value: 92, efficiency: 88 },
  { name: 'Май', value: 98, efficiency: 92 },
  { name: 'Июн', value: 100, efficiency: 95 },
];

const efficiencyData = [
  { name: 'Пн', calls: 487, handled: 462, satisfaction: 92 },
  { name: 'Вт', calls: 524, handled: 498, satisfaction: 94 },
  { name: 'Ср', calls: 598, handled: 571, satisfaction: 93 },
  { name: 'Чт', calls: 545, handled: 523, satisfaction: 95 },
  { name: 'Пт', calls: 612, handled: 589, satisfaction: 94 },
];

const weeklyTrends = [
  { week: '1', avgResponseTime: 45, resolutionRate: 88 },
  { week: '2', avgResponseTime: 42, resolutionRate: 89 },
  { week: '3', avgResponseTime: 38, resolutionRate: 91 },
  { week: '4', avgResponseTime: 35, resolutionRate: 93 },
];

export default function StatsSection() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center px-4 py-20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`${unbounded.className} text-4xl md:text-5xl font-bold bg-gradient-to-br from-purple-900 to-pink-900 bg-clip-text text-transparent mb-6`}>
            Эффективность в цифрах
          </h2>
          <p className="text-xl text-indigo-950/80 max-w-3xl mx-auto">
            Достижения наших клиентов говорят сами за себя
          </p>
        </motion.div>

        {/* Статистика */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16"
        >
          {/* Метрика 1 */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-white/90 to-blue-50/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-blue-100 text-center group hover:scale-105 transition-transform duration-300"
          >
            <div className="text-3xl mb-4">📈</div>
            <div className={`${unbounded.className} text-4xl font-bold text-blue-950 mb-2 bg-gradient-to-br from-blue-600 to-indigo-600 bg-clip-text text-transparent`}>
              +92%
            </div>
            <p className="text-indigo-950/70">Точность распознавания запросов</p>
          </motion.div>

          {/* Метрика 2 */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-white/90 to-purple-50/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-purple-100 text-center group hover:scale-105 transition-transform duration-300"
          >
            <div className="text-3xl mb-4">⏱️</div>
            <div className={`${unbounded.className} text-4xl font-bold text-purple-950 mb-2 bg-gradient-to-br from-purple-600 to-violet-600 bg-clip-text text-transparent`}>
              35с
            </div>
            <p className="text-indigo-950/70">Среднее время ответа</p>
          </motion.div>

          {/* Метрика 3 */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-white/90 to-violet-50/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-violet-100 text-center group hover:scale-105 transition-transform duration-300"
          >
            <div className="text-3xl mb-4">🌟</div>
            <div className={`${unbounded.className} text-4xl font-bold text-violet-950 mb-2 bg-gradient-to-br from-violet-600 to-purple-600 bg-clip-text text-transparent`}>
              94%
            </div>
            <p className="text-indigo-950/70">Удовлетворенность клиентов</p>
          </motion.div>

          {/* Метрика 4 */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-white/90 to-pink-50/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-pink-100 text-center group hover:scale-105 transition-transform duration-300"
          >
            <div className="text-3xl mb-4">💰</div>
            <div className={`${unbounded.className} text-4xl font-bold text-pink-950 mb-2 bg-gradient-to-br from-pink-600 to-rose-600 bg-clip-text text-transparent`}>
              -65%
            </div>
            <p className="text-indigo-950/70">Снижение операционных затрат</p>
          </motion.div>
        </motion.div>

        {/* График и призыв к действию */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* График */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-br from-white/90 to-indigo-50/90 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-indigo-100"
          >
            <h3 className={`${unbounded.className} text-2xl font-semibold text-indigo-950 mb-6`}>
              📊 Рост эффективности
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={monthlyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorEfficiency" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#a78bfa" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#4338ca" />
                  <YAxis stroke="#4338ca" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '0.5rem',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#4338ca" 
                    fillOpacity={1} 
                    fill="url(#colorValue)"
                    name="Обработка запросов"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="efficiency" 
                    stroke="#7c3aed" 
                    fillOpacity={1} 
                    fill="url(#colorEfficiency)"
                    name="Эффективность"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-8">
              <h3 className={`${unbounded.className} text-2xl font-semibold text-indigo-950 mb-6`}>
                📈 Обработка звонков
              </h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={efficiencyData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#4338ca" />
                    <YAxis stroke="#4338ca" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '0.5rem',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="calls" 
                      stroke="#6366f1" 
                      strokeWidth={2}
                      dot={{ fill: '#6366f1' }}
                      name="Всего звонков"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="handled" 
                      stroke="#8b5cf6" 
                      strokeWidth={2}
                      dot={{ fill: '#8b5cf6' }}
                      name="Успешно обработано"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="satisfaction" 
                      stroke="#ec4899" 
                      strokeWidth={2}
                      dot={{ fill: '#ec4899' }}
                      name="Удовлетворенность (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>

          {/* Призыв к действию */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-gradient-to-br from-white/90 to-purple-50/90 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-purple-100 flex flex-col justify-center"
          >
            <h3 className={`${unbounded.className} text-2xl font-semibold bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6`}>
              Доверьтесь цифрам
            </h3>
            <p className="text-indigo-950/70 mb-8 text-lg">
              Начните автоматизацию уже сегодня и присоединитесь к успешным компаниям, которые уже используют наш AI!
            </p>
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
          </motion.div>
        </div>
      </div>
    </section>
  );
} 