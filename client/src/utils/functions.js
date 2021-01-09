import product from '../reducers/productReducer'

export const checkReviewFormRender = (reviews, user_id) => {
  console.log(reviews)
  console.log(user_id)
  let renderReviewForm = reviews.includes((review) => {
    if (review.user._id !== user_id) {
      console.log(review)
      return true
    }
  })
  return renderReviewForm
}
export const returnTotalPrice = (cart) => {
  let totalPrice = 0
  //gets the quantitys of the products
  //and puts them into an array
  let quantites = cart.map((item) => {
    return item.quantity
  })

  //gets the prices of the products
  //and puts them into an array
  let prices = cart.map((item) => {
    return parseFloat(item.product.price).toFixed(2)
  })
  //get the total price of the cart by multiplying them all together
  // with the quantitiy of the items
  for (let i = 0; i < quantites.length; i++) {
    totalPrice = totalPrice + quantites[i] * prices[i]
  }
  return parseFloat(totalPrice).toFixed(2)
}
export const checkPurchaseStatus = ({ _id }, order_history) => {
  // return orders
  // console.log(order_history);
  let checkedStatus = false
  //maps the the order products to order arrays
  let filteredOrdersArray = order_history.map((order) => {
    return order.products
  })
  // console.log(filteredOrdersArray);

  //returns the products to a single araay
  let unfilterProducts = filteredOrdersArray.map((product, index) => {
    return product
  })
  //filters and checks wether the product as alreay been bought
  for (let i = 0; i < unfilterProducts.length; i++) {
    let products = unfilterProducts[i]
    // console.log(products);

    for (let y = 0; y < products.length; y++) {
      const product = products[y]
      // console.log(product.product._id);
      let product_id = product.product._id

      if (product.product._id === _id) {
        // checkedStatus = false;
        checkedStatus = true
        //   // return checkedStatus;
        // console.log("not a product");
      }
    }
  }
  return checkedStatus
}
