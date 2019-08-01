export class OrderItemInterface {
  orderId: string | number;
  productId: string | number;
  attributes: string;
  productName: string;
  quantity: number;
  unitCost: number;
  itemId?: string | number;
}
