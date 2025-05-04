const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

const serviceAccount = require("../serviceAccountKey.json"); // também volta uma pasta

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Lista com todos os arquivos e o nome da coleção correspondente
const tabelas = [
  { arquivo: "tbl_admins.json", colecao: "admins" },
  { arquivo: "tbl_cart.json", colecao: "carrinho" },
  { arquivo: "tbl_cart_items.json", colecao: "items_carrinho" },
  { arquivo: "tbl_categories.json", colecao: "categorias" },
  { arquivo: "tbl_colors.json", colecao: "cores" },
  { arquivo: "tbl_grades.json", colecao: "séries" },
  { arquivo: "tbl_product_colors.json", colecao: "cores_produto" },
  { arquivo: "tbl_products.json", colecao: "produtos" },
  { arquivo: "tbl_products_quantity.json", colecao: "quantidade_produto" },
  { arquivo: "tbl_users.json", colecao: "usuarios" }
];

async function importarColecao(arquivo, colecao) {
  try {
    // Ajuste do caminho para ../tables/
    const caminho = path.join(__dirname, "../tables", arquivo);
    const dados = JSON.parse(fs.readFileSync(caminho, "utf8"));

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
