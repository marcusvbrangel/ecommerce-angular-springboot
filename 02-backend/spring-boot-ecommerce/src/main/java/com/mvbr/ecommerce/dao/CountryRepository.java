package com.mvbr.ecommerce.dao;

import com.mvbr.ecommerce.entity.Country;
import com.mvbr.ecommerce.projection.CountryProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

// http://localhost:8085/api/countries
// http://localhost:8085/api/countries/1

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "countries",
        path = "countries", excerptProjection = CountryProjection.class)
public interface CountryRepository extends JpaRepository<Country, Long> {
}
