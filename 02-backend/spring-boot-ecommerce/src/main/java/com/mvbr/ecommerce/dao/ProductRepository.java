package com.mvbr.ecommerce.dao;

import com.mvbr.ecommerce.entity.Product;
import com.mvbr.ecommerce.entity.ProductCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.config.Projection;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.math.BigDecimal;
import java.util.Date;

@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Long> {

    // http://localhost:8085/api/products/search/findByCategoryId?id=1
    // http://localhost:8085/api/products?projection=productCatalog
    // http://localhost:8085/api/products/2?projection=productCatalog
    // http://localhost:8085/api/products?projection=productCatalog&size=100
    // http://localhost:8085/api/products/search/findByCategoryId?id=2&projection=productCatalog
//    @RestResource(path = "/products", rel = "products")
    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);

}

@Projection(name = "productCatalog", types = Product.class)
interface productCatalog {
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
