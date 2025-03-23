package com.mvbr.ecommerce.dao;

import com.mvbr.ecommerce.entity.State;
import com.mvbr.ecommerce.projection.StateProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

// http://localhost:8085/api/states
// http://localhost:8085/api/states/2
// http://localhost:8085/api/states/search/findByCountryCode?code=BR

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "states",
        path = "states", excerptProjection = StateProjection.class)
public interface StateRepository extends JpaRepository<State, Long> {

    List<State> findByCountryCode(@Param("code") String code);

}
