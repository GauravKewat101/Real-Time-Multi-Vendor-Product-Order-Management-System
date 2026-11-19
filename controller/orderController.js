const Order = require('../model/orderModel');


exports.createOrder = async (req,res)=>{

   try{
       const { items } = req.body;
       const {userId} = req.user;

       const totalAmount = items.reduce((total,obj)=> (obj.quantity*obj.price)+total,0);
       // items[{ productId, quantity, price }],
       const order = await Order.create( {userId,items,totalAmount:totalAmount});

       if(!order) {
            res.status(404).send({message: 'order not found'});
       }
       res.status(200).send({
        message: 'order placed successfully',
        data: order
       });

   } catch(err){
        res.status(500).send({message: err});
   }
}