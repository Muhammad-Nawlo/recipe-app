import uniqid from "uniqid";
export default class List {
  constructor() {
    this.items = [];
  }
  addItem(amount, unit, ingredient) {
    const item = {
      id: uniqid(),
      amount,
      unit,
      ingredient,
    };
    this.items.push(item);
    return item;
  }
  removeItem(id) {
    const index = this.items.findIndex((el) => el.id === id);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
  updateItem(id, count) {
    const index = this.items.findIndex((el) => el.id === id);
    if (index !== -1 && count > 0) {
      this.items[index].count = count;
    }
  }
}
