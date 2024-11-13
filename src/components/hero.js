import React, { useEffect, useState } from "react";

import { usePool } from "../hooks/use-pool.js";
import { FaceDrop } from "./face-drop.js";

import styles from "../styles.module.css";

export const taglines = [
  {
    size: "8.1vw",
    "size-lg": "64px",
    text: `
      has a lot of ideas
    `
  },
  {
    rotation: "11deg",
    scale: "0.99",
    size: "9.1vw",
    "size-lg": "70px",
    text: `
      believes in us <span class="love"></span>
    `,
    top: "0"
  },
  {
    size: "8.9vw",
    "size-lg": "72px",
    text: `
      is an okay cook
    `
  },
  {
    rotation: "-9deg",
    scale: "1",
    size: "8.1vw",
    "size-lg": "64.5px",
    text: `
      <span class="love">love</span>s melted cheese
    `
  },
  {
    rotation: "18deg",
    scale: 1.05,
    size: "5.6vw",
    "size-lg": "44px",
    text: `
      thinks you belong here <span class="love"></span>
    `,
    top: "0.025em"
  },
  {
    scale: "1.3",
    rotation: "-3deg",
    size: "4.7vw",
    "size-lg": "38.5px",
    text: `
      would <span class="love">love</span> a sandwich, thanks
    `,
    top: "-0.1em"
  },
  {
    rotation: "-11deg",
    scale: "0.99",
    size: "8.3vw",
    "size-lg": "64.5px",
    text: `
      <span class="love">love</span>s pajama pants
    `
  }
];

const CycleTagline = ({ clickHandler }) => {
  const [active, setActive] = useState(false);

  const images = {
    off:
      "https://res.cloudinary.com/khriztianmoreno/image/upload/v1604543820/assets/rotate-off.png",
    on:
      "https://res.cloudinary.com/khriztianmoreno/image/upload/v1604543820/assets/rotate-on.png"
  };

  const handleClick = (event) => {
    event.preventDefault();

    setActive(true);
    setTimeout(() => setActive(false), 500);

    clickHandler();
  };

  return (
    <a
      href="#cycle-tagline"
      onClick={handleClick}
      className={`${styles.cycle} ${active ? styles.active : ""}`}
    >
      <img
        src={images[active ? "on" : "off"]}
        alt="drawing of two arrows pointing in a circle"
      />
      <span className="visually-hidden">push me</span>
    </a>
  );
};

export function Hero() {
  const { addPool } = usePool();
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    addPool();
  }, []);

  function cycleTagline() {
    addPool();

    const index = taglineIndex + 1;
    setTaglineIndex(index < taglines.length ? index : 0);
  }

  return [
    <FaceDrop className={styles.boops} />,
    <CycleTagline clickHandler={cycleTagline} />
  ];
}
