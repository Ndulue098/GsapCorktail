import React, {useRef} from 'react';
import {useGSAP} from "@gsap/react";
import {SplitText, ScrollTrigger} from "gsap/all";
import {gsap} from "gsap";
import {useMediaQuery} from "react-responsive";


const Hero = () => {

    const videoRef = useRef(null);
    // ! if it's up to the max width it will be mobile else web
    const isMobile=useMediaQuery({maxWidth: 767});


    useGSAP(()=>{
        const heroSplit=new SplitText(".title",{type:"chars, words"})
        const paragraphSplit=new SplitText(".subtitle",{type:"lines"})

        heroSplit.chars.forEach((char)=>char.classList.add("text-gradient"))
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


        //! video animation: scrub video.currentTime based on scroll
        gsap.registerPlugin(ScrollTrigger)

        const startValue= isMobile ? "top 50%" : "center 60%"
        const endValue= isMobile ? "120% top" : "bottom top"

       /*  const video = videoRef.current
        if (video){
            const proxy = {t:0}

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '#hero',
                    start: startValue,
                    end: endValue,
                    scrub: 0.3, // small smoothing
                    onUpdate: () => {
                    }
                }
            })

            // tween proxy.t from 0 to 1 as user scrolls; onUpdate set video.currentTime
            tl.to(proxy, {
                t: 1,
                ease: 'none',
                onUpdate: () => {
                    // only set when duration available
                    const d = video.duration
                    if (!d || isNaN(d)) return
                    const time = Math.max(0, Math.min(1, proxy.t)) * d
                    try{
                        video.currentTime = time
                    }catch(err){
                        // some browsers may throw if seeking too fast before interaction
                        console.debug('video seek error', err)
                    }
                }
            })

            const onLoaded = () => ScrollTrigger.refresh()
            video.addEventListener('loadedmetadata', onLoaded)

            // cleanup returns so useGSAP won't leak
            return () => {
                try{ video.removeEventListener('loadedmetadata', onLoaded) }catch(err){ console.debug(err) }
                try{ tl.scrollTrigger && tl.scrollTrigger.kill() }catch(err){ console.debug(err) }
                try{ tl.kill() }catch(err){ console.debug(err) }
            }
        } */


        //!out version 
        
       const tl=gsap.timeline({
            scrollTrigger:{
                trigger:"video",
                start:startValue,
                end:endValue,
                scrub:true,
                pin:true
            }
        })
        
        videoRef.current.onloadedmetadata=()=>{
            tl.to(videoRef.current,{
                currentTime:videoRef.current.duration
            })
        }

    },[])
// !download FFmpeg
// i have already downloaded it 
// navigate to piblic/videos
// then run this command
// ffmpeg -i input.mp4 -vf scale=960:-1 -movflags faststart -vcodec libx264 -crf 20 -g 1 -pix_fmt yuv420p output.mp4


    return (
       <>
           <section id='hero' className={"noisy"}>
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
           </section>

           <div className={"video absolute inset-0 "}>
               <video ref={videoRef} 
            //    src={"/videos/input.mp4"}
               src={"/videos/output.mp4"}
               muted={true}
               playsInline
               preload="auto"
               />
           </div>
       </>
    );
};

// the noisy apply background

export default Hero;