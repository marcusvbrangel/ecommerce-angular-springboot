package com.mvbr.ecommerce.controller;

import com.mvbr.ecommerce.dto.PurchaseRequest;
import com.mvbr.ecommerce.dto.PurchaseResponse;
import com.mvbr.ecommerce.service.CheckoutService;
import com.mvbr.ecommerce.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/checkout")
@CrossOrigin("http://localhost:4200")
public class CheckoutController {

    private final CheckoutService checkoutService;
    private final OrderService orderService;

    public CheckoutController(CheckoutService checkoutService, OrderService orderService) {
        this.checkoutService = checkoutService;
        this.orderService = orderService;
    }

    @PostMapping("/purchase")
    @ResponseStatus(HttpStatus.CREATED)
    public PurchaseResponse placeOrder(@RequestBody PurchaseRequest purchaseRequest) {

        PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchaseRequest);
//        PurchaseResponse purchaseResponse = orderService.placeOrder(purchaseRequest);

        return purchaseResponse;
    }

}
