package br.com.car_rental_system.controller;

import br.com.car_rental_system.entity.UsuarioAcesso;
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
    public List<UsuarioAcesso> getAllUsuarios() {
        return UsuarioService.getAllUsuarios();
    }

    @GetMapping("/{id}")
    public UsuarioAcesso getUsuarioById(@PathVariable Long id) {
        return UsuarioService.getUsuarioById(id);
    }

    @GetMapping("login/{login}")
    public Boolean getUsuarioByLogin(@PathVariable String login) {
        return UsuarioService.getUsuarioByLogin(login);
    }

    @PostMapping
    public UsuarioAcesso createUsuario(@RequestBody UsuarioAcesso UsuarioAcesso) {
        return UsuarioService.saveUsuario(UsuarioAcesso);
    }

    @PutMapping("/{id}")
    public UsuarioAcesso updateUsuario(@PathVariable Long id, @RequestBody UsuarioAcesso UsuarioAcesso) {
        return UsuarioService.saveUsuario(UsuarioAcesso);
    }

    @DeleteMapping("/{id}")
    public void deleteUsuario(@PathVariable Long id) {
        UsuarioService.deleteUsuario(id);
    }
}
