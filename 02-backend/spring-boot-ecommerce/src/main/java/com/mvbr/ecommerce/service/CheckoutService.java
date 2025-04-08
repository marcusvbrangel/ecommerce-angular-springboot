package com.mvbr.ecommerce.service;

import com.mvbr.ecommerce.dto.PurchaseRequest;
import com.mvbr.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(PurchaseRequest purchase);

}
