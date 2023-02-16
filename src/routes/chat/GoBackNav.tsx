import React from 'react';
import { useNavigate } from 'react-router-dom';
import IconArrow from '../../assets/icons/arrow.left.svg';
// type Props = {}

const GoBackNav = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };
    return (
        <button className='p-2 absolute left-2 md:hidden' onClick={handleBack}>
            <IconArrow className="dark:stroke-white  w-6 h-6" />
        </button>
    );
};

export default GoBackNav;