import { motion } from "framer-motion";

const Button = ({ onClick, disable, value, color, bgColor }) => {
  const props = {
    color: color,
    backgroundColor: bgColor,
    cursor: disable ? "default" : "pointer",
    borderColor: bgColor,
  };
  return (
    <motion.button
      whileHover={disable ? "" : { scale: 1.1 }}
      whileTap={disable ? "" : { scale: 0.9 }}
      className="btn"
      disabled={disable}
      onClick={onClick}
      style={props}
    >
      {value}
    </motion.button>
  );
};
export default Button;
