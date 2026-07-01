import { Injectable } from "@nestjs/common";

import { Resend } from "resend";

import { render } from "@react-email/render";

import Email from "./emails";

@Injectable()
export class ResendService {
	// private resend = new Resend(process.env.RESEND_API_KEY);

	async sendEmailVerification(to: string, verifyUrl: string) {
		console.log(`[Email Disabled] Verification email for ${to}: ${verifyUrl}`);
		return { id: "mock-id" };
	}

	async sendEmailResetPassword(to: string, resetUrl: string) {
		console.log(`[Email Disabled] Password reset email for ${to}: ${resetUrl}`);
		return { id: "mock-id" };
	}
}
