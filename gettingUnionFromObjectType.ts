// Super simplified from the last commit courtesy of 
// https://stackoverflow.com/questions/49285864/is-there-a-valueof-similar-to-keyof-in-typescript/49547901#49547901
type GetValueUnion<T> = T[keyof T];

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
