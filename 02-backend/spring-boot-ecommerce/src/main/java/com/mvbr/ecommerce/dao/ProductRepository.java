package com.mvbr.ecommerce.dao;

import com.mvbr.ecommerce.entity.Product;
import com.mvbr.ecommerce.projection.ProductCatalogProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "product",
        path = "products", excerptProjection = ProductCatalogProjection.class)
public interface ProductRepository extends JpaRepository<Product, Long> {

    // http://localhost:8085/api/products/search/findByCategoryId?id=1
    // http://localhost:8085/api/products?projection=productCatalog
    // http://localhost:8085/api/products/2?projection=productCatalog
    // http://localhost:8085/api/products?projection=productCatalog&size=100
    // http://localhost:8085/api/products/search/findByCategoryId?id=2&projection=productCatalog
//    @RestResource(path = "/products", rel = "products")
    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);

}
