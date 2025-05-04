import { getDocs, collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { FaSleigh } from 'react-icons/fa';
import { log } from 'console';
import { query, where } from "firebase/firestore";


export type Product = {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    category_id: number;
    category: string;
    color: Colors[];
  };

type Colors = 
  {
    id: number;
    name: string;
    hex_color: string;
    quantity: number;
  };

export async function GetProductsInfo() {
  const productSnap = await getDocs(collection(db, "produtos"))
  const product = await Promise.all(productSnap.docs.map(async (productDoc) => {
    const productData = productDoc.data()
    const productId = productDoc.id
    console.log('productData', productData);
    const categoryRef = doc(db, "categorias", String(productData.category_id))
    const categoryDoc = await getDoc(categoryRef);
    const categoryData = categoryDoc.exists() ? categoryDoc.data() : null


    return {
      id: productId,
      name: productData.name,
      description: productData.description,
      image: productData.image,
      price: productData.price,
      category_id: productData.category_id,
      category: categoryData?.name || "sem categoria"
    };

  }))

  return product
}

export async function GetProductsInfoById(id: number): Promise<Product | null> {

  
  const productSnap = await getDocs(collection(db, "produtos"))
  const product: Product[] = []
  const colors: Colors[] = []
  
  for (const productDoc of productSnap.docs) {
    const productData = productDoc.data();

    console.log("productData", productData);
    
    console.log(typeof id, typeof productData.id);
    console.log(id, productData.id);


    if (productData.id === id) {
      
      const categoryRef = doc(db, "categorias", String(productData.category_id));
      const categoryDoc = await getDoc(categoryRef);
      const categoryData = categoryDoc.exists() ? categoryDoc.data() : null;

      const productColorsQuery = query(
        collection(db, "cores_produto"), 
        where("product_id", "==", productData.id)
      );

      const productColorsSnap = await getDocs(productColorsQuery);

      for( const productColorDoc of productColorsSnap.docs){

        const productColorData = productColorDoc.data()
        const productColorRef = doc(db, "cores", String(productColorData.color_id))
        const colorDoc = await getDoc(productColorRef)
        const colorData = colorDoc.exists() ? colorDoc.data() : null

        colors.push({
          id: colorData?.id || 0,
          name: colorData?.name || "sem cor",
          hex_color: colorData?.hex_color || "sem cor",
          quantity: productColorData.quantity || "sem quantidade",
        })
      }

      product.push({
        id: productData.id,
        name: productData.name,
        description: productData.description,
        image: productData.image,
        price: productData.price,
        category_id: productData.category_id,
        category: categoryData?.name || "sem categoria",
        color: colors,
      });

      console.log("product", product);
      console.log("colors", colors);


      return product[0]; // Retorna o primeiro produto encontrado
    }
  }

  return null;

}