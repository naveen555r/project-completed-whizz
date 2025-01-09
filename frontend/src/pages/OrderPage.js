import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import moment from 'moment';
import indianCurrency from '../helper/indianCurrency';

const OrderPage = () => {
  const [data, setData] = useState([]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(SummaryApi.getOrder.url, {
        method: SummaryApi.getOrder.method,
        credentials: 'include',
      });
      const responseData = await response.json();
      setData(responseData?.data || []); // Fallback to an empty array
      console.log('order list', responseData);
    } catch (error) {
      console.error('Error fetching order details:', error);
      setData([]); // Fallback in case of error
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  return (
    <div className="p-7">
      {/* If no data is present */}
      {data?.length === 0 && <p>No orders available</p>}
      <div className="p-4 w-full">
        {data?.map((item, index) => (
          <div key={item.userId + index}>
            <p className="font-medium text-lg">
              {moment(item.createdAt).format('ll')}
            </p>
            <div className="border rounded">
              <div className="grid gap-2">
                {item?.productDetails?.map((product, index) => (
                  <div
                    key={product.productId + index}
                    className="flex gap-3 bg-slate-200"
                  >
                    <img
                      src={product.image?.[0]}
                      alt="Product"
                      className="w-28 h-28 p-1 object-scale-down"
                    />
                    <div>
                      <div>{product.name}</div>
                      <div className="flex gap-2 items-center">
                        <div>{indianCurrency(product.price)}</div>
                        <div>Quantity: {product.quantity}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex lg:flex-row flex-col p-3 gap-4">
                <div>
                  <div className="font-medium text-lg">Payment Details:</div>
                  <p className="ml-1">
                    Payment method:{' '}
                    {item.paymentDetails?.payment_method_type?.[0] || 'N/A'}
                  </p>
                  <p className="ml-1">
                    Payment status: {item.paymentDetails?.payment_status || 'N/A'}
                  </p>
                </div>
                <div>
                  <div className="font-medium">Shipping Details:</div>
                  {item.shipping_options?.map((shipping, index) => (
                    <div
                      className="ml-1"
                      key={shipping.shipping_rate + index}
                    >
                      Shipping amount: {shipping.shipping_amount}
                    </div>
                  ))}
                  <p>
                    Shipping Name:{' '}
                    {item.shippingDetails?.shipping_name || 'N/A'}
                  </p>
                  <p>
                    Shipping address:{' '}
                    {item.shippingDetails?.shipping_address
                      ? `${item.shippingDetails.shipping_address.line1}, 
                        ${
                          item.shippingDetails.shipping_address.line2
                            ? item.shippingDetails.shipping_address.line2 + ', '
                            : ''
                        }
                        ${item.shippingDetails.shipping_address.city}, 
                        ${item.shippingDetails.shipping_address.state} - 
                        ${item.shippingDetails.shipping_address.postal_code}`
                      : 'N/A'}
                  </p>
                </div>
              </div>
              <div className="font-semibold">
                Total Amount: {indianCurrency(item.totalAmount || 0)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
