/** @format */

const dogs = [
  {
    breed: "Dalmation",
    animal_name: "Stella",
    age: 7,
    feed_times: "10am 3pm 7pm",
    food: "Pedigree Chum",
    scoops: 2,
    warning: "no bacon bits, no peanut butter",
    img: "stella.png", // added image path
  },
  {
    breed: "Bulldog",
    animal_name: "Buhmie",
    age: 1,
    feed_times: "9am 11am 4pm 7pm",
    food: "Farmer's Dog",
    scoops: 1,
    warning: "do not enter kennel",
    img: "buhmie.png",
  },
  {
    breed: "Australian Cattle Dog",
    animal_name: "Cody",
    age: 3,
    feed_times: "8am 11am 3pm 7pm",
    food: "Nutrish Active Dog",
    scoops: 3,
    warning: "don't touch crocodile toy",
    img: "cody.png",
  },
  {
    breed: "Cane-Corso",
    animal_name: "Zeus",
    age: 1,
    feed_times: "9am 3pm 7pm",
    food: "Science Diet",
    scoops: 4,
    warning: "do not enter kennel",
    img: "zeus.png",
  },
];

const cats = [
  {
    breed: "Persian",
    animal_name: "Mango",
    age: 2,
    feed_times: "10am 3pm 7pm",
    food: "Kitty Best",
    scoops: 2,
    warning: "no milk",
    img: "mango.png",
  },
  {
    breed: "Aegean",
    animal_name: "Cutie",
    age: 1,
    feed_times: "9am 11am 4pm 7pm",
    food: "Cat Care Premium",
    scoops: 1,
    warning: "do not remove from cage without Marian present",
    img: "cutie.png",
  },
  {
    breed: "Abyssinian",
    animal_name: "Zola",
    age: 3,
    feed_times: "8am 11am 3pm 7pm",
    food: "Nutrish Active Cat",
    scoops: 3,
    warning: "don't touch crocodile toy",
    img: "zola.png",
  },
  {
    breed: "Asian",
    animal_name: "Odin",
    age: 1,
    feed_times: "9am 3pm 7pm",
    food: "Science Diet",
    scoops: 4,
    warning: "do not stroke head",
    img: "odin.png",
  },
];

const getAllDogsAPI = () => {
  return dogs;
};

const getAllCatsAPI = () => {
  return cats;
};