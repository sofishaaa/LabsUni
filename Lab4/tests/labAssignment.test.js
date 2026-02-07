const {
  UserService,
  asyncHello,
  computeValue,
  asyncError,
  ApiClient,
  ApiHelper,
  calculateFinalPrice,
  OrderProcessor,
  getNumber,
} = require('../labAssignment'); // <- перевір свій шлях

// Завдання 1
describe('Завдання 1: UserService', () => {
  it('greet викликає getFullName з аргументами John, Doe і повертає HELLO, <імʼя>!', () => {
    const mockGetFullName = jest.fn().mockReturnValue('John Doe');
    const service = new UserService(mockGetFullName);
    const result = service.greet();
    expect(mockGetFullName).toHaveBeenCalledWith('John', 'Doe');
    expect(result).toBe('HELLO, JOHN DOE!');
  });
});

// Завдання 2
describe('Завдання 2: asyncHello', () => {
  it('повертає "hello world"', async () => {
    await expect(asyncHello()).resolves.toBe('hello world');
  });
});

// Завдання 3
describe('Завдання 3: computeValue', () => {
  it('повертає 94', async () => {
    await expect(computeValue()).resolves.toBe(94);
  });
});

// Завдання 4
describe('Завдання 4: asyncError', () => {
  it('відхиляється з помилкою "Something went wrong"', async () => {
    await expect(asyncError()).rejects.toThrow('Something went wrong');
  });
});

// Завдання 5
describe('Завдання 5: ApiClient.fetchData', () => {
  it('повертає JSON з полем fetchedAt', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve({ foo: 'bar' }) })
    );
    const client = new ApiClient();
    const data = await client.fetchData();
    expect(data.foo).toBe('bar');
    expect(typeof data.fetchedAt).toBe('number');
  });
});

// Завдання 6
describe('Завдання 6: ApiHelper.fetchViaHelper', () => {
  it('повертає очікуваний JSON', async () => {
    const apiCallFunction = jest.fn().mockResolvedValue({ test: 123 });
    const helper = new ApiHelper();
    const data = await helper.fetchViaHelper(apiCallFunction);
    expect(data).toEqual({ test: 123 });
  });

  it('кидає помилку для невалідних даних', async () => {
    const apiCallFunction = jest.fn().mockResolvedValue(null);
    const helper = new ApiHelper();
    await expect(helper.fetchViaHelper(apiCallFunction)).rejects.toThrow(
      'Invalid data'
    );
  });
});

// Завдання 7 (поки що падає)
describe('Завдання 7: calculateFinalPrice', () => {
  it('коректно рахує фінальну ціну', () => {
    // Тут дані трохи "неправильні", щоб тест падав
    const order = {
      items: [
        { price: 100, quantity: 1 },
        { price: 100, quantity: 1 },
      ],
      taxRate: 0.2,
      discountService: {
        getDiscount: (subtotal) => 0.3,
      },
    };
    const result = calculateFinalPrice(order);
    expect(result).toBe(168); // Падатиме, якщо логіка неправильна
  });

  it('кидає помилку для невалідних даних', () => {
    expect(() => calculateFinalPrice({ items: [] })).toThrow('Invalid order');
  });
});

// Завдання 8
describe('Завдання 8: OrderProcessor.processOrder', () => {
  it('коректно конвертує фінальну ціну', async () => {
    const mockConverter = jest.fn().mockResolvedValue(200);
    const processor = new OrderProcessor(mockConverter);
    const order = {
      items: [{ price: 100, quantity: 1 }],
      taxRate: 0,
    };
    const result = await processor.processOrder(order, 'USD');
    expect(result).toBe(200);
    expect(mockConverter).toHaveBeenCalled();
  });

  it('повертає оригінальну ціну, якщо конвертер кидає помилку', async () => {
    const mockConverter = jest.fn().mockRejectedValue(new Error('fail'));
    const processor = new OrderProcessor(mockConverter);
    const order = {
      items: [{ price: 100, quantity: 1 }],
      taxRate: 0,
    };
    const result = await processor.processOrder(order, 'USD');
    expect(result).toBe(100);
  });
});
