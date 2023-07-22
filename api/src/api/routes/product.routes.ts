import { Router, IRouter } from "express";
import { verifyAdmin } from "../../middlewares/verifyToken";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../../controllers/product.controller";

const productRoutes: IRouter = Router();

productRoutes
  .route("/:id")
  .get(getProductById)
  .put(verifyAdmin, updateProduct)
  .delete(verifyAdmin, deleteProduct);

productRoutes.route("/").post(verifyAdmin, createProduct).get(getAllProducts);

export default productRoutes;
