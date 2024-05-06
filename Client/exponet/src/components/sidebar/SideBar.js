import React ,{useState,useEffect} from 'react';
import './SideBar.css';
import image1 from '../../assets/image 25.png';
import iconExponet from '../../assets/Icon Exponet.png';

function NavBar() {
    const [isSticky, setSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 1024) { 
                setSticky(true);
            } else {
                setSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div className={`navbar ${isSticky ? 'sticky' : ''}`}>
            <div className='divOptionsButton'>
                <button className='optionsButton'></button>
            </div>
            <div className='divButton2'>
                <button className='button2'></button>
            </div>
            <div className='emptyDiv'></div>
            <img src={image1} alt='קקל' width="32" height="30.22px"/>
            <img src={iconExponet} alt='Icon exponet' width="24" height="27.57px"/>
        </div>
    );
}

export default NavBar;