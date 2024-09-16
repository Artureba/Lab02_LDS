package main.java.br.com.car_rental_system.service;

import br.com.car_rental_system.entity.Cliente;
import br.com.car_rental_system.repository.IClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private IClienteRepository clienteRepository;

    public List<Cliente> getAllClientes() {
        return clienteRepository.findAll();
    }

    public Optional<Cliente> getClienteById(Long id) {
        return clienteRepository.findById(id);
    }

    public Cliente createCliente(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public Cliente updateCliente(Long id, Cliente clienteDetails) {
        Optional<Cliente> optionalCliente = clienteRepository.findById(id);
        if (optionalCliente.isPresent()) {
            Cliente cliente = optionalCliente.get();
            cliente.setNome(clienteDetails.getNome());
            cliente.setLogin(clienteDetails.getLogin());
            cliente.setSenha(clienteDetails.getSenha());
            cliente.setRg(clienteDetails.getRg());
            cliente.setCpf(clienteDetails.getCpf());
            cliente.setEndereco(clienteDetails.getEndereco());
            cliente.setProfissao(clienteDetails.getProfissao());
            cliente.setEmpresa(clienteDetails.getEmpresa());
            cliente.setSalarios(clienteDetails.getSalarios());
            return clienteRepository.save(cliente);
        } else {
            return null;
        }
    }

    public void deleteCliente(Long id) {
        clienteRepository.deleteById(id);
    }
}
