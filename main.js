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
        if (current.right === null) {
          current.right = new Node(value);
          break;
        }
        current = current.right;
      } else if (value < current.data) {
        if (current.left === null) {
          current.left = new Node(value);
          break;
        }
        current = current.left;
      } else {
        // Value already exists
        break;
      }
    }
  }

  delete(value) {
    if (this.root === null) {
      return;
    }

    let previous = null;
    let current = this.root;

    while (current !== null) {
      if (current.data === value) {
        this.handleDeletion(current, previous);
        return;
      } else if (value > current.data) {
        previous = current;
        current = current.right;
      } else {
        previous = current;
        current = current.left;
      }
    }
  }

  handleDeletion(node, previous) {
    // If the node to be deleted is the root
    if (node === this.root) {
      // Root has no children
      if (node.left === null && node.right === null) {
        this.root = null;
        return;
      }
      // Root has one child
      if (node.left === null) {
        this.root = node.right;
      } else if (node.right === null) {
        this.root = node.left;
      }
      // Root has two children
      else {
        let temp = node.right;
        let parent = null;

        while (temp.left !== null) {
          parent = temp;
          temp = temp.left;
        }

        node.data = temp.data;

        if (parent !== null) {
          parent.left === temp
            ? (parent.left = temp.right)
            : (parent.right = temp.right);
        } else {
          node.right = temp.right;
        }
      }
    }
    // If the node to be deleted is not the root
    else {
      // Node to delete has no children
      if (node.left === null && node.right === null) {
        value > previous.data
          ? (previous.right = null)
          : (previous.left = null);
        return;
      }

      // Node to delete has one child
      else if (node.left !== null && node.right === null) {
        value > previous.data
          ? (previous.right = node.left)
          : (previous.left = node.left);
        return;
      } else if (node.left === null && node.right !== null) {
        value > previous.data
          ? (previous.right = node.right)
          : (previous.left = node.right);
        return;
      }

      // Node to delete has two children
      else if (node.left !== null && node.right !== null) {
        let temp = node.right;
        let parent = null;

        // Find in-order successor
        while (temp.left !== null) {
          parent = temp;
          temp = temp.left;
        }

        // Replace node's data with the successor's data
        node.data = temp.data;

        // If successor has a right child, link it to its parent
        if (parent !== null) {
          parent.left === temp
            ? (parent.left = temp.right)
            : (parent.right = temp.right);
        } else {
          node.right = temp.right;
        }
      }
    }
  }

  find(value) {
    if (this.root === null) {
      return null;
    }

    let current = this.root;

    while (current !== null) {
      if (value === current.data) {
        return current;
      }
      current = value > current.data ? current.right : current.left;
    }
    return null;
  }

  levelOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback required");
    }
    if (this.root === null) {
      throw new Error("Tree is empty.");
    }

    let queue = [];
    queue.push(this.root);

    while (queue.length > 0) {
      let current = queue.shift();
      callback(current);

      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }
    }
  }

  // root, left, right
  preOrder(callback) {
    if (typeof callback !== "function") {
        throw new Error("Callback required");
    }
    if (this.root === null) {
        throw new Error("Tree is empty.");
    }

    const traverse = (node) => {
        if (node === null) {
            return; 
        }
        
        callback(node); 
        traverse(node.left); 
        traverse(node.right); 
    };

    traverse(this.root); 
}
  //left, root, right
  inOrder(callback) {
    if (typeof callback !== "function") {
        throw new Error("Callback required");
    }
    if (this.root === null) {
        throw new Error("Tree is empty.");
    }

    const traverse = (node) => {
        if (node === null) {
            return;
        }
        
        traverse(node.left); 
        callback(node); 
        traverse(node.right); 
    };

    traverse(this.root); 
}
  

  //left, right, root
  postOrder(callback) {
    if (typeof callback !== "function") {
        throw new Error("Callback required");
    }
    if (this.root === null) {
        throw new Error("Tree is empty.");
    }

    const traverse = (node) => {
        if (node === null) {
            return; 
        }
        
        traverse(node.left); 
        traverse(node.right); 
        callback(node); 
    };

    traverse(this.root); 
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

// Testing
const myTree = new Tree([5, 3, 8, 1, 4, 7, 9, 243, 68, 78, 19]);
prettyPrint(myTree.root);

function log(item) {
  console.log(item.data);
}

myTree.levelOrder(log);
