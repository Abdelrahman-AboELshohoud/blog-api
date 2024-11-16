import paypal from "@paypal/checkout-server-sdk";
import paypalClient from "../config/paypalClient";
import { Request, Response } from "express";

export const createOrder = async (
  req: Request,
  res: Response
): Promise<any> => {
  const id = req.params.id;
  const userId = req.user.id;
  const { amount } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Product ID is required" });
  }
  if (id !== userId) {
    return res
      .status(400)
      .json({ error: "User ID and Product ID cannot be the same" });
  }

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: amount.toFixed(2).toString(),
        },
      },
    ],
  });

  try {
    const response = await paypalClient().execute(request);
    res.status(201).json({ id: response.result.id });
  } catch (error: any) {
    console.log(error, "error in create payment order");
    if (error.statusCode === 422) {
      return res.status(400).json({ error: "Invalid payment amount" });
    }
    res.status(500).json({ error: "Something went wrong!" });
  }
};

export const captureOrder = async (
  req: Request,
  res: Response
): Promise<any> => {
  const id = req.params.id;
  const userId = req.user.id;

  if (!id) {
    return res.status(400).json({ error: "Product ID is required" });
  }
  if (id !== userId) {
    return res
      .status(400)
      .json({ error: "User ID and Product ID cannot be the same" });
  }

  const { orderId } = req.body as { orderId: string };
  const request = new paypal.orders.OrdersCaptureRequest(orderId);

  request.requestBody({ payment_source: {} as any });

  try {
    const response = await paypalClient().execute(request);

    // Check payment status
    const captureStatus = response.result.status;
    if (captureStatus === "COMPLETED") {
      res.status(200).json(response.result);
    } else if (captureStatus === "DECLINED") {
      res.status(400).json({
        error: "Payment was declined. Please check your payment method.",
      });
    } else if (captureStatus === "FAILED") {
      res.status(400).json({ error: "Payment failed. Please try again." });
    } else {
      res.status(400).json({ error: "Payment could not be processed." });
    }
  } catch (error: any) {
    console.log(error, "error in capture payment order");
    if (error.statusCode === 422) {
      return res
        .status(400)
        .json({ error: "Insufficient funds or payment method declined" });
    } else if (error.statusCode === 400) {
      return res.status(400).json({ error: "Invalid payment information" });
    }
    res.status(500).json({ error: "Something went wrong!" });
  }
};
