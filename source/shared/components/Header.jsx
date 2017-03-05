import React from 'react'
import { Link } from 'react-router-dom'

import styles from './Header.css'

function Header () {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>App React-Redux</h1>
      <nav role='navigation' className={styles.navigation}>
        <Link to='/' className={styles.link}>
          Home
        </Link>
        <a href='https://google.cl' className={styles.link} target='_blank'>Google</a>
      </nav>
    </header>
  )
}

export default Header
