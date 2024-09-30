package br.com.car_rental_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.car_rental_system.entity.Agente;

public interface AgentRepository extends JpaRepository<Agente, Long> {
    
}
