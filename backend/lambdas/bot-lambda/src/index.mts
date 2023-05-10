import { BudgetApp } from './budget.mjs';
import { Handler } from 'aws-lambda';
import { HandlerBody } from '../../@types/types.mjs';
import { Message } from 'node-telegram-bot-api';

const BOT_TOKEN: string = String(process.env.BOT_TOKEN);
const CHAT_ID: number = Number(process.env.IVAN_CHAT_ID) || 0;
const LAMBDA_NAME: string = String(process.env.npm_package_name);
const ENVIRONMENT: string = String(process.env.ENVIRONMENT);
const LAMBDA_URL: string = String(process.env.WEBHOOK_URL);

const app: BudgetApp = await new BudgetApp(
	BOT_TOKEN,
	CHAT_ID,
	LAMBDA_NAME,
	LAMBDA_URL,
	ENVIRONMENT,
).init();

export const handler: Handler<HandlerBody> = async (event: HandlerBody) => {
	let body: { message: Message };
	try {
		body = JSON.parse(event.body);
		return app.handler(body.message);
	} catch (e) {
		const message: string = e instanceof Error ? e.message : 'Unknown error';
		return { error: message };
	}
};

