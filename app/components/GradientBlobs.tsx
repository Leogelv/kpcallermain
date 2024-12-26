import { motion } from 'framer-motion';

export default function GradientBlobs() {
  return (
    <>
      {/* Верхний левый блоб */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-20 blur-[80px]
          bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-blue-600 via-blue-500 to-purple-600"
      />

      {/* Нижний правый блоб */}
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="fixed bottom-[-10%] right-[-10%] w-[700px] h-[700px] rounded-full opacity-20 blur-[80px]
          bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-600 via-violet-600 to-indigo-600"
      />

      {/* Центральный блоб */}
      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, 20, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="fixed top-[20%] right-[20%] w-[400px] h-[400px] rounded-full opacity-15 blur-[80px]
          bg-[conic-gradient(at_center,_var(--tw-gradient-stops))] from-pink-500 via-red-500 to-yellow-500"
      />

      {/* Дополнительный блоб слева */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="fixed bottom-[20%] left-[10%] w-[300px] h-[300px] rounded-full opacity-10 blur-[60px]
          bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-400 via-orange-500 to-rose-500"
      />
    </>
  );
} 