import { Injectable, InternalServerErrorException } from "@nestjs/common";

import { Stripe } from "stripe";

@Injectable()
export class PaymentsService {
	private stripe!: Stripe;

	constructor() {
		if (process.env.STRIPE_PRIVATE_KEY) {
			this.stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
		}
	}

	async createCheckoutSession(
		lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
	): Promise<any> {
		if (!this.stripe) {
			return { url: `${process.env.CLIENT_URL}/cart` };
		}
		try {
			return await this.stripe.checkout.sessions.create({
				payment_method_types: ["card"],
				line_items: lineItems,
				mode: "payment",
				success_url: `${process.env.CLIENT_URL}/products?success=true`,
				cancel_url: `${process.env.CLIENT_URL}/products?success=false`,
			});
		} catch (error) {
			console.error("Error creating session:", error);
			throw new InternalServerErrorException(
				"Failed to create checkout session",
			);
		}
	}
}
