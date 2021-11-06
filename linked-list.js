/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  // _get(idx): gets node at index to be used in other methods

  _get(idx) {
    let count = 0;
    let currentNode = this.head;

    while (count < idx) {
      currentNode = currentNode.next;
      count++;
    }

    return currentNode;
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    if (this.length === 0) this.tail = this.head;

    this.length++;
  }

  /** pop(): return & remove last item. */

  pop() {
    if (this.length <= 0) throw new Error("List is empty.");

    return this.removeAt(this.length - 1);
  }

  /** shift(): return & remove first item. */

  shift() {
    if (this.length <= 0) throw new Error("List is empty.");

    return this.removeAt(0);
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx >= this.length || idx < 0) throw new Error("Invalid index.");

    return this._get(idx).val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx >= this.length || idx < 0) throw new Error("Invalid index.");

    let node = this._get(idx);
    node.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx > this.length || idx < 0) throw new Error("Invalid index.");

    if (idx === 0) return this.unshift(val);
    if (idx === this.length) return this.push(val);

    let prev = this._get(idx - 1);

    let newNode = new Node(val);
    newNode.next = prev.next;
    prev.next = newNode;

    this.length++;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx >= this.length || idx < 0) throw new Error("Invalid index.");

    // removing the head
    if (idx === 0) {
      const val = this.head.val;
      this.head = this.head.next;
      this.length--;
      if (this.length < 2) this.tail = this.head;
      return val;
    }

    let prev = this._get(idx - 1);

    // removing the tail
    if (idx === this.length - 1) {
      const val = prev.next.val;
      prev.next = null;
      this.tail = prev;
      this.length--;
      return val;
    }

    // remove any middle node
    const val = prev.next.val;
    prev.next = prev.next.next;
    this.length--;
    return val;
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) return 0;

    let total = 0;
    let curr = this.head;

    while (curr) {
      total += curr.val;
      curr = curr.next;
    }

    return total / this.length;
  }
}

module.exports = LinkedList;
