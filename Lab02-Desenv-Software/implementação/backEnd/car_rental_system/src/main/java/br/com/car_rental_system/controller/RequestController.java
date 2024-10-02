package br.com.car_rental_system.controller;

import br.com.car_rental_system.entity.PurchaseContract;
import br.com.car_rental_system.service.RequestService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "http://localhost:3000")  // Para aceitar requisições do React no localhost:3000
public class RequestController {

    @Autowired
    private RequestService requestService;

    @GetMapping
    public List<PurchaseContract> getAllDocuments() {
        return requestService.getAllDocuments();
    }

    @GetMapping("/{id}")
    public PurchaseContract getDocumentById(@PathVariable Long id) {
        return requestService.getDocumentById(id);
    }

    @PostMapping
    public PurchaseContract createDocument(@RequestBody PurchaseContract cliente) {
        return requestService.saveDocument(cliente);
    }

    @PutMapping("/{id}")
    public PurchaseContract updateDocument(@PathVariable Long id, @RequestBody PurchaseContract cliente) {
        return requestService.saveDocument(cliente);
    }

    @DeleteMapping("/{id}")
    public void deleteDocument(@PathVariable Long id) {
        requestService.deleteDocument(id);
    }
}
