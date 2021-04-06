const one = {
  name: "Noal",
  age: 13,
  dob: "13-09-1998",
};

const two = {
  position: "Accounting",
  address: "P-au-P",
};

const txt = { ...one, x: { ...two } };

console.log(txt);
