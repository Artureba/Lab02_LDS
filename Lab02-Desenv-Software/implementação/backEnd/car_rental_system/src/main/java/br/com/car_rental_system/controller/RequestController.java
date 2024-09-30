package br.com.car_rental_system.controller;

import br.com.car_rental_system.entity.Document;
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
    public List<Document> getAllDocuments() {
        return requestService.getAllDocuments();
    }

    @GetMapping("/{id}")
    public Document getDocumentById(@PathVariable Long id) {
        return requestService.getDocumentById(id);
    }

    @PostMapping
    public Document createDocument(@RequestBody Document cliente) {
        return requestService.saveDocument(cliente);
    }

    @PutMapping("/{id}")
    public Document updateDocument(@PathVariable Long id, @RequestBody Document cliente) {
        return requestService.saveDocument(cliente);
    }

    @DeleteMapping("/{id}")
    public void deleteDocument(@PathVariable Long id) {
        requestService.deleteDocument(id);
    }
}
