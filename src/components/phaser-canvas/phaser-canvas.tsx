import { useEffect, useRef, useState } from "react"
import type Phaser from "phaser"

import styles from "./phaser-canvas.module.css"

export interface IPhaserCanvasProps {
  ariaLabel?: string
}

export const PhaserCanvas = ({
  ariaLabel = "Interactive 2D physics demonstration",
}: IPhaserCanvasProps) => {
  const mountReference = useRef<HTMLDivElement>(null)
  const gameReference = useRef<Phaser.Game | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    let isCancelled = false

    const initPhaser = async () => {
      const mount = mountReference.current
      if (!mount || isCancelled || typeof window === "undefined") {
        return
      }

      try {
        const PhaserModule = (await import("phaser")).default

        if (isCancelled || !mountReference.current) {
          return
        }

        const width = mount.clientWidth || 300
        const height = mount.clientHeight || 130

        class PhysicsScene extends PhaserModule.Scene {
          private orbs!: Phaser.Physics.Arcade.Group
          private graphics!: Phaser.GameObjects.Graphics

          constructor() {
            super({ key: "PhysicsScene" })
          }

          preload() {
            // Generate glowing orb texture programmatically without network assets
            const cyanGraphic = this.make.graphics({ x: 0, y: 0 }, false)
            cyanGraphic.fillStyle(0x00f0ff, 1)
            cyanGraphic.fillCircle(8, 8, 7)
            cyanGraphic.fillStyle(0xffffff, 0.8)
            cyanGraphic.fillCircle(6, 6, 3)
            cyanGraphic.generateTexture("cyanOrb", 16, 16)

            const blueGraphic = this.make.graphics({ x: 0, y: 0 }, false)
            blueGraphic.fillStyle(0x0062ff, 1)
            blueGraphic.fillCircle(8, 8, 7)
            blueGraphic.fillStyle(0x00f0ff, 0.6)
            blueGraphic.fillCircle(6, 6, 3)
            blueGraphic.generateTexture("blueOrb", 16, 16)

            const amberGraphic = this.make.graphics({ x: 0, y: 0 }, false)
            amberGraphic.fillStyle(0xf59e0b, 1)
            amberGraphic.fillCircle(6, 6, 5)
            amberGraphic.fillStyle(0xffffff, 0.7)
            amberGraphic.fillCircle(5, 5, 2)
            amberGraphic.generateTexture("amberOrb", 12, 12)
          }

          create() {
            this.graphics = this.add.graphics()
            this.physics.world.setBounds(0, 0, width, height)

            this.orbs = this.physics.add.group({
              bounceX: 0.9,
              bounceY: 0.9,
              collideWorldBounds: true,
            })

            const textures = ["cyanOrb", "blueOrb", "amberOrb"]
            for (let index = 0; index < 14; index += 1) {
              const texture = textures[index % textures.length]
              const x = PhaserModule.Math.Between(20, width - 20)
              const y = PhaserModule.Math.Between(20, height - 20)
              const orb = this.orbs.create(x, y, texture) as Phaser.Physics.Arcade.Image
              orb.setVelocity(
                PhaserModule.Math.Between(-80, 80),
                PhaserModule.Math.Between(-70, 70),
              )
              orb.setDamping(false)
              orb.setScale(PhaserModule.Math.FloatBetween(0.65, 1.05))
            }

            // Interactive click burst
            this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
              for (let index = 0; index < 5; index += 1) {
                const texture = textures[PhaserModule.Math.Between(0, textures.length - 1)]
                const orb = this.orbs.create(
                  pointer.x,
                  pointer.y,
                  texture,
                ) as Phaser.Physics.Arcade.Image
                orb.setVelocity(
                  PhaserModule.Math.Between(-150, 150),
                  PhaserModule.Math.Between(-150, 150),
                )
                orb.setScale(PhaserModule.Math.FloatBetween(0.5, 0.85))
              }
              // Trim group size if it grows too large
              if (this.orbs.getChildren().length > 28) {
                const oldest = this.orbs.getChildren()[0]
                if (oldest) {
                  oldest.destroy()
                }
              }
            })

            // Pointer gravity nudge
            this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
              if (!pointer.isDown) {
                return
              }
              this.orbs.getChildren().forEach((gameObject) => {
                const orb = gameObject as Phaser.Physics.Arcade.Image
                const distance = PhaserModule.Math.Distance.Between(
                  orb.x,
                  orb.y,
                  pointer.x,
                  pointer.y,
                )
                if (distance < 70 && orb.body) {
                  const angle = PhaserModule.Math.Angle.Between(orb.x, orb.y, pointer.x, pointer.y)
                  orb.setVelocity(
                    orb.body.velocity.x - Math.cos(angle) * 40,
                    orb.body.velocity.y - Math.sin(angle) * 40,
                  )
                }
              })
            })

            setIsLoaded(true)
          }

          update() {
            this.graphics.clear()

            // Draw ambient grid
            this.graphics.lineStyle(1, 0x00f0ff, 0.05)
            for (let x = 0; x < width; x += 28) {
              this.graphics.lineBetween(x, 0, x, height)
            }
            for (let y = 0; y < height; y += 28) {
              this.graphics.lineBetween(0, y, width, y)
            }

            // Draw constellation beams between nearby orbs
            const children = this.orbs.getChildren() as Phaser.Physics.Arcade.Image[]
            for (let i = 0; i < children.length; i += 1) {
              const orbA = children[i]
              if (!orbA) continue
              for (let j = i + 1; j < children.length; j += 1) {
                const orbB = children[j]
                if (!orbB) continue
                const distance = PhaserModule.Math.Distance.Between(orbA.x, orbA.y, orbB.x, orbB.y)
                if (distance < 50) {
                  const alpha = (1 - distance / 50) * 0.3
                  this.graphics.lineStyle(1, 0x00f0ff, alpha)
                  this.graphics.lineBetween(orbA.x, orbA.y, orbB.x, orbB.y)
                }
              }
            }
          }
        }

        const config: Phaser.Types.Core.GameConfig = {
          type: PhaserModule.AUTO,
          parent: mount,
          width,
          height,
          transparent: true,
          physics: {
            default: "arcade",
            arcade: {
              gravity: { x: 0, y: 25 },
              debug: false,
            },
          },
          scene: PhysicsScene,
          scale: {
            mode: PhaserModule.Scale.FIT,
            autoCenter: PhaserModule.Scale.CENTER_BOTH,
          },
          banner: false,
        }

        gameReference.current = new PhaserModule.Game(config)
      } catch {
        // Fallback gracefully in environments without full WebGL/Canvas (e.g. testing)
      }
    }

    void initPhaser()

    return () => {
      isCancelled = true
      if (gameReference.current) {
        gameReference.current.destroy(true)
        gameReference.current = null
      }
    }
  }, [])

  return (
    <div
      aria-label={ariaLabel}
      className={styles.containerWrapper}
      ref={mountReference}
      role="region"
      title="Interactive Phaser 3 Physics Scene · Click to Spawn Orbs"
    >
      <span className={styles.canvasLiveBadge}>Phaser 3 · Live Physics</span>
      {!isLoaded && <div className={styles.canvasPlaceholder}>Loading physics engine…</div>}
    </div>
  )
}

export default PhaserCanvas
