import Link from 'next/link'
import styles from './styles.module.scss'
export default function UserMenu ({ loggedIn }) {
  return (
    <div className={styles.menu}>
      <h4>Welcome to shopPay !</h4>
      {loggedIn ? (
        <div className={styles.flex}>
          <img
            src='https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png'
            alt=''
            className={styles.menu__img}
          ></img>
          <div className={styles.col}>
            <span>Welcome Back,</span>
            <h3>Sasha</h3>
            <span>Sign out</span>
          </div>
        </div>
      ) : (
        <div className={styles.flex}>
          <button className={styles.btn_primary}>Register</button>
          <button className={styles.btn_outlined}>Login</button>
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
