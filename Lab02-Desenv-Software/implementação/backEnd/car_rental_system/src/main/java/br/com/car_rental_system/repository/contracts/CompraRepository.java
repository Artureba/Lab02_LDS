package br.com.car_rental_system.repository.contracts;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.car_rental_system.entity.PurchaseContract;

public interface CompraRepository extends JpaRepository<PurchaseContract, Long> {
    
}
