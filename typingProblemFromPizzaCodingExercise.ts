type Item<T, P> = {
  type: T;
  price: P;
};

type Inventory = {
  sedan: Item<"sedan", 12000>;
  hatchback: Item<"hatchback", 8000>;
};

const sedan: Inventory["sedan"] = {
  type: "sedan",
  price: 12000
};

const hatchback: Inventory["hatchback"] = {
  type: "hatchback",
  price: 8000
};

const inventory: Inventory = {
  sedan,
  hatchback
};

const selectedInventory: Partial<Inventory> = {
  sedan: sedan
};

selectedInventory["hatchback"] = sedan; // ✅ correctly shows a type error

function isInventoryItem<T extends keyof Inventory>(
  item: any
): item is Inventory[T] {
  return (
    item &&
    item.type &&
    Object.keys(inventory).includes(item.type) &&
    inventory[item.type].price === item.price
  );
}

const setSelectedItem = <I extends keyof Inventory>(item: Inventory[I]) => {
  selectedInventory[item.type] = item;
};

setSelectedItem(hatchback); // inferred type: const setSelectedItem: <"hatchback", 8000>(Item: Item<"hatchback", 8000>) => void
