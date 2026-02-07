const { UserService, asyncHello, computeValue, asyncError, ApiClient, ApiHelper, calculateFinalPrice, OrderProcessor } = require('../labAssignment');

describe('Завдання 1: UserService', () => {
  it('greet викликає getFullName з аргументами John, Doe і повертає HELLO, <ім\'я>!', () => {
    const mockGetFullName = jest.fn().mockReturnValue('John Doe');
    const service = new UserService(mockGetFullName);

    const result = service.greet();

    expect(mockGetFullName).toHaveBeenCalledWith('John', 'Doe');
    expect(result).toBe('HELLO, JOHN DOE!');
  });
});

describe('Завдання 2: asyncHello', () => {
  it('повертає "hello world"', async () => {
    await expect(asyncHello()).resolves.toBe('hello world');
    // або:
    const result = await asyncHello();
    expect(result).toBe('hello world');
  });
});

describe('Завдання 3: computeValue', () => {
  it('повертає 94', () => {
    expect(computeValue()).toBe(94);
  });
});

describe('Завдання 4: asyncError', () => {
  it('відхиляється з помилкою "Something went wrong"', async () => {
    await expect(asyncError()).rejects.toThrow('Something went wrong');
  });
});

describe('Завдання 5: ApiClient.fetchData', () => {
  it('повертає JSON з полем fetchedAt', async () => {
    const mockResponse = { data: 'test' };
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(mockResponse)
    });

    const client = new ApiClient();
    const result = await client.fetchData();

    expect(result).toMatchObject(mockResponse);
    expect(typeof result.fetchedAt).toBe('number');
  });
});

describe('Завдання 6: ApiHelper.fetchViaHelper', () => {
  it('повертає очікуваний JSON', async () => {
    const mockApiCall = jest.fn().mockResolvedValue({ ok: true });
    const helper = new ApiHelper(mockApiCall);

    const result = await helper.fetchViaHelper();

    expect(result).toEqual({ ok: true });
    expect(mockApiCall).toHaveBeenCalled();
  });
});

describe('Завдання 7: calculateFinalPrice', () => {
  it('коректно рахує фінальну ціну', () => {
    const order = {
      items: [{ price: 100, quantity: 2 }],
      discount: 0.3, // 30%
      taxRate: 0.2   // 20%
    };
    const result = calculateFinalPrice(order);
    // базова сума = 200, знижка = 60, залишок = 140, податок = 28, фінальна = 168
    expect(result).toBe(168);
  });

  it('кидає помилку для невалідних даних', () => {
    expect(() => calculateFinalPrice({ items: [] })).toThrow();
    expect(() => calculateFinalPrice({ items: [{ price: -10, quantity: 1 }] })).toThrow();
  });
});

describe('Завдання 8: OrderProcessor.processOrder', () => {
  it('коректно конвертує фінальну ціну', () => {
    const mockConverter = jest.fn().mockReturnValue(200);
    const processor = new OrderProcessor(mockConverter);

    const order = { items: [{ price: 100, quantity: 2 }], discount: 0, taxRate: 0 };
    const result = processor.processOrder(order);

    expect(result).toBe(200);
    expect(mockConverter).toHaveBeenCalled();
  });

  it('повертає оригінальну ціну, якщо конвертер кидає помилку', () => {
    const mockConverter = jest.fn().mockImplementation(() => { throw new Error('Conversion failed'); });
    const processor = new OrderProcessor(mockConverter);

    const order = { items: [{ price: 100, quantity: 1 }], discount: 0, taxRate: 0 };
    const result = processor.processOrder(order);

    expect(result).toBe(100);
  });
});
