package com.mvbr.ecommerce.projection;

import com.mvbr.ecommerce.entity.Country;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "countryProjection", types = Country.class)
public interface CountryProjection {
    Long getId();
    String getCode();
    String getName();
}
