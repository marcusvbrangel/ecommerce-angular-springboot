package com.mvbr.ecommerce.controller;

import com.mvbr.ecommerce.dto.PurchaseRequest;
import com.mvbr.ecommerce.dto.PurchaseResponse;
import com.mvbr.ecommerce.service.CheckoutService;
import com.mvbr.ecommerce.service.OrderService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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

    @Value("${website.name}")
    private String websiteName;

    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

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

    // http://localhost:8085/api/checkout/ambiente
    // http://192.168.58.2:31752/api/checkout/ambiente
    @GetMapping("/ambiente")
    public String ambiente() {
        return websiteName + " / " + url + " / " +  username + " / " + password;
    }

}
