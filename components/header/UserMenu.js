import Link from 'next/link'
import styles from './styles.module.scss'
import { signOut,signIn } from 'next-auth/react'
export default function UserMenu ({ session }) {
  return (
    <div className={styles.menu}>
      <h4>Welcome to shopPay !</h4>
      {session ? (
        <div className={styles.flex}>
          <img
            src={session.user.image}
            alt=''
            className={styles.menu__img}
          ></img>
          <div className={styles.col}>
            <span>Welcome Back,</span>
            <h3>{session.user.name}</h3>
            <span onClick={()=>signOut()}>Sign out</span>
          </div>
        </div>
      ) : (
        <div className={styles.flex}>
          <button className={styles.btn_primary}>Register</button>
          <button className={styles.btn_outlined} onClick={()=>signIn()}>Login</button>
        </div>
      )}
      <ul className={styles.noBullets}>
        <li>
          <Link href='/profile'className={styles.noUnderline}>Account</Link>
        </li>
        <li>
          <Link href='/profile/orders'className={styles.noUnderline}>My Orders</Link>
        </li>
        <li>
          <Link href='/profile/messages'className={styles.noUnderline}>Message Center</Link>
        </li>
        <li>
          <Link href='/profile/address'className={styles.noUnderline}>Address</Link>
        </li>
        <li>
          <Link href='/profile/wishlist'className={styles.noUnderline}>Wishlist</Link>
        </li>
      </ul>
    </div>
  )
}
