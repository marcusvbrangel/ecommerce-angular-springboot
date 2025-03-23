package com.mvbr.ecommerce.projection;

import com.mvbr.ecommerce.entity.Country;
import com.mvbr.ecommerce.entity.State;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "stateProjection", types = State.class)
public interface StateProjection {
    Long getId();
    String getName();
    Country getCountry();
}
