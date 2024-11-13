import * as Matter from "matter-js";
import { useEffect, useRef } from "react";

const { Engine, Render, Runner, World, Bodies } = Matter.default;

const engine = Engine.create();
const runner = Runner.create();

function createPool(url) {
  const pool = Bodies.circle(
    Math.round(Math.random() * window.innerWidth),
    -30,
    35,
    {
      angle: Math.PI * (Math.random() * 2 - 1),
      friction: 0.001,
      frictionAir: 0.01,
      restitution: 0.75,
      render: {
        sprite: {
          texture: url,
          xScale: 1,
          yScale: 1
        }
      }
    }
  );

  World.add(engine.world, [pool]);
}

export function usePool() {
  const ref = useRef();

  useEffect(() => {
    const canvas = ref.current;

    if (!canvas) {
      return;
    }

    const height = ref.current.clientHeight;
    const width = ref.current.clientWidth;

    const render = Render.create({
      element: "div",
      canvas,
      engine: engine,
      options: {
        height,
        width,
        background: "transparent",
        wireframes: false
      }
    });

    const boundaries = {
      isStatic: true,
      render: {
        fillStyle: "transparent",
        strokeStyle: "transparent"
      }
    };
    const ground = Bodies.rectangle(
      width / 2,
      height,
      width + 20,
      4,
      boundaries
    );
    const leftWall = Bodies.rectangle(
      0,
      height / 2,
      4,
      height + 60,
      boundaries
    );
    const rightWall = Bodies.rectangle(
      width,
      height / 2,
      4,
      height + 60,
      boundaries
    );

    World.add(engine.world, [ground, leftWall, rightWall]);

    Render.run(render);
    Runner.run(runner, engine);
  }, [ref]);

  const faceImage =
    "https://res.cloudinary.com/khriztianmoreno/image/upload/q_auto,f_auto,w_90/v1604105684/KM-brand/profile%20imgs/CARA_KHRIZTIAN_final-01.png";

  const addPool = () => createPool(faceImage);

  return { poolRef: ref, addPool };
}
