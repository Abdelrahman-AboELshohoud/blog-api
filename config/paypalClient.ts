import paypal from "@paypal/checkout-server-sdk";
import "dotenv/config";

const clientId = process.env.PAYPAL_CLIENT_ID as string;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET as string;

const environment = () => {
  return new paypal.core.SandboxEnvironment(clientId, clientSecret);
};

const client = () => {
  return new paypal.core.PayPalHttpClient(environment());
};

export default client;
