// Say we want to get a union type of value from
// an object type such as an object type alias
// or an interface or an `as const` assignment

// The technique used is to let typescript compiler
// infer a type and then grabbing that type using `infer`

// first off, we define a type that grabs the type of the
// parameter at a given index.
// Here, F is the function and I is the index of the param
// we want the type of. I > no. of., params the function takes
// we get undefined
// e.g., type ParamOneType = GetParamTypeAtIndex<(a: number) => void, 0> // type ParamOneType = number
type GetParamTypeAtIndex<F, I extends number> = F extends (
  ...args: infer U
) => any
  ? U[I]
  : never;

// next, we define design a function that causes the typescript
// compiler to infer the union type from the object type for us
// It looks like <K extends keyof YourObjectType>(arg: YourObjectType[K]) => void;

// finally, let's wrap that up as a generic
type GetValueUnion<T> = GetParamTypeAtIndex<
  <K extends keyof T>(arg: T[K]) => void,
  0
>;

// now, let's define some test object types and see
// how we can get a union of the types of values they hold
type SomeObjectType = {
  a: number;
  b: string;
  c: {
    d: Record<string, SomeObjectType>; // woop recursive type
  };
};

type SomeObjectTypeValue = GetValueUnion<SomeObjectType>;

interface User {
  name: string;
  age: number;
}

type UserPropertyTypesUnion = GetValueUnion<User>;

const games = {
  csgo: {
    type: "fps",
    price: 0
  },
  apexlegends: {
    type: "fps",
    price: 29.99
  }
} as const;

type Game = GetValueUnion<typeof games>;
