package br.com.car_rental_system.controller;

import br.com.car_rental_system.entity.Agente;
import br.com.car_rental_system.service.AgentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agentes")
@CrossOrigin(origins = "http://localhost:3000")  // Para aceitar requisições do React no localhost:3000
public class AgentController {

    @Autowired
    private AgentService agenteService;

    @GetMapping
    public List<Agente> getAllClientes() {
        return agenteService.getAllClientes();
    }

    @GetMapping("/{id}")
    public Agente getClienteById(@PathVariable Long id) {
        return agenteService.getClienteById(id);
    }

    @PostMapping
    public Agente createCliente(@RequestBody Agente cliente) {
        // throw new UnsupportedOperationException(cliente.toString());
        return agenteService.saveCliente(cliente);
    }

    @PutMapping("/{id}")
    public Agente updateCliente(@PathVariable Long id, @RequestBody Agente cliente) {
        // cliente.setId(id);
        return agenteService.saveCliente(cliente);
    }

    @DeleteMapping("/{id}")
    public void deleteCliente(@PathVariable Long id) {
        agenteService.deleteCliente(id);
    }
}
