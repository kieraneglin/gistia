const util = require('util');
const Gistia = require('./gistia');

let input = {
  firstName: 'John',
  lastName: 'Green',
  car: {
    make: 'Honda',
    model: 'Civic',
    revisions: [{
        miles: 10150,
        code: 'REV01',
        changes: []
      },
      {
        miles: 20021,
        code: 'REV02',
        changes: [{
            type: 'asthetic',
            desc: 'Left tire cap'
          },
          {
            type: 'mechanic',
            desc: 'Engine pressure regulator'
          }
        ]
      }
    ]
  },
  visits: [{
      date: '2015-01-01',
      dealer: 'DEAL-001'
    },
    {
      date: '2015-03-01',
      dealer: 'DEAL-002'
    }
  ]
};

let g = new Gistia();
let flat = g.flatten(input);
let nested = g.unflatten(flat);

console.log('Flattening: ');
console.log(util.inspect(flat, false, null));

console.log("\n\n");

console.log('Unflattening: ');
console.log(util.inspect(nested, false, null));
