import {forwardRef} from "react";
import s from "./Form.module.scss";
import { IField, ITextarea } from './form.interface'
import cn from "classnames";
import {AnimatePresence, motion} from "framer-motion";

const TextareaField = forwardRef<HTMLTextAreaElement, ITextarea>(
    ({error , style, ...rest}, ref) => {
        return (
            <div style={style}>
                <label className={cn(s.rootFormInputLabel, {[s.root__inputError]: error})}>
                    <textarea ref={ref} {...rest} autoComplete="off"/>
                </label>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            className={s.root__fieldError}
                            initial={{
                                height: 0,
                                opacity: 0,
                                y: '-100%'
                            }}
                            animate={{
                                height: 'auto',
                                opacity: 1,
                                y: '5%'
                            }}
                            exit={{
                                height: 0,
                                opacity: 0,
                                y: '-100%'
                            }}
                        >
                            {error.message}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }
);

export default TextareaField;
