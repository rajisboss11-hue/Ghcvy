import fs from 'fs';

const players = [
  "Jasprit Bumrah", "Sunil Narine", "Kagiso Rabada", "Krunal Pandya", 
  "Jofra Archer", "Bhuvneshwar Kumar", "Ravi Bishnoi", "Prasidh Krishna", 
  "Anshul Kamboj"
];

async function fetchImage(name) {
  try {
    const res = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(name)}&prop=pageimages&format=json&pithumbsize=1000`);
    const data = await res.json();
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    return pages[pageId].thumbnail?.source || null;
  } catch (e) {
    return null;
  }
}

async function run() {
  const images = {};
  for (const p of players) {
    images[p] = await fetchImage(p);
  }
  console.log(JSON.stringify(images, null, 2));
}
run();
