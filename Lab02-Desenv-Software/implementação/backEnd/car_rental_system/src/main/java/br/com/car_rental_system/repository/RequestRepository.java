package br.com.car_rental_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.car_rental_system.entity.PurchaseContract;

public interface RequestRepository extends JpaRepository<PurchaseContract, Long> {

}