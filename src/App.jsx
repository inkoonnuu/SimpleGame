

import { useEffect, useRef, useState } from "react";
import mp3 from "../public/Mouse Click - Sound Effect (HD).mp3";
import mp31 from "../public/win.mp3";
import { data } from "../public/data/data";
import Message from "./message";
const App = () => {
  const [images, setimgs] = useState(data.sort(() => Math.random() - 0.5));
  const [currentItems, setcurrentItems] = useState([]);
  const [TheTurn, setTheTurn] = useState(0);

  const [player1, setPlayer1] = useState({
    id: 999,
    name: "PLAYER1",
    play: true,
    score: 0,
  });
  const [player2, setPlayer2] = useState({
    id: 888,
    name: "PLAYER2",
    play: false,
    score: 0,
  });

  const TurnSwitch = (v1, v2) => {
    setPlayer1({ ...player1, play: v1 });
    setPlayer2({ ...player2, play: v2 });
  };

  const IncrementScore = (func, obj) => {
    func(obj.play ? { ...obj, score: obj.score + 1 } : obj);
  };
  function reset(){
    setimgs(data)
    setPlayer1({  id: 999,
      name: "PLAYER1",
      play: true,
      score: 0,})
      setPlayer2({  id: 888,
      name: "PLAYER2",
      play: false,
      score: 0,})
      setTheTurn(0)
  }

  useEffect(() => {
    if (TheTurn % 2 == 0) {
      TurnSwitch(true, false);
    } else {
      TurnSwitch(false, true);
    }
  }, [TheTurn]);

  useEffect(() => {
    if (currentItems.length == 2) {
      {
        const [firstItem, secondItem] = currentItems;
        if (firstItem.type == secondItem.type) {
          audio1.current.play();

          setTimeout(() => {
            setimgs(images.filter((item) => item.type != secondItem.type));
            setcurrentItems([]);

            IncrementScore(setPlayer1, player1);
            IncrementScore(setPlayer2, player2);
          }, 2000);
        } else {
          setTimeout(() => {
            setimgs(
              images.map((item) => {
                return { ...item, visible: false };
              })
            );
            setcurrentItems([]);
            setTheTurn((TheTurn) => TheTurn + 1);
          }, 2000);
        }
      }
    }
  }, [currentItems]);
  const audio = useRef();
  const audio1 = useRef();

  return (
    <div>
      <Message player1={player1} player2={player2} reset={reset} images={images}/>
      <h1 className="text-[2rem] sm:text-[4rem] text-white text-center p-5 text-2xl capitalize font-bold tracking-wider">
        Hicham Friv{" "}
      </h1>
      <section className="rounded-lg mb-5 bg-yellow-500 min-h-[300px] w-[60%] grid grid-cols-3 sm:grid-cols-4 gap-1 mx-auto place-content-between place-items-center   px-2 py-2">
        {images.map((img) => {
          return (
            <div className="flex justify-center items-center    w-[60px] h-[60px]">
              <img
                key={img.id}
                className={`im h-full w-full rounded-lg cursor-pointer border ${
                  img.visible ? "img" : ""
                }`}
                src={img.image}
                alt=""
                onClick={() => {
                  if (currentItems.length < 2) {
                    audio.current.currentTime = 0;
                    audio.current.play();

                    setimgs(
                      images.map((item) => {
                        if (item.id == img.id) {
                          return { ...item, visible: true };
                        }
                        return item;
                      })
                    );
                    if (currentItems.length == 0) {
                      setcurrentItems([...currentItems, img]);
                    } else if (currentItems.length > 0) {
                      if (currentItems[0].id !== img.id) {
                        setcurrentItems([...currentItems, img]);
                      }
                    }
                  }
                }}
              />
            </div>
          );
        })}
      </section>

      <div className="users flex justify-between px-2">
        <div
          className="player1 font-bold  border bg-blue-400 p-2 rounded-md text-white"
          style={{ opacity: player1.play ? 1 : 0.5 }}
        >
          <h1>{player1.name}</h1>
          <h1 className="text-center">
            <mark className="px-1 rounded-md">{player1.score}</mark>
          </h1>
        </div>
        <div
          className="player2 font-bold  bg-red-500 p-2 rounded-md text-white"
          style={{ opacity: player2.play ? 1 : 0.3 }}
        >
          <h1>{player2.name}</h1>
          <h1 className="text-center">
            <mark className="px-1 rounded-md">{player2.score}</mark>
          </h1>
        </div>
      </div>
      
      <audio src={mp3} ref={audio}></audio>
      <audio src={mp31} ref={audio1}></audio>
    </div>
  );
};
export default App;
