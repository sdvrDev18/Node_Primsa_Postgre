import { Router } from "express";

const router = Router();

// Product Routes

router.get("/product", (req, res) => {
  res.json({ message: "Hello this works!" });
});
router.get("/product/:id", () => {});
router.put("/product/:id", () => {});
router.post("/product", () => {});
router.get("/product/:id", () => {});

// update Routes

router.get("/update", () => {});
router.get("/update/:id", () => {});
router.put("/update/:id", () => {});
router.post("/update", () => {});
router.get("/update/:id", () => {});

// updatpointe Routes

router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.put("/updatepoint/:id", () => {});
router.post("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});

export default router;
