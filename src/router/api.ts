import express from "express";
import { checkJWT } from "../middleware/cekJwt";
import { UserController } from "../Controller/user-controller";
import { MaterialController } from "../Controller/material-controller";
import { SupplierController } from "../Controller/supplier-controller";
import { SupplyController } from "../Controller/supply-controller";
import { CakeController } from "../Controller/cake-controller";
import { uploadCakePhoto } from "../middleware/upload-photo";
import { OrderController } from "../Controller/order-controller";
import { CompositionController } from "../Controller/composition-controller";
export const privateApi = express.Router();

// CRUD USER API
privateApi.post("/api/user", checkJWT.forAdmin, UserController.CreateUser);
privateApi.put("/api/user/:id", checkJWT.forAdmin, UserController.UpdateUser);
privateApi.delete(
  "/api/user/:id",
  checkJWT.forAdmin,
  UserController.DeleteUser,
);
privateApi.get("/api/user", checkJWT.forAdmin, UserController.GetAllUser);
privateApi.get("/api/user", checkJWT.forAdmin, UserController.SearchUsers);

// CRUD MATERIAL
privateApi.post(
  "/api/material",
  checkJWT.forAdmin,
  MaterialController.CreateMaterial,
);
privateApi.put(
  "/api/material/:id",
  checkJWT.forAdmin,
  MaterialController.UpdateMaterial,
);
privateApi.delete(
  "/api/material/:id",
  checkJWT.forAdmin,
  MaterialController.DeleteMaterial,
);
privateApi.get(
  "/api/material",
  checkJWT.forAdmin,
  MaterialController.SearchMaterial,
);
privateApi.get(
  "/api/material",
  checkJWT.forAdmin,
  MaterialController.SearchMaterial,
);

// CRUD SUPPLIER
privateApi.post(
  "/api/supplier",
  checkJWT.forAdmin,
  SupplierController.CreateSupplier,
);
privateApi.put(
  "/api/supplier/:id",
  checkJWT.forAdmin,
  SupplierController.UpdateSupplier,
);
privateApi.delete(
  "/api/supplier/:id",
  checkJWT.forAdmin,
  SupplierController.DeleteSupplier,
);
privateApi.get(
  "/api/supplier",
  checkJWT.forAdmin,
  SupplierController.GetAllSupplier,
);
privateApi.get(
  "/api/supplier",
  checkJWT.forAdmin,
  SupplierController.SearchSupplier,
);

// CRUD SUPPLY
privateApi.post(
  "/api/supply",
  checkJWT.forAdmin,
  SupplyController.CreateSupply,
);
privateApi.put(
  "/api/supply/:id",
  checkJWT.forAdmin,
  SupplyController.UpdateSupply,
);
privateApi.delete(
  "/api/supply/:id",
  checkJWT.forAdmin,
  SupplyController.DeleteSupply,
);
privateApi.get("/api/supply", checkJWT.forAdmin, SupplyController.getAllSupply);
privateApi.get(
  "/api/supply",
  checkJWT.forAdmin,
  SupplierController.SearchSupplier,
);

// CRUD CAKE
privateApi.post(
  "/api/cake/",
  checkJWT.forAdmin,
  uploadCakePhoto.single("photo"),
  CakeController.CreateCake,
);
privateApi.put(
  "/api/cake/:id",
  checkJWT.forAdmin,
  uploadCakePhoto.single("photo"),
  CakeController.UpdateCake,
);
privateApi.put("/api/cake", checkJWT.forAdmin, CakeController.SearchCake);
privateApi.delete(
  "/api/cake/:id",
  checkJWT.forAdmin,
  CakeController.DeleteCake,
);
privateApi.get("/api/cake", checkJWT.forAdmin, CakeController.GetAllCake);

// CRUD ORDER
privateApi.post("/api/order", checkJWT.forCashier, OrderController.CreateOrder);
privateApi.put(
  "/api/order/:id",
  checkJWT.forCashier,
  OrderController.UpdateOrder,
);
privateApi.get("/api/order", checkJWT.forCashier, OrderController.CreateOrder);
privateApi.get("/api/order", checkJWT.forCashier, OrderController.FilterOrder);

// CRUD COMPOSITION
privateApi.post(
  "/api/composition",
  checkJWT.forAdmin,
  CompositionController.CreateComposition,
);
privateApi.put(
  "/api/composition/:id",
  checkJWT.forAdmin,
  CompositionController.UpdateComposiion,
);
privateApi.get(
  "/api/composition",
  checkJWT.forAdmin,
  CompositionController.GetComposition,
);
privateApi.get(
  "/api/composition",
  checkJWT.forAdmin,
  CompositionController.SearchComposition,
);
privateApi.delete(
  "/api/commposition/:id",
  checkJWT.forAdmin,
  CompositionController.DeleteComposition,
);
