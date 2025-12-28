/**
 * MSW Server Setup for Integration Tests
 * 
 * Provides Mock Service Worker (MSW) setup for API mocking
 * Used by all integration tests to intercept HTTP requests
 */

import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

const API_BASE_URL = 'http://localhost:5001/api';

/**
 * Default mock handlers - can be extended per test
 */
const defaultHandlers = [
  // Health check endpoint
  http.get(`${API_BASE_URL}/health`, () => {
    return HttpResponse.json({ status: 'ok' });
  }),

  // Common metadata endpoints
  http.get(`${API_BASE_URL}/companies`, () => {
    return HttpResponse.json([
      { id: 1, name: 'Company 1', code: 'COMP1' },
      { id: 2, name: 'Company 2', code: 'COMP2' },
    ]);
  }),

  http.get(`${API_BASE_URL}/plants`, () => {
    return HttpResponse.json([
      { id: 1, name: 'Plant 1', code: 'PLT1', type: 'HYDROELECTRIC', companyId: 1 },
      { id: 2, name: 'Plant 2', code: 'PLT2', type: 'THERMAL', companyId: 1 },
    ]);
  }),

  http.get(`${API_BASE_URL}/plant-types`, () => {
    return HttpResponse.json([
      { id: 1, name: 'Hydroelectric', code: 'HYDRO' },
      { id: 2, name: 'Thermal', code: 'THERMAL' },
    ]);
  }),

  // Energetic data endpoints
  http.get(`${API_BASE_URL}/dadosenergeticos`, () => {
    return HttpResponse.json([
      {
        Id: 1,
        UsinaId: 1,
        DataReferencia: '2024-01-15T00:00:00Z',
        Intervalo: 1,
        ValorMW: 100,
        RazaoEnergetica: 50,
      },
    ]);
  }),

  http.post(`${API_BASE_URL}/dadosenergeticos`, async ({ request }) => {
    const data = await request.json();
    return HttpResponse.json(
      {
        Id: 999,
        ...data,
      },
      { status: 201 }
    );
  }),

  // Electrical data endpoints
  http.get(`${API_BASE_URL}/dadoseletricos`, () => {
    return HttpResponse.json([
      {
        Id: 1,
        UsinaId: 1,
        DataReferencia: '2024-01-15T00:00:00Z',
        Intervalo: 1,
        TensaoMV: 230,
        RazaoEletrica: 75,
      },
    ]);
  }),

  http.post(`${API_BASE_URL}/dadoseletricos`, async ({ request }) => {
    const data = await request.json();
    return HttpResponse.json(
      {
        Id: 999,
        ...data,
      },
      { status: 201 }
    );
  }),

  // IR endpoints
  http.get(`${API_BASE_URL}/insumos-recebimento/ir1`, () => {
    return HttpResponse.json([
      {
        Id: 1,
        DataReferencia: '2024-01-15T00:00:00Z',
        NivelPartida: 50,
      },
    ]);
  }),

  http.get(`${API_BASE_URL}/insumos-recebimento/ir2`, () => {
    return HttpResponse.json([
      {
        Id: 1,
        DataReferencia: '2024-01-15T00:00:00Z',
        DiaMenos1: 45,
      },
    ]);
  }),

  http.get(`${API_BASE_URL}/insumos-recebimento/ir3`, () => {
    return HttpResponse.json([
      {
        Id: 1,
        DataReferencia: '2024-01-15T00:00:00Z',
        DiaMenos2: 40,
      },
    ]);
  }),

  http.get(`${API_BASE_URL}/insumos-recebimento/ir4`, () => {
    return HttpResponse.json([
      {
        Id: 1,
        DataReferencia: '2024-01-15T00:00:00Z',
        CargaAnde: 3500,
      },
    ]);
  }),

  // Export offer endpoints
  http.get(`${API_BASE_URL}/ofertas-exportacao`, () => {
    return HttpResponse.json([
      {
        Id: 1,
        UsinaId: 1,
        DataReferencia: '2024-01-15T00:00:00Z',
        Preco: 150,
        Quantidade: 100,
      },
    ]);
  }),

  http.post(`${API_BASE_URL}/ofertas-exportacao`, async ({ request }) => {
    const data = await request.json();
    return HttpResponse.json(
      {
        Id: 999,
        ...data,
      },
      { status: 201 }
    );
  }),
];

/**
 * Create MSW server with default handlers
 */
export const server = setupServer(...defaultHandlers);

/**
 * Setup MSW to intercept requests before tests run
 */
export function setupMSW() {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });
}

/**
 * Helper to add custom handlers for specific tests
 */
export function mockEndpoint(
  method: 'get' | 'post' | 'put' | 'delete' | 'patch',
  path: string,
  response: unknown,
  options: { status?: number } = {}
) {
  const handler =
    method === 'get'
      ? http.get(`${API_BASE_URL}${path}`, () =>
          HttpResponse.json(response, { status: options.status || 200 })
        )
      : method === 'post'
        ? http.post(`${API_BASE_URL}${path}`, () =>
            HttpResponse.json(response, { status: options.status || 201 })
          )
        : method === 'put'
          ? http.put(`${API_BASE_URL}${path}`, () =>
              HttpResponse.json(response, { status: options.status || 200 })
            )
          : method === 'delete'
            ? http.delete(`${API_BASE_URL}${path}`, () =>
                HttpResponse.json(response, { status: options.status || 204 })
              )
            : http.patch(`${API_BASE_URL}${path}`, () =>
                HttpResponse.json(response, { status: options.status || 200 })
              );

  server.use(handler);
}

/**
 * Helper to mock error responses
 */
export function mockErrorEndpoint(
  method: 'get' | 'post' | 'put' | 'delete' | 'patch',
  path: string,
  statusCode: number = 500,
  errorMessage: string = 'Server error'
) {
  const handler =
    method === 'get'
      ? http.get(`${API_BASE_URL}${path}`, () =>
          HttpResponse.json({ message: errorMessage }, { status: statusCode })
        )
      : method === 'post'
        ? http.post(`${API_BASE_URL}${path}`, () =>
            HttpResponse.json({ message: errorMessage }, { status: statusCode })
          )
        : method === 'put'
          ? http.put(`${API_BASE_URL}${path}`, () =>
              HttpResponse.json({ message: errorMessage }, { status: statusCode })
            )
          : method === 'delete'
            ? http.delete(`${API_BASE_URL}${path}`, () =>
                HttpResponse.json({ message: errorMessage }, { status: statusCode })
              )
            : http.patch(`${API_BASE_URL}${path}`, () =>
                HttpResponse.json({ message: errorMessage }, { status: statusCode })
              );

  server.use(handler);
}

/**
 * Helper to mock network error (connection failure)
 */
export function mockNetworkError(method: 'get' | 'post' | 'put' | 'delete' | 'patch', path: string) {
  const handler =
    method === 'get'
      ? http.get(`${API_BASE_URL}${path}`, () => {
          throw new Error('Network error');
        })
      : method === 'post'
        ? http.post(`${API_BASE_URL}${path}`, () => {
            throw new Error('Network error');
          })
        : method === 'put'
          ? http.put(`${API_BASE_URL}${path}`, () => {
              throw new Error('Network error');
            })
          : method === 'delete'
            ? http.delete(`${API_BASE_URL}${path}`, () => {
                throw new Error('Network error');
              })
            : http.patch(`${API_BASE_URL}${path}`, () => {
                throw new Error('Network error');
              });

  server.use(handler);
}
