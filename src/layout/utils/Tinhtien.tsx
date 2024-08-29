import { getProductWithId } from "../../API/productAPI";

const calculateItemTotal = async (productId: number): Promise<number> => {
    try {
      const product = await getProductWithId(productId);
      if (product && product.price !== undefined && product.quantity !== undefined) {
        return product.price * product.quantity;
      }
      return 0; // Trong trường hợp không tìm thấy sản phẩm hoặc giá sản phẩm không xác định
    } catch (error) {
      console.error('Error fetching product:', error);
      return 0;
    }
  };
  export default calculateItemTotal