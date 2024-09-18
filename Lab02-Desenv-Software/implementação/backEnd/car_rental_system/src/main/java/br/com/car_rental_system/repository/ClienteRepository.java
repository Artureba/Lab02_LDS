package br.com.car_rental_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.car_rental_system.entity.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    
}
