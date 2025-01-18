import { Controller, Get, Query } from '@nestjs/common';
import { GetDeliveryPricingDto } from '../dto/get-delivery-pricing.dto';
import { DeliveryPricingResponse } from '../interfaces/delivery-pricing.interface';
import { DeliveryPricingService } from '../services/delivery-pricing.service';

@Controller('api/v1/delivery-order-price')
export class DeliveryPricingController {
  constructor(
    private readonly deliveryPricingService: DeliveryPricingService,
  ) {}

  @Get()
  async getDeliveryPricing(
    @Query() dto: GetDeliveryPricingDto,
  ): Promise<DeliveryPricingResponse> {
    return this.deliveryPricingService.getDeliveryPricing(dto);
  }
}
