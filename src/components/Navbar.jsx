import {navLinks} from "../../constants/index.js";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";


const Navbar = () => {
    //! for glassy background
    useGSAP(()=>{
        const navTween=gsap.timeline({
            scrollTrigger:{
                trigger:"nav",
                start:"bottom top",
            }
        })
        navTween.fromTo("nav",{backgroundColor:"transparent"},{
            backgroundColor:"#00000050",
            backgroundFilter:"blur(10px)",
            duration:1,
            ease:"Power1.inOut",
        });
    },[])

    return (
        <nav>
            <div>
                <a href={"#home"} className="flex items-center gap-2">
                    <img src={"/images/logo.png"} alt="Logo" />
                    <p>Velvet Pour</p>
                </a>

                <ul>
                    {navLinks.map((link,i)=>(
                        <li key={link.id}>
                            <a href={`#${link.id}`}>{link.title}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;