export function setUserModelId(modelId) {
  return {
    type: 'SET_USER_MODEL_ID',
    payload: modelId,
  };
}
export function setUserMaam(maam) {
  return {
    type: 'SET_USER_MAAM',
    payload: maam,
  };
}

export function setUserService(service) {
  return {
    type: 'SET_USER_SERVICE',
    payload: service,
  };
}
export function setUserCar(car) {
  return {
    type: 'SET_USER_CAR',
    payload: car,
  };
}
export function setUserAddress(address) {
  return {
    type: 'SET_USER_ADDRESS',
    payload: address,
  };
}
const defaultState = {
  maam: true,
  service: false,
  car: {
    info: {
      id: 31862,
      year: 2012,
      make: 'Chevrolet',
      model: 'Silverado 15 Hybrid 4WD',
    },
    economy: {city: 8.5, highway: 9.78},
  },
  address: {
    origin: '',
    destination: '',
  },
};

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case 'SET_USER_MODEL_ID': {
      const newState = {...state, modelId: action.payload};
      return newState;
    }
    case 'SET_USER_MAAM': {
      const newState = {...state, maam: action.payload};
      return newState;
    }
    case 'SET_USER_SERVICE': {
      const newState = {...state, service: action.payload};
      return newState;
    }
    case 'SET_USER_CAR': {
      const newState = {...state, car: action.payload};
      return newState;
    }
    case 'SET_USER_ADDRESS': {
      const newState = {...state, address: action.payload};
      return newState;
    }

    default: {
      return state;
    }
  }
}
