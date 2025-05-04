const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Lista com todos os arquivos e o nome da coleção correspondente
const tabelas = [
  { arquivo: "vw_cart_details.json", colecao: "view_cart_details" },
  { arquivo: "vw_product_card.json", colecao: "view_product_card" },
  { arquivo: "vw_product_price_by_cart_items.json", colecao: "view_product_price_by_cart_items" },
  { arquivo: "vw_users.json", colecao: "view_users" },
];

async function importarColecao(arquivo, colecao) {
  try {
    const dados = JSON.parse(fs.readFileSync(path.join(__dirname, arquivo), "utf8"));

    for (const item of dados) {
      const id = item.id?.toString() ?? undefined;
      if (id) {
        await db.collection(colecao).doc(id).set(item);
      } else {
        await db.collection(colecao).add(item);
      }
    }

    console.log(`✅ Coleção '${colecao}' importada com sucesso!`);
  } catch (error) {
    console.error(`❌ Erro ao importar coleção '${colecao}':`, error.message);
  }
}

async function importarTudo() {
  for (const { arquivo, colecao } of tabelas) {
    await importarColecao(arquivo, colecao);
  }

  console.log("🎉 Todas as coleções foram importadas!");
}

importarTudo();
