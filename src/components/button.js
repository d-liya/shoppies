import styled from "styled-components";
import { motion } from "framer-motion";

const Btn = styled(motion.button)`
    cursor:${({disabled}) => disabled ? 'default' : 'pointer'};
    background-color:${({bgColor}) => bgColor ? bgColor : '#2CA1C0'};
    color:${({color}) => color ? color : '#C4C8CA'};
    border:1px solid ${({bgColor}) => bgColor ? bgColor : '#2CA1C0'};
    padding:4px 8px;
    border-radius:0.3rem;
    margin-left:30px;
`;

const Button = ({onClick,disable,value,color,bgColor}) => (
    <Btn 
        color={color}
        bgColor={bgColor}
        whileHover={disable ? '' :{ scale: 1.1 }}
        whileTap={disable ?'':{ scale: 0.9 }}
        onClick={onClick} 
        disabled={disable} >
        {value}
    </Btn>
)
export default Button;