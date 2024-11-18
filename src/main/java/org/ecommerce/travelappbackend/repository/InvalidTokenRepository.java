package org.ecommerce.travelappbackend.repository;

import org.ecommerce.travelappbackend.entity.InvalidatedToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvalidTokenRepository extends JpaRepository<InvalidatedToken, String> {
}
