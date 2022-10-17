import {useAppSelector} from "../hooks/redux";
import {selectUser} from "../store/store";
import {useNavigate} from "react-router-dom";

export const ProtectedPage = ({children}: {children: any}) => {
    const {access_token} = useAppSelector(selectUser)
    const navigate = useNavigate()
    return (access_token ? children : navigate('/login'))
};

export default ProtectedPage;