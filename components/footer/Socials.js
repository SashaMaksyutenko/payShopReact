import styles from "./styles.module.scss"
import { FaFacebookF, FaTiktok } from "react-icons/fa";
import {
  BsInstagram,
  BsTwitter,
  BsYoutube,
  BsPinterest,
  BsSnapchat,
} from "react-icons/bs";

export default function () {
  return (
    <div className={styles.footer__socials}>
        <section>
            <h1>STAY CONNECTED</h1>
            <ul>
          <li className={styles.noBullets}>
            <a href="/" target="_blank">
              <FaFacebookF />
            </a>
          </li>
          <li className={styles.noBullets}>
            <a href="/" target="_blank">
              <BsInstagram />
            </a>
          </li>
          <li className={styles.noBullets}>
            <a href="/" target="_blank">
              <BsTwitter />
            </a>
          </li>
          <li className={styles.noBullets}>
            <a href="/" target="_blank">
              <BsYoutube />
            </a>
          </li>
          <li className={styles.noBullets}>
            <a href="/" target="_blank">
              <BsPinterest />
            </a>
          </li>
          <li className={styles.noBullets}>
            <a href="/" target="_blank">
              <BsSnapchat />
            </a>
          </li>
          <li className={styles.noBullets}>
            <a href="/" target="_blank">
              <FaTiktok />
            </a>
          </li>
        </ul>
        </section>
    </div>
  )
}
