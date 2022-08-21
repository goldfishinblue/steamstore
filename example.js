data = [
  {name:'tuan', age:25, job: 'coffee drinker'},
  {name:'trinh', age:18, job: 'reddit poster'},
]

filter = data.map((d) => ({age: d.age, job: d.job}))

console.log(filter)

