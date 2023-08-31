import React, { useState, useEffect } from 'react'

function ConferencesPosters({posters}) {
  const len = posters.length
    const [prevImage, setprevImage] = useState(0)
    const [currentImage, setcurrentImage] = useState(1)
    const [nextImage, setnextImage] = useState(2)
      
    function setPrevIndex(){
        setnextImage(currentImage);
        setcurrentImage(prevImage);
        setprevImage((prevImage - 1 + len) % len);
    }
    function setNextIndex(){
        setprevImage(currentImage);
        setcurrentImage(nextImage);
        setnextImage((nextImage + 1) % len);
    }
    useEffect(() => {
        const timer = setInterval(() => {
          setNextIndex()
        }, 5000);
        return () => {
          clearInterval(timer); 
        };
      }, [setPrevIndex, setNextIndex]);
    
      if (posters.length <3){
        return(
            <div className='h-full flex justify-center items-center'>
                <p className='text-9xl animate-pulse'>CONFERENCE</p>
            </div>
        )
    }

      return (
      <div className='flex justify-between px-48 pt-10'>
            <div className='w-72 h-72 p-20 '>
                <img className='transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300 object-fill h-full w-full border-2 border-black' onClick={setPrevIndex} src={posters[prevImage].image_link}/>
            </div>
            <div className='w-96 h-48 border-2 border-black transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300 '>
                <img className='object-fill h-full w-full' src={posters[currentImage].image_link}/>
            </div>
            <div className='w-72 h-72 p-20 '>
                <img className='transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300 object-fill h-full w-full border-2 border-black' onClick={setNextIndex} src={posters[nextImage].image_link}/>
            </div>
      </div>
  )
}

export default ConferencesPosters