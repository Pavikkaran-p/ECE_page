import React, { useEffect, useState } from 'react'

function EventsPosters({posters}) {
    const len = posters.length
    const [prevImage_1, setprevImage_1] = useState(0)
    const [nextImage_1, setnextImage_1] = useState(4)
    const [prevImage, setprevImage] = useState(1)
    const [currentImage, setcurrentImage] = useState(2)
    const [nextImage, setnextImage] = useState(3)
      
    function setPrevIndex(){
        setnextImage_1(nextImage)
        setnextImage(currentImage);
        setcurrentImage(prevImage);
        setprevImage(prevImage_1);
        setprevImage_1((prevImage - 1 + len) % len)
    }
    function setNextIndex(){
        setprevImage_1(prevImage)
        setprevImage(currentImage);
        setcurrentImage(nextImage);
        setnextImage(nextImage_1);
        setnextImage_1((nextImage + 1) % len)
    }
    useEffect(() => {
        const timer = setInterval(() => {
          setNextIndex()
        }, 5000);
        return () => {
          clearInterval(timer); 
        };
      }, [setPrevIndex, setNextIndex]);
    
      if (posters.length <5){
        return(
            <div className='h-full flex justify-center items-center'>
                <p className='text-9xl animate-pulse'>EVENTS</p>
            </div>
        )
    }

      return (
      <div className='flex justify-between px-32 pt-10'>
            <div className='w-96 h-48 py-8 pr-20'>
                <img className='transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300 object-fill h-full w-full border-2 border-black' onClick={setPrevIndex} src={posters[prevImage_1].image_link}/>
            </div>
            <div className='w-96 h-48 py-8 pr-20'>
                <img className='transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300 object-fill h-full w-full border-2 border-black' onClick={setPrevIndex} src={posters[prevImage].image_link}/>
            </div>
            <div className='w-96 h-52 border-2 border-black transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300 '>
                <img className='object-fill h-full w-full' src={posters[currentImage].image_link}/>
            </div>
            <div className='w-96 h-48 py-8 pl-20'>
                <img className='transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300 object-fill h-full w-full border-2 border-black' onClick={setNextIndex} src={posters[nextImage].image_link}/>
            </div>
            <div className='w-96 h-48 py-8 pl-20'>
                <img className='transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300 object-fill h-full w-full border-2 border-black' onClick={setNextIndex} src={posters[nextImage_1].image_link}/>
            </div>
      </div>
  )
}

export default EventsPosters