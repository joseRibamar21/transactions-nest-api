import { INestApplication } from "@nestjs/common";
import * as helmet from 'helmet';

export function setupHelmet(app: INestApplication) {
    app.use(helmet.default({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
                connectSrc: ["'self'", "ws://localhost:3000", "http://localhost:3000"],
            },
        },
    }));
}