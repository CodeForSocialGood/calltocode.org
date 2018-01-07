import styles from './Version.scss'
import React from 'react'

function Version () {
  const {NODE_ENV, COMMIT_HASH} = $_ENV

  const version = NODE_ENV === 'test'
    ? <a href={`https://github.com/CodeForSocialGood/calltocode.org/tree/${COMMIT_HASH}`} target='_blank'>v{COMMIT_HASH}</a>
    : null

  return (
    <section className={styles.version}>
      {version}
    </section>
  )
}

export default Version
