"use strict";

const cars = [
  {
    brand: "BMW",
    model: "M3",
    year: 2017
  },
  {
    brand: "Audi",
    model: "Q5",
    year: 2018
  },
  {
    brand: "Mercedes",
    model: "S63",
    year: 2015
  },
  {
    brand: "Volkswagen",
    model: "Phaeton",
    year: 2012
  }
];

const carsConteiner = document.querySelector("#cars");

creatTable(carsConteiner, cars);

function creatTable(element, cars) {
  let currentField = null;
  let currentSign = 1;
  renderCars(element, cars);

  element.addEventListener('click', (e) => {
    const headerCell = e.target.closest('[data-sort-field]');

    if (!headerCell) {
      return;
    }

    const { sortField } = headerCell.dataset;

    if (sortField === currentField) {
      currentSign = -currentSign;
    } else {
      currentSign = 1;
    }

    currentField = sortField;
    const sortedCars = sortCarsBy(cars, sortField, currentSign);

    renderCars(element, sortedCars);
  });
}

function sortCarsBy(cars, field, sign = 1) {
  if (cars.length === 0) {
    return [];
  }

  const sortType = typeof cars[0][field];

  return [...cars].sort((a, b) => {
    switch (sortType) {
      case 'number':
        return sign * (a[field] - b[field]);

      case 'string':
        return sign * a[field].localeCompare(b[field]);

      default:
        return 0;
    }
  });
}

function getRowsHTML(cars) {
  return cars.map(car => `
    <tr>
      <td>${car.brand}</td>
      <td>${car.model}</td>
      <td>${car.year}</td>
    </tr>
  `).join('');
}

function renderCars(element, cars) {
  element.innerHTML = `
  <table>
    <thead>
      <tr>
        <th data-sort-field="brand">Brand</th>
        <th data-sort-field="model">Model</th>
        <th data-sort-field="year">Year</th>
      </tr>
    </thead>
    <tbody data-rows-container="">
      ${getRowsHTML(cars)}
    </tbody>
  </table>
  `;
}
