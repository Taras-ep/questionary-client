import React, { useRef, useEffect } from "react"
import './ButtonContinue.scss'
import '../../styles/mediaRequests/auth-form-media-req.scss'

interface ButtonContinueProps {
    onContinue: () => void,
    text: string,
    isActive: boolean
}

const ButtonContinue = (props: ButtonContinueProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        if (buttonRef.current) {
            buttonRef.current.style.backgroundColor = props.isActive ? "#155A00" : "gray";
        }
    }, [props.isActive]);

    return (
        <div className="button-container" >
            <button className="button-continue" ref={buttonRef} type="button" onClick={() => {
                    props.onContinue!()
            }}>
                {props.text}
            </button>
        </div>
    )
}

export default ButtonContinue;