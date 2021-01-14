import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const NotificationContainer = styled.ul`
        position:fixed;
        bottom:0;
        right:0;
        display:flex;
        flex-direction:column;
        list-style:none;
        li{
            background-color:#353536;
            width:250px;
            margin:5px;
            padding:20px;
            font-size:0.8rem;
            border-radius:0.5rem;
        }
        .header{
            display:flex;
            justify-content: flex-end;
        }
        #close{
            background:none;
            border:none;
            color:#C4C8CA;
            font-weight:bolder;
            cursor:pointer;
            outline:none;
        }
    
`;

const Notifications = ({notificationList, onClose}) => (
    <NotificationContainer>
            <AnimatePresence initial={false}>
                {Array.isArray(notificationList) && notificationList.map((text,index) => (
                    <motion.li
                    key={index}
                    positionTransition
                    initial={{ opacity: 0, y: 50, scale: 0.3 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                    >
                        <div className='header'>
                            <motion.button
                            onClick={() => onClose(index)} 
                            whileTap={{scale:0.9}}
                            whileHover={{scale:1.1}}
                            id="close">X</motion.button>
                        </div>
                        <span>{text}</span>
                    </motion.li>
                ))}
            </AnimatePresence>
    
    </NotificationContainer>
);
export default Notifications;
