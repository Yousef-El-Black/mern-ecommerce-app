import styles from "./editpage.module.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Image from "next/image";
import { useState, useEffect } from "react";
import { publicRequest, userRequest } from "@/requestMethods";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Layout from "../Layout/Layout";

const EditPage = ({ type }: { type: string }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [img, setImg] = useState<any | null>(null);
  const [imgUrl, setImgUrl] = useState<any>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isImageAccepted, setIsImageAccepted] = useState(true);

  const [productImgs, setProductImgs] = useState<any>([]);
  const [productImg, setProductImg] = useState<any>();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [categories, setCategories] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [colors, setColors] = useState("");
  const [sizes, setSizes] = useState("");

  const token = useSelector((state: any) => state.user.currentUser.accessToken);
  const router = useRouter();
  const userId = router.query.userId;
  const productId = router.query.productId;

  const uploadUserImage = async () => {
    const data = new FormData();
    data.set("img", img);
    try {
      const res = await publicRequest.post("/upload", data);
      setImgUrl(res.data.url);
    } catch (err) {
      console.log(err);
    }
  };

  const uploadProductImage = async () => {
    const data = new FormData();
    data.set("img", productImg);
    try {
      const res = await publicRequest.post("/upload", data);
      setProductImgs((prevImgs: string[] | []) => [...prevImgs, res.data.url]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAcceptImage = (answer: boolean) => {
    if (answer) {
      uploadUserImage();
    } else {
      setImg(null);
    }
    setIsImageAccepted(true);
  };

  const getUser = async () => {
    try {
      const res = await userRequest(token).get("/users/" + userId);
      setUsername(res.data.username);
      setName(res.data.name);
      setEmail(res.data.email);
      setPhone(res.data.phone);
      setAddress(res.data.address);
      setCountry(res.data.country);
      setImgUrl(res.data.img);
    } catch (err) {}
  };

  const updateUser = async (e: any) => {
    e.preventDefault();
    try {
      await userRequest(token)
        .put("/users/" + userId, {
          username,
          name,
          email,
          phone,
          address,
          country,
          img: imgUrl,
        })
        .then(() =>
          router.push({
            pathname: "/users/" + userId,
            query: {
              message: "User updated Successfully!",
            },
          })
        );
    } catch (err) {}
  };

  const getProduct = async () => {
    try {
      const res = await publicRequest.get("/products/" + productId);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setCategories(res.data.categories.join(", "));
      setPrice(res.data.price);
      setStock(res.data.stock);
      setColors(res.data.color.join(", "));
      setSizes(res.data.size.join(", "));
      setProductImgs(res.data.img);
    } catch (err) {}
  };

  const removeProductImg = (img: string) => {
    setProductImgs(
      productImgs.filter((productImg: string) => img !== productImg)
    );
  };

  const updateProduct = async (e: any) => {
    e.preventDefault();
    try {
      await userRequest(token)
        .put("/products/" + productId, {
          title,
          desc,
          categories: categories.split(",").map((item) => item.trim()),
          price,
          stock,
          color: colors.split(",").map((item) => item.trim()),
          size: sizes.split(",").map((item) => item.trim()),
          img: productImgs,
        })
        .then(() =>
          router.push({
            pathname: "/products/" + productId,
            query: {
              message: "Product updated Successfully!",
            },
          })
        );
    } catch (err) {}
  };

  useEffect(() => {
    setIsImageAccepted(false);
    uploadUserImage();
  }, [img]);

  useEffect(() => {
    if (type === "users") {
      getUser();
    } else {
      getProduct();
    }
    setIsImageAccepted(true);
  }, []);

  useEffect(() => {
    uploadProductImage();
  }, [productImg]);

  return (
    <Layout>
      <div className={styles.top}>
        <h1>
          Edit{" "}
          {type === "users"
            ? "User"
            : type === "products"
            ? "Product"
            : type === "orders" && "Order"}
        </h1>
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          {type === "users" ? (
            <Image
              src={
                img
                  ? URL.createObjectURL(img)
                  : imgUrl
                  ? imgUrl
                  : "https://png.pngtree.com/png-clipart/20190925/original/pngtree-no-image-vector-illustration-isolated-png-image_4979075.jpg"
              }
              alt=""
              width={250}
              height={250}
            />
          ) : (
            Array.isArray(productImgs) &&
            productImgs.map((img: any, index: number) => {
              return (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "50%",
                    width: "100px",
                    height: "100px",
                    marginBottom: "5px",
                  }}
                >
                  <Image src={img} alt="" width={250} height={250} />
                  <div
                    className={styles.removeContainer}
                    onClick={() => removeProductImg(img)}
                  >
                    <RemoveCircleIcon />
                  </div>
                </div>
              );
            })
          )}
          <div
            className={styles.acceptBtn}
            style={{ display: `${isImageAccepted ? "none" : "flex"}` }}
          >
            <button
              onClick={() => {
                handleAcceptImage(false);
              }}
            >
              No
            </button>
            <button
              onClick={() => {
                handleAcceptImage(true);
              }}
            >
              Yes
            </button>
          </div>
        </div>
        <div className={styles.right}>
          <form>
            {type === "users" ? (
              <>
                <div className={styles.formInput}>
                  <label htmlFor="img">
                    Image:{" "}
                    <DriveFolderUploadOutlinedIcon className={styles.icon} />
                  </label>
                  <input
                    type="file"
                    id="img"
                    onChange={(e: any) => setImg(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </div>
                <div className={styles.formInput}>
                  <label>Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e: any) => setUsername(e.target.value)}
                  />
                </div>
                <div className={styles.formInput}>
                  <label>Name and surname</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                  />
                </div>
                <div className={styles.formInput}>
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                  />
                </div>
                <div className={styles.formInput}>
                  <label>Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e: any) => setPhone(e.target.value)}
                  />
                </div>
                <div className={styles.formInput}>
                  <label>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                  />
                </div>
                <div className={styles.formInput}>
                  <label>Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e: any) => setAddress(e.target.value)}
                  />
                </div>
                <div className={styles.formInput}>
                  <label>Country</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e: any) => setCountry(e.target.value)}
                  />
                </div>
              </>
            ) : (
              <>
                <div className={styles.formInput}>
                  <label htmlFor="productImgs">
                    Image:{" "}
                    <DriveFolderUploadOutlinedIcon className={styles.icon} />
                  </label>
                  <input
                    type="file"
                    id="productImgs"
                    onChange={(e: any) => {
                      setProductImg(e.target.files[0]);
                    }}
                    style={{ display: "none" }}
                  />
                </div>
                <div className={styles.formInput}>
                  <label>Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e: any) => setTitle(e.target.value)}
                  />
                </div>
                <div className={styles.formInput}>
                  <label>Description</label>
                  <input
                    type="text"
                    value={desc}
                    onChange={(e: any) => setDesc(e.target.value)}
                  />
                </div>
                <div className={styles.formInput}>
                  <label>Categories</label>
                  <input
                    type="text"
                    value={categories}
                    onChange={(e: any) => setCategories(e.target.value)}
                  />
                </div>
                <div className={styles.formInput}>
                  <label>Price</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e: any) => setPrice(e.target.value)}
                  />
                </div>
                <div className={styles.formInput}>
                  <label>Stock</label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e: any) => setStock(e.target.value)}
                  />
                </div>
                <div className={styles.formInput}>
                  <label>Colors</label>
                  <input
                    type="text"
                    value={colors}
                    onChange={(e: any) => setColors(e.target.value)}
                  />
                </div>
                <div className={styles.formInput}>
                  <label>Sizes</label>
                  <input
                    type="text"
                    value={sizes}
                    onChange={(e: any) => setSizes(e.target.value)}
                  />
                </div>
              </>
            )}
            <button onClick={type === "users" ? updateUser : updateProduct}>
              Send
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditPage;
