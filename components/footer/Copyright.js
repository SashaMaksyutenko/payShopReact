import styles from './styles.module.scss'
import Link from 'next/link'
import { IoLocationSharp } from 'react-icons/io5'
export default function Copyright () {
  return (
    <div className={styles.footer__copyright}>
      <section>©2024 SHOPPAY All Rights Resereved.</section>
      <section>
        <ul className={styles.noBullets}>
          {data.map((link,index) => (
            <li key={index}>
              <Link href={link.link}>{link.name}</Link>
            </li>
          ))}
          <li>
            <a>
              <IoLocationSharp /> Ukraine
            </a>
          </li>
        </ul>
      </section>
    </div>
  )
}
const data = [
  {
    name: 'Privacy Center',
    link: ''
  },
  {
    name: 'Privacy & Cookie Policy',
    link: ''
  },
  {
    name: 'Manage Cookies',
    link: ''
  },
  {
    name: 'Terms & Conditions',
    link: ''
  },
  {
    name: 'Copyright Notice',
    link: ''
  }
]
