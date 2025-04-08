package com.mvbr.ecommerce.dto;

import com.mvbr.ecommerce.entity.Address;
import com.mvbr.ecommerce.entity.Customer;
import com.mvbr.ecommerce.entity.Order;
import com.mvbr.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class PurchaseRequest {

    private Customer customer;

    private Address billingAddress;

    private Address shippingAddress;

    private Order order;

    private Set<OrderItem> orderItems;

}
