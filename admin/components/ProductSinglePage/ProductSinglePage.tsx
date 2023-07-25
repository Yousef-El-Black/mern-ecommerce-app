import Image from "next/image";
import styles from "./productsinglepage.module.scss";
import Chart from "../Chart/Chart";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { publicRequest, userRequest } from "@/requestMethods";
import { useSelector } from "react-redux";
import Link from "next/link";
import Layout from "../Layout/Layout";

const ProductSinglePage = () => {
  const [product, setProduct] = useState<any>({});
  const [productStats, setProductStats] = useState<any>([]);
  const router = useRouter();
  const token = useSelector((state: any) => state.user.currentUser.accessToken);
  useEffect(() => {
    const fetchTheProduct = async () => {
      try {
        const res = await publicRequest("/products/" + router.query.productId);
        setProduct(res.data);
      } catch (err) {}
    };
    const fetchProductStats = async () => {
      try {
        const res = await userRequest(token).get(
          "/orders/productstats/" + product._id
        );
        setProductStats(res.data);
      } catch (err) {}
    };
    fetchTheProduct();
    fetchProductStats();
  }, [router, router.query.productId]);

  return (
    <Layout>
      <div className={styles.top}>
        <div className={styles.left}>
          <Link
            href={"/products/edit/" + product._id}
            className={styles.editButton}
          >
            Edit
          </Link>
          <div className={styles.title}>Main Information</div>
          <div className={styles.item}>
            <Image
              className={styles.itemImg}
              src={product.img ? product.img[0] : ""}
              alt=""
              width={250}
              height={250}
            />
            <div className={styles.details}>
              <h1 className={styles.itemTitle}>{product.title}</h1>
              <div className={styles.detailItem}>
                <span className={styles.itemKey}>Price:</span>
                <span className={styles.itemValue}>$ 900</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <Chart aspect={3 / 1} title="Product Stats" stats={productStats} />
        </div>
      </div>
      <div className={styles.bottom}>
        <h1 className={styles.title}>Product Information</h1>
        <div className={styles.info}>
          <div className={styles.infoItem}>
            <span className={styles.infoKey}>Categories:</span>
            <span className={styles.infoValue}>Men, Short</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoKey}>Colors:</span>
            <span className={styles.infoValue}>Green, Blue, Yellow</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoKey}>Sizes:</span>
            <span className={styles.infoValue}>S, M, L, XL</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoKey}>Stock:</span>
            <span className={styles.infoValue}>99</span>
          </div>
        </div>
        <div className={styles.desc}>
          <span className={styles.key}>Description:</span>
          <span className={styles.value}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
            quasi eligendi repellat, recusandae quae autem, dolor deserunt
            cumque aliquam veritatis earum molestiae harum cupiditate doloremque
            illo illum, ipsum asperiores. Dolor!
          </span>
        </div>
      </div>
    </Layout>
  );
};

export default ProductSinglePage;
