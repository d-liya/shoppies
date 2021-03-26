import { motion, AnimatePresence } from "framer-motion";

const Notifications = ({ notificationList, onClose }) => (
  <div className="n-container">
    <AnimatePresence initial={false}>
      {Array.isArray(notificationList) &&
        notificationList.map((text, index) => (
          <motion.li
            key={index}
            positionTransition
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          >
            <div className="header">
              <motion.button
                onClick={() => onClose(index)}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                id="close"
              >
                X
              </motion.button>
            </div>
            <span>{text}</span>
          </motion.li>
        ))}
    </AnimatePresence>
  </div>
);
export default Notifications;
