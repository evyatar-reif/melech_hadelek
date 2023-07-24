import axios from 'axios';
import secret from '../secret.json';
const apiKey = secret.google_api_key;

const citySpeedLimit = 50;

export async function calcDrive(origin, destination) {
  try {
    const o = await getAddress(origin.split(' ').join('%20'));
    const d = await getAddress(destination.split(' ').join('%20'));
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${d}&origins=${o}&units=imperial&key=${apiKey}`;
    const req = await axios(url, {
      method: 'get',
    });
    // console.log(url);
    const distance = req.data.rows[0].elements[0].distance.value;
    const distanceInKm = (distance / 1000).toFixed(2);

    const durationInHours = (
      req.data.rows[0].elements[0].duration.value /
      60 /
      60
    ).toFixed(2);
    const speedInKmh = Math.round(distanceInKm / durationInHours);
    const drive = {
      distance: distanceInKm,
      speedInKmh: speedInKmh,
      type: speedInKmh > citySpeedLimit ? 'highway' : 'city',
    };
    return drive;
  } catch (err) {
    console.log(err);
    const drive = {
      distance: 0,
      speedInKmh: 100,
      type: 'city',
    };
    return drive;
  }
}

export async function getPrice() {
  try {
    const url = 'https://fuelcalc.energydmz.org/api/prices/getLatestPrice';
    const price = await axios(url, {
      method: 'get',
    });
    const result = {
      noMaamNoService: price.data[0],
      noMaamYesService: price.data[1],
      yesMaamNoService: price.data[2],
      yesMaamYesService: price.data[3],
    };
    return result;
  } catch (error) {
    console.log(error);
    const result = {
      noMaamNoService: 0,
      noMaamYesService: 0,
      yesMaamNoService: 0,
      yesMaamYesService: 0,
    };
    return result;
  }
}

export async function calcCost(distance, economy, type) {
  const price = await getPrice();
  const litersUsed =
    type == 'city' ? distance / economy.city : distance / economy.highway;

  const totalCost = {
    noMaamNoService: litersUsed * price['noMaamNoService'].PriceValue,
    noMaamYesService: litersUsed * price['noMaamYesService'].PriceValue,
    yesMaamNoService: litersUsed * price['yesMaamNoService'].PriceValue,
    yesMaamYesService: litersUsed * price['yesMaamYesService'].PriceValue,
  };

  return totalCost;
}

export async function getAddress(address) {
  const a = address.split(' ').join('%20');
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${a}&key=${apiKey}&language=he`;
  const geo = await axios(url, {
    method: 'get',
  });
  return geo.data.results[0].formatted_address;
}
export async function getAddressFromGeometry(lat, lng) {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}&language=he`;
    console.log(url);
    const address = await axios(url, {
      method: 'get',
    });
    return address.data.results[0].formatted_address;
  } catch (err) {
    console.log(err);
    return '';
  }
}

export async function getGeolocation(address) {
  const a = address.split(' ').join('%20');
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${a}&key=${apiKey}`;
  console.log(url);
  const geo = await axios(url, {
    method: 'get',
  });

  const parsed = {
    latitude: Number.parseFloat(geo.data.results[0].geometry.location.lat),
    longitude: Number.parseFloat(geo.data.results[0].geometry.location.lng),
  };

  return parsed;
}
