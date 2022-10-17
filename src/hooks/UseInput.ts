import {useState} from "react";
import {useValidation} from "./UseValidation";
import {IValidation} from "../models/IUser";


export const useInput = (initialValue: string, validations: IValidation) => {
    const [value, setValue] = useState(initialValue)
    const [isDirty, setDirty] = useState(false)
    const valid = useValidation(value, validations)

    const onChange = (event: any) => {
        setValue(event.target.value)
    }

    const onBlur = (event: any) => {
        setDirty(true)
    }

    return {value, isDirty, onChange, onBlur, ...valid}
}