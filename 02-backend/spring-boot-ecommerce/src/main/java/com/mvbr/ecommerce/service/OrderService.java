package com.mvbr.ecommerce.service;

import com.mvbr.ecommerce.dto.PurchaseRequest;
import com.mvbr.ecommerce.dto.PurchaseResponse;

public interface OrderService {

    PurchaseResponse placeOrder(PurchaseRequest purchase);

}
