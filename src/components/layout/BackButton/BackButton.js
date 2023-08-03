import React from 'react'
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { UseLoadingContext } from '../../../firebase/hooks/UseLoading';

export default function BackButton ( { path } ) {
    const navigate = useNavigate();
    const {handleClick} = UseLoadingContext();
    const handleNavigation = () => {
        navigate( path );
        handleClick();
    }
    return (
        <div className="mb-2" onClick={handleNavigation}><FaArrowAltCircleLeft size={21} /></div>
    )
}
