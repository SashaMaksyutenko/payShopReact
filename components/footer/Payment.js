import styles from "./styles.module.scss";
export default function Payment() {
  return (
    <div className={styles.footer__payment}>
      <h3>WE ACCEPT</h3>
      <div className={styles.footer__flexwrap}>
        <img src="../../../images/payment/visa.jpg" alt="Visa" />
        <img src="../../../images/payment/mastercard.jpg" alt="MasterCard" />
        <img src="../../../images/payment/paypal.jpg" alt="PayPal" />
      </div>
    </div>
  );
}