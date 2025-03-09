package com.mvbr.ecommerce.projection;

import com.mvbr.ecommerce.entity.Product;
import com.mvbr.ecommerce.entity.ProductCategory;
import org.springframework.data.rest.core.config.Projection;

import java.math.BigDecimal;
import java.util.Date;

@Projection(name = "productCatalogProjection", types = Product.class)
public interface ProductCatalogProjection {
    Long getId();
    String getSku();
    String getName();
    String getDescription();
    BigDecimal getUnitPrice();
    String getImageUrl();
    boolean getActive();
    int getUnitsInStock();
    Date getDateCreated();
    Date getLastUpdated();
    ProductCategory getCategory();
}
