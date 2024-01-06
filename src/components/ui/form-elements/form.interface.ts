import { ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { FieldError } from "react-hook-form";

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {}

export interface IFieldProps {
    error?: FieldError | undefined
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldProps
type TypeTextareaPropsField = TextareaHTMLAttributes<HTMLTextAreaElement> & IFieldProps

export interface IField extends TypeInputPropsField {}
export interface ITextarea extends TypeTextareaPropsField {}