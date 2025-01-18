import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryPricingController } from './delivery-pricing.controller';
import { DeliveryPricingService } from '../services/delivery-pricing.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';

describe('DeliveryPricingController', () => {
  let controller: DeliveryPricingController;
  let service: DeliveryPricingService;

  // Mocking the dependencies
  const mockConfigService = {
    get: jest.fn().mockReturnValue('some-value'), // Mocking the ConfigService
  };

  const mockHttpService = {
    get: jest.fn().mockReturnValue(of({ data: {} })), // Mocking the HttpService
  };

  // mock version of DeliveryPricingService
  const mockDeliveryPricingService = {
    getDeliveryPricing: jest.fn().mockResolvedValue({
      total_price: 1190,
      small_order_surcharge: 0,
      cart_value: 1000,
      delivery: {
        fee: 190,
        distance: 177,
      },
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryPricingController],
      providers: [
        {
          provide: DeliveryPricingService,
          useValue: mockDeliveryPricingService,
        },
        { provide: ConfigService, useValue: mockConfigService },
        { provide: HttpService, useValue: mockHttpService },
      ],
    }).compile();

    controller = module.get<DeliveryPricingController>(
      DeliveryPricingController,
    );
    service = module.get<DeliveryPricingService>(DeliveryPricingService);
  });

  // Test if the controller is defined
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Test the "getDeliveryPricing" method from the controller
  it('should return a price breakdown', async () => {
    const dto = {
      venue_slug: 'home-assignment-venue-helsinki',
      cart_value: 1000,
      user_lat: 60.17094,
      user_lon: 24.93087,
    };

    const result = await controller.getDeliveryPricing(dto);

    // Validate that the result contains the expected properties
    expect(result).toHaveProperty('total_price');
    expect(result).toHaveProperty('small_order_surcharge');
    expect(result).toHaveProperty('cart_value');
    expect(result).toHaveProperty('delivery');
    expect(result.delivery).toHaveProperty('fee');
    expect(result.delivery).toHaveProperty('distance');
  });

  // Test the service method call within the controller
  it('should call DeliveryPricingService.getDeliveryPricing', async () => {
    const dto = {
      venue_slug: 'home-assignment-venue-helsinki',
      cart_value: 1000,
      user_lat: 60.17094,
      user_lon: 24.93087,
    };

    await controller.getDeliveryPricing(dto);
    expect(mockDeliveryPricingService.getDeliveryPricing).toHaveBeenCalledWith(
      dto,
    );
  });
});
