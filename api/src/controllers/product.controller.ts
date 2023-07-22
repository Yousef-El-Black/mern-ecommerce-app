import { Request, Response, NextFunction } from "express";
import ProductModel from "../models/product.model";
import { Product } from "../types/product.type";

// Create Product
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const createdProduct = new ProductModel(req.body);
    const savedProduct = await createdProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get Product By Id
export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product: Product | null = await ProductModel.findById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json("Product Not Found!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get All Products
export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    let products;
    if (qNew) {
      products = await ProductModel.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      products = await ProductModel.find({
        categories: { $in: [qCategory] },
      });
    } else {
      products = await ProductModel.find();
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update Product
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json("Product has been Updated!");
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete Product
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been Deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
};
