import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GetDeliveryPricingDto } from '../dto/get-delivery-pricing.dto';
import { DeliveryPricingResponse } from '../interfaces/delivery-pricing.interface';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { calculateDistance } from '../utils/calculate-distance.utils';

@Injectable()
export class DeliveryPricingService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
  async getDeliveryPricing(
    dto: GetDeliveryPricingDto,
  ): Promise<DeliveryPricingResponse> {
    const { venue_slug, cart_value, user_lat, user_lon } = dto;

    // Fetch venue data (static and dynamic)
    const [staticData, dynamicData] = await this.fetchVenueData(venue_slug);

    // Extract coordinates and delivery specs
    const { venueLat, venueLon } = this.extractCoordinates(staticData);
    const { orderMinSurcharge, basePrice, distanceRanges } =
      this.extractDeliverySpecs(dynamicData);

    // Calculate distance from user to venue
    const distance = calculateDistance(user_lat, user_lon, venueLat, venueLon);

    // Calculate surcharge and delivery fee
    const smallOrderSurcharge = Math.max(0, orderMinSurcharge - cart_value);
    const deliveryFee = this.calculateDeliveryFee(
      distance,
      basePrice,
      distanceRanges,
    );

    // Total price calculation
    const totalPrice = cart_value + smallOrderSurcharge + deliveryFee;

    return {
      total_price: totalPrice,
      small_order_surcharge: smallOrderSurcharge,
      cart_value,
      delivery: {
        fee: deliveryFee,
        distance,
      },
    };
  }

  private async fetchVenueData(venueSlug: string) {
    const staticUrlBase = this.configService.get<string>('STATIC_URL_BASE');
    const dynamicUrlBase = this.configService.get<string>('DYNAMIC_URL_BASE');

    const staticUrl = `${staticUrlBase}/${venueSlug}/static`;
    const dynamicUrl = `${dynamicUrlBase}/${venueSlug}/dynamic`;

    const staticData = await firstValueFrom(this.httpService.get(staticUrl));
    const dynamicData = await firstValueFrom(this.httpService.get(dynamicUrl));

    return [staticData, dynamicData];
  }

  private extractCoordinates(staticData: any) {
    const coordinates = staticData.data.venue_raw.location.coordinates;
    return {
      venueLat: coordinates[1],
      venueLon: coordinates[0],
    };
  }

  private extractDeliverySpecs(dynamicData: any) {
    const deliverySpecs = dynamicData.data.venue_raw.delivery_specs;
    return {
      orderMinSurcharge: deliverySpecs.order_minimum_no_surcharge,
      basePrice: deliverySpecs.delivery_pricing.base_price,
      distanceRanges: deliverySpecs.delivery_pricing.distance_ranges,
    };
  }

  private calculateDeliveryFee(
    distance: number,
    basePrice: number,
    distanceRanges: any[],
  ): number {
    let fee = basePrice;
    for (const range of distanceRanges) {
      if (distance >= range.min && (distance < range.max || range.max === 0)) {
        fee += range.a + Math.round((range.b * distance) / 10);
        break;
      }
    }
    return fee;
  }
}
