const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static frontend files
// app.use('/data', express.static(path.join(__dirname, 'public/data')));

// Sample product data with carbon footprints
const products = [
  { name: 'Laptop', footprint: 500 },
  { name: 'T-shirt', footprint: 10 },
  { name: 'Mobile', footprint: 150 },
  { name: 'Jeans', footprint: 40 },
  { name: 'Television', footprint: 300 },
  { name: 'Headphones', footprint: 20 }
];

// Trie Node class
class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
    this.product = null;
  }
}

// Trie class
class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(product) {
    let node = this.root;
    for (let char of product.name.toLowerCase()) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
    node.product = product;
  }

  search(prefix) {
    let node = this.root;
    for (let char of prefix.toLowerCase()) {
      if (!node.children[char]) {
        return [];
      }
      node = node.children[char];
    }
    return this._collect(node);
  }

  _collect(node) {
    let results = [];
    if (node.isEndOfWord) results.push(node.product);
    for (let char in node.children) {
      results = results.concat(this._collect(node.children[char]));
    }
    return results;
  }
}

// Initialize Trie and insert products
const trie = new Trie();
products.forEach(product => trie.insert(product));

// API endpoint to search products
app.get('/search', (req, res) => {
  const query = req.query.q || '';
  const results = trie.search(query);
  res.json(results);
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
