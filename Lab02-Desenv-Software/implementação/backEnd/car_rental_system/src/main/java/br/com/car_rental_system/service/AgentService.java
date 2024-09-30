package br.com.car_rental_system.service;

import br.com.car_rental_system.entity.Agente;
import br.com.car_rental_system.repository.AgentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgentService {

    @Autowired
    private AgentRepository agenteRepository;

    public List<Agente> getAllClientes() {
        return agenteRepository.findAll();
    }

    public Agente getClienteById(Long id) {
        return agenteRepository.findById(id).orElse(null);
    }

    public Agente saveCliente(Agente cliente) {
        return agenteRepository.save(cliente);
    }

    public void deleteCliente(Long id) {
        agenteRepository.deleteById(id);
    }
}
