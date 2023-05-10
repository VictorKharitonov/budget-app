import { Logger } from '../../@helpers/logger.mjs';
import TelegramBot, { ConstructorOptions, Message } from 'node-telegram-bot-api';

export class BudgetApp {

	private readonly bot: TelegramBot;
	private readonly botOptions: ConstructorOptions;
	private readonly logger: Logger;

	get isProduction(): boolean {
		return this.environment !== 'dev';
	}

	constructor(
		private readonly botToken: string,
		private readonly chatIdToFilter: number,
		private readonly lambdaName: string,
		private readonly webhookURL: string,
		private readonly environment: string,
	) {
		this.logger = new Logger(this.chatIdToFilter, this.lambdaName, this.environment);
		this.botOptions = this.getOptions();
		this.bot = new TelegramBot(this.botToken, this.botOptions);
	}

	async init(): Promise<this> {
		if (this.isProduction) {
			const setWebhookResult = await this.bot.setWebHook(this.webhookURL);
			this.logger.log(setWebhookResult);
		}

		if (!this.isProduction) {
			this.logger.log('Init polling');
			this.bot.on('message', async (event: Message) => {
				try {
					this.logger.log('Message received', event);
					const result: Message | Error = await this.handler(event);
					this.logger.log('Handler result', result);
				} catch (e) {
					this.logger.logError('Handler error', e);
				}
			});
		}

		return this;
	}

	async handler(event: Message | unknown | null): Promise<Message | Error> {
		if (!this.checkMessage(event)) {
			throw new Error('Invalid event structure: ' + event);
		}

		if (!this.isAllowedChat(event)) {
			const logMessage: string = `Execution blocked for chat ${event.chat.id}: ${event.chat.first_name}`;
			const userMessage: string = 'Sorry, You are not allowed to use this bot';
			await this.bot.sendMessage(event.chat.id, userMessage);
			throw new Error(logMessage);
		}

		return this.bot.sendMessage(
			this.chatIdToFilter, JSON.stringify({
				env: process.env.ENVIRONMENT,
				test: event.text,
			}, null, '  '),
		);
	}

	private isAllowedChat(message: Message): boolean {
		return message.chat.id === this.chatIdToFilter;
	}

	private checkMessage(message: Message | unknown | null): message is Message {
		return !!message && typeof message === 'object';
	}

	private getOptions(): ConstructorOptions {
		const webHook = this.isProduction;
		const polling = !this.isProduction;
		return {
			webHook,
			polling,
		};
	}
}
