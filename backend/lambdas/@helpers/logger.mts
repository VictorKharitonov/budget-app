export class Logger {
	constructor(private id: unknown, private lambdaName: string, private environment: string) {}

	log(...message: unknown[]): void {
		if (this.environment === 'dev') {
			console.log(...this.getLogMessage(false, ...message));
		}
	}

	logError(...message: unknown[]): void {
		if (this.environment === 'dev') {
			console.log(...this.getLogMessage(true, ...message));
		}
	}

	getLogMessage(error?: boolean, ...messages: unknown[]): unknown[] {
		return [
			this.getBaseLogMessage(error),
			...messages,
		]
	}

	private getBaseLogMessage(error?: boolean): string {
		const logType: string = error ? 'ERROR' : 'LOG';
		return `[${logType}] ${this.lambdaName}, ${this.id} ${new Date().toLocaleTimeString()}: `;
	}
}
