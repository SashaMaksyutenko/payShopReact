import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import Header from "../components/header"
import Footer from "@/components/footer";
import axios from 'axios';
export default function Home({country}) {
  return (
    <div>
      <Header country={country}/>
      <Footer country={country}/>
    </div>
  );
}
export async function getServerSideProps() {
    let data = await axios.get('https://api.ipregistry.co/?key=lffcfrgnynpxbvyj')
      .then((res) => {
        return res.data.location.country;
      })
   .catch ((err) =>{
    console.log(err);})
    // Повертаємо порожній рядок або обробляємо помилку іншим чином
    return {
      props: {
        country: {name:data.name,flag:data.flag.emojitwo}
      }
    };
  }

