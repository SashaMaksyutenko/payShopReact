
import styles from "./styles.module.scss";
import { menuArray } from "@/data/home";
import Link from "next/link";
import {
  GiLargeDress, GiClothes, GiWatch, GiBallerinaShoes,
  GiHeadphones, GiHealthCapsule, GiSportMedal, GiBigDiamondRing,
} from "react-icons/gi";
import { FaHammer } from "react-icons/fa6";
import { MdOutlineSportsEsports, MdOutlineSmartToy } from "react-icons/md";
import { BiCameraMovie, BiGift, BiCategory } from "react-icons/bi";
import { FaBaby } from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi";
import { AiOutlineSecurityScan } from "react-icons/ai";
import { BsPhoneVibrate } from "react-icons/bs";
const icons = [
  GiLargeDress, GiClothes, GiHeadphones, GiWatch, HiOutlineHome,
  GiHealthCapsule, GiBallerinaShoes, GiBigDiamondRing, GiSportMedal,
  FaBaby, BiCameraMovie, MdOutlineSportsEsports, BsPhoneVibrate,
  MdOutlineSmartToy, BiGift, FaHammer, AiOutlineSecurityScan,
];
export default function Menu() {
  return (
    <div className={styles.menu}>
      <ul>
        <li>
          <a className={styles.menu__header}>
            <BiCategory />
            <b>Categories</b>
          </a>
        </li>
        <div className={styles.menu__list}>
          {menuArray.map((item, i) => {
            const Icon = icons[i];
            return (
              <li key={i}>
                <Link legacyBehavior href={item.link}>
                  <a className={styles.noUnderline}>
                    {Icon ? <Icon /> : null} 
                    <span>{item.name}</span>
                  </a>
                </Link>
              </li>
            );
          })}
        </div>
      </ul>
    </div>
  );
}
