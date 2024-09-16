package br.com.car_rental_system.repository;

import br.com.car_rental_system.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IClienteRepository extends JpaRepository<Cliente, Long> {
}
