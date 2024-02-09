document.querySelector('#main').scrollIntoView({ 
    behavior: 'smooth' 
  });

const sections = ['decor', 'fashion', 'plants', 'food'];
const texts = document.querySelectorAll('.text');
const circles = document.querySelectorAll('.circle');
const dots = document.querySelectorAll('.dotted');
const dotColors = ['rgb(97, 140, 123)', 'rgb(0, 118, 211)', 'rgb(64, 122, 87)', 'rgb(194, 139, 0)'];

// Set initial positions
gsap.set(texts, { yPercent: 100, opacity: 0 });
gsap.set(dots, { xPercent: -10, opacity: 0 });

// Create a master timeline
const masterTimeline = gsap.timeline({ repeat: -1 });

// Define animations
function animateText(tl, index, sectionIndex) {
    tl.to(texts[index], {
        duration: 0.5,
        yPercent: 0,
        opacity: 1,
        delay: 0.5
    });
}

function completeText(tl, index, sectionIndex) {
    tl.to(texts[index], {
        duration: 0.5,
        yPercent: -100,
        opacity: 0,
        onComplete: () => tl.to(texts[index], {
            yPercent: 100
        })
    });
}

function animateDot(tl, index) {
    tl.to(dots[index], {
        duration: 0.5,
        xPercent: 0,
        opacity: 1
    });
}

function completeDot(tl, index) {
    tl.to(dots[index], {
        duration: 0.5,
        xPercent: 10,
        opacity: 0,
        onComplete: () => tl.to(dots[index], {
            xPercent: -10
        })
    });
}

function changeCircleColor(index) {
    const circle = circles[0];
    const color = dotColors[index];
    gsap.to(circle, {
        backgroundColor: color,
        duration: 0.5,
        delay: 0.5
    });
}

// Apply animations to each section
sections.forEach((section, index) => {
    const items = document.querySelectorAll(`.${section} .item .single-item`);

    const tl = gsap.timeline();

    const sectionTimeline = gsap.timeline({
        onStart: () => {
            animateText(tl, index, index + 1);
            animateDot(tl, index);
            changeCircleColor(index);
        },
        onComplete: () => {
            completeText(tl, index, index + 1);
            completeDot(tl, index);
        }
    });

    sectionTimeline.from(items, {
        opacity: 0,
        y: '10%',
        stagger: 0.1,
        ease: 'power2.inOut',
        duration: 0.5,
    });

    sectionTimeline.to(items, {
        opacity: 0,
        y: '-10%',
        stagger: 0.1,
        ease: 'power2.inOut',
        duration: 0.5,
    });

    masterTimeline.add(sectionTimeline);
});

// Adjust the delay between sections
masterTimeline.timeScale(0.5);

// Circle arrow animation
const circle = document.querySelectorAll('.circle');

const tl = gsap.timeline({
    repeat: -1,
    repeatDelay: 0.1,
    yoyo: true,
});

tl.to(circle, {
    y: '-50%',
    ease: "power1.out",
    duration: 0.8,
});


