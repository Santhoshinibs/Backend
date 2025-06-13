import Order from '../models/order.js';  
export const getMyOrders = async (req, res) => {
    try {
      const orders = await Order.find({ user: req.user._id });
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
export const updateOrderToPaid=async(req,res)=>{
    try{
        const order=await Order.findById(req.params.id)
        if(order){
            order.isPaid=true
            order.paidAt=Date.now()
            const updateOrder=await order.save()
            res.json(updateOrder)
        }
        else{
            res.status(404).json({message:"Order not found"})
        }
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}
// Add order items
export const addOrderItems = async (req, res) => {
     console.log('User:', req.user);
  console.log('Body:', req.body);
    const {
  orderItems,
  shippingAddress,
  paymentMethod,
  itemsPrice,
  shippingPrice,
  totalPrice,
} = req.body;


    // Check if orderItems array is empty
    if (!orderItems || orderItems.length === 0) {
        res.status(400).json({ message: 'No Order items' });
        return;
    }

    try {
        const order = new Order({
  user: req.user._id,  // <-- req.user is null here
  orderItems: req.body.orderItems,
  shippingAddress: req.body.shippingAddress,
  paymentMethod: req.body.paymentMethod,
  itemsPrice: req.body.itemsPrice,
  shippingPrice: req.body.shippingPrice,
  totalPrice: req.body.totalPrice,
});
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get order by ID
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
