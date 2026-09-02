import "@testing-library/jest-dom/vitest"
import { vi } from "vitest"

vi.mock("@jurgenbaldacchino/phaser-showcase/minescrypt", () => ({
  MinesCryptGame: () => null,
}))

vi.mock("@jurgenbaldacchino/phaser-showcase/mines/vanilla", () => ({
  MinesVanillaGame: () => null,
  MinesGame: () => null,
}))

vi.mock("@jurgenbaldacchino/phaser-showcase/dist/phaser-showcase.css", () => ({}))
vi.mock("@jurgenbaldacchino/phaser-showcase/phaser-showcase.css", () => ({}))

if (typeof window !== "undefined" && window.HTMLCanvasElement) {
  HTMLCanvasElement.prototype.getContext = function () {
    return {
      fillRect: () => {},
      clearRect: () => {},
      getImageData: () => ({ data: new Array(4) }),
      putImageData: () => {},
      createImageData: () => [],
      setTransform: () => {},
      drawImage: () => {},
      save: () => {},
      fillText: () => {},
      restore: () => {},
      beginPath: () => {},
      moveTo: () => {},
      lineTo: () => {},
      closePath: () => {},
      stroke: () => {},
      translate: () => {},
      scale: () => {},
      rotate: () => {},
      arc: () => {},
      fill: () => {},
      measureText: () => ({ width: 0 }),
      transform: () => {},
      rect: () => {},
      clip: () => {},
    } as unknown as RenderingContext
  } as unknown as typeof HTMLCanvasElement.prototype.getContext
}
