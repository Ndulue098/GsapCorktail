import {gsap} from "gsap";
import {ScrollTrigger,SplitText} from "gsap/all";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Cocktail from "./components/Cocktail.jsx";

gsap.registerPlugin(ScrollTrigger,SplitText);

export default function App(){
    return (
        <main>
            <Navbar/>
            <Hero/>
            <Cocktail/>
        </main>
    );
}


