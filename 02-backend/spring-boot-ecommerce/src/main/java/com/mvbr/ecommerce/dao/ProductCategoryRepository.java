package com.mvbr.ecommerce.dao;

import com.mvbr.ecommerce.entity.ProductCategory;
import com.mvbr.ecommerce.projection.ProductCategoryProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "productCategory",
        path = "product-categories", excerptProjection = ProductCategoryProjection.class)
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {

    Page<ProductCategory> findAll(Pageable pageable);

}
