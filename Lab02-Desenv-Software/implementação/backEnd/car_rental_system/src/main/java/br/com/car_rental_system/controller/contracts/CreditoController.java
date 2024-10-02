package br.com.car_rental_system.controller.contracts;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.car_rental_system.entity.CreditContract;
import br.com.car_rental_system.service.contracts.CreditoService;

@RestController
@RequestMapping("/api/contratos/credito")
public class CreditoController {

    @Autowired
    private CreditoService creditoService;

    @GetMapping
    public ResponseEntity<List<CreditContract>> listarContratosDeCredito() {
        List<CreditContract> contratos = creditoService.listarTodos();
        return ResponseEntity.ok(contratos);
    }

    @PostMapping
    public ResponseEntity<CreditContract> criarCredito(@RequestBody Long contratoId) {
        CreditContract credito = creditoService.criarContratoDeCredito(contratoId);
        return ResponseEntity.ok(credito);
    }
}
