const engine = require('../index');

console.log(engine('<p>my name is {{ name }}</p><p>my sex is {{ sex }}</p>', {
  name: 'shawncheung',
  sex: 'man'
}));

console.log(engine(
  `
  <p>my name is {{ name }}</p>
  <p>my sex is {{ sex }}</p>
  {{ for(var index in this.skills){ }}
  <a href="#">{{ skills[index] }}</a>
  {{ } }}
  `, {
  name: 'shawncheung',
  sex: 'man',
  skills: ['js', 'nodejs']
}));