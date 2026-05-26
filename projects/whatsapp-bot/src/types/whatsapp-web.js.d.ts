declare module 'whatsapp-web.js' {
    export class Client {
        constructor(options: any);
        on(event: string, callback: (...args: any[]) => void): void;
        initialize(): Promise<void>;
        sendMessage(to: string, content: any): Promise<any>;
    }
    export class LocalAuth {
        constructor(options?: any);
    }
    export interface Message {
        from: string;
        body: string;
        reply(content: string): Promise<any>;
    }
}

declare module 'qrcode-terminal' {
    export function generate(qr: string, options?: any): void;
}
