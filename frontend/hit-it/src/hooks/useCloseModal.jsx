import {useEffect, useRef} from 'react'

const useCloseModal = (handler) => {
    let ref=useRef();

    useEffect(() => {
      let event_handler=(event)=> {
        if (!ref?.current?.contains(event.target)){
          handler();
        }
      };
  
      document.addEventListener("mousedown",event_handler);
  
      return()=> {
        document.removeEventListener("mousedown",event_handler);
      };
    });
    return ref;
}

export default useCloseModal