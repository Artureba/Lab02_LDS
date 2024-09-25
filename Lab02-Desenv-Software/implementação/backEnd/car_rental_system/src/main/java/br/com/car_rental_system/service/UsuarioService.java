package br.com.car_rental_system.service;

import br.com.car_rental_system.entity.Usuario;
import br.com.car_rental_system.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository UsuarioRepository;

    public List<Usuario> getAllUsuarios() {
        return UsuarioRepository.findAll();
    }

    public Usuario getUsuarioById(Long id) {
        return UsuarioRepository.findById(id).orElse(null);
    }

    public Usuario saveUsuario(Usuario Usuario) {
        return UsuarioRepository.save(Usuario);
    }

    public void deleteUsuario(Long id) {
        UsuarioRepository.deleteById(id);
    }
}
