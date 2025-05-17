import { Router } from "express";

const router = Router();

// Product Routes

// router.get("/product", (req, res) => {
//   console.log("INSIDE PRODUCT route");
//   res.status(200);
//   res.json({ message: req.newConstant });
// });

router.get("/product", (req, res) => {
  console.log("INSIDE PRODUCT route");

  try {
    console.log("req.user:", req.user);
    console.log("req.newConstant:", req.newConstant);
    res.json({ message: req.newConstant || "default" });
  } catch (e) {
    console.error("Handler error:", e);
    res.status(500).json({ error: "Handler failed" });
  }
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
