import Image from "next/image";
import Layout from "../Layout/Layout";
import styles from "./newpage.module.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { publicRequest, userRequest } from "@/requestMethods";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const NewPage = ({ type }: { type: string }) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [img, setImg] = useState<any>(null);
  const [imgUrl, setImgUrl] = useState("");

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [productImgs, setProductImgs] = useState<any>([]);
  const [productImg, setProductImg] = useState<any>([]);
  const [imgs, setImgs] = useState([]);
  const [categories, setCategories] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(1);

  const [isImageAccepted, setIsImageAccepted] = useState(true);

  const token = useSelector((state: any) => state.user.currentUser.accessToken);
  const router = useRouter();

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

  const uploadProductImages = async () => {
    productImgs.map(async (pImg: any) => {
      const data = new FormData();
      data.set("img", pImg);
      try {
        const res = await publicRequest.post("/upload", data);
        setProductImg([...productImg, res.data.url]);
      } catch (err) {
        console.log(err);
      }
    });
  };

  const handleAcceptImage = (answer: boolean) => {
    if (answer) {
      uploadUserImage();
    } else {
      setImg(null);
    }
    setIsImageAccepted(true);
  };

  const handleCreateUser = async (e: any) => {
    e.preventDefault();
    try {
      await userRequest(token)
        .post("/auth/register/", {
          isAdmin: true,
          username,
          name,
          email,
          password,
          phone,
          address,
          country,
          img: imgUrl,
        })
        .then(() =>
          router.push({
            pathname: "/users",
            query: {
              message: "User Created Successfully!",
            },
          })
        );
    } catch (err) {}
  };

  const handleCreateProduct = async (e: any) => {
    e.preventDefault();
    try {
      await userRequest(token)
        .post("/products/", {
          title,
          desc,
          categories: categories.split(",").map((item) => item.trim()),
          price,
          stock,
          color: color.split(",").map((item) => item.trim()),
          size: size.split(",").map((item) => item.trim()),
          img: productImg,
        })
        .then(() =>
          router.push({
            pathname: "/products/",
            query: {
              message: "Product Created Successfully!",
            },
          })
        );
    } catch (err) {}
  };

  useEffect(() => {
    setIsImageAccepted(false);
  }, [img]);

  useEffect(() => {
    setProductImg([]);
    setIsImageAccepted(true);
  }, []);

  useEffect(() => {
    uploadProductImages();
  }, [productImgs]);

  return (
    <Layout>
      <div className={styles.top}>
        <h1>Add New {type}</h1>
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          {type === "User" ? (
            <Image
              src={
                img
                  ? URL.createObjectURL(img)
                  : "https://png.pngtree.com/png-clipart/20190925/original/pngtree-no-image-vector-illustration-isolated-png-image_4979075.jpg"
              }
              alt=""
              width={250}
              height={250}
            />
          ) : (
            <div>
              {productImgs.map((img: any, index: number) => {
                return (
                  <Image
                    key={index}
                    src={
                      img
                        ? URL.createObjectURL(img)
                        : "https://png.pngtree.com/png-clipart/20190925/original/pngtree-no-image-vector-illustration-isolated-png-image_4979075.jpg"
                    }
                    alt=""
                    width={250}
                    height={250}
                  />
                );
              })}
              <Image
                src={
                  img
                    ? URL.createObjectURL(img)
                    : "https://png.pngtree.com/png-clipart/20190925/original/pngtree-no-image-vector-illustration-isolated-png-image_4979075.jpg"
                }
                alt=""
                width={250}
                height={250}
              />
            </div>
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
            {type === "User" ? (
              <>
                <div className={styles.formInput}>
                  <label htmlFor="userImg">
                    Image:{" "}
                    <DriveFolderUploadOutlinedIcon className={styles.icon} />
                  </label>
                  <input
                    type="file"
                    id="userImg"
                    onChange={(e: any) => setImg(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </div>
                <div className={styles.formInput}>
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder="john_doe"
                    value={username}
                    onChange={(e: any) => setUsername(e.target.value)}
                  />
                </div>
                <div className={styles.formInput}>
                  <label>Name and surname</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                  />
                </div>
                <div className={styles.formInput}>
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="john_doe@gmail.com"
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                  />
                </div>
                <div className={styles.formInput}>
                  <label>Phone</label>
                  <input
                    type="text"
                    placeholder="+1 234 567 89"
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
                    placeholder="Elton St. 216 NewYork"
                    value={address}
                    onChange={(e: any) => setAddress(e.target.value)}
                  />
                </div>
                <div className={styles.formInput}>
                  <label>Country</label>
                  <input
                    type="text"
                    placeholder="USA"
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
                    multiple={true}
                    onChange={(e: any) => {
                      setProductImgs(Array.from(e.target.files));
                    }}
                    style={{ display: "none" }}
                  />
                </div>
                <div className={styles.formInput}>
                  <label>Title</label>
                  <input
                    type="text"
                    placeholder="Apple Macbook Pro"
                    value={title}
                    onChange={(e: any) => setTitle(e.target.value)}
                  />
                </div>
                <div className={styles.formInput}>
                  <label>Description</label>
                  <input
                    type="text"
                    placeholder="Description"
                    value={desc}
                    onChange={(e: any) => setDesc(e.target.value)}
                  />
                </div>
                <div className={styles.formInput}>
                  <label>Categories</label>
                  <input
                    type="text"
                    placeholder="Computers, Men, Apple"
                    value={categories}
                    onChange={(e: any) => setCategories(e.target.value)}
                  />
                </div>
                <div className={styles.formInput}>
                  <label>Price</label>
                  <input
                    type="number"
                    placeholder="Apple Macbook Pro"
                    value={price}
                    onChange={(e: any) => setPrice(e.target.value)}
                  />
                </div>
                <div className={styles.formInput}>
                  <label>Stock</label>
                  <input
                    type="text"
                    placeholder="1"
                    value={stock}
                    onChange={(e: any) => setStock(e.target.value)}
                  />
                </div>
                <div className={styles.formInput}>
                  <label>Colors</label>
                  <input
                    type="text"
                    placeholder="gray, blue, yellow"
                    value={color}
                    onChange={(e: any) => setColor(e.target.value)}
                  />
                </div>
                <div className={styles.formInput}>
                  <label>Size</label>
                  <input
                    type="text"
                    placeholder="M, XL, L, 2XL"
                    value={size}
                    onChange={(e: any) => setSize(e.target.value)}
                  />
                </div>
              </>
            )}
            <button
              onClick={type === "User" ? handleCreateUser : handleCreateProduct}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewPage;
