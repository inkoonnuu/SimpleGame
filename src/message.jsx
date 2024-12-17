import { useEffect, useRef } from "react";
import { data } from "../public/data/data";
import mp32 from "../public/haha.mp3";



const Message = ({ player1, player2,images,reset }) => {
    const container=useRef()
    const message=useRef()
    useEffect(()=>{
if(images.length==0){
    container.current.classList.remove('hidden')
    message.current.classList.remove('scale-0')
    message.current.classList.add('scale-[1.2]')
    audio2.current.play()
    document.body.classList.add('sc')
}
    },[images])
    const audio2=useRef()

  return (
    <div ref={container} className="overscroll-none dialog h-svh w-full bg-black/80 fixed top-0 left-0 z-30 hidden">
          <audio src={mp32} ref={audio2}></audio>

      <div ref={message}
        className="fixed top-1/2 -translate-y-1/2 left-1/2 flex justify-center flex-col -translate-x-1/2 bg-white z-50 w-[80%] sm:w-[70%] md:w-[40%] h-[300px] rounded-lg shadow-lg scale-0  "
        style={{
          background:
            "url(https://i.pinimg.com/originals/12/4d/e3/124de3d1b5e12f1d8fcec1685e634361.gif)",
        }}
      >
        <div className="content flex flex-col h-20 items-center justify-between ">
          {player1.score - player2.score !== 0 ? (
            <h1 className="text-xl font-semibold ">
              {" "}
              VERY NICE{" "}
              {player1.score > player2.score ? player1.name : player2.name} IS
              WINER{" "}
            </h1>
          ) : (
            <h1 className="text-xl font-semibold ">Nobody won (Draw)</h1>
          )}
          <button onClick={()=>{
             container.current.classList.add('hidden')
             message.current.classList.add('scale-0')
             message.current.classList.remove('scale-[1.2]')
reset()

          }} className="w-[50%] mx-auto h-10  text-white bg-yellow-500 rounded-lg tracking-wider">
            REPLAY
            
          </button>
        </div>
      </div>
    </div>
  );
};
export default Message;
