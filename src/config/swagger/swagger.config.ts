import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerConfig {
  public static swaggerConfig(app: any): void {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle(`BLOG ♻️ `)
      .setDescription(`MUTA`)
      .setVersion(`v0.0.1`)
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/v1/muta/docs', app, document, {
      swaggerOptions: {
        filter: true,
        showRequestDuration: true,
      },
    });
  }
}
