import "./Home.css";
import flowersImage from "../assets/chocolates.png";
import flowersImage2 from "../assets/flowers2.png";
import ImageTrail from "./ImageTrail";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import ScrollReveal from './ScrollReveal';
import { motion, useScroll, useTransform } from "framer-motion";
import { FaQuoteRight } from "react-icons/fa";
import { FaQuoteLeft } from "react-icons/fa";
import LogoLoop from './LogoLoop';
import usImage from "../assets/us.jpg";
import DomeGallery from './DomeGallery';
import divineImage from "../assets/divine.jpg";
import danielImage from "../assets/daniel.png";
import macImage from "../assets/mac.png";
import frankImage from "../assets/frank.png";
import video1 from "../assets/1.mp4";
import flowersImage1 from "../assets/ted.png";

import flowersImage3 from "../assets/cakes.png";

// Import your memory images
import image2 from "../assets/2.jpg";
import image3 from "../assets/3.jpg";
import image4 from "../assets/4.jpg";
import image5 from "../assets/5.jpg";
import image6 from "../assets/6.jpg";
import image7 from "../assets/7.jpg";
import image8 from "../assets/8.jpg";
import image9 from "../assets/9.jpg";
import new8 from "../assets/new.jpg";
import new7 from "../assets/new7.jpg";
import new6 from "../assets/new6.jpg";
import new5 from "../assets/new5.jpg";
import new4 from "../assets/new4.jpg";
import new3 from "../assets/new3.jpg";
import new2 from "../assets/new2.jpg";
import new1 from "../assets/new1.jpg";
function Home() {
  const heroRef = useRef(null);
  const horizontalRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const filter = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["blur(0px)", "blur(5px)", "blur(10px)"]
  );
  
  const [logoHeight, setLogoHeight] = useState(700);

  useEffect(() => {
    const updateLogoHeight = () => {
      if (window.innerWidth <= 375) {
        setLogoHeight(220);
      } else if (window.innerWidth <= 480) {
        setLogoHeight(250);
      } else if (window.innerWidth <= 600) {
        setLogoHeight(300);
      } else if (window.innerWidth <= 768) {
        setLogoHeight(350);
      } else if (window.innerWidth <= 1024) {
        setLogoHeight(400);
      } else if (window.innerWidth <= 1366) {
        setLogoHeight(450);
      } else {
        setLogoHeight(700);
      }
    };

    updateLogoHeight();
    window.addEventListener('resize', updateLogoHeight);
    return () => window.removeEventListener('resize', updateLogoHeight);
  }, []);

  const techLogos = [
    { src: usImage, alt: "Us", caption: "2023" },
    { src: usImage, alt: "Us", caption: "2024" },
    { src: usImage, alt: "Us", caption: "2025" },
    { src: usImage, alt: "Us", caption: "2026" },
    { src: usImage, alt: "Us", caption: "Forever" },  
  ];

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 0.7, 0.3]
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    // Smooth Scroll
    ScrollSmoother.create({
      smooth: 1.5,
      effects: true,
      smoothTouch: 0.1,
    });

    // Panel Snapping for hero and text sections
    let panels = gsap.utils.toArray(".panel:not(.black):not(.horizontal-panel)");

    panels.forEach(panel => {
      ScrollTrigger.create({
        trigger: panel,
        start: () =>
          panel.offsetHeight < window.innerHeight
            ? "top top"
            : "bottom bottom",
        pin: true,
        pinSpacing: false
      });
    });

    // HORIZONTAL SCROLL SECTION
    const horizontalSections = gsap.utils.toArray(".horizontal-panel");
    if (horizontalSections.length > 0) {
      const duration = 10;
      const sectionIncrement = duration / (horizontalSections.length - 1);
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".horizontal-container",
          pin: true,
          scrub: 1,
          snap: 1 / (horizontalSections.length - 1),
          start: "top top",
          end: "+=5000"
        }
      });

      tl.to(horizontalSections, {
        xPercent: -100 * (horizontalSections.length - 1),
        duration: duration,
        ease: "none"
      });

      // Fade/scale animations
      horizontalSections.forEach((section, index) => {
        let tween = gsap.from(section, {
          opacity: 0,
          scale: 0.6,
          duration: 1,
          force3D: true,
          paused: true
        });

        const addSectionCallbacks = (timeline, { start, end, onEnter, onLeave, onEnterBack, onLeaveBack }) => {
          let trackDirection = animation => {
            let onUpdate = animation.eventCallback("onUpdate"),
              prevTime = animation.time();
            animation.direction = animation.reversed() ? -1 : 1;
            animation.eventCallback("onUpdate", () => {
              let time = animation.time();
              if (prevTime !== time) {
                animation.direction = time < prevTime ? -1 : 1;
                prevTime = time;
              }
              onUpdate && onUpdate.call(animation);
            });
          };
          const empty = v => v;
          timeline.direction || trackDirection(timeline);
          start >= 0 && timeline.add(() => ((timeline.direction < 0 ? onLeaveBack : onEnter) || empty)(), start);
          end <= timeline.duration() && timeline.add(() => ((timeline.direction < 0 ? onEnterBack : onLeave) || empty)(), end);
        };

        addSectionCallbacks(tl, {
          start: sectionIncrement * (index - 0.99),
          end: sectionIncrement * (index + 0.99),
          onEnter: () => tween.play(),
          onLeave: () => tween.reverse(),
          onEnterBack: () => tween.play(),
          onLeaveBack: () => tween.reverse()
        });
        
        index || tween.progress(1);
      });
    }

    // Stacking Cards Section
    gsap.set(".block", { zIndex: (i, target, targets) => targets.length - i });

    var images = gsap.utils.toArray(".block:not(:last-of-type)");

    images.forEach((image, i) => {
      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: "section.black",
          start: () => "top -" + window.innerHeight * (i + 0.5),
          end: () => "+=" + window.innerHeight,
          scrub: true,
          toggleActions: "play none reverse none",
          invalidateOnRefresh: true
        }
      });

      tl.to(image, { height: 0 });
    });

    gsap.set(".panel-text", { zIndex: (i, target, targets) => targets.length - i });

    var texts = gsap.utils.toArray(".panel-text");

    texts.forEach((text, i) => {
      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: "section.black",
          start: () => "top -" + window.innerHeight * i,
          end: () => "+=" + window.innerHeight,
          scrub: true,
          toggleActions: "play none reverse none",
          invalidateOnRefresh: true
        }
      });

      tl.to(text, { duration: 0.33, opacity: 1, y: "50%" }).to(
        text,
        { duration: 0.33, opacity: 0, y: "0%" },
        0.66
      );
    });

    ScrollTrigger.create({
      trigger: "section.black",
      scrub: true,
      pin: true,
      start: () => "top top",
      end: () => "+=" + (images.length + 1) * window.innerHeight,
      invalidateOnRefresh: true
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      ScrollSmoother.get()?.kill();
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div className="home-container">
          {/* HERO SECTION */}
          <motion.section
            ref={heroRef}
            className="panel hero-panel"
            style={{ filter, opacity }}
          >
            <p className="corner-text left">I LOVE YOU</p>
            <p className="corner-text right">FOREVER & ALWAYS</p>

            <main className="main-content trail-section">
              <ImageTrail
                items={[
                  flowersImage,
                  flowersImage1,
                  flowersImage2,
                  flowersImage3,
                 flowersImage,
                  flowersImage1,
                  flowersImage2,
                  flowersImage3,
                ]}
                variant={1}
              />

              <div className="text-side">
                <div className="heading-group">
                  <div className="title-wrapper">
                    <h1 className="main-title">
                      <span className="word word-1">
                        <span className="big-h">H</span>appy
                      </span>
                      <span className="word word-2 highlight-love">
                        <span className="big-v">V</span>alentines
                      </span>
                    </h1>
                  </div>
                </div>
              </div>
            </main>
            <footer className="hero-footer">
  Truly Yours,<span className="klent"> Klent</span>
</footer>

          </motion.section>

          {/* TEXT SECTION */}
          <section className="panel second-panel">
            <ScrollReveal
              baseOpacity={0.1}
              enableBlur
              baseRotation={3}
              blurStrength={4}
            >
              <span className="base-text">Before you, I didn't know that</span> <span className="heart-glow">love</span> <span className="base-text">could feel like</span> <span className="warm-embrace">coming home</span><span className="base-text">. That a single touch could speak</span> <span className="soft-blush">volumes</span><span className="base-text">, that a smile could</span> <span className="warm-embrace">heal wounds</span> <span className="base-text">I didn't know I carried. You are the</span> <span className="heart-glow">answer</span> <span className="base-text">to questions I never thought to ask, the</span> <span className="soft-blush">dream</span> <span className="base-text">I'm blessed to live every day.</span>
            </ScrollReveal>
          </section>

          {/* CAROUSEL SECTION */}
          {/* <div className="carousel-section">
            <LogoLoop
              logos={techLogos}
              speed={40}
              direction="left"
              logoHeight={logoHeight}
              gap={80}
              pauseOnHover={false}
              scaleOnHover
              ariaLabel="Our memories"
            />
          </div> */}

          {/* HORIZONTAL SCROLL SECTION */}
         {/* HORIZONTAL SCROLL SECTION */}
<div className="horizontal-container" ref={horizontalRef}>
  {/* Panel 1 - Multiple Photos Scrapbook Style */}
<section className="horizontal-panel scrapbook-panel" style={{
  backgroundImage: `url(${divineImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
}}>
  <div className="scrapbook-overlay"></div>
  
  <div className="scrapbook-content">
    <div className="scrapbook-header">
      <span className="page-number left"></span>
      <div className="header-text">
       <span className="you-text">
  <span className="big-y">Y</span>ou too
</span>

        <span className="divine-text"> divine </span>
        <br />
        <span className="to-text"> to just be </span>
             <span className="you-text">
     <span className="big-y">M</span>ine</span>
      </div>
      <span className="page-number right"></span>
    </div>

  
  </div>
</section>

  
  
<section className="horizontal-panel scrapbook-panel">
 <div className="vinyl-scrapbook-header">

  <div className="vinyl-header-text">
    <span className="vinyl-you-text">You </span>
    <span className="vinyl-remind-text">remind me </span>
    <span className="vinyl-of-text">of</span>
    <br />
    <span className="vinyl-the-text">the color </span>
    <span className="vinyl-blue-text">Blue</span>
  </div>

</div>

<div className="vinyl-scrapbook-grid">
  <div className="vinyl-photo-item vinyl-photo-left">
    <div className="vinyl-album-container">
      <img src={danielImage} alt="Daniel album" className="vinyl-album-cover" />
    </div>
<div className="vinyl-photo-caption vinyl-caption-left">
  <span className="vinyl-caption-italic">
    <span className="vinyl-caption-bold">Always</span>, my love for you ain't goin' nowhere.   {""}
  </span>

  <span className="vinyl-caption-italic">
       {""} <span className="vinyl-caption-bold">Always</span>, I will be here.
  </span>
</div>


  </div>

  <div className="vinyl-photo-item vinyl-photo-center">
    <div className="vinyl-album-container">
      <img src={macImage} alt="Mac album" className="vinyl-album-cover" />
    </div>
<div className="vinyl-photo-caption vinyl-caption-center">

<span className="vinyl-caption-italic">
  The sun <span className="vinyl-caption-bold">don't shine</span> when I'm alone.
</span>

<span className="vinyl-caption-italic">
  I   {""}  {""}<span className="vinyl-caption-bold">lose my mind</span> . 
</span>

<span className="vinyl-caption-italic">
   I see your <span className="vinyl-caption-bold">eyes</span>.
</span>

<span className="vinyl-caption-italic">
   This is all I <span className="vinyl-caption-bold">know</span>.
</span>

</div>  
  </div>

<div className="vinyl-photo-item vinyl-photo-right">
  <div className="vinyl-album-container">
    <img src={frankImage} alt="Frank album" className="vinyl-album-cover" />
  </div>

  <div className="vinyl-photo-caption vinyl-caption-right">
    <span className="vinyl-caption-italic">
      I <span className="vinyl-caption-bold">care</span> for you still, and I will 
      <span className="vinyl-caption-bold"> forever</span>.
    </span>

    <span className="vinyl-caption-italic">
      That was my part of the <span className="vinyl-caption-bold">deal</span>, 
      <span className="vinyl-caption-bold"> honest</span>.
    </span>
  </div>
</div>

</div>

 
</section>


 <section className="horizontal-panel scrapbook-panel">
    <div className="text-side">
                <div className="heading-group">
                  <div className="title-wrapper1">
                    <h1 className="main-title">
                      <span className="word word-1">
                        <span className="big-h">G</span>irl I'm so
                      </span>
                      <span className="word word-2 highlight-love">
                        <span className="big-v">I</span>n love with you
                      </span>
                    </h1>
                  </div>
                </div>
              </div>
  </section> 


</div>

  {/* <section className="horizontal-panel scrapbook-panel">
    <div className="scrapbook-header">
      <span className="page-number left"></span>
      <div className="header-text">
        <span className="you-text">You too</span>
        <span className="divine-text">divine</span>
        <span className="to-text">to just be</span>
        <span className="mine-text">[ MINE ]</span>
      </div>
      <span className="page-number right"></span>
    </div>

    <div className="scrapbook-grid">
      <div className="photo-item photo-left">
        <img src={usImage} alt="Our moment" />
        <span className="photo-caption caption-red">dear diary..</span>
      </div>

      <div className="photo-item photo-center">
        <img src={usImage} alt="Our memory" />
        <span className="photo-caption caption-red">my pretty girl</span>
      </div>

      <div className="photo-item photo-right">
        <img src={usImage} alt="Us together" />
      </div>
    </div>
  </section> */}

  
          {/* STACKING CARDS SECTION */}
<section className="panel black">
  {/* Video - First Meet */}
  <div className="block">
    <div className="card">
      <div className="card-text">
        <h2>The Day Our <br /> Stars Aligned</h2>
        <p>From the very first moment I saw you, something inside me just knew. It wasn't just your smile or the way you carried yourself—it was everything. Your personality, your kindness, the way you spoke, the way you treated others. I fell for who you are at your core, not just what I saw on the surface. In that crowded room, time stopped, and I didn't know it yet, but I was already falling in love with the person who would become my everything.</p>
        <span>— First Meet, May 3, 2023</span>
      </div>
 <div className="card-video">
  <video 
    src={video1}  // Use the imported variable instead!
    autoPlay 
    loop 
    muted 
    playsInline
    className="memory-video"
  />
</div>
    </div>
  </div>

  {/* Image 2 - First Date */}
  <div className="block wow">
    <div className="card">
      <div className="card-text">
        <h2>Where <br />Forever  Began</h2>
        <p>Our first date confirmed everything I already felt. Nervous laughter turned into comfortable conversations, stolen glances became genuine smiles. That day, I realized I didn't just like you—I wanted you. I wanted every moment with you, every laugh, every story, every silence. Being with you felt effortless, natural, like coming home. That's when I knew: you're the one I want to spend all my days with. You made happiness feel so simple, so real.</p>
        <span>— First Date, June 9, 2023</span>
      </div>
      <div className="card-image">
        <img src={image2} alt="Where Forever Began" className="memory-image" />
      </div>
    </div>
  </div>
  {/* Image 4 - Dance Competition */}
  <div className="block ">
    <div className="card">
      <div className="card-text">
        <h2>You Were My <br /> Champion Too</h2>
        <p>When I competed, you were there—cheering louder than anyone, believing in me even when I doubted myself. You watched every move, celebrated every step, and when I won, the only person I wanted to run to was you. Thank you for being my biggest supporter, my loudest cheerleader, and the person who makes me feel like I can do anything. Your pride in me means more than any trophy ever could. You make me want to be better, to push harder, to reach higher—because I know you'll always be there, proud of me no matter what.</p>
        <span>— Dance Competition, December 7, 2023</span>
      </div>
      <div className="card-image">
        <img src={image4} alt="You Were My Champion Too" className="memory-image" />
      </div>
    </div>
  </div>
  {/* Image 3 - First Travel */}
  <div className="block wow">
    <div className="card">
      <div className="card-text">
        <h2>Our First <br /> Adventure</h2>
        <p>New places, long roads, endless conversations, and the realization that home isn't a place—it's being next to you. Every trip we take together is a memory I treasure. From quiet moments watching the world go by to spontaneous detours and laughter that echoes for miles, you make every journey unforgettable. This was just the beginning of all the adventures we'll share.</p>
        <span>— First Luwas, January 9, 2024</span>
      </div>
      <div className="card-image">
        <img src={image3} alt="Our First Adventure" className="memory-image" />
      </div>
    </div>
  </div>



  {/* Image 5 - First Valentine's */}
  <div className="block">
    <div className="card">
      <div className="card-text">
        <h2>Love in <br /> Full Bloom</h2>
        <p>Our first Valentine's together—a day dedicated to celebrating what we already feel every single day. With you, every moment is a celebration of love, but this day was ours to pause, to reflect, and to say: I choose you, today and always. You've turned ordinary days into extraordinary memories, and I can't wait to celebrate a lifetime of Valentine's Days with you.</p>
        <span>— First Valentine's, March 17, 2024</span>
      </div>
      <div className="card-image">
        <img src={image5} alt="Love in Full Bloom" className="memory-image" />
      </div>
    </div>
  </div>

  {/* Image 6 - Museums & Gala */}
  <div className="block wow">
    <div className="card">
      <div className="card-text">
        <h2>Walking <br /> Through Beauty</h2>
        <p>Exploring museums, wandering through galleries, cafe hopping, and finding beauty in every corner of the city—but you remain the most captivating masterpiece. These are just the beginning of all the gala we'll have together. More adventures await: more museums, more cafes, more spontaneous photoshoots, more "kaartehan" moments. With you, even the simplest outing becomes an unforgettable memory. Here's to a lifetime of exploring the world together.</p>
        <span>— Museum Adventures, June 8, 2024</span>
      </div>
      <div className="card-image">
        <img src={image6} alt="Walking Through Beauty" className="memory-image" />
      </div>
    </div>
  </div>

  {/* Image 7 - First Photobooth & Polaroid */}
  <div className="block">
    <div className="card">
      <div className="card-text">
        <h2>Captured in <br />Four Frames</h2>
        <p>Our first photobooth together! Sobrang saya ko kasi finally, we did it. Silly faces, genuine laughter, stolen kisses, and those candid moments that show exactly who we are together—happy, carefree, in love. Ang cute natin, hayup! And that first polaroid we took together? The one we both dreamed about? Holding it in our hands felt surreal. These little moments, these captured memories—they're proof that joy looks like us, that love feels like this. I'll treasure these photos forever.</p>
        <span>— First Photobooth & Polaroid, August 15, 2024</span>
      </div>
      <div className="card-image">
        <img src={image7} alt="Captured in Four Frames" className="memory-image" />
      </div>
    </div>
  </div>

  {/* Image 8 - Her Birthday */}
  <div className="block wow">
    <div className="card">
      <div className="card-text">
        <h2>The Day the <br />World Got Brighter</h2>
        <p>Your birthday was one of my biggest achievements—seeing you surprised, seeing you smile, making you feel special on your day. Everything you wanted, I made sure you got it. Lahat ng gusto mo, binigay ko, kasi deserve mo. Seeing your happiness made everything worth it. And this is just the beginning—sa future, ganoon pa rin. I'll always work hard for you, always make sure you feel loved and celebrated, because for me, making you happy is priceless. Your joy is my greatest reward, and I'll spend my life giving you reasons to smile.</p>
        <span>— Your Birthday, November 30, 2024</span>
      </div>
      <div className="card-image">
        <img src={image8} alt="The Day the World Got Brighter" className="memory-image" />
      </div>
    </div>
  </div>

  {/* Image 9 - Forever Message */}
  <div className="block">
    <div className="card">
      <div className="card-text">
        <h2>Forever Grateful, Forever Yours</h2>
        <p>Arielle, I love you so much—forever and always. I pray that all our dreams come true, especially yours. I want to see you achieve everything you've ever hoped for, and I'll be right there beside you, supporting you every step of the way. Remember this always: no matter what situation we face—whether it's hard or easy, high or low—I'll always be here. I'm ready to sacrifice for you, I'll always choose you, and I hope you never change who you are. I hope it's always us, until the very end. I will never leave you, no matter what happens. I'm forever grateful that I met you. I don't regret a single moment of knowing you, of loving you. You are my everything, and I love you unconditionally. Thank you for your support, for your love, for everything you are. You make my life complete. Mahal na mahal kita, Ayen. Forever.</p>
        <span>— Always & Forever ∞</span>
      </div>
      <div className="card-image">
        <img src={image9} alt="Forever Grateful, Forever Yours" className="memory-image" />
      </div>
    </div>
  </div>

<DomeGallery
  images={[
    { src: usImage, alt: "Us" },
    { src: image2, alt: "Us" },
    { src: image3, alt: "Us" },
    { src: image4, alt: "Us" },
    { src: new1, alt: "Us" },
    { src: image6, alt: "Us" },
    { src: new2, alt: "Us" },
    { src: new3, alt: "Us" },
    { src: new4, alt: "Us" },
    { src: new5, alt: "Us" },
    { src: new6, alt: "Us" },
    { src: new7, alt: "Us" },
    { src: new8, alt: "Us" },
  ]}
  fit={1.3}
  minRadius={2000}
  maxVerticalRotationDeg={5}
  segments={26}
  dragDampening={0}
  grayscale={true}  // CHANGE THIS FROM false TO true
  overlayBlurColor="transparent"
  imageBorderRadius="12px"
  openedImageBorderRadius="20px"
  openedImageWidth="500px"
  openedImageHeight="700px"
/>
</section>
        </div>
      </div>
    </div>
  );
}

export default Home;