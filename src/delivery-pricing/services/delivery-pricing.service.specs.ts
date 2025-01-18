import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryPricingService } from './delivery-pricing.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';

describe('DeliveryPricingService', () => {
  let service: DeliveryPricingService;

  beforeEach(async () => {
    const mockHttpService = {
      get: jest
        .fn()
        .mockReturnValue(
          of({ data: { venue_raw: { location: { coordinates: [0, 0] } } } }),
        ),
    };

    const mockConfigService = {
      get: jest.fn((key: string) => {
        if (key === 'STATIC_URL_BASE')
          return 'https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/home-assignment-venue-helsinki/static';
        if (key === 'DYNAMIC_URL_BASE')
          return 'https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/home-assignment-venue-helsinki/dynamic';
        return null;
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeliveryPricingService,
        { provide: HttpService, useValue: mockHttpService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<DeliveryPricingService>(DeliveryPricingService);
    module.get<HttpService>(HttpService);
    module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return price breakdown for getDeliveryPricing', async () => {
    const dto = {
      venue_slug: 'home-assignment-venue-helsinki',
      cart_value: 1000,
      user_lat: 60,
      user_lon: 24,
    };

    const result = await service.getDeliveryPricing(dto);

    expect(result).toHaveProperty('total_price');
    expect(result).toHaveProperty('small_order_surcharge');
    expect(result.delivery).toHaveProperty('fee');
    expect(result.delivery).toHaveProperty('distance');
  });
});
