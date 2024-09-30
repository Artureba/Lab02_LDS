package br.com.car_rental_system.service;

import br.com.car_rental_system.entity.UsuarioAcesso;
import br.com.car_rental_system.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository UsuarioRepository;

    public List<UsuarioAcesso> getAllUsuarios() {
        return UsuarioRepository.findAll();
    }

    public UsuarioAcesso getUsuarioById(Long id) {
        return UsuarioRepository.findById(id).orElse(null);
    }

    public UsuarioAcesso saveUsuario(UsuarioAcesso UsuarioAcesso) {
        return UsuarioRepository.save(UsuarioAcesso);
    }

    public void deleteUsuario(Long id) {
        UsuarioRepository.deleteById(id);
    }

    public Boolean getUsuarioByLogin(String login) {
        return UsuarioRepository.findByLogin(login) != null;
    }
}
