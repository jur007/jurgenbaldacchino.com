import styles from "./strength-card.module.css"

import { getClassNames } from "@utils/class-names"

export interface IStrengthCard {
  description: string
  index: string
  prominent?: boolean
  technicalDetail: string
  title: string
}

export const StrengthCard = ({
  description,
  index,
  prominent = false,
  technicalDetail,
  title,
}: IStrengthCard) => {
  const headingId = `strength-${index}-title`

  return (
    <article
      className={getClassNames(styles.containerWrapper, prominent && styles.prominentStrengthCard)}
      aria-labelledby={headingId}
      tabIndex={0}
    >
      <div className={styles.cardHeaderContainer}>
        <span>{index}</span>
        <span className={styles.cardSymbol} aria-hidden="true"></span>
      </div>
      <h3 id={headingId}>{title}</h3>
      <p>{description}</p>
      <span className={styles.technicalDetail}>{technicalDetail}</span>
    </article>
  )
}

export default StrengthCard
