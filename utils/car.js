import axios from 'axios';
const baseUrl = 'https://www.fueleconomy.gov';

export async function getItems(step, prev) {
  switch (step) {
    case 0: {
      return {
        year: await getYear(),
        make: null,
        model: null,
      };
    }
    case 1: {
      return {
        year: prev.year,
        make: await getMakes(prev.year),
        model: null,
      };
    }
    case 2: {
      return {
        year: prev.year,
        make: prev.make,
        model: await getModels(prev.year, prev.make),
      };
    }
    case 3: {
      return prev;
    }
    default:
      return {
        year: null,
        make: null,
        model: null,
      };
  }
}

export async function getYear() {
  try {
    const url = `${baseUrl}/ws/rest/vehicle/menu/year`;
    const years = await axios(url, {
      method: 'get',
    });
    return years.data.menuItem;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getMakes(year) {
  try {
    const url = `${baseUrl}/ws/rest/vehicle/menu/make?year=${year}`;
    const makes = await axios(url, {
      method: 'get',
    });
    return makes.data.menuItem;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getModels(year, make) {
  try {
    const url = `${baseUrl}/ws/rest/vehicle/menu/model?year=${year}&make=${make}`;
    const models = await axios(url, {
      method: 'get',
    });

    if (models.data.menuItem.value) return [models.data.menuItem];
    return models.data.menuItem;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getVehicleId(year, make, model) {
  try {
    const url = `${baseUrl}/ws/rest/vehicle/menu/options?year=${year}&make=${make}&model=${model}`;
    const id = await axios(url, {
      method: 'get',
    });
    if (id.data.menuItem[0]) return id.data.menuItem[0].value;
    return id.data.menuItem.value;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getCarEconomy(modelId) {
  try {
    const url = `https://www.fueleconomy.gov/ws/rest/vehicle/${modelId}`;
    const car = await axios(url, {
      method: 'get',
    });
    const economy = {
      city: converToKmPerLiter(car.data.city08),
      highway: converToKmPerLiter(car.data.highway08),
    };

    return economy;
  } catch (error) {
    console.log(error);
    return {city: 10, highway: 10};
  }
}

function converToKmPerLiter(milesPerGalon) {
  return (milesPerGalon / 2.352).toFixed(2);
}

export async function getCarInfo(year, make, model) {
  try {
    const id = await getVehicleId(year, make, model);
    const economy = await getCarEconomy(id);

    const car = {
      info: {
        id,
        year,
        make,
        model,
      },
      economy,
    };
    return car;
  } catch (err) {
    console.log(err);
    return {
      id: '',
      year: '',
      make: '',
      model: '',
      economy: {
        city: 10,
        highway: 10,
      },
    };
  }
}
