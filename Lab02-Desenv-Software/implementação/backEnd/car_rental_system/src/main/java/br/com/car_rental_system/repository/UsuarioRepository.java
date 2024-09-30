package br.com.car_rental_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.car_rental_system.entity.UsuarioAcesso;

public interface UsuarioRepository extends JpaRepository<UsuarioAcesso, Long> {
    UsuarioAcesso findByLogin(String login);
}
