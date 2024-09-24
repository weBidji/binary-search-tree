class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    const sortedArray = array.sort((a, b) => a - b);
    this.root = buildTree(sortedArray);
  }

  insert(value) {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }
    let current = this.root;
    while (true) {
      if (value > current.data) {
        current.right === null
          ? (current.right = new Node(value))
          : current.right.insert(value);
      } else if (value < current.data) {
        current.left === null
          ? (current.left = new Node(value))
          : current.left.insert(value);
      }
    }
  }

  delete(value) {
    if (this.root === null) {
      return;
    }

    let previous;
    let current = this.root;
    while (current !== null) {
      if (current.data === value) {
        handleDeletion(current, value);
        return;
      } else if (value > current.data) {
        previous = current;
        current = current.right;
      } else {
        previous = current;
        current = current.left;
      }
    }

    function handleDeletion(node, value) {
      if (node.left === null && node.right === null) {
        value > previous.data
          ? (previous.right = null)
          : (previous.left = null);
      } else if (node.left !== null && node.right === null) {
        previous.left = node.left;
      } else if (node.left === null && node.right !== null) {
        previous.right = node.right;
      } else if (node.left !== null && node.right !== null) {
        value > node.left.data
          ? (previous.left = node.left)
          : (previous.right = node.right);
      }
    }
  }
}

function buildTree(array, start = 0, end = array.length - 1) {
  if (start > end) {
    return null;
  }

  const mid = Math.floor((start + end) / 2);
  const node = new Node(array[mid]);
  node.left = buildTree(array, start, mid - 1);
  node.right = buildTree(array, mid + 1, end);

  return node;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const myTree = new Tree([5, 3, 8, 1, 4, 7, 9, 243, 68, 78, 19]);

prettyPrint(myTree.root);
