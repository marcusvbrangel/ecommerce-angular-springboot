package com.mvbr.ecommerce.projection;

import com.mvbr.ecommerce.entity.ProductCategory;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "productCategoryProjection", types = ProductCategory.class)
public interface ProductCategoryProjection {
    Long getId();
    String getCategoryName();
}
