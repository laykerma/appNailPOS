export interface Client {
  id: number;
  name: string;
  service: string;
  price: number;
  startTime: string;
  status: string;
}

export interface ServiceItem {
  id: number;
  name: string;
  price: number;
}

export interface POSState {
  clients: Client[];
  services: ServiceItem[];
  ticket: ServiceItem[];
  tip: number;
  currentClient: Client | null;
}

export type POSAction =
  | { type: 'SET_CURRENT_CLIENT'; payload: Client | null }
  | { type: 'ADD_SERVICE'; payload: ServiceItem }
  | { type: 'REMOVE_SERVICE'; payload: number }
  | { type: 'SET_TIP'; payload: number }
  | { type: 'CLEAR_TICKET' }
  | { type: 'INIT_FROM_STORAGE'; payload: Partial<POSState> };

export const initialState: POSState = {
  clients: [
    { id: 1, name: 'Sophie', service: 'Gel mani · Nail art', price: 65, startTime: '11:40 am', status: 'active' },
    { id: 2, name: 'Client', service: 'Pedicure', price: 45, startTime: '12:05 pm', status: 'active' },
  ],
  services: [
    { id: 1, name: 'Manicure', price: 35 },
    { id: 2, name: 'Gel mani', price: 55 },
    { id: 3, name: 'Pedicure', price: 45 },
    { id: 4, name: 'Spa pedicure', price: 65 },
    { id: 5, name: 'SNS full set', price: 65 },
    { id: 6, name: 'Acrylic set', price: 70 },
    { id: 7, name: 'Refill', price: 50 },
    { id: 8, name: 'Removal', price: 15 },
    { id: 9, name: 'Nail art', price: 10 },
    { id: 10, name: 'French tip', price: 10 },
    { id: 11, name: 'Gel upgrade', price: 15 },
    { id: 12, name: 'Repair', price: 5 },
  ],
  ticket: [],
  tip: 0,
  currentClient: null,
};

export const posReducer = (state: POSState, action: POSAction): POSState => {
  switch (action.type) {
    case 'SET_CURRENT_CLIENT':
      return { ...state, currentClient: action.payload };
    case 'ADD_SERVICE':
      return { ...state, ticket: [...state.ticket, action.payload] };
    case 'REMOVE_SERVICE':
      return { ...state, ticket: state.ticket.filter((_, i) => i !== action.payload) };
    case 'SET_TIP':
      return { ...state, tip: action.payload };
    case 'CLEAR_TICKET':
      return { ...state, ticket: [], tip: 0 };
    case 'INIT_FROM_STORAGE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

