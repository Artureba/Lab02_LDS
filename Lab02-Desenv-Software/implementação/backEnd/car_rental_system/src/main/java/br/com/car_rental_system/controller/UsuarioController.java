package br.com.car_rental_system.controller;

import br.com.car_rental_system.entity.Usuario;
import br.com.car_rental_system.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:3000")  // Para aceitar requisições do React no localhost:3000
public class UsuarioController {

    @Autowired
    private UsuarioService UsuarioService;

    @GetMapping
    public List<Usuario> getAllUsuarios() {
        return UsuarioService.getAllUsuarios();
    }

    @GetMapping("/{id}")
    public Usuario getUsuarioById(@PathVariable Long id) {
        return UsuarioService.getUsuarioById(id);
    }

    @PostMapping
    public Usuario createUsuario(@RequestBody Usuario Usuario) {
        return UsuarioService.saveUsuario(Usuario);
    }

    @PutMapping("/{id}")
    public Usuario updateUsuario(@PathVariable Long id, @RequestBody Usuario Usuario) {
        // Usuario.setId(id);
        return UsuarioService.saveUsuario(Usuario);
    }

    @DeleteMapping("/{id}")
    public void deleteUsuario(@PathVariable Long id) {
        UsuarioService.deleteUsuario(id);
    }
}
