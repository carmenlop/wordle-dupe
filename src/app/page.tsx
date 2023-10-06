'use client'
import Image from 'next/image'
import styles from './page.module.css'
import Board from './components/Board'

export default function Home() {
  return (
    <main className={styles.main}>

      <div className={styles.center}>
        <Board />

      </div>

      
    </main>
  )
}
