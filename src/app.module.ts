import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeliveryPricingModule } from './delivery-pricing/delivery-pricing.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DeliveryPricingModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
