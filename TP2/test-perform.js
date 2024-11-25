const axios = require('axios');
const fs = require('fs');

// Fonction pour effectuer une requête et mesurer la latence
async function testAuthentication(url, email, password) {
  const startTime = Date.now();
  try {
    await axios.post(url, { email, password });
    return Date.now() - startTime; // Latence en millisecondes
  } catch (error) {
    return Date.now() - startTime; // Même si erreur, on mesure la latence
  }
}

// Fonction pour effectuer `n` requêtes par seconde pendant `duration` secondes
async function runLoadTest(url, email, password, n, duration) {
  const latencies = [];
  const interval = 1000 / n;

  const startTime = Date.now();
  while (Date.now() - startTime < duration * 1000) {
    const promises = [];
    for (let i = 0; i < n; i++) {
      promises.push(testAuthentication(url, email, password));
    }
    const results = await Promise.all(promises);
    latencies.push(...results);
    await new Promise(resolve => setTimeout(resolve, interval)); // Pause entre lots
  }

  return latencies;
}

async function runConcurrentLoadTest(url, email, password, requestsPerSecond, duration, concurrentClients) {
  const latencies = [];
  const interval = 1000 / requestsPerSecond;

  const startTime = Date.now();
  while (Date.now() - startTime < duration * 1000) {
    const promises = [];
    // Chaque client envoie une requête
    for (let i = 0; i < concurrentClients; i++) {
      promises.push(testAuthentication(url, email, password));
    }
    // Attendre la fin de toutes les requêtes du lot actuel
    const results = await Promise.all(promises);
    latencies.push(...results);

    // Pause entre les lots pour respecter le rythme
    await new Promise(resolve => setTimeout(resolve, interval));
  }

  return latencies;
}

// Calcul des métriques (moyenne, 95ᵉ et 99ᵉ percentile)
function calculateMetrics(latencies) {
  latencies.sort((a, b) => a - b);
  const avg = latencies.reduce((sum, val) => sum + val, 0) / latencies.length;
  const p95 = latencies[Math.floor(0.95 * latencies.length)];
  const p99 = latencies[Math.floor(0.99 * latencies.length)];
  return { avg, p95, p99 };
}

// Fonction principale pour exécuter les tests pour les méthodes naïves et préparées avec SQLite
async function mainForSQL() {
  const urlPrepared = 'http://localhost:3000/login'; // URL de l'authentification prepared
  const urlNaive =  'http://localhost:3000/login-naive' // URL de l'authentification naive
  const email = 'test@example.com';
  const password = 'password123';
  //const duration = 300; // 5 minutes
  const duration = 5; // 5 s

  const results = { naive: {}, prepared: {} };

  // Tester les méthodes naïves et préparées pour n = 1, 50, 100
  for (const method of ['naive']) {
    for (const n of [1, 50, 100]) {
      console.log(`Running ${method} test with ${n} req/s`);
      const latencies = await runLoadTest(urlNaive, email, password, n, duration);
      results[method][n] = calculateMetrics(latencies);
    }
  }

  for (const method of ['prepared']) {
    for (const n of [1, 50, 100]) {
      console.log(`Running ${method} test with ${n} req/s`);
      const latencies = await runLoadTest(urlPrepared, email, password, n, duration);
      results[method][n] = calculateMetrics(latencies);
    }
  }

  // Sauvegarder les résultats dans un fichier JSON
  fs.writeFileSync('results.json', JSON.stringify(results, null, 2), (err) => {
    if (err) console.error('Erreur lors de l\'écriture du fichier JSON :', err);
    else console.log('Résultats sauvegardés dans results.json');
  });
}

// Fonction principale pour exécuter les tests de déni de service
async function mainForDOS() {
  const url = 'http://localhost:3000/login'; // URL de l'authentification
  const duration = 5; // 5 secondes
  const maxNumberOfCLients = 6; // 6 clients
  const numberOfRequests = 100; // 100 requêtes par client
  const results = { dos: {}};
  
  // Tester le DOS
  for (let i = 1; i < maxNumberOfCLients+1; i++) {
    console.log(`Running with ${i} clients`);
    const randomEmail = `test${Math.random()}@example.com`;
    const randomPassword = `password${Math.random()}`;
    const latencies = await runConcurrentLoadTest(url, randomEmail, randomPassword, numberOfRequests, duration, i);
    results['dos'][i] = calculateMetrics(latencies);

    // Sauvegarder les résultats dans un fichier JSON
    fs.writeFileSync('results_dos.json', JSON.stringify(results, null, 2), (err) => {
    if (err) console.error('Erreur lors de l\'écriture du fichier JSON :', err);
    else console.log('Résultats sauvegardés dans results.json');
    });
  }
}

async function main() {
 //await mainForSQL();
 await mainForDOS();
}

main().catch(console.error);
