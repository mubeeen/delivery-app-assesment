import { Module } from '@nestjs/common';
import { DeliveryPricingController } from './controllers/delivery-pricing.controller';
import { DeliveryPricingService } from './services/delivery-pricing.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [DeliveryPricingController],
  providers: [DeliveryPricingService],
})
export class DeliveryPricingModule {}
