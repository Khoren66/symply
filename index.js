class Person{
    constructor(name, age) {
        this.name = name;
        this.age = age;
        setInterval(() => {
            this.age+=1
        }, 1000)
      }    
}

let max = new Person("Max",25)
let bob = new Person("Bob",12) 
let ray = new Person("Ray",34)  
let sam = new Person("Sam",19) 

let persons=[]
persons.push(max,bob,ray,sam)

    setInterval(() => {
        persons.map((el,i)=>{if(el.age>=40){
        persons.splice(i,1)}})
        console.log(...persons)
    }, 1000);

    setInterval(() => {
        persons.push(new Person(`${faker.name.findName()}`,Math.ceil(Math.random() * 50)))
    }, 2000);

