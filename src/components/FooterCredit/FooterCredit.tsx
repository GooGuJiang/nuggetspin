import { motion } from 'framer-motion';

interface FooterCreditProps {
  label: string;
}

export function FooterCredit({ label }: FooterCreditProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
      className="fixed left-0 bottom-0 p-4 font-bold"
    >
      <a className="text-orange-500 hover:text-orange-400 text-opacity-50" href="https://github.com/googujiang">
        {label}
      </a>
    </motion.div>
  );
}
