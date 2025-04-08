package com.mvbr.ecommerce.service;

import com.mvbr.ecommerce.dao.CustomerRepository;
import com.mvbr.ecommerce.dto.PurchaseRequest;
import com.mvbr.ecommerce.dto.PurchaseResponse;
import com.mvbr.ecommerce.entity.Customer;
import com.mvbr.ecommerce.entity.Order;
import com.mvbr.ecommerce.entity.OrderItem;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    private final CustomerRepository customerRepository;

    public CheckoutServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(PurchaseRequest purchase) {

        // retrieve de order infor from dto...
        Order order = purchase.getOrder();

        // generate tracking number...
        String orderTrackingNumber = this.generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        // populate order with orderitems...
        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.addItem(item));

        // populate order with billingAddress and shippingAddress...
        order.setBillingAddress(order.getBillingAddress());
        order.setShippingAddress(order.getShippingAddress());

        // populate customer with order...
        Customer customer = purchase.getCustomer();
        order.setCustomer(customer);

        // save to the database...
        customerRepository.save(customer);

        // return a response...
        return new PurchaseResponse(orderTrackingNumber);

    }

    private String generateOrderTrackingNumber() {
        return UUID.randomUUID().toString();
    }

}


















