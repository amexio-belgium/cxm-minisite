import { $, component$, useSignal } from '@builder.io/qwik';

const items = [
    {
        icon:"face",
        copy:'01. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },{
        icon:"pets",
        copy:'02. Sed do eiusmod tempor incididunt ut labore.'
    },{
        icon:"stars",
        copy:'03. Consectetur adipiscing elit.'
    },{
        icon:"invert_colors",
        copy:'04. Ut enim ad minim veniam, quis nostrud exercitation.'
    },{
        icon:"psychology",
        copy:'05. Llamco nisi ut aliquip ex ea commodo consequat.'
    },{
        icon:"brightness_7",
        copy:'06. Misi ut aliquip ex ea commodo consequat.'
    }
];

const Card = (props) => {
  return (
    <li class="w-full h-full flex-[1_0_100%] p-8 bg-white">
      <span class="material-icons">{props.icon}</span>
      <p>{props.copy}</p>
    </li>
  )
}

const Carousel = component$((props) => {
    const moveClass = useSignal('');
    const carouselItems = useSignal(items);
    
    // const slidesContainer = document.getElementById("slides-container");
    // const slide = document.querySelector(".slide");

    const shiftPrev = $((copy) => {
        // const slideWidth = slide?.clientWidth;
        // if (slidesContainer && slideWidth) {
        //     slidesContainer.scrollLeft += slideWidth;
        // }
    })
    
    const shiftNext = $((copy) => {
        // const slideWidth = slide?.clientWidth;
        // if (slidesContainer && slideWidth) {
        //     slidesContainer.scrollLeft -= slideWidth;
        // }
    })
    
    return (
        <div class="overflow-hidden relative m-2">
            <div class="absolute w-full h-full z-10 flex justify-between items-center p-8">
                <button onclick$={shiftPrev} class="w-10 h-10 text-5xl text-black">
                    &#8249;                
                </button>
                <button onclick$={shiftNext} class="w-10 h-10 text-5xl text-black">
                    &#8250;
                </button>
            </div>
            
            <ul class={`flex h-96 flex-row w-full relative overflow-scroll scroll-smooth`}>
                {carouselItems.value.map((t, index) => 
                    <Card key={t.copy + index} icon={t.icon} copy={t.copy} />
                )}
            </ul>
        </div>
  )
});

export default Carousel;