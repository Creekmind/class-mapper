# @cmind/class-mapper

Class mapper consist of several decorators and two functions: box(), unbox(). You use box to convert your class 
to raw JS object. And unbox() to convert JS object and its nested properties to the instances of specified classes.  


## Install

```shell script
npm i --save @cmind/class-mapper
```

## Usage

```ts
class Person {
  @number()
  id: number;
  @string()
  name: string;
  @boolean()
  enabled: boolean;

  displayName: string;

  constructor(id: number, name: string, enabled = true) {
    this.id = id;
    this.name = name;
    this.enabled = enabled;
  }
}

class Organization {
  @number()
  id: number;

  @array(Person)
  employees: Person[];
}

```

```ts
const raw = {
  id: '3591',
  employees: [{
    id: 1,
    name: 'John',
    enabled: true
  }, {
    id: 2,
    name: 'Jack',
    enabled: true
  }]
};

const organization = unbox<Organization>(raw, Organization);

console.log(organization instanceof Organization); //true
console.log(organization.id === 3591); //true
console.log(organization.employees[0] instanceof Person); //true

const rawOrganization = box<Organization>(organization);
```

### Decorators:
```
any();                     // no conversion
number();                  // convert input value to number (+value) 
string();                  // convert input value to string (value.toString())
boolean();                 // convert input value to boolean (!!value)
object(cls: new() => any); // unbox input value to cls
array(cls: new() => any);  // create array and unbox input each element of input value to cls

skipBoxing();              // Skip field on boxing
skipUnboxing();            // Skip field on unboxing 
``` 
