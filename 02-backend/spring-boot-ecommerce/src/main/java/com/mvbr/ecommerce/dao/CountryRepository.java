package com.mvbr.ecommerce.dao;

import com.mvbr.ecommerce.entity.Country;
import com.mvbr.ecommerce.projection.CountryProjection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;


// http://localhost:8085/api/countries
// http://localhost:8085/api/countries/1

// http://localhost:8085/api/countries/search/findAllCached

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "countries",
        path = "countries", excerptProjection = CountryProjection.class)
public interface CountryRepository extends JpaRepository<Country, Long> {

    Logger logger = LoggerFactory.getLogger(CountryRepository.class);

    @Cacheable("countries")
    default List<Country> findAllCached() {
        logger.info("Fetching countries from database");
        return findAll();
    }

//    @Cacheable("countries")
//    List<Country> findAll();

    @Override
    @Cacheable("countries")
    default List<Country> findAll() {
        logger.info("Fetching countries from database");
        return findAll();
    }

}
