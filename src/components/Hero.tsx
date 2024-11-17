"use client";

import gsap from "gsap";
import { useEffect } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  useEffect(() => {
    const wordList = document.querySelector("[data-looping-words-list]");

    if (!wordList) {
      return;
    }

    const words = Array.from(wordList.children);
    const totalWords = words.length;
    const wordHeight = 100 / totalWords;
    const edgeElement = document.querySelector("[data-looping-words-selector]");
    let currentIndex = 0;
    function updateEdgeWidth() {
      if (!wordList) {
        return;
      }

      const centerIndex = (currentIndex + 1) % totalWords;
      const centerWord = words[centerIndex];
      const centerWordWidth = centerWord.getBoundingClientRect().width;
      const listWidth = wordList.getBoundingClientRect().width;
      const percentageWidth = (centerWordWidth / listWidth) * 100;
      gsap.to(edgeElement, {
        width: `${percentageWidth}%`,
        duration: 0.8,
        ease: "Expo.easeOut",
      });
    }
    function moveWords() {
      currentIndex++;
      gsap.to(wordList, {
        yPercent: -wordHeight * currentIndex,
        duration: 1.2,
        ease: "elastic.out(1, 0.85)",
        onStart: updateEdgeWidth,
        onComplete: function () {
          if (currentIndex >= totalWords - 1) {
            wordList!.appendChild(wordList!.children[0]);
            currentIndex--;
            gsap.set(wordList, { yPercent: -wordHeight * currentIndex });
            words.push(words.shift()!);
          }
        },
      });
    }
    updateEdgeWidth();
    gsap
      .timeline({ repeat: -1, delay: 1 })
      .call(moveWords)
      .to({}, { duration: 2 })
      .repeat(-1);
  }, []);

  return (
    <section className="flex flex-col h-full items-center gap-20">
      <div className="flex flex-col gap-5">
        <section className="cloneable">
          <div className="looping-words">
            <div className="looping-words__containers">
              <ul data-looping-words-list="" className="looping-words__list">
                <li className="looping-words__list">
                  <p className="looping-words__p">impact</p>
                </li>
                <li className="looping-words__list">
                  <p className="looping-words__p">play</p>
                </li>
                <li className="looping-words__list">
                  <p className="looping-words__p">fund</p>
                </li>
                <li className="looping-words__list">
                  <p className="looping-words__p">win</p>
                </li>
                <li className="looping-words__list">
                  <p className="looping-words__p">impact</p>
                </li>
                <li className="looping-words__list">
                  <p className="looping-words__p">play</p>
                </li>
                <li className="looping-words__list">
                  <p className="looping-words__p">fund</p>
                </li>
                <li className="looping-words__list">
                  <p className="looping-words__p">win</p>
                </li>
                <li className="looping-words__list">
                  <p className="looping-words__p">impact</p>
                </li>
                <li className="looping-words__list">
                  <p className="looping-words__p">play</p>
                </li>
                <li className="looping-words__list">
                  <p className="looping-words__p">fund</p>
                </li>
                <li className="looping-words__list">
                  <p className="looping-words__p">win</p>
                </li>
                <li className="looping-words__list">
                  <p className="looping-words__p">impact</p>
                </li>
                <li className="looping-words__list">
                  <p className="looping-words__p">play</p>
                </li>
                <li className="looping-words__list">
                  <p className="looping-words__p">fund</p>
                </li>
                <li className="looping-words__list">
                  <p className="looping-words__p">win</p>
                </li>
                <li className="looping-words__list">
                  <p className="looping-words__p">impact</p>
                </li>
                <li className="looping-words__list">
                  <p className="looping-words__p">play</p>
                </li>
                <li className="looping-words__list">
                  <p className="looping-words__p">fund</p>
                </li>
                <li className="looping-words__list">
                  <p className="looping-words__p">win</p>
                </li>
                <li className="looping-words__list">
                  <p className="looping-words__p">impact</p>
                </li>
                <li className="looping-words__list">
                  <p className="looping-words__p">play</p>
                </li>
                <li className="looping-words__list">
                  <p className="looping-words__p">fund</p>
                </li>
                <li className="looping-words__list">
                  <p className="looping-words__p">win</p>
                </li>
                <li className="looping-words__list">
                  <p className="looping-words__p">impact</p>
                </li>
                <li className="looping-words__list">
                  <p className="looping-words__p">play</p>
                </li>
                <li className="looping-words__list">
                  <p className="looping-words__p">fund</p>
                </li>
                <li className="looping-words__list">
                  <p className="looping-words__p">win</p>
                </li>
                <li className="looping-words__list">
                  <p className="looping-words__p">impact</p>
                </li>
                <li className="looping-words__list">
                  <p className="looping-words__p">play</p>
                </li>
                <li className="looping-words__list">
                  <p className="looping-words__p">fund</p>
                </li>
                <li className="looping-words__list">
                  <p className="looping-words__p">win</p>
                </li>
              </ul>
            </div>
            <div className="looping-words__fade"></div>
            <div
              data-looping-words-selector=""
              className="looping-words__selector"
            >
              <div className="looping-words__edge"></div>
              <div className="looping-words__edge is--2"></div>
              <div className="looping-words__edge is--3"></div>
              <div className="looping-words__edge is--4"></div>
            </div>
          </div>
        </section>
        <p className="font-extralight text-center text-xl leading-tight px-4">
          Play the <span className="accent">lottery</span> where every ticket{" "}
          supports <span className="accent"> public goods</span> and your chance
          to win.
        </p>
      </div>
      <Button onClick={() => router.push("/lotteries")}>Play</Button>
    </section>
  );
}
