const pactum = require('pactum');

// 4.1 Currency API
describe('Currency API', () => {
  const baseUrl = 'https://latest.currency-api.pages.dev/v1';

  test('Список доступних валют', async () => {
    await pactum.spec()
      .get(`${baseUrl}/currencies.json`)
      .expectStatus(200)
      .expectJsonLike({ usd: "US Dollar", eur: "Euro" });
  });

  test('Курс євро до інших валют', async () => {
    const res = await pactum.spec()
      .get(`${baseUrl}/currencies/eur.json`)
      .expectStatus(200);
    expect(res.json.eur).toHaveProperty('usd');
    expect(res.json.eur).toHaveProperty('uah');
  });

  test('Курс євро до долара', async () => {
    const res = await pactum.spec()
      .get(`${baseUrl}/currencies/eur.json`)
      .expectStatus(200);
    expect(res.json.eur.usd).toEqual(expect.any(Number));
  });

  test('Запит на неіснуючу валюту', async () => {
    await pactum.spec()
      .get(`${baseUrl}/currencies/xxx.json`)
      .expectStatus(404);
  });
});

// 4.2 Bank Holidays API
describe('Bank Holidays API', () => {
  const url = 'https://www.gov.uk/bank-holidays.json';

  test('Кількість святкових днів', async () => {
    const res = await pactum.spec().get(url).expectStatus(200);
    const data = res.json['england-and-wales'].events;
    expect(data.length).toBeGreaterThan(0);
  });

  test('Дата Пасхи', async () => {
    const res = await pactum.spec().get(url).expectStatus(200);
    const events = res.json['england-and-wales'].events;
    const easter = events.find(e => e.title.toLowerCase().includes('easter'));
    expect(easter).toBeDefined();
    expect(easter.date).toMatch(/\d{4}-\d{2}-\d{2}/);
  });
});

// 4.3 Cat Facts API
describe('Cat Facts API', () => {
  test('Структура breed', async () => {
    const res = await pactum.spec()
      .get('https://catfact.ninja/breeds')
      .expectStatus(200);
    expect(res.json.data[0]).toHaveProperty('breed');
    expect(typeof res.json.data[0].breed).toBe('string');
  });

  test('Структура fact', async () => {
    const res = await pactum.spec()
      .get('https://catfact.ninja/fact')
      .expectStatus(200);
    expect(typeof res.json.fact).toBe('string');
    expect(typeof res.json.length).toBe('number');
  });

  test('Перевірка limit', async () => {
    const res = await pactum.spec()
      .get('https://catfact.ninja/facts?limit=3')
      .expectStatus(200);
    expect(res.json.data.length).toBe(3);
  });

  test('Перевірка заголовків', async () => {
    const res = await pactum.spec().get('https://catfact.ninja/fact').expectStatus(200);
    expect(res.headers).toHaveProperty('server');
    expect(res.headers).toHaveProperty('cache-control');
    expect(res.headers).toHaveProperty('date');
  });
});

// 4.4 Dictionary API
describe('Dictionary API', () => {
  const words = ['hello', 'world', 'science', 'test', 'love'];

  for (const word of words) {
    test(`Перевірка прикладів використання слова ${word}`, async () => {
      const res = await pactum.spec()
        .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .expectStatus(200);
      const meanings = res.json[0].meanings;
      const hasExample = meanings.some(m => m.definitions.some(d => d.example));
      expect(hasExample).toBe(true);
    });
  }
});
