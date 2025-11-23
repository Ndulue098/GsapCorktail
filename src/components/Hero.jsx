import React from 'react';
import {useGSAP} from "@gsap/react";
import {SplitText} from "gsap/all";
import {gsap} from "gsap";
const Hero = () => {

    useGSAP(()=>{

        const heroSplit=new SplitText(".title",{type:"chars, words"})
        const paragraphSplit=new SplitText(".subtitle",{type:"lines"})

        heroSplit.chars.forEach((char,i)=>char.classList.add("text-gradient"))
        gsap.from(heroSplit.chars,{
            yPercent:100,
            duration:1.8,
            ease:"expo.out",
            // delay:0.5,
            stagger:0.06,
        })

        gsap.from(paragraphSplit.lines,{
            yPercent:100,
            opacity:0,
            ease:"expo.out",
            stagger:0.06,
            delay:1,
            duration:1.8,
        })

        gsap.timeline({
            scrollTrigger:{
                trigger:"#hero",
                start:"top top",
                end:"bottom top",
                scrub:true,
            }
        }).to(".right-leaf",{y:200,x:100},0)
        .to(".left-leaf",{y:-200,x:-100},0)

    },[])


    return (
        <div id='hero' className={"noisy"}>
            <h1 className={"title capitalize"}>Mojito</h1>
            <img src={"/images/hero-left-leaf.png"} alt="left leaf" className={"left-leaf"}/>
            <img src={"/images/hero-right-leaf.png"} alt="right leaf" className={"right-leaf"}/>

            <div className={"body"}>
                <div className={"content"}>
                    <div className={"space-y-5 hidden md:block"}>
                        <p> Cool. Crispy. Classic</p>
                        <p className={"subtitle"}>
                            Sip the Spirit <br/> of Summer
                        </p>
                    </div>

                    <div className={"view-cocktails"}>
                        <p className={"subtitle"}>
                            Every cocktail on our menu is a blend of premium ingredients, creative flair, and timeless
                            recipes - designed to delight the senses
                        </p>
                        <a href={"#cocktails"}>View Cocktails</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

// the noisy apply background

export default Hero;